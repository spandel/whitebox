/*jslint debug: true, eqeq: true, evil: true, newcap: true, plusplus: true, undef: true, sloppy: true, stupid: true, vars: true, white: true, css: true, on: true, fragment: true */
$(document).ready(function() {
	(function($){
		$.fn.reverse = [].reverse;
		$.fn.whitebox = function(options)
		{
			options=$.extend({}, $.fn.whitebox.defaults, options);
			return this.each(function()
			{
				var height, 
				width, 
				imageLoader, 
				maxheight, 
				maxwidth, 
				top, 
				outerPaddingTop, 
				innerPaddingTop, 
				outerPaddingLeft, 
				innerPaddingLeft, 
				totalPaddingTop, 
				totalPaddingLeft,
				data,
				animating, 
				loadingimg,
				loadingWidth,
				loadingHeight,
				group,
				textHeight,
				textHeightFromCss,
				textPaddingTop,
				textPaddingBottom,
				textPaddingTotal,
				altText,
				bgcolorCSS,
				bgopacityCSS,
				timer,
				sliding,
				$currentGroup,
				currentTheme,imgwidth,imgheight,imgoriginalheight,imgoriginalwidth,imageLoaderHeight,imageLoaderWidth;


				animating=true;
				height= window.innerHeight || $(window).height();
				width = window.innerWidth  || $(window).width();
				data=options;
				altText=$(this).attr('alt');
				imageLoader= new Image();
				sliding=true;
				currentTheme=data.theme;


				imageLoader.onload = function()
				{
					imgoriginalheight=imageLoader.height;
					imgoriginalwidth=imageLoader.width;
					imageLoaderHeight=imageLoader.height;
					imageLoaderWidth=imageLoader.width;
					textPaddingTotal=parseInt(textPaddingTop,10)+parseInt(textPaddingBottom,10);

					if(data.maxheight==='auto')
					{	
						maxheight=(parseInt(height,10)-20-parseInt(totalPaddingTop,10)*2)-textHeight-textPaddingTotal-parseInt($('#whitebox-'+currentTheme+'-slider').height(),10)*2+"px";	
					}
					else
					{
						maxheight=data.maxheight;
					}
					if(data.maxwidth==='auto')
					{	
						maxwidth=(parseInt(width,10)-20-parseInt(totalPaddingLeft,10)*2)+"px";
					}
					else
					{
						maxwidth=data.maxwidth;
					}
					if(data.fixedwidth)
					{
						if(imageLoaderWidth>data.fixedwidth)
						{
							imageLoaderWidth=data.fixedwidth;
						}
						imgwidth=data.fixedwidth;
						maxwidth=imgwidth;
					}
					if(data.fixedheight)
					{
						if(imageLoaderHeight>data.fixedheight)
						{
							imageLoaderHeight=data.fixedheight;
						}
						imgheight=data.fixedheight;
						maxheight=imgheight;
					}			var m;	
					if(!data.fixedwidth)
					{
						m=imageLoaderHeight/imgoriginalheight;
						imgwidth=imageLoaderWidth*m;
					}
					if(!data.fixedheight)
					{
						m=imageLoaderWidth/imgoriginalwidth;
						imgheight=imageLoaderHeight*m;
					}
					if(data.alt!==undefined && data.showdesc!=='no')
					{					
						$('#whitebox-'+currentTheme+'-text-area').css({'display':'block'});
						$('#whitebox-'+currentTheme+'-text-area').text(data.alt);
						textHeight=textHeightFromCss;
						textPaddingTotal=parseInt(textPaddingTop,10)+parseInt(textPaddingBottom,10);
						$('#whitebox-'+currentTheme+'-text-area').css({'opacity':0});
					}
					else if(altText!==undefined && data.usealt!=='no' && data.showdesc!=='no')
					{
						$('#whitebox-'+currentTheme+'-text-area').css({'display':'block'});
						$('#whitebox-'+currentTheme+'-text-area').text(altText);
						textHeight=textHeightFromCss;
						textPaddingTotal=parseInt(textPaddingTop,10)+parseInt(textPaddingBottom,10);
						$('#whitebox-'+currentTheme+'-text-area').css({'opacity': 0});
					}
					else
					{
						$('#whitebox-'+currentTheme+'-text-area').css({'display':'none'});
						textPaddingTotal=0;
						textHeight=0;
						data.animatetexttime=0;
					}
					
					$('#whitebox-'+currentTheme+'-img img').attr('src',imageLoader.src).load(function(event)
					{
						
						$('#whitebox-'+currentTheme+'-img img').css({
							'max-height': maxheight,
							'max-width': maxwidth
						});	
						var top;
						if(!data.fixedwidth)
						{	
							imgwidth=$('#whitebox-'+currentTheme+'-img img').width();
						}
						if(!data.fixedheight)
						{
							imgheight=$('#whitebox-'+currentTheme+'-img img').height();
						}

						if(data.autoslide==='yes' && sliding)
						{
							clearTimeout(timer);
							timer= setTimeout(function (){
								nextBox();
							},data.slidetimer);
						}
						animating=true;
						top=(height/2 - imgheight/2)-parseInt(totalPaddingTop,10)-parseInt(textHeight,10)/2-textPaddingTotal/2;
						$('#whitebox-'+currentTheme+'-text-area').css({'margin-top':0});

						$('#whitebox-'+currentTheme+'-outerbox').animate({
							'top':(height/2 - imgheight/2)-parseInt(totalPaddingTop,10)-parseInt(textHeight,10)/2-textPaddingTotal/2+"px",
							'left':(width/2 - imgwidth/2)-10-parseInt(totalPaddingLeft,10)+"px",
							'width':parseInt(imgwidth,10)+parseInt(innerPaddingLeft,10)*2+"px", 
							'height':boxStartHeight+parseInt(innerPaddingTop,10)*2+"px"
						}, data.animateframetime, function(){
							if(data.showthumbs==='yes')
							{
								$('#whitebox-'+currentTheme+'-thumbnail-wrapper').css({	
									'visibility':'visible'
								}).animate({'opacity':1},data.starttime);
							}


							$('#whitebox-'+currentTheme+'-img img').animate({
								'opacity': 1
							}, data.animateimgtime, function()
							{
								if(data.animatetextstyle==='fade')
								{
									$('#whitebox-'+currentTheme+'-innerbox').css({
										'height':imgheight+textHeight+textPaddingTotal
									});
									$('#whitebox-'+currentTheme+'-outerbox').css({
										'height':imgheight+textHeight+textPaddingTotal+parseInt(innerPaddingTop,10)*2
									});
									$('#whitebox-'+currentTheme+'-text-area').animate({
										'opacity': 1
									},data.animatetexttime,function() {
										animating=false;
										$('#whitebox-'+currentTheme+'-next, #whitebox-'+currentTheme+'-prev').css({
											'visibility':'visible'
										});
										if(data.sliderbtn==='yes' || data.exitbtn==='yes' || data.displayimgnr==='yes')
										{
											var height,top;

											top=parseInt($('#whitebox-'+currentTheme+'-outerbox').css('top'),10);
											
											height=	parseInt($('#whitebox-'+currentTheme+'-outerbox').css('height'),10)+
													parseInt($('#whitebox-'+currentTheme+'-outerbox').css('paddingTop'),10)+
													parseInt($('#whitebox-'+currentTheme+'-outerbox').css('paddingBottom'),10);

											if(data.sliderbtn==='yes')
											{
												if(data.btnanimstyle==='fade')
												{
													$('#whitebox-'+currentTheme+'-slider').css(
													{
														'visibility':'visible',
														'opacity':0
													}).animate({
														'opacity':1
													}, data.btnanimtime);
												}
												else if(data.btnanimstyle==='none')
												{
													$('#whitebox-'+currentTheme+'-slider').css(
													{
														'visibility':'visible',
														'opacity':1
													});
												}
												height+=parseInt($('#whitebox-'+currentTheme+'-slider').css('height'),10)*2;
												top-=parseInt($('#whitebox-'+currentTheme+'-slider').css('height'),10);
											}else if(data.exitbtn==='yes'){												
												height+=parseInt($('#whitebox-'+currentTheme+'-exit').css('height'),10)*2;
												top-=parseInt($('#whitebox-'+currentTheme+'-exit').css('height'),10);
											}else {
												height+=parseInt($('#whitebox-'+currentTheme+'-imgnr').css('height'),10)*2;
												top-=parseInt($('#whitebox-'+currentTheme+'-imgnr').css('height'),10);
											}
											if(data.exitbtn==='yes')
											{
												if(data.btnanimstyle==='fade')
												{
													$('#whitebox-'+currentTheme+'-exit').css(
													{
														'visibility':'visible',
														'opacity':0
													}).animate({
														'opacity':1
													}, data.btnanimtime);
												}
												else if(data.btnanimstyle==='none')
												{
													$('#whitebox-'+currentTheme+'-exit').css(
													{
														'visibility':'visible',
														'opacity':1
													});
												}
											}
											if(data.displayimgnr==='yes')	
											{
												var txt="", 
													current=0,
													i=1, 
													total=$currentGroup.size();
												current=0;
												$currentGroup.each(function() 
												{
													if($(this).data('url')===data.url)
													{
														current=i;
													}
													i++;
												});

												txt=data.imgnrtext.replace("X",current).replace("Y",total);
												$('#whitebox-'+currentTheme+'-imgnr-link span').text(txt);

												if(data.btnanimstyle==='fade')
												{
													$('#whitebox-'+currentTheme+'-imgnr').css(
													{
														'visibility':'visible',
														'opacity':0
													}).animate({
														'opacity':1
													}, data.btnanimtime);
												}
												else if(data.btnanimstyle==='none')
												{
													$('#whitebox-'+currentTheme+'-imgnr').css(
													{
														'visibility':'visible',
														'opacity':1
													});
												}
											}
											$('#whitebox-'+currentTheme+'-button-wrapper').css({
												'left':$('#whitebox-'+currentTheme+'-outerbox').css('left'),
												'top':top+"px",
												'width':parseInt($('#whitebox-'+currentTheme+'-outerbox').css('width'),10)+
														parseInt($('#whitebox-'+currentTheme+'-outerbox').css('paddingLeft'),10)+
														parseInt($('#whitebox-'+currentTheme+'-outerbox').css('paddingRight'),10),
												'height':height+"px"
											});
										}
									});
								}
								else
								{
									$('#whitebox-'+currentTheme+'-text-area').css({
										'opacity': 1,
										'height':0,
										'paddingTop':0,
										'paddingBottom':0
									}).animate({
										'height':textHeight,
										'paddingTop':textPaddingTop,
										'paddingBottom':textPaddingBottom
									},data.animatetexttime, function() {
										animating=false;
									});

									$('#whitebox-'+currentTheme+'-innerbox').css({
										'height':imgheight
									}).animate({
										'height':imgheight+textHeight+textPaddingTotal
									},data.animatetexttime);
									$('#whitebox-'+currentTheme+'-outerbox').css({
										'height':imgheight
									}).animate({
										'height':imgheight+textHeight+textPaddingTotal+parseInt(innerPaddingTop,10)*2
									},data.animatetexttime, function() {
										$('#whitebox-'+currentTheme+'-next, #whitebox-'+currentTheme+'-prev').css({
											'visibility':'visible'
										});

										if(data.sliderbtn==='yes' || data.exitbtn==='yes')
										{
											var height,top;

											top=parseInt($('#whitebox-'+currentTheme+'-outerbox').css('top'),10);
											
											height=	parseInt($('#whitebox-'+currentTheme+'-outerbox').css('height'),10)+
													parseInt($('#whitebox-'+currentTheme+'-outerbox').css('paddingTop'),10)+
													parseInt($('#whitebox-'+currentTheme+'-outerbox').css('paddingBottom'),10);

											if(data.sliderbtn==='yes')
											{
												if(data.btnanimstyle==='fade')
												{
													$('#whitebox-'+currentTheme+'-slider').css(
													{
														'visibility':'visible',
														'opacity':0
													}).animate({
														'opacity':1
													}, data.btnanimtime);
												}
												else if(data.btnanimstyle==='none')
												{
													$('#whitebox-'+currentTheme+'-slider').css(
													{
														'visibility':'visible',
														'opacity':1
													});
												}
												height+=parseInt($('#whitebox-'+currentTheme+'-slider').css('height'),10)*2;
												top-=parseInt($('#whitebox-'+currentTheme+'-slider').css('height'),10);
											}else if(data.exitbtn==='yes'){												
												height+=parseInt($('#whitebox-'+currentTheme+'-exit').css('height'),10)*2;
												top-=parseInt($('#whitebox-'+currentTheme+'-exit').css('height'),10);
											}else {
												height+=parseInt($('#whitebox-'+currentTheme+'-imgnr').css('height'),10)*2;
												top-=parseInt($('#whitebox-'+currentTheme+'-imgnr').css('height'),10);
											}
											if(data.exitbtn==='yes')
											{
												if(data.btnanimstyle==='fade')
												{
													$('#whitebox-'+currentTheme+'-exit').css(
													{
														'visibility':'visible',
														'opacity':0
													}).animate({
														'opacity':1
													}, data.btnanimtime);
												}
												else if(data.btnanimstyle==='none')
												{
													$('#whitebox-'+currentTheme+'-exit').css(
													{
														'visibility':'visible',
														'opacity':1
													});
												}
											}
											if(data.displayimgnr==='yes')
											{
												var txt="", 
													current=0,
													i=1, 
													total=$currentGroup.size();
												current=0;
												$currentGroup.each(function() 
												{
													if($(this).data('url')===data.url)
													{
														current=i;
													}
													i++;
												});
												txt=data.imgnrtext.replace("X",current).replace("Y",total);


												$('#whitebox-'+currentTheme+'-imgnr-link span').text(txt);
												if(data.btnanimstyle==='fade')
												{
													$('#whitebox-'+currentTheme+'-imgnr').css(
													{
														'visibility':'visible',
														'opacity':0
													}).animate({
														'opacity':1
													}, data.btnanimtime);
												}
												else if(data.btnanimstyle==='none')
												{
													$('#whitebox-'+currentTheme+'-imgnr').css(
													{
														'visibility':'visible',
														'opacity':1
													});
												}
											}
											$('#whitebox-'+currentTheme+'-button-wrapper').css({
												'left':$('#whitebox-'+currentTheme+'-outerbox').css('left'),
												'top':top+"px",
												'width':parseInt($('#whitebox-'+currentTheme+'-outerbox').css('width'),10)+
														parseInt($('#whitebox-'+currentTheme+'-outerbox').css('paddingLeft'),10)+
														parseInt($('#whitebox-'+currentTheme+'-outerbox').css('paddingRight'),10),
												'height':height+"px"
											});	
										}
									});
								}
								if(data.showprevnext!=='no')
								{	
									var left,right,top=(parseInt($('#whitebox-'+currentTheme+'-outerbox').css('top'),10)
												+parseInt($('#whitebox-'+currentTheme+'-outerbox').css('paddingTop'),10)
												+parseInt($('#whitebox-'+currentTheme+'-innerbox').css('paddingTop'),10));

									left=(parseInt($('#whitebox-'+currentTheme+'-outerbox').css('left'),10)
										+parseInt($('#whitebox-'+currentTheme+'-outerbox').css('paddingLeft'),10)
										+parseInt($('#whitebox-'+currentTheme+'-innerbox').css('paddingLeft'),10))+"px";

									right=(parseInt($('#whitebox-'+currentTheme+'-outerbox').css('left'),10)
										+parseInt($('#whitebox-'+currentTheme+'-outerbox').css('paddingLeft'),10)
										+parseInt($('#whitebox-'+currentTheme+'-innerbox').css('paddingLeft'),10)
										+parseInt(imgwidth,10)
										-parseInt(data.prevnextwidth,10))+"px";

									if(data.descpos==='top')
									{
										top+=(textHeight+textPaddingTotal);
									}
									top=top+"px";
									$('#whitebox-'+currentTheme+'-prev, #whitebox-'+currentTheme+'-next').css({
										'height':imgheight,
										'position':'fixed',
										'top':top,
										'left':left
									});
									$('#whitebox-'+currentTheme+'-next').css({
										'left':right
									});
								}
							});	
						});
						$(this).unbind(event);
					});

					$('#whitebox-'+currentTheme+'-img img').css({
						'max-height': maxheight,
						'max-width': maxwidth
					});				
			
					var boxStartHeight=$('#whitebox-'+currentTheme+'-img img').height();
					if(data.animatetextstyle==='fade' && data.descpos!=='bottom-inside' && data.descpos!=='top-inside')
					{
						boxStartHeight=$('#whitebox-'+currentTheme+'-img img').height()+textHeight+textPaddingTotal;
					}
					$('#whitebox-'+currentTheme+'-img').height($('#whitebox-'+currentTheme+'-img img').height());

					if((parseInt(imageLoader.height,10) < imgheight || $('#whitebox-'+currentTheme+'-img img').height()<imgheight) && (data.fixedheight || data.fixedwidth))
					{					
						$('#whitebox-'+currentTheme+'-img img').css(
						{
							'position':'relative',
							'top':(imgheight/2 - $('#whitebox-'+currentTheme+'-img img').height()/2)+"px"
						});
						$('#whitebox-'+currentTheme+'-text-area').css(
						{
							'position':'relative',
							'top':$('#whitebox-'+currentTheme+'-img img').css('top')
						});
					}else
					{
						$('#whitebox-'+currentTheme+'-img img').css(
						{
							'position':'static',
							'top':'auto'
						});
						$('#whitebox-'+currentTheme+'-text-area').css(
						{
							'position':'static',
							'top':'auto'
						});
					}
					var newwidth=$('#whitebox-'+currentTheme+'-img img').width();
					if(data.fixedwidth || data.fixedheight )
					{
						newwidth=imgwidth;
						boxStartHeight=imgheight;
						if(data.showdesc!=='no' && data.animatetextstyle==='fade')
						{
							boxStartHeight+=textHeight+textPaddingTotal;
						}
					}
					$('#whitebox-'+currentTheme+'-innerbox').animate({
						'width':newwidth, 
						'height':boxStartHeight
					},data.animateframetime);
					$('#whitebox-'+currentTheme+'-innerbox').css({
						'height':boxStartHeight
					});				
				}					
				if(data.url==='srcFromClickedImage')
				{
					data.url=$(this).attr('src');
				}
				loadingimg=new Image();
				loadingimg.onload = function(event)
				{
					loadingWidth=loadingimg.width;
					loadingHeight=loadingimg.height;
					imageLoader.src=data.url;

					$('#whitebox-'+currentTheme+'-innerbox').css({
						'background-position':(width/2-10-(loadingWidth/2))+"px "+(height/2 -(loadingHeight/2))+"px"
					});

					$(loadingimg).unbind(event);
				}
				loadingimg.src=data.loadingUrl;
				var textAndImgDiv;

				if(data.descpos==='top')
				{
					textAndImgDiv="<div id='whitebox-"+currentTheme+"-text-area'></div>"+
							"<div id='whitebox-"+currentTheme+"-img'><img style='opacity:0' /></div>";
				}
				else
				{
					textAndImgDiv="<div id='whitebox-"+currentTheme+"-img'><img style='opacity:0' /></div>"+
					"<div id='whitebox-"+currentTheme+"-text-area'></div>";			
				}
				$('body').append($("<div id='whitebox-"+currentTheme+"-wrapper' style='opacity:0; width:100%;height:100%;'>"+
					"<div id='whitebox-"+currentTheme+"-outerbox'>"+
						"<div id='whitebox-"+currentTheme+"-innerbox'>"+
							textAndImgDiv+
						"</div>"+
						"<div id='whitebox-"+currentTheme+"-prev'><span>prev</span></div>"+
						"<div id='whitebox-"+currentTheme+"-next'><span>next</span></div>"+					
					"</div>"+
					"<div id='whitebox-"+currentTheme+"-button-wrapper'>"+
						"<div id='whitebox-"+currentTheme+"-slider'><div id='whitebox-"+currentTheme+"-slider-link'><span>"+data.sliderstoptext+"</span></div></div>"+
						"<div id='whitebox-"+currentTheme+"-exit'><div id='whitebox-"+currentTheme+"-exit-link'><span>"+data.exittext+"</span></div></div>"+
						"<div id='whitebox-"+currentTheme+"-imgnr'><div id='whitebox-"+currentTheme+"-imgnr-link'><span>"+data.imgnrtext+"</span></div></div>"+
					"</div>"+				
					"<div id='whitebox-"+currentTheme+"-bg' style='width:100%;height:100%; '></div>"+
					"<div id='whitebox-"+currentTheme+"-thumbnail-wrapper'><div id='whitebox-"+currentTheme+"-thumbnails'></div></div>"+
				"</div>")
				.animate({
					'opacity': 1
				}, data.starttime));

				$('#whitebox-'+currentTheme+'-bg').click(function (event){	
					closeBox();
				});

				
				$('#whitebox-'+currentTheme+'-slider-link').click(function (event){	
					if(data.autoslide==='yes' && sliding)
					{
						clearTimeout(timer);
						data.autoslide='no';
						sliding=false;
						$('#whitebox-'+currentTheme+'-slider-link span').text(data.sliderstarttext);

					}else{
						clearTimeout(timer);
						data.autoslide='yes';
						sliding=true;
						$('#whitebox-'+currentTheme+'-slider-link span').text(data.sliderstoptext);
						nextBox();
					}
				});
				if(data.group==='groupbyparent' || data.group===undefined)
				{
					console.log('grouped by parent!');
					$currentGroup=$(this).parent().find('.whitebox');
				}else
				{
					console.log('grouped by group: '+data.group);
					$currentGroup=$(".whitebox[data-group='"+data.group+"']");
				}
				if(data.showthumbs!=='no')
				{
					var thumbs="";
					$currentGroup.each(function()
					{
						thumbs+="<div class='whitebox-"+currentTheme+"-thumb'><img width='"+data.thumbsize+"' src='"+$(this).attr('src')+"'/></div>";
					})
					$('#whitebox-'+currentTheme+"-thumbnails").html(thumbs);
					$('.whitebox-'+currentTheme+"-thumb").click(function (event) 
					{
						traverse(false,$('.whitebox-'+currentTheme+"-thumb").index($(this)));
					});
				}

				innerPaddingLeft=$('#whitebox-'+currentTheme+'-innerbox').css('padding-left');
				innerPaddingTop=$('#whitebox-'+currentTheme+'-innerbox').css('padding-top');
				outerPaddingLeft=$('#whitebox-'+currentTheme+'-outerbox').css('padding-left');
				outerPaddingTop=$('#whitebox-'+currentTheme+'-outerbox').css('padding-top');
				totalPaddingLeft=parseInt(innerPaddingLeft,10)+parseInt(outerPaddingLeft,10);
				totalPaddingTop=parseInt(innerPaddingTop,10)+parseInt(outerPaddingTop,10);
				
				textHeight=$('#whitebox-'+currentTheme+'-text-area').height();
				textHeightFromCss=textHeight;
				textPaddingTop=$('#whitebox-'+currentTheme+'-text-area').css('padding-top');
				textPaddingBottom=$('#whitebox-'+currentTheme+'-text-area').css('padding-bottom');
				
				bgcolorCSS=$('#whitebox-'+currentTheme+'-bg').css('backgroundColor');
				bgopacityCSS=$('#whitebox-'+currentTheme+'-bg').css('opacity');

				if(data.animatetextstyle!=='fade')
				{
					$('#whitebox-'+currentTheme+'-text-area').css({
						'paddingTop':0,
						'paddingBottom':0,
						'height':0
					});
				}

				if($(this).data('bgcolor')===undefined)
				{
					data.bgcolor= bgcolorCSS;
				}
				if($(this).data('bgopacity')===undefined)
				{
					data.bgopacity= bgopacityCSS;
				}
				$('#whitebox-'+currentTheme+'-prev').click(function (event){
					prevBox();
				});
				$('#whitebox-'+currentTheme+'-next').click(function (event){
					nextBox();
				});
				$('#whitebox-'+currentTheme+'-img').click(function(event){
					if(data.clickclose!=='yes')
					{
						event.stopPropagation();
					}
					if(data.clicknext==='yes')
					{
						nextBox();
					}
				});
				$('#whitebox-'+currentTheme+'-exit-link').click(function(event){
					closeBox();
				});
				$('#whitebox-'+currentTheme+'-prev').css({
					'width':data.prevnextwidth,	
				});
				$('#whitebox-'+currentTheme+'-next').css({
					'width':data.prevnextwidth,
				});
				$('#whitebox-'+currentTheme+'-wrapper').css({
					'position':'fixed',
					'z-index':'1000',
					'left':'0',
					'top':'0',
					'text-align':'center'
				});		
				$('#whitebox-'+currentTheme+'-bg').css({
					'position':'fixed',
					'backgroundColor':data.bgcolor,
					'z-index':'-2',
					'left':'0',
					'top':'0',
					'text-align':'center'
				});	
				$('#whitebox-'+currentTheme+'-outerbox').css({
					'position':'fixed',
					'left':'0',
					'width':'600px',
					'top':'0',
					'height':'400px'
				});
				$('#whitebox-'+currentTheme+'-innerbox').css({
					'width':600-parseInt(innerPaddingLeft,10)*2,
					'height':400-parseInt(innerPaddingTop,10)*2,
					'background-image':'url('+data.loadingUrl+')',
					'background-repeat':'no-repeat',
					'background-position':(width/2-60)+"px "+(height/2 -50)+"px",
					'background-attachment':'fixed'
				});
				$('#whitebox-'+currentTheme+'-img').css({
					'cursor':'pointer'
				});
				$('#whitebox-'+currentTheme+'-button-wrapper').css({
					'position':'relative',
					'visibility':'hidden',
					'backgroundColor':'rgba(255,0,0,0.5)'
				});
				$('#whitebox-'+currentTheme+'-slider').css({
					'position':'absolute',
					'visibility':'hidden'
				});
				$('#whitebox-'+currentTheme+'-slider-link').css({
					'position':'absolute'
				});
				$('#whitebox-'+currentTheme+'-exit').css({
					'position':'absolute',
					'visibility':'hidden'
				});
				$('#whitebox-'+currentTheme+'-exit-link').css({
					'position':'absolute'
				});
				$('#whitebox-'+currentTheme+'-imgnr').css({
					'position':'absolute',
					'visibility':'hidden'
				});
				$('#whitebox-'+currentTheme+'-imgnr-link').css({
					'position':'absolute'
				});
				$('#whitebox-'+currentTheme+'-thumbnail-wrapper').css({					
					'visibility':'hidden',
					'opacity':0
				});
				$('.whitebox-'+currentTheme+'-thumb').css({					
					'height':$('.whitebox-'+currentTheme+'-thumb img').height()
				});
				$('#whitebox-'+currentTheme+'-outerbox').get(0).style.top=(height/2 - $('#whitebox-'+currentTheme+'-outerbox').height()/2)+"px";
				$('#whitebox-'+currentTheme+'-outerbox').get(0).style.left=(width/2 - $('#whitebox-'+currentTheme+'-outerbox').width()/2)-10+"px";

				window.addEventListener('keyup', function(event)
				{				
					if(data.usekeys!='no')
					{
						if(event.keyCode===27)
						{
							console.log("esc pressed");
							closeBox();
						}
						else if(event.keyCode===37)
						{
							prevBox();
							console.log("left pressed");
						}
						else if(event.keyCode===39)
						{
							nextBox();
							console.log("right pressed");
						}
					}
				},false);
				function nextBox()
				{
					traverse();
				}
				function prevBox()
				{
					traverse(true);
				}
				function traverse(reverse, index)
				{
					var $find, $parent, found, next, $selection,i;
					i=0;
					found=false;
					next=false;
					$('#whitebox-'+currentTheme+'-next, #whitebox-'+currentTheme+'-prev, #whitebox-'+currentTheme+'-slider, #whitebox-'+currentTheme+'-exit, #whitebox-'+currentTheme+'-imgnr').css({
						'visibility':'hidden'
					});
					clearTimeout(timer);
					if(!animating)
					{
						animating=true;
						$('#whitebox-'+currentTheme+'-img img').css({'opacity':0});
						$selection=$currentGroup;
						
						found=false;
						next=false;
						if(reverse)
						{
							$selection.reverse();
						}
						$selection.each(function()
						{
							if(index===i)
							{
								found=true;
								$find=$(this);
							}
							else if(next)
							{
								$find=$(this);
								next=false;
							}
							if($(this).data('url') === data.url && !found && index===undefined)
							{
								found=true;
								next=true;
							}
							i++;
						});
						if(next)
						{
							$find=$selection.first();
						}
						if(reverse)
						{
							$selection.reverse();
						}
						var $wb=$find;
						data=$.extend({}, $.fn.whitebox.defaults, $wb.data());
						altText=$wb.attr('alt');

						if($wb.data('bgcolor')===undefined)
						{
							data.bgcolor= bgcolorCSS;
						}
						if($wb.data('bgopacity')===undefined)
						{
							data.bgopacity= bgopacityCSS;
						}

						$('#whitebox-'+currentTheme+'-bg').css({
							'backgroundColor':data.bgcolor,
							'opacity':data.bgopacity
						});
						if(data.animatetextstyle!=='fade')
						{
							$('#whitebox-'+currentTheme+'-text-area').css({
								'paddingTop':0,
								'paddingBottom':0,
								'height':0
							});
						}
						if(data.descpos==='top')
						{
							var img,text;
							img=$('#whitebox-'+currentTheme+'-img')[0].outerHTML;
							text=$('#whitebox-'+currentTheme+'-text-area')[0].outerHTML;
							$('#whitebox-'+currentTheme+'-innerbox').html("");
							$('#whitebox-'+currentTheme+'-innerbox').append(text+img);
						}else
						{
							var img,text;
							img=$('#whitebox-'+currentTheme+'-img')[0].outerHTML;
							text=$('#whitebox-'+currentTheme+'-text-area')[0].outerHTML;
							$('#whitebox-'+currentTheme+'-innerbox').html("");
							$('#whitebox-'+currentTheme+'-innerbox').append(img+text);
						}
						$('#whitebox-'+currentTheme+'-img').click(function(event){
							if(data.clickclose!=='yes')
							{
								event.stopPropagation();
							}
							if(data.clicknext==='yes')
							{
								nextBox();
							}
						});
						imageLoader.src=data.url;
					}
				}
				function closeBox()
				{
					clearTimeout(timer);
					if(data.fadeout==='yes')
					{
						$('#whitebox-'+currentTheme+'-wrapper').fadeOut(data.closetime, function(){
							$('#whitebox-'+currentTheme+'-wrapper').remove();
						});
					}else
						$('#whitebox-'+currentTheme+'-wrapper').remove();
				}
			});
		}
		$.fn.whitebox.defaults={
			'url':'srcFromClickedImage',
			'loadingUrl':'img/loading-white.gif',
			'bgcolor':'#000',
			'bgopacity':0.5,
			'starttime':300,
			'alt':undefined,
			'animateimgtime':300,
			'animateframetime':300,
			'animatetexttime':300,
			'closetime':300,
			'btnanimtime':300,
			'slidetimer':3500,
			'animatetextstyle':'fade',
			'btnanimstyle':'fade',
			'maxheight':'auto',
			'maxwidth':'auto',
			'group':'groupbyparent',
			'usekeys':'yes',
			'usealt':'yes',
			'showdesc':'yes',
			'clicknext':'yes',
			'clickclose':'no',
			'descpos':'bottom',	
			'autoslide':'yes',
			'sliderbtn':'yes',
			'fadeout':'yes',
			'exitbtn':'yes',
			'displayimgnr':'yes',
			'exittext':'X',		
			'sliderstarttext':'Start slideshow',
			'sliderstoptext':'Stop slideshow',
			'imgnrtext':'Image X of Y',
			'prevnextwidth':'100px',
			'theme':'default',
			'fixedheight':false,
			'fixedwidth':false,
			'showthumbs':'no',
			'thumbsize':'50px'
		}
	})(jQuery);
	$('.whitebox').css({
		'cursor':'pointer'
	});
	$('.whitebox').click(function()
	{	
		$(this).whitebox($(this).data());
	});
});