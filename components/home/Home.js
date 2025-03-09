import LoginForm from "../../components/login/LoginForm";
import Image from "next/image";

const Home = () => {
  return (
    <div className="flex md:h-screen bg-purple-200 pb-5 pt-5">
      <div className="md:flex sm:flex-wrap-reverse mx-auto bg-slate-600 self-center p-10 rounded-2xl shadow-lg">
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

export default Home;
