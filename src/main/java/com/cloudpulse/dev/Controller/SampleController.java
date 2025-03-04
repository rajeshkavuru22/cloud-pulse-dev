package com.cloudpulse.dev.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SampleController {

    @RequestMapping("welcome")
    public String welcome(){
        return "Welcome to Springboot Project";
    }

}
