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
		return <MenuFrame></MenuFrame>;
	},
);

export default MainMenu;
