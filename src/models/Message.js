export default class User {
  constructor(msg, serverTimestamp) {
    this.title = msg.title;
    this.content = msg.content;
    this.author = {
      avatar: msg.user.photoURL,
      name: msg.user.displayName || "Some user",
    };
    this.userId = msg.user.uid;
    this.timestamp = serverTimestamp;
  }
}
