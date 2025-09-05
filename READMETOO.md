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

# Notes on Maany-Dex Addition
- included new object in config.ts
    -> new chain needs new `rest` port, which is not occupied to avoid warning: `expected maany/cosmos got neutron`
    - Note: the chain must have Rest API enabled in `config.toml`
    -> Test: type `localhost:<port-nr>` should see a result object in browser
- server: if we include a new object somewhere in background.ts we try to fetch the chain info from our list (localhost:3000/data/<chain-id>.json). Usually if there is no info the chain info should come from the config.ts file. But if you provide it ones via the server it kind of seems to get cached somewhere, i.e. takes the ones provided info even if you remove the chain info from the server. So best thing is to have a proper json file on that server for every new chain
- fees: can be adjusted under feecurrency in config.ts / json file

# TODOS:
- Get IBC transactions working
- How is the workflow of creating a pool or swapping a token on the DEX concerning IBC Logic
    - We should (if possible) chain operations: check if we have MAANY (either Provider or DEX), if only on provider -> make IBC tx to the DEX and from there the GAMM operation (keep outcome on the DEX or not?)


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