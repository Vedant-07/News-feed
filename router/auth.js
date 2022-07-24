const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router();
require('./../db/conn')
const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')
const authenticate = require('./../middleware/authenticate')
const cookieParser = require('cookie-parser')

//deleted home page router



router.get('/about', authenticate, (req, res) => {
    console.log('heelo my about')
    res.send(req.rootUser)

})



router.get('/login', (req, res) => {
    res.send('welcomrt to login pasd')
})

router.get('/register', (req, res) => {
    res.send('welcomrt to register pasd')
})
/* using promises
router.post('/register', (req, res) => {
    const {name,email,phone,work,pwd,cpwd}=req.body

    if( !name || !email || !phone || !work || !pwd || !cpwd )
    return res.json({error:"fill all entries"}).status(433)
    //console.log(req.body)
    //res.send('send the info from register page')
    //res.json({message:req.body})
    User.findOne({email:email})
    .then((userexist)=>{
        if(userexist){
            return res.status(422).json({error:'email exists'})
        }
    })

    const user=new User({name,email,phone,work,pwd,cpwd})
    user.save().then(()=>{
       res.json({message:'user registered'}).status(201) 
    }).catch((err)=>{
        res.status().json({error:"saving erroe"})
    })
}) */


router.post('/register', async (req, res) => {


    /*  console.log(req.body)
     console.log(res.status) */
    //res.send('send the info from register page')
    //res.json({message:req.body})


    // console.log('daswew say something sdfsdsdfsdf')

    // window.alert(req.body)
    // console.log('name is ', name)
    // if (!name)
    //    console.log('name is empth')
    // if (!name || !email)
    //    console.log('kuch tho gabad hai');




    try {

        /* console.log('daswew say something sdfsdsdfsdf')
        console.log(req.body)
        const { name, email, phone, work, pwd, cpwd } = req.body
      // window.alert(req.body)
        console.log('name is ',name)
        if(!name)
        console.log('name is empth')
        if(!name || !email)
        console.log('kuch tho gabad hai');
        if ((!name || !email || !phone || !work || !pwd || !cpwd)) {
            console.log('its exe1')       
            return res.status(422).json({ error: "fill all entries" })//removing status
        }
     */
        console.log("-----------------------------------------------");
        
        const { name, email, phone, work, pwd, cpwd } = req.body
        console.log(req.body)

        if ((!name || !email || !phone || !work || !pwd || !cpwd)) {
            console.log('some of the entries havent filled yet')
            if (!name)
                console.log('name is empty');
            if (!email)
                console.log('email is emoty');
            if (!phone)
                console.log('phone is empty');
            if (!work)
                console.log('work is emoty');
            if (!pwd)
                console.log('pwd is empty');
            if (!cpwd)
                console.log('cpwd is emoty');
            return res.json({ error: "fill all entries" })//removing status
        }

        console.log('have you reached to level 1')
        //check from here
        let flag1 = 0
        let flag2 = 0

        const userexist = await User.findOne({ email: email })
        console.log('something related to userexist inauth.js');
        console.log(userexist);
        if (userexist) {
            flag1 = 0
            return res.status(422).json({ error: 'email exists enter new ' })

        }
        else
            flag1 = 1


        if (pwd == cpwd) {
            if (pwd != '' && cpwd != '') {
                flag2 = 1
                console.log('passwords are matching');
            }

        }
        else {
            console.log(pwd, ' ---pwd cpwd---- ', cpwd)
            flag2 = 0
            return res.status(422).json({ error: 'reassure password again' })
        }


        console.log('have you reached to level 2-------------------')
        console.log(flag1, "---flag1   lfag2----", flag2);

        if (flag1 == 1 && flag2 == 1) {
            const user = new User({ name, email, phone, work, pwd, cpwd })
            //for bycrypt
            console.log(user.pwd)

            const ressponse = await user.save()

            if (ressponse)
                res.status(201).json({ message: 'user registered' })
        }

    }
    catch (error) {
        res.status(422).json({ error: "saving erroe" })
    }
    console.log('---------XXXXXXXXXX-----------')

})


router.post('/login', async (req, res) => {
    ///console.log('sending data from login')
    try {

        const { email, pwd } = req.body
        if (!email || !pwd)
            return res.status(400).json({ error: 'fill the data of login here ' })

        const userlogin = await User.findOne({ email: email })

        if (userlogin) {
            console.log("user login is created XXXXXXXXXXXXXXXXXXX");
            const isMatch = await bcrypt.compare(pwd, userlogin.pwd)
            const token = await userlogin.generateAuthToken();
            console.log('finally the token issssssssssssssssssss')
            console.log(token);

            res.cookie('jwtoken', token, {
                expires: new Date(Date.now() + 600000),
                httpOnly: true
            })


            if (!isMatch) {
                res.status(400).json({ error: 'invaalid credentials' })
            }
            else {
                res.json({ message: 'user sign in successfully' })
            }

        }
        else
            res.status(400).json({ error: 'user not resgistered' })
    } catch (error) {
        console.log('some error happened in login side in /login catch')
        console.log(error);
    }

})


router.get('/getData', authenticate, (req, res) => {
    console.log('heelo my getdata')
    res.send(req.rootUser)

})

router.post('/contact', authenticate, async (req, res) => {
    try {

        const { name, email, message } = req.body
        console.log("here is the req.body");
        console.log(req.body)
        console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
        console.log(name, " ", email, " ", message);
        if (!name || !email || !message) {
            console.log('<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>');
            return res.json({ error: 'filll the message block' })
        }

        console.log("---------------------------level 2--------------");
        const userContact = await User.findOne({ _id: req.userId })
        console.log('================================================')
        console.log(userContact);
        if (userContact) {
            console.log("---------------------------in level3--------------");
            const userMessage = await userContact.addMessage(name, email, message)
            await userContact.save();//changin something here
            //window.alert('message successfully sent')
            res.status(201).json({ message: 'user contact successfully' })
        }
        else {
            console.log('here lies the problem .........................')
        }

    }
    catch (error) {
        console.log('error on contact page server side ', error);
    }

}

)
//logout ka page
router.get('/logout',  (req, res) => {
    console.log('heelo my logout')
    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).send('User logout')

})

module.exports = router;

//usertoken here
/*  const token = await userlogin.generateAuthToken()
 
 //using cookies here

 res.cookie('jwtoken', token, {
     expires: new Date(Date.now() + 600000),
     httpOnly: true
 })

 console.log('XXXXXXXXXXXXXprinting cookiesXXXXXXXXXXXXXXXXX')
 console.log(`and the cookie is  ${req.cookies.jwtoken}`);
 console.log(req.cookies.jwtoken)

 if (match) {
     res.json({ message: 'found the user' })
     console.log('printing sab kucccccccccccccccccccf')
     console.log(userlogin)
 }
 else {
     res.status(400).json({ error: 'problem here in match....' })
 } */

/* router.post('/contact', authenticate, async (req, res) => {
   const { name, email, message } = req.body
   console.log(req.body)
   console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV");
   console.log(name, " ", email, " ", message);
   if (!name || !email || !message) {
       console.log('<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>');
       return res.status(400).json({ error: 'filll the message block' })
   }
   //inserted else statement here
 else {
       try {

           console.log("---------------------------level 2--------------");
           const userContact = await User.findOne({ _id: req.userId })
           console.log('================================================')
           console.log(userContact);
           if (userContact) {
               console.log("---------------------------in level3--------------");
               const userMessage = await userContact.addMessage(name, email, message)
               await userContact.save();//changin something here
               window.alert('message successfully sent')
               res.status(201).json({ message: 'user contact successfully' })
           }
           else {
               console.log('here lies the problem .........................')
           }

       }
       catch (error) {
           console.log('error on contact page server side ', error);
       }

   }
}
) */