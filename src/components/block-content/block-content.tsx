import React from "react";
import type { FunctionComponent } from "react";
import { useContext } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { Icon as WpIcon } from "@wordpress/components";

import styles from "./styles.styl";
import { store_slug } from "@/store";
import { context } from "../block";
import { Content, Title } from "./components";

export const BlockContent: FunctionComponent = () => {
	const { id } = useContext(context);

	const block_name = useSelect(
		select => select("core/block-editor").getBlockName(id) || ""
	);

	const block_type = useSelect(select =>
		select("core/blocks").getBlockType(block_name)
	);

	const block_info_displayed = useSelect(select =>
		select(store_slug).block_info_displayed()
	);

	const icon = block_type?.icon.src;

	const show_title =
		block_info_displayed === "title" ||
		block_info_displayed === "title_content";

	const show_content =
		block_info_displayed === "content" ||
		block_info_displayed === "title_content";

	return (
		<div className={styles.container}>
			{icon && (
				<div className={styles.icon}>
					<WpIcon icon={icon} />
				</div>
			)}

			{show_title && <Title />}

			{show_content && <Content />}
		</div>
	);
};
