import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/client';

const test = () => {
	const session = useSession();
	return (
		<div>
			{!session && (
				<>
					<h4>Not signed in </h4>

					<button onClick={() => signIn()}>Sign in</button>
				</>
			)}
			{session && (
				<>
					Signed in <br />
					<button onClick={() => signOut()}>Sign out</button>
				</>
			)}
		</div>
	);
};

export default test;
