const express = require("express");
const app = express();

// Forma de ler JSON / Middlewares
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "Oi Express!" });
});

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));
