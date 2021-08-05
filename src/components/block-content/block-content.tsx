import React from "react";
import type { FunctionComponent } from "react";
import { useContext, useMemo } from "@wordpress/element";
import { useSelect, select } from "@wordpress/data";
import { Icon as WpIcon } from "@wordpress/components";

import { store_slug } from "@/store";

import styles from "./styles.styl";
import { context } from "../block";
import { Content, Title } from "./components";

export const BlockContent: FunctionComponent = () => {
	const { id } = useContext(context);

	const block_name = useSelect(
		_select => _select("core/block-editor").getBlockName(id) || "",
		[id]
	);

	const block_type = useSelect(
		_select => _select("core/blocks").getBlockType(block_name),
		[block_name]
	);

	const block_info_displayed = useSelect(_select =>
		_select(store_slug).block_info_displayed()
	);

	const block_attrs = useSelect(
		_select => _select("core/block-editor").getBlockAttributes(id) || {},
		[id]
	);

	const block_icon = useMemo(() => {
		// @ts-expect-error @wordpress/blocks types are outdated
		const { getActiveBlockVariation } = select("core/blocks");

		// Check for older WP versions
		if (getActiveBlockVariation) {
			// eslint-disable-next-line no-undef
			const block_variation: { icon: { src: JSX.Element } } =
				getActiveBlockVariation(block_name, block_attrs);

			if (block_variation && block_variation.icon.src) {
				return block_variation.icon.src;
			}
		}

		return block_type?.icon.src;
	}, [block_type, block_name, block_attrs]);

	const show_title =
		block_info_displayed === "title" ||
		block_info_displayed === "title_content";

	const show_content =
		block_info_displayed === "content" ||
		block_info_displayed === "title_content";

	return (
		<div className={styles.container}>
			{block_icon && (
				<div className={styles.icon}>
					<WpIcon icon={block_icon} />
				</div>
			)}

			{show_title && <Title />}

			{show_content && <Content />}
		</div>
	);
};
