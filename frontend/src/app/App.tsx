import "./App.css";
import Layout from "../shared/components/layout/Layout";
import { ArtworkImage } from "../shared/components/artworks/ArtworkImage";
import { WriterMeta } from "../shared/components/comments/WriterMeta";
import { BrowserRouter } from "react-router";
import NavBar from "../shared/components/navbar/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <div className="text-primary">App</div>
          <div className="font-extralight text-xs text-secondary">
            글꼴 적용 예시
          </div>
          <ArtworkImage imageUrl="https://upload.wikimedia.org/wikipedia/commons/a/a7/Inwangjesaekdo.jpg" />
          <WriterMeta
            profileImageUrl="https://i.namu.wiki/i/3VziV9_sgCyHf-34Nv7iKCHAC6gY5Pxs3xQ6fcqPoBTp2Gp5Tb2LnhM6yVryu8grbm6-izIBMFagq1dc7OoyeA.webp" // 실제 이미지 경로로 교체
            nickname="미니마니모네"
            date="2024.03.25"
          />
          <NavBar/>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
