import { isArray } from "lodash";
import { useMemo } from "@wordpress/element";

import { Div, Span, Img } from "utils/Components";
import { block_types } from "utils/data";
import { getContent } from "utils/tools";

interface Props {
	block: Block;
}

export const BlockHeaderContent: React.ComponentType<Props> = props => {
	const { block } = props;
	const content = useMemo(
		() => (block_types[block.name] ? getContent(block) : null),
		// TODO: test useMemo dependencies array
		[block]
	);

	if (!content) {
		return null;
	}

	if (isArray(content)) {
		return (
			<Div className={["block-content", "content_type-image"]}>
				{content.map((url, index) => (
					<Div key={index} className="block-image-container">
						<Img className="block-image" src={url} />
					</Div>
				))}
			</Div>
		);
	}

	return (
		<Span className={["block-content", "content_type-text"]}>{content}</Span>
	);
};
