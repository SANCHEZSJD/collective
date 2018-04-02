const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PrivilegeSchema = new Schema({
    create: { type: Boolean, default: null },
    read: { type: Boolean, default: null },
    update: { type: Boolean, default: null },
    delete: { type: Boolean, default: null },
    userprofile: { type: Schema.Types.ObjectId, ref: 'Userprofile' },
    view: { type: Schema.Types.ObjectId, ref: 'View' }
})
const Privilege = mongoose.model('Privilege', PrivilegeSchema)

module.exports = Privilege;
