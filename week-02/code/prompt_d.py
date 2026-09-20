def analyze_marks(marks, pass_rate):
    """
    Analyze a list of student marks.

    Parameters
    ----------
    marks : list of int/float
        Student marks, each strictly between 0 and 100 (decimals allowed).
    pass_rate : int/float
        The minimum mark required to be considered "passing".

    Returns
    -------
    dict with keys: average, highest, lowest, pass_rate
        (pass_rate here is the % of students who passed, rounded to 2 decimals)

    Raises
    ------
    ValueError
        If marks is empty, not a list, contains booleans, strings,
        non-numeric values, or values not strictly between 0 and 100.
    """

    # --- Validate marks is a non-empty list ---
    if not isinstance(marks, list):
        raise ValueError("Marks must be provided as a list.")

    if len(marks) == 0:
        raise ValueError("Marks list cannot be empty.")

    # --- Validate pass_rate ---
    if isinstance(pass_rate, bool) or not isinstance(pass_rate, (int, float)):
        raise ValueError("pass_rate must be a valid number.")

    if not (0 < pass_rate < 100):
        raise ValueError("pass_rate must be strictly between 0 and 100.")

    # --- Validate each mark ---
    for mark in marks:
        # Reject booleans explicitly (bool is a subclass of int in Python)
        if isinstance(mark, bool):
            raise ValueError(f"Invalid mark: {mark!r}. Booleans are not allowed.")

        # Reject strings and any other non-numeric type
        if not isinstance(mark, (int, float)):
            raise ValueError(f"Invalid mark: {mark!r}. Marks must be numeric.")

        # Reject marks outside the strict (0, 100) range
        if not (0 < mark < 100):
            raise ValueError(
                f"Invalid mark: {mark!r}. Marks must be strictly between 0 and 100."
            )

    # --- Calculations ---
    average = sum(marks) / len(marks)
    highest = max(marks)
    lowest = min(marks)

    passed_count = sum(1 for m in marks if m >= pass_rate)
    pass_percentage = (passed_count / len(marks)) * 100

    return {
        "average": round(average, 2),
        "highest": round(highest, 2),
        "lowest": round(lowest, 2),
        "pass_rate": round(pass_percentage, 2),
    }


# ------------------ Example usage ------------------
if __name__ == "__main__":
    sample_marks = [45.5, 67, 89.25, 32, 90, 78.75, 55]

    try:
        result = analyze_marks(sample_marks, pass_rate=50)
        print("Analysis Result:")
        for key, value in result.items():
            print(f"  {key}: {value}")
    except ValueError as e:
        print(f"Error: {e}")

    # Examples that raise ValueError:
    invalid_cases = [
        ([], 50),                     # empty list
        ([50, True, 70], 50),         # boolean in marks
        ([50, "70", 90], 50),         # string in marks
        ([50, 150, 90], 50),          # out of range
        ([50, -5, 90], 50),           # out of range
        ([50, 70, 90], True),         # boolean pass_rate
        ([50, 70, 90], "50"),         # string pass_rate
    ]

    for m, pr in invalid_cases:
        try:
            analyze_marks(m, pr)
        except ValueError as e:
            print(f"Expected error -> {e}")