import React, { FunctionComponent } from "react";
import { get } from "lodash";
import { useState, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

import "./BlockContent.styl";
import { blocks_content_info } from "@/utils/data";
import { BlockContentImage } from "./BlockContentImage";
import { BlockContentText } from "./BlockContentText";

interface Props {
	id: BlockId;
	name: Block["name"];
}

export const BlockContent: FunctionComponent<Props> = props => {
	const { id, name } = props;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [content, setContent] = useState<any>(null);

	const [content_type, setContentType] = useState<null | "text" | "image">(
		null
	);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const attributes =
		useSelect(select =>
			select("core/block-editor").getBlockAttributes(id)
		) || {};

	useEffect(() => {
		if (!blocks_content_info[name]) {
			setContent(null);
			setContentType(null);

			return;
		}

		const content = get(attributes, blocks_content_info[name].path);

		if (content === undefined) {
			setContent(null);
			setContentType(null);

			return;
		}

		setContent(content);
		setContentType(blocks_content_info[name].type);
	}, [name, attributes]);

	if (!content_type) {
		return null;
	}

	if (content_type === "image") {
		return <BlockContentImage content_raw={content} />;
	}

	return <BlockContentText content_raw={content} />;
};
