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
					document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
					var pull = new PullMobile;
					pull.init();
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

function lazyImage(){
	$('img').Lazy({
		afterLoad: function(){
			mainScrollInit.update();
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
		mouseWheel: true,
		probeType: 2,
		scrollbars: true,
		fadeScrollbars: true,
		HWCompositing: false
	});

	if($(this.el).find(".scroll").offset().top < 0) {
		self.scroll.scrollTo(0, -Math.round($(self.el).find(".scroll").innerHeight()) + $(self.el).height())
	}
	if(this.el == ".wrapper") {
		self.endscroll();
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

customScroll.prototype.scrollToElement = function (y) {
	this.scroll.scrollTo(0, y)
}

customScroll.prototype.endscroll = function() {
	var self = this;
	this.scroll.on("scrollEnd", function() {
		// if($("#news-template").length) {
		// 	fb.scrollEvents(-this.y, self.el);
		// }
	})
}

function iso() {
	var container = document.getElementById("scroll-container"),
		grid = $(".grid");
	grid.isotope({
		itemSelector: 'li'
	});
	grid.imagesLoaded().progress( function() {
		grid.isotope('layout');
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
window.onload =  function(){
	mainScrollInit = new customScroll(mainScroll);
	scrollPopupInit = new customScroll(scrollPopup);
	scrollModalInit = new customScroll(scrollModal);
}
// document.addEventListener("DOMContentLoaded", function(){
// 	mainScrollInit = new customScroll(mainScroll);
// 	scrollPopupInit = new customScroll(scrollPopup);
// 	scrollModalInit = new customScroll(scrollModal);
// })
function lightG(){
	var item = document.getElementById("l-gallery");

	lightGallery(item, {
		download: false,
		counter: false,
		mode: 'lg-slide',
		prevHtml: '',
		nextHtml: '',
		controls: false
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
		// scaleControl: true,
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
		$(".pan-loader, .wrapper").removeClass("ajax");
		loader.removeClass("is-loader");
		$(".out").addClass("load-page");
		_doReset();
		mainScrollInit.scrollUp();
		mainScrollInit.update();
	});
	tl.play();
};

function bindEventScroll() {
	$(".wrapper").removeClass("return");
};

var PullMobile = function(){

	var defaults = {
		contentEl: 'out',
		ptrEl: 'pan-loader',
		distanceToRefresh: 70,
		loadingFunction: false,
		resistance: 2.5
	};

	var options = {};

	var self = this;

	var pan = {
		enabled: false,
		distance: 0,
		startingPositionY: 0,
		isFunction: false,
		idLoading: false
	};

	var bodyClass = document.body.classList;

	this.init = function(params){
		params = params ? params : {};
		options = {
			contentEl: params.contentEl || document.getElementById(defaults.contentEl),
			ptrEl: params.ptrEl || document.getElementById(defaults.ptrEl),
			distanceToRefresh: params.distanceToRefresh || defaults.distanceToRefresh,
			loadingFunction: params.loadingFunction || defaults.loadingFunction,
			resistance: params.resistance || defaults.resistance
		};

		// if(!options.contentEl || options.ptrEl) {
		// 	return false;
		// }

		var h = new Hammer(options.contentEl);

		h.get( 'pan' ).set( { direction: Hammer.DIRECTION_VERTICAL } );

		h.on('panstart', this._panStart);
		h.on('panup', this._panUp);
		h.on('pandown', this._panDown);
		h.on('panend', this._panEnd);


	};

	this._panStart = function() {
		pan.startingPositionY = document.body.offsetHeight;

		if(pan.startingPositionY === Math.round(options.contentEl.getBoundingClientRect().bottom)) {
			pan.enabled = true;
		}
	};

	this._panUp = function(e){

		if(!pan.enabled) {
			return;
		}
		e.preventDefault();
		pan.distance = e.distance / options.resistance;

		self._setPanContent();
		self._setBodyClass();

	};

	this._panDown = function(e){
		if(! pan.enabled || pan.distance === 0) {
			return;
		}

		e.preventDefault();

		
		pan.distance = e.distance / options.resistance;
		
		self._setPanContent();
		self._setBodyClass();
		
		if(!pan.isFunction) {
			mainScrollInit.destroy();
			pan.isFunction = true;
		}
	};

	this._setPanContent = function(){
		document.getElementById('touch').style.webkitTransform = 'translate3d( 0, -' + pan.distance + 'px, 0 )';
		document.getElementById('pan-loader').style.webkitTransform = 'translate3d( 0, -' + pan.distance + 'px, 0 )';
		$(".outer").attr("stroke-dashoffset", 50 - (pan.distance/1.4));
	};

	this._panEnd = function(e) {
		if(!pan.enabled) {
			return;
		}

		if(pan.isFunction) {
			mainScrollInit.init();
			pan.isFunction = false;
		}

		e.preventDefault();

		document.getElementById('touch').style.webkitTransform = '';
		document.getElementById('pan-loader').style.webkitTransform = '';

		pan.isLoading = false;
		pan.distance = 0;
		pan.enabled = false;

	};

	// this._setBodyClass = function() {
	// 	if ( pan.distance > options.distanceToRefresh ) {
	// 		bodyClass.add( 'ptr-refresh' );
	// 	} else {
	// 		bodyClass.remove( 'ptr-refresh' );
	// 	}		
	// };
	
	this._setBodyClass = function() {
		if ( pan.distance > options.distanceToRefresh ) {
			bodyClass.add( 'ptr-refresh' );
			
			if(!pan.isLoading){
				self._doLoading();
				pan.isLoading = true;
			}

			document.getElementById('touch').style.webkitTransform = '';
			document.getElementById('pan-loader').style.webkitTransform = '';
		}
		
	};

	this._doLoading = function(){
		bodyClass.add('loading');
		setTimeout(function(){
			ajaxLoader($(".nav-page-button"))
		}, 1500);			
	};
};

var _doReset = function() {
	var bodyClass = document.body.classList;
		bodyClass.remove('loading');
		bodyClass.remove('ptr-refresh');
		bodyClass.add('ptr-reset');

		var bodyClassRemove = function() {
			bodyClass.remove('ptr-reset');
			document.body.removeEventListener( 'transitionend', bodyClassRemove, false );
		};

		document.body.addEventListener( 'transitionend', bodyClassRemove, false );
	};


var mainScroll = ".wrapper",
	scrollPopup = ".page-menu",
	scrollModal = ".modal__wrapper",
	mainScrollInit, scrollPopupInit, scrollModalInit;

function FacebookFeeds(el) {
	this._el = el;
	this._init();
};

FacebookFeeds.prototype._init = function() {
	this.current = 0;

	_data = {
		appId: '1769497983310854',
		app_secret: '5a35ff4cd940ade96313a26c621f2a28',
		group: '3316Architects',
		fields: {},
		onPage: 8,
		startPage: 8,
		contPage: 8
	};

	this.paginAll = $(this._el).parents(".wrapper").find('.pagination-all');
	this.btnNext = $(this._el).parents(".wrapper").find('#next');
	this.btnPrev = $(this._el).parents(".wrapper").find('#prev');
	this.countCurrent = $(this._el).parents(".wrapper").find(".pagination-current");

	this.loader = $(".pageSurfLoader");

	this.res;
	this.conteiner = $("#news-template");

	this.allPages;
	this.template;

	this.objTemplates = [];

	this.initEvent();
};

FacebookFeeds.prototype.initEvent = function() {
	var self = this;

	this.btnNext.on("click", function() {
		if(self.current == self.allPages - 1) {
			setTimeout(function(){
				$(".wrapper").removeClass("return");
			},200)
			return false;
		}
		++self.current;		
		$(self._el).parents(".wrapper").css("opacity", "0");
		setTimeout(function(){
			mainScrollInit.scrollToElement(0);
			self.loadElements();
			self._update();
			self.filterObject(self.current);
		},300);
		event.preventDefault();
	});

	this.btnPrev.on("click", function() {
		if(self.current == 0) {
			setTimeout(function(){
				$(".wrapper").removeClass("return");
			},200)
			return false;
		}
		--self.current;		
		$(self._el).parents(".wrapper").css("opacity", "0");
		setTimeout(function(){
			mainScrollInit.scrollToElement(0);
			self.loadElements();
			self._update();
			self.filterObject(self.current);
		},300);
		event.preventDefault();
	});

};

FacebookFeeds.prototype.getData = function(type, fields){
	var self = this;
	_data.fields = fields.split(',');

	var send_data = {
		fields: fields,
		access_token: _data.appId + '|' + _data.app_secret,
		limit: 100
	};

	console.log('https://graph.facebook.com/' + _data.group + '/' + type)

	$.ajax({
		url: 'https://graph.facebook.com/' + _data.group + '/' + type,
		data: send_data,
		type: 'get',
		dataType: "JSON",
		success: function(res) {
			self.allPages = self.countPage(res.data);
			self.res = res;

			self.filterObject();
		},
		error: function() {
			alert();
		}
	});
};

FacebookFeeds.prototype.filterObject = function(current) {
	var curr = current || 0;
	var _keys = Object.keys(this.res.data);
	this.resDate = [];

	this.start = (curr-1) * _data.onPage + _data.contPage ;
	this.end = this.start + _data.onPage - 1;
	this.template = '#facebook_template';

	for(var i = this.start; i <= this.end; i++) {
		if(typeof _keys[i] != 'undefined')
			this.resDate.push(this.res.data[_keys[i]]);
		else 
			break;
	}

	this.setData(this.resDate, this.template);
}

FacebookFeeds.prototype.countPage = function(results) {
	this.allPage = Math.round((results.length - _data.contPage) / 8 + 1);
	if(this.allPage < 10) {
		this.paginAll.text("0" + this.allPage);
	} else {
		this.paginAll.text(this.allPage)
	}
	return this.allPage
}

FacebookFeeds.prototype._update = function() {

	$(this.countCurrent).text("0" + (this.current + 1));

};

FacebookFeeds.prototype.convertDate = function(date) {
	var pStr = date.split('T'),
		pDate = pStr[0].split('-'),
		MonthList = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
		moth = pDate[1],
		textMonth = MonthList[moth - 1],
		day = pDate[2]

	return day + ' ' + textMonth
};

FacebookFeeds.prototype.setData = function(results, template) {
	var self = this;

	this.obj_result = results;
	this._htmlTemplate = $(template);
	this.main = '';

	$.each(this.obj_result, function(index, element) {

		self.templates = self._htmlTemplate.html();

		

		if(typeof element.comments == 'object') {
			element.comment = element.comments.data.length;
		} else if(typeof element.comments == 'undefined') {
			element.comment = 0;
		}

		if(typeof element.likes == 'object'){
			element.like = element.likes.data.length;
		} else if(typeof element.likes == 'undefined') {
			element.like = 0;
		}

		if(typeof element.message == 'undefined')
			element.message = '';

		element.convert_time = self.convertDate(element.created_time);

		$.each(element, function(code, value) {
			self.templates = self.templates.replace(new RegExp('#'+code+'#', "g"), value);
		});
		self.main += self.templates
	});
	self.appendTemplate(this.main, this.current);
}

FacebookFeeds.prototype.appendTemplate = function(template, curr) {
	var self = this;

	this.templateCover = document.createElement("div");
	this.templateCover.classList.add("gallery-news__cover");
	this.conteiner.append(this.templateCover)
	
	this.conteiner.removeClass("fPage");
	$(this.templateCover).append(template);
	mainScrollInit.update();
}

FacebookFeeds.prototype.loadElements = function(){
	var self = this;

	this.loader.addClass("openLoader");
	
	this.animationContent();
}
FacebookFeeds.prototype.animationContent = function() {
	var self = this;

	this.Elements = $(".gallery-news__cover");

	this.firstElements = $(".gallery-news__cover").first();
	this.lastElements = $(".gallery-news__cover").last();

	this.firstElements.addClass("fadeOut");
	this.lastElements.addClass("fadeIn");
	setTimeout(function() {
		self.unloadElements()
	}, 1400);
}
FacebookFeeds.prototype.unloadElements = function() {
	var self = this;
	this.loader.removeClass("openLoader");
	this.Elements.addClass("animate");
	this.removeElements();
}

FacebookFeeds.prototype.removeElements = function(){
	var self = this;
	this.Elements.on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd animationend", function(){
		self.Elements.removeClass("fadeOut fadeIn animate");
		self.firstElements.remove();
		$(".wrapper").removeClass("return");
		mainScrollInit.update();
		$(self._el).parents(".wrapper").css("opacity", "1");
	})	
}



$(document).ready(function(){
	loadedImg()

	function mobileMenu() {		
		_this = this;
		var trigger = $(".hamburger"),
			container = $(".page-menu"),
			link = container.find(".ajax-trigger"),
			scroll = $(".out"),
			close = container.find(".close"),
			posY;	

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
			posY = $(".scroll").offset().top;
			trigger.removeClass("open");
			container.removeClass("open");
			scroll.removeAttr("style")
			mainScrollInit.init();
			mainScrollInit.scrollToElement(posY);
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
			
			$("body").on("click", ".ajax-trigger", function() {
				ajaxLoader($(this))
			});
			
		} actionAjaxLinks();

	} mobileMenu();
});
function actionLoadPage(duration) {
	$(".wrapper").addClass("return");
	$(".pan-loader, .wrapper").addClass("ajax");
	// showPageLoader()
	// $(".out").removeClass("load-page");

	setTimeout(function(){
		hidePageLoader();
		bindEventScroll();
	},duration);
}
$.fn.hasAttr = function(name) {
   return this.attr(name) !== undefined;
};
function ajaxLoader(link) {
	var hrefValue = $(link).attr("href") || $(link).data("href");
	$.ajax({
		url: hrefValue,
		datatype: "html",
		beforeSend: function() {
			if(link.hasAttr('href')){
				showPageLoader();
				actionLoadPage(2000);
			} else {
				actionLoadPage(100);
			}
		},
		success: function(content) {
			// var cont = $(content).find("content");
			window.history.pushState("page" + hrefValue, hrefValue, hrefValue);
			window.history.replaceState("page" + hrefValue, hrefValue, hrefValue);			
		}
	})
}
function validator() {
	var form_validate = $('.js-validation');
	if (form_validate.length) {
		form_validate.each(function () {
			var form_this = $(this);
			$.validate({
				form : form_this,
				borderColorOnError : true,
				scrollToTopOnError : false,
				onError: function($form){

				},
				onValid: function($form){
					
				},
				onSuccess: function($form){
					valid($form);
					return false;
				}
			});
		});
	};
}
function valid(form) {
	$(form).parents('.modal__wrapper').find('.modal-container').addClass("hide");
	$(form).parents('.modal__wrapper').find('.modal-success').addClass("visible");			
}