import React, { FunctionComponent } from "react";

import styles from "./MenuButton.styl";
import { Button, Icon } from "@/utils/components";

interface Props {
	onClick: () => void;
	icon: Icon;
	label: string;
	is_disabled?: boolean;
	className?: string;
}

export const MenuButton: FunctionComponent<Props> = props => {
	const { className, onClick, icon, label, is_disabled } = props;

	return (
		<Button
			className={[
				className,
				styles.button,
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
