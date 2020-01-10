import { useEffect, useContext } from "@wordpress/element";

import { ContextContainer } from "../App/AppContainer";
import { useIsSelected } from "./useIsSelected";

interface Props {
	id: BlockId;
	block_div: null | HTMLDivElement;
}

export const useScrollTo = (props: Props) => {
	const { id, block_div } = props;
	const container_div = useContext(ContextContainer);
	const is_selected = useIsSelected(id);

	useEffect(() => {
		if (!is_selected || !block_div || !container_div) return;

		const is_above = block_div.offsetTop - container_div.scrollTop < 0;

		const is_below =
			block_div.offsetTop - container_div.scrollTop + 50 >
			container_div.offsetHeight - 50;

		if (is_above || is_below) {
			container_div.scrollTop = block_div.offsetTop - 26;
		}
	}, [is_selected]);
};
