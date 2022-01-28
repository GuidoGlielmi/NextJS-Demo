import Layout from '../../Components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticProps(tuvieja) {
	const postData = getPostData(tuvieja.params.id);
	return {
		props: {
			postData,
		},
	};
}

export default function Post({ postData }) {
	return (
		<Layout>
			{postData.title}
			<br />
			{postData.id}
			<br />
			{postData.date}
		</Layout>
	);
}

export async function getStaticPaths() {
	const paths = getAllPostIds();
	//console.log(paths, 'paths'); // [ { params: { id: 'pre-rendering' } }, { params: { id: 'ssg-ssr' } } ] paths
	// if the endpoint hit matches any id, then getStaticProps is called, if not, it is not called and getStaticPaths
	// keeps getting called until that file is created (in development mode)
	//the specific object (array index of paths) with the solicited id is passed to getStaticProps
	return {
		paths,
		fallback: false,
	};
}
