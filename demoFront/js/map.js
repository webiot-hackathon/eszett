SVG.on(document, 'DOMContentLoaded', function() {
    var draw = SVG().addTo('div#map').size('100%', '100%');

    draw.rect(600, 600).fill('#d2b48c');
    draw.rect(200, 600).move(200,0).fill('#ffffff');
    draw.rect(600, 200).move(0,200).fill('#ffffff');
    var car1 = draw.rect(50, 50).move(230,150).fill('red');
    var car2 = draw.rect(50,50).move(400,330).fill('black');

    var request = new XMLHttpRequest();
    var url  = "";
    while (true) {
        request.open('GET', url, true);
    }
    
});

request.onload = function () {
    // レスポンスが返ってきた時の処理
    var data = this.response;
    car1.move(data.car1.x, data.car1.y);
    car1.move(data.car2.x, data.car2.y);
}