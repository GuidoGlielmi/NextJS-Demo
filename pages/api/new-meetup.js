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
		MongoClient.connect(process.env.MONGODB_ACCOUNT, (error, client) => {
			//mongo needs a list IP's to give access to
			if (error) {
				console.log('🔴 Database error: ', error);
			} else {
				console.log('🟢 Database connected');
				const db = client.db();
				const meetupsCollection = db.collection('meetups');
				meetupsCollection
					.insertOne(body)
					.then((data) => {
						console.log(data);
						client.close();
						return res.json({ message: 'Success!', data });
					})
					.catch((err) => {
						console.log(err);
					});
			}
		});
	}
}

export default handler;
