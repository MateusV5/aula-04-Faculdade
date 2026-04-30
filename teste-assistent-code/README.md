# Teste Assistente de Código

Este repositório contém uma coleção de scripts Python desenvolvidos como exemplos para demonstração de conceitos de programação, depuração, refatoração e documentação. Cada script é acompanhado de uma explicação detalhada em arquivos Markdown.

## Estrutura do Projeto

### Scripts Python

- **`debug.py`**: Script de cálculo de carrinho de compras corrigido, com comentários inline explicando as decisões lógicas. Demonstra entrada de dados, cálculos de totais, impostos e descontos, e exibição formatada de resultados.

- **`num_primos.py`**: Implementação de uma função para verificar se um número é primo, incluindo testes básicos. A função utiliza otimizações como verificação de paridade e loop até a raiz quadrada.

- **`refatoracao.py`**: Exemplo de código refatorado para calcular estatísticas de uma lista (soma, média, máximo e mínimo) usando funções built-in do Python, demonstrando boas práticas de programação.

### Arquivos de Explicação

- **`explicacao-debug.md`**: Detalha os erros comuns encontrados em código Python, como erros de sintaxe, conversão de tipos e indentação, com base no script `debug.py`.

- **`explicacao-num-primo.md`**: Explicação técnica passo a passo da implementação da verificação de números primos, incluindo análise de eficiência e casos especiais.

- **`explicacao-refatoracao.md`**: Descrição do processo de refatoração de código manual para uso de funções built-in, melhorando legibilidade e performance.

## Pré-requisitos

- Python 3.6 ou superior instalado no sistema.
- Nenhum pacote adicional é necessário, pois os scripts utilizam apenas bibliotecas padrão do Python.

## Como Executar

### debug.py
Este script interativo solicita entrada do usuário para calcular o total de uma compra.

```bash
python debug.py
```

Exemplo de execução:
- Digite o nome do cliente.
- Informe quantidade e preço para 3 itens.
- Digite o percentual de desconto (ou 0 se não houver).
- O script exibirá o recibo formatado com subtotal, imposto, desconto e total.

### num_primos.py
Executa testes automáticos da função `is_prime`.

```bash
python num_primos.py
```

Saída esperada:
```
True
True
False
True
False
```

### refatoracao.py
Calcula e exibe estatísticas de uma lista pré-definida de números.

```bash
python refatoracao.py
```

Saída esperada:
```
total: 346
media: 34.6
maior: 89
menor: 2
```

## Conceitos Demonstrados

- **Depuração**: Identificação e correção de erros comuns em Python.
- **Algoritmos**: Implementação eficiente de verificação de primos.
- **Refatoração**: Melhoria de código para maior clareza e eficiência.
- **Documentação**: Uso de docstrings no estilo Google e comentários inline.
- **Estruturas de Controle**: Loops, condicionais e manipulação de listas.
- **Funções Built-in**: Utilização de `sum()`, `max()`, `min()` para operações comuns.

## Contribuição

Este projeto é destinado a fins educacionais. Sinta-se à vontade para explorar, modificar e aprender com os códigos. Para sugestões ou correções, abra uma issue ou pull request.

## Licença

Este projeto não possui licença específica e é fornecido como está para uso educacional.