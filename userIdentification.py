import time
import random
from pynput.keyboard import Key, Controller
from pathlib import Path
import socket



def HTTPSRequest(uid):
    # implement httpsrequest
    return username, password

def SendUserNameAndPassword(username, password):
    bytesToSend = str.encode(username)
    UDPClientSocket.sendto(bytesToSend, serverAddressPort)
    bytesToSend = str.encode(password)
    UDPClientSocket.sendto(bytesToSend, serverAddressPort)


UDPClientSocket = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)


serverAddressPort   = ("192.168.0.106", 27015)
bufferSize          = 1024
username = None
password = None
while(True):
    #TODO: RUN IDENTIFICATION MODEL
    #TODO: HTTPS REQUEST TO PROFILE SERVICE
    #AFTER THAT SEND USER NAME AND PASSWORD TO CREDENTIAL PROVIDER SOCKET
    SendUserNameAndPassword(username, password)
    print("ok")
    time.sleep(5)
UDPClientSocket.close()
