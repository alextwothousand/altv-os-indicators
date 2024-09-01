import alt from "alt-client";
import native from "natives";

const KEY_J = "J".charCodeAt(0);
const KEY_K = "K".charCodeAt(0);
const KEY_L = "L".charCodeAt(0);

alt.on("gameEntityCreate", (entity: alt.Entity) => {
	if (entity instanceof alt.Vehicle) {
		// Set prototype to ensure lack of errors.

		entity.indicator = {
			left: false,
			right: false
		};
	}
});

alt.on("keydown", (key: alt.KeyCode) => {
	const vehicle = alt.Player.local.vehicle;
	if (vehicle === null)
		return; // Don't need to execute nothing if you aren't in a vehicle.

	if (vehicle.netOwner !== alt.Player.local)
		return;

	if (key === KEY_J) {
		// Indicate left

		if (vehicle.indicator.right && vehicle.indicator.left)
			return; // If hazards are on, they must manually be turned off first.

		if (vehicle.indicator.right) {
			vehicle.indicator.right = false;
			native.setVehicleIndicatorLights(vehicle, 0, vehicle.indicator.right);
		}

		vehicle.indicator.left = !vehicle.indicator.left;
		native.setVehicleIndicatorLights(vehicle, 1, vehicle.indicator.left);

		alt.emitServer("indicators:SetIndicators", vehicle, vehicle.indicator.left, vehicle.indicator.right);
	} else if (key === KEY_L) {
		// Indicate right

		if (vehicle.indicator.right && vehicle.indicator.left)
			return; // If hazards are on, they must manually be turned off first.

		if (vehicle.indicator.left) {
			vehicle.indicator.left = false;
			native.setVehicleIndicatorLights(vehicle, 1, vehicle.indicator.left);
		}

		vehicle.indicator.right = !vehicle.indicator.right;
		native.setVehicleIndicatorLights(vehicle, 0, vehicle.indicator.right);

		alt.emitServer("indicators:SetIndicators", vehicle, vehicle.indicator.left, vehicle.indicator.right);
	} else if (key === KEY_K) {
		// Hazard lights.
		// Priority over other kinds of lights.

		if (vehicle.indicator.left && vehicle.indicator.right) {
			vehicle.indicator.left = false;
			vehicle.indicator.right = false;
		} else {
			vehicle.indicator.left = true;
			vehicle.indicator.right = true;
		}

		native.setVehicleIndicatorLights(vehicle, 0, vehicle.indicator.left);
		native.setVehicleIndicatorLights(vehicle, 1, vehicle.indicator.right);

		alt.emitServer("indicators:SetIndicators", vehicle, vehicle.indicator.left, vehicle.indicator.right);
	}
});

alt.on("streamSyncedMetaChange", (entity: alt.Entity) => {
	if (!(entity instanceof alt.Vehicle))
		return;

	const vehicle = entity as alt.Vehicle;

	if (!vehicle.hasStreamSyncedMeta("leftIndicator") || !vehicle.hasStreamSyncedMeta("rightIndicator"))
		return;

	vehicle.indicator.left = vehicle.getStreamSyncedMeta("leftIndicator") as boolean;
	vehicle.indicator.right = vehicle.getStreamSyncedMeta("rightIndicator") as boolean;

	native.setVehicleIndicatorLights(vehicle, 1, vehicle.indicator.left);
	native.setVehicleIndicatorLights(vehicle, 0, vehicle.indicator.right);
});
