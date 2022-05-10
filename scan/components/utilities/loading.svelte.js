import { SvelteComponent, init, safe_not_equal, element, space, text, attr, insert, append, set_data, noop, detach, component_subscribe } from 'svelte/internal';
import { theme } from '../../global-state.js';

/* src/lib/components/utilities/loading.svelte generated by Svelte v3.47.0 */

function create_fragment(ctx) {
	let div;
	let p;
	let span1;
	let t0;
	let span2;
	let t1;
	let span2_class_value;

	return {
		c() {
			div = element("div");
			p = element("p");
			span1 = element("span");
			span1.innerHTML = `<span class="cstm_loading-spinner spinner-border text-primary" role="status"></span>`;
			t0 = space();
			span2 = element("span");
			t1 = text(/*message*/ ctx[1]);
			attr(span1, "class", "d-flex justify-content-center my-2");
			attr(span2, "class", span2_class_value = `d-flex justify-content-center p-3 fs-5 ${/*$theme*/ ctx[2].textClass}`);
			attr(p, "class", /*classes*/ ctx[0]);
			attr(div, "class", "container");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, p);
			append(p, span1);
			append(p, t0);
			append(p, span2);
			append(span2, t1);
		},
		p(ctx, [dirty]) {
			if (dirty & /*message*/ 2) set_data(t1, /*message*/ ctx[1]);

			if (dirty & /*$theme*/ 4 && span2_class_value !== (span2_class_value = `d-flex justify-content-center p-3 fs-5 ${/*$theme*/ ctx[2].textClass}`)) {
				attr(span2, "class", span2_class_value);
			}

			if (dirty & /*classes*/ 1) {
				attr(p, "class", /*classes*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $theme;
	component_subscribe($$self, theme, $$value => $$invalidate(2, $theme = $$value));
	let { classes = '' } = $$props;
	let { message = '' } = $$props;

	$$self.$$set = $$props => {
		if ('classes' in $$props) $$invalidate(0, classes = $$props.classes);
		if ('message' in $$props) $$invalidate(1, message = $$props.message);
	};

	return [classes, message, $theme];
}

class Loading extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { classes: 0, message: 1 });
	}
}

export { Loading as default };
