import { mapModifiersTailWind } from '@utils';
import React, { Suspense } from 'react';

// Colors
import { AppColors } from '@assets/colors';
import UploadCloud from '@assets/icon/UploadCloud';
import Dot from '@assets/icon/Dot';

// Icon
const More = React.lazy(() => import('@assets/icon/More'));
const Crown = React.lazy(() => import('@assets/icon/Crown'));
const Import = React.lazy(() => import('@assets/icon/Import'));
const Chat = React.lazy(() => import('@assets/icon/Chat'));
const Dialpad = React.lazy(() => import('@assets/icon/Dialpad'));
const Donut = React.lazy(() => import('@assets/icon/Donut'));
const Email = React.lazy(() => import('@assets/icon/Email'));
const People = React.lazy(() => import('@assets/icon/People'));
const SquareCropDin = React.lazy(() => import('@assets/icon/SquareCropDin'));
const AccountCircle = React.lazy(() => import('@assets/icon/AccountCircle'));
const Password = React.lazy(() => import('@assets/icon/Password'));
const Logout = React.lazy(() => import('@assets/icon/Logout'));
const Close = React.lazy(() => import('@assets/icon/Close'));
const Square = React.lazy(() => import('@assets/icon/Square'));
const Minus = React.lazy(() => import('@assets/icon/Minus'));
const Unread = React.lazy(() => import('@assets/icon/Unread'));
const Spam = React.lazy(() => import('@assets/icon/Spam'));
const Delete = React.lazy(() => import('@assets/icon/Delete'));
const Forward = React.lazy(() => import('@assets/icon/Forward'));
const ReplyAll = React.lazy(() => import('@assets/icon/ReplyAll'));
const Reply = React.lazy(() => import('@assets/icon/Reply'));
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
  isWindowIcon?: boolean;
  onClick?: React.MouseEventHandler | undefined;
}
export interface SVGProps {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
  type?: 'bold' | 'bulk';
}

export const ICON = {
  more: More,
  crown: Crown,
  import: Import,
  chat: Chat,
  dialpad: Dialpad,
  donut: Donut,
  email: Email,
  people: People,
  squareCropDin: SquareCropDin,
  accountCircle: AccountCircle,
  password: Password,
  logout: Logout,
  close: Close,
  square: Square,
  minus: Minus,
  unread: Unread,
  spam: Spam,
  delete: Delete,
  forward: Forward,
  replyAll: ReplyAll,
  reply: Reply,
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
  onClick,
  ...props
}) => {
  const Component = ICON[icon];
  return (
    <div
      className={mapModifiersTailWind(
        `svg_icon svg_icon-${icon} svg_icon-${props.type}`,
        ['flex', 'items-center', 'justify-center', ...modifiers],
        className,
      )}
      onClick={onClick}>
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
