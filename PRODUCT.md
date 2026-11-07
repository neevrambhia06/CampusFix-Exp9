# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Campus Residents & Students**: Reporting living space issues (dormitories, common areas, dining facilities) with quick photo logging and tracking real-time repair status from smartphones.
- **Academic Faculty & Department Staff**: Requesting scheduled maintenance and urgent repairs in lecture halls, departmental offices, and high-consequence research laboratories.
- **Facilities & Maintenance Crews (Technicians)**: Managing an active field queue on mobile devices, updating step-by-step resolution stages (In Progress, Resolved), and logging work parts.
- **Campus Operations & Administrators**: Triage dispatchers and campus executives overseeing SLA compliance, facility health analytics, recurring failures across buildings, and staff rostering.

## Product Purpose

Fixora transforms university facility management from chaotic, paper-based work orders and unmonitored group chats into a streamlined, real-time incident resolution platform. Its core purpose is to minimize turnaround latency from issue identification to verified physical resolution across higher-education campus environments.

## Positioning

Unlike generic IT service desks or complex enterprise CAFM systems, Fixora is purpose-built for university campus ecosystems: combining sub-minute student mobile ticket filing with automated academic priority triage, localized building zone routing, and verifiable photo-inspected work closeouts.

## Operating Context

- **Physical Environment**: 14+ university campus zones including multi-story student residences, lecture auditoriums, science blocks, athletic complexes, and central administrative buildings.
- **Device Contexts**: Students and technicians access on mobile web browsers (often in transit or at the site of repair); faculty and administrators access on desktop workstations in academic offices and dispatch hubs.
- **Operating Rituals**: Daily technician shift queues, periodic supervisor SLA audits, emergency hazard escalations (water leaks, HVAC pressure faults, electrical outages).

## Capabilities and Constraints

- **Multi-Role Workflows**: Tailored views and permissions for Students, Faculty, Field Technicians, and Operations Administrators.
- **Rapid Reporting**: Sub-30-second ticket filing with automated room selection, category classification, and photo attachment.
- **Automated Severity Triage**: Safety hazards and critical laboratory infrastructure automatically flagged as High Priority with SLA countdowns.
- **Real-Time Audit Trail**: Lifecycle timestamping tracking reported time, crew dispatch, parts replacement, and final verification.
- **Public SaaS Presence**: Dedicated marketing and onboarding landing page adhering to a disciplined 3-color tone design system (`#004643` Primary Teal, `#0F172A` Neutral Slate, `#D97706` Solar Amber).
- **Technical Scope**: Production web application built on React, Vite, React Router, and standard Web APIs.

## Brand Commitments

- **Name**: Fixora (formerly CampusFix).
- **Tagline**: "Report it. Track it. Fix it."
- **Brand Identity**: Institutional reliability, modern SaaS precision, and high-trust academic operations.
- **Brand Mark**: ShieldCheck glyph in deep aquamarine with emerald/amber accents.

## Evidence on Hand

- Fully structured React application under `frontend/src/` with interactive routing (`LandingPage`, `Dashboard`, `Issues`, `IssueDetails`, `ReportIssue`, `MyReports`, `AdminDashboard`).
- Standardized mock data and issue service models (`mockData.js`, `issueService.js`, `CampusFixContext.jsx`).
- University project documentation and laboratory requirements reports (`Fixora_Project_Report.docx`, `Fixora_WMD_Project_Report_New_Template.docx`).

## Product Principles

1. **Frictionless Ingestion**: Submitting a ticket must take under 30 seconds with minimal cognitive overhead.
2. **Transparent Operational Truth**: Both reporter and supervisor always see the exact current stage, assigned crew, and elapsed SLA time.
3. **Role-Optimized Ergonomics**: Mobile-friendly rapid status taps for on-site technicians; dense scanability for administrative dispatchers.
4. **Verifiable Quality Floor**: Tickets are closed out only when physical repair evidence and photo inspection logs are documented.

## Accessibility & Inclusion

- Adherence to WCAG 2.1 AA standards across all form inputs, contrast ratios (4.5:1 minimum on normal text), and interactive touch points.
- 44×44px minimum touch targets on mobile queues and report submission actions.
- Explicit keyboard focus indicators and support for `prefers-reduced-motion`.
