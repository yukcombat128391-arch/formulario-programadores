(() => {
  'use strict';

  const form = document.querySelector('#developer-form');
  const status = document.querySelector('#form-status');

  if (!form || !status) {
    console.error('[formulário] Elementos essenciais não foram encontrados.');
    return;
  }

  const validators = {
    firstName: (value) => value.trim().length >= 2 ? '' : 'Informe um nome com pelo menos 2 caracteres.',
    lastName: (value) => value.trim().length >= 2 ? '' : 'Informe um sobrenome com pelo menos 2 caracteres.',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Informe um e-mail válido.',
    seniority: (value) => value ? '' : 'Selecione sua senioridade.',
    experience: (value) => value.trim().length >= 20 ? '' : 'Conte um pouco mais: escreva pelo menos 20 caracteres.'
  };

  function setError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const error = document.querySelector(`#${fieldName}-error`);
    if (field) field.setAttribute('aria-invalid', String(Boolean(message)));
    if (error) error.textContent = message;
    return !message;
  }

  function validateForm() {
    let isValid = true;
    const data = new FormData(form);

    Object.entries(validators).forEach(([name, validator]) => {
      isValid = setError(name, validator(String(data.get(name) || ''))) && isValid;
    });

    const roleValid = Boolean(data.get('role'));
    const roleError = document.querySelector('#role-error');
    if (roleError) roleError.textContent = roleValid ? '' : 'Selecione uma área de atuação.';
    isValid = roleValid && isValid;

    const languages = data.getAll('languages');
    const languagesError = document.querySelector('#languages-error');
    if (languagesError) languagesError.textContent = languages.length ? '' : 'Selecione pelo menos uma linguagem.';
    isValid = languages.length > 0 && isValid;

    return isValid;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = '';
    status.className = 'status';

    try {
      if (!validateForm()) {
        status.textContent = 'Revise os campos destacados antes de enviar.';
        status.classList.add('failure');
        console.warn('[formulário] Tentativa de envio com dados inválidos.');
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        firstInvalid?.focus();
        return;
      }

      const data = new FormData(form);
      const submission = {
        name: `${data.get('firstName').trim()} ${data.get('lastName').trim()}`,
        email: data.get('email').trim(),
        role: data.get('role'),
        seniority: data.get('seniority'),
        languages: data.getAll('languages'),
        experience: data.get('experience').trim()
      };

      // Substitua este ponto por uma chamada fetch() quando houver uma API.
      console.info('[formulário] Cadastro validado com sucesso.', {
        ...submission,
        email: '[oculto]'
      });
      status.textContent = 'Cadastro enviado com sucesso!';
      status.classList.add('success');
      form.reset();
    } catch (error) {
      console.error('[formulário] Erro inesperado ao processar cadastro:', error);
      status.textContent = 'Não foi possível processar o cadastro. Tente novamente.';
      status.classList.add('failure');
    }
  });
})();
