import React, { FunctionComponent } from "react";

import styles from "./MenuButton.styl";
import { Button } from "@/utils/components/Button";
import { Icon } from "@/utils/components/Icon";

interface Props {
	// eslint-disable-next-line @typescript-eslint/ban-types
	onClick: Function;
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
