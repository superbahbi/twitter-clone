export function youtubeParser(data: string): string | boolean {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = data.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
}
