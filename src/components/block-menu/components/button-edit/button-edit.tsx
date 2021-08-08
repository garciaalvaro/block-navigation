import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useDispatch } from "@wordpress/data";
import { useContext } from "@wordpress/element";

import { context } from "@/components/block";
import { Button } from "../button";

export const ButtonEdit: FunctionComponent = () => {
	const { id } = useContext(context);

	const { openGeneralSidebar } = useDispatch("core/edit-post");
	const { selectBlock } = useDispatch("core/block-editor");

	const onClick = () => {
		selectBlock(id);
		openGeneralSidebar("edit-post/block");
	};

	return (
		<Button onClick={onClick} icon="edit">
			{__("Open Block Settings")}
		</Button>
	);
};
