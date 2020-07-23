import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import formValidation from "../../utils/formValidation";

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
    deleteHandler,
    existingName,
    imageUrl,
    mode,
    setIsEditing,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("confirm");

  const [imageURL, setImageURL] = useState(imageUrl || "");
  const [isPublic, setIsPublic] = useState(isVisible || false);
  const [usersAllowedToInvite, setUsersAllowedToInvite] = useState(false);

  const classes = useStyles();
  const confirmActionHandler = () => {
    if (currentAction === "confirm") {
      const data = {
        isPublic,
        usersAllowedToInvite,
        description: values.description,
        name: values.displayName,
        imageURL,
      };
      confirmHandler(data, setIsModalOpen);
    } else {
      deleteHandler();
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    {description: descriptText || "", displayName: existingName || ""},
    () => onActionHandler("confirm"),
    formValidation
  );

  const onActionHandler = (action) => {
    setCurrentAction(action);
    setIsModalOpen(true);
  };

  const ConfirmIcon = settingsTexts[mode].ConfirmIcon;

  const isAlertShowing =
    (isPublic && currentAction === "confirm") || currentAction === "delete";

  return (
    <>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          title={settingsTexts[mode].title[currentAction]}
          confirm="Confirm"
          decline="Cancel"
          confirmActionHandler={confirmActionHandler}
        >
          {isAlertShowing && (
            <AlertMessage
              alertStyles={classes.alertMsg}
              severity="warning"
              action={settingsTexts[mode].alertMsg[currentAction]}
            />
          )}
          <Typography>
            {settingsTexts[mode].modalConfirmText[currentAction]}
          </Typography>
        </Modal>
      )}

      <Grid
        component='form'
        container
        spacing={4}
        justify="center"
        className={classes.settingsContainer}
      >
        {settingsTexts[mode].title[currentAction] && (
          <Grid item xs={12}>
            <Typography
              variant="h4"
              component="h1"
              className={classes.operationTitle}
            >
              {settingsTexts[mode].title[currentAction]}
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
            inputProps={{
              value: values.displayName,
              onChange: handleChange,
              name: 'displayName',
              helperText: errors.displayName,
              error: !!errors.displayName,
              type: "text",
              label: settingsTexts[mode].nameText,
              required: true,
              fullWidth: true,
              variant: "outlined",
              inputProps: {
                maxLength: 15
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextInput
            inputProps={{
              value: values.description,
              onChange: handleChange,
              name: 'description',
              helperText: errors.description,
              error: !!errors.description,
              type: "text",
              label: settingsTexts[mode].descriptionText,
              rows: 4,
              variant: "outlined",
              multiline: true,
              required: true,
              fullWidth: true,
              inputProps: {
                maxLength: 50,
              },
            }}
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
          {mode === "modifyGroup" && (
            <Grid item xs={12} sm={6}>
              <Button
                color="secondary"
                type="button"
                variant="contained"
                size="large"
                className={classes.button}
                onClick={() => onActionHandler("delete")}
              >
                Delete Group
              </Button>
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              type='submit'
              color="primary"
              size="large"
              className={classes.button}
              startIcon={<ConfirmIcon />}
              onClick={handleSubmit}
            >
              {settingsTexts[mode].confirmText}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
