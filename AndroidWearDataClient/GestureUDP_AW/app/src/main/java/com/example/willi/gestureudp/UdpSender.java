package com.example.willi.gestureudp;


import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import android.content.Context;
import android.net.Uri;
import android.os.Handler;
import android.util.Log;
import android.widget.Toast;

import java.io.IOException;
import java.net.*;


public class UdpSender {
    final Handler toastHandler = new Handler();
    String host = "192.168.0.101";
    int port = 4569;
    public void setPort(int port){
        this.port = port;
    }
    public void setHost(String host){
        this.host = host;
    }
    public void SendTo(byte[] msgBytes) {

        final byte[] buf = msgBytes;

        new Thread(new Runnable() {
            public void run() {
                try {
                    InetAddress serverAddress = InetAddress.getByName(host);
                    //Log.v(getString(R.string.app_name), serverAddress.getHostAddress());
                    DatagramSocket socket = new DatagramSocket();
                    if (!socket.getBroadcast()) socket.setBroadcast(true);
                    DatagramPacket packet = new DatagramPacket(buf, buf.length,
                            serverAddress, this.port);
                    socket.send(packet);
                    socket.close();
                } catch (final UnknownHostException e) {

                    e.printStackTrace();
                } catch (final SocketException e) {

                    e.printStackTrace();
                } catch (final IOException e) {

                    e.printStackTrace();
                }
            }
        }).start();
    }
}