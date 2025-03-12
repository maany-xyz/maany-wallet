# Notes

- This project is structured as a monorepo
- To run the build process of all workspaces
    # yarn build 
- To build package workspaces run: 
    # yarn run -T tsc -p packages/background/tsconfig.json
- type random <name> to see list of workspaces

- To build extension, run:
    # yarn workspace @keplr-wallet/extension build

- NOTE: to run dev env 
    # yarn workspace @keplr-wallet/extension dev
    - Only when running that, the actual changes are visible in the Chrome dev tool




