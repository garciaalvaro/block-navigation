import React, { FunctionComponent } from "react";
import { useSelect } from "@wordpress/data";
import { Icon as WpIcon } from "@wordpress/components";
import { Fragment } from "@wordpress/element";

import styles from "./Title.styl";

interface Props {
	id: BlockId;
}

export const Title: FunctionComponent<Props> = props => {
	const { id } = props;

	const name =
		useSelect(select => select("core/block-editor").getBlockName(id)) || "";

	const block_type = useSelect(select =>
		select("core/blocks").getBlockType(name)
	);

	const title = block_type?.title || name;

	const icon = block_type?.icon.src;

	return (
		<Fragment>
			{icon && (
				<div className={styles.icon}>
					<WpIcon icon={icon} />
				</div>
			)}

			<span className={styles.title}>{title}</span>
		</Fragment>
	);
};
