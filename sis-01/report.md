# SIS #01 — Software Engineering Fundamentals, With an AI in the Loop

<!--
  This is the only file you write your report in. README.md tells you what goes where.

  Rules the checker relies on:
  - Do not delete, rename or renumber the ## headings, the ### headings, or the **Label:** words.
  - Replace every "(write here)" and "(paste here)". None may be left when you submit.
  - Comments like this one are ignored by the word counter. Delete them or leave them.
-->

**Topic:** 1.(write here)
1.1 Professional software delivery

---

## 1. Scenario

<!-- 100–150 words, labels included. One small scenario, used in every prompt and in your
     whole answer. Anything fictional is labelled in Assumptions. -->

**Question:** Explain what a customer needs beyond program code. Use AI to propose a delivery checklist, then justify the documents, tests and support your scenario needs.

**Users:** University robotics lab assistants, students, and faculty members.

**Problem:** Manual paper-based tracking of expensive hardware kits (sensors, microcontrollers) leads to lost inventory, unverified return states, and damaged equipment disputes.

**Constraints:** (1) The system must run securely on university on-premise infrastructure. (2) It must integrate with existing institutional single sign-on (SSO) authentication.

**Risk:** A student checks out a faulty or uncalibrated sensor kit, leading to project failure and unresolved disputes over who caused the damage.

**Assumptions:** (Fictional)The university provides an isolated PostgreSQL database instance, and all students possess active institutional directory accounts.

## 2. Analysis

<!-- 350–400 words. Your answer to the question, the trade-offs, and how it applies to your
     scenario. Explain at least two engineering decisions and why they fit the scenario. -->

(write here)

## 3. Review

<!-- 250–300 words. What Prompt B's critique said and what you did with it; your two source
     checks and your two substantive revisions, each with a reason. Point at the rows of the
     tables in section 9 ("verification row 2", "change-log row 1"). -->

(write here)

## 4. Conclusion

<!-- 100–150 words. Your recommendation for the scenario and its main limitation. -->

(write here)

## 5. Reflection

<!-- 150–200 words. NOT part of the main total. Written by you, not by the assistant:
     what helped, what you changed, what you learned. Specific beats flattering. -->

(write here)

## 6. References

<!-- Full references, one per line, each starting with "- ". Only sources you actually opened.
     Every URL used in the verification table must also appear here. Example:
     - Sommerville, I. (2016). Software Engineering, 10th ed., Global Edition. Pearson. Ch. 1.
-->

- (write here)

## 7. Appendix A — Initial outline

<!-- Written BEFORE you run Prompt A. Five points, your own words, numbered. These are the
     "five points" you paste into Prompt A. -->

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
- **Date:** 11.10
- **Purpose:** contextual draft

**Prompt:**

```Act as a software engineering tutor. Help me analyze topic 1.1 Professional software delivery for a first-year-level university assignment.

My scenario is Users: university robotics lab assistants, students, and faculty. Problem: Manual tracking of expensive hardware kits leads to lost equipment and unverified return states. Constraints: Must run securely on university infrastructure; must integrate with student SSO. Risk: A student checks out a faulty sensor kit leading to project failure and disputes. Assumptions: University provides an isolated PostgreSQL database instance and active student accounts. My initial ideas are [1. Program code alone is insufficient; users and administrators need installation manuals, configuration guides, and system documentation to operate and maintain the equipment booking platform safely. 2. Comprehensive test suites and verification reports must be delivered to prove the system correctly handles concurrent checkout requests without race conditions or database corruption. 3. A formal maintenance and support contract, including patch management guidelines and database backup schedules, is required for long-term reliability. 4. Operational handover documents and training materials must be provided so lab assistants can onboard new students without developer intervention. 5. Legal and liability agreements regarding equipment damage policies must be integrated into the digital checkout workflow.]. Draft a 400–500 word explanation using these details.

Separate facts from assumptions. Explain trade-offs and identify claims I should verify. Do not invent quotations, references or page numbers.
```

**Response:**

```# Topic 1.1: Professional Software Delivery — Robotics Lab Equipment Tracking

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
```

### B2 — Critique (Prompt B)

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Purpose:** critical review of the draft

**Prompt:**

```text
(paste here)
```

**Response:**

```text
(paste here)
```

### B3 — Revision (Prompt C)

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Purpose:** revision using my decisions and verified evidence

**Prompt:**

```text
(paste here)
```

**Response:**

```text
(paste here)
```

## 9. Appendix C — Evidence tables

### Verification table

<!-- At least two complete rows. Source and locator: title + page / slide / section / chapter,
     or title + URL + access date (YYYY-MM-DD). Decision: keep, qualify or reject — one word. -->

| AI claim | Source and locator | Evidence found | Decision |
| --- | --- | --- | --- |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |

### Change log

<!-- At least two substantive revisions. Your final version must differ from the AI wording,
     and the reason must say which evidence or scenario constraint made you change it. -->

| AI wording / suggestion | Your final version | Reason for change |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |
