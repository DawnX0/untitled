import Lyra from "@rbxts/lyra";
import Template from "./Template";
import { $terrify } from "rbxts-transformer-t-new";

const Schema = $terrify<typeof Template>();

const PlayerData = {
	CreateStore: () => {
		return Lyra.createPlayerStore({
			name: "Data",
			template: Template,
			schema: Schema,
		});
	},
};

export = PlayerData;
