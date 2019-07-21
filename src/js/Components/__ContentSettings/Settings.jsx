import { Div } from "utils";
import PluginInfo from "./Info";
import ColorScheme from "./ColorScheme";
import DdGuides from "./DdGuides";

const { withSelect } = wp.data;

const Settings = props => {
	return (
		<Div id="settings">
			<PluginInfo {...props} />
			<ColorScheme {...props} />
			<DdGuides {...props} />
		</Div>
	);
};

export default withSelect(select => {
	const { getSettings } = select(pr_store);

	return {
		...getSettings()
	};
})(Settings);
