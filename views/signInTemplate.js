const layout = require('./layout');

const getError = (errors, prop) => {
	try {
		return errors.mapped()[prop].msg;
	} catch (err) {
		return '';
	}
};

module.exports = ({ errors }) => {
	return layout({
		content: `
        <div id="addLinkContainer" class="full-screen-opaque">
        <div class="panel" id="addLinkPanel">
            <h3 class="header">Sign in</h3>
            <form id="authForm" method="POST">
                <input type="email" name="email" id="email" placeholder="Email">
                ${getError(errors, 'email')}
                <input type="password" name="password" id="password" placeholder="Password">
                ${getError(errors, 'password')}
                <input type="submit" id="submitButton" value="Submit"> 	

            </form>
        </div>
    </div>

            <form>
                <button>Wake me up</button>
            </form>
        `
	});
};
