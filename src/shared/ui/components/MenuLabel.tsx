import React, { forwardRef, PropsWithChildren } from "@rbxts/react";

interface LabelProps {
	children?: PropsWithChildren;
	labelProps?: Partial<TextLabel>;
}

const MenuLabel = forwardRef<TextLabel, LabelProps>((props, ref) => {
	return (
		<textlabel
			ref={ref}
			TextScaled={true}
			BackgroundTransparency={props.labelProps?.BackgroundTransparency ?? 1}
			Size={props.labelProps?.Size ?? UDim2.fromScale(0.1, 0.1)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Position={props.labelProps?.Position ?? UDim2.fromScale(0.5, 0.5)}
			TextColor3={props.labelProps?.TextColor3 ?? new Color3(1, 1, 1)}
			{...props.labelProps}
		>
			{props.children}
		</textlabel>
	);
});

export default MenuLabel;
