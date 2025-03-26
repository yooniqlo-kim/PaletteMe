import defaultImg from "../../../assets/images/MainLogo.png";

export default function UserImage({ userImg = defaultImg }) {
  return (
    <div className="w-[132px] h-[132px] cursor-pointer">
      <img
        src={userImg}
        alt=""
        className="rounded-[50%] bg-neutral-2 w-full h-full object-cover"
      />
    </div>
  );
}
