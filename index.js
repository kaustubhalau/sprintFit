const express = require('express');
// const logger = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();

const port = process.env.PORT || 8000;
// const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const path = require('path');
// used for session cookie
// const session = require('express-session');
// const MongoStore = require('connect-mongo');


// const flash = require('connect-flash');
// const customMware = require('./config/middleware'); // see in config

app.use(express.static('./assets'));


// app.use(express.urlencoded());
// app.use(cors());
// app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));





app.use('/',require('./routes/Habit'));
app.use('/',require('./routes/setHabit')); 

app.set('view engine', 'ejs');
// app.set('views', './views');
app.set('views',path.join(__dirname, 'views')); 




// app.use(flash());
// app.use(customMware.setFlash);

// use express router
// app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
