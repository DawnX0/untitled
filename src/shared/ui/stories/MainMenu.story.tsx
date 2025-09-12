import { slice } from "@rbxts/array-utils";
import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import MenuButton from "../components/MenuButton";
import MenuFrame from "../components/MenuFrame";
import MenuLabel from "../components/MenuLabel";
import MenuViewport from "../components/MenuViewport";

type Menu = "options" | "play" | "load" | "settings";
type Settings = { Audio: 100 };
type State = { currentMenu: Menu; history: Menu[]; settings?: Settings; slot?: number };
type Action = { type: "GO"; menu: Menu } | { type: "BACK" | "PLAY" } | { type: "SET"; slot: number };

const MAX_SLOTS = 3;

const MainMenu = {
	react: React,
	reactRoblox: ReactRoblox,
	controls: {},
	story: () => {
		const containerRef = React.useRef<Frame>();
		const pageRef = React.useRef<UIPageLayout>();

		function reducer(state: State, action: Action): State {
			switch (action.type) {
				case "PLAY":
					containerRef.current?.Destroy();
					return state;
				case "GO":
					if (state.currentMenu === action.menu) return state;
					return { currentMenu: action.menu, history: [...state.history, state.currentMenu] };
				case "BACK": {
					if (state.history.size() === 0) {
						return state;
					}
					const newHistory = slice(state.history, 0, state.history.size() - 1);
					const previousMenu = state.history[state.history.size() - 1];

					return {
						currentMenu: previousMenu,
						history: newHistory,
					};
				}
				default:
					return state;
			}
		}

		const [state, dispatch] = React.useReducer(reducer, { currentMenu: "options", history: [] });

		const SlotFrames = () => {
			const frames = [];
			for (let i = 0; i < MAX_SLOTS; i++) {
				frames.push(
					<MenuViewport frameProps={{ Size: UDim2.fromScale(1, 1) }}>
						<uistroke Thickness={2} Color={new Color3(1, 1, 1)} />
						<MenuButton
							onClick={() => {
								dispatch({ type: "SET", slot: i + 1 });
								dispatch({ type: "GO", menu: "options" });
							}}
							buttonProps={{ Size: UDim2.fromScale(1, 1), Text: "", BackgroundTransparency: 1 }}
						/>
						<MenuLabel labelProps={{ Position: UDim2.fromScale(0.5, 0.9), Text: tostring(i + 1) }} />
					</MenuViewport>,
				);
			}
			return frames;
		};

		return (
			<MenuFrame ref={containerRef}>
				{/* OPTIONS */}
				<MenuFrame
					frameProps={{ Visible: state.currentMenu === "options" }}
					visible={state.currentMenu === "options"}
				>
					<uigridlayout
						VerticalAlignment={"Center"}
						CellSize={UDim2.fromScale(1, 0.075)}
						CellPadding={UDim2.fromScale(0, 0.1)}
					/>
					<MenuButton
						buttonProps={{ Text: "Play" }}
						onClick={() => {
							dispatch({ type: "PLAY" });
						}}
					/>
					<MenuButton
						buttonProps={{ Text: "Load" }}
						onClick={() => {
							dispatch({ type: "GO", menu: "load" });
						}}
					/>
					<MenuButton
						buttonProps={{ Text: "Settings" }}
						onClick={() => {
							dispatch({ type: "GO", menu: "settings" });
						}}
					/>
				</MenuFrame>

				{/* PLAY */}
				<MenuFrame frameProps={{ Visible: state.currentMenu === "play" }}></MenuFrame>

				{/* LOAD */}
				<MenuFrame
					frameProps={{ Visible: state.currentMenu === "load" }}
					visible={state.currentMenu === "load"}
				>
					{/* SLOTS */}
					<MenuFrame
						frameProps={{
							Size: UDim2.fromScale(0.6, 0.6),
							Position: UDim2.fromScale(0.5, 0.45),
						}}
						visible={state.currentMenu === "load"}
						tweenSize={UDim2.fromScale(0.6, 0.6)}
					>
						<uipagelayout
							ref={pageRef}
							EasingStyle={Enum.EasingStyle.Quad}
							TweenTime={0.5}
							Circular={true}
							Padding={new UDim(1)}
						/>
						<SlotFrames />
					</MenuFrame>

					{/* BACK */}
					<MenuButton
						buttonProps={{
							Text: "Back",
							Position: UDim2.fromScale(0.5, 0.9),
							Size: UDim2.fromScale(1, 0.1),
						}}
						onClick={() => {
							dispatch({ type: "BACK" });
						}}
					/>

					{/* LEFT */}
					<MenuButton
						buttonProps={{
							Text: "<",
							Position: UDim2.fromScale(0.1, 0.5),
							Size: UDim2.fromScale(0.1, 0.1),
						}}
						onClick={() => pageRef.current && pageRef.current.Previous()}
					/>

					{/* RIGHT */}
					<MenuButton
						buttonProps={{
							Text: ">",
							Position: UDim2.fromScale(0.9, 0.5),
							Size: UDim2.fromScale(0.1, 0.1),
						}}
						onClick={() => pageRef.current && pageRef.current.Next()}
					/>
				</MenuFrame>

				{/* SETTINGS */}
				<MenuFrame
					frameProps={{ Visible: state.currentMenu === "settings" }}
					visible={state.currentMenu === "settings"}
				>
					{/* BACK */}
					<MenuButton
						buttonProps={{
							Text: "Back",
							Position: UDim2.fromScale(0.5, 0.9),
							Size: UDim2.fromScale(1, 0.1),
						}}
						onClick={() => {
							dispatch({ type: "BACK" });
						}}
					/>
				</MenuFrame>
			</MenuFrame>
		);
	},
};

export = MainMenu;
