from subprocess import check_output,call
import ast
from time import sleep
import requests
import json

class Wallet:

    tAddresses = []

    tChangeAddr = "znWYLEcs6qgP8bp7C1UpowZS12ZECDUsT5p"

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


        print("Block updated \n")
        newChangeBal = self.getBalanceT(self.tChangeAddr)

        if newChangeBal > startChangeBal:
            self.__waitForBlockChange()
            toreturn = newChangeBal-startChangeBal
            call("zen-cli "+"z_sendmany "+ self.tChangeAddr+" "+"'[{\"address\": \""+fromaddr+"\" , \"amount\":"+str(toreturn)+"}]'", shell=True)
            check_output(["zen-cli", "z_sendmany", self.tChangeAddr, "'[{\"address\": \"" + fromaddr +"\" , \"amount\": "+str(toreturn) +"}]'"])

    def __waitforCompletion(self, opid,toaddr):

        txid = ""

        while True:
            opidoutput = check_output(["zen-cli", "z_getoperationresult \"[\""+opid+"\"]\" "]).decode("utf-8")
            if "success" in opidoutput:
                txid=self.__getString(opidoutput,"txid").replace("\"","")
                break


        txdata = requests.get(("https://explorer.zensystem.io/api/tx/"+txid))

        txObject = json.loads(txdata.content)

        txObject.vout[0].



    def __waitForBlockChange(self):

        infoOutput = check_output(["zen-cli", "getinfo"]).decode("utf-8")
        currentBlockHeight = int(infoOutput[infoOutput.index("blocks")+8: infoOutput.index(",\n  \"timeoffset\"")])

        print(currentBlockHeight)

        if self.lastHeight < currentBlockHeight:
            self.lastHeight = currentBlockHeight
            #return
        blockheightStart = currentBlockHeight
        while self.lastHeight == currentBlockHeight:
            infoOutput = check_output(["zen-cli", "getinfo"]).decode("utf-8")

            currentBlockHeight = int(infoOutput[infoOutput.index("blocks") + 8: infoOutput.index(",\n  \"timeoffset\"")])
            sleep(0.5)

        self.lastHeight = currentBlockHeight
        print(currentBlockHeight)
        sleep(0.5)



    def __getString(self,src,key):
        return src[src.index(key) + (len(key)+2): src.index(",")]