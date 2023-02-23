import alt, { Player, Vehicle } from "alt-server";

import { metaKey, VehicleIndicatorLights } from "../shared/types";

alt.onClient("indicators:update", (player: Player, vehicle: Vehicle, indicatorLights: VehicleIndicatorLights) => {
	vehicle.setStreamSyncedMeta(metaKey, indicatorLights);
});

console.log("> [altv-os-indicators] loaded server/main.ts");
