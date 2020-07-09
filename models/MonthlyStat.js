const mongoose = require('mongoose')
const monthlyStatSchema = new mongoose.Schema({
    month: String,
    total: Number,
    discharged: Number,
    died: Number
}, {
    timestamps: true
})

const MonthlyStat = mongoose.model('monthlyStats', monthlyStatSchema)

module.exports = MonthlyStat