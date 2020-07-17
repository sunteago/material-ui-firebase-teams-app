export default class InvitationLink {
    constructor(groupId, groupName, message, isForSpecificUser = null) {
      this.groupId = groupId;
      this.groupName = groupName;
      this.message = message;
      this.isForSpecificUser = isForSpecificUser;
    }
  }
  