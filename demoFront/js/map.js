var car1;
var car2;
SVG.on(document, 'DOMContentLoaded', function() {
    var draw = SVG().addTo('div#map').size('100%', '100%');

    draw.rect(600, 600).fill('#d2b48c');
    draw.rect(200, 600).move(200,0).fill('#ffffff');
    draw.rect(600, 200).move(0,200).fill('#ffffff');
    car1 = draw.rect(50, 50).move(230,10).fill('red');
    car2 = draw.rect(50,50).move(550,330).fill('black');

    // var request = new XMLHttpRequest();
    // var url  = "";
    // while (true) {
    //     setTimeout(function(){
    //         request.open('GET', url, true);
    //     },5000)
    // }
    
});

// var draw = SVG().addTo('div#map').size('100%', '100%');

// draw.rect(600, 600).fill('#d2b48c');
// draw.rect(200, 600).move(200,0).fill('#ffffff');
// draw.rect(600, 200).move(0,200).fill('#ffffff');
// var car1 = draw.rect(50, 50).move(230,10).fill('red');
// var car2 = draw.rect(50,50).move(500,330).fill('black');

// request.onload = function () {
//     // レスポンスが返ってきた時の処理
//     var data = this.response;
//     car1.move(data.car1.x, data.car1.y);
//     car1.move(data.car2.x, data.car2.y);
// }

document.addEventListener('keyup', keyup_ivent);

function keyup_ivent(e) {
    if(e.code === 'KeyA'){
		//Aキーが押された時の処理
        document.getElementById("acca").innerHTML="赤：130";
        car1.move(230,150)
        document.getElementById("accb").innerHTML="白：110";
        car2.move(450,330)
        console.log("a");
	}
    if(e.code === 'KeyS'){
		//Aキーが押された時の処理
        document.getElementById("acca").innerHTML="赤：0";
        document.getElementById("accb").innerHTML="白：0";
        document.getElementById("yuzuriai").innerHTML="<p>譲り合い検知</p>";

	}
    if(e.code === 'KeyD'){
		//Aキーが押された時の処理
        document.getElementById("acca").innerHTML="赤：100";
        car1.move(230,400)
        document.getElementById("tokupb").innerHTML="白：1";

	}
    if(e.code === 'KeyF'){
		//Aキーが押された時の処理
        
	}
	//いずれかのキーが離された時の処理
	return false; 
}