export function getClientPosition(e) {
	const touches = e.touches;

	if (touches && touches.length) {
		const finger = touches[0];
		return {
			x: finger.clientX,
			y: finger.clientY,
		};
	}

	return {
		x: e.clientX,
		y: e.clientY,
	};
}

function convert(num) {
	var hex = num.toString(16);
	return hex.length === 1 ? '0' + hex : hex;
}

function rgba2rgb(r, g, b, a) {
	a = a / 100;
	return {
		r: parseInt((1 - a) * 255 + a * r, 10),
		g: parseInt((1 - a) * 255 + a * g, 10),
		b: parseInt((1 - a) * 255 + a * b, 10),
	};
}

export function rgb2hex(r, g, b) {
	return '#' + [convert(r), convert(g), convert(b)].join('');
}

export function hsv2hex(h, s, v) {
	var rgb = hsv2rgb(h, s, v);
	return rgb2hex(rgb.r, rgb.g, rgb.b);
}

export function rgba2hex(r, g, b, a) {
	var rgb = rgba2rgb(r, g, b, a);
	return rgb2hex(rgb.r, rgb.g, rgb.b);
}

export function rgb2hsv(r, g, b) {
	var h, s, v;
	var max = Math.max(r, g, b);
	var min = Math.min(r, g, b);
	var delta = max - min;

	if (delta === 0) {
		h = 0;
	} else if (r === max) {
		h = ((g - b) / delta) % 6;
	} else if (g === max) {
		h = (b - r) / delta + 2;
	} else {
		h = (r - g) / delta + 4;
	}

	h = Math.round(h * 60);
	if (h < 0) h += 360;
	s = Math.round((max === 0 ? 0 : delta / max) * 100);
	v = Math.round((max / 255) * 100);
	return {
		h: h,
		s: s,
		v: v,
	};
}

export function hex2rgb(hex) {
	if (hex[0] === '#') hex = hex.substr(1);

	if (hex.length === 3) {
		return {
			r: parseInt(hex[0] + hex[0], 16),
			g: parseInt(hex[1] + hex[1], 16),
			b: parseInt(hex[2] + hex[2], 16),
		};
	}

	return {
		r: parseInt(hex.substr(0, 2), 16),
		g: parseInt(hex.substr(2, 2), 16),
		b: parseInt(hex.substr(4, 2), 16),
	};
}

export function rgba(r, g, b, a) {
	return 'rgba(' + [r, g, b, a / 100].join(',') + ')';
}

export function hsv2rgb(h, s, v) {
	s = s / 100;
	v = v / 100;
	var rgb = [];
	var c = v * s;
	var hh = h / 60;
	var x = c * (1 - Math.abs((hh % 2) - 1));
	var m = v - c;

	switch (parseInt(hh, 10)) {
		case 0:
			rgb = [c, x, 0];
			break;

		case 1:
			rgb = [x, c, 0];
			break;

		case 2:
			rgb = [0, c, x];
			break;

		case 3:
			rgb = [0, x, c];
			break;

		case 4:
			rgb = [x, 0, c];
			break;

		case 5:
			rgb = [c, 0, x];
			break;

		default:
			break;
	}

	return {
		r: Math.round(255 * (rgb[0] + m)),
		g: Math.round(255 * (rgb[1] + m)),
		b: Math.round(255 * (rgb[2] + m)),
	};
}

export function hex2alpha(aa) {
	return Math.round((parseInt('0x' + aa, 16) / 255) * 100);
}

export function hex2hsv(hex) {
	const { r, g, b } = hex2rgb(hex);
	return rgb2hsv(r, g, b);
}

export function hex2hsl(hex) {
	const { h, s, v } = hex2hsv(hex);
	return hsv2hsl(h, s, v);
}

export function hsv2hsl(h, s, v) {
	const hh = ((200 - s) * v) / 100;

	return {
		h: h,
		s: (s * v) / (hh < 100 ? hh : 200 - hh),
		l: hh / 2,
	};
}

export function parseColor(hexColor) {
	hexColor = hexColor.toLowerCase();
	const hex = hexColor.substr(0, 7);
	const rgb = hex2rgb(hex);
	const { r, g, b } = rgb;
	const hsv = rgb2hsv(r, g, b);
	const hsl = hex2hsl(hex);
	const a = hexColor.length > 7 ? hex2alpha(hexColor.substr(7)) : 100;

	return {
		...hsv,
		r,
		g,
		b,
		a,
		hex,
		rgba: rgba(r, g, b, a),
		hsl: hsl,
	};
}
