# altv-indicators (fork)

Vehicle indicators *including hazard lights*.

## Default keybindings

- `[` - Left
- `]` - Right
- `#` - Hazards
  > These override **left** and **right** as the original code does.

## Notes from the fork author

This resource is a fork of [alextwothousand's code](https://github.com/alextwothousand/altv-os-indicators) which focuses on code quality for a production environment and a few patches on top of what is already provided.

- The [LICENSE](LICENSE) has not been modified (leaving it as the original license was).
  > I would set myself as an author, but I would prefer it to be the original owner *and 'contributors'* - so I have left it as is.
- The code has been rewritten to be more uniform in it's efforts.
  - A bug with the event call which sent the player across with the event arguments has removed that argument.
  - The event call is referenced **once**.
  - The indicator state uses the `vehicle.indicatorLights` property as it was intended for and only updates the state when it returns on the stream sync event.
- Players were able to modify the vehicle indicator state from any seat, this has been modified to check for the `netOwner` from the client; and `driver` from the server.

> The `package.json` version may not always be changed, but it will generally always have something to indicate it's intention as a fork of the original.

## Polyfills and adaptations

`./src/shared/types.ts` contains partial enums for what was necessary for correctly type-setting the code. IntelliSense reports `VehicleIndicatorLights` and `KeyCode` enums to exist within the `alt-client` and `alt-server` modules, but they simply do not exist when the code runs. As such `esbuild` would naturally fill in the gaps, but use of the module is no longer necessary for this fork.

> As for why none of the enum entries exist, despite the types specifying they are, remains unknown to me - so this fork will continue to use the partial enums until such a time that the documentation and environment are updated. *`altv-shared` also just... doesn't exist within the manifest at all. I don't know what happened in 4 months for them to just disappear, but something is terribly wrong if community members are being told to add the enums themselves and directly contradict the environment types they import (which is also why `@ts-ignore` is painted across the file).*

If you wish to modify the key code bindings, please use [keycode.info](https://keycode.info) and add the character mappings to [KeyCode in `./src/shared/types.ts`](./src/shared/types.ts) and [from Line 16 to 32 in `./src/client/main.ts`](./src/client/main.ts) as you see fit. *Despite the apparent accuracy of AltV's documentation, it is far from it - and I'm not prepared to contribute to something that doesn't exist.*

## How to use

```sh
# Either command, run from '~/resources'...
# or add the exact target directory to the end of the command
git clone https://github.com/sudojunior/altv-indicators # full history clone
npx degit https://github.com/sudojunior/altv-indicators # shallow clone

# Run commands here on from the base of the server manifest

## ! Using 'yarn'

# Single resource build (either)
yarn build # in the resource directory
yarn workspace altv-indicators build

# All resources build
yarn workspaces build

## ! Using 'npm'

# Single resource build (either)
npm run build # in the resource directory
npm run build -w=altv-indicators

# All resources build
npm run build --ws --if-present

## ! Run server
./altv-server.exe
```

## Additional resources

- [`yarn workspace` template starter](https://github.com/RocketDragon/altv-yarn-workspace-starter)
- [`degit` (NPM)](https://npm.im/degit) [(GitHub)](https://github.com/Rich-Harris/degit)
- [`compatibility` branch](https://github.com/sudojunior/altv-indicators/tree/compatibility)
  > This will attempt to patch the original code, but I will be less likely to provide further support due to its use of `esbuild`.

## I need more help

Open a scripting question on the alt:V discord.

- Ping `@alex_/` for use of the **original** code.
- Ping `@sudojunior` for use of **this** fork.
