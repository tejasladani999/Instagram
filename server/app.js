const express = require('express');
const app = express();
const mongoose =require('mongoose')
const port = 8800; // You can choose a different port if you prefer
const {MONGOURI} = require('./keys')

mongoose.connect(MONGOURI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.on('connected', () =>{
  console.log("Connected to MongoDB")
})
mongoose.connection.on('error',(err)=>{
  console.log("error connecting", err)
})

require('./models/user')
// mongoose.model("User")

app.use(express.json())
app.use(require('./routes/auth'))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
