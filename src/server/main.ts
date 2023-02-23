import alt, { Player, Vehicle } from "alt-server";

import { metaKey, VehicleIndicatorLights } from "../shared/types";

alt.onClient("indicators:update", (player: Player, vehicle: Vehicle, indicatorLights: VehicleIndicatorLights) => {
	if (vehicle.driver.id !== player.id) return;

	vehicle.setStreamSyncedMeta(metaKey, indicatorLights);
});

console.log("> [altv-os-indicators] loaded server/main.ts");
