import "./App.css";
import Layout from "@shared/components/layout/Layout";
import { ArtworkImage } from "@shared/components/artworks/ArtworkImage";
import { WriterMeta } from "@shared/components/comments/WriterMeta";
import { BrowserRouter } from "react-router";
import NavBar from "@shared/components/navbar/NavBar";
import { CommentCard } from "@shared/components/comments/CommentCard";

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
            profileImageUrl="https://i.namu.wiki/i/3VziV9_sgCyHf-34Nv7iKCHAC6gY5Pxs3xQ6fcqPoBTp2Gp5Tb2LnhM6yVryu8grbm6-izIBMFagq1dc7OoyeA.webp"
            nickname="미니마니모네"
            date="2024.03.25"
          />
          <NavBar />
          <CommentCard
            profileImageUrl="https://i.namu.wiki/i/3VziV9_sgCyHf-34Nv7iKCHAC6gY5Pxs3xQ6fcqPoBTp2Gp5Tb2LnhM6yVryu8grbm6-izIBMFagq1dc7OoyeA.webp"
            nickname="미니마니모네"
            date="2024.03.25"
            content="졸리다 졸리지 않다 졸리다 졸리지 않다 졸리다 졸리지 않다 졸리다 졸리지 않다졸리다 졸리지 않다 졸리다 졸리지 않다졸리다 졸리지 않다 졸리다 졸리지 않다졸리다 졸리지 않다 졸리다 졸리지 않다졸리다 졸리지 않다 졸리다 졸리지 않다졸리다 졸리지 않다 졸리다 졸리지 않다졸리다 졸리지 않다 졸리다 졸리지 않다졸리다 졸리지 않다 졸리다 졸리지 않다졸리다 졸리지 않다 졸리다 졸리지 않다"
            likeCount={325}
            backgroundImageUrl="https://mblogthumb-phinf.pstatic.net/20160507_102/mbkim6204_1462608563520HKwqJ_PNG/Women_with_umbrella_%281875%29_by_Claude_Monet.PNG?type=w420"
          />
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
