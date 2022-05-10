import { SvelteComponent, init, safe_not_equal, element, space, text, attr, insert, append, listen, noop, detach, component_subscribe } from 'svelte/internal';
import { theme } from '../../../global-state.js';

/* src/lib/components/journey/callbacks/name.svelte generated by Svelte v3.47.0 */

function create_fragment(ctx) {
	let div;
	let input;
	let input_class_value;
	let t0;
	let label;
	let t1;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			input = element("input");
			t0 = space();
			label = element("label");
			t1 = text(/*textInputLabel*/ ctx[3]);
			attr(input, "class", input_class_value = `cstm_form-control form-control ${validationClass} bg-transparent ${/*$theme*/ ctx[1].textClass} ${/*$theme*/ ctx[1].borderClass}`);
			input.value = /*existingValue*/ ctx[2];
			attr(input, "id", /*inputName*/ ctx[0]);
			attr(input, "name", /*inputName*/ ctx[0]);
			attr(input, "placeholder", /*textInputLabel*/ ctx[3]);
			input.required = true;
			attr(input, "type", "text");
			attr(label, "for", /*inputName*/ ctx[0]);
			attr(div, "class", `cstm_form-floating form-floating mb-3`);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, input);
			append(div, t0);
			append(div, label);
			append(label, t1);

			if (!mounted) {
				dispose = listen(input, "change", /*setValue*/ ctx[4]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*$theme*/ 2 && input_class_value !== (input_class_value = `cstm_form-control form-control ${validationClass} bg-transparent ${/*$theme*/ ctx[1].textClass} ${/*$theme*/ ctx[1].borderClass}`)) {
				attr(input, "class", input_class_value);
			}

			if (dirty & /*inputName*/ 1) {
				attr(input, "id", /*inputName*/ ctx[0]);
			}

			if (dirty & /*inputName*/ 1) {
				attr(input, "name", /*inputName*/ ctx[0]);
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

let validationClass = '';

function instance($$self, $$props, $$invalidate) {
	let $theme;
	component_subscribe($$self, theme, $$value => $$invalidate(1, $theme = $$value));
	let { callback } = $$props;
	let { inputName = '' } = $$props;

	/** *************************************************************************
 * SDK INTEGRATION POINT
 * Summary: SDK callback methods for getting values
 * --------------------------------------------------------------------------
 * Details: Each callback is wrapped by the SDK to provide helper methods
 * for accessing values from the callbacks received from AM
 ************************************************************************* */
	const existingValue = callback.getInputValue();

	const textInputLabel = callback.getPrompt();

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
		callback.setInputValue(event.target.value);
	}

	$$self.$$set = $$props => {
		if ('callback' in $$props) $$invalidate(5, callback = $$props.callback);
		if ('inputName' in $$props) $$invalidate(0, inputName = $$props.inputName);
	};

	return [inputName, $theme, existingValue, textInputLabel, setValue, callback];
}

class Name extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { callback: 5, inputName: 0 });
	}
}

export { Name as default };