const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Item'); //importando o model para ser usado
const Item = mongoose.model('itens'); //passando o valor do model para uma variavel e relacionando a collection

router.get('/', async (req, res) => {
	res.send('tea list server online');
});

//get all itens
router.get('/itens', async (req, res) => {
	Item.find({})
		.sort({ id: 'asc' })
		.then((lista) => {
			res.json(lista);
		});
});

//update an iten
router.put('/itens/:id', async (req, res) => {
	const itemLista = req.body;
	const id = req.params.id;

	Item.findOne({ _id: id })
		.then((item) => {
			if (item) {
				//criar depois validação da edição
				item.nome = itemLista.nome;
				item.checked = itemLista.checked;

				item.save()
					.then(() => {
						res.status(200).json({
							msg: 'editado com sucesso',
							payload: item,
						});
					})
					.catch((error) => {
						console.log(error);
						res.status(500).send(
							'houve um erro ao editar item da lista: erro: ' + error
						);
					});
			}
		})
		.catch((erro) => {
			console.log(erro);
			res.send('houve um erro ao buscar item para ediçao: erro: ' + erro);
		});
});

module.exports = router;
