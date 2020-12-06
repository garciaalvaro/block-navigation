import React, { FunctionComponent } from "react";
import { useSelect, useDispatch } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

import styles from "./DetachedButton.styl";
import { Button } from "@/utils/components/Button";
import { Icon } from "@/utils/components/Icon";
import { store_slug } from "@/utils/data";

export const DetachedButton: FunctionComponent = () => {
	const is_detached = useSelect(select => select(store_slug).isDetached());
	const { setDetached } = useDispatch(store_slug);
	const { openGeneralSidebar } = useDispatch("core/edit-post");

	const onClick = () => {
		setDetached(!is_detached);

		if (!is_detached) {
			openGeneralSidebar("edit-post/block");
		}
	};

	return (
		<Button className={styles.container} onClick={onClick}>
			<Icon icon={is_detached ? "close" : "detach"} />

			<span>{is_detached ? __("Close") : __("Detach")}</span>
		</Button>
	);
};
