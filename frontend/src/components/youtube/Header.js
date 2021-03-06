import { MdFormatListBulleted } from "react-icons/md";
import { MdRefresh } from "react-icons/md";
import { Spinner } from "react-bootstrap";
import { FaYoutube } from "react-icons/fa";
import Alert from "react-bootstrap/Alert";
import Moment from "react-moment";
import Popup from "reactjs-popup";
import React from "react";

import styles from "./Youtube.module.scss";
import Util from "../../util/Util";
import {
  RefreshButton,
  HeaderTitle,
  HeaderContainer,
  ButtonList,
} from "./../sharedStyledComponents";
import RenderFollowedChannelList from "./channelList/RenderFollowedChannelList";
import { HeaderLeftSubcontainer } from "./../twitch/StyledComponents";
import ReAuthenticateButton from "../navigation/sidebar/ReAuthenticateButton";

const SubFeedError = (props) => {
  const { error } = props;
  let alertError;
  let alertVariant;

  if (error && error.code) {
    switch (error.code) {
      case 401:
        alertError =
          error.errors[0].reason + " - Authendication expired and only cache used instead.";
        alertVariant = "danger";
        break;
      case 403:
        alertError = error.errors[0].reason + " - Only cache used instead.";
        alertVariant = "warning";
        break;
      default:
        alertError = error.errors[0].reason;
        alertVariant = "warning";
        break;
    }

    return (
      <>
        <Alert
          key={error.errors[0].reason}
          className={styles.requestError}
          variant={alertVariant || "warning"}>
          {alertError}
          {error.code === 401 && (
            <ReAuthenticateButton
              serviceName={"Youtube"}
              style={{ marginLeft: "15px", display: "inline-block" }}
            />
          )}
        </Alert>
      </>
    );
  } else {
    return "";
  }
};

export default (data) => {
  return (
    <HeaderContainer>
      <HeaderLeftSubcontainer>
        <RefreshButton
          onClick={data.refresh}
          // disabled={data.requestError && data.requestError.code === 403 ? true : false}
        >
          {!data.isLoaded ? (
            <div className='SpinnerWrapper'>
              <Spinner animation='border' role='status' style={Util.loadingSpinnerSmall}></Spinner>
            </div>
          ) : (
            <MdRefresh size={34} />
          )}
        </RefreshButton>

        <Moment key={data.isLoaded || new Date()} className={styles.lastRefresh} fromNow>
          {data.isLoaded || new Date()}
        </Moment>
      </HeaderLeftSubcontainer>
      <SubFeedError error={data.requestError}></SubFeedError>
      <HeaderTitle>
        <FaYoutube size={32} style={{ color: "#a80000" }} />
        Youtube
      </HeaderTitle>
      <Popup
        placeholder='""'
        arrow={false}
        trigger={
          <div
            style={{
              width: "50px",
              minWidth: "50px",
              marginLeft: "250px",
              justifyContent: "right",
              display: "flex",
            }}>
            <ButtonList>
              <MdFormatListBulleted
                size={22}
                style={{
                  height: "22px",
                  alignItems: "center",
                  display: "flex",
                }}
              />
            </ButtonList>
          </div>
        }
        position='left top'
        className='popupModal'>
        <RenderFollowedChannelList followedChannels={data.followedChannels} />
      </Popup>
    </HeaderContainer>
  );
};
