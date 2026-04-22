def calculate_statistics(numbers):
    """Return the total, average, maximum, and minimum of a non-empty list."""
    if not numbers:
        raise ValueError("A lista de números não pode estar vazia.")

    total = sum(numbers)
    average = total / len(numbers)
    maximum = max(numbers)
    minimum = min(numbers)

    return total, average, maximum, minimum


def main():
    numbers = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]
    total, average, maximum, minimum = calculate_statistics(numbers)

    print("total:", total)
    print("media:", average)
    print("maior:", maximum)
    print("menor:", minimum)


if __name__ == "__main__":
    main()