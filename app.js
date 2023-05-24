const express = require('express')
const app = new express();

const port = 8000;


app.all('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.all('/files.please', async (req, res) => {
	const files = require('./scripts/files.js');

	const result = await files();

	res.send(result);
});

app.all('/**', (req, res) => {
	res.sendFile(__dirname + req.path);
});


app.listen(port, () => console.log(`Server working on port ${port}`));


process.on('unhandledRejection', async (error) => {
	console.log(`Unhandled rejection: ${error}`);
});

process.on('uncaughtException', async (error) => {
	console.log(`Uncaught exception: ${error}`);
});

process.on('warning', async (info) => {
	console.log(`Warning: ${info}`);
});
