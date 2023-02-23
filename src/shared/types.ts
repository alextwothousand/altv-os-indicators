export const metaKey = "indicatorLights";

// Borrowing from 'altv-shared' which isn't updated for some reason.
// - While IntelliSense may register them as entries, none of them are there when the server attempts to use them.

/**
 * @partial
 * @member {alt-shared}
 */
export enum KeyCode {
  "#" = 222,
  "[" = 219,
  "]" = 221
}

/**
 * @member {alt-shared}
 */
export enum VehicleIndicatorLights {
  Off = 0, // Implicit as initial
  BlinkLeft = 1,
  BlinkRight = 2,
  BlinkPermBoth = 4,
  StaticBoth = 8,
  Interior = 64
}

export type IndicatorLights = VehicleIndicatorLights;

declare module "alt-shared" {
  export interface ICustomVehicleStreamSyncedMeta {
    [metaKey]: VehicleIndicatorLights;
  }
}