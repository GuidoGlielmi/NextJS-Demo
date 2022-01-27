import MeetUpList from '../../Components/meetups/List';
import { MongoClient } from 'mongodb';

const HomePage = ({ meetups }) => {
	return <MeetUpList meetups={meetups} />;
};
/* 
export async function getServerSideProps(context) {
	const req = context.req;
	const res = context.res;

	//this function will also NOT run in the client, ALWAYS on the server
	//This will be called EVERYTIME there is a request for this page on the server
	return {
		props: DUMMY_MEETUPS,
	};
}
 */
export async function getStaticProps() {
	/* this (if exists) get called BEFORE the main component in this file, 
	to populate it with the corresponding props
	This kind of functions can do things that normally are done in the server
	because it only get called during build process, not on the server nor on the client
	This poses the problem that all the data for the page is
	fetched ONLY during the build process, so any update done to it, for example, in the database
	will not appear in the page, of course unless some client-side data fetching is added
	*/
	try {
		const client = await MongoClient.connect(process.env.MONGODB_ACCOUNT);
		console.log('🟢 Database connected');
		const db = client.db();
		const meetupsCollection = db.collection('meetups');
		const results = await meetupsCollection.find().toArray();
		return {
			props: {
				meetups: results.map(({ title, address, image, description, _id }) => ({
					title,
					address,
					image,
					description,
					id: _id.toString(),
				})),
			},
			revalidate: 20,
		};
	} catch (e) {
		console.log(e);
	}
}
export default HomePage;
