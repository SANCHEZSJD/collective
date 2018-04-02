const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserprofileSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
})
const Userprofile = mongoose.model('Userprofile', UserprofileSchema)

module.exports = Userprofile;