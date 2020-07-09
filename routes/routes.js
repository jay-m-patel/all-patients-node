const express = require('express')
const router = express.Router()

const {admitted, admitNew, updateStatus, searchPatient} = require('./../controllers/controllers.js')

router.get('/', admitted)

router.post('/admitNew', admitNew)

router.put('/updateStatus', updateStatus)

router.get('/search', searchPatient)

module.exports = router