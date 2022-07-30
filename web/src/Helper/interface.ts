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
export interface ISelectUserProps {
  avatar?: string;
  _id: string;
  sender: string;
  receiver: string;
  name: string;
}
