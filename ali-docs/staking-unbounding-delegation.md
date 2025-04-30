# Cosmos Hub Unbonding Delegations API

This document describes the API endpoint for retrieving unbonding delegations from the Cosmos Hub network.

## Endpoint
```
GET https://lcd-cosmoshub.keplr.app/cosmos/staking/v1beta1/delegators/{address}/unbonding_delegations
```

## Parameters
- `address`: The delegator's Cosmos address
- `pagination.limit`: Maximum number of entries to return (optional)

## Example Request
```javascript
fetch("https://lcd-cosmoshub.keplr.app/cosmos/staking/v1beta1/delegators/cosmos1uelknagpn3kj9dd3j2fehwavcnpv9krml2lee8/unbonding_delegations?pagination.limit=1000", {
    method: "GET",
    headers: {
        "accept": "application/json",
        "sec-fetch-mode": "cors"
    }
});
```

## Example Response
```json
{
    "unbonding_responses": [],
    "pagination": {
        "next_key": null,
        "total": "0"
    }
}
```

## Response Fields
- `unbonding_responses`: Array of unbonding delegation entries
- `pagination`: Pagination information
    - `next_key`: Key for retrieving next set of results
    - `total`: Total number of entries