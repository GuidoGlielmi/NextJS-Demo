/* api/new-meetup
You do not need to use express,
Next JS already has its own built-in server. 
Most of the time the default Next.js server will be enough but there are times you'll want to
run your own server to integrate into an existing application. 
Next.js provides a custom server api -> https://nextjs.org/docs/advanced-features/custom-server
*/
import { MongoClient } from 'mongodb';

async function handler({ body, method }, res) {
	if (method === 'POST') {
		try {
			const client = await MongoClient.connect(process.env.MONGODB_ACCOUNT);
			//mongo needs a list IP's to give access to
			console.log('🟢 Database connected');
			const db = client.db();
			const meetupsCollection = db.collection('meetups');
			const data = await meetupsCollection.insertOne(body);
			client.close();
			/* writeData(getAllData().push(body)); esta funcion no se puede ejecutar
			en una parte que no sea server side	dado que se necesita ejecutar en el client side,
			y todo lo que sea server side deja de estar disponible en el client side
			*/
			return res.json({ message: 'Success!', data });
		} catch (err) {
			return res.json({ message: err.message });
		}
	}
}

export default handler;
