def analyze_marks(marks, pass_mark=50):
    if not isinstance(marks, list) or len(marks) == 0:
        raise ValueError("marks must be a non-empty list")

    for m in marks:
        if isinstance(m, bool) or not isinstance(m, (int, float)):
            raise ValueError(f"Non-numeric value found: {m!r}")
        if m < 0 or m > 100:
            raise ValueError(f"Mark out of range (0-100): {m!r}")

    total = sum(marks)
    count = len(marks)
    average = round(total / count, 2)
    highest = max(marks)
    lowest = min(marks)
    passed = sum(1 for m in marks if m >= pass_mark)
    pass_rate = round((passed / count) * 100, 2)

    return {
        "average": average,
        "highest": highest,
        "lowest": lowest,
        "pass_rate": pass_rate,
    }


# ---------------------------------------------------------------------------
# Tests
# ---------------------------------------------------------------------------
import unittest


class TestAnalyzeMarks(unittest.TestCase):
    
    def test_example_from_prompt(self):
        result = analyze_marks([40, 60, 80], 50)
        self.assertEqual(result["average"], 60.0)
        self.assertEqual(result["highest"], 80)
        self.assertEqual(result["lowest"], 40)
        self.assertEqual(result["pass_rate"], 66.67)

    def test_single_mark(self):
        result = analyze_marks([75])
        self.assertEqual(result["average"], 75)
        self.assertEqual(result["highest"], 75)
        self.assertEqual(result["lowest"], 75)
        self.assertEqual(result["pass_rate"], 100.0)

    def test_decimal_marks(self):
        result = analyze_marks([55.5, 60.25, 72.75])
        self.assertEqual(result["average"], 62.83)  # (55.5+60.25+72.75)/3
        self.assertEqual(result["highest"], 72.75)
        self.assertEqual(result["lowest"], 55.5)
        self.assertEqual(result["pass_rate"], 100.0)

    def test_custom_pass_mark(self):
        result = analyze_marks([30, 45, 70, 90], pass_mark=60)
        self.assertEqual(result["pass_rate"], 50.0)  # 2 of 4 pass

    def test_empty_list_raises(self):
        with self.assertRaises(ValueError):
            analyze_marks([])

    def test_non_numeric_value_raises(self):
        with self.assertRaises(ValueError):
            analyze_marks([50, "sixty", 70])

    def test_boolean_value_raises(self):
        with self.assertRaises(ValueError):
            analyze_marks([50, True, 70])

    def test_mark_below_zero_raises(self):
        with self.assertRaises(ValueError):
            analyze_marks([-5, 50, 70])

    def test_mark_above_hundred_raises(self):
        with self.assertRaises(ValueError):
            analyze_marks([50, 105, 70])

    def test_boundary_values_valid(self):
        result = analyze_marks([0, 100])
        self.assertEqual(result["average"], 50.0)
        self.assertEqual(result["highest"], 100)
        self.assertEqual(result["lowest"], 0)
   


if __name__ == "__main__":
    unittest.main()

    
"""
Assumptions (please confirm if any need to change):
pass_rate is rounded to 2 decimal places (matching the example's 66.67); average is also rounded to 2 decimal places for readability, while highest/lowest are returned unrounded (they're just the raw max/min).
"Pass" means a mark ≥ pass_mark (inclusive).
Booleans (True/False) are rejected even though Python treats bool as a subclass of int.
A list with a single mark is valid — average equals that mark, and pass_rate is either 0.0 or 100.0.
marks must be a list (not a generator, tuple, etc.); adjust if you need broader input support.
Boundary values 0 and 100 are valid marks (range check is 0 <= m <= 100).
"""
