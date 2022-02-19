import Image from 'next/image'

export const UserPic = (props) => {
  console.log(props);
  return (
    <div className="mx-auto relative w-1/2 self-center mt-5 aspect-square">
      <Image alt="profile pic" layout="fill" className="object-cover rounded-full" src="https://i.imgur.com/TK59K6U.jpeg" />
    </div>
  )
}

export default UserPic;