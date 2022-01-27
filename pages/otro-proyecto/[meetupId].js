import Detail from "../../Components/meetups/Details";

const MeetUp = ({ img, id }) => {
	return <Detail img={img}></Detail>;
};

export async function getStaticPaths() {
	/*
	como es necesario PRE-GENERAR todas las página en el build,
	también es necesario feedearle todos los id's necesarios para ello,
	dado que es la data dinámica que se está utilizando
	*/

	return {
		fallback: false,
		paths: [
			{
				params: {
					meetupId: "m1",
					// meetupId tiene que tener el mismo nombre que el archivo
					// por lo que el archivo no puede tener " - "
				},
			},
			{
				params: {
					meetupId: "m2",
				},
			},
		],
	};
}

export async function getStaticProps(context) {
	// fetch data the a single meetup
	const meetupId = context.params.meetupId;
	console.log(meetupId); //esto no va a loguearse en el browser, sólo en VS
	return {
		props: {
			img: "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
			id: meetupId,
		},
	};
}
export default MeetUp;
