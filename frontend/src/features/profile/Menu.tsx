import { useNavigate } from "react-router";
import MenuItem from "./MenuItem";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <ul className="flex flex-col gap-2">
      <MenuItem name="등업 조건" onClick={() => navigate("level")} />
      <MenuItem name="회원정보 수정" onClick={() => navigate("confirm")} />
    </ul>
  );
}
