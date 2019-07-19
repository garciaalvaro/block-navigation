import l, { Div, pr_store } from "utils";
// import ListRoot from "../List/ListRoot";
// import MovingInfo from "./MovingInfo";
import List from "./List";

const { withSelect } = wp.data;

const Navigation = props => {
	return (
		<Div id="navigation">
			<List />
			{/* <ListRoot /> */}
			{/* {props.moving_type === "by_click" && <MovingInfo />} */}
		</Div>
	);
};

export default withSelect(select => {
	const { getMovingType } = select(pr_store);

	return {
		moving_type: getMovingType()
	};
})(Navigation);
