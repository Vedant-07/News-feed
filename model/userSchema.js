const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//thi is instance
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    cpwd: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    messages:[{
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }

    }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})


//hashing the password here
userSchema.pre('save', async function (next) {
    //call nly this function if modified
    console.log('hello from inside usershcem pre mei hu ')
    if (this.isModified('pwd')) {
        this.pwd = await bcrypt.hash(this.pwd, 12)
        this.cpwd = await bcrypt.hash(this.cpwd, 12)
    }
    next()
})
//genereting auth token
userSchema.methods.generateAuthToken = async function () {
    try {
        //herer payload--unique
        let token = await jwt.sign({ _id: this._id }, process.env.SECRET)
        //console.log(process.env.SECRET)
        this.tokens = this.tokens.concat({ token: token })
        await this.save()
        return token;
    }
    catch (err) {
        console.log('generate token ka error!!!!!!!!!!!!!!!!!!!');
        console.log(err)
    }
}

userSchema.methods.addMessage= async function(name,email,message){
  try{
    this.messages=this.messages.concat({name,email,message})
    await this.save()
    return this.messages
  }
  catch(error){
    console.log('addmessage mein eroor !!!!!!!!!!!!!!!!!!!!!!!');
  }
}

const User = mongoose.model('USER', userSchema)
module.exports = User