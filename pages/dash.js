import { useRouter } from 'next/router';
import { useEffect, useCallback, useState } from 'react';
import DashHome from '../components/dashboard/DashHome';

export const Dashboard = () => {
	const router = useRouter();
	const [count, setCount] = useState(0);

	// refresh to get data without adding to browser history
	useEffect(() => {
		if (count < 3) {
			setCount(count => count+1);
			router.replace(router.asPath);
		}
	}, [router, count])

	return (
		<DashHome />
	)
}

export default Dashboard;