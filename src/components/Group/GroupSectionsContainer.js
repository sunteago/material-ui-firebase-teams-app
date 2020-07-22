import React from "react";

import TaskListContainer from "../Tasks/TasksListContainer";
import Messages from "../Messages/Messages";
import Members from "../Group/GroupMembers";
import Settings from "../Settings/Settings";

export default function GroupSectionsContainer(props) {
  const {
    dispatch,
    activeGroup,
    isMember,
    isCreator,
    user,
    onDeleteGroup,
    onConfirmSaveGroup,
    tab
  } = props;

  return (
    <>
      {tab === 0 && (
        <TaskListContainer
          todoList={activeGroup.todoList}
          isMember={isMember}
          groupId={activeGroup.groupId}
          dispatch={dispatch}
        />
      )}
      {tab === 1 && (
        <Messages
          messages={activeGroup.messages}
          user={user}
          groupId={activeGroup.groupId}
          isMember={isMember}
          dispatch={dispatch}
        />
      )}
      {tab === 2 && <Members members={activeGroup.roles} />}
      {tab === 3 && isCreator && (
        <Settings
          mode="modifyGroup"
          confirmHandler={onConfirmSaveGroup}
          deleteHandler={onDeleteGroup(activeGroup.groupId, user.uid)}
          isVisible={activeGroup.isPublic}
          descriptText={activeGroup.description}
          existingName={activeGroup.name}
          imageUrl={activeGroup.image}
        />
      )}
    </>
  );
}
