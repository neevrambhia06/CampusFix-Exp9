package com.campusfix.config;

import com.campusfix.model.Issue;
import com.campusfix.repository.IssueRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner seedDatabase(IssueRepository repository) {
        return args -> {
            // Only seed if the database is empty
            if (repository.count() == 0) {
                List<Issue> seedIssues = List.of(
                    new Issue(
                        "Water Leakage in Lab 302",
                        "Plumbing",
                        "Academic Block B - 3rd Floor",
                        "High",
                        "In Progress",
                        "Aarav Shah",
                        "Continuous water dripping near the AC pipeline causing ceiling dampness and risk of short circuit."
                    ),
                    new Issue(
                        "Projector HDMI Port Damaged",
                        "Electronics",
                        "Seminar Hall A",
                        "Medium",
                        "Reported",
                        "Priya Sharma",
                        "The main projector display flickers intermittently due to a loose HDMI input connector."
                    ),
                    new Issue(
                        "Broken Desk in Classroom 104",
                        "Furniture",
                        "Main Building - Ground Floor",
                        "Low",
                        "Resolved",
                        "Rohan Verma",
                        "Desktop wood panel came off on desk row 3, bench number 4."
                    ),
                    new Issue(
                        "Wi-Fi Access Point Offline",
                        "Network",
                        "Central Library - 2nd Floor",
                        "High",
                        "Reported",
                        "Ananya Patel",
                        "No internet connection available near the quiet study zone since morning."
                    ),
                    new Issue(
                        "Elevator B Door Sensor Fault",
                        "Electrical",
                        "Engineering Block",
                        "High",
                        "In Progress",
                        "Karan Malhotra",
                        "Elevator doors close abruptly without sensing obstruction."
                    ),
                    new Issue(
                        "Gym Equipment Handle Broken",
                        "Facilities",
                        "Sports Complex",
                        "Low",
                        "Resolved",
                        "Neha Gupta",
                        "Cable crossover machine right handle grip is damaged."
                    )
                );

                repository.saveAll(seedIssues);
                System.out.println("✅ CampusFix database seeded with " + seedIssues.size() + " issues");
            } else {
                System.out.println("📦 Database already contains " + repository.count() + " issues — skipping seed");
            }
        };
    }
}
