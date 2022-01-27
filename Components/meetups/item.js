import Card from '../ui/Card';
import classes from './item.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image';

function MeetupItem(props) {
	const push = useRouter().push;
	const path = useRouter().asPath;

	return (
		<li className={classes.item}>
			<Card>
				<div className={classes.image}>
					<Image src={props.image} alt={props.title} layout='fill' objectFit='contain' />
					{/* layout has to have a value */}
				</div>
				<div className={classes.content}>
					<h3>{props.title}</h3>
					<address>{props.address}</address>
				</div>
				<div className={classes.actions}>
					<button onClick={() => push(`${path}/${props.id}`)}>Show Details</button>
				</div>
			</Card>
		</li>
	);
}

export default MeetupItem;
