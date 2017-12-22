// 获取一级城市
// 大花括号是对象的意思
var data;
$.ajax({
	url:"http://api.jisuapi.com/weather/city?appkey=7ee58d022acf619f",
	dataType:"jsonp",
	success:function(val){
		data = val.result;
		var province = $.grep(data,function(val,index){
			return val.parentid == 0;
		})
		// console.log(province);
		$.each($(".shengfen li"),function(index,val){
			$(val).html(province[index].city);
			$(val).attr("provinceid",province[index].cityid);
		})
	}
});

// 获取二级地区 
$(".shengfen li").each(function(index,ele){
	$(ele).click(function(){
		$(".shengfen li").removeClass("select");
		$(".area").html("");
		var city = $.grep(data,function(val,index){
			return val.parentid == $(ele).attr("provinceid");
		})
		$(ele).addClass("select");
		$.each(city,function(index,val){
			var li = $("<li></li>");
			li.html(val.city);
			$(".area").append(li);
		})
	})
})

$(".area").on("click","li",function(){
	getFullWeather($(this).html());
})

$.getScript
("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){
	getFullWeather(remote_ip_info.city)
});


var weatherObj;
function getFullWeather(city){
	$(".now-city").html(city);
	$.ajax({
		url:"http://api.jisuapi.com/weather/query?appkey=7ee58d022acf619f&city=" + city,
		dataType:"jsonp",
		success:function(val){
			weatherObj = val.result;
			$(".now-state span").html(weatherObj.temp+"°");
			$(".now-state .weather").html(weatherObj.weather);
			$(".now-state .tmps").html(weatherObj.temphigh+"° ~"+weatherObj.templow+"°");
			$(".now-state img").attr("src","tianqiimg/"+weatherObj.img+".png");

			//未来几小时
			$(".hourly ul li").each(function (index, ele) {
			    $(ele).find("time").html(weatherObj.hourly[index].time+"°");
			    $(ele).find("img").attr("src", "tianqiimg/" + weatherObj.hourly[index].img + ".png");
			    $(ele).find("p").html(weatherObj.hourly[index].temp + "°");
			});

			//未来几天
			$(".week li").each(function (index, ele) {
			    $(ele).find("time").html( weatherObj.daily[index + 1].week);
			    $(ele).find("img").attr("src", "tianqiimg/" + weatherObj.daily[index + 1].day.img + ".png");
			    $(ele).find("p").html(weatherObj.daily[index + 1].day.temphigh + "°/" + weatherObj.daily[index + 1].night.templow + "°")
			});
		}
	})
}



