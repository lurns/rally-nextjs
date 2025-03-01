import { useState } from "react";
import "material-icons/iconfont/material-icons.css";

export const SuccessMessage = (props) => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      {visible && (
        <div className="mx-auto bg-green-500 self-center mt-5 ml-2 mr-2 p-5 rounded-2xl shadow-lg">
          <div className="flex justify-between">
            <h4 className="text-left font-black text-2xl text-white mb-2">
                Very nice!
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
  )
}

export default SuccessMessage;