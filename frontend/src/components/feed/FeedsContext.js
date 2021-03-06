import React, { useState } from "react";

import { getCookie } from "./../../util/Utils";

const FeedsContext = React.createContext();

export const FeedsProvider = ({ children }) => {
  const [enableTwitch, setEnableTwitch] = useState(
    getCookie("Twitch-access_token") && getCookie("Twitch_FeedEnabled")
  );

  const [showTwitchSidebar, setShowTwitchSidebar] = useState(
    getCookie("Twitch-access_token") && getCookie("Twitch_SidebarEnabled")
  );

  const [enableTwitter, setEnableTwitter] = useState(getCookie("Twitter_FeedEnabled"));

  const [twitterListName, setTwitterListName] = useState(getCookie("Twitter-Listname"));

  const [enableYoutube, setEnableYoutube] = useState(
    getCookie(`Youtube-access_token`) && getCookie("Youtube_FeedEnabled")
  );

  const [enableTwitchVods, setEnableTwitchVods] = useState(
    getCookie(`Twitch-access_token`) && getCookie("TwitchVods_FeedEnabled")
  );

  const [twitchVideoHoverEnable, setTwitchVideoHoverEnable] = useState(
    getCookie("TwitchVideoHoverEnabled")
  );

  const [youtubeVideoHoverEnable, setYoutubeVideoHoverEnable] = useState(
    getCookie("YoutubeVideoHoverEnabled")
  );

  const [isEnabledOfflineNotifications, setIsEnabledOfflineNotifications] = useState(
    getCookie("Twitch_offline_notifications")
  );
  const [isEnabledUpdateNotifications, setIsEnabledUpdateNotifications] = useState(
    getCookie("Twitch_update_notifications")
  );

  return (
    <FeedsContext.Provider
      value={{
        enableTwitch: enableTwitch,
        setEnableTwitch: setEnableTwitch,
        enableYoutube: enableYoutube,
        setEnableYoutube: setEnableYoutube,
        enableTwitchVods: enableTwitchVods,
        setEnableTwitchVods: setEnableTwitchVods,
        twitchVideoHoverEnable: twitchVideoHoverEnable,
        setTwitchVideoHoverEnable: setTwitchVideoHoverEnable,
        youtubeVideoHoverEnable: youtubeVideoHoverEnable,
        setYoutubeVideoHoverEnable: setYoutubeVideoHoverEnable,
        setEnableTwitter: setEnableTwitter,
        enableTwitter: enableTwitter,
        twitterListName: twitterListName,
        setTwitterListName: setTwitterListName,
        isEnabledOfflineNotifications: isEnabledOfflineNotifications,
        setIsEnabledOfflineNotifications: setIsEnabledOfflineNotifications,
        showTwitchSidebar: showTwitchSidebar,
        setShowTwitchSidebar: setShowTwitchSidebar,
        isEnabledUpdateNotifications: isEnabledUpdateNotifications,
        setIsEnabledUpdateNotifications: setIsEnabledUpdateNotifications,
      }}>
      {children}
    </FeedsContext.Provider>
  );
};

export default FeedsContext;
