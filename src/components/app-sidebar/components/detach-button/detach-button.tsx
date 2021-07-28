import React from "react";
import type { FunctionComponent } from "react";
import { useDispatch } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

import styles from "./styles.styl";
import { Icon } from "@/components/icon";
import { Button } from "@/utils";
import { store_slug } from "@/store";

export const DetachButton: FunctionComponent = () => {
	const { detachedDetach } = useDispatch(store_slug);
	const { openGeneralSidebar } = useDispatch("core/edit-post");

	const close = () => {
		detachedDetach();
		openGeneralSidebar("edit-post/block");
	};

	return (
		<Button className={styles.button} onClick={close}>
			<Icon icon="detach" />
			<span>{__("Detach")}</span>
		</Button>
	);
};
