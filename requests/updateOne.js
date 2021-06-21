const { MongoClient } = require('mongodb');
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
	'mongodb+srv://dbUser:dbUser@clustertea.drysx.mongodb.net/tealist?retryWrites=true&w=majority';
const client = new MongoClient(uri);

exports.updateOne = async (req, res) => {
	const id = req.params.id;
	const itemLista = req.body;
	try {
		await client.connect();
		const database = client.db('tealist');
		const item = database.collection('item');
		// Query for a movie that has the title 'Back to the Future'
		const query = {};
		const itens = await item.find(query).toArray();

		var query = { id: id };

		item.findOneAndUpdate(query, itemLista, { upsert: true }, function (err, doc) {
			if (err) return res.send(500, { error: err });
			return res.send('Succesfully saved.');
		});

		return itens;
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
};
