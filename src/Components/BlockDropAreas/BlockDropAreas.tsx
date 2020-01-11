import "./BlockDropAreas.styl";
import { Div } from "utils/Components";

interface Props {
	drop_areas: DropArea[];
}

export const BlockDropAreas: React.ComponentType<Props> = props => {
	const { drop_areas } = props;

	return (
		<Div className="block">
			{drop_areas.map(({ id, level }) => (
				<Div key={id} className={["drop_overlay", `level-${level}`]}></Div>
			))}
		</Div>
	);
};
