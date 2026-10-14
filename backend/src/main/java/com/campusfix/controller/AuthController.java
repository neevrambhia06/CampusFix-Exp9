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

        if (("student".equalsIgnoreCase(username) || "aarav".equalsIgnoreCase(username)) && ("student".equals(password) || "student123".equals(password))) {
            Map<String, Object> studentUser = Map.of(
                    "id", "STU-2026-88",
                    "name", "Aarav Shah",
                    "username", "student",
                    "role", "Student",
                    "department", "Computer Science & Engg.",
                    "email", "aarav.shah@campus.edu",
                    "avatar", "🎓"
            );

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Student authentication successful",
                    "token", "stu_" + UUID.randomUUID().toString().replace("-", ""),
                    "user", studentUser
            ));
        }

        if ("faculty".equalsIgnoreCase(username) && ("faculty".equals(password) || "faculty123".equals(password))) {
            Map<String, Object> facultyUser = Map.of(
                    "id", "FAC-2026-14",
                    "name", "Dr. Neha Sen",
                    "username", "faculty",
                    "role", "Faculty",
                    "department", "Information Technology",
                    "email", "neha.sen@campus.edu",
                    "avatar", "👩‍🏫"
            );

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Faculty authentication successful",
                    "token", "fac_" + UUID.randomUUID().toString().replace("-", ""),
                    "user", facultyUser
            ));
        }

        if (("technician".equalsIgnoreCase(username) || "tech".equalsIgnoreCase(username)) && ("technician".equals(password) || "tech".equals(password))) {
            Map<String, Object> techUser = Map.of(
                    "id", "TECH-2026-03",
                    "name", "Ramesh Patel",
                    "username", "technician",
                    "role", "Technician",
                    "department", "Electrical & Facilities",
                    "email", "ramesh.patel@fixora.edu",
                    "avatar", "🔧"
            );

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Technician authentication successful",
                    "token", "tech_" + UUID.randomUUID().toString().replace("-", ""),
                    "user", techUser
            ));
        }

        // Generic custom campus member
        if (!username.isBlank() && !password.isBlank()) {
            Map<String, Object> customUser = Map.of(
                    "id", "USR-" + Math.abs(username.hashCode() % 10000),
                    "name", username,
                    "username", username.toLowerCase(),
                    "role", "Student",
                    "department", "Campus Resident",
                    "email", username.toLowerCase() + "@campus.edu",
                    "avatar", username.substring(0, 1).toUpperCase()
            );

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Campus member authentication successful",
                    "token", "usr_" + UUID.randomUUID().toString().replace("-", ""),
                    "user", customUser
            ));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                "success", false,
                "message", "Invalid credentials. Please enter a valid username and password."
        ));
    }
}
