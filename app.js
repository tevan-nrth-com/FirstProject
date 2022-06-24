
const express = require('express')
const path = require('path')
const passport=require('passport')
const local = require('./local')
const bcrypt = require('bcrypt')
const flash = require('express-flash')
const session = require('express-session')
const authRoute = require('./auth')
//Init app

const app = express()
require('./passport-config');


//passport
/* const initializePassport = require('./passport-config')
LocalStrategy( passport, 
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id))
 */
const users = require('./properties')
// mongodb
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const dbUrl =require('./properties')
const { render } = require('pug')
const { stringify } = require('querystring')
const { Cookie } = require('express-session')

mongoose.connect(dbUrl.DB_URL, {
  useNewUrlParser:true,
  useUnifiedTopology:true}, (err) =>{
    if(!err) {return console.log('db is connected')}
    else  { return console.log('db error')}
  })
  const NewSchema = new mongoose.Schema({
      id:String,
      name:String,
      email:String,
      password:String

  })
mongoose.connection.once('open',function(){
  console.log(users)
})


app.use(express.urlencoded({extended:false}))
app.use(flash())
app.use(session({
  secret: 'secert123',
  resave: false,
  saveUninitialized: false,
  Cookie:{maxAge:6000}

}))
app.use(passport.initialize())
app.use(passport.session())
app.use('./auth', authRoute);

//load view engine
app.set('view engine', 'pug')

app.get('/Login', (req, res) => { 
  res.render('Login.pug')
})



app.get('/index', (req, res) => {
  res.render('index.pug',)
})



app.get('/Register',(req,res)=>{
  res.render('Register.pug')
})

app.post('/Register', async (req,res) => {
  try{
    //unique guid
    let u = Date.now().toString(16)+Math.random().toString(16)+'0'.repeat(16);
    let guid = [u.substr(0,8), u.substr(8,4), '4000-8' + u.substr(13,3), u.substr(16,12)].join('-');

//hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
//insert
    const NewModel = new mongoose.model("Collection",NewSchema)
    const data = new NewModel({id:'',name:'',email:req.body.email,password:hashedPassword })
    data.id=guid;
     data.name=req.body.name;
     data.email=req.body.email;
     data.password=hashedPassword;
  data.save()

    // users.push({
    //   id: Date.now().toString(),
    //   name:req.body.name,
    //   email:req.body.email,
    //   password: hashedPassword

    // })
    res.redirect('./Login')

  }
  catch(e){
    console.log(e);
    res.redirect('./Register')
  }
console.log(users)
})



app.listen(3005)