const express = require('express');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT||3001;
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


// parse incoming string or array data
app.use(express.urlencoded({extended:true}));

// parse incoming JSON data
app.use(express.json());

// make the front end static so that we don't have to create extra routes
// for css and html page javascript
app.use(express.static('public'));

// Use apiRoutes
app.use('/api', apiRoutes);

// Use htmlRoutes
app.use('/', htmlRoutes);






app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});