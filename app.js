const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

//database
const db = require('./config/database');

//Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error => ' + err))

const app = express();

app.get('/', (req, res) => {
    res.send('INDEX')
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server listening on port ${PORT}`));

