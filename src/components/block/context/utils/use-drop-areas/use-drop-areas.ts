import { useState, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

import { store_slug } from "@/store";
import type { DropArea } from "@/types";

import { getDropAreas } from "../get-drop-areas";
import type { Util } from "./types";

export const useDropAreas: Util = props => {
	const { id, parent_id, ancestor_ids } = props;

	const [drop_areas, setDropAreas] = useState<DropArea[]>([]);

	const moving_block = useSelect(select => select(store_slug).moving_block());
	const ids_visible = useSelect(select => select(store_slug).ids_visible());

	useEffect(() => {
		if (moving_block) return;

		setDropAreas([]);
	}, [moving_block]);

	useEffect(() => {
		if (!moving_block) return;

		setDropAreas(
			getDropAreas({
				id,
				parent_id,
				ancestor_ids,
				ids_visible,
				moving_block,
			})
		);
	}, [moving_block, id, ancestor_ids, parent_id, ids_visible]);

	return drop_areas;
};
