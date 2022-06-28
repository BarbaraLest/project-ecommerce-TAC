const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
const errorMiddleware = require("./middleware/error");

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend1/config/config.env" });
}

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Desligando o servidor devidos a problemas..`);

  process.exit(1);
});

//configs
dotenv.config({ path: "backend1/config/config.env" });

//conexao com o db
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server ir running on http://localhost:${process.env.PORT}`);
});

//controle de erro (para conectar/desconectar o server)
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Desligando o servidor devidos a problemas..`);

  server.close(() => {
    process.exit(1);
  });
});
