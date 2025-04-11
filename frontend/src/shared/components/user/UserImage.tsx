import defaultImg from "@/assets/images/defaultProfile.png";

export default function UserImage({ userImg = defaultImg }) {
  return (
    <div className="w-[128px] h-[128px] cursor-pointer">
      <img
        src={userImg}
        alt="profile"
        className="rounded-[50%] bg-neutral-2 w-full h-full object-cover"
      />
    </div>
  );
}
