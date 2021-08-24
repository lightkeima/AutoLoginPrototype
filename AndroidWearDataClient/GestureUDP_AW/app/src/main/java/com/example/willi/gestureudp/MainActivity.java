package com.example.willi.gestureudp;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.support.wearable.view.WatchViewStub;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.google.gson.Gson;

import java.io.IOException;
import java.net.*;
import java.util.ArrayList;

public class MainActivity extends Activity implements SensorEventListener {

    private WatchViewStub mStub;
    private Button switchButton;
    private SensorManager mSensorManager;
    //private Sensor mSensor;
    private Sensor accSensor;
    private Sensor gyroSensor;

    private boolean accStatus = false;
    private boolean gyrStatus = false;
    private DataNode dataNode;
    private long pktNum;
    private int app_status = Config.APP_STATUS_NONE;
    private EditText et1;
    private EditText et2;
    private ArrayList<SPRING> springList;
    private UdpSender sender2 = new UdpSender();
    public MainActivity() throws SocketException, UnknownHostException {
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //initialize the UI
        setContentView(R.layout.main_activity);
        switchButton = (Button) findViewById(R.id.button);
        et1 = (EditText) findViewById(R.id.edit1);
        et2 = (EditText) findViewById(R.id.edit2);

        switchButton.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        switch (app_status) {
                            case Config.APP_STATUS_NONE: {
                                sender2.setHost(et1.getText().toString());
                                String sTextFromET = et2.getText().toString();
                                int nIntFromET = new Integer(sTextFromET).intValue();
                                sender2.setPort(nIntFromET);
                                startRecognition();
                                break;
                            }
                            case Config.APP_STATUS_RECOGNITION: {
                                stopRecognition();
                                break;
                            }
                        } }
                });

        //get the socket sender

        //initialize sensors
        mSensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        accSensor = mSensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        gyroSensor = mSensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE);
    }

    /**
     * before recognition, initialize the signal processing parameters, such as the template gesture model
     * and start sensors
     */
    private void startRecognition() {
        app_status = Config.APP_STATUS_RECOGNITION;

        pktNum = 0;

        GestureModel gestureModel = null ;
        try {
            gestureModel = FileUtil.loadTemplate(this);
        } catch (IOException e) {
            e.printStackTrace();
        }

        springList = new ArrayList<>();
        springList.add(new SPRING(gestureModel));

        switchButton.setText(Config.SWITCH_BUTT_TXT_STOP_RECOGNITION);
        switchButton.setBackgroundColor(Color.RED);
        mSensorManager.registerListener(this, accSensor, 0);
        mSensorManager.registerListener(this, gyroSensor, 0);
    }

    /**
     * stop recognizing, unregister sensors
     */
    private void stopRecognition() {
        app_status = Config.APP_STATUS_NONE;

        switchButton.setBackgroundColor(Color.GREEN);
        switchButton.setText(Config.SWITCH_BUTT_TXT_START_RECOGNITION);
        mStub.setBackgroundColor(Color.WHITE);
        mSensorManager.unregisterListener(this);

    }

    @Override
    public void onPause() {
        super.onPause();
        mSensorManager.unregisterListener(this);
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        // If sensor is unreliable, then just return

        if(!accStatus && !gyrStatus) {
            dataNode = new DataNode();
        }

        if (event.sensor.getType() == Sensor.TYPE_ACCELEROMETER) {
            accStatus = true;
            dataNode.setACC(event);
        }
        else if (event.sensor.getType() == Sensor.TYPE_GYROSCOPE) {
            gyrStatus = true;
            dataNode.setGYR(event);
        }

        //do not do signal processing until we get both acc data and gyro data
        if (accStatus && gyrStatus) {
            accStatus = false;
            gyrStatus = false;

            long currentTime = System.currentTimeMillis();
            dataNode.setTimeStamp(currentTime);
            dataNode.setPktNum(++pktNum);
            switch (app_status) {
                case Config.APP_STATUS_RECOGNITION:
                {
                    String json = new Gson().toJson(dataNode);

                    //for (int i = 0; i < springList.size(); i++) {   //this is for the situation that several gestures are recognized at the same time
                    //int result = springList.get(i).SignalProcess(dataNode, (int) pktNum);
                    //if (result == Config.SPRING_TYPE_GESTURE) {
                    //Toast.makeText(this, springList.get(i).getName(), Toast.LENGTH_SHORT).show();
                    sender2.SendTo(json.getBytes());  //found a gesture, send message to server through UDPs
                    //}
                }
                break;
            }
            /*
            switch (app_status) {
                case Config.APP_STATUS_RECOGNITION: {
//                    for (int i = 0; i < springList.size(); i++) {   //this is for the situation that several gestures are recognized at the same time
//                        int result = springList.get(i).SignalProcess(dataNode, (int) pktNum);
//                        if (result == Config.SPRING_TYPE_GESTURE) {
//                            Toast.makeText(this, springList.get(i).getName(), Toast.LENGTH_SHORT).show();
//                            sender.send(springList.get(i).getName() + "found!", this);  //found a gesture, send message to server through UDPs
//                        }
//                    }
                    String json = new Gson().toJson(dataNode);
//

                    }
                    break;
                }
            }*/


        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {

    }
}
