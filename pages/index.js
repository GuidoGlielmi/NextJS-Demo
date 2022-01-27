/*
The Next.js development server has Fast Refresh enabled.

The Link component enables client-side navigation between two pages in the same Next.js app.
Client-side navigation means that the page transition happens using JavaScript,
which is faster than the default navigation done by the browser.
Here’s a simple way you can verify it:
    - Use the browser’s developer tools to change the background CSS property of <html> to yellow.
    - Click on the links to go back and forth between the two pages.
    - You’ll see that the yellow background persists between page transitions.

This shows that the browser does not load the full page and client-side navigation is working.
If you’ve used an anchor instead of Link the background color will be cleared on link clicks
because the browser does a full refresh.

Next.js does code splitting automatically, so each page only loads what’s necessary for that page.
That means when the homepage is rendered, the code for other pages is not served initially.
Only loading the code for the page you request also means that pages become isolated.
If a certain page throws an error, the rest of the application would still work. 
Furthermore, Next.js automatically prefetches the code for the linked page in the background
https://nextjs.org/docs/routing/introduction

------------------------------

Next.js can serve static assets, like images, under the top-level public directory. Files inside public can be referenced from the root of the application similar to pages.
https://nextjs.org/docs/basic-features/static-file-serving


*/
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";

export default function Home({ allPostsData }) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>No me digas que hacer pedazo de pebete</p>
				<p>
					(This is a sample website - you’ll be building a site like this on{" "}
					<a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
				</p>
			</section>
			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							{title}
							<br />
							{id}
							<br />
							{date}
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}

export async function getStaticProps() {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
}
