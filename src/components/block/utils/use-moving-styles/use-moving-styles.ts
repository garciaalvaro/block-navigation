import { useSelect } from "@wordpress/data";
import { useContext, useMemo } from "@wordpress/element";

import { useClassName } from "@/utils";
import { store_slug } from "@/store";

import styles from "./styles.styl";
import type { Util } from "./types";
import { context } from "../../context";

export const useMovingStyles: Util = props => {
	const { moving_is_over, is_moving, can_move } = props;

	const { ancestors_id, drop_areas } = useContext(context);

	const moving_type = useSelect(select => select(store_slug).moving_type());
	const moving_block = useSelect(select => select(store_slug).moving_block());

	const ancestor_is_moving = useMemo(() => {
		if (!moving_block) {
			return false;
		}

		if (!ancestors_id.includes(moving_block.id)) {
			return false;
		}

		return true;
	}, [moving_block, ancestors_id]);

	const className_container = useClassName(
		[
			moving_type,
			moving_is_over,
			ancestor_is_moving,
			is_moving,
			drop_areas,
		],
		{
			[styles.container]: true,
			[styles["moving_type-by_click"]]: moving_type === "by_click",
			[styles.moving_is_over]: moving_is_over,
			[styles["no-moving_is_over"]]: !moving_is_over,
			[styles.ancestor_is_moving]: ancestor_is_moving,
			[styles.a_block_is_moving]: !!moving_block,
			[styles["no-a_block_is_moving"]]: !moving_block,
			[styles.is_moving]: is_moving,
			[styles.can_move]: can_move,
			[styles["no-can_move"]]: !can_move,
			[styles.can_receive_drop]: drop_areas.length > 0,
		}
	);

	return {
		className_container,
		className_content: styles.content,
	};
};
