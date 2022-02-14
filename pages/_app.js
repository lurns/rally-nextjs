import App from 'next/app';
import { AuthProvider, getUser } from '../store/auth-context';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps, auth }) {
	return (
		<AuthProvider myAuth={auth}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AuthProvider>
	)
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
	const auth = await getUser(appContext.ctx)
  return { ...appProps, auth: auth }
}

export default MyApp
