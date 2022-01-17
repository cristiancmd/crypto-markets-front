

    var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; function getCoin(callback) { var xhr = new XMLHttpRequest(); xhr.onreadystatechange = (e) => { if (xhr.readyState !== 4) { return; }; if (xhr.status === 200) { callback(JSON.parse(xhr.responseText).price); } else { console.warn('request_error'); }; }; xhr.open('GET', 'https://api.binance.com/api/v3/ticker/price?symbol=DAIUSDT'); xhr.send(); };
    getCoin(returnCallback => console.log(returnCallback));
