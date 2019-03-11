import l, { plugin_namespace } from "../../utils";

const { __ } = wp.i18n;
const { SelectControl } = wp.components;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

const ColorSchemeControl = ({ updateColorScheme, color_scheme }) => {
	return (
		<SelectControl
			className="bn-control bn-control-select color_scheme"
			label={__("Color scheme:")}
			value={color_scheme}
			onChange={value => updateColorScheme(value)}
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

export default compose([
	withSelect(select => {
		const { getColorScheme } = select(plugin_namespace);

		return {
			color_scheme: getColorScheme()
		};
	}),
	withDispatch(dispatch => {
		const { updateColorScheme } = dispatch(plugin_namespace);

		return {
			updateColorScheme
		};
	})
])(ColorSchemeControl);
