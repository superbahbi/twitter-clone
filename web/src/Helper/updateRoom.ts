export function updateRoom(i: string, j: string) {
  let id = `${i}-${j}`;
  let split = id.split("-"); // ['user_id1', 'user_id2']
  let unique = [...new Set(split)].sort((a, b) => (a < b ? -1 : 1)); // ['username1', 'username2']
  let updatedRoomName = `${unique[0]}-${unique[1]}`; // 'username1--with--username2'
  return updatedRoomName;
}
