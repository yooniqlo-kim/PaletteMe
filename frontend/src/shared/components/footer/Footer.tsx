export default function Footer() {
    return (
      <footer className="text-[12px] text-neutral-6 text-center border-t border-neutral-3 mt-16 pt-4 pb-1">
        <p className="mb-1">© 2025 PaletteMe. SSAFY 12기 특화 A505</p>
        <p className="mb-1">이미지 출처는 퍼블릭 도메인입니다.</p>
  
        <div className="text-[10px] text-neutral-5 p-2">
          <p className="mb-1">
            팀원:{" "}
            <a href="https://github.com/yooniqlo-kim" target="_blank" rel="noopener noreferrer">김윤</a> ·{" "}
            <a href="https://github.com/notrealsilk" target="_blank" rel="noopener noreferrer">강명주</a> ·{" "}
            <a href="https://github.com/hyuun13" target="_blank" rel="noopener noreferrer">김지윤</a> ·{" "}
            <a href="https://github.com/hyunhee-dev" target="_blank" rel="noopener noreferrer">김현희</a> ·{" "}
            <a href="https://github.com/YoungdanNoh" target="_blank" rel="noopener noreferrer">노영단</a> ·{" "}
            <a href="https://github.com/lhj4499" target="_blank" rel="noopener noreferrer">이학준</a>
          </p>
          {/* <p className="mb-1">디자인 : <a href="https://instagram.com/salgu_jungle" target="_blank" rel="noopener noreferrer">@salgu_jungle</a></p> */}
          <p className="mb-1">디자인 : <a target="_blank" rel="noopener noreferrer">@salgu_jungle</a></p>
        </div>
      </footer>
    );
  }
  