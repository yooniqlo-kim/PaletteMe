import { useState } from "react";
import Button from "../Buttons/Button";
import Chip from "../buttons/Chip";

const KEYWORD_DATA = {
  형태: [
    "점",
    "선",
    "면",
    "입체감",
    "구성",
    "질감",
    "비율",
    "균형",
    "대칭",
    "비대칭",
    "반복",
    "리듬",
    "크기",
    "여백",
    "밀도",
    "흐름",
    "움직임",
    "조화",
    "명암",
    "강조",
    "패턴",
    "윤곽",
    "구도",
    "각도",
    "경계",
    "방향",
    "공간",
    "투시",
    "경사",
    "배치",
  ],
  색채: [
    "따뜻한 색",
    "차가운 색",
    "보색",
    "유사색",
    "채도",
    "명도",
    "무채색",
    "원색",
    "파스텔톤",
    "원색 대비",
    "중간색",
    "단색",
    "색조",
    "선명함",
    "흐림",
    "대비",
    "조화",
    "색의 변화",
    "색의 흐름",
    "강한 색",
    "은은한 색",
    "음영",
    "배색",
    "색의 상징",
    "색의 감정",
    "밝기",
    "어두움",
    "그라데이션",
    "컬러풀",
    "단조로움",
  ],
  감정: [
    "편안함",
    "불안",
    "설렘",
    "외로움",
    "슬픔",
    "희망",
    "두려움",
    "따뜻함",
    "냉정함",
    "혼란",
    "기쁨",
    "우울",
    "고요함",
    "격렬함",
    "긴장감",
    "평온함",
    "흥미로움",
    "분노",
    "공허함",
    "쓸쓸함",
    "가벼움",
    "무거움",
    "차분함",
    "감동",
    "경쾌함",
    "상쾌함",
    "의문",
    "위로",
    "설명할 수 없음",
    "감정의 충돌",
  ],
  연상: [
    "어린 시절",
    "꿈",
    "거울",
    "바다",
    "구름",
    "창문",
    "숲",
    "길",
    "산책",
    "여행",
    "고향",
    "빛",
    "어둠",
    "물",
    "추억",
    "비",
    "정원",
    "놀이",
    "가족",
    "시간",
    "밤하늘",
    "노을",
    "눈",
    "침묵",
    "소리",
    "계절",
    "냄새",
    "기억",
    "기차",
    "바람",
  ],
  스토리: [
    "만남",
    "이별",
    "기다림",
    "사건",
    "비밀",
    "추격",
    "방황",
    "여정",
    "고백",
    "침묵",
    "도망",
    "모험",
    "재회",
    "관찰",
    "계획",
    "실패",
    "성장",
    "변화",
    "추적",
    "희생",
    "결심",
    "망설임",
    "단서",
    "위기",
    "선택",
    "흐름",
    "기회",
    "도전",
    "긴장",
    "전환점",
  ],
  시간: [
    "아침",
    "저녁",
    "밤",
    "새벽",
    "계절",
    "봄",
    "여름",
    "가을",
    "겨울",
    "노을",
    "해질 무렵",
    "햇살",
    "그림자",
    "시간의 흐름",
    "순간",
    "반복",
    "멈춤",
    "변화",
    "기다림",
    "시간의 단절",
    "오래된",
    "최근의",
    "미래",
    "과거",
    "기억의 시간",
    "속도",
    "느림",
    "빠름",
    "정지",
    "되감기",
  ],
  상징: [
    "새",
    "창문",
    "거울",
    "빛",
    "어둠",
    "사과",
    "꽃",
    "가면",
    "열쇠",
    "문",
    "강",
    "물고기",
    "불",
    "연기",
    "해",
    "달",
    "그림자",
    "손",
    "눈",
    "구름",
    "십자가",
    "사다리",
    "동물",
    "아이",
    "해골",
    "천사",
    "나무",
    "피",
    "별",
    "눈물",
  ],
};

const THEMES = Object.keys(KEYWORD_DATA);

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function KeywordSuggester() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (loading) return;

    setLoading(true);
    setTimeout(() => {
      const randomTheme = getRandomElements(THEMES, 1)[0];
      const newKeywords = getRandomElements(
        KEYWORD_DATA[randomTheme as keyof typeof KEYWORD_DATA],
        5
      );
      setKeywords(newKeywords);
      setLoading(false);
    }, 300);
  };

  return (
    <div className="mt-3">
      <hr className="border-t border-neutral-300 mb-3" />
      <div className="space-y-1">
        <Button size="S" onClick={handleClick} className="text-xs font-medium">
          {loading ? "추천 중..." : "키워드 추천"}
        </Button>

        <div className="flex flex-wrap gap-2 mt-2 min-h-[2rem]">
          {keywords.length === 0 ? (
            <div className="flex items-center min-h-[2rem]">
              <p className="text-xs text-neutral-600 font-medium">
                Tip. 감상문 쓰기 막막하다면 키워드 추천을 받아보세요!
              </p>
            </div>
          ) : (
            keywords.map((keyword) => (
              <Chip
                key={keyword}
                text={keyword}
                className="px-3 py-1 rounded-4xl border-neutral-300 text-xs pointer-events-none"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
