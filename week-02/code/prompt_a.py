"""
Student Marks Analyzer
-----------------------
Analyzes a set of student marks: computes statistics (mean, median, min, max,
standard deviation), assigns letter grades, and prints a summary report.
"""

import statistics


def assign_grade(mark):
    """Return a letter grade for a given numeric mark (0-100)."""
    if mark >= 90:
        return "A"
    elif mark >= 80:
        return "B"
    elif mark >= 70:
        return "C"
    elif mark >= 60:
        return "D"
    else:
        return "F"


def analyze_marks(students):
    """
    students: dict of {student_name: mark}
    Returns a dict with summary statistics and per-student grades.
    """
    marks = list(students.values())

    summary = {
        "count": len(marks),
        "mean": round(statistics.mean(marks), 2),
        "median": statistics.median(marks),
        "min": min(marks),
        "max": max(marks),
        "std_dev": round(statistics.pstdev(marks), 2) if len(marks) > 1 else 0,
    }

    grades = {name: assign_grade(mark) for name, mark in students.items()}

    grade_counts = {}
    for g in grades.values():
        grade_counts[g] = grade_counts.get(g, 0) + 1

    return summary, grades, grade_counts


def print_report(students):
    summary, grades, grade_counts = analyze_marks(students)

    print("=" * 40)
    print("STUDENT MARKS REPORT")
    print("=" * 40)

    print("\nIndividual Results:")
    for name, mark in students.items():
        print(f"  {name:<15} {mark:>5}  -> Grade {grades[name]}")

    print("\nClass Statistics:")
    print(f"  Number of students : {summary['count']}")
    print(f"  Mean               : {summary['mean']}")
    print(f"  Median             : {summary['median']}")
    print(f"  Minimum            : {summary['min']}")
    print(f"  Maximum            : {summary['max']}")
    print(f"  Std Deviation      : {summary['std_dev']}")

    print("\nGrade Distribution:")
    for grade in sorted(grade_counts.keys()):
        print(f"  {grade}: {grade_counts[grade]} student(s)")

    print("=" * 40)


if __name__ == "__main__":
    # Example data — replace with your own student marks
    student_marks = {
        "Alice": 92,
        "Bob": 76,
        "Charlie": 58,
        "Diana": 84,
        "Ethan": 67,
        "Fiona": 95,
    }

    print_report(student_marks)