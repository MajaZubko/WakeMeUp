module.exports = ({ content }) => {
	return `
    <!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="css/main.css">
            <title>Wake me up</title>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `;
};
