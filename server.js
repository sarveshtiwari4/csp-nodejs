var express =require("express");
var compression=require("compression");
var cors=require("cors");
var path=require("path");
var xXssProtection = require("x-xss-protection");
require("./app/config/passport-config");

var app =express();

// Set "X-XSS-Protection: 0"
app.use(xXssProtection());

//app.set('etag', false);
app.disable('etag');

//app.use('/product', passport.authenticate('jwt', { session: false }), productRouter);
app.use(compression());
app.use(function (req, res, next) {
   
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    res.header("X-Frame-Options","DENY, SAMEORIGIN");
    res.header("Strict-Transport-Security","max-age=31536000; includeSubdomains; preload");
    res.setHeader("X-XSS-Protection","1;mode=block");
    res.header("X-Content-Type-Options","nosniff");
    res.header('Access-Control-Allow-Methods', 'POST, GET,PUT');
  
    next();
  });



app.use(cors());

//app.use(helmet());

app.use(express.json());

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/login',express.static(path.join(__dirname, 'dist')));

app.use('/aboutus',express.static(path.join(__dirname, 'dist')));

app.use('/rti',express.static(path.join(__dirname, 'dist')));

app.use('/examdetails',express.static(path.join(__dirname, 'dist')));

app.use('/directory',express.static(path.join(__dirname, 'dist')));

app.use('/contactus',express.static(path.join(__dirname, 'dist')));

app.use('/adminpannel',express.static(path.join(__dirname, 'dist')));


app.use(express.urlencoded({extended:true}));

// app.get("/",(req, res)=>{
//     res.json({message:"Welcome to Server Side :"});
// });


require("./app/routes/home.routes.js")(app);

require("./app/routes/result.routes.js")(app);

require("./app/routes/advertisement.routes.js")(app);

require("./app/routes/master.routes.js")(app);

require("./app/routes/notification.routes.js")(app);

require("./app/routes/modelanswer.routes.js")(app);

require("./app/routes/onlineapplication.routes.js")(app);

require("./app/routes/latest_result.routes.js")(app);

require("./app/routes/latest_advertisement.routes.js")(app);

require("./app/routes/auth.js")(app);


const PORT=process.env.PORT || 3000;
 
app.listen(PORT,()=>{
    console.log (`Server is running on port ${PORT}`);
});


