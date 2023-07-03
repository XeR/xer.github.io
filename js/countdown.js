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
		// No hash: in 10 mn
		if(!location.hash) {
			var target = new Date(Date.now() + 10 * 60 * 1000)
			location.hash = target.toISOString();
		}

		var target = new Date(location.hash.substr(1));
		var delta  = Math.max(0, target - new Date());

		var ms = ("" + (delta % 1000)).padStart(3, "0");
		delta -= ms;
		delta /= 1000;

		var secs = ("" + (delta % 60)).padStart(2, "0");
		delta -= secs;
		delta /= 60;

		var mins = ("" + (delta % 60)).padStart(2, "0");
		delta -= mins;
		delta /= 60;

		var hours = ("" + delta).padStart(2, "0");

		document.getElementById("clock").textContent =
			hours + ":" + mins + ":" + secs + "." + ms;

		requestAnimationFrame(update);
	}

	function init()
	{
		update();

		// music
		var start = document.getElementById("start");
		var loop  = document.getElementById("loop");

		if(start && loop) {
			loop.loop = true;
			start.addEventListener("ended", function() {
				loop.play();
			});
			start.play();
		}
	}

	/* Ignite */
	if("loading" === document.readyState)
		document.addEventListener("DOMContentLoaded", function() {
			init();
		});
	else
		init();
})();
