export default class User {
  constructor(email, serverTimestamp, displayName, photoURL) {
    this.email = email;
    this.memberSince = serverTimestamp;
    this.inGroups = [];
    this.status = "I'm a new member!";
    this.isVisible = true;
    this.seenMessages = [];
    this.name = displayName;
    this.notifications = [{
      type: 'appMessage',
      title: 'Welcome',
      content: 'Welcome to the Teams App. We recommend you to start creating a group',
      timestamp: new Date(),
      link: '/groups/create'
    }];
    this.avatar = photoURL || null;
  }
}
