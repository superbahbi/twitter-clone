export enum AuthTypes {
  Error = "add_error",
  Signin = "signin",
  ClearError = "clear_error_message",
  Signout = "signout",
}
export enum TweetTypes {
  Error = "add_error",
  Fetch = "fetch_tweets",
  Add = "add_tweet",
  Like = "like_tweet",
  Delete = "delete_tweet",
  Reload = "reload",
  Reset = "reset",
}
export enum UserTypes {
  Error = "add_error",
  FetchMany = "fetch_users",
  FetchOne = "fetch_user",
  Messages = "fetch_messages",
}
