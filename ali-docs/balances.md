# Fetch Cosmos Account Balances
#### this call is different in each network
Makes a GET request to the Cosmos Hub LCD REST API to retrieve account balances.

## Request
- **URL**: `https://lcd-cosmoshub.keplr.app/cosmos/bank/v1beta1/balances/{address}`
- **Method**: GET
- **Headers**:
    - Accept: application/json, text/plain, */*
    - Priority: u=1, i
    - Includes standard security headers for Chrome browser
```javascript
fetch("https://lcd-cosmoshub.keplr.app/cosmos/bank/v1beta1/balances/cosmos1uelknagpn3kj9dd3j2fehwavcnpv9krml2lee8?pagination.limit=1000", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,fa;q=0.7,lt;q=0.6",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "none",
    "sec-fetch-storage-access": "active"
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});
```
### Parameters
- `address`: Cosmos account address (required)
- `pagination.limit`: Maximum number of results to return (optional)

## Response
Returns a JSON object containing:
- `balances`: Array of account balances
- `pagination`: Object containing pagination details
    - `next_key`: Token for next page of results 
    - `total`: Total number of results

### Example Response
{"balances":[],"pagination":{"next_key":null,"total":"0"}}