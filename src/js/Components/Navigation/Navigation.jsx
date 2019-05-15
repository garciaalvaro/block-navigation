import l, { pr_store } from "utils";
import Div from "../Utils/_Html";
import ListRoot from "../List/ListRoot";
import MoveInfo from "./MoveInfo";

const { Component } = wp.element;
const { withSelect } = wp.data;

class Navigation extends Component {
	render() {
		return (
			<Div id="bn-panel-navigation">
				<ListRoot />
				{this.props.move_type === "by_click" && <MoveInfo />}
			</Div>
		);
	}
}

export default withSelect(select => {
	const { getMoveType } = select(pr_store);

	return {
		move_type: getMoveType()
	};
})(Navigation);
