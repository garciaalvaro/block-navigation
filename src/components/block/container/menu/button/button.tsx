import React, { FunctionComponent } from "react";

import styles from "./button.styl";
import { Button as ButtonUtil } from "../../../../button";
import { Icon } from "../../../../icon";

interface Props {
	onClick: () => void;
	icon: Icon;
	label: string;
	is_disabled?: boolean;
	className?: string;
}

export const Button: FunctionComponent<Props> = props => {
	const { className, onClick, icon, label, is_disabled } = props;

	return (
		<ButtonUtil
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
		</ButtonUtil>
	);
};
