import { UseMutationResult } from "@tanstack/react-query";

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
    location?: string;
    website?: string;
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
  placeholder?: string;
  filterUsers?: ISelectUserProps[] | undefined;
  onHandleChange?: (e: React.SyntheticEvent) => void;
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
  placeholder?: string;
  onHandleChange?: (e: React.SyntheticEvent) => void;
}
export interface IEditableProps {
  childRef: React.RefObject<HTMLDivElement>;
  text: string;
  name: string;
  type: string;
  username: string;
  db: string;
  token: string;
  placeholder: string;
  children: React.ReactNode;
}
export interface IFeedProps {
  tweets: ITweetDataProps[];
  likeTweetMutation: UseMutationResult<string, Error, string, unknown>;
  deleteTweetMutation: UseMutationResult<string, Error, string, unknown>;
  commentTweetMutation: UseMutationResult<string, Error, string, unknown>;
}
export interface ITweetDataProps {
  _id: string;
  retweets: string;
  likes: ILikesProps[];
  comment?: string[];
  username?: string;
  name?: string;
  timestamp?: string;
  content?: string;
  img?: {
    filename: string;
  };
  link?: string;
  user_data: IUserProps;
}
export interface IShowTipProps {
  data: { state: boolean; id: string | null };
}
export interface ITweetProps {
  username?: string;
  avatar?: string;
  addTweetMutation?: UseMutationResult<string, Error, INewTweet, unknown>;
  placeholder?: string;
  // commentTweetMutation
  height?: string;
}
export interface IInputProps {
  name: string;
  onHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
  autocomplete: string;
  value: string;
}
export interface ILikesProps {
  _id: string;
}
export interface IListProps {
  id?: string;
  brand?: boolean;
  onHandleClick?: () => void;
  paddingBottom?: string;
  icon?: React.ReactNode;
  name?: string;
  active?: boolean;
}
export interface IModalProps {
  index?: number;
  show?: boolean;
  onHide?: () => void;
  onFormSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  onHandleModal?: () => void;
  body?: React.ReactNode;
  footer?: React.ReactNode;
}
export interface IProfileBoxProps {
  user: IUserProps;
  authUsername: string;
}
export interface ITweetInputProps {
  disable?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface ITweetModalProps {
  show: boolean;
  onHide: () => void;
  onHandleTweetModal: () => void;
}
export interface IReducerActionProps {
  type: string;
  payload: any;
}
export interface IProviderProps {
  children: React.ReactNode;
}
export interface IAuthContextProps {
  loading?: boolean;
  token?: string;
  user?: IUserProps;
  errorMessage?: string;
}
export interface ITweetContextProps {
  tweets: ITweetDataProps[];
  errorMessage?: string;
  newTweet?: ITweetDataProps;
  reload?: boolean;
}
export interface IUserContextProps {
  allUsers: IUserProps[];
  messsages: IMessageHistoryProps[];
  getUser: IUserProps;
  errorMessage?: string;
}
