# ICNS Names Query for Osmosis Contract

## API Endpoint
```
GET https://lcd-osmosis.keplr.app/cosmwasm/wasm/v1/contract/osmo1xk0s8xgktn9x5vwcgtjdxqzadg88fgn33p8u9cnpdxwemvxscvast52cdd/smart/eyJpY25zX25hbWVzIjp7ImFkZHJlc3MiOiJvc21vMXVlbGtuYWdwbjNrajlkZDNqMmZlaHdhdmNucHY5a3JtaDN2ZjA0In19
```

## Request Details
### Headers
```javascript
{
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,fa;q=0.7,lt;q=0.6",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "none"
}
```

### Request Configuration
- Method: `GET`
- Mode: `cors`
- Credentials: `include`
- Body: `null`

## Response
```json
{
    "data": {
        "names": [],
        "primary_name": ""
    }
}
```

## Notes
- The request queries ICNS names for a specific Osmosis address
- The response indicates no ICNS names are associated with the queried address