import React, { useState } from "react";
import ConfigurationItem from "./ConfigurationItem";
import TextInput from "../TextInput";
import { Container, Paper, Button, Typography } from "@material-ui/core";
// import AlertMessage from "../Layout/AlertMessage";
// import * as alertTypes from "../../constants/alertTypes";
import Modal from "../Layout/Modal/Modal";
import { makeStyles } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  alertMsg: {
    margin: theme.spacing(3),
  },
  button: {
    margin: `${theme.spacing(3)}px auto`,
  },
}));

export default function Settings(props) {
  const [settings, setSettings] = useState(props);
  const [description, setDescription] = useState(props.description);
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

  return (
    <Container>
      <Paper style={{ padding: "2rem", textAlign: "center" }} elevation={3}>
        {isModalOpen && (
          <Modal
            open={isModalOpen}
            setOpen={setIsModalOpen}
            title="Update Settings"
            confirm="Confirm"
          >
            <Typography>
              Are you sure you want to change this settings?
            </Typography>
          </Modal>
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
          description="Allow other users to invite with a one-time link "
          text={["Deny", "Allow"]}
          value={settings.usersAllowedToInvite}
          handleToggle={handleToggle}
          name="usersAllowedToInvite"
          isAdmin
        />
        <TextInput
          value={description}
          setValue={setDescription}
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
          startIcon={<SaveIcon />}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          Save Settings
        </Button>
      </Paper>
    </Container>
  );
}
