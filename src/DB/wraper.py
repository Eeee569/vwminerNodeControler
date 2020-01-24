import pymongo
from src.Settings import getSettings


class DB(object):






    class Server(object):
        id=''
        ip=''
        ramTotal=0
        ramFree=0
        cpuTotal=0
        cpuFree=0
        spaceTotal=0
        spaceFree=0
        vmList=[]

        def __init__(self,id,ip,ramTotal,ramFree,cpuTotal,cpuFree,spaceTotal,spaceFree,vmList):
            self.id=id
            self.ip=ip
            self.ramTotal=ramTotal
            self.ramFree=ramFree
            self.cpuTotal=cpuTotal
            self.cpuFree=cpuFree
            self.spaceTotal=spaceTotal
            self.spaceFree=spaceFree
            self.vmList=vmList

    class VM(object):
        id=''
        serverID=''
        ip=''
        ramTotal=0
        cpuTotal=0
        spaceTotal=0
        type=''

        def __init__(self,id,serverID,ip,ramTotal,cpuTotal,spaceTotal,type):
            self.serverID=serverID
            self.id=id
            self.ip=ip
            self.ramTotal=ramTotal
            self.cpuTotal=cpuTotal
            self.spaceTotal=spaceTotal
            self.type=type


    def __init__(self):
        self.settings = getSettings()
        self.dbcli = dbCli=pymongo.MongoClient("mongodb://"+self.settings['dbServer']+":27017/")
    def getServers():


    def getVMs():


    def addServer():

    def addVM():

    def updateServer(serverObj):

    def updateVM(vmObj):