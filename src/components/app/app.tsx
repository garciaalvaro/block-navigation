import React from "react";
import type { FunctionComponent } from "react";
import { useSelect } from "@wordpress/data";
import { PluginSidebar } from "@wordpress/edit-post";
import { createPortal, Fragment } from "@wordpress/element";

import { store_slug, SideEffects } from "@/store";
import { plugin_namespace, plugin_title, useWindowSize } from "@/utils";

import { AppDetached } from "../app-detached";
import { AppSidebar } from "../app-sidebar";

export const App: FunctionComponent = () => {
	const is_detached = useSelect(select => select(store_slug).is_detached());

	const { is_mobile } = useWindowSize();

	// Render PluginSidebar component always.
	// Render the Detached component (in a portal) only when it is enabled.
	return (
		<Fragment>
			<SideEffects />

			{is_detached &&
				!is_mobile &&
				createPortal(<AppDetached />, document.body)}

			<PluginSidebar name={plugin_namespace} title={plugin_title}>
				<AppSidebar />
			</PluginSidebar>
		</Fragment>
	);
};
