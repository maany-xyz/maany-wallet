# Price Changes API Documentation

This document describes the API endpoint for fetching 24-hour price changes for various cryptocurrencies.

## Endpoint

```
GET https://satellite-develop.keplr.app/price/changes/24h
```

## Query Parameters

| Parameter | Description |
|-----------|-------------|
| ids | Comma-separated list of cryptocurrency IDs |

### Supported Cryptocurrency IDs
- agoric
- akash-network
- avalanche-2
- axelar
- binancecoin
- cosmos
- ethereum

## Request Headers

```javascript
{
    "accept": "application/json, text/plain, */*",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "none",
    "credentials": "include"
}
```

## Response

Returns a JSON object containing 24-hour price changes for the requested cryptocurrencies.

```javascript
{}
```

## Example Usage

```javascript
fetch("https://satellite-develop.keplr.app/price/changes/24h?ids=agoric,cosmos,ethereum")
```