import React from "react";
import type { FunctionComponent, MouseEvent } from "react";
import { useContext, useEffect, useRef } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { ArrowContainer, Popover } from "react-tiny-popover";
import { __ } from "@wordpress/i18n";

import { useColor, useClassName, Button } from "@/utils";
import { store_slug } from "@/store";

import styles from "./styles.styl";
import { context } from "./context";
import { Icon } from "../icon";
import {
	ButtonEdit,
	ButtonMoveTo,
	ButtonsMove,
	ButtonRemove,
	ButtonCopyId,
	ButtonDuplicate,
	ButtonBlockData,
} from "./components";

export const BlockMenu: FunctionComponent = () => {
	const { toggleMenu, menu_is_open, closeMenu } = useContext(context);
	const is_dev = useSelect(select => select(store_slug).is_dev());

	const $root = useRef(document.getElementById("editor"));

	const { className: color_className, color_type } = useColor();
	const menu_className = useClassName(
		[color_className],
		styles.menu,
		color_className
	);
	const popover_className = useClassName(
		[color_className],
		styles.popover,
		color_className
	);

	// onClickOutside is not triggered when clicking other popover
	// buttons, so we add an event listener to manually close it.
	useEffect(() => {
		const $root_current = $root.current;

		if (!menu_is_open || !$root_current) return;

		const closeMenuDelayed = () => setTimeout(closeMenu, 0);

		$root_current.addEventListener("click", closeMenuDelayed);

		// eslint-disable-next-line consistent-return
		return () =>
			$root_current.removeEventListener("click", closeMenuDelayed);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [menu_is_open]);

	return (
		<Popover
			containerClassName={popover_className}
			isOpen={menu_is_open}
			onClickOutside={closeMenu}
			containerStyle={{ transition: "none" }}
			// eslint-disable-next-line react/no-unstable-nested-components
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
						<ButtonDuplicate />
						<ButtonRemove />

						{is_dev && <ButtonCopyId />}
						{is_dev && <ButtonBlockData />}
					</div>
				</ArrowContainer>
			)}
		>
			<div className={styles.button_container}>
				<Button
					title={menu_is_open ? __("Close menu") : __("Open menu")}
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
