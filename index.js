const express = require('express');
const { check, validationResult } = require('express-validator');

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const execSync = require('child_process').execSync;

const layout = require('./views/layout');
const usersRepo = require('./repositories/users');
const signInTemplate = require('./views/signInTemplate');
const signedInTemplate = require('./views/signedInTemplate');
const { requireEmailExists, requireValidPasswordForUser } = require('./validators');
const { requireLoggedIn } = require('./middleware');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: [ 'jdfhs7df8s8' ]
	})
);
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.send(signInTemplate({ req }));
});

app.post('/', [ requireEmailExists, requireValidPasswordForUser ], async (req, res) => {
	const errors = validationResult(req);
	console.log(errors);
	if (!errors.isEmpty()) {
		return res.send(signInTemplate({ errors }));
	}

	//signup
	// const { email, password, passwordConfirmation } = req.body;
	// const existingUser = await usersRepo.getOneBy({ email });
	// if (existingUser) {
	// 		return res.send('Email in use');
	// }
	//
	//
	// const user = await usersRepo.create({ email, password });
	// req.session.userId = user.id;
	// res.redirect('/signedin');

	//signin
	const { email } = req.body;
	const user = await usersRepo.getOneBy({ email });

	req.session.userId = user.id;

	res.redirect('/signedin');
});

app.get('/signout', (req, res) => {
	req.session = null;
	res.redirect('/');
});

app.get('/signedin', requireLoggedIn, (req, res) => {
	res.send(signedInTemplate());
});

app.post('/signedin', requireLoggedIn, (req, res) => {
	const output = execSync('sudo wakeonlan MACADRESS', { encoding: 'utf-8' });
	console.log('Output was:\n', output);
	res.send(
		layout({
			content: `<h1>Now I'm woke</h1>
                    <form method="POST">
                        <button>Wake me up</button>
					</form>
					<a href="/signout">Sign Out</a>`
		})
	);
});

app.listen(4000, () => {
	console.log('Listening');
});
