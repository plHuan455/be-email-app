import { mapModifiersTailWind } from '@utils';
import React, { Suspense } from 'react';

// Colors
import { AppColors } from '@assets/colors';
import UploadCloud from '@assets/icon/UploadCloud';
import Dot from '@assets/icon/Dot';

// Icon
const Sending = React.lazy(() => import('@assets/icon/Sending'));
const Sent = React.lazy(() => import('@assets/icon/Sent'));
const Seen = React.lazy(() => import('@assets/icon/Seen'));
const Declined = React.lazy(() => import('@assets/icon/Declined'));
const Approved = React.lazy(() => import('@assets/icon/Approved'));
const Pending = React.lazy(() => import('@assets/icon/Pending'));
const Bell = React.lazy(() => import('@assets/icon/Bell'));
const Star = React.lazy(() => import('@assets/icon/Star'));
const Print = React.lazy(() => import('@assets/icon/Print'));
const Reload = React.lazy(() => import('@assets/icon/Reload'));
const Trash = React.lazy(() => import('@assets/icon/Trash'));
const Plus = React.lazy(() => import('@assets/icon/Plus'));
const ThreeDots = React.lazy(() => import('@assets/icon/ThreeDots'));
const Download = React.lazy(() => import('@assets/icon/Download'));
const Edit = React.lazy(() => import('@assets/icon/Edit'));
const Calendar = React.lazy(() => import('@assets/icon/Calendar'));
const LockIcon = React.lazy(() => import('@assets/icon/Lock'));
const SettingIcon = React.lazy(() => import('@assets/icon/Setting'));
const SearchIcon = React.lazy(() => import('@assets/icon/Search'));

export interface SVGIconProps {
  className?: string;
  icon?: TSVGIcon;
  color?: string | TAppColors;
  width?: number;
  height?: number;
  modifiers?: Modifiers;
  type?: 'bold' | 'bulk';
  rawColor?: string;
}
export interface SVGProps {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
  type?: 'bold' | 'bulk';
}

const ICON = {
  sending: Sending,
  sent: Sent,
  seen: Seen,
  declined: Declined,
  approved: Approved,
  pending: Pending,
  bell: Bell,
  uploadCloud: UploadCloud,
  star: Star,
  plus: Plus,
  threeDotsVertical: ThreeDots,
  threeDotsHorizontal: ThreeDots,
  download: Download,
  edit: Edit,
  print: Print,
  reload: Reload,
  trash: Trash,
  calendar: Calendar,
  dot: Dot,
  lock: LockIcon,
  settings: SettingIcon,
};

export type TSVGIcon = keyof typeof ICON;

export const IconFactory: React.FC<SVGIconProps> = ({
  className,
  icon = 'bell',
  color = 'grey',
  modifiers = [],
  rawColor,
  ...props
}) => {
  const Component = ICON[icon];
  return (
    <div
      className={mapModifiersTailWind(
        `svg_icon svg_icon-${icon} svg_icon-${props.type}`,
        ['flex', 'items-center', 'justify-center', ...modifiers],
        className,
      )}>
      <Suspense fallback={<div>...</div>}>
        {Component && <Component color={rawColor || AppColors[color]} {...props} />}
      </Suspense>
    </div>
  );
};

const Icon: React.FC<SVGIconProps> = ({ type, ...props }) => {
  return <IconFactory type="bold" {...props} />;
};

export const SVGIcon: React.FC<SVGIconProps> = ({ type, ...props }) => {
  return <IconFactory type="bulk" {...props} />;
};

export default Icon;
