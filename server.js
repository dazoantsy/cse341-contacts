const express = require('express');
const app = express();
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const { connectDB } = require('./config/db');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/contacts', require('./routes/contacts'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 3000;

connectDB(process.env.MONGODB_URI, 'contactsDB')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.error(err);
  });
