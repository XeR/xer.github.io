(function() {
	/* padStart polyfill */
	if(!String.prototype.padStart) {
		String.prototype.padStart = function(targetLength, padString) {
			if(undefined === padString)
				padString = " ";

			var str = String(this);
			var len = targetLength - str.length;

			if(len <= 0)
				return this;

			return padString.repeat(0 | (len / str.length))
				+ padString.substr(0, len % str.length)
				+ str;
		};
	}

	/* Executed at each tick to refresh the clock */
	function update()
	{
		var date  = new Date();
		var hours = ("" + date.getHours())        .padStart(2, "0");
		var mins  = ("" + date.getMinutes())      .padStart(2, "0");
		var secs  = ("" + date.getSeconds())      .padStart(2, "0");
		var ms    = ("" + date.getMilliseconds()) .padStart(3, "0");

		document.getElementById("clock").textContent =
			hours + ":" + mins + ":" + secs + "." + ms;

		requestAnimationFrame(update);
	}

	/* Ignite */
	if("loading" === document.readyState)
		document.addEventListener("DOMContentLoaded", function() {
			update();
		});
	else
		update();
})();
