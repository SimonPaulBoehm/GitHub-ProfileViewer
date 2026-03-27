const express = require('express')
const cors = require('cors')
const githubRouter = require('./routes/github')

const app = express()

// erlaubt Requests vom Frontend, CORS bedeutet Cross Origin Resource Sharing und macht es möglich auf Resourcen von anderen Domänen zuzugreifen
app.use(cors())

app.use(express.json())

//gibt die route an, die in githubRouter definiert ist, z.B. /github/:username
app.use('/github', githubRouter)

// gibt di app an index.js weiter
module.exports = app 