const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { getAll } = require('../requests/getAll');
const { updateOne } = require('../requests/updateOne');

router.get('/', async (req, res) => {
	res.send('tea list server online');
});

//get all itens
router.get('/itens', async (req, res) => {
	await getAll()
		.then((lista) => res.json(lista))
		.catch((err) => console.log(err));
});

//update an iten
router.put('/itens/:id', async (req, res) => {
	const id = req.params.id;
	const itemLista = req.body;

	updateOne(id, itemLista)
		.then((result) => res.json(result))
		.catch((err) => console.log(err));
});

module.exports = router;
