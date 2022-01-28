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
			if (rawResponse.status !== 201 && rawResponse.status !== 200 && rawResponse.status !== 204) {
				const jsonResponse = await rawResponse.json();
				throw new Error({
					message: jsonResponse.message,
					status: `${rawResponse.status} ${rawResponse.statusText}`,
				});
			}
			const jsonResponse = await rawResponse.json();
			setResultModal({
				show: true,
				message: jsonResponse.message,
				title: `${rawResponse.status} ${rawResponse.statusText}`,
			});
		} catch (error) {
			setResultModal({ show: true, message: error.message, title: error.status });
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
