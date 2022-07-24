
require('dotenv').config({ path: './../server/config.env' });
const mongoose=require('mongoose')
console.log(' port number is ')
//console.log(process.env.PORT);
const DB = process.env.DATABASE
//console.log(String(DB))
//console.log(typeof (process.env.DATABASE), "  say something  ")
mongoose.connect(process.env.DATABASE, 
).then(() => {
    console.log('connected to mongodb')
}).catch((err) => {
    console.log('not connected \n ', err)
})

