import React from "react";
import type { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useDispatch } from "@wordpress/data";
import { useContext } from "@wordpress/element";

import { context } from "@/components/block";
import { Button } from "../button";

export const ButtonRemove: FunctionComponent = () => {
	const { id } = useContext(context);

	const { removeBlock } = useDispatch("core/block-editor");

	const onClick = () => removeBlock(id);

	return (
		<Button onClick={onClick} icon="remove">
			{__("Remove Block")}
		</Button>
	);
};
