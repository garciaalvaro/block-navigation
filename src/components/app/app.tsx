import React from "react";
import type { FunctionComponent } from "react";
import { useSelect } from "@wordpress/data";
import { PluginSidebar } from "@wordpress/edit-post";
import { createPortal, Fragment, useRef } from "@wordpress/element";

import { store_slug, SideEffects } from "@/store";
import { plugin_namespace, plugin_title, useWindowSize } from "@/utils";

import { AppDetached } from "../app-detached";
import { AppSidebar } from "../app-sidebar";

export const App: FunctionComponent = () => {
	const $root = useRef(document.getElementById("editor"));

	const is_detached = useSelect(select => select(store_slug).is_detached());

	const { is_mobile } = useWindowSize();

	const showDetached = is_detached && !is_mobile;

	// Render PluginSidebar component always.
	// Render the Detached component (in a portal) only when it is enabled.
	return (
		<Fragment>
			<SideEffects />

			{showDetached &&
				$root.current &&
				createPortal(<AppDetached />, $root.current)}

			<PluginSidebar name={plugin_namespace} title={plugin_title}>
				<AppSidebar />
			</PluginSidebar>
		</Fragment>
	);
};
