package com.insightly.test.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Date;

@RestController
public class SimpleController {

    @GetMapping("/user")
    public String getUser() {
        return "Hello User !! " + new Date();
    }

    @PostMapping("/data")
    public String postUser(@RequestBody String request) {
        System.out.println("Request: " + request);
        return "Server received your request " + request + " at " + Instant.now().toString();
    }

    @GetMapping("/test")
    public void testFunction() {
        System.out.println("Test Invoked!");
    }

}