package com.cloudpulse.dev;

import org.springframework.context.annotation.*;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")                                     // Allow CORS for all endpoints
                .allowedOrigins("http://localhost:3000")                         // Frontend origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")       // Allowed HTTP methods
                .allowedHeaders("*")                                             // Allow all headers
                .allowCredentials(true);                                         // Allow credentials if needed
    }
}

