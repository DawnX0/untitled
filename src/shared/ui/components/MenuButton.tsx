import React, { PropsWithChildren } from "@rbxts/react";
import { TweenService } from "@rbxts/services";

export default function MenuButton(props: {
	children?: PropsWithChildren;
	buttonProps?: Partial<TextButton>;
	onClick?: (btn: TextButton) => unknown;
}) {
	return (
		<textbutton
			TextScaled={true}
			BackgroundTransparency={props.buttonProps?.BackgroundTransparency ?? 1}
			Size={props.buttonProps?.Size ?? UDim2.fromScale(0.1, 0.1)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Position={props.buttonProps?.Position ?? UDim2.fromScale(0.5, 0.5)}
			TextColor3={props.buttonProps?.TextColor3 ?? new Color3(1, 1, 1)}
			Event={{
				MouseEnter: (btn) =>
					TweenService.Create(btn, new TweenInfo(0.1), { BackgroundTransparency: 0.9 }).Play(),
				MouseLeave: (btn) => TweenService.Create(btn, new TweenInfo(0.1), { BackgroundTransparency: 1 }).Play(),
				Activated: (btn) => (props.onClick && props.onClick(btn)) ?? print("Activated"),
			}}
			{...props.buttonProps}
		>
			{props.children}
		</textbutton>
	);
}
