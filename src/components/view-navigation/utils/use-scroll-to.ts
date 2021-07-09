import { useEffect, useLayoutEffect, useState } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

interface Props {
	block_ids: BlockId[];
	$list: HTMLDivElement | null;
}

export const useScrollTo = (props: Props): void => {
	const { block_ids, $list } = props;

	const [is_ready, setIsReady] = useState(false);

	const selected_blocks = useSelect(select =>
		select("core/block-editor").getSelectedBlockClientIds()
	);

	const selected_block = useSelect(select =>
		select("core/block-editor").getSelectedBlockClientId()
	);

	// The first render, props.$ref doesn't have a value assigned yet.
	// The list of blocks returns empty on the first call. For these
	// reasons we keep track of when the component is ready.
	useEffect(() => {
		if (is_ready || !block_ids.length) return;

		setIsReady(true);
	}, [block_ids]);

	useLayoutEffect(() => {
		if (!$list || (!selected_blocks.length && !selected_block)) return;

		const block_index = block_ids.findIndex(id => {
			if (selected_blocks.length) return selected_blocks.includes(id);

			return selected_block === id;
		});

		if (block_index === -1) return;

		const block_height = 52;

		const block_offsetTop = block_height * block_index;

		const is_above = block_offsetTop - $list.scrollTop < 0;

		const is_below =
			block_offsetTop + block_height - $list.scrollTop >
			$list.offsetHeight;

		if (is_above || is_below) {
			$list.scrollTop = block_offsetTop - block_height / 2;
		}
	}, [is_ready, ...selected_blocks, selected_block]);
};
