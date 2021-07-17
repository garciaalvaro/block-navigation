import React from "react";
import { registerPlugin } from "@wordpress/plugins";
import { PluginSidebarMoreMenuItem } from "@wordpress/edit-post";
import { Fragment } from "@wordpress/element";

import { App } from "@/components/app";
import { Logo } from "@/components/logo";
import { plugin_namespace, plugin_title } from "@/utils";

registerPlugin(plugin_namespace, {
	// @ts-expect-error TODO
	icon: <Logo />,

	render: () => {
		return (
			<Fragment>
				<App />

				<PluginSidebarMoreMenuItem target={plugin_namespace}>
					{plugin_title}
				</PluginSidebarMoreMenuItem>
			</Fragment>
		);
	},
});
