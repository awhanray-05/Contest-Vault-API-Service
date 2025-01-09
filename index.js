const express = require("express")
const cors = require('cors')
const port = 3000;

const app = express();
app.use(cors());

const scrape = require('./routes/codechef.js')
app.use('/', scrape)

app.listen(port, () => {
    console.log(`server run on port ${port}`)
})