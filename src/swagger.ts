import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

export default (app: Express) => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'My network API',
        version: '1.0.0',
      },
    },
    apis: ['**/*.ts'], // Coloque o padrão de arquivos onde suas rotas estão definidas
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
