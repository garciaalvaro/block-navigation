import { useSelect } from "@wordpress/data";
import { useState, useEffect } from "@wordpress/element";

import { getAncestorsId } from "@/utils/tools";

export const useAncestorsId = (id: BlockId): BlockId[] => {
	const blocks_id = useSelect(select =>
		select("core/block-editor").getClientIdsWithDescendants()
	);

	const [ancestors_id, setAncestorsId] = useState(getAncestorsId(id));

	useEffect(() => {
		const ancestors_id = getAncestorsId(id);

		setAncestorsId(ancestors_id);
	}, [blocks_id]);

	return ancestors_id;
};
