import l, { plugin_namespace } from "../../utils/#";
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
	const { getMoveType } = select(plugin_namespace);

	return {
		move_type: getMoveType()
	};
})(Navigation);
