import { providers, signIn, getSession, csrfToken } from 'next-auth/client';

import styles from './signin.module.css';

function signin({ providers }) {
	return (
		<div className={styles.container}>
			<h4 className={styles.header}> Welcome to "Temple Memories" </h4>

			{Object.values(providers).map((provider) => {
				return (
					<div key={provider.name}>
						<button
							className={styles.button}
							onClick={() => signIn(provider.id)}
						>
							Sign in with {provider.name}
						</button>
					</div>
				);
			})}
		</div>
	);
}

export async function getServerSideProps(context) {
	const { req } = context;
	const session = await getSession({ req });

	if (session) {
		return {
			redirect: { destination: '/posts' },
		};
	}
	return {
		props: {
			providers: await providers(context),
			csrfToken: await csrfToken(context),
		},
	};
}

export default signin;
