function onload () {
	
}

function addPoint (event) {
	console.log(event.clientX + " " + event.clientY);
	if(event.target.className === "body") {
		var point = createPoint(event.clientX, event.clientY);
		document.body.appendChild(point);
		startMakingaCircle();
	}
}

function createPoint (x, y) {
	var point = document.createElement("div");
	point.className = "point";
	point.style.top = y - (10)/2;
	point.style.left = x - (10)/2;
	point.addEventListener("click", function () { removePoint(this, event) }, false);
	return point;
}

function removePoint (object, event) {
	if (event.target.className === "point") {
		document.body.removeChild(object);
		startMakingaCircle();
	}
}

function startMakingaCircle () {
	var pointsElements = document.getElementsByClassName("point");
	var points = [];
	for (var i = 0; i < pointsElements.length; i++) {
		var x = parseInt(pointsElements[i].style.left);
		var y = parseInt(pointsElements[i].style.top);
		points.push({x: (x+5), y: (y+5)});
	}
	var circle = makeCircle(points);
	drawCircle(circle);
	console.log(circle);
}

function drawCircle (c) {
	var circles = document.getElementsByClassName("circle");
	if (circles[0] == null) {
		var circle = document.createElement("div");
		circle.className = "circle";
		circle.style.top = (c.y - c.r) + "px";
		circle.style.left = (c.x - c.r) + "px";
		circle.style.width = (2 * c.r) + "px";
		circle.style.height = (2 * c.r) + "px";
		circle.style.borderRadius = (c.r) + "px";
		document.body.appendChild(circle);
	} else {
		circles[0].style.top = (c.y - c.r) + "px";
		circles[0].style.left = (c.x - c.r) + "px";
		circles[0].style.width = (2 * c.r) + "px";
		circles[0].style.height = (2 * c.r) + "px";
		circles[0].style.borderRadius = (c.r) + "px";
	}
}

function makeCircle(points) {
	var shuffled = points.slice();
	for (var i = points.length - 1; i >= 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		j = Math.max(Math.min(j, i), 0);
		var temp = shuffled[i];
		shuffled[i] = shuffled[j];
		shuffled[j] = temp;
	}
	
	var c = null;
	for (var i = 0; i < shuffled.length; i++) {
		var p = shuffled[i];
		if (c == null || !isInCircle(c, p))
			c = makeCircleOnePoint(shuffled.slice(0, i + 1), p);
	}
	return c;
}

function makeCircleOnePoint(points, p) {
	var c = {x: p.x, y: p.y, r: 0};
	for (var i = 0; i < points.length; i++) {
		var q = points[i];
		if (!isInCircle(c, q)) {
			if (c.r == 0)
				c = makeDiameter(p, q);
			else
				c = makeCircleTwoPoints(points.slice(0, i + 1), p, q);
		}
	}
	return c;
}

function makeCircleTwoPoints(points, p, q) {
	var circ = makeDiameter(p, q);
	var left = null;
	var right = null;	
	points.forEach(function(r) {
		if (isInCircle(circ, r))
			return;
		var cross = crossProduct(p.x, p.y, q.x, q.y, r.x, r.y);
		var c = makeCircumcircle(p, q, r);
		if (c == null)
			return;
		else if (cross > 0 && (left == null || crossProduct(p.x, p.y, q.x, q.y, c.x, c.y) > crossProduct(p.x, p.y, q.x, q.y, left.x, left.y)))
			left = c;
		else if (cross < 0 && (right == null || crossProduct(p.x, p.y, q.x, q.y, c.x, c.y) < crossProduct(p.x, p.y, q.x, q.y, right.x, right.y)))
			right = c;
	});
	
	//Which circle to return
	if (left == null && right == null)
		return circ;
	else if (left == null)
		return right;
	else if (right == null)
		return left;
	else
		return left.r <= right.r ? left : right;
}


function makeCircumcircle(p0, p1, p2) {
	var ax = p0.x, ay = p0.y;
	var bx = p1.x, by = p1.y;
	var cx = p2.x, cy = p2.y;
	var d = (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by)) * 2;
	if (d == 0)
		return null;
	var x = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d;
	var y = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d;
	var ra = distance(x, y, ax, ay);
	var rb = distance(x, y, bx, by);
	var rc = distance(x, y, cx, cy);
	return {x: x, y: y, r: Math.max(ra, rb, rc)};
}


function makeDiameter(p0, p1) {
	var x = (p0.x + p1.x) / 2;
	var y = (p0.y + p1.y) / 2;
	var r0 = distance(x, y, p0.x, p0.y);
	var r1 = distance(x, y, p1.x, p1.y);
	return {x: x, y: y, r: Math.max(r0, r1)};
}

var MULTIPLICATIVE_EPSILON = 1 + 1e-14;

function isInCircle(c, p) {
	return c != null && distance(p.x, p.y, c.x, c.y) <= c.r * MULTIPLICATIVE_EPSILON;
}

function crossProduct(x0, y0, x1, y1, x2, y2) {
	return (x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0);
}


function distance(x0, y0, x1, y1) {
	return Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
}