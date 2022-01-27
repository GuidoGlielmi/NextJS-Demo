/*

Next.js has two forms of pre-rendering: Static Generation and Server-side Rendering. The difference is in when it generates the HTML for a page.

  -  Static Generation is the pre-rendering method that generates the HTML at BUILD time. The pre-rendered HTML is then reused on each request (any user anywhere). For example, Vercel builds only at the beginning, so any changes made to the data of a database used in the application will not be reflected on the page unless a redeploy takes place.
	So, when exporting getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by said function. 
  -  Server-side Rendering is the pre-rendering method that generates the HTML on each request.

In development mode (when you run npm run dev), every page is pre-rendered on each request — even for pages that use Static Generation.

Static Generation can be done with and without data.
pages that do not require fetching external data will automatically be statically generated when the app is built for production.

the (possibly async) function getStaticProps runs at build time in production,
and inside it, you can fetch and send external data as props to the page. The HTML can only be generated AFTER 
fetching the data at build time.
In development mode (on localhost), getStaticProps runs on each request instead.
In production, because it’s meant to be run at build time, you won’t be able to use data that’s only available during request time, such as query parameters or HTTP headers. If you need access to the request for your page, consider using Middleware in addition to getStaticProps.

When combined with Incremental Static Regeneration, getStaticProps will run in the background while the stale page is being revalidated, and the fresh page served to the browser.
Next.js allows you to create or update static pages after you’ve built your site. Incremental Static Regeneration (ISR) enables you to use static-generation on a per-page basis, without needing to rebuild the entire site.
Next.js will attempt to re-generate the page:
    // - When a request comes in (when first opening the site or refreshing)
    // - At most once every <revalidate-value> seconds
The regeneration will take place in production when first opening the site or when a refresh takes place.
In development will happen with every endpoint opened (as opossed to every request)
So, if deployed without revalidating, it will NEVER update the information, unless re-deployed
The Advantage of ISR: You have the flexibility to choose which pages are generated at build or on-demand.
Next.js defines which pages to generate at build-time based on the paths returned by
getStaticPaths. For example, you can generate the most popular 1,000 products at build-time by returning the paths for the top 1,000 product IDs in getStaticPaths. The remaining pages can be generated on-demand by specifying fallback as blocking or true in getStaticPaths:

    True: The paths returned from getStaticPaths will be rendered to HTML at build time by getStaticProps.
    The paths that have not been generated at build time will not result in a 404 page. Instead, Next.js will serve a “fallback” version of the page on the first request to such a path.
    In the background, Next.js will statically generate the requested path HTML and JSON. This includes running getStaticProps.
    When complete, the browser receives the JSON for the generated path. This will be used to automatically render the page with the required props. From the user’s perspective, the page will be swapped from the fallback page to the full page.
    At the same time, Next.js adds this path to the list of pre-rendered pages. Subsequent requests to the same path will serve the generated page, like other pages pre-rendered at build time. It is useful if your app has a very large number of static pages that depend on data (such as a very large e-commerce site). If you want to pre-render all product pages, the builds would take a very long time.
		Blocking: Same as "true" but there is no flash of loading/fallback state.

In the “fallback” version of a page:

 -  The page’s props will be empty.
 -  Using the router, you can detect if the fallback is being rendered, router.isFallback will be true.
	  if (router.isFallback) {
      return <div>Loading...</div>
    }


Instead, you may statically generate a small subset of pages and use fallback: true for the rest. When someone requests a page that is not generated yet, the user will see the page with a loading indicator or skeleton component.


As getStaticProps runs only on the server-side, it will never run on the client-side. It won’t even be included in the JS bundle for the browser, so you can write direct database queries without them being sent to browsers.

When a page with getStaticProps is pre-rendered at build time, in addition to the page HTML file, Next.js generates a JSON file holding the result of running getStaticProps. This means that client-side page transitions will not call getStaticProps as only the exported JSON is used.

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
import Head from 'next/head';
import Layout, { siteTitle } from '../Components/Layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';

export default function Home({ allPostsData }) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>No me digas que hacer pedazo de pebete</p>
				<p>
					(This is a sample website - you’ll be building a site like this on{' '}
					<a href='https://nextjs.org/learn'>our Next.js tutorial</a>.)
				</p>
				<Link href='/posts/first-post'>FIRST POST</Link>
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

export function getStaticProps() {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
}
