import { SvelteComponent, init, safe_not_equal, empty, insert, group_outros, transition_out, check_outros, transition_in, detach, component_subscribe, subscribe, noop, create_component, mount_component, destroy_component, create_slot, element, text, space, attr, append, listen, prevent_default, update_slot_base, get_all_dirty_from_scope, get_slot_changes, destroy_each, globals } from 'svelte/internal';
import { CallbackType } from '@forgerock/javascript-sdk';
import { browser } from '$app/env';
import { goto } from '$app/navigation';
import Alert from './alert.svelte.js';
import Boolean from './callbacks/boolean.svelte.js';
import Button from './button.svelte.js';
import Choice from './callbacks/choice.svelte.js';
import Create_password from './callbacks/create-password.svelte.js';
import Create_text_attribute from './callbacks/create-text-attribute.svelte.js';
import Create_username from './callbacks/create-username.svelte.js';
import { isAuthenticated, theme } from '../../global-state.js';
import { initTree } from './journey-state.js';
import Kba from './callbacks/kba.svelte.js';
import Loading from '../utilities/loading.svelte.js';
import Password from './callbacks/password.svelte.js';
import Terms_conditions from './callbacks/terms-conditions.svelte.js';
import Name from './callbacks/name.svelte.js';
import treeReducer from './tree-reducer.js';
import Unknown from './callbacks/unknown.svelte.js';

/* src/lib/components/journey/form.svelte generated by Svelte v3.47.0 */

const { Boolean: Boolean_1 } = globals;
const get_bottomMessage_slot_changes = dirty => ({});
const get_bottomMessage_slot_context = ctx => ({});

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[15] = list[i];
	const constants_0 = /*callback*/ child_ctx[15]?.payload?.input?.[0].name;
	child_ctx[16] = constants_0;
	return child_ctx;
}

const get_topMessage_slot_changes = dirty => ({});
const get_topMessage_slot_context = ctx => ({});

// (159:0) {:else}
function create_else_block(ctx) {
	let alert;
	let current;

	alert = new Alert({
			props: {
				message: /*$step*/ ctx[4].payload?.message || '',
				type: "error"
			}
		});

	return {
		c() {
			create_component(alert.$$.fragment);
		},
		m(target, anchor) {
			mount_component(alert, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const alert_changes = {};
			if (dirty & /*$step*/ 16) alert_changes.message = /*$step*/ ctx[4].payload?.message || '';
			alert.$set(alert_changes);
		},
		i(local) {
			if (current) return;
			transition_in(alert.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(alert.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(alert, detaching);
		}
	};
}

// (115:32) 
function create_if_block_2(ctx) {
	let h1;
	let t0_value = /*form*/ ctx[8].titleText + "";
	let t0;
	let h1_class_value;
	let t1;
	let t2;
	let form_1;
	let t3;
	let t4;
	let button;
	let t5;
	let current;
	let mounted;
	let dispose;
	const topMessage_slot_template = /*#slots*/ ctx[13].topMessage;
	const topMessage_slot = create_slot(topMessage_slot_template, ctx, /*$$scope*/ ctx[12], get_topMessage_slot_context);
	let if_block = /*$failureMessage*/ ctx[6] && create_if_block_3(ctx);
	let each_value = /*$step*/ ctx[4].callbacks;
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	button = new Button({
			props: {
				buttonText: /*form*/ ctx[8].buttonText,
				submittingForm: /*$submittingForm*/ ctx[7]
			}
		});

	const bottomMessage_slot_template = /*#slots*/ ctx[13].bottomMessage;
	const bottomMessage_slot = create_slot(bottomMessage_slot_template, ctx, /*$$scope*/ ctx[12], get_bottomMessage_slot_context);

	return {
		c() {
			h1 = element("h1");
			t0 = text(t0_value);
			t1 = space();
			if (topMessage_slot) topMessage_slot.c();
			t2 = space();
			form_1 = element("form");
			if (if_block) if_block.c();
			t3 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t4 = space();
			create_component(button.$$.fragment);
			t5 = space();
			if (bottomMessage_slot) bottomMessage_slot.c();
			attr(h1, "class", h1_class_value = `text-center fs-2 mb-3 ${/*$theme*/ ctx[5].textClass}`);
			attr(form_1, "class", "cstm_form");
		},
		m(target, anchor) {
			insert(target, h1, anchor);
			append(h1, t0);
			insert(target, t1, anchor);

			if (topMessage_slot) {
				topMessage_slot.m(target, anchor);
			}

			insert(target, t2, anchor);
			insert(target, form_1, anchor);
			if (if_block) if_block.m(form_1, null);
			append(form_1, t3);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(form_1, null);
			}

			append(form_1, t4);
			mount_component(button, form_1, null);
			insert(target, t5, anchor);

			if (bottomMessage_slot) {
				bottomMessage_slot.m(target, anchor);
			}

			current = true;

			if (!mounted) {
				dispose = listen(form_1, "submit", prevent_default(/*submit_handler*/ ctx[14]));
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (!current || dirty & /*$theme*/ 32 && h1_class_value !== (h1_class_value = `text-center fs-2 mb-3 ${/*$theme*/ ctx[5].textClass}`)) {
				attr(h1, "class", h1_class_value);
			}

			if (topMessage_slot) {
				if (topMessage_slot.p && (!current || dirty & /*$$scope*/ 4096)) {
					update_slot_base(
						topMessage_slot,
						topMessage_slot_template,
						ctx,
						/*$$scope*/ ctx[12],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[12])
						: get_slot_changes(topMessage_slot_template, /*$$scope*/ ctx[12], dirty, get_topMessage_slot_changes),
						get_topMessage_slot_context
					);
				}
			}

			if (/*$failureMessage*/ ctx[6]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*$failureMessage*/ 64) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_3(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(form_1, t3);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (dirty & /*mapCallbackToComponent, $step*/ 528) {
				each_value = /*$step*/ ctx[4].callbacks;
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(form_1, t4);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			const button_changes = {};
			if (dirty & /*$submittingForm*/ 128) button_changes.submittingForm = /*$submittingForm*/ ctx[7];
			button.$set(button_changes);

			if (bottomMessage_slot) {
				if (bottomMessage_slot.p && (!current || dirty & /*$$scope*/ 4096)) {
					update_slot_base(
						bottomMessage_slot,
						bottomMessage_slot_template,
						ctx,
						/*$$scope*/ ctx[12],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[12])
						: get_slot_changes(bottomMessage_slot_template, /*$$scope*/ ctx[12], dirty, get_bottomMessage_slot_changes),
						get_bottomMessage_slot_context
					);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(topMessage_slot, local);
			transition_in(if_block);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(button.$$.fragment, local);
			transition_in(bottomMessage_slot, local);
			current = true;
		},
		o(local) {
			transition_out(topMessage_slot, local);
			transition_out(if_block);
			each_blocks = each_blocks.filter(Boolean_1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(button.$$.fragment, local);
			transition_out(bottomMessage_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(h1);
			if (detaching) detach(t1);
			if (topMessage_slot) topMessage_slot.d(detaching);
			if (detaching) detach(t2);
			if (detaching) detach(form_1);
			if (if_block) if_block.d();
			destroy_each(each_blocks, detaching);
			destroy_component(button);
			if (detaching) detach(t5);
			if (bottomMessage_slot) bottomMessage_slot.d(detaching);
			mounted = false;
			dispose();
		}
	};
}

// (107:40) 
function create_if_block_1(ctx) {
	let loading;
	let current;

	loading = new Loading({
			props: {
				message: "Login success! Requesting tokens ..."
			}
		});

	return {
		c() {
			create_component(loading.$$.fragment);
		},
		m(target, anchor) {
			mount_component(loading, target, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(loading.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(loading.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(loading, detaching);
		}
	};
}

// (99:0) {#if !$step}
function create_if_block(ctx) {
	let loading;
	let current;

	loading = new Loading({
			props: { message: "Checking your session ..." }
		});

	return {
		c() {
			create_component(loading.$$.fragment);
		},
		m(target, anchor) {
			mount_component(loading, target, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(loading.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(loading.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(loading, detaching);
		}
	};
}

// (135:4) {#if $failureMessage}
function create_if_block_3(ctx) {
	let alert;
	let current;

	alert = new Alert({
			props: {
				message: /*$failureMessage*/ ctx[6],
				type: "error"
			}
		});

	return {
		c() {
			create_component(alert.$$.fragment);
		},
		m(target, anchor) {
			mount_component(alert, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const alert_changes = {};
			if (dirty & /*$failureMessage*/ 64) alert_changes.message = /*$failureMessage*/ ctx[6];
			alert.$set(alert_changes);
		},
		i(local) {
			if (current) return;
			transition_in(alert.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(alert.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(alert, detaching);
		}
	};
}

// (144:4) {#each $step.callbacks as callback}
function create_each_block(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*mapCallbackToComponent*/ ctx[9](/*callback*/ ctx[15]);

	function switch_props(ctx) {
		return {
			props: {
				callback: /*callback*/ ctx[15],
				inputName: /*inputName*/ ctx[16]
			}
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const switch_instance_changes = {};
			if (dirty & /*$step*/ 16) switch_instance_changes.callback = /*callback*/ ctx[15];
			if (dirty & /*$step*/ 16) switch_instance_changes.inputName = /*inputName*/ ctx[16];

			if (switch_value !== (switch_value = /*mapCallbackToComponent*/ ctx[9](/*callback*/ ctx[15]))) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

function create_fragment(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_if_block_1, create_if_block_2, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (!/*$step*/ ctx[4]) return 0;
		if (/*$step*/ ctx[4].type === 'LoginSuccess') return 1;
		if (/*$step*/ ctx[4].type === 'Step') return 2;
		return 3;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $isAuthenticated;

	let $step,
		$$unsubscribe_step = noop,
		$$subscribe_step = () => ($$unsubscribe_step(), $$unsubscribe_step = subscribe(step, $$value => $$invalidate(4, $step = $$value)), step);

	let $theme;

	let $failureMessage,
		$$unsubscribe_failureMessage = noop,
		$$subscribe_failureMessage = () => ($$unsubscribe_failureMessage(), $$unsubscribe_failureMessage = subscribe(failureMessage, $$value => $$invalidate(6, $failureMessage = $$value)), failureMessage);

	let $submittingForm,
		$$unsubscribe_submittingForm = noop,
		$$subscribe_submittingForm = () => ($$unsubscribe_submittingForm(), $$unsubscribe_submittingForm = subscribe(submittingForm, $$value => $$invalidate(7, $submittingForm = $$value)), submittingForm);

	component_subscribe($$self, isAuthenticated, $$value => $$invalidate(11, $isAuthenticated = $$value));
	component_subscribe($$self, theme, $$value => $$invalidate(5, $theme = $$value));
	$$self.$$.on_destroy.push(() => $$unsubscribe_step());
	$$self.$$.on_destroy.push(() => $$unsubscribe_failureMessage());
	$$self.$$.on_destroy.push(() => $$unsubscribe_submittingForm());
	let { $$slots: slots = {}, $$scope } = $$props;
	let { action = { type: '' } } = $$props;
	const form = treeReducer(action);
	let failureMessage;
	let getStep;
	let step;
	let submittingForm;

	/**
 * Iterate through callbacks received from AM and map the callback to the
 * appropriate callback component, pushing that component
 * the StepComponent's array.
 */
	function mapCallbackToComponent(cb) {
		/** *********************************************************************
 * SDK INTEGRATION POINT
 * Summary:SDK callback method for getting the callback type
 * ----------------------------------------------------------------------
 * Details: This method is helpful in quickly identifying the callback
 * when iterating through an unknown list of AM callbacks
 ********************************************************************* */
		switch (cb.getType()) {
			case CallbackType.BooleanAttributeInputCallback:
				return Boolean;
			case CallbackType.ChoiceCallback:
				return Choice;
			case CallbackType.KbaCreateCallback:
				return Kba;
			case CallbackType.NameCallback:
				return Name;
			case CallbackType.PasswordCallback:
				return Password;
			case CallbackType.StringAttributeInputCallback:
				return Create_text_attribute;
			case CallbackType.ValidatedCreatePasswordCallback:
				return Create_password;
			case CallbackType.ValidatedCreateUsernameCallback:
				return Create_username;
			case CallbackType.TermsAndConditionsCallback:
				return Terms_conditions;
			default:
				return Unknown;
		}
	}

	if (browser) {
		/**
 * @function callToInitializeTree - Initializes tree and makes first request
 * @returns {Promise<Object>} - Object with Svelte stores and method for continuation
 */
		(async function callToInitializeTree() {
			let initObj = await initTree(form.tree);
			$$subscribe_failureMessage($$invalidate(1, failureMessage = initObj.failureMessage));
			$$invalidate(2, getStep = initObj.getStep);
			$$subscribe_step($$invalidate(0, step = initObj.step));
			$$subscribe_submittingForm($$invalidate(3, submittingForm = initObj.submittingForm));
		})();
	}

	const submit_handler = () => {
		// Get next step, passing previous step with new data
		getStep($step);

		// Set to true to indicate form is processing
		submittingForm.set(true);
	};

	$$self.$$set = $$props => {
		if ('action' in $$props) $$invalidate(10, action = $$props.action);
		if ('$$scope' in $$props) $$invalidate(12, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$isAuthenticated, step*/ 2049) {
			{
				/**
 * Detect when user completes authentication and redirect to home
 */
				if ($isAuthenticated) {
					console.log('Form component recognises the user as authenticated');
					step.set(null);
					goto('/');
				}
			}
		}
	};

	return [
		step,
		failureMessage,
		getStep,
		submittingForm,
		$step,
		$theme,
		$failureMessage,
		$submittingForm,
		form,
		mapCallbackToComponent,
		action,
		$isAuthenticated,
		$$scope,
		slots,
		submit_handler
	];
}

class Form extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { action: 10 });
	}
}

export { Form as default };