import React from "react";

import TaskListContainer from "../Tasks/TasksListContainer";
import Messages from "../Messages/Messages";
import Members from "../Group/GroupMembers";
import Settings from "../Settings/Settings";

import ErrorBoundary from "../Layout/ErrorBoundary";
import PropTypes from "prop-types";

export default function GroupSectionsContainer(props) {
  const {
    dispatch,
    activeGroup,
    isMember,
    isCreator,
    user,
    onDeleteGroup,
    onConfirmSaveGroup,
    tab,
  } = props;

  return (
    <>
      {tab === 0 && (
        <ErrorBoundary>
          <TaskListContainer
            todoList={activeGroup.todoList}
            isMember={isMember}
            group={activeGroup}
            dispatch={dispatch}
          />
        </ErrorBoundary>
      )}
      {tab === 1 && (
        <ErrorBoundary>
          <Messages
            messages={activeGroup.messages}
            user={user}
            groupId={activeGroup.groupId}
            isMember={isMember}
            dispatch={dispatch}
          />
        </ErrorBoundary>
      )}
      {tab === 2 && (
        <ErrorBoundary>
          <Members members={activeGroup.roles} />{" "}
        </ErrorBoundary>
      )}
      {tab === 3 && isCreator && (
        <ErrorBoundary>
          <Settings
            mode="modifyGroup"
            confirmHandler={onConfirmSaveGroup}
            deleteHandler={onDeleteGroup(activeGroup.groupId, user.uid)}
            isVisible={activeGroup.isPublic}
            descriptText={activeGroup.description}
            existingName={activeGroup.name}
            imageUrl={activeGroup.image}
          />
        </ErrorBoundary>
      )}
    </>
  );
}

GroupSectionsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  activeGroup: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onDeleteGroup: PropTypes.func.isRequired,
  onConfirmSaveGroup: PropTypes.func.isRequired,
  tab: PropTypes.number.isRequired,
  isMember: PropTypes.bool,
  isCreator: PropTypes.bool,
};
