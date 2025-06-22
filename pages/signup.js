import Signup from "../components/signup/Signup";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const SignupPage = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <Signup />
    </GoogleReCaptchaProvider>
  );
};

export default SignupPage;
