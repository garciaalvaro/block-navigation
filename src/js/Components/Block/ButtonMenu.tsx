import { Icon, Button } from "utils/components";
import { Menu } from "Components/Menu/Menu";
import Popover, { ArrowContainer } from "react-tiny-popover";

interface WithStateProps {
	is_open: boolean;
}

type OwnProps = Omit<MenuProps, "close">;

type Props = OwnProps & WithStateProps & SetStateProp;

const { withState } = wp.compose;

export const ButtonMenu = withState<WithStateProps>({
	is_open: false
})((props: Props) => {
	const { setState, is_open } = props;
	const toggle = () => setState({ is_open: !is_open });
	const close = () => setState({ is_open: false });

	return (
		<Popover
			isOpen={is_open}
			position={"top"}
			onClickOutside={close}
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
			<Button onClick={toggle} classes={["button-toggle_menu", "button-icon"]}>
				<Icon icon="menu" />
			</Button>
		</Popover>
	);
});
