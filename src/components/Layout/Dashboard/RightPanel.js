import React from "react";
import { topActiveGroupsToArray } from "../../../utils/helpers";
import TopNewsList from "../../News/NewsList";
import GroupList from "../../Group/GroupList";

export default function RightPanel({ lastNews, topActiveGroups, myGroups }) {
  
  const topActiveGroupsArr = topActiveGroupsToArray(topActiveGroups);
  return (
    <>
      <TopNewsList title="Last News" news={lastNews} />
      <GroupList title="Top Groups" groups={topActiveGroupsArr} />
      {!!myGroups.length && <GroupList title="My Groups" groups={myGroups} />}
    </>
  );
}
