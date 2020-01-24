import json

def getSettings():
    with open('../settings.json') as json_file:
        data = json.load(json_file)
    return data['settings']