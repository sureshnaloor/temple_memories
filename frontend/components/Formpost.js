import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import styles from './formpost.module.css';
import postServices from '../services/posts';

import Filebase from 'react-file-base64';

const Formpost = ({
	formValue,
	setFormValue,
	currentId,
	setCurrentId,
	posts,
}) => {
	useEffect(() => {
		retrievePost();
	}, [currentId]);

	const retrievePost = async () => {
		const post = currentId
			? await posts.find((p) => p._id === currentId)
			: null;
		// await setPost(post1);
		// console.log(post1);
		const isAddMode = !currentId;

		if (!isAddMode) {
			setFormValue({
				title: post.title,
				message: post.message,
				creator: post.creator,
				tags: post.tags,
			});
		}

		if (currentId) {
			console.log('edit mode');
		} else {
			console.log('create mode');
		}
	};

	const formik = useFormik({
		initialValues: formValue,
		validate: (values) => {
			let errors = {};
			if (!values.title) {
				errors.title = 'required';
			} else if (values.title.length < 9) {
				errors.title = 'length should be min 9 char';
			}
			if (!values.message) {
				errors.message = 'required';
			} else if (values.message.length < 20) {
				errors.message = 'length should be min 20 char';
			}

			if (!values.creator) {
				errors.creator = 'required';
			} else if (values.creator < 9) {
				errors.creator = 'length should be min 9 char';
			}
			// console.log(errors);
			return errors;
		},
		onSubmit: async (values) => {
			console.log(values);
			await setFormValue({ ...values });
			if (currentId) {
				await postServices.editPost(currentId, values);
				setCurrentId(null);
				setFormValue({
					title: '',
					message: '',
					creator: '',
					tags: '',
					selectedFile: '',
				});
			} else {
				await postServices.createPost(values);
				setFormValue({
					title: '',
					message: '',
					creator: '',
					tags: '',
					selectedFile: '',
				});
			}
			formik.resetForm({});
		},
		enableReinitialize: true,
	});

	// console.log(formik.errors);

	return (
		<>
			<form className={styles.form} onSubmit={formik.handleSubmit}>
				<div className={styles.formControl}>
					<label className={styles.label1} htmlFor='title'>
						title
					</label>
					<input
						className={styles.input1}
						type='text'
						name='title'
						id='title'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.title}
					/>
					{formik.touched.title && formik.errors.title ? (
						<div className={styles.error}> {formik.errors.title} </div>
					) : null}
				</div>
				<div className={styles.formControl}>
					<label className={styles.label2} htmlFor='message'>
						message
					</label>
					<input
						className={styles.input2}
						type='textarea'
						name='message'
						id='message'
						value={formik.values.message}
						onChange={formik.handleChange}
					/>
					{formik.errors.message ? (
						<div className={styles.error}> {formik.errors.message} </div>
					) : null}
				</div>
				<div className={styles.formControl}>
					<label className={styles.label3} htmlFor='creator'>
						creator
					</label>
					<input
						className={styles.input3}
						type='text'
						name='creator'
						id='creator'
						value={formik.values.creator}
						onChange={formik.handleChange}
					/>
					{formik.errors.creator ? (
						<div className={styles.error}> {formik.errors.creator} </div>
					) : null}
				</div>
				<div className={styles.formControl}>
					<label className={styles.label4} htmlFor='tags'>
						tags
					</label>
					<input
						className={styles.input4}
						type='text'
						name='tags'
						id='tags'
						value={formik.values.tags}
						onChange={formik.handleChange}
					/>
				</div>
				<div></div>
				<Filebase
					type='file'
					multiple={false}
					onDone={(file) => {
						formik.values.selectedFile = file.base64;
					}}
				/>
				<br /> <hr />
				<div></div>
				<button
					className={styles.submitBtn}
					type='submit'
					onClick={formik.handleSubmit}
				>
					{' '}
					Submit{' '}
				</button>
			</form>
		</>
	);
};

export default Formpost;
