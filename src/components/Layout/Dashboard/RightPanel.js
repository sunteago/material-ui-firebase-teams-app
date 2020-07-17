import React from "react";
import TopNewsList from "../../News/NewsList";
import GroupList from "../../Group/GroupList";

export default function RightPanel({ lastNews, topActiveGroups, myGroups }) {
  return (
    <>
      <TopNewsList title="Last News" news={lastNews} />
      <GroupList title="Top Groups" groups={topActiveGroups} />
      {!!myGroups.length && <GroupList title="My Groups" groups={myGroups} />}
    </>
  );
}
