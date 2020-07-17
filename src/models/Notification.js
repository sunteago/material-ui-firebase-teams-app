export default class UserNotification {
    constructor(type, title = '', groupName = '', link ) {
      this.type = type;
      this.timestamp = new Date();
      this.groupName = groupName;
      this.title = title;
      this.link = link;
    }
  }
