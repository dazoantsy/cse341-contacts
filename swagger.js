const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'CSE341 Contacts API',
    version: '1.0.0',
    description: 'API for storing and retrieving contacts'
  },
  servers: [
    { url: 'https://cse341-contacts-imbx.onrender.com', description: 'Render' },
    { url: 'http://localhost:3000', description: 'Local' }
  ],
  components: {
    schemas: {
      Contact: {
        type: 'object',
        required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'],
        properties: {
          id: { type: 'string', example: '6971389fc408fafb3e887861' },
          firstName: { type: 'string', example: 'John' },
          lastName: { type: 'string', example: 'Doe' },
          email: { type: 'string', example: 'john.doe@test.com' },
          favoriteColor: { type: 'string', example: 'Blue' },
          birthday: { type: 'string', example: '1990-01-01' }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'] // lit les commentaires Swagger dans tes fichiers de routes
};

module.exports = swaggerJSDoc(options);
