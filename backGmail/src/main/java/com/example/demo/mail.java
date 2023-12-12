package com.example.demo;

import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

public class mail {
    private ArrayList<String> sentToMails;
    private String date;
    private String title;
    private String sender;
    private String message;
    private byte[] attachment;
    private String attType;

    public String getAttType() {
        return attType;
    }

    public void setAttType(String attType) {
        this.attType = attType;
    }

    @Override
    public String toString() {
        return "mail{" +
                "sentToMails=" + sentToMails +
                ", date='" + date + '\'' +
                ", title='" + title + '\'' +
                ", sender='" + sender + '\'' +
                ", message='" + message + '\'' +
                ", attachment=" + attachment +
                '}';
    }

    public ArrayList<String> getSentToMails() {
        return sentToMails;
    }

    public void setSentToMails(ArrayList<String> sentToMails) {
        this.sentToMails = sentToMails;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public byte[] getAttachment() {
        return attachment;
    }

    public void setAttachment(byte[] attachment) {
        this.attachment = attachment;
    }
}
