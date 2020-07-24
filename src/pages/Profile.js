import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";

import UserProfile from "../components/UserInfo/UserProfile";
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
    const finishAction = () => {
      setIsModalOpen(false);
      setIsEditing(false);
    };
    dispatch(
      actions.submitProfileChanges(currentUser.uid, settingsData, finishAction)
    );
  };

  const isActiveUserCurrentUser = userId === currentUser.uid;

  return Object.keys(activeUser).length ? (
    isActiveUserCurrentUser && isEditing ? (
      <>
        <Helmet>
          <title>Profile Settings | TeamsApp</title>
        </Helmet>
        <Settings
          mode="profile"
          confirmHandler={onConfirmSaveSettings}
          isVisible={activeUser.isVisible}
          descriptText={activeUser.status}
          existingName={activeUser.name}
          imageUrl={activeUser.avatar}
          setIsEditing={setIsEditing}
        />
      </>
    ) : (
      <>
        <Helmet>
          <title>{activeUser.name}'s profile | TeamsApp</title>
        </Helmet>
        <UserProfile
          user={activeUser}
          isCurrentUser={isActiveUserCurrentUser}
          setIsEditing={setIsEditing}
        />
      </>
    )
  ) : null;
}
