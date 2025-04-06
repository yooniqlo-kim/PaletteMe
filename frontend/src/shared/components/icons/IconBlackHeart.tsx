// 작품 상세 페이지에서 보이는 하트
export default function IconBlackHeart({ isClicked }: { isClicked: boolean }) {
  const color = isClicked ? "black" : "none";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill={color}>
      <path
        d="M14.6 9.55556C15.792 8.42 17 7.05889 17 5.27778C17 4.14324 16.5364 3.05517 15.7113 2.25293C14.8861 1.45069 13.767 1 12.6 1C11.192 1 10.2 1.38889 9 2.55556C7.8 1.38889 6.808 1 5.4 1C4.23305 1 3.11389 1.45069 2.28873 2.25293C1.46357 3.05517 1 4.14324 1 5.27778C1 7.06667 2.2 8.42778 3.4 9.55556L9 15L14.6 9.55556Z"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
