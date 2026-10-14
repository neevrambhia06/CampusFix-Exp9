package com.campusfix.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
public class AuthController {

    // POST /api/auth/login or /auth/login
    @PostMapping({"/api/auth/login", "/auth/login"})
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.getOrDefault("username", "").trim();
        String password = credentials.getOrDefault("password", "").trim();

        if ("admin".equalsIgnoreCase(username) && "admin".equals(password)) {
            Map<String, Object> adminUser = Map.of(
                    "id", "ADM-2026-01",
                    "name", "Campus Administrator",
                    "username", "admin",
                    "role", "Admin",
                    "department", "Campus Maintenance Directorate",
                    "email", "admin@fixora.edu",
                    "avatar", "🛡️"
            );

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Admin authentication successful",
                    "token", "adm_" + UUID.randomUUID().toString().replace("-", ""),
                    "user", adminUser
            ));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                "success", false,
                "message", "Invalid credentials. Use username: admin and password: admin"
        ));
    }
}
