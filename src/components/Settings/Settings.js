import React, { useState } from "react";
import ConfigurationItem from "./ConfigurationItem";
import TextInput from "../TextInput";
import { Container, Button, Typography } from "@material-ui/core";
import AlertMessage from "../Layout/AlertMessage";
import * as alertTypes from "../../constants/alertTypes";
import Modal from "../Layout/Modal/Modal";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  operationTitle: {
    marginBottom: theme.spacing(4),
  },
  alertMsg: {
    margin: theme.spacing(1),
  },
  button: {
    margin: `${theme.spacing(3)}px auto`,
  },
}));

export default function Settings(props) {
  const {
    title,
    isPublic,
    description,
    confirmText,
    ConfirmIcon,
    modalConfirmText,
    confirmHandler,
    existingGroupName,
  } = props;

  const [settings, setSettings] = useState({
    isPublic,
    usersAllowedToInvite: false,
  });
  const [groupDescription, setGroupDescription] = useState(description);
  const [groupName, setGroupName] = useState(existingGroupName || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const classes = useStyles();

  const handleToggle = (value) => {
    setSettings((prevState) => {
      return {
        ...prevState,
        [value]: !prevState[value],
      };
    });
  };

  const confirmActionHandler = () => {
    confirmHandler({
      ...settings,
      groupName,
      description: groupDescription,
    });
  };

  return (
    <Container style={{ padding: "1rem", textAlign: "center" }}>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          title={title}
          confirm="Confirm"
          decline="Cancel"
          confirmActionHandler={confirmActionHandler}
        >
          {settings.isPublic && (
            <AlertMessage
              alertStyles={classes.alertMsg}
              severity="warning"
              action={alertTypes.MAKE_GROUP_PUBLIC}
              handler={() => {}}
            />
          )}
          <Typography>{modalConfirmText}</Typography>
        </Modal>
      )}

      <Typography
        variant="h4"
        component="h1"
        className={classes.operationTitle}
      >
        {title}
      </Typography>

      {!existingGroupName && (
        <TextInput
          value={groupName}
          setValue={setGroupName}
          type="text"
          label="Group name"
          variant="outlined"
          required
        />
      )}

      <ConfigurationItem
        description="Set this group to Public"
        text={["Private", "Public"]}
        value={settings.isPublic}
        handleToggle={handleToggle}
        name="isPublic"
        isAdmin
      />

      <ConfigurationItem
        description="Allow other users to invite with a one-time link"
        text={["Deny", "Allow"]}
        value={settings.usersAllowedToInvite}
        handleToggle={handleToggle}
        name="usersAllowedToInvite"
        isAdmin
      />
      <TextInput
        value={groupDescription}
        setValue={setGroupDescription}
        type="text"
        label="Group Description"
        rows={4}
        multiline
        variant="outlined"
        fullWidth={true}
        required
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<ConfirmIcon />}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        {confirmText}
      </Button>
    </Container>
  );
}
