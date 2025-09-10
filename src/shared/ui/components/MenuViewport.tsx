import React, { forwardRef, PropsWithChildren } from "@rbxts/react";

interface MenuViewportProps {
	children?: PropsWithChildren;
	frameProps?: Partial<ViewportFrame>;
}

const MenuViewport = forwardRef<ViewportFrame, MenuViewportProps>((props, ref) => {
	return (
		<viewportframe
			ref={ref}
			BackgroundTransparency={1}
			BackgroundColor3={props.frameProps?.BackgroundColor3 ?? new Color3(1, 1, 1)}
			Size={props.frameProps?.Size ?? UDim2.fromScale(1, 1)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Position={props.frameProps?.Position ?? UDim2.fromScale(0.5, 0.5)}
			{...props.frameProps}
		>
			{props.children}
		</viewportframe>
	);
});

export default MenuViewport;
