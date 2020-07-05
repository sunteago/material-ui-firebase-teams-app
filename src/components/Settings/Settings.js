import React, { useState } from "react";
import ConfigurationItem from "./ConfigurationItem";
import TextInput from "../TextInput";
import { Paper } from "@material-ui/core";

export default function Settings(props) {
  const [settings, setSettings] = useState(props);
  const [description, setDescription] = useState(props.description);
  const handleToggle = (value) => {
    setSettings((prevState) => {
      return {
        ...prevState,
        [value]: !prevState[value],
      };
    });
  };

  return (
    <Paper style={{ width: "60%", padding: "2rem" }} elevation={3}>
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
        text={["Allow", "Deny"]}
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
      />
    </Paper>
  );
}
