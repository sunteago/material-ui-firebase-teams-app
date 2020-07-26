import React from "react";

import SectionTitle from "../Layout/Dashboard/SectionTitle";

import PublicIcon from "@material-ui/icons/Public";
import LockIcon from "@material-ui/icons/Lock";
import AdminIcon from "@material-ui/icons/SupervisorAccount";
import PersonIcon from "@material-ui/icons/Person";
import { Chip, Grid, Avatar } from "@material-ui/core";

import PropTypes from "prop-types";

function GroupHeader(props) {
  const { isMember, isCreator, activeGroup, classes } = props;

  return (
    <>
      <Grid
        container
        justify="flex-end"
        className={classes.infoChips}
        spacing={1}
      >
        {isMember && (
          <Grid item>
            <Chip
              icon={isCreator ? <AdminIcon /> : <PersonIcon />}
              label={isCreator ? "Creator" : "Member"}
              variant="outlined"
              color={isCreator ? "secondary" : "primary"}
            />
          </Grid>
        )}

        <Grid item>
          <Chip
            icon={activeGroup.isPublic ? <PublicIcon /> : <LockIcon />}
            label={activeGroup.isPublic ? "Public" : "Private"}
            variant="outlined"
            color={activeGroup.isPublic ? "primary" : "secondary"}
          />
        </Grid>
      </Grid>

      <Grid
        item
        container
        justify="center"
        spacing={3}
        className={classes.groupName}
      >
        <Grid item container justify="flex-end" xs={4} sm={5}>
          <Avatar src={activeGroup.image} alt={`${activeGroup.name}'s image`} />
        </Grid>
        <Grid item container justify="flex-start" xs={8} sm={7}>
          <SectionTitle>{activeGroup.name}</SectionTitle>
        </Grid>
      </Grid>
    </>
  );
}

GroupHeader.propTypes = {
  isMember: PropTypes.bool,
  isCreator: PropTypes.bool,
  activeGroup: PropTypes.object.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
};

export default React.memo(GroupHeader, (prevProps, nextProps) => {
  if (
    prevProps.isMember === nextProps.isMember &&
    prevProps.isPublic === nextProps.isPublic &&
    prevProps.activeGroup.image === nextProps.activeGroup.image &&
    prevProps.activeGroup.name === nextProps.activeGroup.name
  ) {
    return true;
  }
  return false;
});
