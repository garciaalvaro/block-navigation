import { useSelect, useDispatch } from "@wordpress/data";
import { useState, useLayoutEffect, useContext } from "@wordpress/element";

import { useClassName } from "@/utils";

import styles from "./styles.styl";
import type { Util } from "./types";
import { context } from "../../context";

export const useSelectBlock: Util = () => {
	const { id } = useContext(context);

	const is_selected_multiple = useSelect(select =>
		select("core/block-editor").getSelectedBlockClientIds().includes(id)
	);

	const is_selected_single = useSelect(
		select => select("core/block-editor").getSelectedBlockClientId() === id
	);

	const [is_selected, setIsSelected] = useState(
		is_selected_single || is_selected_multiple
	);

	const { selectBlock } = useDispatch("core/block-editor");

	const onClick = () => {
		setIsSelected(true);
		selectBlock(id);
	};

	const className = useClassName([is_selected], {
		[styles.is_selected]: is_selected,
	});

	useLayoutEffect(() => {
		setIsSelected(is_selected_multiple || is_selected_single);
	}, [is_selected_multiple, is_selected_single]);

	return {
		className,
		onClick,
	};
};
