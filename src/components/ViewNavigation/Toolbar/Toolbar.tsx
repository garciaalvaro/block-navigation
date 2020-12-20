import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelect } from "@wordpress/data";

import styles from "./Toolbar.styl";
import { className } from "@/utils/tools";
import { store_slug } from "@/utils/data";
import { Button } from "@/utils/components";
import { Title as BlockTitle } from "@/components/Block/Title";

export const Toolbar: FunctionComponent = () => {
	const { resetMoving } = useDispatch(store_slug);

	const is_detached = useSelect(select => select(store_slug).isDetached());

	const moving_block = useSelect(select =>
		select(store_slug).getMovingBlock()
	);

	return (
		<div
			className={className({
				[styles.container]: true,
				[styles.is_detached]: is_detached,
			})}
		>
			<div className={styles.block_title}>
				{moving_block && <BlockTitle id={moving_block.id} />}
			</div>

			<Button type="text" className={styles.button} onClick={resetMoving}>
				{__("Cancel Move")}
			</Button>
		</div>
	);
};
