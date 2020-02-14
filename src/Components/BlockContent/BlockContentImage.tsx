import { useState, useEffect } from "@wordpress/element";

import { Div, Img } from "utils/Components";

interface Props {
	content_raw: { url: string }[] | string;
}

export const BlockContentImage: React.ComponentType<Props> = props => {
	const { content_raw } = props;
	const [content, setContent] = useState<null | string[]>(null);

	useEffect(() => {
		if (Array.isArray(content_raw)) {
			setContent(content_raw.map(({ url }) => url));
		} else {
			setContent([content_raw]);
		}
	}, [content_raw]);

	if (!content) {
		return null;
	}

	return (
		<Div className={["block-content", "content_type-image"]}>
			{content.map((url, index) => (
				<Div key={index} className="block-image-container">
					<Img className="block-image" src={url} />
				</Div>
			))}
		</Div>
	);
};
