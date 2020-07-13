const layout = require('./layout');

module.exports = () => {
	return layout({
		content: `
            <form>
                <button>Wake me up</button>
            </form>
        `
	});
};
