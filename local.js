const LocalStrategy = require('passport-local');

const passport = require('passport');
const db = require('./properties');

passport.serializeUser((user,done) =>{
    done(null, user.username)
})
passport.deserializeUser(async(id,done) => {
    try{

        const result = await db.promise().query(`SELECT * FROM USERS WHERE USERNAME= '${username}'`);
    if(result[0][0]){
        return done(null, result[0][0])
    }
    }
    catch (err){
         return done(err,null)

    }
})


passport.use(new LocalStrategy (( {usernameField: 'email', passwordField: 'password',  passReqToCallback: true},
        async(username,password,done)=>{ 
        try{
        const result = await db.promise().query(`SELECT * FROM USERS WHERE USERNAME= '${username}'`);
        if(result[0].length === 0 ){
            return done(null,false)
        }else{
            if(result[0][0].password === password){
               return done(null,result[0][0])
            }else {
                return done(null,false)
            }
        }

        }
        catch(err){
            return done(err,false)


        }

    }
    
)))