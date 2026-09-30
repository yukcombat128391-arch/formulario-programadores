# Formulário de Programadores

Formulário responsivo para cadastro de programadores, desenvolvido com HTML, CSS e JavaScript puro.

## Funcionalidades

- Validação de nome, sobrenome, e-mail e experiência profissional.
- Seleção de área de atuação, senioridade e linguagens utilizadas.
- Mensagens de erro acessíveis com `aria-live` e `aria-invalid`.
- Logs básicos no console para sucesso, dados inválidos e erros inesperados.
- Tratamento de exceções no processamento do formulário.
- Layout responsivo para dispositivos móveis.

## Como executar

Abra o arquivo `index.html` diretamente no navegador ou use um servidor local, por exemplo:

```bash
python -m http.server 8000
```

Depois, acesse `http://localhost:8000`.

> O formulário atualmente simula o envio no navegador. Para persistir os dados, substitua o ponto indicado em `script.js` por uma chamada à API do projeto.
