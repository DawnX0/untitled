import React, { forwardRef, PropsWithChildren } from "@rbxts/react";
import { TweenService } from "@rbxts/services";

interface MenuFrameProps {
	children?: PropsWithChildren;
	frameProps?: Partial<Frame>;
	visible?: boolean;
	tweenSize?: UDim2;
}

const MenuFrame = forwardRef<Frame, MenuFrameProps>((props, ref) => {
	const frameRef = React.useRef<Frame>();

	React.useEffect(() => {
		if (!frameRef.current) return;
		const frame = frameRef.current;

		if (props.visible) {
			TweenService.Create(frame, new TweenInfo(0.25), {
				Size: props.tweenSize ?? UDim2.fromScale(1, 1),
			}).Play();
		} else {
			TweenService.Create(frame, new TweenInfo(0.25), { Size: UDim2.fromScale(0, 0) }).Play();
		}
	}, [props.visible]);

	return (
		<frame
			ref={ref ?? frameRef}
			BackgroundColor3={props.frameProps?.BackgroundColor3 ?? new Color3(0, 0, 0)}
			Size={props.frameProps?.Size ?? UDim2.fromScale(1, 1)}
			AnchorPoint={new Vector2(0.5, 0.5)}
			BorderSizePixel={props.frameProps?.BorderSizePixel ?? 0}
			Position={props.frameProps?.Position ?? UDim2.fromScale(0.5, 0.5)}
			{...props.frameProps}
		>
			{props.children}
		</frame>
	);
});

export default MenuFrame;
