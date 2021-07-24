import { useState, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { store_slug } from "@/store";

import { getDropAreas } from "../get-drop-areas";
import type { Util } from "./types";
import type { DropArea } from "@/types";

export const useDropAreas: Util = props => {
	const { id, parent_id, ancestors_id } = props;

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
				ancestors_id,
				ids_visible,
				moving_block,
			})
		);
	}, [moving_block, id, ancestors_id, ids_visible]);

	return drop_areas;
};
