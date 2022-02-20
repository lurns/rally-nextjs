import Image from 'next/image'

export const UserPic = (props) => {
  console.log(props);
  return (
    <div className="mx-auto relative w-1/2 self-center mt-5 aspect-square">
      <Image alt="profile pic" layout="fill" className="object-cover rounded-full" src={props?.pic_url? props.pic_url : 'https://res.cloudinary.com/dgnsgqoi9/image/upload/v1645384204/rally/Rally_default_f15otb.png'} />
    </div>
  )
}

export default UserPic;