def f(marks):
    valid_marks=[]
    for item in marks:
        try:
            if isinstance(item, str) and not item.strip():
                continue
            value=float(item)
            if value >=0 and value <=100:
                valid_marks.append(value)
        except(ValueError, TypeError):
            continue
    if not valid_marks:
        print("No valid marks")
        return
    num = len(valid_marks)
    avg= sum(valid_marks)/num
    highest=max(valid_marks)
    lowest=min(valid_marks)
    pas=[item for item in valid_marks if item >=50]
    pass_rate= len(pas)/num*100
    print(f"Average: {avg:.2f}")
    print(f"Highest: {highest:.0f}")
    print(f"Lowest: {lowest:.0f}")
    print(f"Pass rate: {pass_rate:.1f}%")    
    
if __name__ == "__main__":
    test_cases = {
        "A": [85, 23, 45, 90, 92],
        "B": [88, 47, -5, 101, "abc", 73, 50, "", 100],
        "C": [10, 20, 30],
        "D": ["abc", "xyz"]
    }
    for case_name, marks in test_cases.items():
        print(f"\n--- Case {case_name} ---")
        f(marks)