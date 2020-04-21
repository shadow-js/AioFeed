import { MdVideoCall } from "react-icons/md";
import { MdVideocam } from "react-icons/md";
import { MdVideocamOff } from "react-icons/md";
import axios from "axios";
import React, { useState, useContext, useRef, useEffect } from "react";

// import VodsContext from "./VodsContext";
import AccountContext from "./../../account/AccountContext";
import { VodAddRemoveButton } from "./../../sharedStyledComponents";
import AddVodChannel from "./AddVodChannel";
import Util from "../../../util/Util";

/**
 * @param {String} channel - channel name
 * @param {String} [loweropacity] - overwrite opacity (0.5)
 * @param {String} [marginright] - overwrite marginright (7px;)
 */

export default ({ channel, loweropacity, marginright }) => {
  // const { channels, setChannels } = useContext(VodsContext);
  const channels = Util.getLocalstorage("VodChannels");
  const { authKey, username } = useContext(AccountContext);
  const [isHovered, setIsHovered] = useState();
  const [vodEnabled, setVodEnabled] = useState(channels.includes(channel.toLowerCase()));
  const vodButton = useRef();

  async function removeChannel(channel) {
    try {
      const index = (channels || Util.getLocalstorage("VodChannels")).indexOf(
        channel.toLowerCase()
      );
      const existingChannels = [...channels];
      existingChannels.splice(index, 1);
      // setChannels(existingChannels);
      localStorage.setItem("VodChannels", JSON.stringify(existingChannels));

      await axios
        .put(
          `https://44rg31jaa9.execute-api.eu-north-1.amazonaws.com/Prod/monitored-channels/update`,
          {
            username: username,
            authkey: authKey,
            channels: existingChannels,
          }
        )
        .catch((err) => {
          console.error(err);
        });
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    const handleMouseOver = () => {
      setIsHovered(true);
    };

    const handleMouseOut = () => {
      setIsHovered(null);
    };

    if (vodButton.current) {
      const refEle = vodButton.current;
      refEle.addEventListener("mouseenter", handleMouseOver);
      refEle.addEventListener("mouseleave", handleMouseOut);

      return () => {
        refEle.removeEventListener("mouseenter", handleMouseOver);
        refEle.removeEventListener("mouseleave", handleMouseOut);
      };
    }
  }, []);

  return (
    <VodAddRemoveButton
      className='VodButton'
      marginright={marginright}
      ref={vodButton}
      loweropacity={loweropacity}
      title={vodEnabled ? `Disable ${channel} vods` : `Enable ${channel} vods`}
      vodenabled={vodEnabled.toString()}
      variant='link'
      onClick={() => {
        if (vodEnabled) {
          removeChannel(channel);
          setVodEnabled(false);
        } else {
          AddVodChannel({ channel, username, authKey });
          setVodEnabled(true);
        }
      }}>
      {vodEnabled ? (
        isHovered ? (
          <MdVideocamOff size={24} color='red' />
        ) : (
          <MdVideocam size={24} color='green' />
        )
      ) : (
        <MdVideoCall size={24} />
      )}
    </VodAddRemoveButton>
  );
};
