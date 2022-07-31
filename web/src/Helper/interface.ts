export interface IAvatarProps {
  src?: string;
  name?: string;
  nohref?: boolean;
  height?: string;
  width?: string;
  mini?: boolean;
}

export interface IAvatarContainerProps {
  mini?: boolean;
}

export interface IHeaderProps {
  avatar?: string;
  iconLeft?: string;
  iconRight?: string;
  name?: string;
  tweetCount?: number;
  iconLeftComponent?: React.ReactNode;
  iconRightComponent?: React.ReactNode;
  onHandleIconRightButton?: () => void;
}

export interface IFormLoginProps {
  username: string;
  password: string;
}
export interface IFormSignupProps {
  username: string;
  password: string;
  confirmpassword: string;
  name: string;
  email: string;
  gender: string;
}
export interface INewTweet {
  imgFile: Object;
  videoLink: string;
  tweetText: string;
}
export interface IContext {
  previousValue: INewTweet | undefined;
}
export interface IMediaFrameProps {
  children?: React.ReactNode;
  onHandleMediaClose?: () => void;
}
export interface IPrivateRouteProps {
  children?: React.ReactNode;
}
export interface ILayoutProps {
  children?: React.ReactNode;
}
export interface INavProfileProps {
  brand?: string;
}
export interface IUserProps {
  _id: string;
  username: string;
  verified: boolean;
  tweets: number;
  following: number;
  followers: number;
  profile: {
    avatar: {
      filename: string;
    };
    cover: {
      filename: string;
    };
    name: string;
    email: string;
    gender: string;
    bio?: string;
    regDate: number;
  };
  chatroom: ISelectUserProps[];
}
export interface ISelectUserProps {
  avatar: string;
  _id: string;
  sender: string;
  receiver: string;
  name: string;
}

export interface IMessageSentProps {
  message: string;
}
export interface IMessageHistoryProps {
  _id: string;
  user: string;
  body: string;
  createdAt: number;
}
export interface IMessageSocketProps {
  _id?: string;
  sender?: IUserProps;
  receiver?: IUserProps;
}
export interface ClientToServerEvents {
  onMessage: () => void;
  join: (data: IMessageSocketProps) => void;
  emitMessage: (msg: IMessageHistoryProps) => void;
}

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}
export interface IMessageChatRoomProps {}
export interface ISearchWithListProps {
  placeholder: string;
  filterUsers: ISelectUserProps[] | undefined;
  onHandleChange: (e: React.SyntheticEvent) => void;
  onHandleSearchClick: (room: ISelectUserProps) => Promise<void>;
}
export interface IButtonProps {
  className?: string;
  primary?: boolean;
  secondary?: boolean;
  textColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  large?: boolean;
  width?: string;
  right?: boolean;
  id?: string;
  type?: "button" | "submit" | "reset" | undefined;
  name?: string;
  disabled?: boolean;
  label?: string;
  handleClick?: () => void;
}
export interface IMetadataProps {
  author_name: string;
  author_url: string;
  height: number;
  html: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height: number;
  thumbnail_url: string;
  thumbnail_width: number;
  title: string;
  type: string;
  version: string;
  width: number;
}
export interface IChatProps {
  receiverData: ISelectUserProps;
  messagesHistory: IMessageHistoryProps[];
  onUpdateMessageSubmit: (data: any) => void;
}
export interface IMessageBubbleProps {
  right?: boolean;
}
export interface IIconButtonProps {
  id?: string;
  style?: React.CSSProperties;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  name?: string;
  handleClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  borderRadius?: string | undefined;
  color?: string;
  backgroundColor?: string;
  hoverColor?: string;
  hoverColorBackground?: string;
  size?: string;
  disabled?: boolean;
  width?: string;
  height?: string;
  iconComponent?: React.ReactNode;
  icon?: string;
  children?: React.ReactNode;
}
export interface ISearchProps {
  placeholder: string;
  onHandleChange: (e: React.SyntheticEvent) => void;
}
