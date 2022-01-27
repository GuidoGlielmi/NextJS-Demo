import MeetupItem from './item';
import classes from './list.module.css';

function MeetupList({ meetups }) {
	return (
		<ul className={classes.list}>
			{meetups.map((meetup) => (
				<MeetupItem key={meetup.id} id={meetup.id} image={meetup.image} title={meetup.title} address={meetup.address} />
			))}
		</ul>
	);
}

export default MeetupList;
