import React from "@rbxts/react";
import ReactRoblox from "@rbxts/react-roblox";
import { CreateReactStory } from "@rbxts/ui-labs";
import MenuFrame from "../components/MenuFrame";

const MainMenu = CreateReactStory(
	{
		react: React,
		reactRoblox: ReactRoblox,
		controls: {},
	},
	() => {
		const containerRef = React.useRef<Frame>();

		React.useEffect(() => {
			print(containerRef.current);
		}, []);

		return <MenuFrame ref={containerRef}></MenuFrame>;
	},
);

export = MainMenu;
