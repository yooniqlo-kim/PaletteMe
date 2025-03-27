import { useState } from "react";
import { SearchBar } from "@/shared/components/search/SearchBar";
import { ArtworkCard } from "@/shared/components/artworks/ArtworkCard";
import placeholderArt from "@/assets/images/placeholder-art-dark-180_180.jpg";
import { useNavigate } from "react-router-dom";

// 대체 이미지
const fallbackImage = placeholderArt;

const dummyData = [
  { id: 1, imageUrl: "", overlayText: "국립중앙박물관" },
  { id: 2, imageUrl: "", overlayText: "인상주의" },
  { id: 3, imageUrl: "", overlayText: "MOMA" },
  { id: 4, imageUrl: "", overlayText: "모네" },
  { id: 5, imageUrl: "", overlayText: "르누아르" },
  { id: 6, imageUrl: "", overlayText: "르네상스" },
  { id: 7, imageUrl: "", overlayText: "초현실주의" },
  { id: 8, imageUrl: "", overlayText: "현대미술" },
];

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    // 페이지 이동
    navigate(`/artwork/${id}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // 엔터 키 이벤트
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      console.log("검색어:", searchValue);
      // 검색어를 활용한 추가적인 로직 처리 가능
    }
  };

  return (
    <div className="px-4 py-6 pb-[5rem]">
      <SearchBar
        value={searchValue}
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown} // 엔터키
      />

      <div className="mt-6 grid grid-cols-2 gap-4">
        {dummyData.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            imageUrl={artwork.imageUrl || fallbackImage}
            overlayText={artwork.overlayText}
            overlayTextPosition="bottomRight"
            size="small"
            borderRadius="small"
            onClick={() => handleCardClick(artwork.id)}
          />
        ))}
      </div>
    </div>
  );
}
