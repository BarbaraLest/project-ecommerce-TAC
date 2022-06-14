const app = require('./app');

const dotenv= require('dotenv')
const connectDatabase = require('./config/database')


//configs
dotenv.config({path:"backend1/config/config.env"})

//conexao com o db
connectDatabase()

app.listen(process.env.PORT, ()=>{
    console.log(`Server ir running on http://localhost:${process.env.PORT}`)
})