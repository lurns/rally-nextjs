import { useAuth } from "../../store/auth-context";

const Status = () => {
  const { auth } = useAuth();

  return (
    <div>
			<h3 className="font-black text-4xl text-yellow-500 bg-yellow-900 w-fit p-2">
				Hey, { auth?.user?.user.nickname }!
			</h3>
      <p>block to show status</p>
    </div>
  )
}

export default Status;