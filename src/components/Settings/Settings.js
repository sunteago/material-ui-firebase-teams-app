import React, { useState } from "react";

import ConfigurationItem from "./ConfigurationItem";
import settingsTexts from "../../utils/settingsTexts";
import TextInput from "../TextInput";
import AlertMessage from "../Layout/AlertMessage";
import Modal from "../Layout/Modal/Modal";
import { Container, Button, Typography } from "@material-ui/core";
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
  const { isVisible, descriptText, confirmHandler, existingName, mode } = props;

  const [isPublic, setIsPublic] = useState(isVisible || false);
  const [usersAllowedToInvite, setUsersAllowedToInvite] = useState(false);
  const [description, setDescription] = useState(descriptText);
  const [name, setName] = useState(existingName || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const classes = useStyles();

  const confirmActionHandler = () => {
    const data = { isPublic, usersAllowedToInvite, description, name };
    confirmHandler(data, setIsModalOpen);
  };

  const ConfirmIcon = settingsTexts[mode].ConfirmIcon;

  return (
    <Container style={{ padding: "1rem", textAlign: "center" }}>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          title={settingsTexts[mode].title}
          confirm="Confirm"
          decline="Cancel"
          confirmActionHandler={confirmActionHandler}
        >
          {isPublic && (
            <AlertMessage
              alertStyles={classes.alertMsg}
              severity="warning"
              action={settingsTexts[mode].alertMsg}
              handler={() => {}}
            />
          )}
          <Typography>{settingsTexts[mode].modalConfirmText}</Typography>
        </Modal>
      )}

      <Typography
        variant="h4"
        component="h1"
        className={classes.operationTitle}
      >
        {settingsTexts[mode].title}
      </Typography>

      <TextInput
        value={name}
        setValue={setName}
        type="text"
        label={settingsTexts[mode].nameText}
        variant="outlined"
        required
      />

      <ConfigurationItem
        description={settingsTexts[mode].visibilityText}
        text={settingsTexts[mode].visibilityStates}
        value={isPublic}
        setValue={setIsPublic}
        isAdmin
      />

      {mode !== "profile" && (
        <ConfigurationItem
          description={settingsTexts[mode].invitationText}
          text={settingsTexts[mode].invitationStates}
          value={usersAllowedToInvite}
          setValue={setUsersAllowedToInvite}
          isAdmin
        />
      )}
      <TextInput
        value={description}
        setValue={setDescription}
        type="text"
        label={settingsTexts[mode].descriptionText}
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
        {settingsTexts[mode].confirmText}
      </Button>
    </Container>
  );
}
