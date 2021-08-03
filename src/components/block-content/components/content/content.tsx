import React from "react";
import type { FunctionComponent } from "react";
import { get } from "lodash";
import { useMemo, useContext, Fragment } from "@wordpress/element";
import { useSelect, select } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

import { blocks_content } from "@/utils";
import { context } from "@/components/block";
import { store_slug } from "@/store";

import styles from "./styles.styl";
import { getText } from "./utils";
import { Title } from "../title";

export const Content: FunctionComponent = () => {
	const { id } = useContext(context);

	const block_name = useSelect(
		_select => _select("core/block-editor").getBlockName(id) || ""
	);

	const block_attrs = useSelect(
		_select => _select("core/block-editor").getBlockAttributes(id) || {}
	);

	const block_info_displayed = useSelect(_select =>
		_select(store_slug).block_info_displayed()
	);

	const block_content = useMemo(
		() => blocks_content[block_name],
		[block_name]
	);

	const content = useMemo(() => {
		if (block_content?.type === "image") {
			const attr_value: { url: string }[] | string = get(
				block_attrs,
				block_content.path
			);

			if (Array.isArray(attr_value)) {
				return attr_value.map(({ url }) => url);
			}

			return [attr_value];
		}

		if (block_content?.type === "text") {
			const attr_value: string = get(block_attrs, block_content.path);

			return [getText(attr_value)];
		}

		// @ts-expect-error @wordpress/blocks types are outdated
		const { getActiveBlockVariation } = select("core/blocks");

		// Check for older WP versions
		if (getActiveBlockVariation) {
			const block_variation: { title: string } = getActiveBlockVariation(
				block_name,
				block_attrs
			);

			if (block_variation && block_variation.title) {
				return [block_variation.title];
			}
		}

		return null;
	}, [block_content, block_name, block_attrs]);

	if (content && content[0]) {
		if (block_content?.type === "image") {
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

	return null;
};
