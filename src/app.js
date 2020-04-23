const express = require('express');
require('./db/mongoose');
const lookupRouters = require('./routers/Lookup');
const regionRouters = require('./routers/region');
const cityRouters = require('./routers/city');
const districtRouters = require('./routers/district');
const addressRouters = require('./routers/address-geocode');
// setting up express and its port
const app = express();

app.use(express.json());
app.use(lookupRouters);
app.use(regionRouters);
app.use(cityRouters);
app.use(districtRouters);
app.use(addressRouters);

module.exports = app;
