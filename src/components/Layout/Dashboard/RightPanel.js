import React from "react";

import {
  topActiveGroupsToArray,
  limitGroupsArray,
} from "../../../utils/helpers";
import TopNewsList from "../../News/NewsList";
import GroupList from "../../Group/GroupList";

import ErrorBoundary from "../../Layout/ErrorBoundary";
import PropTypes from "prop-types";

function RightPanel({ lastNews, topActiveGroups, myGroups }) {
  const topActiveGroupsArr = topActiveGroupsToArray(topActiveGroups);
  return (
    <>
      <ErrorBoundary>
        <TopNewsList title="Last News" news={lastNews.slice(0, 2)} />
      </ErrorBoundary>
      <ErrorBoundary>
        <GroupList
          title="Top Groups"
          groups={limitGroupsArray(topActiveGroupsArr, 3)}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        {!!myGroups.length && (
          <GroupList title="My Groups" groups={limitGroupsArray(myGroups, 3)} />
        )}
      </ErrorBoundary>
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
