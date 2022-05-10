import { SvelteComponent, init, safe_not_equal, svg_element, attr, insert, append, noop, detach } from 'svelte/internal';

/* src/lib/components/icons/lock-icon.svelte generated by Svelte v3.47.0 */

function create_fragment(ctx) {
	let svg;
	let path0;
	let path1;

	return {
		c() {
			svg = svg_element("svg");
			path0 = svg_element("path");
			path1 = svg_element("path");
			attr(path0, "d", "M0 0h24v24H0z");
			attr(path0, "fill", "none");
			attr(path1, "d", "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z");
			attr(svg, "class", /*classes*/ ctx[0]);
			attr(svg, "height", /*size*/ ctx[1]);
			attr(svg, "viewBox", "0 0 24 24");
			attr(svg, "width", /*size*/ ctx[1]);
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, path0);
			append(svg, path1);
		},
		p(ctx, [dirty]) {
			if (dirty & /*classes*/ 1) {
				attr(svg, "class", /*classes*/ ctx[0]);
			}

			if (dirty & /*size*/ 2) {
				attr(svg, "height", /*size*/ ctx[1]);
			}

			if (dirty & /*size*/ 2) {
				attr(svg, "width", /*size*/ ctx[1]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(svg);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { classes = '' } = $$props;
	let { size = '24px' } = $$props;

	$$self.$$set = $$props => {
		if ('classes' in $$props) $$invalidate(0, classes = $$props.classes);
		if ('size' in $$props) $$invalidate(1, size = $$props.size);
	};

	return [classes, size];
}

class Lock_icon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { classes: 0, size: 1 });
	}
}

export { Lock_icon as default };
