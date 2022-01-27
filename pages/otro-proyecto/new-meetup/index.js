import MeetUpForm from '../../../Components/meetups/Form';
import Modal from '../../../Components/ui/Modal';
import { useState } from 'react';
import { useRouter } from 'next/router';

const NewMeetUpPage = () => {
	const push = useRouter().push;
	const modalInitialState = { show: false, title: '', message: '' };
	const [resultModal, setResultModal] = useState(modalInitialState);
	async function addMeetupHandler(data) {
		try {
			const rawResponse = await fetch('/api/new-meetup', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' },
			});
			const jsonResponse = await rawResponse.json();
			if (jsonResponse.message === 'Success!') {
				setResultModal({ show: true, message: jsonResponse.message, title: 'Success' });
			}
		} catch (error) {
			setResultModal({ show: true, message: error.message, title: 'Error' });
		}
	}

	return (
		<>
			{resultModal.show ? (
				<Modal
					onConfirm={() => {
						setResultModal(modalInitialState);
						push('/otro-proyecto');
					}}
					content={resultModal}
				/>
			) : (
				<></>
			)}
			<MeetUpForm onAddMeetup={addMeetupHandler} />
		</>
	);
};

export default NewMeetUpPage;
