import { withRouter } from 'next/router';
import Home from '../components/home/Home';

export const HomePage = () => {

  return (
    <Home />
  )
}

export default withRouter(HomePage);