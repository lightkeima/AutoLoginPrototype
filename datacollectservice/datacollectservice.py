import socket
import numpy

TCP_HOST = '192.168.0.101'
TCP_PORT = 27015

UDP_IP = '192.168.0.101'
UDP_PORT = 4569

NUMBER_SAMPLE_RECEIVE = 512

def SendATCPMessage(username, password):
    username = str.encode(username)
    password = str.encode(password)
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((TCP_HOST, TCP_PORT))
        s.sendall(username)
        data = s.recv(1024)
        print('Received', repr(data))
        s.sendall(password)
        data = s.recv(1024)
        print('Received', repr(data))
        data = s.recv(1024)

if __name__ == '__main__':
    
    count = 0
    # initialize the socket and bind it
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    #sock.setblocking(0)
    sock.bind((UDP_IP, UDP_PORT))
    # receive data from watch
    segment = None
    while True:
        data, addr = sock.recvfrom(1024)
        if count == 0:
            segment = numpy.array(data)
            count += 1
        elif count < NUMBER_SAMPLE_RECEIVE:
            segment = numpy.vstack([segment, data])
            count += 1
        else:
            ## perform prediction
            ## send http request 
            
            count == 0
