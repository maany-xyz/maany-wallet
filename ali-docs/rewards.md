# Cosmos Hub Rewards API Documentation

## Get Delegator Rewards

Retrieves the rewards information for a specific delegator on the Cosmos Hub.

### Endpoint
```
GET https://lcd-cosmoshub.keplr.app/cosmos/distribution/v1beta1/delegators/{address}/rewards
```

### Parameters
- `address` (path parameter): The delegator's Cosmos address
    - Example: `cosmos1uelknagpn3kj9dd3j2fehwavcnpv9krml2lee8`

### Headers
```http
Accept: application/json, text/plain, */*
Priority: u=1, i
```

### Response
```json
{
        "rewards": [],
        "total": []
}
```

### Response Fields
- `rewards`: Array of reward details
- `total`: Array of total rewards

### Example Usage
```javascript
fetch("https://lcd-cosmoshub.keplr.app/cosmos/distribution/v1beta1/delegators/cosmos1uelknagpn3kj9dd3j2fehwavcnpv9krml2lee8/rewards")
```