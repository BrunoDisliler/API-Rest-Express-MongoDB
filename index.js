require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Person = require("./models/Person");

// Forma de ler JSON / Middlewares
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

// Rotas da API
app.post("/person", async (req, res) => {
	const { name, salary, approved } = req.body;

	const person = {
		name,
		salary,
		approved,
	};
	try {
		// Criando dados
		await Person.create(person);

		res
			.status(201)
			.json({ message: "Pessoa inserida no sistema com sucesso!" });
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

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
