const { MongoClient } = require('mongodb')
MongoClient.connect(
	// 'mongodb+srv://noc:%232QS%2A-F3mwxvUux@cluster0.goc5j.mongodb.net/shift-manager?retryWrites=true&w=majority',
	`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@nocshiftorganizer.dcyx4.mongodb.net/shiftorganizer?retryWrites=true&w=majority`,
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
		global.db = client.db(process.env.DATABASE_NAME)
	}
)