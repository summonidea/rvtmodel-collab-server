const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000

//Connect to DB
mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

//Schema constructor
const mySchema = new mongoose.Schema({
  key: String,
  property: String
});

//Create a model
const myModel = mongoose.model('my-collection', mySchema);

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', function (req, res) {
  const doc = new myModel(req.body)
  doc.save()

  // This command excecutes Revit by sending a command
  exec('C: & cd "C:\\Windows\\System32" & start notepad.exe', (error, stdout, stderr) => {
    if (error) console.log(`error: ${error.message}`);
    if (stderr) console.log(`stderr: ${stderr}`);
    console.log(`stdout: ${stdout}`);
  });

  res.send('Got a POST request and saved to DB')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

