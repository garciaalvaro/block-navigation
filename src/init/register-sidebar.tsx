import { registerPlugin } from "@wordpress/plugins";
import { PluginSidebar, PluginSidebarMoreMenuItem } from "@wordpress/edit-post";
import { Fragment } from "@wordpress/element";

import { plugin_namespace, plugin_title } from "utils/data";
import { Icon } from "utils/Components";
import { App } from "Components/App/App";

registerPlugin(plugin_namespace, {
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
