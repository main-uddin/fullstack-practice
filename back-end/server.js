const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
mongoose.connect('mongodb://localhost/my_database', {
  useMongoClient: true
})
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

const Schema = mongoose.Schema

const createSchema = new Schema({
  name: String
})

const MyModel = mongoose.model('namelist', createSchema)

app.post('/post', (req, res) => {
  const data = new MyModel(req.body)
  data.save(function (err, resp) {
    if (err) throw err
    res.json(resp)
  })
})

app.get('/get', (req, res) => {
  MyModel.find({}).select({name: 1, _id: 1}).exec((err, data) => {
    if (err) throw err
    res.json(data)
  })
})

app.listen(5000, () => console.log('server is running 5000!'))
