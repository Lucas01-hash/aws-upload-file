require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("conectado ao banco de dados");
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(require("./routes"));

const PORT = 3000;
app.listen(PORT, (PORT, err) => {
  if (err) {
    console.log("ocorreu um erro no serviço", err);
  } else {
    console.log("conectado ao servidor na porta: ");
  }
});
