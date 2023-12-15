package com.example.demo;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Optional;

@RestController
@CrossOrigin(origins="*")
public class services {

    @Autowired
    private Control userDataService;

    @GetMapping("/users")
    public ArrayList<UserData> getUsers() {
        return userDataService.getUsersData();
    }

    @PostMapping("/users/add")
    public void addUser(@RequestBody UserData userData){
        ArrayList<UserData> usersData = userDataService.getUsersData();
        try {
            String hashedPassword = Hashing.getHashedHex(Hashing.getHashedBytes(userData.getPassword()));
            userData.setPassword(hashedPassword);
            userData.setIndex(usersData.size());
            usersData.add(userData);
            userDataService.writeUsersData(usersData);

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/users/{email}")
    public UserData getUsers(@PathVariable String email ) {
        return userDataService.getUserByEmail(email);
    }
    @PostMapping("/checkPass/{email}")
    public ResponseEntity<UserData> checkLogin(@PathVariable String email, @RequestBody String password) throws NoSuchAlgorithmException {
        UserData sentUser = userDataService.getUserByEmail(email);
        password = password.replaceAll("\"", "");

        if (sentUser != null) {
            try {
                String hashedInputPassword = Hashing.getHashedHex(Hashing.getHashedBytes(password));

                if (hashedInputPassword.equals(sentUser.getPassword())) {
                    System.out.println("Login successful");
                    return ResponseEntity.ok(sentUser);
                } else {
                    System.out.println("Incorrect password");
                }
            } catch (NoSuchAlgorithmException e) {
                System.out.println("Error hashing password");
                throw new RuntimeException(e);
            }
        }


        return ResponseEntity.notFound().build();
    }
    @PutMapping("/updatePassword/{email}")
    public void updatePassword(@PathVariable String email, @RequestBody String newPassword) {

        newPassword=newPassword.replaceAll("\"","");
        ArrayList<UserData> usersData = userDataService.getUsersData();
        UserData user = userDataService.getUserByEmail(email) ;
        int x = user.getIndex();

        try {
            newPassword = Hashing.getHashedHex(Hashing.getHashedBytes(newPassword));
            usersData.get(x).updatePassword(newPassword);
            userDataService.writeUsersData(usersData);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }

    }
    @PostMapping("/sendMail")
    public ResponseEntity<String> sendMail(@RequestBody mail mailObject) {
        System.out.println(mailObject.toString());
        try {
            ArrayList<UserData>usersData=userDataService.getUsersData();
            ArrayList<Integer>index=new ArrayList<>();
            ArrayList<String>sentTo=mailObject.getSentToMails();
            for(int i=0;i<mailObject.getSentToMails().size();i++){
                index.add(userDataService.getUserByEmail(sentTo.get(i)).getIndex());
            }
            for(int i=0;i<index.size();i++){
                int id=usersData.get(index.get(i)).getMsgId()+1;
                mail temp=mailObject;
                temp.setId(id);
                usersData.get(index.get(i)).addMailInbox(temp);
                usersData.get(index.get(i)).setMsgId(id);
            }
            int idSender=userDataService.getUserByEmail(mailObject.getSender()).getMsgId()+1;
            mail temp=mailObject;
            temp.setId(idSender);
            UserData sender=userDataService.getUserByEmail(mailObject.getSender());
            usersData.get(sender.getIndex()).addMailSent(temp);
            usersData.get(sender.getIndex()).setMsgId(idSender);
            userDataService.writeUsersData(usersData);
            return new ResponseEntity<>("Mail sent successfully", HttpStatus.OK);
        } catch (Exception e) {

            return new ResponseEntity<>("Failed to send mail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/draft")
    public ResponseEntity<String> addToDraft(@RequestBody mail mailObject) {
        System.out.println(mailObject.getSender());
        try {
            ArrayList<UserData>usersData=userDataService.getUsersData();
            UserData sender=userDataService.getUserByEmail(mailObject.getSender());
            mailObject.setId(sender.getMsgId()+1);
            usersData.get(sender.getIndex()).getDraft().add(mailObject);
            System.out.println(usersData);
            userDataService.writeUsersData(usersData);
            return new ResponseEntity<>("Mail sent successfully", HttpStatus.OK);
        } catch (Exception e) {

            return new ResponseEntity<>("Failed to send mail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/removeDraft/{id}")
    public ResponseEntity<String> removeDraft(@RequestBody mail mailObject , @PathVariable int id) {
        System.out.println("draftttt"+mailObject.toString());
        try {

            ArrayList<UserData>usersData=userDataService.getUsersData();

            UserData sender=userDataService.getUserByEmail(mailObject.getSender());
            int z=userDataService.getMsgIndByID(usersData.get(sender.getIndex()).getDraft(),id);
            usersData.get(sender.getIndex()).getDraft().remove(z);
            userDataService.writeUsersData(usersData);
            return new ResponseEntity<>("Mail sent successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to send mail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/checkExist")
    public boolean checkExist(@RequestBody String email){
        ArrayList<UserData> users =userDataService.getUsersData();
        email=email.replaceAll("\"","");
        for(UserData x:users){
            if(x.getEmail().equals(email)){
                return true;
            }
        }
        return false;
    }
    @PostMapping("/updateMessages/{email}")
    public void updateMessage(@PathVariable String email, @RequestBody UserData user) {
        ArrayList<UserData> usersData = userDataService.getUsersData();
        System.out.println(usersData);
        try {
            System.out.println("deleted");
            usersData.remove(user.getIndex()) ;
            usersData.add(user.getIndex(),user);
            userDataService.writeUsersData(usersData);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}