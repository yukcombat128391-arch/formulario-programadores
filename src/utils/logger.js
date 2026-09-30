export const logger = {
  info(message, data = null) {
    if (data) {
      console.info('[formulário]', message, data);
      return;
    }

    console.info('[formulário]', message);
  },

  warn(message, data = null) {
    if (data) {
      console.warn('[formulário]', message, data);
      return;
    }

    console.warn('[formulário]', message);
  },

  error(message, error = null) {
    if (error) {
      console.error('[formulário]', message, error);
      return;
    }

    console.error('[formulário]', message);
  }
};
