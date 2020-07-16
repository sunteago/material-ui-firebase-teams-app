export default class User {
  constructor(email, serverTimestamp, displayName) {
    this.email = email;
    this.memberSince = serverTimestamp;
    this.inGroups = [];
    this.status = "I'm a new member!";
    this.isVisible = true;
    this.seenMessages = [];
    this.name = displayName;
  }
}
