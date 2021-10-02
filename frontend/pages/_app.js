import '../styles/globals.css';
import { Provider } from 'next-auth/client';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../redux-store/store';
import { createWrapper } from 'next-redux-wrapper';

function MyApp({ Component, pageProps }) {
	return (
		<ReduxProvider store={store}>
			<Provider session={pageProps.session}>
				<Component {...pageProps} />
			</Provider>
		</ReduxProvider>
	);
}

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);	
