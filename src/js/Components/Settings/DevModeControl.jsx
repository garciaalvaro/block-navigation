import l, { plugin_namespace } from "../../utils/#";

const { __ } = wp.i18n;
const { CheckboxControl } = wp.components;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

const DevModeControl = ({ toggleDevMode, dev_mode_active }) => {
	return (
		<CheckboxControl
			className="bn-control bn-control-checkbox dev_mode_active"
			label={__("Enable Development Mode")}
			help={__(`Use this settings if you are developing Block related code,
			otherwise leave it deactivated. This setting will enable some simple
			but useful features that can help the development process. Currently it adds
			two extra actions inside each Block's menu: Copy the Block clientId to
			the Clipboard and Log to the browser's console some helpful Block related data.`)}
			checked={dev_mode_active}
			onChange={toggleDevMode}
		/>
	);
};

export default compose([
	withSelect(select => {
		const { isDevModeActive } = select(plugin_namespace);

		return {
			dev_mode_active: isDevModeActive()
		};
	}),
	withDispatch(dispatch => {
		const { toggleDevMode } = dispatch(plugin_namespace);

		return {
			toggleDevMode
		};
	})
])(DevModeControl);
