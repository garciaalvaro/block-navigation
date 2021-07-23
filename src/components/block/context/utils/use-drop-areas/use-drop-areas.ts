import { useState, useEffect, useRef } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { store_slug } from "@/store";

import { getPrevId } from "../get-prev-id";
import { getDropAreas } from "../get-drop-areas";
import type { Util } from "./types";
import type { DropArea } from "@/types";

export const useDropAreas: Util = props => {
	const { id, ancestors_id } = props;

	const [drop_areas, setDropAreas] = useState<DropArea[]>([]);

	const can_receive_drop = useRef(true);

	const moving_block = useSelect(select => select(store_slug).moving_block());
	const ids_visible = useSelect(select => select(store_slug).ids_visible());

	useEffect(() => {
		if (moving_block) {
			const moving_block_is_ancestor = ancestors_id.includes(
				moving_block.id
			);

			const moving_block_is_prev =
				moving_block.id === getPrevId(id, ids_visible);

			const is_moving_block = moving_block.id === id;

			can_receive_drop.current =
				!moving_block_is_ancestor &&
				!moving_block_is_prev &&
				!is_moving_block;
		} else {
			can_receive_drop.current = true;
		}
	}, [moving_block]);

	useEffect(() => {
		if (moving_block) return;

		setDropAreas([]);
		can_receive_drop.current = false;
	}, [moving_block]);

	useEffect(() => {
		if (!moving_block || !can_receive_drop.current) return;

		setDropAreas(
			getDropAreas({
				id,
				ancestors_id,
				ids_visible,
				moving_block,
			})
		);
	}, [moving_block, id, ...ancestors_id, ...ids_visible]);

	return drop_areas;
};
