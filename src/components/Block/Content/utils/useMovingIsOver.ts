import { Dispatch, SetStateAction } from "react";
import { useSelect } from "@wordpress/data";
import { useState, useEffect } from "@wordpress/element";

import { store_slug } from "@/utils/data";

export const useMovingIsOver = (): {
	moving_is_over: boolean;
	setMovingIsOver: Dispatch<SetStateAction<boolean>>;
} => {
	const [moving_is_over, setMovingIsOver] = useState(false);

	const moving_block = useSelect(select =>
		select(store_slug).getMovingBlock()
	);

	useEffect(() => {
		if (moving_block) return;

		setMovingIsOver(false);
	}, [moving_block]);

	return { moving_is_over, setMovingIsOver };
};
