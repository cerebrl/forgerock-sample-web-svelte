import { SvelteComponent, init, safe_not_equal, svg_element, attr, insert, append, noop, detach } from 'svelte/internal';

/* src/lib/components/icons/alert-icon.svelte generated by Svelte v3.47.0 */

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
			attr(path1, "d", "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z");
			attr(svg, "class", /*classes*/ ctx[0]);
			attr(svg, "height", /*size*/ ctx[1]);
			attr(svg, "width", /*size*/ ctx[1]);
			attr(svg, "viewBox", "0 0 24 24");
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

class Alert_icon extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { classes: 0, size: 1 });
	}
}

export { Alert_icon as default };