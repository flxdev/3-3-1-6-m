function loadedImg() {
	var $loaderSite = $(".siteLoader"),
	$lettersContainer = $(".letters-container"),
	$point1 = $(".point_1"),
	$point2 = $(".point_2"),
	$point3 = $(".point_3"),
	$point4 = $(".point_4"),
	$point5 = $(".point_5"),
	$text = $(".loader-text"),
	$timeline = $(".timeline"),
	$loaderContainer = $(".loader-container"),
	TimeLine = new TimelineLite();
	function frameAnim(){
		var tl = new TimelineLite()
		tl
			.to($(".frame-top"), 0.5, {
				y: "-100%"
			},0)
			.to($(".frame-bottom"), 0.5, {
				y: "100%",
				onComplete: function(){
					$loaderSite.fadeOut(100);
					setTimeout(function(){
						$(".out").addClass("load-page dom");
					},100);
				}
			},0)
	}
	TimeLine
		.set($point1, {
			z: "400px",
			autoAlpha: 0
		})
		.set($point2, {
			z: "400px",
			autoAlpha: 0
		})
		.set($point3, {
			z: "400px",
			autoAlpha: 0
		})
		.set($point4, {
			z: "400px",
			autoAlpha: 0
		})
		.set($point5, {
			z: "400px",
			autoAlpha: 0
		})
		.set($text, {
			autoAlpha: 0
		})

		.to($point1, 1.2, {
			z: "-=400px",
			autoAlpha: 1,
			ease: Power2.easeOut
		},0)
		.to($point2, 1.2, {
			z: "-=400px",
			delay: 0.6,

			autoAlpha: 1,
			ease: Power2.easeOut
		},0)
		.to($point3, 1.2, {
			z: "-=400px",
			autoAlpha: 1,
			delay: 1.2,
			ease: Power2.easeOut
		},0)
		.to($point4, 1.2, {
			z: "-=400px",
			autoAlpha: 1,
			delay: 0.9,
			ease: Power2.easeOut
		},0)
		.to($point5, 1.2, {
			z: "-=400px",
			autoAlpha: 1,
			delay: 0.3,
			ease: Power2.easeOut
		},0)
		.to($text, 1.2, {
			autoAlpha: 1,
			delay: 1.8,
			ease: Sine.easeIn 
		},0)
		.to($lettersContainer, 0.3, {
			delay: 1,
			scaleX: 1,
			scaleY: 0
		})
		.to($timeline, 1.2, {
			scaleX: 1,
			scaleY: 1,
			onComplete: function() {
				frameAnim()
				$timeline.fadeOut(100)
			}
		})
}
function customScroll(el) {
	this.el = el;
	this.init();
}

customScroll.prototype.init = function() {
	var self = this;
	this.scroll = new IScroll(self.el, {
		bounce: false,
		click: true,
		mouseWheel: true
	});
	if(this.el == '.wrapper') {
		// this.endscroll();
	}
	
}

customScroll.prototype.destroy = function(){
	this.scroll.destroy();
}

customScroll.prototype.update = function() {
	this.scroll.refresh();	
}

customScroll.prototype.scrollUp = function(){
	this.scroll.scrollTo(0,0);
}

customScroll.prototype.endscroll = function() {
	var self = this;
	this.scroll.on("scrollEnd", function() {
		console.log(this.y, Math.round(-$(self.el).find(".scroll").innerHeight() + 667))
		if(this.y == Math.round(-$(self.el).find(".scroll").innerHeight() + 667)){
			console.log(this.y)
		}
	})
}

function iso() {
	var container = document.getElementById("scroll-container"),
		grid = $(".grid");
	grid.isotope({
		itemSelector: 'li'
	});

	$('.sort').on('click', function(){
		var filterValue = $(this).attr('data-filter');
		grid.isotope({ filter: filterValue });
		$(this).addClass('active').siblings().removeClass('active');
		container.scrollTop = 0;
		setTimeout(function () {
			Ps.update(container);
		},600);		
	});

	grid.on("arrangeComplete", function(event, filteredItems){
		mainScrollInit.update();
	})
	grid.on("layoutComplete", function(){
		mainScrollInit.update();
	})
}

function lightG(){
	var item = document.getElementById("l-gallery");

	lightGallery(item, {
		download: false,
		counter: false,
		mode: 'lg-slide',
		prevHtml: '<i><svg viewBox="0 0 81 65" xmlns="http://www.w3.org/2000/svg"><path d="m76.40741,28.62963l-62.344,0l21.456,-21.456c1.562,-1.562 1.562,-4.095 0.001,-5.657c-1.562,-1.562 -4.096,-1.562 -5.658,0l-28.283,28.284l0,0c-0.186,0.186 -0.352,0.391 -0.498,0.61c-0.067,0.101 -0.114,0.21 -0.171,0.315c-0.067,0.124 -0.142,0.242 -0.196,0.373c-0.056,0.135 -0.088,0.276 -0.129,0.416c-0.032,0.111 -0.075,0.217 -0.098,0.331c-0.052,0.259 -0.08,0.521 -0.08,0.784l0,0c0,0.003 0.001,0.005 0.001,0.008c0,0.259 0.027,0.519 0.078,0.774c0.024,0.121 0.069,0.232 0.104,0.349c0.039,0.133 0.07,0.268 0.123,0.397c0.058,0.139 0.136,0.265 0.208,0.396c0.054,0.098 0.096,0.198 0.159,0.292c0.147,0.221 0.314,0.427 0.501,0.614l28.282,28.281c1.562,1.562 4.095,1.562 5.657,0.001c1.562,-1.562 1.562,-4.096 0,-5.658l-21.456,-21.454l62.343,0c2.209,0 4,-1.791 4,-4s-1.791,-4 -4,-4z"/></svg></i>',
		nextHtml: '<i><svg viewBox="0 0 81 65" xmlns="http://www.w3.org/2000/svg"><path id="svg_1" d="m4.38095,36.40194l62.344,0l-21.456,21.456c-1.562,1.562 -1.562,4.095 -0.001,5.656c1.562,1.562 4.096,1.562 5.658,0l28.283,-28.284l0,0c0.186,-0.186 0.352,-0.391 0.498,-0.609c0.067,-0.101 0.114,-0.21 0.172,-0.315c0.066,-0.124 0.142,-0.242 0.195,-0.373c0.057,-0.135 0.089,-0.275 0.129,-0.415c0.033,-0.111 0.076,-0.217 0.099,-0.331c0.052,-0.26 0.079,-0.522 0.079,-0.785l0,0c0,-0.003 -0.001,-0.006 -0.001,-0.009c-0.001,-0.259 -0.027,-0.519 -0.078,-0.774c-0.024,-0.12 -0.069,-0.231 -0.104,-0.349c-0.039,-0.133 -0.069,-0.268 -0.123,-0.397c-0.058,-0.139 -0.136,-0.265 -0.208,-0.396c-0.054,-0.098 -0.097,-0.198 -0.159,-0.292c-0.146,-0.221 -0.314,-0.427 -0.501,-0.614l-28.282,-28.281c-1.562,-1.562 -4.095,-1.562 -5.657,-0.001c-1.562,1.562 -1.562,4.095 0,5.658l21.456,21.455l-62.343,0c-2.209,0 -4,1.791 -4,4c0,2.209 1.791,4 4,4z"/></svg></i>'
	})
}

function modal() {
	$(document).on("click", "[data-modal]", function(){
		var data = $(this).data("modal");
		modalWindow(data);
		return false;
	});
} modal()
function modalWindow(data) {
	var popupSelector = $("[data-modal-popup='" + data + "']"),
		innerSelectop = popupSelector.find(".modal-container"),
		form = popupSelector.find("form"),
		duration = 350,
		close = popupSelector.find(".close"),
		html = $("html");

	html.addClass("modal-open " + data);

	popupSelector.addClass("open");
	mainScrollInit.destroy();

	close.add(popupSelector).on("click", function(){
		if(!popupSelector.hasClass("open")) return;

		popupSelector.removeClass("open");
		html.removeClass("modal-open "+ data);
		form.trigger("reset");
		mainScrollInit.init();
	});

	innerSelectop.on("click", function(event){
		event.stopPropagation();
	});
};


function initMap() {
	$(window).bind(initialize());
};

function ZoomControl(controlDiv, map) {
	controlDiv.style.padding = "20px 20px";

	var controlWrapper = document.createElement('div');
		controlWrapper.style.cursor = 'pointer';
		controlWrapper.style.textAlign = 'center';
		controlWrapper.style.width = '25px'; 
		controlWrapper.style.height = '50px';
		controlDiv.appendChild(controlWrapper);

	var zoomInButton = document.createElement('div');
		zoomInButton.classList.add("zoomIn");
		zoomInButton.style.width = '25px'; 
		zoomInButton.style.height = '25px';
		controlWrapper.appendChild(zoomInButton);

	var zoomOutButton = document.createElement('div');
		zoomOutButton.classList.add("zoomOut");
		zoomOutButton.style.width = '25px'; 
		zoomOutButton.style.height = '25px';
		controlWrapper.appendChild(zoomOutButton);

	google.maps.event.addDomListener(zoomInButton, 'click', function() {
		map.setZoom(map.getZoom() + 1);
	});

	google.maps.event.addDomListener(zoomOutButton, 'click', function() {
		map.setZoom(map.getZoom() - 1);
	});
}

function initialize(){
	var stylez = [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];
	var mapOptions = {
		zoom: 14,
		disableDefaultUI: true,
		scrollwheel: false,
		panControl: false,
		zoomControl: false,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL,
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
		scaleControl: true,
		center: new google.maps.LatLng(53.913332, 27.567922),
	};
	map = new google.maps.Map(document.getElementById('map'),mapOptions);

	var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });
	map.mapTypes.set('tehgrayz', mapType);
	map.setMapTypeId('tehgrayz');
	map.setOptions({ 'draggable': false });
	var image = 'img/icons/baloon.png';
	var myLatLng = new google.maps.LatLng(53.913332, 27.567922);
	var beachMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: image,
		title:""
	});

	google.maps.event.addDomListener(window, "resize", function() {
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center); 
	});

	var zoomControlDiv = document.createElement('div');
  	var zoomControl = new ZoomControl(zoomControlDiv, map);

  	zoomControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomControlDiv);

};

function gMaps(){
	var sct_tag = document.createElement("script");
	if(typeof(google) != 'object') {
		sct_tag.setAttribute("type", "text/javascript");
		sct_tag.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyCcDrkEbKdrAWUT7ZorYyn-NwTj9YD6DN4&callback=initMap");
		document.querySelector(".maps-container").appendChild(sct_tag);
	} else {
		$(initialize);
	}
};

var showPageLoader = function() {
	var loader = $(".pageLoader");
	loader.addClass("is-loader");
};

var hidePageLoader = function() {
	var loader = $(".pageLoader");
	var tl = new TimelineLite();

	tl.pause();

	tl.staggerFromTo(loader.find(".line"), 0.8, {
		scaleX: 1
	}, {
		scaleX: 0,
		ease: Power3.easeInOut
	}, 0.1);
	tl.call(function(){
		loader.find(".line").css({
			transform: ''
		});
		$(".header, .wrapper").removeClass("ajax")
		loader.removeClass("is-loader");
		$(".out").addClass("load-page");
		mainScrollInit.scrollUp();
	});
	tl.play();
};

function bindEventScroll() {
	$(".wrapper").removeClass("return");
};

var mainScroll = ".wrapper",
	scrollPopup = ".page-menu",
	scrollModal = ".modal__wrapper",
	mainScrollInit, scrollPopupInit, scrollModalInit;

window.onload = function() {
	setTimeout(function(){
		$(".out").addClass("load-page");
	},200)
	mainScrollInit = new customScroll(mainScroll);
	scrollPopupInit = new customScroll(scrollPopup);
	scrollModalInit = new customScroll(scrollModal);
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
}

$(document).ready(function(){	
	function mobileMenu() {		
		_this = this;
		var trigger = $(".hamburger"),
			container = $(".page-menu"),
			link = container.find(".ajax-trigger"),
			scroll = $(".out"),
			close = container.find(".close");	

		_this.init = function() {
			
			_this.initEvent()
		}

		_this.initEvent = function(){
			trigger.on("click", function(){
				_this.openMenu();
			});
			close.on("click", function(){
				_this.closeMenu();
			})
			link.on("click", function() {
				_this.triggerLink($(this))
			})
		}

		_this.openMenu = function() {
			trigger.addClass("open");
			container.addClass("open");
			scroll.attr("style", "overflow: hidden");
			mainScrollInit.destroy()
		}

		_this.closeMenu = function() {
			trigger.removeClass("open");
			container.removeClass("open");
			scroll.removeAttr("style")
			mainScrollInit.init()
		}

		_this.triggerLink = function(item){
			var $this = item;

			$this.parent("li").addClass("active").siblings().removeClass("active");

			setTimeout(function(){
				_this.closeMenu();
			},300);
		}

		_this.init();


		function actionAjaxLinks() {
			
			$("body").on("click", ".ajax-trigger", actionLoadPage);
			
		} actionAjaxLinks();

		function actionLoadPage() {
			$(".wrapper").addClass("return");
			$(".header, .wrapper").addClass("ajax");
			showPageLoader()
			$(".out").removeClass("load-page");

			setTimeout(function(){
				hidePageLoader();
				bindEventScroll()
			},3000);
		}

	} mobileMenu();
});