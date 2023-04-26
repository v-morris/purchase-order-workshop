const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PORT || 9000

const vendorRouter = require('./routes/vendor.routes')

app.use(cors())

// routes
app.use('/vendors', vendorRouter)

app.listen(port, () => {
  console.log(`Purchase order server listening on port ${port}`)
})