import { useState, useEffect } from "react";
import "material-icons/iconfont/material-icons.css";
import { ERROR_MESSAGE, INFO_MESSAGE, SUCCESS_MESSAGE } from "../../constants/messageBannerType";

export const MessageBanner = (props) => {
  const [visible, setVisible] = useState(true);
  let bgColor;
  let heading;

  switch (props.type) {
    case ERROR_MESSAGE:
      bgColor = 'bg-red-500';
      heading = 'Uh-oh!';
      break;
    case SUCCESS_MESSAGE:
      bgColor = 'bg-green-500';
      heading = 'Very nice!';
      break;
    case INFO_MESSAGE:
    default:
      bgColor = 'bg-blue-500';
      heading = 'Heads up!';
  }

  useEffect(() => setVisible(true), [props]);

  return (
    <>
      {visible && (
        <div className={`mx-auto ${bgColor} self-center mt-5 ml-2 mr-2 p-5 rounded-2xl shadow-lg`}>
          <div className="flex justify-between">
            <h4 className="text-left font-black text-2xl text-white mb-2">
              {heading}
            </h4>
            <h4
              className="text-right text-2xl text-white/60 mb-2 hover:cursor-pointer"
              onClick={() => setVisible(false)}
            >
              <span className="material-icons">close</span>
            </h4>
          </div>
          <p className="text-white">{props.message}</p>
        </div>
      )}
    </>
  );
}

export default MessageBanner;