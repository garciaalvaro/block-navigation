import React from "react";
import { render } from "@wordpress/element";
import { select } from "@wordpress/data";

import { store } from "./register-store";
import { store_slug } from "@/utils/data";
import { AppDetached } from "@/components/App";

const $container = document.createElement("div");
$container.id = "block-navigation-detached";

const renderDetached = () => {
	document.body.appendChild($container);

	render(<AppDetached />, $container);
};

const removeDetached = () => {
	$container.parentNode?.removeChild($container);
};

let is_detached = select(store_slug).isDetached();

if (is_detached) {
	renderDetached();
}

store.subscribe(() => {
	const is_detached_next = store.getState().is_detached;

	if (is_detached === is_detached_next) return;

	is_detached = is_detached_next;

	if (is_detached) {
		renderDetached();
	} else {
		removeDetached();
	}
});
