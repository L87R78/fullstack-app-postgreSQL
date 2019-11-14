const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//database
const db = require('./config/database');

//Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error => ' + err))

app.get('/', (req, res) => {
    res.send('Index')
})

//Handlebars
app.engine('hbs', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'hbs');

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Gig routes
app.use('/gigs', require('./routes/gigs'))


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server listening on port ${PORT}`));

