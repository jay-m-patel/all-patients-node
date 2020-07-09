const mongoose = require('mongoose')
const uri=`mongodb://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0-shard-00-00.atmge.mongodb.net:27017,cluster0-shard-00-01.atmge.mongodb.net:27017,cluster0-shard-00-02.atmge.mongodb.net:27017/allPatientsDB?ssl=true&replicaSet=atlas-11q6bw-shard-0&authSource=admin&retryWrites=true&w=majority`
// const uri = `mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@cluster0.atmge.mongodb.net/allPatientsDB?retryWrites=true&w=majority`
mongoose.connect(uri, { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
 })
.then(conn => console.log('Database connected successfully.'))
.catch(err => console.log(err))