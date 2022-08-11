const express = require("express")
const bodyParser = require("body-parser");
const cors = require('cors');
const {mongoose} = require('./dbconnect.js')
var user = require('./controller/controller.js')

const app = express();
const port = 7000;

app.use(bodyParser.json())
app.use(cors({origin: '*'}))

app.get('/', (req,res) => {
    res.send('Express Server')
})
app.use("/users", user)

app.listen(port, () => console.log(`Server listening on port ${port}!`));