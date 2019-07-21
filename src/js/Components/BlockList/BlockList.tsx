import { Div } from "utils/components";
import { Block } from "Components/Block/Block";

type withSelect = {
	ids: string[];
	level: number;
	id?: string;
};
type Props = withSelect;

const { withSelect } = wp.data;

export const BlockList: React.ComponentType<Props> = props => {
	const { id: parent_id, ids, level } = props;

	return (
		<Div classes={["block-list"]}>
			{ids.map((id, index) => (
				<Block
					key={id}
					id={id}
					parent_id={parent_id || ""}
					level={level}
					index={index}
				/>
			))}
		</Div>
	);
};
