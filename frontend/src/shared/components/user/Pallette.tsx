const color = {
  빨강: "#FF0000",
  주황: "#FF8C00",
  노랑: "#FFFF00",
  초록: "#008000",
  파랑: "#0000FF",
  남색: "#4B0082",
  보라: "#8E1C8E",
};

type PalletteProps = {
  level: keyof typeof color; // level의 타입을 color 객체의 key 중 하나로 제한
};

export default function Pallette({ level }: PalletteProps) {
  return (
    <article className="h-60 flex flex-col bg-neutral-1 rounded-ps px-[6.25rem] py-[1.75rem]">
      <p className="font-semibold text-sm flex justify-center gap-2 items-center">
        현재 등급은
        <strong style={{ color: color[level] }}> {level}</strong>
        입니다.
      </p>
    </article>
  );
}
