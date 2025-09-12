import Lyra from "@rbxts/lyra";
import { t } from "@rbxts/t";
import Template from "./Template";

const PlayerData = {
	CreateStore: () => {
		return Lyra.createPlayerStore<typeof Template>({
			name: "Data",
			template: {
				stats: {},
				inventory: {},
			},
			schema: t.strictInterface({
				stats: t.table,
				inventory: t.table,
			}),
		});
	},
};

export = PlayerData;
