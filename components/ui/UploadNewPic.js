import { useEffect, useState } from "react";
import MessageBanner from "./MessageBanner";
import { useAuth } from "../../store/auth-context";
import { fileTypes } from "../../constants/fileTypes";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../../constants/messageBannerType";

export const UploadNewPic = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { auth, user, setUser } = useAuth();
  var updatedUser = user;

  useEffect(() => {
    if (success) {
      setUser(JSON.parse(localStorage.getItem("rally_storage")));
    }
  }, [success, setUser]);

  const uploadNewPicHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    const file = document.getElementById("uploadNewPic").files[0];
    const unsignedUploadPreset = "wg3a96lr";

    // file validation
    const validationError = validateFileRequest(file);

    if (validationError) {
      setLoading(false);
      setError(validationError);
      return;
    }

    // send pic to cloudinary
    const sendToCloudinary = async () => {
      const cloudinaryUploadUrl =
        "https://api.cloudinary.com/v1_1/dgnsgqoi9/image/upload";

      const fileData = new FormData();
      fileData.append("file", file);
      fileData.append("upload_preset", unsignedUploadPreset);

      const cloudinaryResponse = await fetch(cloudinaryUploadUrl, {
        method: "POST",
        body: fileData,
      });

			// check response from cloudinary
      const cloudinaryData = await cloudinaryResponse.json();

      if (!cloudinaryData?.secure_url) {
        console.log("upload error: ", e);
        setLoading(false);
        setError("Unable to upload photo.");
				return;
      }

      // save url to user in db
      const picSaved = await sendToDb({ pic_url: cloudinaryData.secure_url });

      if (!picSaved.error) {
        // update state
        updatedUser = {
          _id: user._id,
          user: {
            nickname: user.user.nickname,
            email: user.user.email,
            password: "",
            pic_url: cloudinaryData.secure_url,
          },
        };

        localStorage.setItem("rally_storage", JSON.stringify(updatedUser));
        setUser(JSON.parse(localStorage.getItem("rally_storage")));

        // clear fields, give success msg
        setLoading(false);
        document.getElementById("uploadNewPic").value = "";
        setSuccess(true);
      } else {
        setLoading(false);
        setError(picSaved.error);
      }
    }

    const sendToDb = async (picData) => {
      const response = await fetch("/api/new-pic", {
        method: "POST",
        body: JSON.stringify(picData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return await response.json();
    };

    await sendToCloudinary();
  };

  return (
    <div className="align-content-center bg-slate-100 rounded-2xl mt-3 mb-3 mr-5 p-3">
      {!loading && error ? <MessageBanner type={ERROR_MESSAGE} message={error} /> : ""}
      {!loading && success ? <MessageBanner type={SUCCESS_MESSAGE} message="Photo updated." /> : ""}
      <form
        id="uploadNewPicForm"
        className="mt-5"
        onSubmit={uploadNewPicHandler}
        encType="multipart/form-data"
      >
        <div className="flex flex-col mb-3">
          <input
            type="file"
            className="
					block w-full text-sm text-slate-500 
					file:mr-4 file:py-2 file:px-4
					file:rounded-full file:border-0
					file:text-sm file:font-semibold
					file:bg-orange-50 file:text-orange-700 file:delay-150
					hover:file:bg-orange-100 hover:file:cursor-pointer file:transition file:ease-in-out"
            id="uploadNewPic"
            name="uploadNewPic"
            accept="image/*"
          />
        </div>
        <div className="flex flex-col mb-3">
          <button
            id="submitNewPicButton"
            type="submit"
            className="
						mx-auto
						text-sm
						w-1/2 
						mt-2 
						p-2 
						bg-orange-900 
						transition 
						ease-in-out 
						delay-150 
						hover:bg-orange-500 
						font-bold 
						text-white 
						rounded-2xl 
						shadow-lg
						disabled:bg-slate-400
						hover:cursor-pointer
					"
            disabled={loading ? true : false}
          >
            Change Profile Picture
          </button>
        </div>
      </form>
    </div>
  );
};

const validateFileRequest = (file) => {
  if (!file) return "No photo selected.";

  if (!fileTypes.includes(file.type)) return "Invalid file type selected.";

  return null;
};

export default UploadNewPic;
