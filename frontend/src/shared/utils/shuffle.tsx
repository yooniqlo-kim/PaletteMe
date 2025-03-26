// 마이뮤지엄 - 내 컬렉션, 내 감상문 썸네일 이미지 랜덤으로 보여주기 위한 함수ㄴ
export default function shuffle<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
  }
