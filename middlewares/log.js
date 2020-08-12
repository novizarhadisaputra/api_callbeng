module.exports = async (req, res) => {
	const { rawHeaders, httpVersion, method, socket, url } = req;
	console.log(
		JSON.stringify({
			timestamp: Date.now(),
			rawHeaders,
			httpVersion,
			method,
			remoteAddress,
			remoteFamily,
			url
		})
	);
};
