import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import UserProfile from "../components/Profile/UserProfile";
import Settings from "../components/Settings/Settings";
import * as actions from "../store/actions";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { userId } = useParams();

  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const activeUser = useSelector((state) => state.userData.activeUser);


  useEffect(() => {
    dispatch(actions.fetchUserProfile(currentUser, userId));
  }, [dispatch, userId, currentUser]);

  const onConfirmSaveSettings = (settingsData, setIsModalOpen) => {
    const userData = {
      isVisible: settingsData.isPublic,
      status: settingsData.description,
      username: settingsData.name,
      avatar: settingsData.imageURL
    };
    const finishAction = () => {
      setIsModalOpen(false);
      setIsEditing(false);
    };
    dispatch(actions.submitProfileChanges(currentUser.uid, userData, finishAction));
  };

  const isActiveUserCurrentUser = userId === currentUser.uid;

  return Object.keys(activeUser).length ? (
    isActiveUserCurrentUser && isEditing ? (
      <Settings
        mode="profile"
        confirmHandler={onConfirmSaveSettings}
        isVisible={activeUser.isVisible}
        descriptText={activeUser.status}
        existingName={activeUser.username}
        imageUrl={activeUser.avatar}
        setIsEditing={setIsEditing}
      />
    ) : (
      <UserProfile
        avatar={activeUser.avatar}
        username={activeUser.username}
        status={activeUser.status}
        email={activeUser.email}
        isCurrentUser={isActiveUserCurrentUser}
        setIsEditing={setIsEditing}
      />
    )
  ) : null;
}
