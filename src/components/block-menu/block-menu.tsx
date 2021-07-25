import React from "react";
import type { FunctionComponent, MouseEvent } from "react";
import { useContext, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { ArrowContainer, Popover } from "react-tiny-popover";

import styles from "./styles.styl";
import { useColor, useClassName, Button } from "@/utils";
import { store_slug } from "@/store";
import { context } from "./context";
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
	const { toggleMenu, menu_is_open, closeMenu } = useContext(context);
	const is_dev = useSelect(select => select(store_slug).is_dev());

	const { className: color_className, color_type } = useColor();
	const menu_className = useClassName(styles.menu, color_className);
	const popover_className = useClassName(styles.popover, color_className);

	// onClickOutside is not triggered when clicking other popover
	// buttons, so we add an event listener to manually close it.
	useEffect(() => {
		if (!menu_is_open) return;

		const closeMenuDelayed = () => setTimeout(closeMenu, 0);

		document.body.addEventListener("click", closeMenuDelayed);

		return () =>
			document.body.removeEventListener("click", closeMenuDelayed);
	}, [menu_is_open]);

	return (
		<Popover
			containerClassName={popover_className}
			isOpen={menu_is_open}
			onClickOutside={closeMenu}
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
				<Button
					button_type="icon"
					className={styles.button}
					onClick={(e: MouseEvent) => {
						e.stopPropagation();
						toggleMenu();
					}}
				>
					<Icon icon="menu" />
				</Button>
			</div>
		</Popover>
	);
};
