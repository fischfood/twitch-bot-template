const channel = 'username';

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