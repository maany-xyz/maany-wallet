# IBC Channel Information - dYdX Chain

This document describes the IBC (Inter-Blockchain Communication) channel information for the dYdX chain's transfer port.

## API Endpoint

```
GET https://lcd-dydx.keplr.app/ibc/core/channel/v1/channels/channel-0/ports/transfer
```
```
fetch("https://lcd-dydx.keplr.app/ibc/core/channel/v1/channels/channel-0/ports/transfer", {
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

## Channel Details

- **State**: `STATE_OPEN`
- **Ordering**: `ORDER_UNORDERED`
- **Version**: `ics20-1`

### Counterparty Information
- **Port ID**: `transfer`
- **Channel ID**: `channel-33`

### Connection Details
- **Connection Hops**: `connection-0`

### Proof Height
- **Revision Number**: `1`
- **Revision Height**: `42795721`

## Response Example

```json
{
    "channel": {
        "state": "STATE_OPEN",
        "ordering": "ORDER_UNORDERED",
        "counterparty": {
            "port_id": "transfer",
            "channel_id": "channel-33"
        },
        "connection_hops": [
            "connection-0"
        ],
        "version": "ics20-1"
    },
    "proof": null,
    "proof_height": {
        "revision_number": "1",
        "revision_height": "42795721"
    }
}
```