/* const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const passport=require('passport')

const mongoose = require ('mongoose')
    
passport.use(new LocalStrategy(
    function initialize(passport, getUserByEmail, getUserById){
        const authenticateUser = ('authenticateUser')
         authenticateUser =  async (email, password, done) => {
        


            const user = getUserByEmail(email)
            
            if(user==null){
                return done(null,false, {message:'Did not find user email'})
            }
            try{
                if(await bcrypt.compare (password, user.password)){
                return done(null,user)}
                else
                    { return done(null,false, {message: 'Incorrect Password'})}
                }
            
            catch(e){
                return done (e)
                
    }   
    passport.use(new LocalStrategy({usernameField: 'email'}),authenticateUser)
    passport.serializeUser((user, done ) => done(null, user.id))
    passport.deserializeUser((id, done)=> {
        return done(null, getUserById(id))}
    
     
    
)}}))
    

   
module.exports=LocalStrategy;
 */


