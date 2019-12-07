module.exports = {
  vodChannels,
  addVodChannels,
  removeVodChannels,
  createAccount,
  loginAccount,
  connectTwitch,
  connectYoutube,
  updateProfileImg,
};

const mysql = require("promise-mysql");
const config = require("../config/config.json");

let db;

/**
 * Main function.
 * @async
 * @returns void
 */
(async function() {
  db = await mysql.createConnection(config);

  process.on("exit", () => {
    db.end();
  });
})();

async function vodChannels() {
  let sql = "Call show_vod_channels;";
  let res;

  res = await db.query(sql);

  return res[0];
}

async function addVodChannels(channel) {
  let sql = `Call add_channel('${channel.trim()}');`;
  let res;

  res = await db.query(sql);

  return res[0];
}

async function removeVodChannels(channel) {
  let sql = `Call remove_channel('${channel.trim()}');`;
  let res;

  res = await db.query(sql);

  return res[0];
}

async function createAccount(name, email, password) {
  let sql = `Call Create_Account('${name.trim()}', '${email.trim()}', '${password}');`;
  const result = await db.query(sql).then(res => {
    return res[0];
  });

  return result;
}

async function loginAccount(p_name) {
  let sql = `Call Account_Login(?);`;
  let res;

  res = await db.query(sql, [p_name]);

  return res[0];
}

async function connectTwitch(p_name, p_email, p_token) {
  let sql = `CALL Update_TwitchToken(?, ?, ?);`;
  let res;

  res = await db.query(sql, [p_name, p_email, p_token]);

  return res[0];
}

async function connectYoutube(p_name, p_email, p_token) {
  let sql = `CALL Update_YoutubeToken(?, ?, ?);`;
  let res;

  res = await db.query(sql, [p_name, p_email, p_token]);

  return res[0];
}

async function updateProfileImg(p_img, p_name, p_email) {
  let sql = `CALL Update_ProfileImg(?, ?, ?);`;
  let res;

  res = await db.query(sql, [p_img, p_name, p_email]);

  return res[0];
}