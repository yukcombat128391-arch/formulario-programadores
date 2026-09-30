export const validators = {
  firstName(value) {
    const text = String(value ?? '').trim();
    return text.length >= 2 ? '' : 'Informe um nome com pelo menos 2 caracteres.';
  },

  lastName(value) {
    const text = String(value ?? '').trim();
    return text.length >= 2 ? '' : 'Informe um sobrenome com pelo menos 2 caracteres.';
  },

  email(value) {
    const text = String(value ?? '').trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(text) ? '' : 'Informe um e-mail válido.';
  },

  seniority(value) {
    return String(value ?? '').trim() ? '' : 'Selecione sua senioridade.';
  },

  role(value) {
    return String(value ?? '').trim() ? '' : 'Selecione uma área de atuação.';
  },

  languages(selectedValues) {
    const values = Array.isArray(selectedValues) ? selectedValues : [];
    return values.length > 0 ? '' : 'Selecione pelo menos uma linguagem.';
  },

  experience(value) {
    const text = String(value ?? '').trim();

    if (text.length < 20) {
      return 'Escreva pelo menos 20 caracteres sobre sua experiência.';
    }

    if (text.length > 1000) {
      return 'Sua descrição deve ter no máximo 1000 caracteres.';
    }

    return '';
  }
};
