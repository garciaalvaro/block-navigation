import React from "react";
import type { FunctionComponent } from "react";
import { useContext } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { ArrowContainer, Popover } from "react-tiny-popover";

import styles from "./styles.styl";
import { useColor, useClassName, useButton } from "@/utils";
import { store_slug } from "@/store";
import { context } from "../block";
import { Icon } from "../icon";
import {
	ButtonEdit,
	ButtonMoveTo,
	ButtonsMove,
	ButtonRemove,
	ButtonCopyId,
	ButtonBlockData,
} from "./components";

export const BlockMenu: FunctionComponent = () => {
	const { toggleMenu, menu_is_open } = useContext(context);
	const is_dev = useSelect(select => select(store_slug).is_dev());

	const { className: color_className, color_type } = useColor();
	const menu_className = useClassName(styles.menu, color_className);
	const popover_className = useClassName(styles.popover, color_className);

	const button_props = useButton("icon");
	const className_button = useClassName(
		styles.button,
		button_props.className
	);

	return (
		<Popover
			containerClassName={popover_className}
			isOpen={menu_is_open}
			onClickOutside={close}
			containerStyle={{ transition: "none" }}
			content={({ position, childRect, popoverRect }) => (
				<ArrowContainer
					position={position}
					childRect={childRect}
					popoverRect={popoverRect}
					arrowColor={color_type === "light" ? "#23282c" : "#fff"}
					arrowSize={6}
				>
					<div className={menu_className}>
						<ButtonEdit />
						<ButtonMoveTo />
						<ButtonsMove />
						<ButtonRemove />

						{is_dev && <ButtonCopyId />}
						{is_dev && <ButtonBlockData />}
					</div>
				</ArrowContainer>
			)}
		>
			<div className={styles.button_container}>
				<button
					onClick={toggleMenu}
					className={className_button}
					{...button_props.attributes}
				>
					<Icon icon="menu" />
				</button>
			</div>
		</Popover>
	);
};
