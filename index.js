const express = require('express');
const execSync = require('child_process').execSync;
const layout = require('./layout');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
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

app.post('/', (req, res) => {
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
