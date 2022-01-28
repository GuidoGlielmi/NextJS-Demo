import Detail from '../../Components/meetups/Details';
import { MongoClient } from 'mongodb';
import { writeData, getData } from '../../lib/posts';
import Head from 'next/head';

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
		const resultsWithId = results.map((rwi) => ({ ...rwi, id: rwi._id.toString() }));
		const resultsWithIdJson = JSON.stringify(resultsWithId);
		writeData(resultsWithIdJson);
		return {
			fallback: 'blocking',
			paths: resultsWithId.map(({ id }) => ({ params: { meetupId: id } })),
		};
	} catch (e) {
		console.log(e);
	}
}

export function getStaticProps({ params: { meetupId } }) {
	// fetch data of a single meetup
	//console.log(meetupId); //esto no va a loguearse en el browser, sólo en VS
	//recién aca se puede acceder a los parametros del endpoint solicitado
	const meetup = getData(meetupId);
	return {
		props: {
			meetup,
		},
	};
}
export default MeetUp;
