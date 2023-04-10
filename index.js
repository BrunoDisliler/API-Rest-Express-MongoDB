require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Forma de ler JSON / Middlewares
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

// Rotas da API
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

app.get("/", (req, res) => {
	res.json({ message: "Oi Express!" });
});

// Porta
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

// Conectando ao MongoDB
mongoose
	.connect(
		`mongodb+srv://${DB_USER}:${DB_PASSWORD}@api2.ugvv994.mongodb.net/?retryWrites=true&w=majority`
	)
	.then(() => {
		console.log("Conectamos ao MongoDB");
		app.listen(DB_PORT);
	})
	.catch((err) => console.log(err));

// mongodb+srv://brunodislilerdev:qh5eG1BvT8axqd8P@api2.ugvv994.mongodb.net/?retryWrites=true&w=majority
