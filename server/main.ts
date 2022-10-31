import alt from "alt-server";
import chalk from "chalk";

alt.onClient("indicators:SetIndicator", (player: alt.Player, vehicle: alt.Vehicle, left: boolean, right: boolean) => {
	vehicle.setStreamSyncedMeta("leftIndicator", left);
	vehicle.setStreamSyncedMeta("rightIndicator", right);
});

console.log(chalk.yellow("> [altv-os-indicators] loaded server/main.ts"));
