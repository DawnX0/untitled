import ReactRoblox from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import App from "./App";

const player = Players.LocalPlayer;
const playerGui = player.WaitForChild("PlayerGui");

const root = ReactRoblox.createRoot(playerGui);
root.render(App());
