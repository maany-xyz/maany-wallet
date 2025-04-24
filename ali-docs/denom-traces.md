### GET /ibc/apps/transfer/v1/denom_traces/{hash}

Retrieves IBC denomination trace information for a specific hash.

```javascript
fetch("https://lcd-dydx.keplr.app/ibc/apps/transfer/v1/denom_traces/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5", {
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
#### Path Parameters
- `hash` - The trace hash ID (hex encoded) to query

#### Response
Returns a JSON object containing:
- `denom_trace` - Object containing:
    - `path` - The IBC transfer path showing source channel
    - `base_denom` - The base denomination of the asset (e.g. uusdc)

#### Example Response
```
{"denom_trace":{"path":"transfer/channel-0","base_denom":"uusdc"}}
```