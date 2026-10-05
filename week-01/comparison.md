Week 01 — Manual vs AI: Comparison
Name:Rustemoglu Esra Zhibek Group: Date:Monday 16:00-19:00
1. Facts
                                                Manual (Part 1)	    Rocket (Part 2)
Language / stack used		                    python                  css, html, js, typescript
Time to first version that ran		            20min                   2
Time to all 4 test cases passing		        hour                    10
Number of attempts / prompts needed		        5-6                     2
Lines of code you actually wrote		        all                      none
Did it handle invalid marks (case B)?		    at first no             yes
Did it handle an empty list (case D)?		    at first no             yes
Did it use the ≥ 50 pass threshold?		        yes                     yes
Output format matches the spec?		            yes                     no
Can you explain every line of it?	            yes                     no


2. Test results
Case	Input	                                Manual output	Rocket output	Spec says	                                    Match?
A	    85, 23, 45, 90, 92			            matches         matches         avg 67.00 · high 92 · low 23 · pass 60.0%	     
B	    88, 47, -5, 101, abc, 73, 50, , 100		matches         matches         avg 71.60 · high 100 · low 47 · pass 80.0%	     
C	    10, 20, 30			                    matches         matches         avg 20.00 · high 30 · low 10 · pass 0.0%	
D	     abc, , xyz			                    matches         matches         clear message, no crash

3. What the AI added that I never asked for
UI, styling, visual charts, std deviation, median, pass threshold, passinf failing marks and their sum, order of marks, maximum score selecting
4. What the AI got wrong or silently skipped
It included 101 mark
5. The defect I asked Rocket to fix
Prompt I used: highest mark is 100 change it why it shows 101 if marks are >100 do not include them

Result: (fixed / partly fixed / broke something else) first it fixed but after i deleted all marks and tried again adding 101 it still counts as valid mark

What this tells me: even it works for one time it doesnt mean that it solved completely

6. Reflection (200–300 words)
Answer all four, in your own words:

Which parts of the work did the AI genuinely speed up?
AI speed up making user interface, styling, charts, coding by just giving one sentence prompt within 2 minutes
Where did the AI cost you time, or give you something that looked right but was not?
AI accepts all numbers till 10000 even if i asked it to fix it it doesnt fix entirely
Which of these two artefacts would you be willing to put your name on, and why?
I would put my name on manual, because i know the logic i can explain al lines and if i have to improve it i can easily change code but with ai i cant do it because i have to understand all complex code it has given me and even if i trien to fix the mistake of ai i probably cant do it
What must a human engineer still be responsible for after this experiment?
I think that human engineer should be responsible for understanding, improving, correctness, and sfety of code