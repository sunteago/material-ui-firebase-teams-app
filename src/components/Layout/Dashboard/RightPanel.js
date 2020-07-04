import React from "react";
import TopNewsList from "../../News/NewsList";
import GroupList from "../../Group/GroupList";

function RightPanel({ lastNews, topActiveGroups, myGroups }) {
  
  return (
    <>
      <TopNewsList title="Last News" news={lastNews} />
      <GroupList title="Top Groups" groups={topActiveGroups} />
      <GroupList title="My Groups" groups={myGroups} />
    </>
  );
}

export default React.memo(RightPanel, (prev) => {
  if (prev.topActiveGroups.length === 0 || prev.myGroups.length === 0) {
    return false;
  }
  return true
})