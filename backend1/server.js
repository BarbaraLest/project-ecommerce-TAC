const app = require('./app');
const dotenv= require('dotenv')
const connectDatabase = require('./config/database')

process.on("uncaughtException", (err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Desligando o servidor devidos a problemas..`);

    process.exit(1);
})


//configs
dotenv.config({path:"backend1/config/config.env"})

//conexao com o db
connectDatabase()

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server ir running on http://localhost:${process.env.PORT}`)
})


//controle de erro (para conectar/desconectar o server)
process.on("unhandledRejection", (err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Desligando o servidor devidos a problemas..`);

    server.close(() => {
        process.exit(1);
    })
})



