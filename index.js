const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const execSync = require('child_process').execSync;
const layout = require('./layout');
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: [ 'jdfhs7df8s8' ]
	})
);
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.send(
		layout({
			content: `
			<div id="addLinkContainer" class="full-screen-opaque">
			<div class="panel" id="addLinkPanel">
				<h3 class="header">Sign in</h3>
				<form id="authForm" method="POST">
				<input type="email" name="email" id="email" placeholder="Email">
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
	//signup
	const { email, password, passwordConfirmation } = req.body;

	const existingUser = await usersRepo.getOneBy({ email });
	if (existingUser) {
		return res.send('Email in use');
	}
	const user = await usersRepo.create({ email, password });
	req.session.userId = user.id;
	res.send('Account created!');

	//signin
	// const { email, password } = req.body;
	// const user = await usersRepo.getOneBy({ email });

	// if (!user) {
	// 	return res.send('Email not found');
	// }

	// if (user.password !== password) {
	// 	return res.send('Invalid password');
	// }

	// req.session.userId = user.id;

	// res.send('You are signed in!');
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
