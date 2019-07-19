import l, { pr_store, addPrefix } from "utils";

const { __ } = wp.i18n;
const { CheckboxControl } = wp.components;
const { withDispatch } = wp.data;

const DdGuides = props => {
	const { toggleDropGuides, show_dd_guides } = props;

	return (
		<CheckboxControl
			classes={addPrefix(["control", "control-checkbox", "show_dd_guides"])}
			label={__("Show guides when moving block")}
			help={__(`Activate this setting to display line guides that indicate where
				can a block be dropped. These lines will appear when a block is being
				moved and indicate in which positions it can be dropped.`)}
			checked={show_dd_guides}
			onChange={toggleDropGuides}
		/>
	);
};

export default withDispatch(dispatch => {
	const { toggleDropGuides } = dispatch(pr_store);

	return {
		toggleDropGuides
	};
})(DdGuides);
