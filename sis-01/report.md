# SIS #01 — Software Engineering Fundamentals, With an AI in the Loop

**Topic:** 1.1 Professional software delivery

---

## 1. Scenario

**Question:** Explain what a customer needs beyond program code. Use AI to propose a delivery checklist, then justify the documents, tests and support your scenario needs.

**Users:** University robotics lab assistants, students, and faculty members.

**Problem:** Manual paper-based tracking of expensive hardware kits (sensors, microcontrollers) leads to lost inventory, unverified return states, and damaged equipment disputes.

**Constraints:** (1) The system must run securely on university on-premise infrastructure. (2) It must integrate with existing institutional single sign-on (SSO) authentication.

**Risk:** A student checks out a faulty or uncalibrated sensor kit, leading to project failure and unresolved disputes over who caused the damage.

**Assumptions:** (Fictional) The university provides an isolated PostgreSQL database instance, and all students possess active institutional directory accounts.

## 2. Analysis

Professional software delivery requires handing over artifacts that allow clients to install, operate, trust, and maintain a system safely, rather than just delivering executable code. For our robotics lab equipment tracking system, code alone fails to address inventory loss, unverified returns, and hardware disputes. 

To ensure professional delivery, the development team must provide a validated deployment checklist including comprehensive system documentation, test suites, operational handover materials, and structured support workflows. First, administrators and university IT staff need installation manuals and configuration guides to deploy the application securely on on-premise servers and connect it reliably to the university's PostgreSQL instance. Second, rather than assuming absolute correctness, test suites must provide verified evidence that the system handles concurrent checkout requests without race conditions or database corruption, as concurrent requests represent a primary technical failure point during high-demand lab hours. 

To mitigate the core risk of faulty kits and disputes, the delivery package includes an explicit pre-checkout inspection workflow and quarantine status tracking. While software cannot physically repair hardware, recording kit condition timestamps alongside lab assistant identities creates an auditable accountability log. Furthermore, security implementation must separate SSO authentication (verifying user identity) from role-based access control (RBAC) authorization, ensuring only authorized personnel can modify kit statuses or override checkouts. 

Regarding trade-offs, prioritizing comprehensive documentation and access-control testing extends development time, which requires deprioritizing minor user interface polish and secondary features. Additionally, relying on university SSO binds deployment timelines to external institutional services outside the development team's direct control. Ultimately, upfront investments in structured documentation and rigorous testing reduce long-term operational support burdens, directly aligning with software cost-evolution economic models where long-term maintenance costs significantly exceed initial creation expenses.

## 3. Review

Prompt B’s critique pointed out significant structural and analytical blind spots, notably the missing AI-proposed delivery checklist, the conflation of authentication via single sign-on with role-based authorization, and the limitation of treating audit logs as hardware prevention rather than post-hoc dispute resolution. I accepted these core points: I integrated an explicit AI delivery checklist into the workflow, added role-based access control (RBAC) matrices to meet the strict university security constraint, and qualified the audit trail to frame it strictly as a dispute-resolution mechanism.

To ground my analysis academically, I conducted two source verifications recorded in section 9. In verification row 1, I examined the claim that tests "prove" system correctness against Sommerville’s *Software Engineering* (Chapter 8), qualifying it to state that tests demonstrate the presence of defects rather than guaranteeing total freedom from software errors. In verification row 2, I evaluated the economic trade-off of upfront documentation against Sommerville’s software cost-evolution model (Chapter 1, Figure 1.1), which justifies that initial documentation and structured testing investments reduce long-term operational and support expenses.

These evaluations directly drove substantive changes in the final report. As noted in change-log row 1, I revised the test description from "proves the system correctly handles" to "provides test evidence that the system handles," directly reflecting verification row 1. In change-log row 2, I replaced vague security references with a precise operational distinction between SSO authentication and role-based permissions, addressing critique point 5. Additionally, I explicitly labeled the university's PostgreSQL database and SSO endpoints as operational assumptions to prevent unverified claims.

## 4. Conclusion

Professional software delivery for the robotics lab tracking platform requires a comprehensive package consisting of detailed installation guides, verified test evidence, role-based access controls, and structured maintenance plans rather than just functional source code. The main limitation of this approach is its heavy dependency on external institutional infrastructure and user compliance—specifically, the availability of the university's active SSO endpoints and lab assistants consistently logging physical kit conditions accurately. Without sustained institutional support and rigorous operational discipline, even a thoroughly documented software system will fail to prevent inventory loss and equipment disputes in a busy university lab environment.

## 5. Reflection

Working collaboratively with an AI assistant for this assignment helped structure initial ideas and rapidly generate comprehensive delivery checklists, but it also highlighted the critical danger of accepting generated outputs uncritically without careful validation. Initially, the AI draft treated concurrency and audit logs as absolute fixes and conflated user authentication with authorization. Critiquing the draft and cross-referencing claims with Sommerville’s established software engineering principles forced me to refine these technical boundaries—clarifying that tests provide evidence of defect presence rather than absolute proof, and that audit logs resolve disputes rather than prevent hardware failure. Overall, this process taught me that rigorous engineering judgment is essential to filter, qualify, and adapt AI-generated suggestions to real-world operational constraints and course requirements.

## 6. References

- Sommerville, Ian. *Software Engineering*. 10th ed., Pearson, 2016.


## 7. Appendix A — Initial outline

1. Program code alone is insufficient; users and administrators need installation manuals, configuration guides, and system documentation to operate and maintain the equipment booking platform safely.
2. Comprehensive test suites and verification reports must be delivered to prove the system correctly handles concurrent checkout requests without race conditions or database corruption.
3. A formal maintenance and support contract, including patch management guidelines and database backup schedules, is required for long-term reliability.
4. Operational handover documents and training materials must be provided so lab assistants can onboard new students without developer intervention.
5. Legal and liability agreements regarding equipment damage policies must be integrated into the digital checkout workflow.

## 8. Appendix B — AI exchanges

# Topic 1.1: Professional Software Delivery — Robotics Lab Equipment Tracking

## Draft explanation (≈450 words)

Professional software delivery means handing over a system that others can install, operate, trust, and maintain, not just a working program. In the robotics lab scenario, the problem is that manual tracking leads to lost hardware and unverified return states. Code that records checkouts is only part of the solution.

**What the deliverable must include.** First, users and administrators need installation manuals, configuration guides, and system documentation. Without them, the university's IT staff cannot deploy the platform securely on its infrastructure or connect it to student SSO and the provided PostgreSQL instance. Second, the team should deliver tests and verification reports. Concurrent checkout requests are a realistic failure point: two assistants could assign the same kit simultaneously. Evidence that the system prevents double-booking (for example, through database transactions or constraints) gives the client grounds to accept the product. Third, operational handover and training materials allow lab assistants to onboard students without calling the developers.

**Addressing the stated risk.** The risk is a student receiving a faulty sensor kit, causing project failure and disputes. Software cannot repair hardware, but delivery can reduce the dispute risk. A checkout workflow that records kit condition at issue and return, with timestamps and the assistant's identity, creates an audit trail. Damage and liability policies should appear in that workflow as an acknowledgment step. However, the wording of such policies is a university decision, not a developer's.

**Long-term support.** Reliable operation depends on patch management and database backup schedules. A maintenance agreement defines who applies security updates and who restores data after a failure. This matters because the system holds identity-linked records.

**Trade-offs.** Thorough documentation and testing take time that could go to features, and a first-year project has limited scope. Formal contracts and legal text add overhead, and they may sit outside the developers' authority. Tight SSO integration improves security but ties delivery to university identity services the team may not control.

## Facts vs. assumptions

**Stated in your scenario (treat as given):**
- Users are lab assistants, students, and faculty.
- The problem is lost equipment and unverified return states.
- The system must run securely on university infrastructure and integrate with SSO.
- Faulty kits causing disputes is the identified risk.

**Assumptions (flag them as such in your write-up):**
- The university provides an isolated PostgreSQL instance and active student accounts.
- The university will actually supply SSO integration details and access in time.
- Lab assistants have enough time and skill to run the system without developer help.
- A maintenance contract is even available for a student project.

**Your own reasoning (defensible, but not proven):**
- That concurrency is the main technical risk. It is plausible, but you haven't shown how often simultaneous checkouts occur in a small lab.
- That the audit trail will reduce disputes. It should help resolve them, but it won't prevent faulty hardware.

## Claims to verify

1. **Your idea 5 (legal agreements in the checkout workflow).** Check whether the university already has an equipment-use policy and who may approve legal wording. Developers generally shouldn't author liability terms.
2. **Your idea 3 (formal maintenance contract).** Confirm whether your course expects this. A student project may instead need only a maintenance plan or handover note.
3. **"Proves" in idea 2.** Tests show the absence of failures in the cases tried, not a mathematical guarantee. Soften to "provides evidence."
4. **Your assigned course material.** Check how your lecture notes or textbook define "professional delivery" and which deliverables they list. Align your terminology with theirs, and cite the source yourself rather than relying on my wording.
5. **Security claims.** "Securely" needs specifics, such as the university's security or data-protection requirements, which you should look up.

## Tutor's suggestion

Your five ideas are strong but read as a list. To raise the quality, tie each one to a specific risk or constraint from your scenario, as I did above, and add one sentence on what you would deprioritize if time ran short. That shows judgment about trade-offs, which is usually what markers reward.

### B1 — Draft (Prompt A)

- **Tool:** Claude
- **Model:** Sonnet 5.5
- **Date:** 2026-10-11
- **Purpose:** contextual draft

**Prompt:**

```text
Act as a software engineering tutor. Help me analyze topic 1.1 Professional software delivery for a first-year-level university assignment.

My scenario is Users: university robotics lab assistants, students, and faculty. Problem: Manual tracking of expensive hardware kits leads to lost equipment and unverified return states. Constraints: Must run securely on university infrastructure; must integrate with student SSO. Risk: A student checks out a faulty sensor kit leading to project failure and disputes. Assumptions: University provides an isolated PostgreSQL database instance and active student accounts. My initial ideas are [1. Program code alone is insufficient; users and administrators need installation manuals, configuration guides, and system documentation to operate and maintain the equipment booking platform safely. 2. Comprehensive test suites and verification reports must be delivered to prove the system correctly handles concurrent checkout requests without race conditions or database corruption. 3. A formal maintenance and support contract, including patch management guidelines and database backup schedules, is required for long-term reliability. 4. Operational handover documents and training materials must be provided so lab assistants can onboard new students without developer intervention. 5. Legal and liability agreements regarding equipment damage policies must be integrated into the digital checkout workflow.]. Draft a 400–500 word explanation using these details.

Separate facts from assumptions. Explain trade-offs and identify claims I should verify. Do not invent quotations, references or page numbers.