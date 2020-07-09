const Patient = require('./../models/Patient.js')
const MonthlyStat = require('./../models/MonthlyStat.js')


module.exports.admitted = async (_, res) => {
    try {
        let admitted = await Patient.find({status: 'curing'})
        let allMonthlyStats = await MonthlyStat.find({})
        res.json({
            admitted,
            allMonthlyStats
        })

    } catch(err) {
        console.error(err)
    }
}

module.exports.admitNew = async ({body}, res) => {
    try {
        let newPatient = new Patient(body)
        let savedPatient = await newPatient.save()
        
        let months = ['january','february','march','april','may','june','july','august','september','october','november','december']
        let thisMonth = months[savedPatient.admittedOn.getMonth()] + '-' + String(savedPatient.admittedOn.getYear() + 1900)
        
        let updatedMonthlyStat = await MonthlyStat.findOneAndUpdate({month: thisMonth}, {$inc: {total: 1}}, {new: true, upsert: true})

        res.json({
            savedPatient,
            updatedMonthlyStat
        })

    } catch(err) {
        console.error(err)
    }
}

module.exports.updateStatus = async ({body: {id, status, dischargedOn, diedOn, details}}, res) => {
    try {
        let dVar
        let dVal
        let updates = {}
        if(status) updates.status = status
        if(dischargedOn) {dVar = 'dischargedOn'; dVal = dischargedOn }
        if(diedOn) {dVar = 'diedOn'; dVal = diedOn}
        if(details) updates.details = details

        let updatedPatient = await Patient.findOneAndUpdate({_id: id}, {
            status: status,
            [dVar]: dVal,
            details: details 
        }, {new: true})
        
        let months = ['january','february','march','april','may','june','july','august','september','october','november','december']
        let thisMonth = months[updatedPatient.admittedOn.getMonth()] + '-' + String(updatedPatient.admittedOn.getYear() + 1900)

        let updatedMonthlyStat = await MonthlyStat.findOneAndUpdate({month: thisMonth}, {$inc: {[status]: 1}}, {new: true})

        res.json({
            updatedPatient,
            updatedMonthlyStat
        })

    } catch(err) {
        console.error(err)
    }    

}


module.exports.searchPatient = async (req, res) => {
    try {
        let {query: {name}} = req

        let searchedResult = await Patient.find({name: {$regex: new RegExp(name, 'i')}})

        res.json(searchedResult)
    } catch(err) {
        console.error(err)
    }
}