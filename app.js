let express = require('express')
let app = express();
const dotenv = require('dotenv')
dotenv.config({ path: '.env' })
const bodyParser = require('body-parser');
const multer = require('multer')
const cors = require('cors');
let morgan = require('morgan')
app.use(morgan('combined'))
app.set("view engine", "ejs");

const { dbConnection } = require('./db/mongoose');
const { upload, uploadClintReceipts } = require('./middleware/fileUpload')
const PORT = process.env.PORT

const adminRoute = require('./routes/admin')
const userRoute = require('./routes/user')
const marketersRoute = require('./routes/marketer')
const citiesRoute = require('./routes/cities')
const companyRoute = require('./routes/company')
const ordersRoute = require('./routes/orders/orders')

// Middlewares
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

// Connect with database
dbConnection()

// File Upload
app.post('/user/signup', upload.array('cr'));
app.post('/user/check-tap-payment/fawry', uploadClintReceipts.single('receipt'));

// Routes
app.use('/admin', adminRoute);
app.use('/user', userRoute);
app.use('/marketer', marketersRoute);
app.use('/cities', citiesRoute);
app.use('/company', companyRoute);
app.use('/orders', ordersRoute);

app.all("*", (req, res, next) => {
    res.status(400).json({ msg: `Can't ${req.method} with this route: ${req.originalUrl}` })
})


app.listen(PORT, () => console.log('Server runs on : http://localhost:' + PORT));