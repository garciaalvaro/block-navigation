import { plugin_namespace, plugin_title, icons } from "utils/data";
import { App } from "Components/App/App";

const { Fragment } = wp.element;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;

wp.plugins.registerPlugin(plugin_namespace, {
	// @ts-ignore
	icon: icons.logo,
	render: () => (
		<Fragment>
			<PluginSidebar name={plugin_namespace} title={plugin_title}>
				<App />
			</PluginSidebar>
			<PluginSidebarMoreMenuItem target={plugin_namespace}>
				{plugin_title}
			</PluginSidebarMoreMenuItem>
		</Fragment>
	)
});
