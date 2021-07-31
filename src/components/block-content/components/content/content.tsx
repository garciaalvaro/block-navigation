import React from "react";
import type { FunctionComponent } from "react";
import { get } from "lodash";
import { useMemo, useContext, Fragment } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

import { blocks_content } from "@/utils";
import { context } from "@/components/block";
import { store_slug } from "@/store";

import styles from "./styles.styl";
import { getText } from "./utils";
import { Title } from "../title";

export const Content: FunctionComponent = () => {
	const { id } = useContext(context);

	const name = useSelect(
		select => select("core/block-editor").getBlockName(id) || ""
	);

	const attributes = useSelect(
		select => select("core/block-editor").getBlockAttributes(id) || {}
	);

	const block_info_displayed = useSelect(select =>
		select(store_slug).block_info_displayed()
	);

	const block_content = useMemo(() => blocks_content[name], [name]);

	const content = useMemo(() => {
		if (block_content?.type === "image") {
			const attr_value: { url: string }[] | string = get(
				attributes,
				block_content.path
			);

			if (Array.isArray(attr_value)) {
				return attr_value.map(({ url }) => url);
			}

			return [attr_value];
		}

		if (block_content?.type === "text") {
			const attr_value: string = get(attributes, block_content.path);

			return [getText(attr_value)];
		}

		return null;
	}, [block_content, attributes]);

	if (block_content?.type === "text") {
		if (content && content[0] !== null) {
			return (
				<Fragment>
					{block_info_displayed === "title_content" && (
						<span className={styles.separator}>|</span>
					)}

					<span className={styles.text}>{content[0]}</span>
				</Fragment>
			);
		}

		if (block_info_displayed === "content") {
			return <Title />;
		}
	}

	if (content && block_content?.type === "image") {
		return (
			<Fragment>
				{block_info_displayed === "title_content" && (
					<span className={styles.separator}>|</span>
				)}

				{content.map((url, index) => (
					// Images might be repeated so we cant use the image url
					// eslint-disable-next-line react/no-array-index-key
					<span key={index} className={styles.image_container}>
						<img src={url} alt={__("Block content")} />
					</span>
				))}
			</Fragment>
		);
	}

	return null;
};
