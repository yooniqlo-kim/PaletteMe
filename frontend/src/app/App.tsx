import "./App.css";
import Layout from "../shared/components/Layout/Layout";
import { ArtworkImage } from "../shared/components/artworks/ArtworkImage";

function App() {
  return (
    <>
      <Layout>
        <div className="text-primary">App</div>
        <div className="font-extralight text-xs text-secondary">
          글꼴 적용 예시
        </div>
        <ArtworkImage imageUrl="https://upload.wikimedia.org/wikipedia/commons/a/a7/Inwangjesaekdo.jpg" />
      </Layout>
    </>
  );
}

export default App;
