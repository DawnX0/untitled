import { Players } from "@rbxts/services";
import PlayerData from "./datastore/PlayerData";

const store = PlayerData.CreateStore();

Players.PlayerAdded.Connect((player) => {
	print(`Player ${player.Name} has joined the game.`);
	store
		.load(player)
		.andThen(() => {
			print(`Player ${player.Name} data loaded.`);
		})
		.catch((err) => print(`Failed to load data for player ${player.Name}: ${err}`));

	store
		.get(player)
		.andThen((data) => print(data))
		.catch((err) => print(err));
});

Players.PlayerRemoving.Connect((player) => {
	print(`Player ${player.Name} is leaving the game.`);
	store
		.unload(player)
		.andThen(() => {
			print(`Player ${player.Name} data saved and unloaded.`);
		})
		.catch((err) => print(`Failed to save data for player ${player.Name}: ${err}`));
});

game.BindToClose(() => store.closeAsync());
