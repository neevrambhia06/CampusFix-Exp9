package com.campusfix.service;

import com.campusfix.model.Issue;
import com.campusfix.repository.IssueRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IssueService {

    private final IssueRepository issueRepository;

    public IssueService(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    // GET all issues
    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    // GET single issue by id
    public Optional<Issue> getIssueById(Long id) {
        return issueRepository.findById(id);
    }

    // POST create new issue
    public Issue createIssue(Issue issue) {
        return issueRepository.save(issue);
    }

    // PUT replace entire issue
    public Optional<Issue> updateIssue(Long id, Issue updatedIssue) {
        return issueRepository.findById(id).map(existing -> {
            existing.setTitle(updatedIssue.getTitle());
            existing.setCategory(updatedIssue.getCategory());
            existing.setLocation(updatedIssue.getLocation());
            existing.setPriority(updatedIssue.getPriority());
            existing.setStatus(updatedIssue.getStatus());
            existing.setReporter(updatedIssue.getReporter());
            existing.setDescription(updatedIssue.getDescription());
            return issueRepository.save(existing);
        });
    }

    // PATCH partial update
    public Optional<Issue> patchIssue(Long id, Issue patchData) {
        return issueRepository.findById(id).map(existing -> {
            if (patchData.getTitle() != null) existing.setTitle(patchData.getTitle());
            if (patchData.getCategory() != null) existing.setCategory(patchData.getCategory());
            if (patchData.getLocation() != null) existing.setLocation(patchData.getLocation());
            if (patchData.getPriority() != null) existing.setPriority(patchData.getPriority());
            if (patchData.getStatus() != null) existing.setStatus(patchData.getStatus());
            if (patchData.getReporter() != null) existing.setReporter(patchData.getReporter());
            if (patchData.getDescription() != null) existing.setDescription(patchData.getDescription());
            return issueRepository.save(existing);
        });
    }

    // DELETE issue
    public boolean deleteIssue(Long id) {
        if (issueRepository.existsById(id)) {
            issueRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
