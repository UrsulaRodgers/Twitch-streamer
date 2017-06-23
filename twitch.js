$(document).ready(function(){
	//array containing user names
	var usersRaw = ["freecodecamp", "ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];
	var users = usersRaw.reverse();
	
	
	//loop around array to populate the page with specific user status information
	for (var i = 0; i < users.length; i++){
		var userStreams = "https://wind-bow.glitch.me/twitch-api/streams/" + users[i];
		var userChannels = "https://wind-bow.glitch.me/twitch-api/channels/" + users[i];
		//add elements to page before calling the api
		$("#channels").prepend("<div class='col-md-4 col-sm-6 text-center' id='div"+i+"'></div>");
		$("div.col-md-4").prepend("<h3 class='headings' id='heading"+i+"'></h3><p id='status"+i+"'></p>");
		$("div.col-md-4").append("<img class='img-responsive' id='img"+i+"'/>");
		$.ajax ({			//first api call to determine the status of each user
			url:userStreams,
			dataType:'json',
			type:"GET",
			async:false
		}).done (function(data){
			var status = "#status" + i;
			var background = "#div" + i;
			if (data.stream===null) {
				$(status).html("Offline").css({"position":"relative", "left":"40px" });
				$(background).css("background-color", "#F6BC8B");
			} else {
				$(status).html("Online").css({"position":"relative", "left":"40px" });
				$(background).css("background-color", "#DAF7A6");
			}
			$.ajax ({		//second api call to channels to get url, display name and logo for each user
				url:userChannels,
				dataType:'json',
				type:'GET',
				async:false
			}).done (function(channel){
				var heading = "#heading" + i;
				var avatar = "#img" + i;
				
				if (channel.error==="Not Found") {
					$(heading).html("Unable to find channel " + users[i]).css("font-size","1.5em");
					$(heading).removeClass("headings");
					$(status).html("");
				} else if (channel.logo===null){
					$(heading).prepend("<a href= "+channel.url+">"+channel.display_name+"</a>");
					$("a").attr("target", "_blank");
					$(avatar).attr("src","logo-placeholder.png").css({"width":"90px", 
						"height":"90px", "position":"relative", "top": "-85px"});
				} else {
					$(heading).prepend("<a href= "+channel.url+">"+channel.display_name+"</a>");
					$("a").attr("target", "_blank");
					$(avatar).attr("src", channel.logo).css({"width":"90px", 
					"height":"90px", "position":"relative", "top": "-85px"});
				}
			}).fail(function(){
				setTimeout(function(){
					"Page unable to load"
				}, 10000);
			});
		});
		
	}
	
});
