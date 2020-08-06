const express = require('express')
const mongoose = require('mongoose');
var exec = require('child_process').exec;

const app = express()
const port = 3000

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const collabRequests = new Schema({
  folder_id: String,
  file_name: String,
  is_collaborated: {
    type: Boolean,
    default: false
  }
});

const MyModel = mongoose.model('collabrequests', collabRequests);

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', async function (req, res) {
  
  console.log(req.body)
  const data = new MyModel(req.body)
  await data.save()
  res.status(200).json("OK")

  // This command excecutes Revit by sending a command
  exec('C: & cd "C:\\Program Files\\Autodesk\\Revit 2020" & start Revit.exe', (error, stdout, stderr) => {
    if (error) console.log(`error: ${error.message}`);
    if (stderr) console.log(`stderr: ${stderr}`);
    console.log(`stdout: ${stdout}`);
  });
})

const main = async () => {
    await mongoose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log("mongoose open")
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

main()

