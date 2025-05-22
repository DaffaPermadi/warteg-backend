require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3000;
const errorHandler = require('./middleware/errorHandler');

const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(routes);
app.use(errorHandler);

// Product Image routes
app.use('/api/images', express.static('public/images'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});