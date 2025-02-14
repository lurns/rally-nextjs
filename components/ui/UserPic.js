import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth-context";

const DEFAULT_URL =
  "https://res.cloudinary.com/dgnsgqoi9/image/upload/v1645384204/rally/Rally_default_f15otb.png";

export const UserPic = () => {
  const { auth, user, setUser } = useAuth();
  const [picURL, setPicURL] = useState(DEFAULT_URL);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (user) {
      setPicURL(user.user?.pic_url);
    }
  }, [user]);

  return (
    <div className="mx-auto relative w-1/2 self-center mt-5 aspect-square relative">
      <Image
        alt="profile pic"
        fill={true}
        className="object-cover rounded-full"
        src={picURL || DEFAULT_URL}
      />
    </div>
  );
};

export default UserPic;
