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

Professional software delivery requires handing over artifacts that allow clients to install, operate, trust, and maintain a system safely, rather than just delivering executable code. For our robotics lab equipment tracking system, code alone fails to address inventory loss, unverified returns, and hardware disputes.

To ensure professional delivery, the team must provide a validated deployment checklist including system documentation, test suites, operational handover materials, and support workflows. First, administrators and university IT staff need installation manuals and configuration guides to deploy the application securely on on-premise servers and connect it to the university's PostgreSQL instance. Second, rather than assuming absolute correctness, test suites must provide verified evidence that the system handles concurrent checkout requests without race conditions or database corruption, as concurrent requests are a primary technical failure point during high-demand lab hours.

To mitigate the core risk of faulty kits and disputes, the delivery package includes an explicit pre-checkout inspection workflow and quarantine status tracking. While software cannot physically repair hardware, recording kit condition timestamps alongside lab assistant identities creates an auditable accountability log. Furthermore, security implementation must separate SSO authentication (verifying identity) from role-based access control (RBAC) authorization, ensuring only authorized assistants can modify kit statuses or override checkouts.

Regarding trade-offs, prioritizing comprehensive documentation and access-control testing extends development time, which requires deprioritizing minor UI polish. Additionally, relying on university SSO binds deployment timelines to external IT services outside the development team's direct control. Ultimately, upfront investments in structured documentation and testing reduce long-term operational support burdens, aligning with software cost-evolution models where maintenance costs exceed initial creation.

## 3. Review

Prompt B’s critique pointed out significant structural and analytical blind spots, notably the missing AI-proposed delivery checklist, the conflation of authentication via SSO with authorization, and the limitation of treating audit logs as hardware prevention rather than post-hoc dispute resolution. I accepted these core points: I integrated an explicit AI delivery checklist into the workflow, added role-based access control (RBAC) matrices to meet the university security constraint, and qualified the audit trail to frame it strictly as a dispute-resolution mechanism.

To ground my analysis academically, I conducted two source verifications recorded in section 9. In verification row 1, I examined the claim that tests "prove" system correctness against Sommerville’s *Software Engineering* (Chapter 8), qualifying it to state that tests demonstrate the presence of defects rather than guaranteeing total freedom from errors. In verification row 2, I evaluated the economic trade-off of upfront documentation against Sommerville’s software cost-evolution model (Chapter 1, Figure 1.1), which justifies that initial documentation and structured testing investments reduce long-term operational and support expenses.

These evaluations directly drove substantive changes in the final report. As noted in change-log row 1, I revised the test description from "proves the system correctly handles" to "provides test evidence that the system handles," directly reflecting verification row 1. In change-log row 2, I replaced vague security references with a precise operational distinction between SSO authentication and role-based permissions, addressing critique point 5. Additionally, I explicitly labeled the university's PostgreSQL database and SSO endpoints as operational assumptions to prevent unverified claims.

## 4. Conclusion

Professional software delivery for the robotics lab tracking platform requires a comprehensive package consisting of installation guides, verified test evidence, role-based access controls, and structured maintenance plans rather than just functional source code. The main limitation of this approach is its dependency on external institutional infrastructure and user compliance—specifically, the university's active SSO endpoints and lab assistants consistently logging physical kit conditions. Without institutional support and rigorous operational discipline, even a thoroughly documented software system will fail to prevent inventory loss and disputes.

## 5. Reflection

Working with an AI assistant for this assignment helped structure initial ideas and rapidly generate comprehensive checklists, but it also highlighted the danger of accepting generated outputs uncritically. Initially, the AI draft treated concurrency and audit logs as absolute fixes and conflated user authentication with authorization. Critiquing the draft and cross-referencing claims with Sommerville’s software engineering principles forced me to refine these technical boundaries—clarifying that tests provide evidence of defect presence rather than absolute proof, and that audit logs resolve disputes rather than prevent hardware failure. Overall, this process taught me that critical engineering judgment is required to filter, qualify, and adapt AI-generated suggestions to real-world operational constraints.

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

- **Tool:** Claude
- **Model:** Sonnet 5.5
- **Date:** 10.11
- **Purpose:** critical review of the draft

**Prompt:**

```
Review the draft below against my chosen question and scenario. Identify inaccuracies, missing reasoning, vague claims and unsupported assumptions.
For each concern, explain why it matters and how I could check it. Include a counterexample or alternative interpretation. Do not rewrite the answer yet.
Question: Explain what a customer needs beyond program code. Use AI to propose a delivery checklist, then justify the documents, tests and support your scenario needs. Scenario: Users: university robotics lab assistants, students, and faculty. Problem: Manual tracking of hardware kits leads to lost equipment and unverified return states. Constraints: Must run securely on university infrastructure; must integrate with student SSO. Risk: A student checks out a faulty sensor kit leading to project failure and disputes. Assumptions: University provides an isolated PostgreSQL database instance and active student accounts. Draft: Professional software delivery means handing over a system that others can install, operate, trust, and maintain, not just a working program. In the robotics lab scenario, the problem is that manual tracking leads to lost hardware and unverified return states. Code that records checkouts is only part of the solution.
What the deliverable must include. First, users and administrators need installation manuals, configuration guides, and system documentation. Without them, the university's IT staff cannot deploy the platform securely on its infrastructure or connect it to student SSO and the provided PostgreSQL instance. Second, the team should deliver tests and verification reports. Concurrent checkout requests are a realistic failure point: two assistants could assign the same kit simultaneously. Evidence that the system prevents double-booking (for example, through database transactions or constraints) gives the client grounds to accept the product. Third, operational handover and training materials allow lab assistants to onboard students without calling the developers.
Addressing the stated risk. The risk is a student receiving a faulty sensor kit, causing project failure and disputes. Software cannot repair hardware, but delivery can reduce the dispute risk. A checkout workflow that records kit condition at issue and return, with timestamps and the assistant's identity, creates an audit trail. Damage and liability policies should appear in that workflow as an acknowledgment step. However, the wording of such policies is a university decision, not a developer's.
Long-term support. Reliable operation depends on patch management and database backup schedules. A maintenance agreement defines who applies security updates and who restores data after a failure. This matters because the system holds identity-linked records.
Trade-offs. Thorough documentation and testing take time that could go to features, and a first-year project has limited scope. Formal contracts and legal text add overhead, and they may sit outside the developers' authority. Tight SSO integration improves security but ties delivery to university identity services the team may not control.

Facts vs. assumptions
Stated in your scenario (treat as given):
- Users are lab assistants, students, and faculty.
- The problem is lost equipment and unverified return states.
- The system must run securely on university infrastructure and integrate with SSO.
- Faulty kits causing disputes is the identified risk.

Assumptions (flag them as such in your write-up):
- The university provides an isolated PostgreSQL instance and active student accounts.
- The university will actually supply SSO integration details and access in time.
- Lab assistants have enough time and skill to run the system without developer help.
- A maintenance contract is even available for a student project.

Your own reasoning (defensible, but not proven):
- That concurrency is the main technical risk. It is plausible, but you haven't shown how often simultaneous checkouts occur in a small lab.
- That the audit trail will reduce disputes. It should help resolve them, but it won't prevent faulty hardware.

Claims to verify
- Your idea 5 (legal agreements in the checkout workflow). Check whether the university already has an equipment-use policy and who may approve legal wording. Developers generally shouldn't author liability terms.
- Your idea 3 (formal maintenance contract). Confirm whether your course expects this. A student project may instead need only a maintenance plan or handover note.
- "Proves" in idea 2. Tests show the absence of failures in the cases tried, not a mathematical guarantee. Soften to "provides evidence."
- Your assigned course material. Check how your lecture notes or textbook define "professional delivery" and which deliverables they list. Align your terminology with theirs, and cite the source yourself rather than relying on my wording.
- Security claims. "Securely" needs specifics, such as the university's security or data-protection requirements, which you should look up.

Tutor's suggestion
Your five ideas are strong but read as a list. To raise the quality, tie each one to a specific risk or constraint from your scenario, as I did above, and add one sentence on what you would deprioritize if time ran short. That shows judgment about trade-offs, which is usually what markers reward.
```

**Response:**

```# Review of your draft (no rewrite)

I've ordered these roughly by how much they would affect your grade or the credibility of the argument.

## A. Gaps against the question itself

**1. No AI-proposed checklist, and no evaluation of it**
- **Concern:** The question asks you to use AI to propose a delivery checklist and then justify the documents, tests and support. The draft contains no checklist, no mention of how AI was used, and no judgment about which AI suggestions you kept or rejected.
- **Why it matters:** The justification is the graded skill. Without the checklist, a marker can't see what you chose among.
- **How to check:** Re-read the task wording and any marking rubric. Look for whether the AI step is itself assessed.
- **Alternative reading:** The checklist may be meant as a separate appendix. If so, the draft should still refer to it and say which items it is justifying.

**2. The draft and the notes attached to it don't match**
- **Concern:** The notes refer to "idea 5" (legal agreements), "idea 3" (maintenance contract) and "idea 2" saying "proves", and say "as I did above." The draft has no numbered ideas, never uses "proves" (it says "evidence"), and doesn't list legal agreements as a deliverable. The notes also call concurrency your "main technical risk," but the draft only calls it "a realistic failure point."
- **Why it matters:** You could end up fixing claims that aren't in your text, or defending ones you didn't make.
- **How to check:** Compare the notes line by line against the draft, and decide which version is current.
- **Alternative interpretation:** The notes may come from an earlier draft. Then the draft may have lost content (a fifth idea?) that you want back.

## B. Reasoning and accuracy problems

**3. The faulty-kit risk is handled by recording, not verifying**
- **Concern:** The draft says recording condition at issue and return "creates an audit trail." But a condition field is just someone's assertion. Nothing in the draft says who tests a kit, how, or when before issue, or what happens to a kit reported faulty (quarantine status, repair tracking). "Unverified return states" is never defined, so "verified" is unclear: a checklist of contents, a functional test, or photos?
- **Why it matters:** The scenario's risk is a student receiving a faulty kit. An audit trail helps assign blame after the fact but does little to prevent the failure, so the draft addresses the dispute and not the cause.
- **How to check:** Walk through a mock dispute step by step. Ask what evidence each side would have and whether the assistant's "OK" entry would settle anything. Ask lab staff what "verified" means to them.
- **Counterexample:** A sensor passes a visual check but fails under load. The record says "good condition," the student's project fails, and the log supports neither party.

**4. The concurrency claim is unsupported and the remedy is vague**
- **Concern:** You call double-booking "realistic" without evidence about lab size or checkout frequency. "Database transactions or constraints" is also non-specific. And the fix is largely a code-level matter (a uniqueness rule on open checkouts), so it's not obviously a delivery-document issue.
- **Why it matters:** You've picked one test scenario and built your testing argument on it, which risks looking like the only risk you could think of.
- **How to check:** Ask how many assistants work at once and how often kits are issued. Rank candidate failures by likelihood and impact before choosing which tests to justify.
- **Alternative interpretation:** In a small lab, the likelier failures are stale statuses, mistyped kit IDs, SSO login failures, or a returned kit never being marked.

**5. "Securely" is never made concrete, and authorization is missing**
- **Concern:** Security appears only as a reason for documentation and SSO. SSO gives authentication (who you are), not authorization (what you may do). With three user groups, the draft never mentions role-based permissions, such as who may edit kit condition or override a checkout. It doesn't specify the SSO protocol either, and says nothing about the personal data held (identity-linked records) beyond a passing mention.
- **Why it matters:** The scenario's explicit constraint is secure operation on university infrastructure. A marker will expect specific security artifacts: a role matrix, access-control tests, data-retention rules, and security review sign-off.
- **How to check:** Find the university's IT security and data-protection policies. Ask IT which SSO standard they support and what review a new internal service must pass.
- **Counterexample:** A student with valid SSO credentials views or alters another student's checkout history because no role checks exist.

**6. Absolute claims about documentation**
- **Concern:** "Without them, the university's IT staff cannot deploy the platform" is overstated. "System documentation" is also generic: architecture, data model, runbook, or API reference?
- **Why it matters:** Overclaiming weakens credibility. Vague document names don't show you understand what each audience needs.
- **How to check:** Ask IT what they require before deploying a service (a deployment checklist, container images, a configuration template).
- **Counterexample:** IT staff with standard tooling could deploy from a short README plus an environment-variable list, while a 40-page manual goes unread.

**7. The test coverage is too narrow to justify "grounds to accept"**
- **Concern:** The only test named is double-booking. Missing are acceptance criteria agreed with the client, SSO integration tests, backup-and-restore verification, access-control tests, and a trial with real lab assistants. Passing tests also doesn't equal client acceptance, which depends on agreed criteria.
- **Why it matters:** The question asks you to justify the tests your scenario needs, and only one scenario-specific test is argued.
- **How to check:** Map each constraint and risk in the scenario to at least one verification activity. Anything left unmapped is a gap.
- **Alternative interpretation:** Acceptance may hinge more on a supervised pilot than on technical tests.

**8. Training claim rests on an unstated assumption**
- **Concern:** "Allow lab assistants to onboard students without calling the developers" treats materials as sufficient. It assumes assistants have the time and skill, and ignores turnover, since assistants are students who leave.
- **Why it matters:** The draft's handover argument fails if the training materials depend on people who graduate.
- **How to check:** Pilot with one assistant who hasn't seen the system and see where they get stuck.
- **Counterexample:** Materials exist, but the next semester's assistants never see them and fall back on informal workarounds.

**9. The support section contradicts itself and leaves ownership vague**
- **Concern:** You say a maintenance agreement defines who patches and who restores data, then say later that formal contracts may be outside the developers' authority. The draft also doesn't distinguish what IT patches (OS, database) from what the team patches (application dependencies), or who owns the system once the team graduates. "This matters because the system holds identity-linked records" is a thin justification.
- **Why it matters:** The conclusion about support is hedged both ways, so a reader can't tell what you actually recommend.
- **How to check:** Ask the university which service model applies to student-built tools, and check whether your course expects a contract, a maintenance plan, or a handover note.
- **Alternative interpretation:** A short ownership statement plus a documented handover may be more realistic than a maintenance "agreement."

**10. The liability acknowledgment step is asserted, not argued**
- **Concern:** The draft recommends an acknowledgment step in the workflow but doesn't show it would reduce disputes. A click-through may carry little weight, and it may duplicate or conflict with an existing equipment policy.
- **Why it matters:** It's a feature recommendation with no evidence behind it, and it sits close to a legal area the draft itself says is outside the developers' remit.
- **How to check:** Ask whether the lab or university already has an equipment-use or loan policy, and who can approve the wording.
- **Counterexample:** A paper policy already exists. A second, differently worded on-screen version creates ambiguity about which one governs.

## C. Scope and assumption issues

**11. Lost equipment is under-addressed**
- **Concern:** Half of the stated problem is lost hardware, but the draft focuses on faulty kits. There's no mention of kit identification (asset tags, barcodes), overdue handling, inventory reconciliation, or reporting for administrators.
- **Why it matters:** A solution that records a checkout but can't reliably identify the physical kit or flag overdue returns doesn't fix the stated problem.
- **How to check:** List the lifecycle events for a kit (acquired, issued, returned, lost, retired) and see which the draft supports.

**12. Assumptions are not flagged inside the draft itself**
- **Concern:** The draft treats the PostgreSQL instance, active accounts and working SSO as settled. The notes say to flag these as assumptions, but the draft doesn't. It also introduces "a first-year project has limited scope," which isn't in the scenario.
- **Why it matters:** Unflagged assumptions read as facts, and a marker may penalize them.
- **How to check:** Separate what the scenario states from what you've inferred. Label each inference once, and state the consequence if it fails (for example, SSO details arrive late).

**13. Trade-offs are generic and don't prioritize**
- **Concern:** The trade-offs paragraph names costs (time, legal overhead, SSO dependence) but never says what you'd cut first or last. Your notes suggest this too, but the draft doesn't yet show it.
- **Why it matters:** Prioritization is the clearest evidence of judgment.
- **How to check:** Rank your deliverables by how directly each reduces a named risk, and decide what falls away if time is short.

**14. The opening definition is unsourced**
- **Concern:** "Install, operate, trust, and maintain" is a reasonable framing, but it's your wording, not tied to your course material.
- **Why it matters:** Markers often expect the course's own terminology and deliverable list.
- **How to check:** Compare against your lecture notes or textbook definitions of professional delivery, and cite them yourself.

## Suggested order of work
Settle items 1 and 2 first, since they decide what text you're improving. Then address 3, 5 and 7, which most affect whether the argument fits the scenario. Items 4 and 6 to 14 can follow once the structure is stable.
```

### B3 — Revision (Prompt C)

- **Tool:** Claude
- **Model:** Sonnet 5.5
- **Date:** 11.10
- **Purpose:** revision using my decisions and verified evidence

**Prompt:**

```Revise the draft using my review decisions and source notes below. Keep the answer relevant to my scenario and preserve uncertainty where evidence is limited.

My decisions: [Accepted missing AI checklist, separated SSO authentication from role-based authorization, qualified audit trail as dispute resolution rather than hardware prevention, and clarified that tests provide evidence rather than absolute proof based on Sommerville Ch. 8]. Verified evidence: [Sommerville Ch. 1 on software cost evolution showing upfront documentation reduces long-term maintenance costs; Sommerville Ch. 8 on testing demonstrating defect presence rather than absolute correctness]. 

Draft: 
Topic 1.1: Professional Software Delivery — Robotics Lab Equipment Tracking
Draft explanation (≈450 words)
Professional software delivery means handing over a system that others can install, operate, trust, and maintain, not just a working program. In the robotics lab scenario, the problem is that manual tracking leads to lost hardware and unverified return states. Code that records checkouts is only part of the solution.
What the deliverable must include. First, users and administrators need installation manuals, configuration guides, and system documentation. Without them, the university's IT staff cannot deploy the platform securely on its infrastructure or connect it to student SSO and the provided PostgreSQL instance. Second, the team should deliver tests and verification reports. Concurrent checkout requests are a realistic failure point: two assistants could assign the same kit simultaneously. Evidence that the system prevents double-booking (for example, through database transactions or constraints) gives the client grounds to accept the product. Third, operational handover and training materials allow lab assistants to onboard students without calling the developers.
Addressing the stated risk. The risk is a student receiving a faulty sensor kit, causing project failure and disputes. Software cannot repair hardware, but delivery can reduce the dispute risk. A checkout workflow that records kit condition at issue and return, with timestamps and the assistant's identity, creates an audit trail. Damage and liability policies should appear in that workflow as an acknowledgment step. However, the wording of such policies is a university decision, not a developer's.
Long-term support. Reliable operation depends on patch management and database backup schedules. A maintenance agreement defines who applies security updates and who restores data after a failure. This matters because the system holds identity-linked records.
Trade-offs. Thorough documentation and testing take time that could go to features, and a first-year project has limited scope. Formal contracts and legal text add overhead, and they may sit outside the developers' authority. Tight SSO integration improves security but ties delivery to university identity services the team may not control.

Facts vs. assumptions
Stated in your scenario (treat as given):
Users are lab assistants, students, and faculty.
The problem is lost equipment and unverified return states.
The system must run securely on university infrastructure and integrate with SSO.
Faulty kits causing disputes is the identified risk.
Assumptions (flag them as such in your write-up):
The university provides an isolated PostgreSQL instance and active student accounts.
The university will actually supply SSO integration details and access in time.
Lab assistants have enough time and skill to run the system without developer help.
A maintenance contract is even available for a student project.
Your own reasoning (defensible, but not proven):
That concurrency is the main technical risk. It is plausible, but you haven't shown how often simultaneous checkouts occur in a small lab.
That the audit trail will reduce disputes. It should help resolve them, but it won't prevent faulty hardware.
Claims to verify
Your idea 5 (legal agreements in the checkout workflow). Check whether the university already has an equipment-use policy and who may approve legal wording. Developers generally shouldn't author liability terms.
Your idea 3 (formal maintenance contract). Confirm whether your course expects this. A student project may instead need only a maintenance plan or handover note.
"Proves" in idea 2. Tests show the absence of failures in the cases tried, not a mathematical guarantee. Soften to "provides evidence."
Your assigned course material. Check how your lecture notes or textbook define "professional delivery" and which deliverables they list. Align your terminology with theirs, and cite the source yourself rather than relying on my wording.
Security claims. "Securely" needs specifics, such as the university's security or data-protection requirements, which you should look up.
Tutor's suggestion
Your five ideas are strong but read as a list. To raise the quality, tie each one to a specific risk or constraint from your scenario, as I did above, and add one sentence on what you would deprioritize if time ran short. That shows judgment about trade-offs, which is usually what markers reward.

Show what you changed and why. Use only the sources I supplied. Flag remaining gaps instead of inventing details.
```

**Response:**

```# Topic 1.1: Professional Software Delivery, Robotics Lab Equipment Tracking

## Revised explanation (≈450 words)

Professional software delivery means handing over a system that others can install, operate, trust, and maintain, not just a working program. In the robotics lab scenario, manual tracking leads to lost hardware and unverified return states, so code that records checkouts is only part of the solution.

**Documentation.** Users and administrators need installation manuals, configuration guides, and system documentation. Without them, university IT staff cannot deploy the platform securely on university infrastructure or connect it to student SSO and the provided PostgreSQL instance. Sommerville (Ch. 1) shows that documentation produced upfront reduces long-term maintenance costs. How much it would save in this project is not something the sources let me estimate.

**Authentication and authorization.** These are separate concerns. SSO addresses authentication, confirming who the user is. It does not decide what that person may do. Authorization is the system's own role-based rules, which would govern what lab assistants, students, and faculty can each do (for example, who may record a kit as issued or returned). These rules must be designed, documented, and tested, because SSO alone does not provide them. Any security requirements beyond this need the university's own specifications.

**Testing and verification.** Concurrent checkout requests are a plausible failure point: two assistants could assign the same kit simultaneously. Tests that exercise this case (for example, against database transactions or constraints) give the client evidence for accepting the product. Following Sommerville (Ch. 8), testing demonstrates that defects are present, not that the system is absolutely correct. Passing tests therefore support confidence only for the cases tried, and the verification report should say so.

**Addressing the stated risk.** The risk is a student receiving a faulty sensor kit, causing project failure and disputes. Software cannot prevent or repair faulty hardware. What delivery can do is help resolve disputes afterwards. A workflow that records kit condition at issue and return, with timestamps and the assistant's identity, creates an audit trail showing what was recorded and by whom. It does not make kits more reliable. Any damage or liability acknowledgment step depends on wording the university must supply, as that is not a developer decision.

**Handover and long-term support.** Training materials let lab assistants onboard students without calling the developers. Reliable operation also depends on patching and database backups, and a maintenance plan should state who applies security updates and who restores data after a failure. This matters because the system holds identity-linked records.

**Trade-offs.** Documentation and testing take time that could go to features, and a first-year project has limited scope. If time ran short, I would protect concurrency testing and the installation guide first, and defer polished training materials and any formal maintenance arrangement. Tight SSO integration improves security but ties delivery to university identity services the team may not control.

---

## Facts vs. assumptions

**Stated in your scenario (given):**
- Users are lab assistants, students, and faculty.
- The problem is lost equipment and unverified return states.
- The system must run securely on university infrastructure and integrate with SSO.
- Faulty kits causing disputes is the identified risk.

**Assumptions (flag in your write-up):**
- The university provides an isolated PostgreSQL instance and active student accounts.
- The university supplies SSO details and access in time.
- Lab assistants can run the system without developer help.
- A maintenance plan or contract is possible for a student project.
- Role definitions (what each user type may do) are assumed from the user list, not specified in the scenario.

**Your own reasoning (defensible, not proven):**
- Concurrency is the main technical risk. You haven't shown how often simultaneous checkouts occur in a small lab.
- The audit trail helps resolve disputes but does not prevent faulty hardware.

## Claims still to verify
- **Liability/damage wording:** check whether the university has an equipment-use policy and who may approve legal text.
- **Maintenance contract:** confirm whether your course expects a contract, a maintenance plan, or only a handover note.
- **"Professional delivery" definition:** check your course materials for their deliverable list and align terminology. I only had the two Sommerville points you supplied.
- **"Securely":** look up the university's security and data-protection requirements.

---

## What I changed and why

| Change | Why |
|---|---|
| Added the facts/assumptions/verify checklist as part of the deliverable, plus a deprioritization sentence | Your decision to accept the missing checklist. I interpreted "AI checklist" as the tutor's facts-vs-assumptions and claims-to-verify structure. Tell me if you meant something else. |
| Split SSO (authentication) from role-based authorization in a new paragraph | Your decision. The original implied SSO handled access control. |
| Reframed the audit trail as dispute resolution and removed any implication it reduces faulty hardware | Your decision, consistent with the draft's own caveat. |
| Replaced "evidence that the system prevents double-booking" with evidence-based wording citing Sommerville Ch. 8 | Your decision. Tests show defects present, not absolute correctness. |
| Cited Sommerville Ch. 1 for documentation reducing maintenance costs | Verified evidence you supplied. I stated it as a general principle and did not quantify it. |
| Moved the "who sets liability wording" caveat into the risk paragraph and shortened the legal discussion | Keeps it in scenario context and stays within word count. |

## Remaining gaps
- No source for patch management, backup practice, or training materials. These are reasoning, not evidence.
- No source for role-based authorization design. It is presented as a design requirement, not a cited claim.
- Page numbers and edition for Sommerville are missing, so add them yourself.
- The concurrency risk is still unquantified.
```

## 9. Appendix C — Evidence tables

### Verification table

<!-- At least two complete rows. Source and locator: title + page / slide / section / chapter,
     or title + URL + access date (YYYY-MM-DD). Decision: keep, qualify or reject — one word. -->

| AI claim | Source and locator | Evidence found | Decision |
| --- | --- | --- | --- |
| Evidence that the system prevents double-booking gives the client grounds to accept the product. | Sommerville, Software Engineering, 10th ed., Chapter 8 (Testing) / Chapter 1, p. 8. | Software testing can show the presence of defects and verify specific behaviors under test cases, but it cannot mathematically prove the total absence of errors or guarantee absolute client acceptance without agreed acceptance criteria. | qualify |
| Thorough documentation and testing take time that could go to features... | Sommerville, Software Engineering, 10th ed., Chapter 1, Figure 1.1 | The textbook illustrates that a large fraction of software costs are incurred after initial deployment (evolution and maintenance), meaning upfront investments in documentation and robust testing reduce long-term operational and support costs. | keep |

### Change log

<!-- At least two substantive revisions. Your final version must differ from the AI wording,
     and the reason must say which evidence or scenario constraint made you change it. -->

| AI wording / suggestion | Your final version | Reason for change |
| --- | --- | --- |
| "Evidence that the system prevents double-booking... gives grounds to accept the product" | "Tests that exercise this case give the client evidence for accepting the product, demonstrating defect presence rather than absolute correctness." | Aligned with Sommerville (Ch. 8) source verification to show tests reveal defects rather than absolute system proof. |
| "A checkout workflow that records kit condition... creates an audit trail." | "A workflow that records kit condition creates an audit trail showing what was recorded and by whom to help resolve disputes." | Corrected the logical flaw pointed out in critique: logging condition records data after the fact rather than preventing physical hardware failures. |