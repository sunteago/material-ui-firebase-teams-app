export default class User {
  constructor(email, serverTimestamp) {
    this.email = email;
    this.memberSince = serverTimestamp;
    this.inGroups = [];
    this.status = "I'm a new member!";
    this.isVisible = false;
    this.seenMessages = [];
  }
}
