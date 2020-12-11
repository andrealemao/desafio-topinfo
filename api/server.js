const express = require('express');
const path = require('path');
const app = express(),
	bodyParser = require("body-parser");
port = 3080;
const axios = require('axios').default;

// place holder for the data
let repositories = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/dist')));

app.get('/api/repositories/:language', (req, res) => {
	axios.get(`https://api.github.com/search/repositories?q=language:${req.params.language}&sort=stars&page=1`)
		.then((response) => {
			repositories = response.data.items
			res.json(repositories)
		})
		.catch((error) => {
			if (error.response.status == 422 && error.response.data.errors[0].code == "invalid") {
				
				res.status(442).send({
					status: 442,
					message: "Language invalid or doesn't exists!"
				})
				
				// console.log("Ocorreu um erro, tente novamente!")
				// console.log(error.response.data.errors.toString())
			} else {
				console.log("Ocorreu um erro, tente novamente!")
			}
		})
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.listen(port, () => {
	console.log(`Server listening on the port::${port}`);
});