# Stride Staking Delegations API Documentation

## API Endpoint
```
GET https://lcd-stride.keplr.app/cosmos/staking/v1beta1/delegations/{address}
```

## Description
This endpoint retrieves all delegations for a specific address on the Stride network.

## Parameters
- `address`: The Stride wallet address (e.g., `stride1uelknagpn3kj9dd3j2fehwavcnpv9krmupl9dt`)
- `pagination.limit`: Maximum number of entries to return (e.g., `1000`)

## Headers
```javascript
{
    "accept": "application/json",
    "sec-fetch-mode": "cors",
    "credentials": "include"
}
```

## Response Format
```json
{
    "delegation_responses": [],
    "pagination": {
        "next_key": null,
        "total": "0"
    }
}
```

## Example Usage
```javascript
fetch("https://lcd-stride.keplr.app/cosmos/staking/v1beta1/delegations/stride1uelknagpn3kj9dd3j2fehwavcnpv9krmupl9dt?pagination.limit=1000")
```