package com.aglayatech.licorstore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class LicorstoreApplication implements CommandLineRunner{
	
	@Autowired
	private BCryptPasswordEncoder passwordEnconder;

	public static void main(String[] args) {
		SpringApplication.run(LicorstoreApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		String password = "12345";
		
		for(int i = 0; i < 4; i++) {
			String passwordBcrypt = passwordEnconder.encode(password);
			System.out.println(passwordBcrypt);
		}
	}

}
