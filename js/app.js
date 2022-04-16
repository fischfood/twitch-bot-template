// Start Twitch Chat
client.connect();

// Giveaway entries not enabled
let startGiveaway = false;

let giveawayEmpty = document.getElementById('giveaway-no-entries');
let giveawayList = document.getElementById('giveaway-list');
let giveawayEntered = [];

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

	/* END SETUP */
	/* CHAT MESSAGES START HERE */

	/* --
	 * 01. Streamer Specific - Only will respond to the person streaming
	 * 02. Streamer yes/no? - Command that outputs different messages if your are the streamer or not
	 * 03. Streamer and Moderator specific commands
	 * 04. Giveaway Logic
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
    
		if (message.toLowerCase() === '!modstuff') {
			client.say(channel, "You're doing mod things!" );
		}
	}

		
	if (message.toLowerCase() === '!canido') {
		if ( isModUp ) {
			client.say(channel, "Mod? Streamer? Doesn't matter, you have permission" );
		} else {
			client.say(channel, "You have no power here!" );
		}
  	}

  	// 04. Giveaway Logic
  	if ( isModUp ) {
    
		if (message.toLowerCase() === '!startgiveaway') {

			if ( startGiveaway ) {
				client.say(channel, "A giveaway is already open" );
			} else {
				startGiveaway = true;
				client.say(channel, "A giveaway is open for submissions" );
			}
		}
		
		if (message.toLowerCase() === '!endgiveaway') {

			if ( startGiveaway ) {
				startGiveaway = false;
				client.say(channel, "The giveaway is now closed. Good luck!" );
			} else {
				client.say(channel, "There is not a giveaway currently open" );
			}
		}

		if (startGiveaway === false && message.toLowerCase() === '!cleargiveaway') {
			giveawayList.innerHTML = '';
			giveawayEmpty.classList.remove("hide");
			giveawayEntered = [];
		}
  	}

	if ( message.toLowerCase() === ('!enter') ) {

		giveawayEmpty.classList.add("hide");

		console.log( giveawayEntered );

		let user = tags.username
		
		if ( startGiveaway ) {

			if ( giveawayEntered.includes( tags.username ) ) {
				client.say(channel, "Sorry, " + `@${tags.username}` + " you have already entered" );
			} else {
				giveawayEntered.push( tags.username );
				giveawayList.innerHTML += '<li>' + tags.username + '</li>';
				client.say(channel, `@${tags.username}` + " you are now entered to win" );
			}

		} else {
			client.say(channel, "There are no giveaways currently active" );
		}

		console.log( giveawayEntered );
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
