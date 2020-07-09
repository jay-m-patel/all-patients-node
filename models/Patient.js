const mongoose = require('mongoose')
const patitentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admittedOn: {
        type: Date,
        required: true
    },
    disease: String,
    description: String,
    status: {
        type: String,
        required: true
    },
    discharedOn: Date,
    diedOn: Date,
    details: String

}, {
    timestamps: true
})

const Patient = mongoose.model('patients', patitentSchema)

module.exports = Patient