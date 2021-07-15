import React from "react";
import { registerPlugin } from "@wordpress/plugins";
import { PluginSidebarMoreMenuItem } from "@wordpress/edit-post";
import { Fragment } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

import { App } from "@/components/app";
import { Logo } from "@/components/logo";

const plugin_namespace = "block-navigation";
const plugin_title = __("Block Navigation");

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
