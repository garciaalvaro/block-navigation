import styles from "./styles.styl";
import type { Util } from "./types";
import { useContainerHeight } from "../use-container-height";
import { useContentStyles } from "../use-content-styles";
import { useItemsStyles } from "../use-items-styles";

export const useVirtualList: Util = props => {
	const { item_ids, item_height } = props;

	const { $container, container_height } = useContainerHeight();

	const content_styles = useContentStyles({
		item_height,
		number_of_items: item_ids.length,
	});

	const items_styles = useItemsStyles({
		$container,
		container_height,
		item_height,
		item_ids,
	});

	return {
		$container,
		container_className: styles.container,
		content_styles,
		items_styles,
	};
};
