type UserMetaProps = {
  review: number;
  like: number;
  loggedIn: number;
};

export default function UserMeta({ review, like, loggedIn }: UserMetaProps) {
  return (
    <article className="py-[1.38rem] px-[2.88rem] flex box-border justify-between bg-neutral-1 border border-white text-sm font-medium rounded-ps cursor-pointer">
      <span className="flex flex-col gap-5 justify-center items-center">
        <p>감상평</p>
        <p>{review}</p>
      </span>
      <span className="flex justify-center items-center text-white bg-white w-0.5">
        |
      </span>
      <span className="flex flex-col gap-5 justify-center items-center">
        <p>좋아요</p>
        <p>{like}</p>
      </span>
      <span className="flex justify-center items-center text-white bg-white w-0.5">
        |
      </span>
      <span className="flex flex-col gap-5 justify-center items-center">
        <p>출석일</p>
        <p>{loggedIn}</p>
      </span>
    </article>
  );
}
