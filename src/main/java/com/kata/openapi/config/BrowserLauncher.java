package com.kata.openapi.config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.awt.*;
import java.net.URI;

@Component
public class BrowserLauncher implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("Desktop is supported: " + Desktop.isDesktopSupported());
        String url = "http://localhost:8080";
        if (Desktop.isDesktopSupported()) {
            Desktop.getDesktop().browse(new URI(url));
        } else {
            System.out.println("Desktop is not supported");
            System.out.println("Можно добавить в \"Run/Debug Configurations\" поле \"VM Option\" это значение: \"-Djava.awt.headless=false\"");
        }
    }
}
