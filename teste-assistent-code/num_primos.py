def is_prime(n: int) -> bool:
    """
    Verifica se um número inteiro é primo.

    Args:
        n (int): O número a ser verificado.

    Returns:
        bool: True se o número for primo, False caso contrário.
    """
    if n <= 1:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0:
            return False
    return True


if __name__ == "__main__":
    # Testes
    print(is_prime(2))  # True
    print(is_prime(3))  # True
    print(is_prime(4))  # False
    print(is_prime(17)) # True
    print(is_prime(18)) # False