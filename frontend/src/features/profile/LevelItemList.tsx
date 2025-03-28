import { COLOR } from "@/shared/utils/color";
import LevelItem from "./LevelItem";

const LEVEL = [
  {
    level: COLOR[0].color,
    review: "0개 이상",
    like: "0개 이상",
    loggedIn: "1일",
  },
  {
    level: COLOR[1].color,
    review: "1개 이상",
    like: "1개 이상",
    loggedIn: "1일",
  },
  {
    level: COLOR[2].color,
    review: "5개 이상",
    like: "10개 이상",
    loggedIn: "2일",
  },
  {
    level: COLOR[3].color,
    review: "10개 이상",
    like: "20개 이상",
    loggedIn: "7일",
  },
  {
    level: COLOR[4].color,
    review: "30개 이상",
    like: "50개 이상",
    loggedIn: "14일",
  },
  {
    level: COLOR[5].color,
    review: "70개 이상",
    like: "100개 이상",
    loggedIn: "14일",
  },
  {
    level: COLOR[6].color,
    review: "150개 이상",
    like: "200개 이상",
    loggedIn: "30일",
  },
  {
    level: COLOR[8].color,
    review: "300개 이상",
    like: "500개 이상",
    loggedIn: "90일",
  },
];

export default function LevelItemList() {
  return (
    <div className="bg-neutral-3 py-4 px-4 font-medium text-neutral-7">
      <ul className="flex flex-col gap-2">
        <li className="flex justify-between px-4">
          <p>등급</p>
          <p>감상평 수</p>
          <p>좋아요 수</p>
          <p>출석일수</p>
        </li>
        {LEVEL.map((item) => (
          <LevelItem
            level={item.level}
            review={item.review}
            like={item.like}
            loggedIn={item.loggedIn}
          />
        ))}
      </ul>
    </div>
  );
}
