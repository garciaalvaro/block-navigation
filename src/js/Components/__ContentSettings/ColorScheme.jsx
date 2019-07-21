import { pr_store, addPrefix } from "utils";

const { __ } = wp.i18n;
const { SelectControl } = wp.components;
const { compose } = wp.compose;
const { withDispatch } = wp.data;

const ColorSchemeControl = props => {
	const { updateColorScheme, color_scheme } = props;

	return (
		<SelectControl
			className={addPrefix(["control", "control-select", "color_scheme"])}
			label={__("Color scheme:")}
			value={color_scheme}
			onChange={updateColorScheme}
			options={[
				{
					value: "light-banana",
					label: "Banana (light)"
				},
				{
					value: "light-melon",
					label: "Melón (light)"
				},
				{
					value: "light-melocoton",
					label: "Melocotón (light)"
				},
				{ value: "light-coco", label: "Coco (light)" },
				{
					value: "light-mandarina",
					label: "Mandarina (light)"
				},
				{
					value: "light-pistacho",
					label: "Pistacho (light)"
				},
				{
					value: "dark-higo",
					label: "Higo (dark)"
				},
				{
					value: "dark-mango",
					label: "Mango (dark)"
				},
				{
					value: "dark-endrina",
					label: "Endrina (dark)"
				},
				{
					value: "dark-castana",
					label: "Castaña (dark)"
				},
				{
					value: "dark-naranja",
					label: "Naranja (dark)"
				},
				{
					value: "dark-ciruela",
					label: "Ciruela (dark)"
				}
			]}
		/>
	);
};

export default withDispatch(dispatch => {
	const { updateColorScheme } = dispatch(pr_store);

	return {
		updateColorScheme
	};
})(ColorSchemeControl);
