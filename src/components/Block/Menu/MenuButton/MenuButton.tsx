import React, { FunctionComponent } from "react";

import styles from "./MenuButton.styl";
import { Button, Icon } from "@/utils/components";

interface Props {
	onClick: () => void;
	icon: Icon;
	label: string;
	is_disabled?: boolean;
}

export const MenuButton: FunctionComponent<Props> = props => {
	const { onClick, icon, label, is_disabled } = props;

	return (
		<Button
			className={[
				styles.container,
				is_disabled ? styles.is_disabled : null,
			]}
			onClick={onClick}
		>
			<div className={styles.icon}>
				<Icon icon={icon} />
			</div>

			<span>{label}</span>
		</Button>
	);
};
