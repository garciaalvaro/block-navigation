import React, { FunctionComponent } from "react";
import { useSelect, useDispatch } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

import styles from "./DetachedButtons.styl";
import { Button } from "@/utils/components/Button";
import { Icon } from "@/utils/components/Icon";
import { store_slug } from "@/utils/data";

export const DetachedButtons: FunctionComponent = () => {
	const is_detached = useSelect(select => select(store_slug).isDetached());

	const is_expanded = useSelect(select =>
		select(store_slug).detachedIsExpanded()
	);

	const { setDetached, expandDetached, collapseDetached } = useDispatch(
		store_slug
	);

	const { openGeneralSidebar } = useDispatch("core/edit-post");

	const close = () => {
		setDetached(!is_detached);

		if (!is_detached) {
			openGeneralSidebar("edit-post/block");
		}
	};

	const toggle = is_expanded ? collapseDetached : expandDetached;

	return (
		<div className={styles.container}>
			<Button className={styles.button} onClick={close}>
				<Icon icon={is_detached ? "close" : "detach"} />

				<span>{is_detached ? __("Close") : __("Detach")}</span>
			</Button>

			{is_detached && (
				<Button className={styles.button} onClick={toggle}>
					<Icon icon={is_expanded ? "detach" : "expand"} />

					<span>{is_expanded ? __("Collapse") : __("Expand")}</span>
				</Button>
			)}
		</div>
	);
};
