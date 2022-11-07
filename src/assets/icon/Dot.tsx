import { SVGProps } from '@components/atoms/Icon';

const Dot: React.FC<SVGProps> = ({ width, height, color }) => {
  return (
    <svg
      width={width || 10}
      height={height || 10}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="5" r="5" fill={color ?? '#23D840'} />
    </svg>
  );
};

export default Dot;
