import socket

TCP_HOST = '192.168.0.101'
TCP_PORT = 27015

UDP_IP = '192.168.0.101'
UDP_PORT = 4569

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
   
    # initialize the socket and bind it
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    #sock.setblocking(0)
    sock.bind((UDP_IP, UDP_PORT))
    # receive data from watch
    while True:
        print("Data: ")
        data, addr = sock.recvfrom(1024)
        print(data)
