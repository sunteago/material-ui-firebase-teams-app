export default class Group {
  constructor(groupData, user, timestamp) {
    this.roles = { [user.userId]: {
      role: "creator",
      name: user.name
    } };
    this.image = groupData.imageURL;
    this.name = groupData.name;
    this.isPublic = groupData.isPublic;
    this.description = groupData.description;
    this.activeInvitationLinks = [];
    this.messages = [];
    this.todoList = [];
    this.usersAllowedToInvite = groupData.usersAllowedToInvite;
    this.createdAt = timestamp;
  }
}
