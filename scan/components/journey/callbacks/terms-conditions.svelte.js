import { SvelteComponent, init, safe_not_equal, element, space, text, attr, insert, append, listen, noop, detach } from 'svelte/internal';

/* src/lib/components/journey/callbacks/terms-conditions.svelte generated by Svelte v3.47.0 */

function create_fragment(ctx) {
	let div;
	let input;
	let t0;
	let label;
	let t1;
	let details;
	let summary;
	let t3;
	let t4;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			input = element("input");
			t0 = space();
			label = element("label");
			t1 = text("Please accept our below Terms and Conditions\n    ");
			details = element("details");
			summary = element("summary");
			summary.textContent = `${/*termsStart*/ ctx[2]}`;
			t3 = space();
			t4 = text(/*terms*/ ctx[1]);
			attr(input, "class", "form-check-input");
			input.checked = false;
			attr(input, "id", /*inputName*/ ctx[0]);
			attr(input, "type", "checkbox");
			attr(summary, "class", "fw-bold ps-1");
			attr(label, "for", /*inputName*/ ctx[0]);
			attr(label, "class", "form-check-label");
			attr(div, "class", "form-check mb-4");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, input);
			append(div, t0);
			append(div, label);
			append(label, t1);
			append(label, details);
			append(details, summary);
			append(details, t3);
			append(details, t4);

			if (!mounted) {
				dispose = listen(input, "change", /*setValue*/ ctx[3]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*inputName*/ 1) {
				attr(input, "id", /*inputName*/ ctx[0]);
			}

			if (dirty & /*inputName*/ 1) {
				attr(label, "for", /*inputName*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { callback } = $$props;
	let { inputName = '' } = $$props;

	/** *************************************************************************
 * SDK INTEGRATION POINT
 * Summary: SDK callback methods for getting values
 * --------------------------------------------------------------------------
 * Details: Each callback is wrapped by the SDK to provide helper methods
 * for accessing values from the callbacks received from AM
 ************************************************************************* */
	const terms = callback.getTerms();

	const termsStart = terms.substring(0, 35) + ' ...';

	/**
 * @function setValue - Sets the value on the callback on element blur (lose focus)
 * @param {Object} event
 */
	function setValue(event) {
		/** ***********************************************************************
 * SDK INTEGRATION POINT
 * Summary: SDK callback methods for setting values
 * ------------------------------------------------------------------------
 * Details: Each callback is wrapped by the SDK to provide helper methods
 * for writing values to the callbacks received from AM
 *********************************************************************** */
		callback.setAccepted(event.target.checked);
	}

	$$self.$$set = $$props => {
		if ('callback' in $$props) $$invalidate(4, callback = $$props.callback);
		if ('inputName' in $$props) $$invalidate(0, inputName = $$props.inputName);
	};

	return [inputName, terms, termsStart, setValue, callback];
}

class Terms_conditions extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { callback: 4, inputName: 0 });
	}
}

export { Terms_conditions as default };
