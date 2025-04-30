# Status Endpoint Documentation
#### this call is different in each network

## Endpoint
`GET https://rpc-cosmoshub.keplr.app/status`

## Description
This endpoint retrieves the current status of a Cosmos Hub node, including node information, synchronization status, and validator details.

## Request Headers
- `accept`: application/json, text/plain, */*
- `accept-language`: Preferred language order
- `priority`: Priority level
- `sec-ch-ua`: Browser identification
- Other standard security and CORS headers

## Response
Returns a JSON object with the following structure:

### Node Info
- Protocol versions (p2p, block, app)
- Node ID
- Network details 
- Version information
- Moniker and other configuration

### Sync Info
- Latest block details (hash, height, time)
- Earliest block details
- Sync status

### Validator Info  
- Validator address
- Public key
- Voting power

## Security
- Uses CORS
- Requires strict origin policy
- Includes credentials

## Example Request
```javascript
fetch("https://rpc-cosmoshub.keplr.app/status", {
    headers: {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-GB,en-US;q=0.9,en",
        "priority": "u=1, i"
    },
    method: "GET",
    mode: "cors",
    credentials: "include"
});
```

## Example Response
```json
{
    "jsonrpc": "2.0",
    "id": -1,
    "result": {
        "node_info": {
            "protocol_version": {
                "p2p": "8",
                "block": "11",
                "app": "0"
            },
            "id": "e376f7a8703d1192cce0baaefc2ffa2f405db0e3",
            "listen_addr": "159.89.13.164:32529",
            "network": "cosmoshub-4",
            "version": "0.38.17",
            "channels": "40202122233038606100",
            "moniker": "cosmoshub-fra1-2-public-3-statefulset-0",
            "other": {
                "tx_index": "on",
                "rpc_address": "tcp://0.0.0.0:26657"
            }
        },
        "sync_info": {
            "latest_block_hash": "1A40FC0D726B523A3B3A6A33BD1978B52F790E004C4ADD318FCAD1E1DEE58AC2",
            "latest_app_hash": "2354D08F2A2E9F58B9C65CA70A4304353952F6633CF9E76D94077D70992EA143",
            "latest_block_height": "25365597",
            "latest_block_time": "2025-04-20T09:45:57.303435671Z",
            "earliest_block_hash": "CAAF6ABC772C7A18AAE991792C75324B38130CE2EFEC9DB88F161E364CCE25E3",
            "earliest_app_hash": "2B10802FF3E42C26C2E2085972A96BEF6D834F08F8B57A68ADF9977880E1BE46",
            "earliest_block_height": "25281000",
            "earliest_block_time": "2025-04-14T10:57:36.904486817Z",
            "catching_up": false
        },
        "validator_info": {
            "address": "4DD0E89717B39BCEFFAB1C9926FAE23F3A669EC6",
            "pub_key": {
                "type": "tendermint/PubKeyEd25519",
                "value": "GB4jvB84rOp4kjDq0SLeJpNA7WrpcEhdXk46P1KrMlM="
            },
            "voting_power": "0"
        }
    }
}
```