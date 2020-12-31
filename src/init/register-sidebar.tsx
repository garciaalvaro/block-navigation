import React from "react";
import { registerPlugin } from "@wordpress/plugins";
import { PluginSidebar, PluginSidebarMoreMenuItem } from "@wordpress/edit-post";
import { Fragment } from "@wordpress/element";

import { plugin_namespace, plugin_title } from "@/utils/data";
import { App } from "@/components/App";
import { Logo } from "@/components/Logo";

registerPlugin(plugin_namespace, {
	icon: () => <Logo />,

	render: () => (
		<Fragment>
			<PluginSidebar name={plugin_namespace} title={plugin_title}>
				<App />
			</PluginSidebar>

			<PluginSidebarMoreMenuItem target={plugin_namespace}>
				{plugin_title}
			</PluginSidebarMoreMenuItem>
		</Fragment>
	),
});
