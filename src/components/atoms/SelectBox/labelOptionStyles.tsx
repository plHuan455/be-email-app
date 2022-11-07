import React from 'react';
import { IconFactory, SVGIconProps, TSVGIcon } from '../Icon';

interface LabelOptionProps {
  iconName: TSVGIcon;
  labelValue: string;
  width?: number;
  height?: number;
  color?: string;
}

const LabelOptionStyle: React.FC<LabelOptionProps> = ({
  iconName,
  labelValue,
  width = 40,
  height = 40,
  color = 'green',
}) => {
  return (
    <div className="option-label-wrapper">
      <IconFactory icon={iconName} width={width} height={height} color={color} />
      <span>{labelValue}</span>
    </div>
  );
};

export default LabelOptionStyle;
