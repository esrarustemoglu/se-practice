Agent detected prompt score : 69%
This is good enough score to proceed. However, a few answers to my questions will help enhance prompt completeness and generate more accurate results.
Question: Who is this tool for — a teacher managing their own class, or will multiple people (like staff or students) log in and use it?
My answer: Just a quick standalone tool (No logins — anyone who opens it can enter marks and get results)

Thank you for your responses. Your final prompt score is 80%.

I have redrafted your prompt as under and will proceed to execute on the same.

Rocket Enhanced

A lightweight, no-login web tool where anyone can enter a list of student marks and instantly see computed stats — average score, highest mark, lowest mark, and pass rate. The interface is clean and standalone, requiring no accounts or setup to use.

Building with Next.js and TypeScript.

Built MarksCalc Web App
Task planned
UI composed
Application written
Built your app
WHAT I DID
Built a standalone MarksCalc tool with bulk/single mark entry, configurable pass threshold, and instant stats (average, highest, lowest, pass rate, median, std dev)
Added 7 KPI stat cards, a grade distribution chart, and a per-mark breakdown table — all updating live as marks are entered
No login required; anyone can open the app, paste or type marks, and see results immediately


First input: 85, 23, 45, 90, 92
Output: 5	67.00	92	23	60.0%

Second input: 88, 47, -5, 101, abc, 73, 50, , 100
Output: 11 72.2 101 23 72.7%

It includes 101 as valid mark and also does not refresh marks just adds to previous marks

First thing that i asked to fix: dont add marks just calculate marks that i input together
Result: it didnt change anything still adds all marks

Second thing that i asked to fix: highest mark is 100 change it why it shows 101 if marks are >100 do not include them
Result: fixed, it does not include 101 as valid mark anymore

(https://markscalc-lx3e47.public.builtwithrocket.new)