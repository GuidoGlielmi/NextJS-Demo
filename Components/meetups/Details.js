import Image from 'next/image';

const Details = ({ meetup }) => {
	return (
		<div>
			<Image priority src={meetup.image} height={144} width={144} alt='tuvieja' layout='responsive' />
			<h2>{meetup.title}</h2>
			<address>{meetup.title}</address>
			<p>{meetup.description}</p>
		</div>
	);
};

export default Details;
