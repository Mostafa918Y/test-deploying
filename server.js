const connectDB = require('./config/db');
require('dotenv').config();

const PORT = process.env.PORT 

connectDB();
const userRoutes = require('./routes/user.routes')
const app = express();
app.use(express.json());


app.use('/',userRoutes)
app.use('/',userRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server Running on http://localhost:${PORT}`)
})