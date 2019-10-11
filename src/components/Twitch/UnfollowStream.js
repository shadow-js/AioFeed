import axios from "axios";

import Utilities from "../../utilities/Utilities";

async function UnfollowStream(data) {
  console.log("TCL: UnfollowStream -> data", data);
  const myUserId = await axios
    .get(`https://api.twitch.tv/helix/users?`, {
      params: {
        login: `mambans`,
      },
      headers: {
        Authorization: `Bearer ${Utilities.getCookie("Twitch-access_token")}`,
        "Client-ID": process.env.REACT_APP_TWITCH_CLIENT_ID,
      },
    })
    .catch(error => {
      console.error(error);
    });

  console.log("TCL: UnfollowStream -> myUserId", myUserId);

  axios
    .delete(
      `https://api.twitch.tv/kraken/users/${myUserId.data.data[0].id}/follows/channels/${data.user_id}`,
      {
        headers: {
          Authorization: `OAuth ${Utilities.getCookie("Twitch-access_token")}`,
          "Client-ID": process.env.REACT_APP_TWITCH_CLIENT_ID,
          Accept: "application/vnd.twitchtv.v5+json",
        },
      }
    )
    .then(() => {
      console.log("then");

      data.refresh();
    })
    .catch(error => {
      console.error(error);
    });
}

export default UnfollowStream;