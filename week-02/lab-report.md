# Lab report — Practice #02: The Prompt Is an Engineering Input

**Name:Rustemoglu Esra Zhibek**
**Group:**
**Date:Monday 16:00-19:00**

> Fill in every section. **Do not delete or renumber the headings** — the grading pass reads them
> by number. If something did not happen, write "did not happen" and why; an empty section and a
> fabricated one are graded the same way.

---

## 1. The frozen experiment

| | |
| --- | --- |
| AI assistant |Claude |
| Exact model name |Sonnet 5 medium |
| Implementation language |Python |
| Date of the runs |20.09.26 |

**Non-Python students only** — paste your substituted Prompt B text here, so the substitution can
be checked:
used Python
```
(paste here, or write "n/a — used Python")
```

**Confirmations:**

- Each prompt was sent in a **fresh chat**: yes 
- No follow-up questions were asked before Part 7: yes 
- Every output was saved **before** any editing: yes 

---

## 2. Prompt A — minimal

**Prompt sent** (should be exactly one sentence):

```
Write Python code to analyze student marks.
```

**Assumptions the AI made that I never gave it** — list them, one per line. A data format, a pass
threshold, a rounding rule, an input method, an invented feature all count.

1. Input data format is dictionary
2. Passing mark is 60, letter scale of marks
3. Rounding rule - 2 decimal
4. Input method is 'if __name__ = "__main__"' block

**Questions it should have asked and did not:**

1. What input and data format would you choose?
2. Specific garding policy 

**Is the function named `analyze_marks` with the required signature?** yes / no — yes. 
if no, what is it
called:

**First impression before testing** (one sentence — you will compare this with section 6 later):
The code is clean, readable, handles small cases. But accepts all grades like -5 and 108
---

## 3. Prompt B — structured context

**Prompt sent** (paste it in full, including any substitutions):

```
You are a Python developer. Implement analyze_marks(marks, pass_mark=50). Return
average, highest, lowest, and pass_rate in a dictionary. Accept marks from 0 to 100;
raise ValueError for an empty list, non-numeric values, or out-of-range values. Use
no external libraries. Return code plus a short explanation.
```

**What B fixed compared to A:**

1. Pass mark is 50
2. Pass rate added
3. Raising value error
4. More simple, readable
5. Fuction name and exact signature
6. Only accepting grades [0-100]

**What B still leaves open:**

1. Not passing invalid value raising error
2. Input type not specified

---

## 4. Prompt C — examples and tests

**What I appended to Prompt B:**

```
Example: analyze_marks([40, 60, 80], 50) → average 60, highest 80, lowest 40,
pass_rate 66.67. Include tests for: one mark, decimals, custom pass_mark, empty list,
text value, and marks below 0 or above 100. State any remaining assumptions before
the code.
```

**Tests the AI wrote for itself** — how many, and which situations do they cover?

| Situation | Covered by the AI's tests? |
| --- | --- |
| one mark | yes |
| decimals | yes |
| custom pass_mark | yes |
| empty list | yes |
| text value | yes |
| below 0 / above 100 | yes |

**Do the AI's own tests pass against the AI's own code?** yes / no
Yes

**Do they agree with the harness in section 6?** yes / no — if no, where do they disagree: Yes

**Assumptions C stated explicitly before the code:**
Assumptions (please confirm if any need to change):
pass_rate is rounded to 2 decimal places (matching the example's 66.67); average is also rounded to 2 decimal places for readability, while highest/lowest are returned unrounded (they're just the raw max/min).
"Pass" means a mark ≥ pass_mark (inclusive).
Booleans (True/False) are rejected even though Python treats bool as a subclass of int.
A list with a single mark is valid — average equals that mark, and pass_rate is either 0.0 or 100.0.
marks must be a list (not a generator, tuple, etc.); adjust if you need broader input support.
Boundary values 0 and 100 are valid marks (range check is 0 <= m <= 100).
---

## 5. Prompt D — my combined prompt

**The complete prompt I wrote** (one message, sent to a fresh chat):

```
Write python code for analyzing student's marks. Function  should accept list of marks and custom pass_rate. Output is average  highest lowest pass_rate(with 2 decimal). Marks are strictly between 0 and 100. Raise value error if boolean, string, non valid marks and empty list. Except marks with decimal
```

**What I deliberately added that A, B and C did not have:**

1. Explain everything in one prompt
2. Marks are strictly in [0-100]
3. Accepts marks with decimal

**The ambiguity I found in the specification, and how I resolved it inside Prompt D:**

---

## 6. Test results — the evidence

Six cases × four prompts. Verdicts are **PASS**, **FAIL** or **ERROR** only.

| # | Call | Required | A | B | C | D |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `analyze_marks([40, 60, 80], 50)` | avg 60 · high 80 · low 40 · rate 66.67 |ERROR | error | pass | pass |
| 2 | `analyze_marks([100], 50)` | avg 100 · high 100 · low 100 · rate 100 | ERROR | ERROR | pass | pass |
| 3 | `analyze_marks([49.5, 50], 50)` | avg 49.75 · high 50 · low 49.5 · rate 50 | ERROR | ERROR | pass| pass |
| 4 | `analyze_marks([], 50)` | raises ValueError | ERROR | ERROR | pass | PASS |
| 5 | `analyze_marks([40, "60"], 50)` | raises ValueError | ERROR | ERROR | pass | PASS |
| 6 | `analyze_marks([-1, 50, 101], 50)` | raises ValueError | ERROR | ERROR | pass |PASS |
| | **Totals** | | 0/6 | 6/6 | 6/6 | 6/6 |

**For every FAIL and ERROR above, one line: what was returned or raised instead.**

| Prompt | Case | What actually happened |
| --- | --- | --- |
| A | All | analyze_marks() takes 1 positional argument but 2 were given |
| B | all |  crash on import|
|  | | |

### Pasted terminal output — all four runs

> This is the part that makes the table above count. Paste the **whole** output, unedited,
> including the header lines. A table with nothing behind it is not accepted.

**Prompt A**

```
========================================================================
analyze_marks harness — week-02/code/prompt_a.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  ERROR  analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : raised TypeError: analyze_marks() takes 1 positional argument but 2 were given
------------------------------------------------------------------------
case 2  ERROR  analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : raised TypeError: analyze_marks() takes 1 positional argument but 2 were given
------------------------------------------------------------------------
case 3  ERROR  analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : raised TypeError: analyze_marks() takes 1 positional argument but 2 were given
------------------------------------------------------------------------
case 4  ERROR  analyze_marks([], 50)
          expect: ValueError
          got   : raised TypeError instead of ValueError: analyze_marks() takes 1 positional argument but 2 were given
------------------------------------------------------------------------
case 5  ERROR  analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised TypeError instead of ValueError: analyze_marks() takes 1 positional argument but 2 were given
------------------------------------------------------------------------
case 6  ERROR  analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised TypeError instead of ValueError: analyze_marks() takes 1 positional argument but 2 were given
------------------------------------------------------------------------
RESULT  0 PASS · 0 FAIL · 6 ERROR   (week-02/code/prompt_a.py)
========================================================================
```

**Prompt B**

```
ERROR: week-02/code/prompt_b.py could not be imported: ValueError: marks list cannot be empty
The file must define analyze_marks and must not crash on import.
```

**Prompt C**

```
========================================================================
analyze_marks harness — week-02/code/prompt_c.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.67
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: marks must be a non-empty list
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: Non-numeric value found: '60'
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: Mark out of range (0-100): -1
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (week-02/code/prompt_c.py)
========================================================================
```

**Prompt D**

```
========================================================================
analyze_marks harness — week-02/code/prompt_d.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: pass_mark has no default value (analyze_marks() missing 1 required positional argument: 'pass_rate')
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.67
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: Marks list cannot be empty.
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: Invalid mark: '60'. Marks must be numeric.
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: Invalid mark: -1. Marks must be strictly between 0 and 100.
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (week-02/code/prompt_d.py)
========================================================================
```

---

## 7. Scoring

0–2 per criterion, using the rubric in `README.md` Part 7.

| Criterion | A | B | C | D |
| --- | --- | --- | --- | --- |
| Correctness (cases passed) | 0 | 0 | 2 | 2 |
| Requirement coverage |0 | 0 | 2 | 2 |
| Verifiability (tests) | 0 | 0 | 2 | 2 |
| Assumptions stated | 0  |0 | 2 | 2 |
| Noise (2 = none) | 2 | 0 | 2 | 2 |
| **Total / 10** |2 | 0|10 | 10|

**Prompt length, in words:** A _12___ · B _38___ · C _112___ · D __84__

**Words added per point gained** — B over A, C over B, D over C. One line on what that ratio says:
B over A: 4.33, C over B: N/A (0 points gained), D over C: -4.67
---

## 8. Conclusion — 150–200 words

Answer in this order: (1) which prompt scored best, and whether it is the one you would actually
use at work; (2) which single addition bought the most correctness, naming the exact case that
changed verdict; (3) what was pure noise; (4) the ambiguity and your resolution.

Name test cases and real returned values. "More detailed prompts work better" scores zero.

```
(150–200 words)

Prompt C scored best by achieving a clean 6/6 pass rate without import crashes or signature warnings, making it the specification-driven prompt I would use at work.
Prompt A failed completely (0/6 PASS) due to a signature mismatch, triggering TypeError: analyze_marks() takes 1 positional argument but 2 were given. Prompt B added the missing parameter but crashed on import (ValueError: marks list cannot be empty) due to un-guarded top-level test calls. Wrapping sample execution in an if __name__ == "__main__": guard bought the most correctness, turning B from an IMPORT ERROR to 6 PASS results and returning average=60.0, highest=80, lowest=40, pass_rate=66.67 on case 1. Prompt D passed all test cases but flagged a signature warning (pass_mark missing default value =50).
Pure noise included conversational role-play and lengthy prose explaining standard math operations.
The core ambiguity was using pass_rate as both an input parameter and an output key. I resolved this by explicitly naming the input threshold pass_mark, reserving pass_rate for the output dictionary, and guarding top-level execution code.

```

**Word count:*181*

---

## 9. Two questions for the debrief

Written before class, answered in class.

1.
2.
