import React from "react";
import type { FunctionComponent } from "react";
import { useDispatch } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

import styles from "./styles.styl";
import { Icon } from "@/components/Icon";
import { useButton, useClassName } from "@/utils";
import { store_slug } from "@/store";

export const DetachButton: FunctionComponent = () => {
	const { detachedDetach } = useDispatch(store_slug);
	const { openGeneralSidebar } = useDispatch("core/edit-post");

	const button_props = useButton();
	const className = useClassName(styles.button, button_props.className);

	const close = () => {
		detachedDetach();
		openGeneralSidebar("edit-post/block");
	};

	return (
		<button className={className} onClick={close}>
			<Icon icon="detach" />
			<span>{__("Detach")}</span>
		</button>
	);
};
