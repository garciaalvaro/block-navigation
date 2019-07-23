import { Icon, Button } from "utils/components";
import Popover, { ArrowContainer } from "react-tiny-popover";
import { Menu, MenuProps } from "./Menu";

type withStateProps = {
	is_open: boolean;
};

type ParentProps = MenuProps & {
	setState(obj: any): void;
};

type Props = ParentProps & withStateProps;

const { withState } = wp.compose;

export const ButtonMenu = withState<withStateProps>({
	is_open: false
})((props: Props) => {
	const { setState, is_open } = props;
	const toggle = () => setState({ is_open: !is_open });
	const close = () => setState({ is_open: false });

	return (
		<Popover
			isOpen={is_open}
			position={"top"}
			onClickOutside={() => setState({ is_open: false })}
			transitionDuration={0.1}
			content={({ position, targetRect, popoverRect }) => (
				<ArrowContainer
					position={position}
					targetRect={targetRect}
					popoverRect={popoverRect}
					arrowColor={"#111"}
					arrowSize={6}
				>
					<Menu {...props} close={close} />
				</ArrowContainer>
			)}
		>
			<Button
				onClick={(e: any) => {
					e.stopPropagation();
					toggle();
				}}
				classes={["button-toggle_menu", "button-icon"]}
			>
				<Icon icon="menu" />
			</Button>
		</Popover>
	);
});
