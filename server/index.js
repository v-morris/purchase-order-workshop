const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 9000;

const vendorRouter = require('./routes/vendor.routes');
const orderRouter = require('./routes/order.routes');

app.use(cors());
app.use(express.json());

// routes
app.use('/vendors', vendorRouter);
app.use('/orders', orderRouter);

app.listen(port, () => {
  console.log(`Purchase order server listening on port ${port}`);
});
