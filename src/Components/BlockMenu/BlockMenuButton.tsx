import React, { FunctionComponent } from "react";
import Popover, { ArrowContainer } from "react-tiny-popover";

import { Icon, Button } from "@/utils/components";
import { BlockMenu } from "./BlockMenu";
import { useToggle } from "@/utils/hooks";

interface Props {
	id: BlockId;
	setMovingBlock: () => void;
}

export const BlockMenuButton: FunctionComponent<Props> = props => {
	const { toggle, close, is_open } = useToggle();

	return (
		<Popover
			containerStyle={{
				minWidth: "200px",
				marginLeft: "-10px",
				zIndex: "999999",
			}}
			isOpen={is_open}
			onClickOutside={close}
			transitionDuration={0.01}
			content={({ position, targetRect, popoverRect }) => (
				<ArrowContainer
					position={position}
					targetRect={targetRect}
					popoverRect={popoverRect}
					arrowColor={"#111"}
					arrowSize={6}
				>
					<BlockMenu {...props} closeMenu={close} />
				</ArrowContainer>
			)}
		>
			<Button
				onClick={toggle}
				className={["button-toggle_menu", "button-icon"]}
			>
				<Icon icon="menu" />
			</Button>
		</Popover>
	);
};
