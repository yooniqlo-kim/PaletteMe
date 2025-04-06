import level1 from "@/assets/levels/level-icon-1.svg";
import level2 from "@/assets/levels/level-icon-2.svg";
import level3 from "@/assets/levels/level-icon-3.svg";
import level4 from "@/assets/levels/level-icon-4.svg";
import level5 from "@/assets/levels/level-icon-5.svg";
import LevelItem from "./LevelItem";

const LEVEL = [
  {
    level: level1,
    review: "0개 이상",
    like: "0개 이상",
    loggedIn: "1일",
  },
  {
    level: level2,
    review: "3개 이상",
    like: "10개 이상",
    loggedIn: "1일",
  },
  {
    level: level3,
    review: "10개 이상",
    like: "20개 이상",
    loggedIn: "5일",
  },
  {
    level: level4,
    review: "30개 이상",
    like: "50개 이상",
    loggedIn: "14일",
  },
  {
    level: level5,
    review: "100개 이상",
    like: "200개 이상",
    loggedIn: "30일",
  },
];

export default function LevelItemList() {
  return (
    <div className="bg-neutral-3 py-4 px-4 font-medium text-neutral-7">
      <table className="flex flex-col gap-4">
        <thead className="flex justify-between w-full">
          <tr className="w-full flex justify-between items-center text-xs px-6">
            <td>등급</td>
            <td>감상평 수</td>
            <td>좋아요 수</td>
            <td>출석일수</td>
          </tr>
        </thead>
        <tbody className="flex flex-col gap-4">
          {LEVEL.map((item) => (
            <LevelItem
              level={item.level}
              review={item.review}
              like={item.like}
              loggedIn={item.loggedIn}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
