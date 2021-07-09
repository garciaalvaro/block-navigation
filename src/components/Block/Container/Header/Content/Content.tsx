import React, { FunctionComponent } from "react";
import { get } from "lodash";
import { useState, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

import { blocks_content } from "@/utils/data";
import { Images } from "./images";
import { Text } from "./text";

interface Props {
	id: BlockId;
}

export const Content: FunctionComponent<Props> = props => {
	const { id } = props;

	const name =
		useSelect(select => select("core/block-editor").getBlockName(id)) || "";

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [content, setContent] = useState<any>(null);

	const [content_type, setContentType] = useState<null | "text" | "image">(
		null
	);

	const attributes =
		useSelect(select =>
			select("core/block-editor").getBlockAttributes(id)
		) || {};

	useEffect(() => {
		if (!blocks_content[name]) {
			setContent(null);
			setContentType(null);

			return;
		}

		const { path, type } = blocks_content[name];
		const content = get(attributes, path);

		if (!content) {
			setContent(null);
			setContentType(null);

			return;
		}

		setContent(content);
		setContentType(type);
	}, [name, attributes]);

	if (!content_type) {
		return null;
	}

	if (content_type === "image") {
		return <Images content_raw={content} />;
	}

	return <Text content_raw={content} />;
};
