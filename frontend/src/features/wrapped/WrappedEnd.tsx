import { useNavigate } from 'react-router-dom';
import wrapped06 from '@/assets/images/wrapped06.jpg';

export default function WrappedEnd() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/mymuseum');
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-white cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={wrapped06}
        alt="Wrapped End"
        className="w-[320px] shadow-md mb-6"
      />
      <h2 className="text-xl font-bold text-center text-[#ff385c]">
        올해의 감상이 완성되었어요 🎉
      </h2>
      <p className="mt-6 text-sm text-gray-400">(클릭하면 마이뮤지엄으로 이동합니다)</p>
    </div>
  );
}

