import { Block } from "Components/Block/Block";

type Props = {
	ids: string[];
	level: number;
	parent_id?: string;
};

const { Fragment } = wp.element;

export const BlockList: React.ComponentType<Props> = props => {
	const { parent_id, ids, level } = props;

	return (
		<Fragment>
			{ids.map((id, index) => (
				<Block
					key={id}
					id={id}
					parent_id={parent_id || ""}
					level={level}
					index={index}
					is_last_children={index + 1 === ids.length}
				/>
			))}
		</Fragment>
	);
};
