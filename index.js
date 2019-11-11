const config = require('config');
const express = require('express');
const Joi = require('@hapi/joi');
const helmet = require('helmet')
const morgan = require('morgan');
const debugStartup = require('debug')('app:startup');
const debugRoute = require('debug')('app:routing');
//routes
const genres = require('./routes/genres');
const home = require('./routes/home');
//-routes
const logger = require('./middleware/logger');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());

//middleware
app.use(logger);
// app.use(authenticator);
//thirdparty middleware
app.use(helmet());

app.set('view engine','pug');
app.set('views','./views'); //default
//-middleware

//adding routes
app.use('/api/genres',genres);
app.use('/',home);

debugStartup(`Application name: ${config.get('name')}`);
debugStartup(`Application name: ${config.get('mail.host')}`);
debugStartup(`Application name: ${config.get('mail.password')}`);
console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('tiny'));
    debugStartup('morgan enabled...');
}
//connecting to db
mongoose
.connect('mongodb://localhost/vidly', {
    useNewUrlParser: true
})
.then(() => {
    console.log('successfully connected to MongoDB...');
})
.catch(() => {
    console.log('Could not connect to MongoDB !');
});
mongoose.set('useFindAndModify', false);

//==========================================================listening port
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT} ...`)
});



//$env:DEBUG="app:startup"
//$env:PORT=1234
//$env:vidly_mail_password="12345"
