import { FaTwitch } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { Spinner } from "react-bootstrap";
import React from "react";

import { HeaderContainerTwitchLive, HeaderLeftSubcontainer } from "./../StyledComponents";
import { RefreshButton, HeaderTitle } from "./../../sharedStyledComponents";
import ChannelSearchList from "./../channelList";
import CountdownCircleTimer from "./CountdownCircleTimer";
import Util from "../../../util/Util";

export default ({ data, refresh }) => {
  // eslint-disable-next-line no-unused-vars
  const { refreshing, autoRefreshEnabled, refreshTimer, followedChannels } = data;

  return (
    <HeaderContainerTwitchLive>
      <HeaderLeftSubcontainer>
        <RefreshButton onClick={refresh}>
          {refreshing ? (
            <div className='SpinnerWrapper'>
              <Spinner
                animation='border'
                role='status'
                variant='light'
                style={Util.loadingSpinnerSmall}
              />
            </div>
          ) : autoRefreshEnabled ? (
            <CountdownCircleTimer
              key={refreshTimer}
              startDuration={parseFloat(((refreshTimer - new Date().getTime()) / 1000).toFixed(0))}
              duration={25}
            />
          ) : (
            <MdRefresh size={34} />
          )}
        </RefreshButton>
      </HeaderLeftSubcontainer>
      <HeaderTitle>
        <FaTwitch size={32} style={{ color: "#6f166f" }} />
        Twitch Live
      </HeaderTitle>
      <ChannelSearchList />
    </HeaderContainerTwitchLive>
  );
};
