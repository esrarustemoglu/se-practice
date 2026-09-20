def analyze_marks(marks, pass_mark=50):
    if not marks:
        raise ValueError("marks list cannot be empty")

    for m in marks:
        if isinstance(m, bool) or not isinstance(m, (int, float)):
            raise ValueError(f"non-numeric value found: {m!r}")
        if m < 0 or m > 100:
            raise ValueError(f"mark out of range (0-100): {m!r}")

    total = sum(marks)
    count = len(marks)
    average = total / count
    highest = max(marks)
    lowest = min(marks)
    passed = sum(1 for m in marks if m >= pass_mark)
    pass_rate = (passed / count) * 100

    return {
        "average": average,
        "highest": highest,
        "lowest": lowest,
        "pass_rate": pass_rate,
    }

"""
How it works:
Empty check: if not marks catches an empty list before anything else runs.
Validation loop: checks each mark is a real number (int/float, with bool explicitly excluded since True/False are technically int subclasses in Python) and falls within 0–100, raising ValueError with a helpful message on failure.
Calculations: average is the mean, highest/lowest use built-in max/min, and pass_rate is the percentage of marks meeting or exceeding pass_mark (default 50).
No imports needed — just built-in sum, max, min, and len.
"""
print(analyze_marks([83, 58, 38, 45]))

