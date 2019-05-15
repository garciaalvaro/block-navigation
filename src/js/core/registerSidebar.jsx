import l, { Div, plugin_namespace, icons } from "utils";
import Root from "../Components/Root/Root";

const registerSidebar = () => {
	wp.plugins.registerPlugin(plugin_namespace, {
		icon: <Div id="pinned-logo">{icons.logo}</Div>,
		render: () => (
			<Fragment>
				<PluginSidebar name={plugin_namespace} title={plugin_title}>
					<Root />
				</PluginSidebar>
				<PluginSidebarMoreMenuItem target={plugin_namespace}>
					{plugin_title}
				</PluginSidebarMoreMenuItem>
			</Fragment>
		)
	});
};

export default registerSidebar;
