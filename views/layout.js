module.exports = ({ content }) => {
	return `
    <!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="css/main.css">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            <title>Wake me up</title>
        </head>
        <body>
            <div class="content">
            ${content}
            </div>
        </body>
        </html>
    `;
};
