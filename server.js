var express = require('express')
var address = require('./AddressController')
var app = express()
app.use(address)
app.listen(8000)