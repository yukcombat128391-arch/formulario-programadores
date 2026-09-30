import { validators } from '../utils/validators.js';
import { logger } from '../utils/logger.js';

export default class DeveloperForm {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);

    if (!this.form) {
      logger.error(`Formulário não encontrado para o seletor: ${formSelector}`);
      throw new Error(`Formulário não encontrado: ${formSelector}`);
    }

    this.statusElement = this.form.querySelector('#form-status');
  }

  init() {
    this.form.addEventListener('submit', (event) => this.handleSubmit(event));
  }

  setStatus(message, type = '') {
    if (!this.statusElement) {
      logger.warn('Elemento de status não encontrado.');
      return;
    }

    this.statusElement.textContent = message;
    this.statusElement.className = `status ${type}`.trim();
  }

  setFieldError(fieldName, message) {
    const field = this.form.querySelector(`[name="${fieldName}"]`);
    const errorElement = this.form.querySelector(`#${fieldName}-error`);

    if (field) {
      field.setAttribute('aria-invalid', message ? 'true' : 'false');
    }

    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  validateForm() {
    const formData = new FormData(this.form);
    let isValid = true;

    const fieldsToValidate = [
      'firstName',
      'lastName',
      'email',
      'seniority',
      'experience'
    ];

    fieldsToValidate.forEach((fieldName) => {
      const value = formData.get(fieldName) ?? '';
      const errorMessage = validators[fieldName](value);
      this.setFieldError(fieldName, errorMessage);

      if (errorMessage) {
        isValid = false;
      }
    });

    const roleValue = formData.get('role') ?? '';
    const roleError = validators.role(roleValue);
    const roleElement = this.form.querySelector('#role-error');
    if (roleElement) {
      roleElement.textContent = roleError;
    }
    if (roleError) {
      isValid = false;
    }

    const selectedLanguages = formData.getAll('languages');
    const languagesError = validators.languages(selectedLanguages);
    const languagesElement = this.form.querySelector('#languages-error');
    if (languagesElement) {
      languagesElement.textContent = languagesError;
    }
    if (languagesError) {
      isValid = false;
    }

    return isValid;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setStatus('');

    try {
      if (!this.validateForm()) {
        this.setStatus('Revise os campos destacados antes de enviar.', 'failure');
        logger.warn('Tentativa de envio com dados inválidos.');

        const firstInvalid = this.form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      const formData = new FormData(this.form);
      const payload = {
        name: `${String(formData.get('firstName') ?? '').trim()} ${String(formData.get('lastName') ?? '').trim()}`.trim(),
        email: String(formData.get('email') ?? '').trim(),
        role: String(formData.get('role') ?? '').trim(),
        seniority: String(formData.get('seniority') ?? '').trim(),
        languages: formData.getAll('languages'),
        experience: String(formData.get('experience') ?? '').trim()
      };

      logger.info('Cadastro validado com sucesso.', payload);
      this.setStatus('Cadastro enviado com sucesso!', 'success');
      this.form.reset();
    } catch (error) {
      logger.error('Erro inesperado ao processar o formulário.', error);
      this.setStatus('Não foi possível processar o cadastro. Tente novamente.', 'failure');
    }
  }
}
