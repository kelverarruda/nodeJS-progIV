
# ATIVIDADE 1 - PROGRAMAÇÃO IV

A loja VendeDeTudo está expandindo seus negócios para o meio digital e nos solicitou o desenvolvimento do back-end para seu novo e-commerce.

Considerando a necessidade de resiliencia e possível escalonamento da aplicação, optou-se pelo desenvolvimento de um serviço para controlar o carrinho de compras da aplicação.

Após algumas reuniões ficou definido a API da aplicação, que foi documentada seguindo a OpenAPI Specification.

---

**Implementação**

Sua função é implementar os métodos presentes em `carrrinho.service.js` e `produto.service.js` de modo que atendam aos requisitos do sistema.

Por uma questão de simplificação, esse sistema não conta com a presença de um Banco de Dados. Os dados são inseridos em listas temporárias.

---

**Requisitos**

- O sistema deve permitir o cadstro de produtos inserido-os em uma lista temporária, não permitindo o cadastro de mais de um produto com o mesmo código.
- O sistema deve permitir a busca de produtos pelo seu código.
- O sistema deve permitir a inserção e remoção de produtos no carrinho, a partir do Id do carrinho(do tipo string) e de um objeto do tipo `itemCarrinho`(contendo código do produto e quantidade).
- O sistema deve totalizar os itens do carrinho, multiplicando a quantidade pelo preço do produto, somando o resultado de todos os itens do carrinho.
- Caso a forma de pagamento escolhida seja Boleto, o sistema deve aplicar 5% de desconto no valor total do carrinho.

---

**Rodando o sistemas**

1. Via linha de comando, navegar até a pasta da aplicação.

2. Rodar o comando `npm install nodemon -g` (em ambieente linux talvez seja necessário executar como `sudo`).

3. Rodar o comando `npm install` na pasta onde foi descompactada a aplicação.

3. Também na pasta principal, executar o comando `nodemon server`.

4. Em seu navegador acessar a URL http://localhost:3001/swagger-ui 

5. A partir desse ponto você poder realizar suas alterações no código fonte, sem a necessidade de parar e rodar novamente a aplicação.


Desenvolva seu trabalho com atenção, aplicando os conceitos estudados durante as aulas, qualquer dúvida não hesite em contatar por e-mail bruno.fortes@unoesc.edu.br

Bom trabalho!