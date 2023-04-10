const express = require("express");
const router = require("express").Router();
const Person = require("../models/Person");

// Create - Criação de Dados
router.post("/", async (req, res) => {
	const { name, salary, approved } = req.body;

	if (!name) {
		res.status(422).json({ message: "O nome é obrigatório" });
		return;
	} else if (!salary) {
		res.status(422).json({ message: "O salário é obrigatório" });
		return;
	} else if (salary <= 0) {
		res.status(422).json({ message: "Insira um valor válido para o salário" });
		return;
	} else if (!approved) {
		res.status(422).json({ message: "O campo é obrigatório" });
		return;
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

		if (!person) {
			res.status(424).json({ message: "O usuário não foi encontrado!" });
			return;
		}

		res.status(200).json(person);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

// Update - Atualização de Dados (PUT, PATCH)
// PUT - Aguarda o objeto completo para atualizar
// PATCH - Aguarda apenas o objeto parcialmente
router.patch("/:id", async (req, res) => {
	const id = req.params.id;
	const { name, salary, approved } = req.body;

	const person = {
		name,
		salary,
		approved,
	};

	try {
		const updatedPerson = await Person.updateOne({ _id: id }, person);

		if (updatedPerson.matchedCount === 0) {
			res.status(422).json({ message: "O usuário não foi encontrado!" });
			return;
		}

		res.status(200).json(person);
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

module.exports = router;
