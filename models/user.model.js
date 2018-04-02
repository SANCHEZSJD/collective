const mongoose = require('mongoose')
//const mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    userprofile: { 
        type: Schema.Types.ObjectId, 
        ref: 'Userprofile' 
    }
})
//UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)


module.exports = User;
