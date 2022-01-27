import Link from "next/link";
import Head from "next/head";
import Script from "next/script";
import Layout from "../../Components/Layout";
import cn from "classnames";
import { useState } from "react";
import styles from "./first-post.module.css";

export default function FirstPost() {
	const [toggleDisable, setToggleDisable] = useState(false);

	return (
		<Layout>
			<Head>
				{/*https://nextjs.org/docs/api-reference/next/head
        https://nextjs.org/docs/advanced-features/custom-document
        */}
				<title>First Post</title>
			</Head>
			{/*
        strategy controls when the third-party script should load. A value of lazyOnload tells Next.js to load this particular script lazily during browser idle time onLoad is used to run any JavaScript code immediately after the script has finished loading.
      */}
			<Script
				src="https://connect.facebook.net/en_US/sdk.js"
				strategy="lazyOnload"
				onLoad={() => console.log(`script loaded correctly, window.FB has been populated`)}
			/>
			<h1>First Post</h1>
			<h2>
				<Link href="/">
					<a>Back to home</a>
				</Link>
			</h2>
			<span
				className={cn({
					[styles.success]: toggleDisable === true,
					[styles.error]: toggleDisable === false,
				})}
			>
				Esto puede cambiar de color
			</span>
			<button onClick={() => setToggleDisable(!toggleDisable)}>Tuvieja</button>
		</Layout>
	);
}
