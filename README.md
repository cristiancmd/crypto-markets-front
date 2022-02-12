# proyecto para IAW

![GitHub top language](https://img.shields.io/github/languages/top/cristiancmd/cryptomarkets)
![GitHub language count](https://img.shields.io/github/languages/count/cristiancmd/cryptomarkets)

## App deployada (podria tardar hasta 30 segundos en ingresar la primera vez dadas las limitaciones del servidor gratuito) :

## [Frontend](https://crypto-markets-iaw.netlify.app/)


## [Backend](https://crypto-markets-api.herokuapp.com/)

## Script de ejemplo para ingresar moneda SOLANA en exchange Binance:
```js
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; function getCoin(callback) { var xhr = new XMLHttpRequest(); xhr.onreadystatechange = (e) => { if (xhr.readyState !== 4) { return; }; if (xhr.status === 200) { callback(JSON.parse(xhr.responseText).price); } else { console.warn('request_error'); }; }; xhr.open('GET', 'https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT'); xhr.send(); }; getCoin(returnCallback);
```
Simbolo: SOL

## Test de integracion con MercadoPago:

Se debe realizar el upgrade en el Perfil, relizando el checkout con una cuenta de MercadoPago fake:

"nickname": TESTLFZLYYEX

"password": qatest9458

Se debe ingresar una tarjeta de testing provista por MercadoPago luego de loguearse:

(Mastercard)

Número: 5031 7557 3453 0604

Código de seguridad: 123

Fecha de vencimiento: 11/25

Titular: APRO



# CryptoMarkets

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
