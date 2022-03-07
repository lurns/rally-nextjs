import App from 'next/app';
import { AuthProvider, getUser } from '../store/auth-context';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';
import { WorkoutProvider } from '../store/workout-context';

function MyApp({ Component, pageProps, auth }) {
	return (
		<AuthProvider myAuth={auth}>
			<WorkoutProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</WorkoutProvider>
		</AuthProvider>
	)
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
	const auth = await getUser();

  return { ...appProps, auth: auth }
}

export default MyApp
