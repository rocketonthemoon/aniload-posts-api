require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const postsRouter = require("./routes/post");
app.use("/posts", postsRouter);

app.listen(process.env.PORT, () => console.log("Server Started"));
