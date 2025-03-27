import MenuItem from "./MenuItem";

export default function Menu() {
  return (
    <ul className="flex flex-col gap-2">
      <MenuItem name="등업 조건" />
      <MenuItem name="회원정보 수정" />
    </ul>
  );
}
