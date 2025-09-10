import { Storybook } from "@rbxts/ui-labs";

const storybook: Storybook = {
	name: "Stories",
	storyRoots: [script.Parent?.FindFirstChild("stories") as Folder],
};

export = storybook;
