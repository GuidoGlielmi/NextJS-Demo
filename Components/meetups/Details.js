import Image from "next/image";

const Details = ({ img }) => {
	return (
		<div>
			<Image priority src={img} height={144} width={144} alt="tuvieja" layout="responsive" />
		</div>
	);
};

export default Details;
