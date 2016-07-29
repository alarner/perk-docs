/**
* Function that tracks a click on an outbound link in Analytics.
* This function takes a valid URL string as an argument, and uses that URL string
* as the event label. Setting the transport method to 'beacon' lets the hit be sent
* using 'navigator.sendBeacon' in browser that support it.
* https://support.google.com/analytics/answer/1136920?hl=en
*/
var trackOutboundLink = function(url) {
	console.log('trackOutboundLink', url);
	console.log(ga.create);
	if(ga.create) {
		ga('send', 'event', 'outbound', 'click', url, {
			'transport': 'beacon',
			'hitCallback': function(){document.location = url;}
		});
	}
	else {
		document.location = url;
	}
}

var links = document.querySelectorAll('a');
for(var i=0; i<links.length; i++) {
	if(links[i].hostname !== window.location.hostname) {
		links[i].addEventListener('click', function(e) {
			e.preventDefault();
			trackOutboundLink(e.target.href);
		});
	}
}