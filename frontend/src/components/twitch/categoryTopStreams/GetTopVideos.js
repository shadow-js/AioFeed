import axios from "axios";

import { getCookie } from "./../../../util/Utils";
import AddVideoExtraData from "./../AddVideoExtraData";

export default async (category, sortBy, page) => {
  let game;
  let error;
  const nrStreams =
    Math.floor((document.documentElement.clientWidth - 150) / 350) *
    Math.floor((document.documentElement.clientHeight - (65 + 60)) / 351);

  if (category && category !== "undefined") {
    game = await axios
      .get(`https://api.twitch.tv/helix/games`, {
        params: {
          name: category,
        },
        headers: {
          Authorization: `Bearer ${getCookie("Twitch-access_token")}`,
          "Client-ID": process.env.REACT_APP_TWITCH_CLIENT_ID,
        },
      })
      .then((res) => {
        return res.data.data[0];
      });
  } else {
    game = { id: null };
  }
  try {
    const topVideos = await axios
      .get(`https://api.twitch.tv/helix/videos`, {
        params: {
          first: nrStreams,
          game_id: game.id,
          sort: sortBy && sortBy.toLowerCase(),
          type: "all",
          period: "all",
          after: page ? page.pagination.cursor : null,
        },
        headers: {
          Authorization: `Bearer ${getCookie("Twitch-access_token")}`,
          "Client-ID": process.env.REACT_APP_TWITCH_CLIENT_ID,
        },
      })
      .catch((e) => {
        console.error(e.message);
        error = e;
        return e;
      });

    await AddVideoExtraData(topVideos, false);

    return { topData: topVideos.data, error };
  } catch (e) {
    console.error(e);
  }
};
