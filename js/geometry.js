class Point2D
{
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
		return this;
	}

	translate(a, b)
	{
		const x = this.x + a;
		const y = this.y + b;
		return new Point2D(x, y);
	}

	multiply(a, b)
	{
		const x = this.x * a;
		const y = this.y * b;
		return new Point2D(x, y);
	}

	scale(a)
	{
		return this.multiply(a, a);
	}
}

class Point3D
{
	constructor(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}

	translate(a, b, c)
	{
		const x = this.x + a;
		const y = this.y + b;
		const z = this.z + c;
		return new Point3D(x, y, z);

	}

	multiply(a, b, c)
	{
		const x = this.x * a;
		const y = this.y * b;
		const z = this.z * c;
		return new Point3D(x, y, z);
	}

	scale(a)
	{
		return this.multiply(a, a, a);
	}

	project()
	{
		const x = this.x / (this.z + 2);
		const y = this.y / (this.z + 2);
		return new Point2D(x, y);
	}

	// https://en.wikipedia.org/wiki/Rotation#Axis_of_2_dimensional_rotations
	rotateX(angle)
	{
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);

		const x = this.x;
		const y = cos * this.y - sin * this.z;
		const z = sin * this.y + cos * this.z;

		return new Point3D(x, y, z);
	}


	rotateY(angle)
	{
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);

		const x = cos * this.x - sin * this.z;
		const y = this.y;
		const z = sin * this.x + cos * this.z;

		return new Point3D(x, y, z);
	}
}
