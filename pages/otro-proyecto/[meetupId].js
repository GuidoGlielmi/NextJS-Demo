import Detail from '../../Components/meetups/Details';
//import { MongoClient } from 'mongodb';
import { getAllData, getData } from '../../lib/posts';
import Head from 'next/head';

const MeetUp = ({ meetup }) => {
	console.log(meetup);
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

export function getStaticPaths() {
	/*
	como es necesario PRE-GENERAR todas las página en el build,
	también es necesario feedearle todos los id's (endpoints) necesarios para ello,
	dado que es la data dinámica que se está utilizando
	Aqui no se puede acceder al ID que se solicita pq no se puede preveer eso.
	*/
	try {
		const results = getAllData();
		console.log(results);
		return {
			fallback: 'blocking',
			// para no tener que crear html de fallback hay que usar 'blocking'
			paths: results.map(({ _id }) => ({ params: { meetupId: _id } })),
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
	console.log(meetup, 'getStaticProps');
	return {
		props: {
			meetup: meetup ? meetup : { _id: '', title: '', image: '', address: '', description: '' },
		},
	};
}
export default MeetUp;
