import { SvelteComponent, init, safe_not_equal, element, text, space, insert, append, noop, detach, attr, listen, destroy_each, component_subscribe } from 'svelte/internal';
import { theme } from '../../../global-state.js';

/* src/lib/components/journey/callbacks/choice.svelte generated by Svelte v3.47.0 */

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i];
	child_ctx[9] = i;
	return child_ctx;
}

// (37:4) {#each choiceOptions as option, idx}
function create_each_block(ctx) {
	let option;
	let t0_value = /*option*/ ctx[7] + "";
	let t0;
	let t1;
	let option_value_value;
	let option_selected_value;

	return {
		c() {
			option = element("option");
			t0 = text(t0_value);
			t1 = space();
			option.__value = option_value_value = /*idx*/ ctx[9];
			option.value = option.__value;
			option.selected = option_selected_value = /*idx*/ ctx[9] === /*defaultChoice*/ ctx[4];
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t0);
			append(option, t1);
		},
		p: noop,
		d(detaching) {
			if (detaching) detach(option);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let select;
	let select_class_value;
	let t0;
	let label;
	let t1;
	let mounted;
	let dispose;
	let each_value = /*choiceOptions*/ ctx[3];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			div = element("div");
			select = element("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t0 = space();
			label = element("label");
			t1 = text(/*prompt*/ ctx[2]);
			attr(select, "id", /*inputName*/ ctx[0]);
			attr(select, "name", "selected");
			attr(select, "class", select_class_value = `cstm_form-select form-select bg-transparent ${/*$theme*/ ctx[1].textClass} ${/*$theme*/ ctx[1].borderClass}`);
			attr(label, "for", /*inputName*/ ctx[0]);
			attr(div, "class", "cstm_form-floating form-floating mb-3");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, select);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(select, null);
			}

			append(div, t0);
			append(div, label);
			append(label, t1);

			if (!mounted) {
				dispose = listen(select, "change", /*setValue*/ ctx[5]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*defaultChoice, choiceOptions*/ 24) {
				each_value = /*choiceOptions*/ ctx[3];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty & /*inputName*/ 1) {
				attr(select, "id", /*inputName*/ ctx[0]);
			}

			if (dirty & /*$theme*/ 2 && select_class_value !== (select_class_value = `cstm_form-select form-select bg-transparent ${/*$theme*/ ctx[1].textClass} ${/*$theme*/ ctx[1].borderClass}`)) {
				attr(select, "class", select_class_value);
			}

			if (dirty & /*inputName*/ 1) {
				attr(label, "for", /*inputName*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			destroy_each(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};
}

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
	const prompt = callback.getPrompt();

	const choiceOptions = callback.getChoices();
	const defaultChoice = callback.getDefaultChoice();

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
		callback.setChoiceIndex(Number(event.target.value));
	}

	$$self.$$set = $$props => {
		if ('callback' in $$props) $$invalidate(6, callback = $$props.callback);
		if ('inputName' in $$props) $$invalidate(0, inputName = $$props.inputName);
	};

	return [inputName, $theme, prompt, choiceOptions, defaultChoice, setValue, callback];
}

class Choice extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { callback: 6, inputName: 0 });
	}
}

export { Choice as default };
