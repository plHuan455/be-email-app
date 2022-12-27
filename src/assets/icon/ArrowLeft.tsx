import { SVGProps } from '@components/atoms/Icon';

const ArrowLeft: React.FC<SVGProps> = ({ width, height, color, className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : '24'}
      height={height ? height : '24'}
      viewBox="0 0 6 11"
      fill={color ? color : '#fff'}>
      <path
        d="M5.67686 0.21204C5.95952 0.494707 5.95952 0.965817 5.67686 1.24848L1.24842 5.67692C0.965755 5.95958 0.494646 5.95958 0.211979 5.67692C-0.0706863 5.39425 -0.0706863 4.92314 0.211979 4.64047L4.64041 0.21204C4.92308 -0.0706254 5.39419 -0.0706253 5.67686 0.21204Z"
        fill={color ? color : '#fff'}
      />
      <path
        d="M5.67686 10.388C5.39419 10.6706 4.92308 10.6706 4.64041 10.388L0.21198 5.95954C-0.0706859 5.67688 -0.0706859 5.20577 0.21198 4.9231C0.494646 4.64043 0.965756 4.64043 1.24842 4.9231L5.67686 9.35153C5.95952 9.6342 5.95952 10.1053 5.67686 10.388Z"
        fill={color ? color : '#fff'}
      />
    </svg>
  );
};

export default ArrowLeft;
