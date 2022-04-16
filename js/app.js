// Start Twitch Chat
client.connect();

// Giveaway entries not enabled
let startGiveaway = false;

// channel: Your username / channel
// tags: Information about the user submitting the message
// 		- Examples: badges, color (username hex color), display-name, first-msg, subscriber, etc.
// message: The message submitted to the chat by the user (Ex. !lurk)
// self: Checks if the message being output is by a viewer (false), or by this chat bot (true)
client.on('message', (channel, tags, message, self) => {

	// Check user information to see if they are a mod, or the streamer
	const badges = tags.badges || {};
	const isBroadcaster = badges.broadcaster;
	const isMod= badges.moderator;
	const isModUp = isMod || isBroadcaster;

	// If the message is from this bot, stop here, ignore the rest below
	if (self) return;

	// Get streamer username for comparisons
	const {username} = tags;

	// Get the container to output messages
	let output = document.getElementById('output');

	/* END SETUP */
	/* CHAT MESSAGES START HERE */

	/* --
	 * 01. Streamer Specific - Only will respond to the person streaming
	 * 02. Streamer yes/no? - Command that outputs different messages if your are the streamer or not
	 * 03. Streamer and Moderator specific commands
	 * 04. Enter into a giveaway
	 * 05. Randomized Lurk Messages
	 */


	// 01. Streamer Specific - Only will respond to the person streaming
	if (username.toLowerCase() === channel.toLowerCase() || '#' + username.toLowerCase() === channel.toLowerCase()) {
    
    	// if chat message starts with !onlyme, and it is sent by the streamer:
		if (message.toLowerCase() === '!onlyme') {
			client.say(channel, "Hey streamer, How's it going?" );
		}

  	}


  	// 02. Streamer yes/no? - Command that outputs different messages if your are the streamer or not
  	if (message.toLowerCase() === '!whoami') {
    
		if (username.toLowerCase() === channel.toLowerCase() || '#' + username.toLowerCase() === channel.toLowerCase()) {
			client.say(channel, "You're the person broadcasting, what are you doing in chat?" );
		} else {
			client.say(channel, "Hey " + `@${tags.username}` + ", this isn't your channel, but welcome in!" );
		}
		
  	}

  	// 03. Streamer and Moderator specific commands
	if ( isModUp ) {
    
		if (message.toLowerCase() === '!startgiveaway') {
			startGiveaway = true;
		}
		
		if (message.toLowerCase() === '!endgiveaway') {
			startGiveaway = false;
		}
  	}

  	// 04. If giveaway is active, allow entries
	if (startGiveaway && message.toLowerCase().startsWith('!enter')) {
		output.textContent = parseInt( message.match(/\d+/)[0] );
	}


	// Possible Lurk Messages
	const lurks = [
		"Someone is lurking",
		"Have a great lurk!",
		"We'll miss you",
		"Lurk away my good friend",
	]

	// 05. Randomized Lurk Messages
	if ( message.toLowerCase().startsWith('!lurk')) {

		// Generate a random number between 0 and however many items are in the lurks array
		let val = Math.floor(Math.random() * lurks.length);

		// Throw the random lurk message in chat
		client.say(channel, lurks[val] );
	}

});
