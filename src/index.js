let express = require("express");
let mongoose = require("mongoose");

let userRoute = require('./routes/user');

let app = express();

let bodyParser = require("body-parser");

const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());

app.use(express.static("public"));

mongoose
  .connect("mongodb://127.0.0.1:27017/budget", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Database connected"))
  .catch((error) => console.log(error));

app.use(userRoute);

//404 error
app.use((req, res, next) => {
  res.status(404).send("you are lost");
});

//500 error
app.use((err, req, res, next) => {
  console.log(`forced error is ${err.stack}`);
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`The server is started on ${PORT}`);
});
