export const Modal = (props) => {
  return (
      <div className="relative">
        <div className="absolute lg:left-1/4 sm:w-full lg:w-lg pt-5 pb-5 bg-white rounded-2xl p-3 filter drop-shadow-lg">
          <div>{props.children}</div>
        </div>
      </div>
  )
}

export default Modal;