/**
 * Go Pricing - WordPress Responsive Pricing Tables
 * 
 * Description: The New Generation Pricing Tables. If you like traditional Pricing Tables, but you would like get much more out of it, then this rodded product is a useful tool for you.
 * Version:     3.3.13
 * Author:      Granth
 * License:		http://codecanyon.net/licenses/
 * 
 * (C) 2018 Granth (http://granthweb.com)
 */

var gwGS = gwGS || {}; 
;(function ($, TimelineLite, TweenLite, undefined ) {
	"use strict";
		
		/**
		 * Initialize
		 */
		
		$.GoPricing = {

			/* Init function */
			Init : function () {
				this.$wrap = $('.gw-go');
				this.fixWidth();		
				this.equalize = this.$wrap.data('equalize');
				this.InitMediaElementPlayer();
				this.InitGoogleMap();
				this.isIE = document.documentMode != undefined && document.documentMode >5 ? document.documentMode : false;
				if (this.isIE) {
					this.$wrap.addClass('gw-go-ie');
					if (this.isIE < 9) this.$wrap.addClass('gw-go-oldie');
				};
				if ($.GoPricing!=undefined && $.GoPricing.equalize) {
					this.EqualizeRows();
				};
				this.InitAnim();				
				this.eventType = this.detectEvent();
				this.timeout = [];
				
			},

			InitAnim: function() {
				this.$wrap.each(function( i, obj ) {
					
					$(obj).css('opacity', 1);
					if ( !TimelineLite || !TweenLite) return;
										
					var $cols = $(".gw-go-col-wrap[data-col-anim]", this);
					if ($cols.length) {
						var tl = new TimelineLite({
							paused: true,
							onStart: function() {
								var tw = this.getChildren(), i = tw.length;
								while (i--) if (tw[i].vars.onUpdate) tw[i].vars.onUpdate();
							}
						});
						$cols.each(function(i, col) {
							var anim = $(col).data('col-anim') || {};
							if (anim.trans) {
								anim.css.opacity /= 100, anim.css.scaleX /= 100, anim.css.scaleY /= 100;
								tl.add( TweenLite.from(col, anim.trans.duration/1000, {css: anim.css, ease: anim.trans.ease}), anim.trans.delay/1000 );
							}
							if (anim.count) {
								var $price = $('[data-id=price]', col),
									counter = { value : (anim.count.from || 0) },
									$amount = $price.find('[data-id=amount]'),
									price = $price.data('price') || 0,
									currency = $price.data('currency') || {},
									decimals = (price || '').toString().split('.')[1] || '',
									decCnt = decimals.length;
								
								if ($price.data('trailing-zero')) decCnt = $price.data('decimal-no');
								
								tl.add( TweenLite.to(counter, anim.count.duration/1000, {
									value: price,
									ease: anim.count.ease,
									onUpdate: function() {
										var c = counter.value
										$amount.html(function() {
											var parts = parseFloat(c).toFixed(decCnt).split('.');
											parts[0] = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1"+(currency['thousand-sep'] || ' '));
											parts[1] = parts[1] ? ( ( currency['decimal-sep'] || '.' ) + parts[1] ) : '';
											return parts[0] + parts[1];
										});
																				
									},
								}), anim.count.delay/1000 );
							}
						});
						var $this = $(this).data('tl', tl);
						$this.tablespy({offset: $this.data('scroll-offset')});
						TweenLite.set(this, {perspective: '1000px'});
					}
				});
			},
				
			/* Show Tooltip */
			showTooltip : function ($elem, content, top) {
				
				if ($elem === undefined) return;
				
				var $rowTooltip = $elem.find('.gw-go-tooltip-content'),
					rowTooltipContent = $rowTooltip.length ? $rowTooltip.prop('outerHTML') : '',
					$colWrap = $elem.closest('.gw-go-col-wrap'),
					$col = $colWrap.find('.gw-go-col'),
					$tooltip = $col.find('.gw-go-tooltip'),
					colIndex = $colWrap.data('col-index'),
					rIndex = $elem.data('row-index');	
				
				if (!$tooltip.length ) $tooltip = $('<div class="gw-go-tooltip"></div>').appendTo($col);
								
				if ($tooltip.data('index') != rIndex) {
					$tooltip.removeClass('gw-go-tooltip-visible');
				} else {
					clearTimeout($.GoPricing.timeout[colIndex]);
				}

				if (rowTooltipContent != '') {
					$tooltip.html(rowTooltipContent).data('index', rIndex)						
					var corr = $col.position().top;
					setTimeout(function() { $tooltip.addClass('gw-go-tooltip-visible').css('top', $elem.find('.gw-go-body-cell').offset().top - $col.closest('.gw-go-col-wrap').offset().top - $tooltip.outerHeight() - 16 - corr) }, 10);
				}

			},

			/* Hide Tooltip */
			hideTooltip : function ($elem) {

				if ($elem === undefined) return;
				
				if ($elem.hasClass('gw-go-tooltip')) {
					$elem.removeClass('gw-go-tooltip-visible');
				} else {
					
					var $colWrap = $elem.closest('.gw-go-col-wrap'),
						$col = $colWrap.find('.gw-go-col'),
						$tooltip = $col.find('.gw-go-tooltip'),
						colIndex = $colWrap.data('col-index');
				
					$.GoPricing.timeout[colIndex] = setTimeout(function() { $tooltip.removeClass('gw-go-tooltip-visible'); }, 10);
				
				}
				
			},

			/* Mediaelement Player init */
			InitMediaElementPlayer : function () {
				
				if (jQuery().mediaelementplayer && $.GoPricing.$wrap.find('audio, video').length) {	
					$.GoPricing.$wrap.find('audio, video').mediaelementplayer({
						audioWidth: '100%',
						videoWidth: '100%'
					});			
				};	

			},
			
			/* Google map init */
			InitGoogleMap : function () {
				
				if (jQuery().goMap && $.GoPricing.$wrap.find('.gw-go-gmap').length) {
					$.GoPricing.$wrap.find('.gw-go-gmap').each(function(index) {
						var $this=$(this);
						$this.goMap($this.data('map'));
					});
				};
				
			},
			
			loadImages : function ( $pricingTable ) {

				if ( !$pricingTable.data('images') || $pricingTable.data('imagesLoaded')) return;

				var images = $pricingTable.data('images'),
                    loadedCount = $pricingTable.data('imagesLoadedCnt') ? parseInt($pricingTable.data('imagesLoadedCnt')) : 0;

				for (var x = 0; x < images.length; x++) {
					var image = images[x];
                    if ($(image.el).data('loading')) continue;
                    $(image.el).data('loading', true);
                    var img = new Image();
                    img.onerror = function(){
                        $pricingTable.data('imagesLoadedCnt', ++loadedCount);
                    };
                    img.onload = function(e){
                        $pricingTable.data('imagesLoadedCnt', ++loadedCount);
                    };
                    img.src = image.el.src;
				}

				if (loadedCount == images.length) {
					$pricingTable.data('imagesLoaded', true);
					this.EqualizeRows();
					return;
				}

				setTimeout($.proxy(function() {
					this.loadImages($pricingTable);
				}, this), 100);

			},
			
			/* Fix width in webkit browsers */
			fixWidth : function() {
								
				if ( 'WebkitAppearance' in document.documentElement.style === false || window.StyleMedia ) return;
				
				for (var x = 0; x < $.GoPricing.$wrap.length; x++) {
					
					var $pricingTable = $.GoPricing.$wrap.eq(x),
						$cols = $pricingTable.find('.gw-go-col-wrap');
					
					if ($pricingTable.is(':hidden') || $pricingTable.offset().top>parseInt($(document).scrollTop()+window.innerHeight+500) || $pricingTable.data('fix-width') === true || $cols.length < 2 ) continue;
					
					for (var i = 0; i < $cols.length; i++) {
						
						var $col = $cols.eq(i),
							fixedMaxWidth = parseInt($pricingTable.data('mw')),
							maxWidth = Math.floor(parseFloat(window.getComputedStyle($col[0]).width));
												
						if ( !fixedMaxWidth || maxWidth < fixedMaxWidth ) {
							$cols.css('max-width', 'none');
							$cols.css('max-width',  Math.floor(parseFloat(window.getComputedStyle($col[0]).width)));
						}
					
					}					

					$pricingTable.data('fix-width', true);
					
				}				

			},
			
			/* Equalize rows */
			EqualizeRows : function () {
				
				for (var x = 0; x < $.GoPricing.$wrap.length; x++) {
					
					if ($.GoPricing.$wrap.eq(x).is(':hidden') || $.GoPricing.$wrap.eq(x).offset().top>parseInt($(document).scrollTop()+window.innerHeight+500) || $.GoPricing.$wrap.eq(x).data('eq-ready') === true )  continue; 

					var $pricingTable = $.GoPricing.$wrap.eq(x),
						$colWrap = $pricingTable.find('.gw-go-col-wrap:visible'),
						colCnt = $colWrap.length,
						equalizeCnt = colCnt,
						views = $pricingTable.data('views') !== undefined ? $pricingTable.data('views') : {};
					
					/* Load images */
					if ( !$pricingTable.data('images') && !$pricingTable.data('imagesLoaded') ) {
						var images = [];
						if ($pricingTable.data('equalize').body != undefined) { $pricingTable.find('.gw-go-body li .gw-go-body-cell:visible img').each(function(index, el){ images.push({'ready' : false, 'el' : el }) }); }
						if ($pricingTable.data('equalize').footer != undefined) { $pricingTable.find('.gw-go-footer .gw-go-footer-row-inner:visible img').each(function(index, el){ images.push({'ready' : false, 'el' : el }) }); }
						if ($pricingTable.data('equalize').column != undefined) { $pricingTable.find('.gw-go-header img').each(function(index, el){ images.push({'ready' : false, 'el' : el }) }); }

						if ( images.length ) $pricingTable.data( 'images', images );
						
					}
					
					if ( $pricingTable.data('images') && !$pricingTable.data('imagesLoaded') ) {
						this.loadImages( $pricingTable );
						continue;
					}
					
					for (var key in views) {						
						
						var mqSizes = [], mq = '';
						if (views[key].min !== undefined && views[key].min !== '') mqSizes.push('(min-width:'+views[key].min+'px)');
						if (views[key].max !== undefined && views[key].max !== '') mqSizes.push('(max-width:'+views[key].max+'px)');
						mq = mqSizes.join(' and ');						
						
						if (mq != '') if (window.matchMedia && window.matchMedia(mq).matches) { 
							equalizeCnt = views[key].cols !== undefined && views[key].cols !== '' && views[key].cols <= colCnt ? views[key].cols : colCnt;
						}					
						
					}
								
					if (equalizeCnt == 1) {
						$pricingTable.find('.gw-go-body li .gw-go-body-cell').css('height', 'auto');
						$pricingTable.find('.gw-go-col-wrap').css('height', 'auto');
						$pricingTable.find('.gw-go-footer').css('height', 'auto');
						continue;	
					}
								
					for (var z = 0; z<colCnt/equalizeCnt; z++) {
						
						if (!$pricingTable.is(':hidden')) $pricingTable.data('eq-ready', true);
	
						var rowHeights = [], footerHeights = [], colHeights = [];
							
						/* Body */
						if ($pricingTable.data('equalize').body != undefined) {
						
							for (var i = 0; i < colCnt; i++) {
								if (i >= (z*equalizeCnt) && i <= (z*equalizeCnt)+equalizeCnt-1) {
									var $currentCol = $colWrap.eq(i),
										$row = $currentCol.find('.gw-go-body li .gw-go-body-cell:visible');
										
									for (var rIndex = 0; rIndex < $row.length; rIndex++) {
										
										var $currentRow = $row.eq(rIndex);
										$currentRow.css('height', 'auto');
										
										if (typeof rowHeights[rIndex] !== 'undefined' ) {
											if ($currentRow.height() > rowHeights[rIndex] ) {
												rowHeights[rIndex] = $currentRow.height();
											}
										} else {
											rowHeights[rIndex] = $currentRow.height();
										}
										
									}
									
								}
							
							}
							
							for (var i = 0; i < colCnt; i++) {
								var $currentCol = $colWrap.eq(i),
									$row = $currentCol.find('.gw-go-body li .gw-go-body-cell:visible');
		
								if (i >= (z*equalizeCnt) && i <= (z*equalizeCnt)+equalizeCnt-1) {
									for (var rIndex = 0; rIndex < $row.length; rIndex++) {								
										var $currentRow = $row.eq(rIndex);
										$currentRow.css('height', rowHeights[rIndex]);
									}							
									
								}
								
							
								
							}
						
						}
						
						/* Footer */
						if ($pricingTable.data('equalize').footer != undefined) {
							
							for (var i = 0; i < colCnt; i++) {
								if (i >= (z*equalizeCnt) && i <= (z*equalizeCnt)+equalizeCnt-1) {
									var $currentCol = $colWrap.eq(i),
										$row = $currentCol.find('.gw-go-footer .gw-go-footer-row-inner:visible');
										
									for (var rIndex = 0; rIndex < $row.length; rIndex++) {
										
										var $currentRow = $row.eq(rIndex);
										$currentRow.css('height', 'auto');
										
										if (typeof footerHeights[rIndex] !== 'undefined' ) {
											if ($currentRow.height() > footerHeights[rIndex] ) {
												footerHeights[rIndex] = $currentRow.height();
											}
										} else {
											footerHeights[rIndex] = $currentRow.height();
										}
										
									}
									
								}
							
							}
							
							for (var i = 0; i < colCnt; i++) {
								var $currentCol = $colWrap.eq(i),
									$row = $currentCol.find('.gw-go-footer .gw-go-footer-row-inner:visible');
		
								if (i >= (z*equalizeCnt) && i <= (z*equalizeCnt)+equalizeCnt-1) {
									for (var rIndex = 0; rIndex < $row.length; rIndex++) {								
										var $currentRow = $row.eq(rIndex);
										$currentRow.css('height', footerHeights[rIndex]);
									}							
									
								}
								
							
								
							}							
													
						}
						
						/* Column */
						if ($pricingTable.data('equalize').column != undefined) {						
						
							for (var i = 0; i < colCnt; i++) {
								var $currentCol = $colWrap.eq(i);
								
								if (i >= (z*equalizeCnt) && i <= (z*equalizeCnt)+equalizeCnt-1) {
									$currentCol.css('height', 'auto');
									if (typeof colHeights[z] !== 'undefined' ) {
										if ($currentCol.outerHeight(true) > colHeights[z] ) {
											colHeights[z] = $currentCol.outerHeight(false);
										}
									} else {
										colHeights[z] = $currentCol.outerHeight(false);
									}
								}
								
							}
							
							for (var i = 0; i < colCnt; i++) {
								var $currentCol = $colWrap.eq(i);
								
								if (i >= (z*equalizeCnt) && i <= (z*equalizeCnt)+equalizeCnt-1) {
									$currentCol.css('height', colHeights[z]);
								}
								
							}
						
						}
						
						
					}
					
				}

			},

			/* Detect event type */
			detectEvent : function() {
				var eventType = 'mouseenter mouseleave';
				if ('ontouchstart' in window) {
					eventType = 'touchstart';
				} else if  (window.navigator.pointerEnabled && navigator.msMaxTouchPoints) {
					eventType = "pointerdown";
				} else if (window.navigator.msPointerEnabled && navigator.msMaxTouchPoints) {
					eventType = "MSPointerDown";
				} 
				return eventType;
			}
		
		};

    $(function() {

        /* Init */
		$.GoPricing.Init();	
		
		$(window).on('scroll', function() { 
		
			$.GoPricing.fixWidth();
			$.GoPricing.EqualizeRows();
		
		});
		
		/* Submit button event if form found */
		$.GoPricing.$wrap.delegate('span.gw-go-btn', 'click', function(){	
			var $this=$(this);
			if ($this.find('form').length) { $this.find('form').submit(); };
		});	
			

		/* Show & hide tooltip - Event on tooltip */
		$.GoPricing.$wrap.on( 'mouseenter mouseleave', '.gw-go-tooltip', function(e) {	

			var $this=$(this),
				$colWrap = $this.closest('.gw-go-col-wrap'),
				colIndex = $colWrap.data('col-index');
			
			if (e.type == 'mouseenter') {
				clearTimeout($.GoPricing.timeout[colIndex]);
			} else {
				$.GoPricing.timeout[colIndex] = setTimeout(function() { $.GoPricing.hideTooltip($this); }, 10);
			}
			
		});
		

		/* Show & hide tooltip - Event on row */
		$.GoPricing.$wrap.on( 'mouseenter mouseleave', 'ul.gw-go-body > li', function(e) {
			
			var $this=$(this);
			
			if (e.type == 'mouseenter') {		
				$.GoPricing.showTooltip($this);
			} else {
				$.GoPricing.hideTooltip($this);
			}
			
		});			


		/* Column hover / touch - supports mouse, touch and pointers */
		
		// Pointer enter event
		function enterEvent( $elem ) {
			$elem.addClass('gw-go-curr');					
			$elem.siblings().data('leave-event', null).data('enter-event', null);
			$elem.data('leave-event', null);
			if ($elem.hasClass('gw-go-disable-hover')) {
				$elem.siblings(':not(.gw-go-disable-hover)').removeClass('gw-go-hover');
			} else {
				$elem.addClass('gw-go-hover').siblings(':not(.gw-go-disable-hover)').removeClass('gw-go-hover');
				$elem.closest('.gw-go').addClass('gw-go-hover');
			}
		};
		
		// Pointer leave event
		function leaveEvent( $elem ) {
			$elem.siblings().data('leave-event', null).data('enter-event', null);
			$elem.data('enter-event', null);
			$elem.removeClass('gw-go-curr');
			if ($elem.hasClass('gw-go-disable-hover')) {
				$elem.closest('.gw-go').find('[data-current="1"]:not(.gw-go-disable-hover)').addClass('gw-go-hover');
			} else {
				$elem.removeClass('gw-go-hover');
				$elem.closest('.gw-go').find('[data-current="1"]:not(.gw-go-disable-hover)').addClass('gw-go-hover');
				$elem.closest('.gw-go').removeClass('gw-go-hover');
			}			
		};		
		
		// Enter event handling			
		$(document).on('pointerenter mouseenter pointerdown touchstart', '.gw-go-col-wrap', function(e) {
			e.stopPropagation();
			var $this = $(this);
			$this.closest('.gw-go').find('.gw-go-col-wrap').removeClass('gw-go-curr');	
			if ($this.hasClass('gw-go-disable-hover')) {
				$this.addClass('gw-go-curr');
				return;
			} 
			$this.data('leave-event', null);	
			
			if ($this.data('enter-event')) return;
			var event = {
				pointer : e.originalEvent.pointerType == 'touch' || e.type == 'touchstart' ? 'touch' : 'mouse',
				pageX : e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].pageX : e.originalEvent.pageX,
				pageY : e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].pageY : e.originalEvent.pageY,				
			};
			if (event.pointer == 'mouse') { 
				enterEvent($this);
			};
			$this.data('enter-event', event);			
		});

		// Leave event handling			
		$(document).on('pointerleave mouseleave pointerup touchend', '.gw-go-col-wrap', function(e) {
			e.stopPropagation();
			var $this = $(this);
						
			if ($this.hasClass('gw-go-disable-hover')) return;
			
			if (!$this.data('enter-event') || $this.data('leave-event')) return;
			var event = {
				pointer : e.originalEvent.pointerType == 'touch' || e.type == 'touchend' ? 'touch' : 'mouse',
				pageX : e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].pageX : e.originalEvent.pageX,
				pageY : e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].pageY : e.originalEvent.pageY,				
			};
			if (event.pointer == 'mouse') {
				$this.data('leave-event', event);				
				leaveEvent($this);				
			} else {
				if (!$this.data('leave-event')) {
					if (Math.abs($this.data('enter-event').pageX-event.pageX) > 20 || Math.abs($this.data('enter-event').pageY-event.pageY) > 20) {
						$this.data('enter-event', null);						
						return;
					}
					enterEvent($this);
					$this.data('leave-event', event);					
					$(document).on('touchstart.goprEvent pointermove.goprEvent mousemove.goprEvent', function(e) {
						if ( $(e.target).closest('.go-pricing').length ) return;
						leaveEvent($this);
						$this.data('leave-event', null);
						$this.data('enter-event', null);
						$(document).off('.goprEvent');
					});			
				}
			}
			
		});

		/**
	 	 * Google map
		 */			
		if (typeof jQuery.goMap !== 'undefined' && $.GoPricing.$wrap.find('.gw-go-gmap').length) {
			var GoPricing_MapResize=false;
			$(window).on('resize', function(e) {
				if (GoPricing_MapResize) { clearTimeout(GoPricing_MapResize); }
				GoPricing_MapResize = setTimeout(function() {
					$.GoPricing.$wrap.find('.gw-go-gmap').each(function(index, element) {
					  //$(this).goMap();
					  //console.log($.goMap.getMarkers('markers')[0].position);
					});
				}, 400);
			});			
		};
		
	
		/* Equalize heights on resize */
		$(window).on('resize load', function(e) { 
			
			for (var x = 0; x < $.GoPricing.$wrap.length; x++) {
				$.GoPricing.$wrap.eq(x).data('eq-ready', false);
				$.GoPricing.$wrap.eq(x).data('fix-width', false);							
			}
			$.GoPricing.fixWidth();
			$.GoPricing.EqualizeRows();
			
		});
		
		/* handle animations */
		$(window).on("scrollEnter scrollLeave", function(e, spy) {
			var $target = $(e.target);

			if ($target.data('anim') == 'off' || typeof spy === 'undefined') return;			
			var repeat = $target.data("anim-repeat") || Infinity;
			if (e.type == "scrollEnter") {
				if (spy.enters <= repeat) $target.data("tl").play();
			} else {
				if (spy.enters < repeat) $target.data("tl").stop().seek(0);
			}
		});

	});
	
	
})(jQuery, gwGS.TimelineLite, gwGS.TweenLite );

;(function($, window, undefined) {

	var $elems = $();
	var $cont = $(window)
		.on("resize.tablespy", onResize)
		.on("load.tablespy", onResize)
		.on("scroll.tablespy load.tablespy", onScroll);

	if ( window.frameElement ) {
		window.parent.onload = function() { onScroll(); }		
	}
		

	function onScroll() {
		if (!$elems.length) return;
		var height = $cont.height();
		var y = $cont.scrollTop();
		$elems.each(function() {
			var $elem = $(this);
			var o = $elem.data('tablespy');
			if (typeof o === "undefined") return;
			var offset = o.rowHeight * o.offset / 100;
			
			if (Math.floor((o.rowHeight+height)/2) < offset) offset = Math.floor((o.rowHeight+height)/2)-20;
			
			if (height + y-offset >= o.min && y+offset <= o.max){
				if (!o.inside) {
					o.inside = true;
					o.enters++;
					$elem.trigger("scrollEnter", {scrollTop: y, enters: o.enters, leaves: o.leaves});
				}
				$elem.trigger("scrollTick", {scrollTop: y, enters: o.enters, leaves: o.leaves});
			}
			if (o.inside && !(height + y >= o.min && y <= o.max)) {
				o.inside = false;
				o.leaves++;
				$elem.trigger("scrollLeave", {scrollTop: y, enters: o.enters, leaves: o.leaves});
			}
		});
	}

	function onResize() {
		$elems.each(function() {
			var $elem = $(this);
			var o = $elem.data("tablespy");
			if (typeof o === "undefined") return;			
			o.min = $elem.offset().top;
			o.max = $elem.outerHeight() + o.min;
			o.rowHeight = $elem.children(":visible:first").outerHeight();
		});
	}

	$.fn.tablespy = function(options) {
		var defaults = {
			offset: 0,
			enters: 0,
			leaves: 0,
			inside: false
		};
		return this.each(function() {
			var $elem = $(this);
			var top = $elem.offset().top;
			$elem.data("tablespy", $.extend({
				min: top,
				max: top + $elem.outerHeight(),
				rowHeight: $elem.children(":visible:first").outerHeight()
			}, defaults, options));
			$elems.push(this);
		});
	};

	/* Disable animation */
    $.GoPricing.disableAnim = function() {
        this.$wrap.each(function (index, element) {
            $(element).addClass('test');
			$(element).data('anim', 'off');
            $(element).css('opacity', 1);
			if ( typeof $(element).data("tl") === 'undefined' ) {
                return;
			}
            if ( $(element).data("tl").progress() == 1 ) return;
			$(element).data("tl").progress(1);
        });
    };

})(jQuery, window);