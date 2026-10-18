# SIS #02 — AI-Assisted UML Modeling: University Course Registration

<!--
  This is the only file you write your report in. README.md tells you what goes where.

  Rules the checker relies on:
  - Do not delete, rename or renumber the ## headings, the ### headings, or the **Label:** words.
  - Replace every "(write here)" and "(paste here)". None may be left when you submit.
  - Comments like this one are ignored by the checker and the word counter. Delete them or leave them.
-->

## 1. Scope and assumptions

<!-- Your FINAL scope statement and assumptions, after reviewing Prompt A's output. Say here
     what is out of scope (payments, prerequisites, timetable clashes, waiting lists,
     cancellation) — section 2 must not mention them. Section 10 keeps your first version. -->

**Scope:** (write here)

**Assumptions:**

1. (write here)
2. (write here)

## 2. User stories and acceptance criteria

<!-- Your APPROVED requirements: Prompt A's draft after your review. Keep the IDs, the three
     story headings and the bullet shape. Every criterion names the rule(s) it maps to,
     e.g. (R2, R4). Two criteria per story. Nothing out of scope.
     Format of a criterion, on one bullet:
     - **AC-03** (R2, R4): Given ..., When ..., Then ... -->

### US-01 — Browse offerings

**US-01:** As an authenticated student, I want to view the course catalog for a specific semester so that I can inspect course codes, titles, offerings, and available places.

- **AC-01** (R1): Given the authenticated student selects a specific semester, When they view the course catalog, Then the system displays the course code, title, offering, and available places for that semester.
- **AC-02** (R1): Given the course catalog is requested for a single semester, When the system retrieves the data, Then the displayed catalog entries are strictly scoped to the requested semester.

### US-02 — Register for an offering

**US-02:** As an authenticated student, I want to register for an available course offering so that my enrollment is recorded and availability is updated.

- **AC-03** (R2, R4): Given a course offering has available places, When the student submits a registration request, Then the system rechecks current availability to ensure capacity is not exceeded, creates exactly one enrollment linking the student and offering, updates the available places count, and returns a confirmation.
- **AC-04** (R4): Given a registration request is successfully processed, When the database state is updated, Then exactly one Enrollment record is persisted and the enrollment count / available places are adjusted accordingly.

### US-03 — Receive a clear rejection

**US-03:** As an authenticated student, I want the system to reject invalid registrations so that capacity limits and duplicate restrictions are properly enforced.

- **AC-05** (R2, R5): Given a course offering has zero available places (course full), When the student attempts to register, Then the system rejects the request, explains "course full", creates no enrollment, and leaves the enrollment count unchanged.
- **AC-06** (R3, R5): Given the student already has an active enrollment in the same course offering, When the student attempts a repeat registration request, Then the system rejects the repeat request, explains "already enrolled", creates no enrollment, and leaves the enrollment count unchanged.

## 3. Sequence diagram

<!-- The FINAL diagram, rendered. Change .png to .svg if that is what you exported. -->

![Final sequence diagram](models/img/sequence.png)

**Participants:** (write here — each lifeline and what it stands for)

**Atomic operation:** (write here — which messages form the one atomic step: the final duplicate check, the capacity check and the creation of the Enrollment, and why a catalog view reserves nothing)

**Where the Enrollment is created:** (write here — which message, which lifeline, and which class in section 4 it produces)

**Technical lifelines:** (write here — every lifeline that is NOT a class in the class diagram, by name, and why the difference in abstraction is fine. "None" if there are none.)

## 4. Class diagram

<!-- The FINAL diagram, rendered. -->

![Final class diagram](models/img/classes.png)

<!-- One row per association in classes.puml, read in both directions. -->

| Association | Read left to right | Read right to left |
| --- | --- | --- |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) |

**How an Enrollment links a student to an offering:** (write here)

**Capacity constraint:** (write here — and why multiplicity alone cannot express it)

**Uniqueness constraint:** (write here — and why multiplicity alone cannot express it)

## 5. Traceability

<!-- Every rule, including the catalog fields and availability (R1). Column 1: the rule and
     the criteria that cover it, e.g. "R2 + AC-03, AC-04". Column 2: the message, guard,
     class or constraint that shows the rule in YOUR diagrams. Column 3: the T-ID that
     exercises it, or the extra check you did instead (R1 has no T case). -->

| Rule and criterion | Model evidence | Validation case |
| --- | --- | --- |
| R1 + (write here) | (write here) | (write here) |
| R2 + (write here) | (write here) | (write here) |
| R3 + (write here) | (write here) | (write here) |
| R4 + (write here) | (write here) | (write here) |
| R5 + (write here) | (write here) | (write here) |

## 6. Walkthroughs

<!-- Walk each case through YOUR final sequence diagram, message by message. Column 2: the
     actual steps and the state change (count before → after). Column 3 starts with Pass or
     Fail, then the location: the message, guard or note where you saw it. A Fail you
     report honestly is a finding, not a penalty. -->

| Case | Observed path and state change | Judgment and evidence |
| --- | --- | --- |
| T1. Available | (write here) | (write here) |
| T2. Last place | (write here) | (write here) |
| T3. Full | (write here) | (write here) |
| T4. Duplicate | (write here) | (write here) |

## 7. Review decisions

<!-- At least three substantive decisions about Prompt C's critique or your own inspection.
     Decision: accepted / rejected / modified — and what you did. Reason: why, in a full
     sentence. Rule: R1–R5. Do not invent an error to fill the table; a justified rejection
     of advice counts. -->

| AI suggestion or model element | Decision | Reason | Rule |
| --- | --- | --- | --- |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |

## 8. Modeling explanation

<!-- 200–300 words. Your main design choices; how the class diagram and the sequence diagram
     complement each other; why an activity diagram could also help explain the workflow. -->

(write here)

## 9. Reflection

<!-- 150–200 words. Written by you, not by the assistant: where AI helped, one decision you
     made yourself, one remaining limitation. Specific beats flattering. -->

(write here)

## 10. Appendix A — Before AI

<!-- Written BEFORE you run Prompt A, committed and pushed in your first commit, and never
     edited afterwards. This is what you paste into Prompt A as "My initial assumptions". -->

**Scope:** The scope of this system covers electronic course catalog browsing, offering selection, atomic registration validation (checking capacity and duplicate enrollments), creating enrollment records, updating available places, and returning confirmations or rejections for university students. Payments, prerequisites, timetable clashes, waiting lists, and course cancellations are strictly out of scope.

**Initial assumptions:**

1. The student is already authenticated and signed into the university portal before browsing and registering.
2. The selected course offering exists in the system database and its initial capacity is a positive whole number.

## 11. Appendix B — AI exchanges

<!-- Complete prompts and complete responses, as text — never screenshots. Paste each inside
     the ~~~~ block that follows its label: AI responses contain ``` PlantUML blocks, and
     ~~~~ keeps them from breaking this file. Prompts B and C: the prompt text first, then
     the material it refers to ("below", "these two") pasted under it, in the same block.
     You may add B5, B6 … after B4 if you ran more. -->

### B1 — Requirements (Prompt A)

- **Tool:** Gemini 
- **Model:** Gemini 1.5 Pro
- **Date:** 18.10
- **Purpose:** draft 3 user stories and 6 acceptance criteria

<!-- Model: the exact model with its version, as the tool shows it (e.g. "GPT-5 Thinking",
     "Claude Sonnet 4.5"). If the tool does not show it, write: not displayed
     Date: YYYY-MM-DD -->

**Prompt:**

~~~~text
Act as a requirements analyst. Use only this course registration scenario and rules R1–R5: | Rule | |
| --- | --- |
| **R1. Catalog** | Show the course code, title, offering and available places for one semester. |
| **R2. Capacity** | Recheck current availability when registering. Enrollment must never exceed the offering's capacity. |
| **R3. Duplicates** | A student may have at most one enrollment in the same offering. Reject a repeat request. |
| **R4. Success** | Create exactly one Enrollment linking the student and offering, update availability and return a confirmation. |
| **R5. Rejection** | Explain "course full" or "already enrolled". Create no enrollment and leave the enrollment count unchanged. |. My initial assumptions are 1. The student is already authenticated and signed into the university portal before browsing and registering.
2. The selected course offering exists in the system database and its initial capacity is a positive whole number..
Draft 3 user stories and 2 Given / When / Then acceptance criteria for each. Use IDs US-01 to US-03 and AC-01 to AC-06. Map each criterion to rule IDs.
Cover normal and rejection behavior. List uncertainty separately. Do not add excluded features or invent university policies.
~~~~

**Response:**

~~~~text
As a requirements analyst, I have drafted the user stories, acceptance criteria, and mapping to rules R1–R5 based strictly on the provided scenario, initial assumptions, and rules.

---

## User Stories & Acceptance Criteria

### US-01: Course Catalog Browsing

**User Story:** As an authenticated student, I want to view the course catalog for a specific semester so that I can inspect course codes, titles, offerings, and available places.

* **AC-01**
* **Given** the authenticated student selects a specific semester,
* **When** they view the course catalog,
* **Then** the system displays the course code, title, offering, and available places for that semester.
* **Rule Mapping:** R1


* **AC-02**
* **Given** the course catalog is requested for a single semester,
* **When** the system retrieves the data,
* **Then** the displayed catalog entries are strictly scoped to the requested semester.
* **Rule Mapping:** R1



---

### US-02: Course Registration Execution (Normal Flow)

**User Story:** As an authenticated student, I want to register for an available course offering so that my enrollment is recorded and availability is updated.

* **AC-03**
* **Given** a course offering has available places,
* **When** the student submits a registration request,
* **Then** the system rechecks current availability to ensure capacity is not exceeded, creates exactly one enrollment linking the student and offering, updates the available places count, and returns a confirmation.
* **Rule Mapping:** R2, R4


* **AC-04**
* **Given** a registration request is successfully processed,
* **When** the database state is updated,
* **Then** exactly one Enrollment record is persisted and the enrollment count / available places are adjusted accordingly.
* **Rule Mapping:** R4



---

### US-03: Registration Rejection Handling (Rejection Flow)

**User Story:** As an authenticated student, I want the system to reject invalid registrations so that capacity limits and duplicate restrictions are properly enforced.

* **AC-05**
* **Given** a course offering has zero available places (course full),
* **When** the student attempts to register,
* **Then** the system rejects the request, explains "course full", creates no enrollment, and leaves the enrollment count unchanged.
* **Rule Mapping:** R2, R5


* **AC-06**
* **Given** the student already has an active enrollment in the same course offering,
* **When** the student attempts a repeat registration request,
* **Then** the system rejects the repeat request, explains "already enrolled", creates no enrollment, and leaves the enrollment count unchanged.
* **Rule Mapping:** R3, R5



---

## List of Uncertainties

Based strictly on the provided rules and assumptions, the following items remain unspecified and would require clarification from domain stakeholders:

* **Concurrency & Race Conditions:** How the system handles simultaneous registration requests when only one available place remains.
* **Exact Interface Messaging:** The precise wording or UI component layout required for the "course full" and "already enrolled" explanations.
* **Initial Seeding:** The exact mechanism by which the initial positive whole number capacity and available places are established for a semester's offering.
~~~~

### B2 — UML drafts (Prompt B)

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Purpose:** draft the sequence and class diagrams

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

### B3 — Model critique (Prompt C)

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Purpose:** review both models against R1–R5 and T1–T4

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

### B4 — Focused revision (Prompt D)

- **Tool:** (write here)
- **Model:** (write here)
- **Date:** (write here)
- **Purpose:** apply my accepted review decisions

**Prompt:**

~~~~text
(paste here)
~~~~

**Response:**

~~~~text
(paste here)
~~~~

## 12. Appendix C — Original diagrams

<!-- The AI's first output from Prompt B, rendered unedited from models/original/. -->

![Original sequence diagram](models/img/original-sequence.png)

![Original class diagram](models/img/original-classes.png)

## 13. Appendix D — References and source checks

### References

<!-- Full references, one per line, each starting with "- ". Only sources you actually opened.
     Every URL used in the source checks must also appear here. Example:
     - Sommerville, I. (2016). Software Engineering, 10th ed., Global Edition. Pearson. Ch. 5. -->

- (write here)

### Source checks

<!-- At least two modeling decisions you verified. Source and locator: title + slide, page,
     section, chapter or figure — or title + URL + access date (YYYY-MM-DD). Slide numbers
     refer to the decks posted in our Teams. -->

| Modeling decision | Source and locator | What the source says | How it supports or changed your model |
| --- | --- | --- | --- |
| (write here) | (write here) | (write here) | (write here) |
| (write here) | (write here) | (write here) | (write here) |
