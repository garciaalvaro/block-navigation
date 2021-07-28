import styles from "./styles.styl";
import type { Util } from "./types";
import { useContainerHeight } from "../use-container-height";
import { useContentStyles } from "../use-content-styles";
import { useItemsStyles } from "../use-items-styles";

export const useVirtualList: Util = props => {
	const { item_height, number_of_items } = props;

	const { $container, container_height } = useContainerHeight();

	const content_styles = useContentStyles({ item_height, number_of_items });

	const { items_styles, items_visible } = useItemsStyles({
		$container,
		item_height,
		container_height,
		number_of_items,
	});

	return {
		$container,
		container_className: styles.container,
		content_styles,
		items_styles,
		items_visible,
	};
};
