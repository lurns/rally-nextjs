import { withRouter } from 'next/router';
import LoginForm from "../../components/login/LoginForm";
import Image from "next/image";

const Home = () => {
  return (
    <div className="min-h-screen bg-purple-200 pt-20 md:pb-8">
      <div className="md:flex w-fit mx-auto bg-slate-600 p-6 md:p-10 rounded-2xl shadow-lg">
        <div className="flex-1">
          <Image
            alt="Motivate yourself!"
            width="500"
            height="500"
            src="https://res.cloudinary.com/dgnsgqoi9/image/upload/v1646167222/rally/Rally_copy_rx4xhm.png"
          />
        </div>
        <div className="flex-1">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Home);
