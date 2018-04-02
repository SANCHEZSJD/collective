const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StructureSchema = new Schema({
    create: Boolean,
    read: Boolean,
    update: Boolean,
    delete: Boolean,
    view: {
        type: Schema.Types.ObjectId,
        ref: 'View'
    }
})
const Structure = mongoose.model('Structure', StructureSchema)

module.exports = Structure;