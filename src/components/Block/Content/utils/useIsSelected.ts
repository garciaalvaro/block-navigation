import { useSelect } from "@wordpress/data";

export const useIsSelected = (id: BlockId): boolean => {
	const is_selected_multiple = useSelect(select =>
		select("core/block-editor").getSelectedBlockClientIds()
	).includes(id);

	const is_selected_single = useSelect(
		select => select("core/block-editor").getSelectedBlockClientId() === id
	);

	const is_selected = is_selected_multiple || is_selected_single;

	return is_selected;
};
