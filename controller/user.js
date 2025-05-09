const { v4: uuidv4 } = require('uuid');
const {setUser,getUser} = require('../service/auth')
const User = require('../model/user');
const { body, validationResult } = require('express-validator');


async function handleUserSignUp(req,res) {

    const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

    const {name,email,password} = req.body;

    await User.create({
        name,
        email,
        password
    });


    res.redirect('/user/login');
    
}

async function handleUserLogIn(req,res) {

    const {email,password} = req.body;

    await User.findOne({email:email})
    .then((user) => {

        if(user){
            if(user.password === password){

                const token = uuidv4();
                setUser(token,user);
                res.cookie('uid',token)
                return res.redirect('/');
            }
        }

        return res.redirect('/user/login');
        
    })
    
}

module.exports = {
    handleUserSignUp,
    handleUserLogIn
}