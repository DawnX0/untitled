import React, { forwardRef, PropsWithChildren } from "@rbxts/react";
import { TweenService } from "@rbxts/services";

interface ButtonProps {
	children?: PropsWithChildren;
	buttonProps?: Partial<TextButton>;
	onClick?: (btn: TextButton) => unknown;
}

const MenuButton = forwardRef<TextButton, ButtonProps>((props, ref) => {
	return (
		<textbutton
			ref={ref}
			TextScaled={true}
			BackgroundTransparency={props.buttonProps?.BackgroundTransparency ?? 1}
			Size={props.buttonProps?.Size ?? UDim2.fromScale(0.1, 0.1)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Position={props.buttonProps?.Position ?? UDim2.fromScale(0.5, 0.5)}
			TextColor3={props.buttonProps?.TextColor3 ?? new Color3(1, 1, 1)}
			Event={{
				MouseEnter: (btn) =>
					TweenService.Create(btn, new TweenInfo(0.25), { BackgroundTransparency: 0.75 }).Play(),
				MouseLeave: (btn) =>
					TweenService.Create(btn, new TweenInfo(0.25), { BackgroundTransparency: 1 }).Play(),
				Activated: (btn) => (props.onClick && props.onClick(btn)) ?? print("Activated"),
			}}
			{...props.buttonProps}
		>
			{props.children}
		</textbutton>
	);
});

export default MenuButton;
