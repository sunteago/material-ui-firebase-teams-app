import React, { useState } from "react";

import { Grid, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import ConfigurationItem from "./ConfigurationItem";
import settingsTexts from "../../utils/settingsTexts";
import TextInput from "../TextInput";
import AlertMessage from "../Layout/AlertMessage";
import ImageInput from "./ImageInput";
import Modal from "../Layout/Modal/Modal";

const useStyles = makeStyles((theme) => ({
  settingsContainer: {
    padding: "1rem",
    textAlign: "center",
  },
  operationTitle: {
    marginBottom: theme.spacing(4),
  },
  alertMsg: {
    margin: theme.spacing(1),
  },
  button: {
    margin: `${theme.spacing(3)}px auto`,
  },
  image: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    cursor: "pointer",
    margin: "0 auto",
  },
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
}));

export default function Settings(props) {
  const {
    isVisible,
    descriptText,
    confirmHandler,
    existingName,
    imageUrl,
    mode,
    setIsEditing,
  } = props;

  const [imageURL, setImageURL] = useState(imageUrl || "");
  const [isPublic, setIsPublic] = useState(isVisible || false);
  const [usersAllowedToInvite, setUsersAllowedToInvite] = useState(false);
  const [description, setDescription] = useState(descriptText);
  const [name, setName] = useState(existingName || "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const classes = useStyles();
  
  const confirmActionHandler = () => {
    const data = {
      isPublic,
      usersAllowedToInvite,
      description,
      name,
      imageURL,
    };
    confirmHandler(data, setIsModalOpen);
  };

  const ConfirmIcon = settingsTexts[mode].ConfirmIcon;

  return (
    <Grid
      container
      spacing={4}
      justify="center"
      className={classes.settingsContainer}
    >
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

      {settingsTexts[mode].title && (
      <Grid item xs={12}>
        <Typography
          variant="h4"
          component="h1"
          className={classes.operationTitle}
        >
          {settingsTexts[mode].title}
        </Typography>
      </Grid>
      )}

      <Grid item xs={12}>
        <ImageInput
          classes={classes}
          imageURL={imageURL}
          setImageURL={setImageURL}
        />
      </Grid>

      <Grid item xs={12} sm={8}>
        <ConfigurationItem
          description={settingsTexts[mode].visibilityText}
          text={settingsTexts[mode].visibilityStates}
          value={isPublic}
          setValue={setIsPublic}
          isAdmin
        />
      </Grid>

      {mode !== "profile" && (
        <Grid item xs={12} sm={8}>
          <ConfigurationItem
            description={settingsTexts[mode].invitationText}
            text={settingsTexts[mode].invitationStates}
            value={usersAllowedToInvite}
            setValue={setUsersAllowedToInvite}
            isAdmin
          />
        </Grid>
      )}

      <Grid item xs={12} sm={8}>
        <TextInput
          value={name}
          setValue={setName}
          type="text"
          label={settingsTexts[mode].nameText}
          variant="outlined"
          required
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={8}>
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
      </Grid>

      <Grid item container justify="center" xs={12} sm={8}>
        {mode === "profile" && (
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              size="large"
              className={classes.button}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
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
        </Grid>
      </Grid>
    </Grid>
  );
}
