const { MongoClient } = require('mongodb')
MongoClient.connect(
	'mongodb+srv://noc:oPUkEnxQ3ZbPhV1y@cluster0.goc5j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	async (error, client) => {
		if (error) {
			console.log('Unable to connect')
			throw error
		}
		console.log('MongoDB is connected!')

		//Global variable defined and will be reached by all scripts (routers) of App.js in server
		global.db = client.db('shift-manager')
	}
)