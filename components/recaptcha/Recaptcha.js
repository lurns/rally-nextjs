import { useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const Recaptcha = ({ onVerify, action }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    const handleReCaptchaVerify = async () => {
      if (!executeRecaptcha) {
        console.log("executeRecaptcha not yet available");
        return;
      }

      try {
        const token = await executeRecaptcha(action);
        onVerify(token);
      } catch (err) {
        console.log("Recaptcha error:", err);
      }
    };

    handleReCaptchaVerify();
  }, [executeRecaptcha, onVerify, action]);

  return null;
};

export default Recaptcha;
