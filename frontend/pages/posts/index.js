import React, { useState, useEffect } from 'react';
import styles from './posts.module.css';
import Image from 'next/image';

import { signIn, signOut, useSession } from 'next-auth/client';

// import postServices from '../../services/posts';

import Formpost from '../../components/Formpost';
import Post from '../../components/Post';

// redux testing below commented whatever in this file
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux-store/actions/postAction';

const index = () => {
	// const [posts, setPosts] = useState([]);

	const [session, loading] = useSession();

	const dispatch = useDispatch();
	const { posts } = useSelector((state) => state.post);

	const [formValue, setFormValue] = useState({
		title: '',
		message: '',
		creator: '',
		tags: '',
		selectedFile: '',
	});

	const [currentId, setCurrentId] = useState(null);

	// useEffect(() => {
	// 	retrievePosts();
	// }, [formValue]);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [formValue]);

	// const retrievePosts = async () => {
	// 	const response = await postServices.getAll();
	// 	await setPosts(response.data);
	// 	console.log(response.data);
	// };

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={styles.logo}>
					<Image
						src='/images/vercel.svg'
						alt='logo-img'
						width={100}
						height={60}
					></Image>
				</div>
				<h1> Memories </h1>
				<nav className={styles.nav}>
					<>
						{!session && (
							<>
								<h4>Not signed in </h4>

								<button onClick={() => signIn()}>Sign in</button>
							</>
						)}
						{session && (
							<>
								Signed in as {session.user.name} <br />
								<button onClick={() => signOut()}>Sign out</button>
							</>
						)}
					</>
				</nav>
			</header>
			<section>
				<div className={styles.section}>
					<h3>
						{' '}
						Welcome to Temple Memories where you can post your amazing visits
						for memories eternal!
					</h3>
					{/* {posts1 && posts1.map((item) => <p key={item}> {item} </p>)} */}
					<div className={styles.posts}>
						{!posts
							? 'No posts to display'
							: posts.map((post) => (
									<Post
										post={post}
										setCurrentId={setCurrentId}
										key={post._id}
									/>
							  ))}
					</div>
					<div className={styles.formpost}>
						<Formpost
							formValue={formValue}
							setFormValue={setFormValue}
							currentId={currentId}
							setCurrentId={setCurrentId}
							posts={posts}
						/>
					</div>
				</div>
			</section>
			<footer>
				<div className={styles.footer}> This is footer component</div>
			</footer>
		</div>
	);
};

export default index;
