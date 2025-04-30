# IBC Client State Query Documentation

## API Endpoint
```
GET https://lcd-dydx.keplr.app/ibc/core/channel/v1/channels/channel-0/ports/transfer/client_state
```

## Request Headers
```javascript
{
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,fa;q=0.7,lt;q=0.6",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-fetch-mode": "cors",
    "credentials": "include"
}
```

## Response Structure
The response contains information about the IBC client state:

### Client Details
- **Client ID**: `07-tendermint-0`
- **Chain ID**: `noble-1`
- **Type**: `/ibc.lightclients.tendermint.v1.ClientState`

### Trust Parameters
- **Trust Level**: 1/3
- **Trusting Period**: 1,540,800 seconds
- **Unbonding Period**: 1,814,400 seconds
- **Max Clock Drift**: 600 seconds

### Height Information
- **Latest Height**: 
    - Revision Number: 1
    - Revision Height: 25,320,111
- **Proof Height**:
    - Revision Number: 1
    - Revision Height: 42,795,721

### Additional Settings
- **Upgrade Path**: `["upgrade", "upgradedIBCState"]`
- **Allow Update After Expiry**: `true`
- **Allow Update After Misbehaviour**: `true`


### example response
```json
{
    "identified_client_state": {
        "client_id": "07-tendermint-0",
        "client_state": {
            "@type": "/ibc.lightclients.tendermint.v1.ClientState",
            "chain_id": "noble-1",
            "trust_level": {
                "numerator": "1",
                "denominator": "3"
            },
            "trusting_period": "1540800s",
            "unbonding_period": "1814400s",
            "max_clock_drift": "600s",
            "frozen_height": {
                "revision_number": "0",
                "revision_height": "0"
            },
            "latest_height": {
                "revision_number": "1",
                "revision_height": "25320111"
            },
            "proof_specs": [
                {
                    "leaf_spec": {
                        "hash": "SHA256",
                        "prehash_key": "NO_HASH",
                        "prehash_value": "SHA256",
                        "length": "VAR_PROTO",
                        "prefix": "AA=="
                    },
                    "inner_spec": {
                        "child_order": [
                            0,
                            1
                        ],
                        "child_size": 33,
                        "min_prefix_length": 4,
                        "max_prefix_length": 12,
                        "empty_child": null,
                        "hash": "SHA256"
                    },
                    "max_depth": 0,
                    "min_depth": 0,
                    "prehash_key_before_comparison": false
                },
                {
                    "leaf_spec": {
                        "hash": "SHA256",
                        "prehash_key": "NO_HASH",
                        "prehash_value": "SHA256",
                        "length": "VAR_PROTO",
                        "prefix": "AA=="
                    },
                    "inner_spec": {
                        "child_order": [
                            0,
                            1
                        ],
                        "child_size": 32,
                        "min_prefix_length": 1,
                        "max_prefix_length": 1,
                        "empty_child": null,
                        "hash": "SHA256"
                    },
                    "max_depth": 0,
                    "min_depth": 0,
                    "prehash_key_before_comparison": false
                }
            ],
            "upgrade_path": [
                "upgrade",
                "upgradedIBCState"
            ],
            "allow_update_after_expiry": true,
            "allow_update_after_misbehaviour": true
        }
    },
    "proof": null,
    "proof_height": {
        "revision_number": "1",
        "revision_height": "42795721"
    }
}
```