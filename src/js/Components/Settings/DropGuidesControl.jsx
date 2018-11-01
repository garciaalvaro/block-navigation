import l, { plugin_namespace } from "../../utils/#";

const { __ } = wp.i18n;
const { CheckboxControl } = wp.components;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

const DropGuidesControl = ({ toggleDropGuides, drop_guides }) => {
	return (
		<CheckboxControl
			className="bn-control bn-control-checkbox drop_guides"
			label={__("Show guides when moving block")}
			help={__(`Activate this setting to display line guides that indicate where
				can a block be dropped. These lines will appear when a block is being
				moved and indicate in which positions it can be dropped.`)}
			checked={drop_guides}
			onChange={toggleDropGuides}
		/>
	);
};

export default compose([
	withSelect(select => {
		const { getDropGuides } = select(plugin_namespace);

		return {
			drop_guides: getDropGuides()
		};
	}),
	withDispatch(dispatch => {
		const { toggleDropGuides } = dispatch(plugin_namespace);

		return {
			toggleDropGuides
		};
	})
])(DropGuidesControl);
