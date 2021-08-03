import React from "react";
import type { FunctionComponent } from "react";
import { useDispatch, useSelect } from "@wordpress/data";
import { useEffect } from "@wordpress/element";

import { Icon } from "@/components/icon";
import { Button, useToggle } from "@/utils";
import { store_slug } from "@/store";
import type { BlockId } from "@/types";

import styles from "./styles.styl";

export const ButtonToggleBlocks: FunctionComponent = () => {
	const { idsCollapsedUpdate } = useDispatch(store_slug);

	const ids_collapsed = useSelect(_select =>
		_select(store_slug).ids_collapsed()
	);

	const ids_root_collapsible = useSelect(select => {
		const { getBlockOrder } = select("core/block-editor");

		const root_ids = getBlockOrder("");

		const ids = root_ids.reduce<BlockId[]>((acc, id) => {
			if (getBlockOrder(id).length > 0) {
				return [...acc, id];
			}

			return acc;
		}, []);

		return ids;
	});

	const {
		open: buttonShowExpand,
		close: buttonShowCollapse,
		is_open: button_shows_expanded,
	} = useToggle(true);

	const expandAll = () => {
		idsCollapsedUpdate([]);
	};

	const collapseAll = () => {
		idsCollapsedUpdate(ids_root_collapsible);
	};

	useEffect(() => {
		if (`${ids_collapsed}` === `${ids_root_collapsible}`) {
			buttonShowExpand();
		} else {
			buttonShowCollapse();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ids_collapsed]);

	return (
		<Button
			className={styles.button}
			onClick={button_shows_expanded ? expandAll : collapseAll}
		>
			<Icon
				icon={button_shows_expanded ? "expand_all" : "collapse_all"}
			/>
		</Button>
	);
};
