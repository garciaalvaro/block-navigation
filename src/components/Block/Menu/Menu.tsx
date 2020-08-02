import React, { FunctionComponent } from "react";
import { useSelect } from "@wordpress/data";
import { Fragment } from "@wordpress/element";
import Popover, { ArrowContainer } from "react-tiny-popover";

import styles from "./Menu.styl";
import styles_color from "@/utils/css/color.styl";
import { store_slug } from "@/utils/data";
import { className } from "@/utils/tools";
import { useToggle } from "@/utils/hooks";
import { Button } from "@/utils/components/Button";
import { Icon } from "@/utils/components/Icon";
import { ButtonEdit } from "./ButtonEdit";
import { ButtonMoveTo } from "./ButtonMoveTo";
import { ButtonsMove } from "./ButtonsMove";
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

	const [color_type, color_name] = color_scheme.split("-");

	return (
		<Popover
			containerClassName={styles.popover}
			isOpen={is_open}
			onClickOutside={close}
			transitionDuration={0.01}
			content={({ position, targetRect, popoverRect }) =>
				// There seems to be a bug in react-tiny-popover
				// where the Menu doesn't close.
				// TODO: Remove once it is not necessary
				!is_open ? (
					<Fragment></Fragment>
				) : (
					<ArrowContainer
						position={position}
						targetRect={targetRect}
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
							<ButtonCopyId closeMenu={close} id={id} />
							<ButtonBlockData closeMenu={close} id={id} />
						</div>
					</ArrowContainer>
				)
			}
		>
			<div className={styles.button_container}>
				<Button type="icon" onClick={toggle} className={styles.button}>
					<Icon icon="menu" />
				</Button>
			</div>
		</Popover>
	);
};
