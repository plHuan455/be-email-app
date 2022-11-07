type Option = {
  id: string;
  label: string;
  value: string;
};

type WithChildren<T = {}> = T & { children?: React.ReactNode };
type WithClassName<T = {}> = T & {
  className?: Partial<string | GlobalTailWindClassName>;
};

type User = {
  id: string;
  avt?: string;
  name: string;
  phone: string;
  balance: string;
  score: number;
  wallet_id: string;
};

type BaseItemModifiers =
  | 'relative'
  | 'col'
  | 'noPadding'
  | 'p-3'
  | 'py-3'
  | 'py-2'
  | 'px-3'
  | 'bg'
  | 'bg-primary'
  | 'bg-transparent'
  | 'bg-op-0.2'
  | 'bg-op-0.1'
  | 'bg-purple-2'
  | 'bg-pink'
  | 'bg-pink-light'
  | 'bg-grey-4'
  | 'border'
  | 'px-0'
  | 'py-0'
  | 'br-3'
  | 'br-4'
  | 'br-5'
  | 'border-purple-2'
  | 'border-app-2'
  | 'border-pink'
  | 'border-linear'
  | 'bground-light-blue-1'
  | 'bground-orange-light'
  | 'bground-green-light'
  | 'bground-light-blue'
  | 'bground-blue-2'
  | 'bground-green-light-1'
  | 'bground-orange-light-1'
  | 'bground-yellow-light'
  | 'bground-yellow-light-1'
  | '';

type ValueOf<T> = T[keyof T];