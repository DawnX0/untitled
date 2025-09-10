import React, { PropsWithChildren, Ref } from "@rbxts/react";

export default function MenuFrame(props: {
	children?: PropsWithChildren;
	frameProps?: Partial<Frame>;
	ref?: Ref<Frame>;
}) {
	return (
		<frame
			ref={props.ref}
			BackgroundColor3={props.frameProps?.BackgroundColor3 ?? new Color3(0, 0, 0)}
			Size={props.frameProps?.Size ?? UDim2.fromScale(1, 1)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Position={props.frameProps?.Position ?? UDim2.fromScale(0.5, 0.5)}
			{...props.frameProps}
		>
			{props.children}
		</frame>
	);
}
