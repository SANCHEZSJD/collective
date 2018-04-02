const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ViewSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    title: String,
    parent: String,
    have_child: Boolean,
    index: Number
})
const View = mongoose.model('View', ViewSchema)

module.exports = View;