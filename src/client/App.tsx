import React from "@rbxts/react";
import MainMenu from "shared/ui/stories/MainMenu.story";

const App = () => {
	return (
		<screengui IgnoreGuiInset={true}>
			<MainMenu.story />
		</screengui>
	);
};

export = App;
