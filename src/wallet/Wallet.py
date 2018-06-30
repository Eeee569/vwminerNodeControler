from subprocess import check_output,call
import ast
from time import sleep


class Wallet:

    tAddresses = []

    tChangeAddr = "zne5mSvCfafrAxfegTvExMjNLhNyFCszc7H"

    zAddresses = []

    lastHeight = 0

    def __init__(self):
        zreturn = check_output(["zen-cli","z_listaddresses"]).decode("utf-8")
        treturn = check_output(["zen-cli","listaddresses"]).decode("utf-8")

        blank = "[\n]"
        if not blank in zreturn:
            self.zAddresses = ast.literal_eval(zreturn)
        if not blank in treturn:
            self.tAddresses = ast.literal_eval(treturn)


    def getBalanceT(self,taddr):
        rawbalancelist = check_output(["zen-cli", "listaddressgroupings"]).decode("utf-8")
        balancelist = ast.literal_eval(rawbalancelist)
        tmp = balancelist[0]
        for val in tmp:
            if val[0] == taddr:
                return val[1]
        return 0.0


    def transfer(self,fromaddr,toaddr,amnt):
        startChangeBal = self.getBalanceT(self.tChangeAddr)

        sendString = "zen-cli "+"z_sendmany "+ fromaddr+" "+"'[{\"address\": \""+toaddr+"\" , \"amount\":"+str(amnt)+"}]'"

        call(sendString, shell=True)

        self.__waitForBlockChange()

        newChangeBal = self.getBalanceT(self.tChangeAddr)

        if newChangeBal > startChangeBal:
            self.__waitForBlockChange()
            toreturn = newChangeBal-startChangeBal
            call("zen-cli "+"z_sendmany "+ self.tChangeAddr+" "+"'[{\"address\": \""+fromaddr+"\" , \"amount\":"+str(toreturn)+"}]'", shell=True)
            #check_output(["zen-cli", "z_sendmany", self.tChangeAddr, "'[{\"address\": \"" + fromaddr +"\" , \"amount\": "+str(toreturn) +"}]'"])

    def __waitForBlockChange(self):
        infoOutput = check_output(["zen-cli", "getinfo"]).decode("utf-8")
        currentBlockHeight = int(infoOutput[infoOutput.index("blocks")+8: infoOutput.index(",\n  \"timeoffset\"")])
        if self.lastHeight < currentBlockHeight:
            self.lastHeight = currentBlockHeight
            return
        blockheightStart = currentBlockHeight
        while self.lastHeight == currentBlockHeight:
            infoOutput = check_output(["zen-cli", "getinfo"]).decode("utf-8")

            currentBlockHeight = int(infoOutput[infoOutput.index("blocks") + 8: infoOutput.index(",\n  \"timeoffset\"")])
            sleep(0.5)

        self.lastHeight = currentBlockHeight
