export default class Group {
  constructor(groupData, creatorId, timestamp) {
    this.roles = [{ [creatorId]: "creator" }];
    this.name = groupData.groupName;
    this.isPublic = groupData.isPublic;
    this.description = groupData.description;
    this.activeInvitationLinks = [];
    this.messages = [];
    this.todoList = [];
    this.usersAllowedToInvite = groupData.usersAllowedToInvite;
    this.createdAt = timestamp;
  }
}
