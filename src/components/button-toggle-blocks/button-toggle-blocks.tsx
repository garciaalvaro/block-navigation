import React from "react";
import type { FunctionComponent } from "react";
import { useDispatch, useSelect, select } from "@wordpress/data";
import { useMemo } from "@wordpress/element";

import { Icon } from "@/components/icon";
import { Button } from "@/utils";
import { store_slug } from "@/store";
import type { BlockId } from "@/types";

import styles from "./styles.styl";

export const ButtonToggleBlocks: FunctionComponent = () => {
	const { allBlocksCollapse, allBlocksExpand } = useDispatch(store_slug);

	const ids = useSelect(_select => _select(store_slug).ids());
	const ids_collapsed = useSelect(_select =>
		_select(store_slug).ids_collapsed()
	);

	const ids_root_collapsible = useMemo(() => {
		const { getBlockOrder } = select("core/block-editor");

		const root_ids = getBlockOrder("");

		// eslint-disable-next-line no-underscore-dangle
		const _ids_root_collapsible = root_ids.reduce<BlockId[]>((acc, id) => {
			if (getBlockOrder(id).length > 0) {
				return [...acc, id];
			}

			return acc;
		}, []);

		return _ids_root_collapsible;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ids]);

	const show_expand_all = useMemo(
		() => `${ids_collapsed.sort()}` === `${ids_root_collapsible.sort()}`,
		[ids_collapsed, ids_root_collapsible]
	);

	return (
		<Button
			className={styles.button}
			onClick={() => {
				if (show_expand_all) {
					allBlocksExpand();
				} else {
					allBlocksCollapse(ids_root_collapsible);
				}
			}}
		>
			<Icon icon={show_expand_all ? "expand_all" : "collapse_all"} />
		</Button>
	);
};
