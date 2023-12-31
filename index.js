const connectToMongo = require('./db.js')
connectToMongo();

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3030;

app.use(cors({
    origin: '*',
    credentials: true }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())

app.use('/products', require('./controller/product_controller'));
app.use('/order', require('./controller/order_controller'));
app.use('/user', require('./controller/user_controller'));

app.get('/', (req, res)=>{
    const timestamp = new Date().getTime()
    console.log(`${timestamp}`);
})


app.listen(port, () => console.log(`Server Running  on http://localhost:${port}`))