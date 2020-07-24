import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

import { fetchUserProfile, submitProfileChanges } from "../store/actions";
import * as alertTypes from "../constants/alertTypes";
import CircularLoading from "../components/Layout/CircularLoading";
import AlertMessage from "../components/Layout/AlertMessage";
import UserProfile from "../components/UserInfo/UserProfile";
import Settings from "../components/Settings/Settings";

export default function Profile() {
  const { userId } = useParams();
  const history = useHistory();

  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const activeUser = useSelector((state) => state.userData.activeUser);
  const loading = useSelector((state) => state.UI.loading);

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
  }, [dispatch, userId, currentUser]);

  const onConfirmSaveSettings = (settingsData, setIsModalOpen) => {
    const finishAction = () => {
      setIsModalOpen(false);
      setIsEditing(false);
    };
    dispatch(submitProfileChanges(currentUser.uid, settingsData, finishAction));
  };

  const onClickRedirectHandler = (e) => {
    e.preventDefault();
    history.push("/dashboard");
  };

  const isActiveUserCurrentUser = userId === currentUser.uid;

  //si hay un activeUser y activeUser es el param de la url
  if (Object.keys(activeUser).length && activeUser.userId === userId) {
    return isActiveUserCurrentUser && isEditing ? (
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
    );
  } else if (loading) {
    return <CircularLoading />;
  } else {
    return (
      <AlertMessage
        severity="error"
        action={alertTypes.FETCH_USER_PROFILE_FAILED}
        handler={onClickRedirectHandler}
      />
    );
  }
}
