(function() {
	// Infos about the cube
	const cube = {
		vertices: [
			new Point3D(-1, -1, -1), // 0
			new Point3D(-1, -1,  1), // 1
			new Point3D(-1,  1, -1), // 2
			new Point3D(-1,  1,  1), // 3
			new Point3D( 1, -1, -1), // 4
			new Point3D( 1, -1,  1), // 5
			new Point3D( 1,  1, -1), // 6
			new Point3D( 1,  1,  1), // 7
		].map(p => p.scale(1/2)),

		// basically: [x, x ^ 1], [x, x ^ 2], [x, x ^ 4]
		edges: [
			[0, 1], [0, 2], [0, 4],
			[1, 0], [1, 3], [1, 5],
			[2, 3], [2, 0], [2, 6],
			[3, 2], [3, 1], [3, 7],
			[4, 5], [4, 6], [4, 0],
			[5, 4], [5, 7], [5, 1],
			[6, 7], [6, 4], [6, 2],
			[7, 6], [7, 5], [7, 3],
		],
	};

	// Pyamids are easy to draw too, but they don't look as good
	const pyramid = {
		vertices: [
			new Point3D(-1, -1, -1),
			new Point3D( 1, -1, -1),
			new Point3D( 1,  1, -1),
			new Point3D(-1,  1, -1),
			new Point3D( 0,  0,  1),
		].map(p => p.scale(1/2)),

		edges: [
			[0, 1], [1, 2], [2, 3], [3, 0],
			[0, 4], [1, 4], [2, 4], [3, 4],
		]
	};

	function draw(context, polygon, x, y, size, alpha)
	{
		const {vertices, edges} = polygon;

		const cos = Math.cos(alpha);
		const sin = Math.sin(alpha);

		// Do the maths
		const points = vertices
			// Apply some rotations
			.map(p => p.rotateX(alpha))
			.map(p => p.rotateY(.42 * alpha))

			// Project to 2D space
			.map(p => p.project())

			// Zoom
			.map(p => p.scale(size))

			// Put in the center of the screen
			.map(p => p.translate(x, y))

			// Have some fun (PS2 vibes)
			.map(p => p.translate(cos * sin * 100, sin * 100))
		;

		// Print the lines
		context.beginPath();

		for(let [from, to] of edges) {
			context.moveTo(points[from].x, points[from].y);
			context.lineTo(points[to].x,   points[to].y);
		}

		context.closePath();
		context.stroke();
	}

	function update(t)
	{
		const width  = window.innerWidth;
		const height = window.innerHeight;

		// Init canvas
		const canvas  = document.getElementById("canvas");
		const context = canvas.getContext("2d");

		//context.clearRect(0, 0, width, height);

		context.canvas.height = height;
		context.canvas.width  = width;

		// Center of the cube
		const x     = width  / 2;
		const y     = height / 2;
		const size  = Math.min(height, width);
		const alpha = (t * 1.0) / 1000;

		context.lineWidth   = 5;
		context.strokeStyle = "green";

		const hue = ((t * 360) / 5000) % 360;
		context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
		draw(context, cube, x, y, size, alpha);

//		context.lineWidth     = 1;
//		context.strokeStyle   = "red";
//		draw(context, pyramid, x, y, size, 100 + alpha);

		// Prepare next frame
		requestAnimationFrame(update);
	}

	if("loading" === document.readyState)
		document.addEventListener("DOMContentLoaded", update);
	else
		update();
})();
