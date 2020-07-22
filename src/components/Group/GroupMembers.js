import React from "react";
import Member from "./GroupMember";
import SectionTitle from "../Layout/Dashboard/SectionTitle";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { getMembersArray } from "../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  memberListTitle: {
    margin: theme.spacing(3),
  },
  memberListItemAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export default function GroupMembers({ members, dispatch }) {
  const classes = useStyles();
  const membersArr = getMembersArray(members);

  return (
    <>
      <SectionTitle className={classes.memberListTitle}>
        Members List
      </SectionTitle>
      <List dense disablePadding>
        {membersArr.map((member) => (
          <Member key={member.memberId} member={member} classes={classes} />
        ))}
      </List>
    </>
  );
}
