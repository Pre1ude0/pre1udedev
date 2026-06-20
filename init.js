// Weird funky fix due to the fact that node decided to
// no longer shut down on SIGINT, fucking up my whole
// production deployment pipeline
//
// If you (yes, YOU) are reading this and have an idea
// on why this could be happening with node-adapter
// on sveltekit 5, please shoot me a message on any
// of the linked profiles/user instances on my page!
//
// <3

process.on('SIGINT', function() => {
	console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
	process.exit(0);
});

import('./build/index.js');
