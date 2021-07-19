import {
	useMemo,
	useRef,
	useState,
	useEffect,
	useCallback,
} from "@wordpress/element";

import styles from "./styles.styl";
import { useWindowSize } from "@/utils";
import type { Util, ItemStyle, ContentStyle } from "./types";

export const useVirtualList: Util = props => {
	const { item_height, items_index_to_keep_rendered, items_length } = props;
	const $container = useRef<HTMLDivElement | null>(null);
	const [container_height, setContainerHeight] = useState(0);

	const content_style = useMemo<ContentStyle>(() => {
		const offset = 2;

		return { height: item_height * (items_length + offset) };
	}, [item_height, items_length]);

	const [items_style, setItemsStyle] = useState<ItemStyle[]>([]);

	const { window_width, window_height } = useWindowSize();

	const updateItemsStyle = useCallback(() => {
		if (!$container.current) return;

		const offset = container_height / 2;
		const items_length_array = Array(items_length).fill(null);
		const scroll_top = $container.current.scrollTop || 0;
		const boundary_top = scroll_top - item_height - offset;
		const boundary_bottom = scroll_top + container_height + offset;

		const items_style = items_length_array.map((_, index) => {
			const top = index * item_height;

			if (items_index_to_keep_rendered?.includes(index)) {
				return { top };
			}

			if (boundary_top <= top && boundary_bottom > top) {
				return { top };
			}

			return undefined;
		});

		setItemsStyle(items_style);
	}, [
		container_height,
		items_length,
		item_height,
		items_index_to_keep_rendered,
	]);

	useEffect(() => {
		setContainerHeight($container.current?.clientHeight || 0);
	}, [window_width, window_height]);

	useEffect(() => {
		updateItemsStyle();

		$container.current?.addEventListener("scroll", updateItemsStyle);

		return () => {
			$container.current?.removeEventListener("scroll", updateItemsStyle);
		};
	}, [updateItemsStyle]);

	return {
		$container,
		container_className: styles.container,
		content_className: styles.content,
		content_style,
		items_style,
	};
};
