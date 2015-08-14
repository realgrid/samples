var isMobile = {
	Android : function() {
		return /Android/i.test(navigator.userAgent);
	},
	BlackBerry : function() {
		return /BlackBerry/i.test(navigator.userAgent);
	},
	iOS : function() {
		return /iPhone|iPad|iPod/i.test(navigator.userAgent);
	},
	Windows : function() {
		return /IEMobile/i.test(navigator.userAgent);
	},
	any : function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
	}
};

$(function() {
	$("body").bind("touchstart", touchstart);
	$("body").bind("touchmove", touchmove);
});

$(window).bind("orientationchange", function(event) {
	var angle = Math.abs(window.orientation) / 90;
	if (grdMain)
		cfnOrientationGrid(grdMain);
});

function cfnOrientationGrid(grid) {
	$("#touchTxt").text("height : " + $("body").height() + ", width : " + $("body").width());
	var os = isMobile.Android();
	if(os){
		if ($("body").height() < $("body").width()) {
			grid.setStyles({
				header : {
					fontSize : 40,
//					background : "#ffff0000",
					group : {
						fontSize : 40
					}
				},
				body : {
					fontSize : 40
				},
				indicator : {
					fontSize : 30
				}
			});
		} else {
			grid.setStyles({
				header : {
					fontSize : 30,
//					background : "#ff00ff00",
					group : {
						fontSize : 30
					}
				},
				body : {
					fontSize : 30
				},
				indicator : {
					fontSize : 20
				}
			});
		}
	}else{
		if ($("body").height() > $("body").width()) {
			grid.setStyles({
				header : {
					fontSize : 40,
//					background : "#ffff0000",
					group : {
						fontSize : 40
					}
				},
				body : {
					fontSize : 40
				},
				indicator : {
					fontSize : 30
				}
			});
		} else {
			grid.setStyles({
				header : {
					fontSize : 30,
//					background : "#ff00ff00",
					group : {
						fontSize : 30
					}
				},
				body : {
					fontSize : 30
				},
				indicator : {
					fontSize : 20
				}
			});
		}
	}
}

var touchX = 0, touchY = 0;

function touchstart(e) {
	var touches = e.originalEvent.touches;
	if (touches.length >= 2) {
		var x = 0;
		var y = 0;
		$.map(touches, function(v) {
			x += v.screenX;
			y += v.screenY;
		});
		touchX = x / touches.length;
		touchY = y / touches.length;
	}
}

function touchmove(e) {
	var touches = e.originalEvent.touches;
	if (touches.length >= 2) {
		var x = 0;
		var y = 0;
		// 현재 손가락 위치
		$.map(touches, function(v) {
			x += v.screenX;
			y += v.screenY;
			// $("#swipeDiv").text(JSON.stringify(v));
		});
		// 현재 위치 - 처음 터치 위치
		var movex = (x / touches.length) - touchX;
		var movey = (y / touches.length) - touchY;

		var newy = $("body").scrollTop() + movey;

		$("body").scrollTop(newy);

		touchY = y / touches.length;
	}
}
