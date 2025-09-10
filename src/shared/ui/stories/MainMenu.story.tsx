import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { CreateReactStory } from "@rbxts/ui-labs";
import MenuFrame from "../components/MenuFrame";
import { slice } from "@rbxts/array-utils";
import MenuButton from "../components/MenuButton";
import MenuViewport from "../components/MenuViewport";
import MenuLabel from "../components/MenuLabel";

type Menu = "options" | "play" | "load" | "settings";
type State = { currentMenu: Menu; history: Menu[]; slot?: number };
type Action = { type: "GO"; menu: Menu } | { type: "BACK" } | { type: "SET"; slot: number };

const MainMenu = CreateReactStory(
	{
		react: React,
		reactRoblox: ReactRoblox,
		controls: {},
	},
	() => {
		const containerRef = React.useRef<Frame>();
		const pageRef = React.useRef<UIPageLayout>();

		function reducer(state: State, action: Action): State {
			switch (action.type) {
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

		return (
			<MenuFrame ref={containerRef}>
				{/* OPTIONS */}
				<MenuFrame frameProps={{ Visible: state.currentMenu === "options" }}>
					<uigridlayout
						VerticalAlignment={"Center"}
						CellSize={UDim2.fromScale(1, 0.075)}
						CellPadding={UDim2.fromScale(0, 0.1)}
					/>
					<MenuButton
						buttonProps={{ Text: "Play" }}
						onClick={() => {
							dispatch({ type: "GO", menu: "play" });
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
				<MenuFrame frameProps={{ Visible: state.currentMenu === "load" }}>
					<MenuFrame frameProps={{ Size: UDim2.fromScale(0.6, 0.6), Position: UDim2.fromScale(0.5, 0.45) }}>
						<uipagelayout
							ref={pageRef}
							EasingStyle={Enum.EasingStyle.Linear}
							TweenTime={0.75}
							Circular={true}
							Padding={new UDim(1)}
						/>
						<uistroke Thickness={2} Color={new Color3(1, 1, 1)} />
						<MenuViewport>
							<MenuButton
								buttonProps={{ Size: UDim2.fromScale(1, 1), Text: "", BackgroundTransparency: 1 }}
							/>
							<MenuLabel labelProps={{ Position: UDim2.fromScale(0.5, 0.9), Text: "1" }} />
						</MenuViewport>
						<MenuViewport>
							<MenuButton
								buttonProps={{ Size: UDim2.fromScale(1, 1), Text: "", BackgroundTransparency: 1 }}
							/>
						</MenuViewport>
						<MenuViewport>
							<MenuButton
								buttonProps={{ Size: UDim2.fromScale(1, 1), Text: "", BackgroundTransparency: 1 }}
							/>
						</MenuViewport>
					</MenuFrame>
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
				<MenuFrame frameProps={{ Visible: state.currentMenu === "settings" }}></MenuFrame>
			</MenuFrame>
		);
	},
);

export = MainMenu;
