# Formulário de Programadores

Este projeto é um formulário de cadastro para profissionais de tecnologia, com validação de campos, mensagens de erro, tratamento de exceções e logs básicos no console.

## Estrutura do projeto

```text
formulario-programadores/
├── index.html
├── src/
│   ├── app.js
│   ├── components/
│   │   └── DeveloperForm.js
│   ├── styles/
│   │   ├── global.css
│   │   └── form.css
│   └── utils/
│       ├── logger.js
│       └── validators.js
└── README.md
```

## Funcionalidades

- Validação de nome, sobrenome, e-mail e experiência.
- Validação de área de atuação, senioridade e linguagens selecionadas.
- Mensagens de erro amigáveis e acessíveis.
- Logs básicos no console para ações de sucesso e falha.
- Tratamento de exceções no envio do formulário.
- Layout responsivo e moderno.

## Como executar

Você pode abrir o arquivo `index.html` diretamente no navegador, ou iniciar um servidor local:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

## Observação

A aplicação ainda simula o envio no front-end. Quando houver uma API real, basta substituir o bloco de envio em `src/components/DeveloperForm.js` por uma chamada `fetch()` ou `axios`.
