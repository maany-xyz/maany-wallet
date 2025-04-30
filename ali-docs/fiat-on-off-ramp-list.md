# Fiat On/Off Ramp Service Documentation

This document outlines the API call and response for retrieving supported fiat on/off ramp services.

## API Call

```javascript
fetch("https://raw.githubusercontent.com/chainapsis/keplr-fiat-on-off-ramp-registry/main/fiat-on-off-ramp-list.json", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,fa;q=0.7,lt;q=0.6",
        "if-none-match": "W/\"3e28aadc2bce6848097ec97fa2b90359cca5d7253959127c158a409e0212c6a2\"",
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
    "credentials": "omit"
});
```

## Response

```json
{
    "list": [
        {
            "serviceId": "kado",
            "serviceName": "Kado",
            "buyOrigin": "https://app.kado.money",
            "buySupportCoinDenomsByChainId": {
                "osmosis-1": ["OSMO", "USDC", "ATOM", "stATOM"],
                "juno-1": ["USDC"],
                "phoenix-1": ["USDC"],
                "cosmoshub-4": ["ATOM"],
                "injective-1": ["INJ"],
                "regen-1": ["REGEN", "USDC"],
                "stargaze-1": ["STARS"],
                "secret-4": ["SCRT"],
                "agoric-3": ["BLD", "IST"],
                "noble-1": ["USDC"],
                "neutron-1": ["NTRN", "USDC", "ATOM", "stATOM"],
                "dydx-mainnet-1": ["USDC"],
                "chihuahua-1": ["HUAHUA"],
                "celestia": ["TIA"],
                "omniflixhub-1": ["FLIX"]
            }
        },
        {
            "serviceId": "moonpay",
            "serviceName": "Moonpay",
            "buyOrigin": "https://buy.moonpay.com",
            "buySupportCoinDenomsByChainId": {
                "cosmoshub-4": ["ATOM"],
                "dydx-mainnet-1": ["DYDX"],
                "injective-1": ["INJ"]
            }
        },
        {
            "serviceId": "transak",
            "serviceName": "Transak",
            "buyOrigin": "https://global.transak.com",
            "buySupportCoinDenomsByChainId": {
                "osmosis-1": ["OSMO"],
                "cosmoshub-4": ["ATOM"],
                "secret-4": ["SCRT"],
                "injective-1": ["INJ"],
                "eip155:1514": ["IP"]
            }
        }
    ]
}
```