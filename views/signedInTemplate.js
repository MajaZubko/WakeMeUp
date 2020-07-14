const layout = require('./layout');

module.exports = () => {
	return layout({
		content: `
            <form method="POST">
                <button>Wake me up</button>
            </form>
            <a href="/signout">Sign Out</a>
        `
	});
};
