# Explicação do código em `refatoracao.py`

Este script define uma função chamada `c` que recebe uma lista de números e calcula quatro valores:

- `t`: soma de todos os elementos da lista;
- `m`: média aritmética dos elementos;
- `mx`: o maior valor da lista;
- `mn`: o menor valor da lista.

Passo a passo:

1. A função `c(l)` começa com `t = 0` e usa um loop `for i in range(len(l))` para percorrer cada posição da lista. A cada iteração, adiciona `l[i]` a `t` para calcular a soma total.
2. Depois de somar os elementos, calcula a média `m` dividindo `t` pelo tamanho da lista `len(l)`.
3. Inicializa `mx` e `mn` com o primeiro elemento da lista (`l[0]`).
4. Em outro loop `for i in range(len(l))`, compara cada valor `l[i]` com `mx` e `mn`:
   - se `l[i] > mx`, atualiza `mx` com o novo valor maior;
   - se `l[i] < mn`, atualiza `mn` com o novo valor menor.
5. A função retorna uma tupla com os quatro resultados: `(t, m, mx, mn)`.

Depois disso, o código:

- cria a lista `x` com vários números;
- chama `c(x)` e desempacota o resultado em `a, b, c2, d`;
- imprime o total (`a`), a média (`b`), o maior valor (`c2`) e o menor valor (`d`).

Assim, o arquivo mostra como calcular soma, média e valores extremos de uma lista de números usando loops e comparações.
