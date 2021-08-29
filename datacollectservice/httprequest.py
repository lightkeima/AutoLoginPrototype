import requests
import json

## Post parameter check list 
## https://www.w3schools.com/python/ref_requests_post.asp

## get login information
def loginInfoRequest(data, token = ""):
    un, pw = None, None
    url = ""
    headers = {
        "Content-type": "application/json",
        #"auth-token": token
    }

    if token != "":
        headers["auth-token"] = token

    req = requests.post(url = url, data = data, headers = data)
    
    res = json.loads(req.text)

    un = res["username"]
    pw = res["password"]
    print(res)
    return un, pw 

## Receive feature vector of samples from database
def getFeatureVector(data, token = ""):
    feature = None
    url = ""
    headers = {
        "Content-type": "application/json",
        #"auth-token": token
    }

    if token != "":
        headers["auth-token"] = token
        
    req = requests.post(url = url, data = data, headers = data)
    
    res = json.loads(req.text)

    feature = res["feature_vector"]
    print(res)
    return feature

