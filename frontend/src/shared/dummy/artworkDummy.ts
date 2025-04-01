import { BaseArtwork } from "@/shared/types/artwork";
import { ArtworkDetailData } from "@/shared/types/artwork";

// 작품 기본 정보용 더미
export const baseArtworkDummy: BaseArtwork[] = [
  {
    artworkId: "a1",
    title: "파라솔을 든 여인 - 모네부인과 그녀의 아들",
    artist: "클로드 모네",
    year: "1875",
    location: "내셔널 갤러리 오브 아트",
    artworkImageUrl:
      "https://cdn.safetimes.co.kr/news/photo/202106/96480_77112_1213.jpg",
    description:
      "모네의 가볍고 자연스러운 붓놀림이 다채로운 색감을 만들어낸 작품으로, 모네 부인의 베일과 하얀 드레스가 바람에 흩날리는 모습을 그리고 있다. 초원의 풀이 물결치면서 파라솔 아랫면을 초록빛으로 물들고 있다. 푹신한 흰 구름이 떠 있는 푸른 하늘을 배경으로 삼고 있으며, 모네 부인에게 상향 원근감을 부여하여 아래에서 바라본 것처럼 연출되었다. 모네의 일곱 살짜리 아들 장(Jean)은 부인보다 더 먼 곳에 배치되었으며, 솟아오른 지면에 가려진 채 허리 위로만 보이도록 하여 깊이감을 만들어낸다. 전체적으로 생생한 색감을 가득 담은 활기찬 붓질로 한 순간을 간결하게 묘사하고 있는 작품이다. 이 작품은 일반적인 초상화가 아닌 일상적인 가족 풍경을 풍속화처럼 그려낸 작품이다. 또 스튜디오에서 작업한 것이 아니라 야외작업으로 몇 시간 이내에 재빠르게 그린 것이다. 그림의 크기는 100cm x 81cm으로, 1870년대에 작업한 그림 가운데서는 가장 큰 작품이다. 오른쪽 하단에는 'Claude Monet 75'라는 서명이 적혀 있다.",
  },
  {
    artworkId: "a2",
    title: "사과밭",
    artist: "조셉 H. 그린우드",
    year: "1903",
    location: "우스터미술관",
    artworkImageUrl:
      "https://i.ytimg.com/vi/3yVy1LBkR8M/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AHoB4AC0AWKAgwIABABGDYgZSgtMA8=&rs=AOn4CLCRF7jFg6EicGiT3EuypbKakVpxUA",
    description:
      "뉴잉글랜드 봄의 생동감을 담다1903년에 완성된 조셉 H. 그린우드의 작품 *'사과 과수원'*은 뉴잉글랜드의 아름다운 자연을 생생하게 담아낸 풍경화입니다.",
  },
];

// 작품 상세 정보용 더미
export const artworkDetailDummy: ArtworkDetailData[] = [
  {
    artworkId: "a1",
    title: "파라솔을 든 여인",
    artist: "클로드 모네",
    artworkImageUrl:
      "https://cdn.safetimes.co.kr/news/photo/202106/96480_77112_1213.jpg",
    year: "1875",
    location: "오르세 미술관",
    description:
      "모네가 아내와 아들을 여름 햇살 아래 그려낸 인상파 대표작입니다.",
    likeCount: 223,
    isLiked: true,
    isBookmarked: false,
    hasWrittenComment: true,
  },
  {
    artworkId: "a2",
    title: "사과밭",
    artist: "Camille Pissarro",
    artworkImageUrl:
      "https://i.ytimg.com/vi/3yVy1LBkR8M/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AHoB4AC0AWKAgwIABABGDYgZSgtMA8=&rs=AOn4CLCRF7jFg6EicGiT3EuypbKakVpxUA",
    year: "1872",
    location: "우스터 미술관",
    description:
      "피사로의 농촌 풍경을 담은 작품으로, 부드러운 붓터치와 색채가 인상적입니다.",
    likeCount: 145,
    isLiked: false,
    isBookmarked: true,
    hasWrittenComment: false,
  },
];
