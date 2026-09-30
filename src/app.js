import DeveloperForm from './components/DeveloperForm.js';
import { logger } from './utils/logger.js';

try {
  const developerForm = new DeveloperForm('#developer-form');
  developerForm.init();
  logger.info('Aplicação inicializada com sucesso.');
} catch (error) {
  logger.error('Erro ao inicializar a aplicação.', error);
}
