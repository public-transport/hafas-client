"use strict";

const createClient = require("../..");
const insaProfile = require(".");

const client = createClient(insaProfile);

// from Magdeburg-Neustadt to Magdeburg-Buckau
// client.journeys('008010226', '008013456', {results: 1})
client
	.departures("008010226", { duration: 5 })
	// client;
	// .locations("Magdeburg Hbf", {
	// 	results: 2
	// })
	// .locations("Kunstmuseum Kloster Unser Lieben Frauen Magdeburg", {
	// 	results: 2
	// })
	// client.location('008010226') // Magdeburg-Neustadt
	// client
	// 	.nearby(
	// 		{
	// 			type: "location",
	// 			latitude: 52.148842,
	// 			longitude: 11.641705
	// 		},
	// 		{ distance: 200 }
	// 	)

	.then(data => {
		console.log(require("util").inspect(data, { depth: null }));
	})
	.catch(console.error);
