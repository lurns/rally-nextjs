export const SuccessMessage = (props) => {
  return (
    <div className="mx-auto bg-green-500 self-center mt-5 ml-2 mr-2 p-5 rounded-2xl shadow-lg">
      <h4 className="text-left font-black text-2xl text-white mb-2">
          Very nice!
      </h4>
      <p className="text-white">{props.message}</p>
    </div>
  )
}

export default SuccessMessage;