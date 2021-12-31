import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookRoutes from "./routes/cook.js";
import recipeRoutes from "./routes/recipe.js";
import dotenv from "dotenv";

// initial app
const app = express();

// call dotenv to read env file
dotenv.config();

// general setup
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//
app.use("/cooks", cookRoutes);
app.use("/recipes", recipeRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Our kitchen!!!");
});

// PORT
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
