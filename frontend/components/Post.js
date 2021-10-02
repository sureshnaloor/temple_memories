import React from 'react';
import styles from './post.module.css';
import Image from 'next/image';
import moment from 'moment';

const Post = ({ post, setCurrentId }) => {
	return (
		<div className={styles.postcontainer}>
			{' '}
			<div
				style={{
					color: '#11a',
					textAlign: 'center',
					fontWeight: 'bold',
					letterSpacing: '2px',
					lineHeight: '3',
				}}
			>
				{post.title}{' '}
				<span
					style={{
						fontSize: '8px',
						background: 'yellow',
						padding: '3px',
						cursor: 'pointer',
					}}
					onClick={() => {
						console.log(`clicked: ${post._id}`);
						setCurrentId(post._id);
					}}
				>
					Edit
				</span>
			</div>
			<div
				style={{
					color: '#111',
					textAlign: 'left',
					fontStyle: 'italic',
					letterSpacing: '-1px',
					lineHeight: '1.5',
					paddingBottom: '2px',
				}}
			>
				{' '}
				{post.message}
			</div>
			<div
				style={{
					color: '#a1f',
					textAlign: 'right',
					fontStyle: 'bold',
					letterSpacing: '2px',
					lineHeight: '2',
					paddingBottom: '1px',
					fontSize: '0.9em',
				}}
			>
				{' '}
				{`Posted By: ${post.creator}`}
			</div>
			{post.selectedFile ? (
				<Image
					src={post.selectedFile}
					alt='image'
					width={200}
					height={100}
					quality={90}
					className={styles.image}
				/>
			) : null}
			<div
				style={{
					color: '#211',
					textAlign: 'right',
					fontStyle: 'bold',
					letterSpacing: '1.2px',
					lineHeight: '0.8',
					paddingTop: '2px',
					paddingBottom: '4px',
					fontSize: '0.75rem',
				}}
			>
				{' '}
				{`Created: ${moment(post.createdAt).startOf('hr').fromNow()}`}
			</div>
			<div
				style={{
					color: '#211',
					textAlign: 'right',
					fontStyle: 'bold',
					letterSpacing: '1.2px',
					lineHeight: '0.8',
					paddingTop: '2px',
					paddingBottom: '4px',
					fontSize: '0.75rem',
				}}
			>
				{' '}
				{`Updated: ${moment(post.updatedAt).startOf('min').fromNow()}`}
			</div>
		</div>
	);
};

export default Post;
