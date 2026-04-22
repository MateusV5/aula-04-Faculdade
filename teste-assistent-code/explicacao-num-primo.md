# Explicação Técnica: Verificação de Números Primos em Python

## Visão Geral
O código implementa uma função em Python chamada `is_prime(n)` que verifica se um número inteiro `n` é primo. Um número primo é aquele maior que 1 que não possui divisores positivos além de 1 e ele mesmo.

## Implementação da Função

### Código Fonte
```python
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
```

### Análise Passo a Passo

1. **Verificação Inicial (`if n <= 1`)**:
   - Números menores ou iguais a 1 não são considerados primos por definição.
   - Retorna `False` imediatamente para esses casos.

2. **Caso Especial do Número 2 (`if n == 2`)**:
   - O número 2 é o único número primo par.
   - Retorna `True` diretamente, evitando processamento desnecessário.

3. **Eliminação de Números Pares (`if n % 2 == 0`)**:
   - Qualquer número par maior que 2 não pode ser primo.
   - Usa o operador módulo (`%`) para verificar se `n` é divisível por 2.
   - Retorna `False` para números pares.

4. **Loop de Verificação (`for i in range(3, int(n**0.5) + 1, 2)`)**:
   - Itera apenas sobre números ímpares de 3 até a raiz quadrada de `n` (inclusive).
   - `int(n**0.5) + 1` garante que o limite superior seja alcançado.
   - O passo de 2 (`step=2`) pula números pares, otimizando o processo.
   - Para cada `i`, verifica se `n % i == 0`. Se sim, `n` não é primo.

5. **Retorno Final (`return True`)**:
   - Se nenhum divisor for encontrado no loop, `n` é primo.

## Complexidade de Tempo
- **O(√n)**: A função executa em tempo proporcional à raiz quadrada de `n`.
- Isso é eficiente para números grandes, pois evita verificar todos os números até `n-1`.
- A otimização de pular números pares reduz o número de iterações pela metade.

## Casos de Teste
O código inclui testes básicos:
- `is_prime(2)` → `True` (único primo par)
- `is_prime(3)` → `True` (primo ímpar)
- `is_prime(4)` → `False` (par, não primo)
- `is_prime(17)` → `True` (primo maior)
- `is_prime(18)` → `False` (par, não primo)

## Melhorias para Clean Code
Para tornar o código mais limpo e seguindo as melhores práticas do Python:

- **Type Hints**: Adicionados `n: int` e `-> bool` para indicar tipos de entrada e saída, melhorando a legibilidade e permitindo verificações estáticas.
- **Docstring**: Incluída documentação da função explicando argumentos e retorno, facilitando manutenção e uso.
- **Estrutura de Testes**: Os testes foram movidos para dentro de `if __name__ == "__main__":`, evitando execução automática ao importar o módulo.
- **Comentários**: Adicionados comentários explicativos nos testes.