import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useContext } from "@wordpress/element";
import copy from "copy-text-to-clipboard";

import { context } from "@/components/block";

import styles from "./styles.styl";
import { Button } from "../button";

export const ButtonCopyId: FunctionComponent = () => {
	const { id } = useContext(context);

	const onClick = () => copy(id);

	return (
		<Button className={styles.button} onClick={onClick} icon="copy">
			{__("Copy Block clientId")}
		</Button>
	);
};
