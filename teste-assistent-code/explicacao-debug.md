# Explicação dos erros em debug.py

1. Erro de sintaxe nas chamadas de input:
   - As linhas `item1 = float(input(Preço do item 1? ))` e `item2 = float(input(Preço do item 2? ))` não colocam a mensagem entre aspas. Isso causa um `SyntaxError` porque o Python interpreta `Preço` como um nome de variável, não como uma string.

2. Conversão de desconto incorreta:
   - A variável `desconto_cupom` recebe o valor de `input()` como string. Depois o código tenta usar `desconto_cupom / 100`, o que gera um `TypeError` porque strings não suportam divisão numérica.
   - É necessário converter o valor do cupom para `float` antes de calcular o desconto.

3. Erro de formatação de string no `print` do item 2:
   - A linha `print(" Item 2:        R$ {total_item2:.2f}")` imprime literalmente `{total_item2:.2f}` porque a string não é uma f-string.
   - Deve-se usar `f"..."` para permitir interpolação de variáveis.

4. Erro de indentação no bloco `if desconto_cupom > 0`:
   - O `print` dentro do `if` não está indentado. Isso causa um `IndentationError`.
   - O corpo do `if` precisa estar indentado corretamente.

5. Melhoria no cálculo do desconto:
   - Mesmo após converter `desconto_cupom` para float, convém verificar se o ingresso foi maior que zero antes de exibir o desconto, para evitar mostrar um desconto quando não houver cupom.
