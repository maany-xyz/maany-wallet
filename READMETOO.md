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


# Env Var Config
- For testing just fill out env vars in webpack.config file

# MVP Feature Set

- Deposit Button & Copy Address Button
    -> Copy Address Modal
- Staked Button
    -> Stake Page
- Send Button
    -> Send Modal
- Buy Button
    -> Disable
- Chain List Item Button
    -> Chain Modal

- Copy Address Modal
    - Search for chain 
        -> Must be adjusted for Maany related consumer chains (SEE: chain addition logic)
    - QR Feature
        -> Test (but should out of the box)
    - Looking for chain
        -> SEE: chain addition logic

- Send Modal
    - Hide IBC tokens
        -> What does that one do?
    - Seach chains 
        -> See chain addition logic
    - chain list item click
        -> Chain Send Modal

- Chain Modal
    - Buy
        -> is already disabled, check why, make sure its correctly disabled
    - Swap
        -> is already disabled, check why, make sure its correctly disabled
    - Send
        -> Chain Send Modal
    - Start Staking (ext. Link)
        -> Disable (or even comment out) until Staking logic is developed

- Chain Send Modal
    - IBC Send
        -> How does that work?

- Address Book Modal

- Chain Addition Logic
    - List showing up in search bar 
        - still shows all Cosmos chains
            -> get rid of that
    - List 

- Stake Page (external Page)