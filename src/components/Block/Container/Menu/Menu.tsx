import React, { FunctionComponent } from "react";
import { useSelect } from "@wordpress/data";
import { Popover, ArrowContainer } from "react-tiny-popover";

import styles from "./Menu.styl";
import styles_color from "@/utils/css/color.styl";
import { store_slug } from "@/utils/data";
import { className } from "@/utils/tools";
import { useToggle } from "@/utils/hooks";
import { Button } from "@/utils/components";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonMoveTo } from "./ButtonMoveTo";
import { ButtonsMove } from "./ButtonsMove";
import { ButtonRemove } from "./ButtonRemove";
import { ButtonCopyId } from "./ButtonCopyId";
import { ButtonBlockData } from "./ButtonBlockData";

interface Props {
	id: BlockId;
	setMovingBlock: () => void;
}

export const Menu: FunctionComponent<Props> = props => {
	const { id, setMovingBlock } = props;

	const { toggle, close, is_open } = useToggle();

	const color_scheme = useSelect(select =>
		select(store_slug).getColorScheme()
	);

	const is_dev = useSelect(select => select(store_slug).isDev());

	const [color_type, color_name] = color_scheme.split("-");

	return (
		<Popover
			containerClassName={styles.popover}
			isOpen={is_open}
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
					<div
						className={className([
							styles.menu,
							styles_color[color_type],
							styles_color[color_name],
						])}
					>
						<ButtonEdit closeMenu={close} id={id} />

						<ButtonMoveTo
							closeMenu={close}
							id={id}
							setMovingBlock={setMovingBlock}
						/>

						<ButtonsMove closeMenu={close} id={id} />

						<ButtonRemove closeMenu={close} id={id} />

						{is_dev && <ButtonCopyId closeMenu={close} id={id} />}

						{is_dev && (
							<ButtonBlockData closeMenu={close} id={id} />
						)}
					</div>
				</ArrowContainer>
			)}
		>
			<div className={styles.button_container}>
				<Button
					type="icon"
					onClick={toggle}
					className={styles.button}
					icon="menu"
				/>
			</div>
		</Popover>
	);
};
