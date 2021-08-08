import React from "react";
import { registerPlugin } from "@wordpress/plugins";

import { App } from "@/components/app";
import { Logo } from "@/components/logo";
import { plugin_namespace } from "@/utils";

registerPlugin(plugin_namespace, {
	// @ts-expect-error TODO
	icon: <Logo />,
	render: App,
});
