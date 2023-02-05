SVG.on(document, 'DOMContentLoaded', function() {
    var draw = SVG().addTo('div#map').size('100%', '100%');

    draw.rect(600, 600).fill('#d2b48c');
    draw.rect(200, 600).move(200,0).fill('#ffffff');
    draw.rect(600, 200).move(0,200).fill('#ffffff');
    var car1 = draw.rect(50, 50).move(230,150).fill('red');
    var car2 = draw.rect(50,50).move(400,330).fill('black');

    
});