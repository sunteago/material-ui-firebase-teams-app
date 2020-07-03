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

export default React.memo(RightPanel, () => true)