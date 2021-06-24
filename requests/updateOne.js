const { MongoClient } = require('mongodb');
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
	'mongodb+srv://dbUser:dbUser@clustertea.drysx.mongodb.net/tealist?retryWrites=true&w=majority';
const client = new MongoClient(uri);

exports.updateOne = async (id, itemLista) => {
	try {
		await client.connect();
		const database = client.db('tealist');
		const item = database.collection('item');
		// Query for a movie that has the title 'Back to the Future'
		var query = { id: id };

		let final = await item.updateOne(
			{ id: itemLista.id },
			{ $set: { nome: itemLista.nome, checked: itemLista.checked } }
		);
		return final;
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
};
