import l, { pr_store } from "utils";
import ToggleListNested from "./ToggleListNested";
import CanReceiveDrop from "./_CanReceiveDrop";
import Div from "../Utils/_Html";
import Block from "../Block/Block";
import EndOfList from "../Block/EndOfList";

const { Fragment, Component } = wp.element;
const { withSelect } = wp.data;

class ListNested extends Component {
	render() {
		const {
			client_ids,
			parent_client_id,
			level,
			is_expanded,
			moving,
			moving_block,
			can_move
		} = this.props;

		return (
			<CanReceiveDrop
				parent_client_id={parent_client_id}
				moving={moving}
				moving_block={moving_block}
			>
				{can_receive_drop => (
					<Fragment>
						<ToggleListNested
							is_expanded={is_expanded}
							parent_client_id={parent_client_id}
						/>
						{is_expanded && (
							<Div className="list list-nested">
								{client_ids.map((client_id, index) => {
									const block = (
										<Block
											key={client_id}
											client_id={client_id}
											parent_client_id={parent_client_id}
											can_receive_drop={can_receive_drop}
											can_move={can_move}
											level={level + 1}
										/>
									);

									if (index + 1 === client_ids.length && can_move) {
										return (
											<Fragment key={index}>
												{block}
												<EndOfList
													client_id={client_id}
													parent_client_id={parent_client_id}
													can_receive_drop={can_receive_drop}
													can_move={can_move}
													level={level + 1}
													style_virtual={false}
												/>
											</Fragment>
										);
									}

									return block;
								})}
							</Div>
						)}
					</Fragment>
				)}
			</CanReceiveDrop>
		);
	}
}

export default withSelect((select, { parent_client_id }) => {
	const { getMovingBlock, getMoving, isExpanded } = select(pr_store);
	const { getTemplateLock } = select("core/editor");

	return {
		is_expanded: isExpanded(parent_client_id),
		moving: getMoving(),
		moving_block: getMovingBlock(),
		can_move: getTemplateLock(parent_client_id) !== "all"
	};
})(ListNested);
