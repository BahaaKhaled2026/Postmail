package com.example.demo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.catalina.User;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

@Service
public class Control {
    private final ObjectMapper objectMapper = new ObjectMapper();
//7ngls'path:"D:\\vue\\Gmail\\backGmail\\usersData.json"
    //bahaa's path: "E:\\programming\\Project\\Gmail\\backGmail\\usersData.json"
    private static final String JSON_FILE_PATH = "D:\\vue\\Gmail\\backGmail\\usersData.json";
    public ArrayList<UserData> usersData;
    public void cleanTrash(ArrayList<mail>x){
        for(int i=0;i<x.size();i++){
            long secs=calculateSecondsPassed(x.get(i).getDelDate());
            if(secs>=(30*24*60*60)){
                x.remove(i);
            }
        }
    }
    public  long calculateSecondsPassed(String providedDateString) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        LocalDateTime providedDate = LocalDateTime.parse(providedDateString + "T00:00:00", formatter);
        LocalDateTime currentDate = LocalDateTime.now();
        Duration duration = Duration.between(providedDate, currentDate);
        return duration.getSeconds();
    }
    public int getMsgIndByID(ArrayList<mail>x,int id){
        for(int i=0;i<x.size();i++){
            if(id==x.get(i).getId()){
                return i;
            }
        }
        return -1;
    }

    public ArrayList<UserData> getUsersData() {
        try {
            return objectMapper.readValue(new File(JSON_FILE_PATH), new TypeReference<ArrayList<UserData>>() {});
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public void writeUsersData(ArrayList<UserData> usersData) {
        try {
            objectMapper.writeValue(new File(JSON_FILE_PATH), usersData);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public UserData getUserByEmail(String email) {
        ArrayList<UserData> usersData = getUsersData();
        for(UserData x:usersData){
            if(x.getEmail().equals(email)){
                return x;
            }
        }
        return null;
    }
}
