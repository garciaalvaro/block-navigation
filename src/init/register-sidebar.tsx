import { plugin_namespace, plugin_title } from "utils/data";
import { Icon } from "utils/Components";
import { App } from "Components/App/App";

const { Fragment } = wp.element;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;

wp.plugins.registerPlugin(plugin_namespace, {
	// @ts-ignore
	icon: <Icon icon="logo" />,
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
