# FISHING FRENZY BOT

Building the onchain economy with @base. Fishing is just the start. 🐟 Developed by @gguncharted

- Twitter [@FishingFrenzyCo](https://x.com/fishingfrenzyco)
- Website [https://fishingfrenzy.co](https://fishingfrenzy.co?code=KNL876)

## Features

- **Auto Register Accounts Using New Wallets**
- **Load Existing Tokens**: Load pre-existing tokens if you already have account.
- **Auto Fishing**
- **Auto Daily Checkin**
- **Auto Complete Quest**
- **Auto Buy And Use EXP Scroll**
- **Support Multy Accounts**
- **Support Proxy**

# Get Bearer Token
- Open Fishing Frienzy Game then ```inspect```
- Select Console
```
allow pasting
```
```
localStorage.getItem('fishAuth')
```
- The text that appears is your token, copy the text and paste to ``tokens.txt`` perlines

# Setup your bot
```
source <(curl -s https://raw.githubusercontent.com/ryzwan29/fishfrenzy/main/quick-installation.sh)
```
> Run Fishing Bot
> ```
> node main.js
> ```

> Run Auto Create Account Bot
> ```
> node setup.js
> ```
- The newly created account will be saved in ```wallet.json``` login using wallet
- Tokens from new accounts that have just been created are stored in ```tokens.txt```
  
## ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

This project is licensed under the [MIT License](LICENSE).
