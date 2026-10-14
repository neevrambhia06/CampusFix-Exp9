package com.campusfix.controller;

import com.campusfix.model.Issue;
import com.campusfix.service.IssueService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class IssueController {

    private final IssueService issueService;

    public IssueController(IssueService issueService) {
        this.issueService = issueService;
    }

    // ==================== ROOT & HEALTH CHECK ====================

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> root() {
        return ResponseEntity.ok(Map.of(
                "service", "Fixora Spring Boot REST API",
                "status", "UP",
                "endpoints", List.of("/api/health", "/api/issues")
        ));
    }

    @GetMapping({"/api/health", "/health"})
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "Fixora Spring Boot Backend",
                "message", "Fixora API is running successfully"
        ));
    }

    // ==================== ISSUE CRUD ENDPOINTS ====================

    // GET /api/issues or /issues — Fetch all issues
    @GetMapping({"/api/issues", "/issues"})
    public ResponseEntity<List<Issue>> getAllIssues() {
        List<Issue> issues = issueService.getAllIssues();
        return ResponseEntity.ok(issues);
    }

    // GET /api/issues/{id} or /issues/{id} — Fetch single issue
    @GetMapping({"/api/issues/{id}", "/issues/{id}"})
    public ResponseEntity<Object> getIssueById(@PathVariable Long id) {
        return issueService.getIssueById(id)
                .<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Issue not found")));
    }

    // POST /api/issues or /issues — Create new issue
    @PostMapping({"/api/issues", "/issues"})
    public ResponseEntity<Issue> createIssue(@RequestBody Issue issue) {
        Issue created = issueService.createIssue(issue);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // PUT /api/issues/{id} or /issues/{id} — Replace entire issue
    @PutMapping({"/api/issues/{id}", "/issues/{id}"})
    public ResponseEntity<Object> updateIssue(@PathVariable Long id, @RequestBody Issue issue) {
        return issueService.updateIssue(id, issue)
                .<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Issue not found")));
    }

    // PATCH /api/issues/{id} or /issues/{id} — Partial update
    @PatchMapping({"/api/issues/{id}", "/issues/{id}"})
    public ResponseEntity<Object> patchIssue(@PathVariable Long id, @RequestBody Issue patchData) {
        return issueService.patchIssue(id, patchData)
                .<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "Issue not found")));
    }

    // DELETE /api/issues/{id} or /issues/{id} — Delete issue
    @DeleteMapping({"/api/issues/{id}", "/issues/{id}"})
    public ResponseEntity<Object> deleteIssue(@PathVariable Long id) {
        if (issueService.deleteIssue(id)) {
            return ResponseEntity.ok(Map.of("success", true, "id", id));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Issue not found"));
    }
}
