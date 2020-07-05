import React from "react";
import { useParams } from "react-router-dom";
import PageContainer from "../components/Layout/PageContainer";
import SectionTitle from "../components/Layout/Dashboard/SectionTitle";
import { useSelector } from "react-redux";
import TodoList from '../components/TodoList/TodoList';

export default function Group() {
  const { groupId } = useParams();
  const groups = useSelector((state) => state.userData.userGroupsContent);
  const groupInLocal = groups.find((group) => groupId === group.groupId);

  //check if user has permission to view this group

  return groupInLocal ? (
    <PageContainer>
      <SectionTitle>{groupInLocal.name}</SectionTitle>
      <TodoList todoList={groupInLocal.todoList} groupId={groupId} />
    </PageContainer>
  ) : null;
}
