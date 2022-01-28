import Detail from '../../Components/meetups/Details';
//import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';

const MeetUp = ({ meetup }) => {
	return (
		<>
			<Head>
				<title>{meetup.title}</title>
				<meta name='description' content={meetup.description} />
			</Head>
			<Detail meetup={meetup}></Detail>
		</>
	);
};

export async function getStaticPaths() {
	/*
	como es necesario PRE-GENERAR todas las página en el build,
	también es necesario feedearle todos los id's (endpoints) necesarios para ello,
	dado que es la data dinámica que se está utilizando
	Aqui no se puede acceder al ID que se solicita pq no se puede preveer eso.
	*/

	try {
		const client = await MongoClient.connect(process.env.MONGODB_ACCOUNT);
		console.log('🟢 Database connected');
		const db = client.db();
		const meetupsCollection = db.collection('meetups');
		const results = await meetupsCollection.find().toArray();
		return {
			fallback: 'blocking',
			// para no tener que crear html de fallback hay que usar 'blocking'
			paths: results.map(({ _id }) => ({ params: { meetupId: _id.toString() } })),
		};
	} catch (e) {
		console.log(e);
	}
}

export async function getStaticProps({ params: { meetupId } }) {
	// fetch data of a single meetup
	//console.log(meetupId); //esto no va a loguearse en el browser, sólo en VS
	//recién aca se puede acceder a los parametros del endpoint solicitado
	const client = await MongoClient.connect(process.env.MONGODB_ACCOUNT);
	console.log('🟢 Database connected');
	const db = client.db();
	const meetupsCollection = db.collection('meetups');
	const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
	return {
		props: {
			meetup: { ...meetup, _id: meetup._id.toString() },
		},
	};
}
export default MeetUp;
