import pymongo


myclient = pymongo.MongoClient("mongodb://192.168.142.117:27017/")

mydb = myclient["VWDB"]
servercol = mydb["Servers"]
vmcol= mydb["VMs"]