import React from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../components/Layout/PageContainer";
import SectionTitle from "../components/Layout/Dashboard/SectionTitle";
import { useSelector } from "react-redux";
import TaskListContainer from '../components/Tasks/TasksListContainer';

export default function Group() {
  const { groupId } = useParams();
  const groups = useSelector((state) => state.userData.userGroupsContent);
  const groupInLocal = groups.find((group) => groupId === group.groupId);

  //check if user has permission to view this group

  return groupInLocal ? (
    <PageContainer>
      <SectionTitle>{groupInLocal.name}</SectionTitle>
      <TaskListContainer todoList={groupInLocal.todoList} groupId={groupId} />
    </PageContainer>
  ) : null;
}
