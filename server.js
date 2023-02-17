var express =require("express");
var  cors=require("cors");
const passport = require("passport");
require("./app/config/passport-config");
//var passport=require("passport");
//var productRouter = require('./app/routes/product');

var app =express();
//app.use('/product', passport.authenticate('jwt', { session: false }), productRouter);
app.use(cors());
    
app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get("/",(req, res)=>{
    res.json({message:"Welcome to Server Side :"});
});


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

//require("./app/routes/login.js")(app);

//require('./app/routes/product.js')(app);

const PORT=process.env.PORT ||3000;

app.listen(PORT,()=>{
    console.log (`Server is running on port ${PORT}`);
});

