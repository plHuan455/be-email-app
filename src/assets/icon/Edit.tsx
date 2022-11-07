import { SVGIconProps } from '@components/atoms/Icon';

const Edit: React.FC<SVGIconProps> = ({ width, height, color }) => {
  return (
    <svg
      style={{
        width: `${width || 24}px`,
        height: `${height || 24}px`,
        fill: `${color || '#5541D7'}`,
      }}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M894.67 894.67H129.33V129.33H512v48H177.33v669.34h669.34V512h48v382.67z" />
      <path d="M287.9 734.92l11.82-136.27 481.14-481.14L905.31 242 424.17 723.11zM346 620.23l-5.37 61.94 61.94-5.37L837.43 242l-56.57-56.6z" />
      <path d="M666.115 266.207l33.94-33.94 90.51 90.509-33.94 33.941z" />
    </svg>
  );
};

export default Edit;
