const express = require('express');
const execSync = require('child_process').execSync;
const layout = require('./layout');
const usersRepo = require('./repositories/users');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.send(
		layout({
			content: `
			<div id="addLinkContainer" class="full-screen-opaque">
			<div class="panel" id="addLinkPanel">
				<h3 class="header">Enter a password</h3>
				<form id="authForm" method="POST">
					<input type="password" name="password" id="password" placeholder="Password">

					<div id="addedCategories">

					</div>

					<input type="submit" id="submitButton" value="Submit"> 	

				</form>
			</div>
		</div>

				<form>
					<button>Wake me up</button>
				</form>
			`
		})
	);
});

app.post('/', async (req, res) => {
	const { password } = req.body;
});

app.get('/signedin', (req, res) => {
	res.send(
		layout({
			content: `
				<form method="POST">
					<button>Wake me up</button>
				</form>
			`
		})
	);
});

app.post('/signedin', (req, res) => {
	const output = execSync('dir', { encoding: 'utf-8' });
	console.log('Output was:\n', output);
	res.send(
		layout({
			content: `<h1>Now I'm woke</h1>
                    <form method="POST">
                        <button>Wake me up</button>
                    </form>`
		})
	);
});

app.listen(3000, () => {
	console.log('Listening');
});
