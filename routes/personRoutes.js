const express = require("express");
const router = require("express").Router();
const Person = require("../models/Person");

// Create - Criação de Dados
router.post("/", async (req, res) => {
	const { name, salary, approved } = req.body;

	if (!name) {
		res.status(422).json({ message: "O nome é obrigatório" });
	} else if (!salary) {
		res.status(422).json({ message: "O salário é obrigatório" });
	} else if (salary <= 0) {
		res.status(422).json({ message: "Insira um valor válido para o salário" });
	} else if (!approved) {
		res.status(422).json({ message: "O campo é obrigatório" });
	}

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

// Read - Leitura de Dados
router.get("/", async (req, res) => {
	try {
		const people = await Person.find();

		res.status(200).json(people);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

router.get("/:id", async (req, res) => {
	// Extrair dado da requisição
	const id = req.params.id;
	try {
		const person = await Person.findOne({ _id: id });

		res.status(200).json(person);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

module.exports = router;
