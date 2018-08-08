// https://qiita.com/YoshikiNakamura/items/732ded26c85a7f771a27

// sync test
console.log('sync')
console.log(1);
console.log(2);
console.log(3);

// callback test
console.log('timeout callback')
console.log(1);
setTimeout(function(){ console.log(2) }, 0);
console.log(3);


////////////////////////////////////////////////////
// sync buy apple
//
var syncBuyApple = function(payment){
    if(payment >= 150){
        return {change:payment-150, error:null};
    }else{
        return {change:null, error:150-payment + '円たりません。'};
    }
}

var result = syncBuyApple(500);
console.log('500円払いました。');
if(result.change !== null){
    console.log('おつりは' + result.change + '円です。');
}
if(result.error !== null){
    console.log('エラーが発生しました：' + result.error);
}

////////////////////////////////////////////////////
// async buy apple
//
var asyncBuyApple = function(payment, callback){
    setTimeout(function() {
        if(payment >= 150){
            callback(payment-150, null);
        }else{
            callback(null, '金額が足りません');
        }
    }, 0);
}

asyncBuyApple(500, function(change, error){
    if(change !== null){
        console.log('おつりは' + change + '円です。');
    }
    if(error !== null){
        console.log('エラーが発生しました：' + error);
    }
});
console.log('500円払いました。')


/// nest

asyncBuyApple(500, function(change, error){
    if(change !== null){
        console.log('1回目のおつりは' + change + '円です。');
        asyncBuyApple(change, function(change, error){
            if(change !== null){
                console.log('2回目のおつりは' + change + '円です。');
                asyncBuyApple(change, function(change, error){
                    if(change !== null){
                        console.log('3回目のおつりは' + change + '円です。');
                    }
                    if(error !== null){
                        console.log('3回目でエラーが発生しました：' + error);
                    }                        
                });
            }
            if(error !== null){
                console.log('2回目でエラーが発生しました：' + error);
            }        
        });
    }
    if(error !== null){
        console.log('1回目でエラーが発生しました：' + error);
    }
});
console.log('500円払いました。')


////////////////////////////////////////////////////
// Promise buy apple
//
var promiseBuyApple = function(payment){
    return new Promise(function(resolve, reject){
        if(payment >= 150){
            resolve(payment-150);
        }else{
            reject('p:金額が足りません。');
        }
    });
}

promiseBuyApple(400).then(function(change){
    console.log('p:おつりは' + change + '円です。');
    return promiseBuyApple(change);
}).then(function(change){
    console.log('p:おつりは' + change + '円です。');
    return promiseBuyApple(change);
}).then(function(change){
    console.log('p:おつりは' + change + '円です。');
}).catch(function(error){
    console.log('p:エラーが発生しました：' + error);
});
