// Your username, case sensitive
const channel = 'username';

// bot_username = Username of the bot outputting the messages in chat
// bot_access_token = Authentication token needed to connect to Twitch
// [channel] = Pulls from the channel defined above
const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  identity: {
    username: 'bot_username',
    password: 'oauth:bot_access_token'
  },
  channels: [channel],
});