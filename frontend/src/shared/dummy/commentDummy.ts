import { BaseComment } from "@/shared/types/comment";

export const commentDummy: BaseComment[] = [
  {
    commentId: "1",
    artworkId: "a1",

    user: {
      userId: "u1",
      profileImageUrl:
        "https://tenniseye.com/files/attach/images/666170/629/669/7a0735da7c0bdb2fd20881cbd8f823be.jpg",
      nickname: "로저 페더러",
    },
    date: "2024.03.25",
    content:
      "이 그림을 처음 봤을 때 느껴지는 건 강렬한 햇살과 산들바람의 기운이었다. 모네의 아내가 파라솔을 들고 조용히 서 있는 모습은 마치 바람과 대화를 나누는 듯했고, 그녀 뒤에 작게 보이는 아이는 마치 자연의 일부처럼 풍경에 스며든다. 인물 중심이 아니라 빛과 공기가 주인공이 된 듯한 느낌이 새로웠다. 인물의 표정조차 자세히 알 수 없지만, 오히려 그 덕에 내 감정을 더 자유롭게 투영할 수 있었다. 순간을 포착한 붓질과 색감이 너무 생생해서, 마치 그 여름날 그곳에 있었던 기분마저 들었다. 그림이 주는 따뜻함과 고요함이 오랫동안 마음에 남는다.",
    likeCount: 4,
    isLiked: true,
    visibility: "public",
  },
  {
    commentId: "2",
    artworkId: "a1",
    user: {
      userId: "u2",
      profileImageUrl:
        "https://www.chungnamilbo.com/news/thumbnail/200812/pp_73474_1_v150.jpg",
      nickname: "라파엘 나달",
    },
    date: "2024.03.24",
    content:
      "《파라솔을 든 여인》은 단순한 가족 초상이 아니라, 자연 속에서 인간이 얼마나 조화롭게 존재할 수 있는지를 보여주는 그림이라고 생각한다. 햇빛이 인물과 풍경 위로 부드럽게 드리우고, 하늘과 풀밭이 같은 호흡으로 살아 움직이는 듯하다. 이 그림을 보고 있으면 말없이 서 있는 아내의 모습에서 위로를 받고, 멀찍이 서 있는 아들의 모습에서 보호받고 있다는 안도감을 느끼게 된다. 순간의 인상을 이렇게 섬세하게 담아낸다는 건 참 대단한 일인 것 같다. 모네의 가족을 바라보는 시선, 자연을 바라보는 시선 모두가 따뜻하고 섬세하다. 그림을 보는 것만으로도 마음이 차분해지고 편안해졌다.",
    likeCount: 58,
    isLiked: false,
    visibility: "public",
  },
  {
    commentId: "3",
    artworkId: "a1",
    user: {
      userId: "u3",
      profileImageUrl:
        "https://pimg.mk.co.kr/meet/neds/2016/02/image_readtop_2016_125099_14556012392360019.jpg",
      nickname: "테일러 스위프트",
    },
    date: "2024.03.24",
    content:
      "바람과 햇살, 자연 속의 따뜻한 가족. 모네의 붓질이 순간의 공기를 머금고 있어, 마치 그 안에 있는 듯한 느낌이다.",
    likeCount: 77,
    isLiked: true,
    visibility: "public",
  },
  {
    commentId: "4",
    artworkId: "a2",
    user: {
      userId: "u4",
      profileImageUrl: "https://example.com/images/user4.jpg",
      nickname: "빈센트 반 고흐",
    },
    date: "2024.04.01",
    content:
      "이 작품의 사과나무는 자연의 생명력을 그대로 담아내고 있어. 붓터치 하나하나에서 나무의 활기가 느껴져서 마치 그곳에 서 있는 듯한 기분이 들어.",
    likeCount: 85,
    isLiked: true,
    visibility: "public",
  },
  {
    commentId: "5",
    artworkId: "a2",
    user: {
      userId: "u5",
      profileImageUrl: "https://example.com/images/user5.jpg",
      nickname: "클로드 모네",
    },
    date: "2024.04.02",
    content:
      "빛과 그림자의 조화가 인상적이야. 특히 사과나무 사이로 스며드는 햇살이 따뜻함을 더해줘서 마음이 편안해지는 작품이야.",
    likeCount: 73,
    isLiked: false,
    visibility: "public",
  },
  {
    commentId: "6",
    artworkId: "a2",
    user: {
      userId: "u6",
      profileImageUrl: "https://example.com/images/user6.jpg",
      nickname: "조르주 쇠라",
    },
    date: "2024.04.03",
    content:
      "점묘법과는 다른 접근이지만, 색채의 사용이 매우 독특해. 사과나무의 잎사귀 하나하나에 다양한 색이 묻어나는 것이 흥미로워.",
    likeCount: 64,
    isLiked: false,
    visibility: "public",
  },
  {
    commentId: "7",
    artworkId: "a2",
    user: {
      userId: "u7",
      profileImageUrl: "https://example.com/images/user7.jpg",
      nickname: "폴 세잔",
    },
    date: "2024.04.04",
    content:
      "사과나무의 형태와 구조를 단순화하면서도 본질을 잘 표현했어. 자연의 복잡함 속에서 질서를 찾아내는 능력이 돋보이는 작품이야.",
    likeCount: 90,
    isLiked: true,
    visibility: "public",
  },
];
