const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require('path')
var cors = require('cors')
const keys = require('./config/keys')
const bodyParser = require('body-parser')
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const posterRouter = require('./routes/poster')



const app = express();

//   middlewares
// ========================
// morgan middleware
app.use(morgan('dev'))

// bodyParser Mideddleware
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 50000 }));


app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
// make the file publically accessable 
app.use('/uploads', express.static('uploads'));

// Enable All CORS Requests 
app.use(cors())

// swager configuration 
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:5000"]
    }
  },

  apis: ["app.js", 'routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));






// routes
app.use('/users', userRouter)
app.use('/poster', posterRouter)
app.use('/admin', adminRouter)

// Mongoose Connect
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`app run on port${port}`)
})

