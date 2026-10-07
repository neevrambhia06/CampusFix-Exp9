package com.campusfix.controller;

import com.campusfix.model.Issue;
import com.campusfix.service.IssueService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    // ==================== HEALTH CHECK ====================

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "CampusFix Spring Boot Backend",
                "message", "CampusFix API is running successfully"
        ));
    }

    // ==================== ISSUE CRUD ENDPOINTS ====================

    // GET /api/issues — Fetch all issues
    @GetMapping("/issues")
    public ResponseEntity<List<Issue>> getAllIssues() {
        List<Issue> issues = issueService.getAllIssues();
        return ResponseEntity.ok(issues);
    }

    // GET /api/issues/{id} — Fetch single issue
    @GetMapping("/issues/{id}")
    public ResponseEntity<Object> getIssueById(@PathVariable Long id) {
        return issueService.getIssueById(id)
                .<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Issue not found")));
    }

    // POST /api/issues — Create new issue
    @PostMapping("/issues")
    public ResponseEntity<Issue> createIssue(@RequestBody Issue issue) {
        Issue created = issueService.createIssue(issue);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // PUT /api/issues/{id} — Replace entire issue
    @PutMapping("/issues/{id}")
    public ResponseEntity<Object> updateIssue(@PathVariable Long id, @RequestBody Issue issue) {
        return issueService.updateIssue(id, issue)
                .<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Issue not found")));
    }

    // PATCH /api/issues/{id} — Partial update
    @PatchMapping("/issues/{id}")
    public ResponseEntity<Object> patchIssue(@PathVariable Long id, @RequestBody Issue patchData) {
        return issueService.patchIssue(id, patchData)
                .<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Issue not found")));
    }

    // DELETE /api/issues/{id} — Delete issue
    @DeleteMapping("/issues/{id}")
    public ResponseEntity<Object> deleteIssue(@PathVariable Long id) {
        if (issueService.deleteIssue(id)) {
            return ResponseEntity.ok(Map.of("success", true, "id", id));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Issue not found"));
    }
}
