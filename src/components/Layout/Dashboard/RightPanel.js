import React from "react";

import {
  topActiveGroupsToArray,
  limitGroupsArray,
} from "../../../utils/helpers";
import TopNewsList from "../../News/NewsList";
import GroupList from "../../Group/GroupList";

import PropTypes from "prop-types";

function RightPanel({ lastNews, topActiveGroups, myGroups }) {
  const topActiveGroupsArr = topActiveGroupsToArray(topActiveGroups);
  return (
    <>
      <TopNewsList title="Last News" news={lastNews} />
      <GroupList
        title="Top Groups"
        groups={limitGroupsArray(topActiveGroupsArr, 3)}
      />
      {!!myGroups.length && (
        <GroupList title="My Groups" groups={limitGroupsArray(myGroups, 3)} />
      )}
    </>
  );
}

RightPanel.propTypes = {
  lastNews: PropTypes.array.isRequired,
  topActiveGroups: PropTypes.object.isRequired,
  myGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default React.memo(RightPanel, (prevProps, nextProps) => {
  return prevProps.myGroups.length === nextProps.myGroups.length;
});
