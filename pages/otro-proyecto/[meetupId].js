import Detail from '../../Components/meetups/Details';
import { MongoClient } from 'mongodb';
import { writeData, getData } from '../../lib/posts';

const MeetUp = ({ meetup }) => {
	return <Detail meetup={meetup}></Detail>;
};

export async function getStaticPaths() {
	/*
	como es necesario PRE-GENERAR todas las página en el build,
	también es necesario feedearle todos los id's necesarios para ello,
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
			fallback: false,
			paths: resultsWithId.map(({ id }) => ({ params: { meetupId: id } })),
		};
	} catch (e) {
		console.log(e);
	}
}

export async function getStaticProps({ params: { meetupId } }) {
	// fetch data the a single meetup
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
