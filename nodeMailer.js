let express=require("express")
let passport=require("passport")
const nodemailer=require('nodemailer')
let LocalStrategy=require("passport-local").Strategy
let {users,orders}=require('./data2.js')
let {customers,students,courses,faculties,classes}=require('./data.js')
let app=express()
app.use(express.json())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"

    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With ,Content-Type, Accept"

    );
    next();

   
});
app.use(passport.initialize())
const port=2410
app.listen(port,()=>console.log(`Node app is listinng${port}`))

app.get('/mail',function(req,res){

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ak8871639@gmail.com',
          pass: 'abdul@1994'
        }
      });
      
      var mailOptions = {
        from: 'ak8871639@gmail.com',
        to: 'rk914019661@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error)  
          res.send(error)
        } else {
          console.log('Email sent: ' + info.response);
          res.send(info.response)
        }
      });



   
})