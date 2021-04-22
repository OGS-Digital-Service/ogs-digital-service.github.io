/**************************************************
Trivantis (http://www.trivantis.com)
**************************************************/

var ocmOrig = getDisplayDocument().oncontextmenu
var ocmNone = new Function( "return false" )

// Media Object
function ObjMedia(n,a,x,y,w,h,v,z,m,l,p,rol,sPlay,eKey,vol,c,d,fb,cl) {
  this.name = n
  this.altName = a;
  this.source= ' SRC="'+m+'"'
  this.src = m;
  this.x = x;
  this.origX = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.oh = h;
  this.ow = w;
  this.bControl = c?true:false;
  //LD-3289: iOS: due to native controls need to switch bControl values for MEJS for no-skin
  if(!this.bControl && is.iOS && this.name.indexOf("audio")>=0)
	  this.bControl = true;
	this.bFixedPosition = false;
	this.bNeedPool = false;
  this.isPlaying = false;
  this.bRollControl = rol?false:true;
  this.bSinglePlay= sPlay?true:false;
  this.bEnableKeys = eKey?true:false;
  this.v = v
  this.z = z
  this.initVol = vol;
  this.bAutoStart = p?true:false;
  this.hasOnUp = false
  this.hasOnRUp = false
  this.obj = this.name+"Object"
  this.parmArray = new Array
  this.numParms = 0
  this.bLoop = l?true:false;
  this.bHasCaption = false;
  if( l ) this.loopString = ' LOOP="TRUE"'
  else this.loopString = ' LOOP="FALSE"'
  this.embed=''
  this.alreadyActioned = false;
  eval(this.obj+"=this")
  if ( d != 'undefined' && d!=null )
    this.divTag = d;
  else  
    this.divTag = "div";
    
  this.mediaType = '';
  this.mediaPlayer = null;
  this.mediaOptions = null;
  this.playerOptions = null;
  this.mediaElement = null;
  this.bMediaEle = false;
  this.capFile = [];
  this.capLang = []; 
  this.mediaSkin = null;
  this.arrMediaSkinFiles = new Array;
  this.arrEvents = new Array
    
  this.childArray = new Array  
  this.addClasses = cl;
  this.bOffPage = false;
  this.bBottom = fb?true:false;
  this.bBkAudio = this.name.indexOf("BkAudio")>-1?true:false;
  this.bInherited = false;
  this.bAllowAutoStart = true;
}

function ObjMediaBuildMediaString(){
  var autoStr=''
  var contStr=''
  var scaleStr=''
  var pluginType = ''
  var width=this.w
  var height=this.h
  var addIEheight=20
  this.isPlaying = this.bAutoStart;
  if( this.isPlaying ) autoStr = ' AUTOSTART="TRUE"'
  else autoStr = ' AUTOSTART="FALSE"'
    
  if(!this.MEJSMedia())
	{
	  if(this.source.indexOf(".mov") >= 0)
	  {
		this.mediaType = 'quick';
		pluginType = 'type=video/x-mov';
		if( this.c == 0) height += addIEheight;
		scaleStr=' scale="tofit"';
	  }
	  else if ( this.source.indexOf(".mp") >= 0 ) 
	  {
		if( this.c )
		  contStr += ' ShowControls="TRUE"'
		else
		  contStr += ' ShowControls="FALSE"'
	  }
	  else if(this.source.indexOf(".wav") >= 0)
	  {
		this.mediaType = 'media'
		if( !is.ns ) {
		  if( this.c ) {
			contStr += ' ShowControls="TRUE"'
			height += addIEheight
		  }
		  else contStr += ' ShowControls="FALSE"'
		}
	  }
	  else if( this.source.indexOf(".avi") >= 0 || this.source.indexOf(".wmv") >= 0 || this.source.indexOf(".asf") >= 0 ) 
	  {
		this.mediaType = 'media'
		if( !is.ns ) {
		  if( this.c ) {
			contStr += ' ShowControls="TRUE"'
			height += addIEheight
		  }
		  else contStr += ' ShowControls="FALSE"'
		}
	  }
	  else if( this.source.indexOf(".wma") >= 0 )  
		  this.mediaType = 'media';
	  else if( this.c ) 
	  {
		this.mediaType = 'quick'
		if( is.ns ) 
		{
		  var plugin = "audio/x-mpeg\""
		  var mimeType = eval( "navigator.mimeTypes[\"" + plugin + "]")
		  if( mimeType && (!mimeType.enabledPlugin || mimeType.enabledPlugin.name.indexOf( "QuickTime" ) < 0) ) {
			width = 145
			height = 60
		  }
		}
		else if( is.ieMac ) 
		  height -= 10;
		  if( !is.ns )
			 height += addIEheight;
	  }
	  else if( this.source.indexOf(".rm") >= 0 || this.source.indexOf(".ram") >= 0 ) 
	  {
		  this.mediaType = 'real'
		if( this.name.indexOf("video") >= 0 ) 
		{
		 contStr += ' controls="ImageWindow'
		 if( this.c ) contStr+=',ControlPanel'
		 contStr += '"'
		} else if ( this.c ) contStr=' controls="ControlPanel"'
	  }
	  
	  this.embed = '<EMBED' +this.source+contStr;
	  this.embed += ' WIDTH=' + width + ' HEIGHT=' + height ;
	  this.embed += ' NAME=' + this.name;
	  this.embed += autoStr+scaleStr+this.loopString+pluginType+'>\n';
  }
  else //If it not any of the cases above we can assume it is media element compatible
  {
	  var THIS=this;  
	  //Setup the Media Element options
	  var capSelection = -1;
	  if(typeof (window.VarTrivSelCap) == "object")
	  {
		  var capSel = window.VarTrivSelCap.getValue();
		  for (var i = 0; i < this.capLang.length; i++)
		  {
			 if( capSel == this.capLang[i])
			 {
				capSelection  = i;
				break;
			}
		  }
	  }	

	  var plugVars = ["smoothing=true"];
	  if(this.source.indexOf(".m4a") >=0)
	  	plugVars = ["smoothing=true", "isvideo=true"]

	  this.mediaOptions = { 
			enablePluginDebug: false, 
			plugins: ['flash','youtube','vimeo'], 
			type: '', 
			pluginPath: 'MediaPlayer/', 
			flashName: 'flashmediaelement.swf',
			defaultVideoWidth: 480, 
			defaultVideoHeight: 270, 
			pluginWidth: -1, 
			pluginHeight: -1, 
			timerRate: 250, 
			bAutoPlay: this.bAllowAutoStart?this.bAutoStart:false, 
			pluginVars: plugVars ,
			// fires when a problem is detected
			error: function (){ console.log( "error creating media element" );}};
		
		


		this.playerOptions = { 
				enablePluginDebug: false, 
				plugins: ['flash','youtube','vimeo'], 
				type: '', 
				pluginPath: 'MediaPlayer/', 
				flashName: 'flashmediaelement.swf',
				flashStreamer : "",
				pluginWidth: -1, 
				pluginHeight: -1, 
				timerRate: 250, 
				bAutoPlay: this.bAllowAutoStart?this.bAutoStart:false, 
				pluginVars: plugVars,
				enablePluginSmoothing : true,
				hideVolumeOnTouchDevices : false,
				audioVolume : 'vertical',
				defaultVideoWidth: 480, 
				defaultVideoHeight: 270, 
				videoWidth: -1, 
				videoHeight: -1, 
				audioWidth: this.w, 
				audioHeight: this.h, 
				startVolume: this.initVol,
				loop: this.bLoop, 
				enableAutosize: false, 
				features: (!this.bControl)?['tracks']:['playpause','progress','current','duration','tracks','volume','fullscreen'], 
				alwaysShowControls: this.bRollControl, 
				hideVideoControlsOnLoad: this.bRollControl,
				iPadUseNativeControls: false, 
				iPhoneUseNativeControls: false, 
				AndroidUseNativeControls: false, 
				alwaysShowHours: false, 
				showTimecodeFrameCount: false, 
				framesPerSecond: 25,
				enableKeyboard: this.bEnableKeys, 
				pauseOtherPlayers: this.bSinglePlay, 
				keyActions: [], 
				startLanguage:((capSelection == -1)?'none':this.capLang[capSelection]),
				translationSelector:((this.capFile.length>1)?true:false),
				toggleCaptionsButtonWhenOnlyOne:true,
				success:function(mediaElem, domObj){
								
					THIS.mePlayer = mediaElem;

					//Youtube videos dont have mediaElement.player so we get it from domObject instead
					if(!mediaElem.player)
						mediaElem.player = domObj.player;

					if (THIS.bAutoPlay || THIS.mePlayerDoPlay)
					{
						THIS.mePlayerDoPlay = n;
						THIS.play();
					}

					triv$(mediaElem).bind('ended', function()
					{
						if(THIS.onDone)
							THIS.onDone();
						if(THIS.bLoop)
							THIS.play();
					});

					THIS.initEvent(mediaElem);

					triv$(".mejs__overlay-button,.mejs__overlay-loading", THIS.div).css({
                    'display': 'none'
					});

					
					triv$(".mejs__overlay-button,.mejs__overlay-play", THIS.div).css({
                    'display': 'block'
                	});			


					if(mediaElem.player){
						
						if(THIS.bHasCaption && mediaElem.player.captionsButton)
						{
							mediaElem.player.captionsButton.addEventListener( 'click' , function () {
								if( THIS.mePlayer.player.selectedTrack === null)
								{
									if(typeof (getDisplayWindow().VarTrivSelCap) == "object")	
										VarTrivSelCap.set("none");
								}
								else (THIS.mePlayer.player.selectedTrack)
								{
									VarTrivSelCap.set(THIS.mePlayer.player.selectedTrack.srclang);
								}
							})
						}

						/*if(THIS.bHasCaption){ //repeating this in publish because audio/snd html is already set when this is called in wndObjDesignTime
								$(".mejs-captions-position,mejs-captions-position-hover" , THIS.div).css({'bottom' : THIS.h - 6 + 'px'});
						}*/


						if(!THIS.bRollControl)
							triv$(".mejs__controls", THIS.div).css('bottom', '0px');				

						if (mediaElem.player)
							mediaElem.player.load();
						else if(THIS.mediaPlayer)
							THIS.mediaPlayer.load();
						//LO-2823 this was only being called by mediaelement player on play event before so fullscreen prior to playing breaks
						if (mediaElem.player)
							mediaElem.player.detectFullscreenMode();

						//override enterFullScreen and exitFullScreen methods in media-element-and-player.js
						var meFS = mediaElem.player.enterFullScreen;
						var meExitFS = mediaElem.player.exitFullScreen;

						mediaElem.player.enterFullScreen = function(){
							meFS.call(this);

							var pageDivFunc = function() {
								var page = GetCurrentPageDiv();
								if(page && !is.isMobile.any())
								{
									page.style.clip = "auto";
									page.style.width = "100%";
									page.style.height = "100%";	
									THIS.normalLeft = page.style.left;	
									page.style.left = "0px";
									THIS.transformScale = page.style.transform;
								}
							}

							setTimeout( pageDivFunc , 500);
							
							if(this.container )
							{
								var containerVar = triv$(this.container);
								if( containerVar.length > 0 && !is.iOS )
									containerVar[0].parentNode.style.zIndex = "9001";
							}
							THIS.isFullScreen = true;
							if(!is.iOS && !is.safari){
								this.fixForFullScreenPos = triv$(this.container).find('.mejs__controls').css('bottom');
								triv$(this.container).find('.mejs__controls').css('bottom', '0px');
							}
						};

						mediaElem.player.exitFullScreen = function(){
							if(THIS.isFullScreen)
							{
								meExitFS.call(this);
								THIS.isFullScreen = false;

							var page = GetCurrentPageDiv();
							if(page)
							{
								page.style.clip = "";
								page.style.width = "";
								page.style.height = "";	
								page.style.left = THIS.normalLeft;
								page.style.transform = THIS.transformScale;
							}
							
							if(this.container)
							{
								var containerVar = triv$(this.container);
								if(containerVar.length > 0)
									containerVar[0].parentNode.style.zIndex = "";
							}
								

								if(!is.iOS && !is.safari){
									triv$(this.container).find('.mejs__controls').css('bottom', this.fixForFullScreenPos);
								}
								rebuildLayout();
							}
						};

						var duration = null;
						mediaElem.addEventListener('timeupdate',function() {
							if (duration !== THIS.duration) {
								try{ 
									duration = this.duration;
									mejs.Utils.calculateTimeFormat(duration, mediaElem.player.options, mediaElem.player.options.framesPerSecond || 25);
									mediaElem.player.setControlsSize();
									}
									catch (e)
									{
										console.log("Error" + e);
									}
							}
						}, false);

						mediaElem.addEventListener('play', function(e) {
							triv$('.mejs-overlay-loading', THIS.div).parent().hide();
							triv$('.mejs-overlay-button', THIS.div).show();
						}, false);

						if(is.ie9)
						{
							THIS.mePlayer.setVideoSize(this.w, this.h);
						}
					}

					if(this.startLanguage === "en")
					{
						THIS.mePlayer.player.setTrack( THIS.mePlayer.player.tracks[0].trackId , true)
					}

					if(THIS.successCallout)
					{
						THIS.successCallout ( THIS.mePlayer )
					}
					else
					{
						setTimeout (function () {
							if(THIS.successCallout)
								THIS.successCallout(THIS.mePlayer)
						} , 1000);
					}
					
					
				},
				error: function (){ 
					console.log( "error creating media element player" );
					}
				};			 
						
	this.bMediaEle = true;
  }  
}

function ObjMediaActionGoTo( destURL, destFrame ) {
  this.objLyr.actionGoTo( destURL, destFrame );
}

function ObjMediaAddParm( newParm ) {
  this.parmArray[this.numParms++] = newParm;
}

function ObjMediaActionGoToNewWindow( destURL, name, props ) {
  this.objLyr.actionGoToNewWindow( destURL, name, props );
}

function ObjMediaActionPlay( ) 
{
	if(this.bMediaEle)
	{
		if(this.mePlayer)
		{
			if(this.checkMediaLoad()){
				if(this.mePlayer.play)
					this.mePlayer.play();
				else if (this.mePlayer.player && this.mePlayer.player.play && !this.isPlaying)
					this.mePlayer.player.play();

				this.isPlaying = true;
			}
			else
			{
				var THIS = this;
				setTimeout(function(){THIS.actionPlay()}, 500);
			}
		}
		
	}
	else
	{
		if(this.mediaType == '')
			this.setType();
		if( this.mediaType == 'real')
			eval("getDisplayDocument()."+this.name+".DoPlayPause()");
		else if( this.mediaType == 'quick')
			eval("getDisplayDocument()."+this.name+".Play()");
		else if( this.mediaType == 'media' ) 
		{
			if( is.ieAny ) 
			  eval("getDisplayDocument()."+this.name+".play()");
			else if( is.ns )
			  eval("getDisplayDocument()."+this.name+".controls.play()");
		}
		else if(this.mediaType == 'wav')
		{
			if(!is.ie && !is.ie11)
			{
				var media = getHTMLEleByID(this.name+'Media');
				if(media)
				  media.play();
			}
			else
			{
				this.bAutoStart = true;
				this.BuildMediaString();
				this.objLyr.write( this.embed );  
			}
		}
		else 
		{  
			this.bAutoStart = true;
			this.BuildMediaString();
			this.objLyr.write( this.embed );
		}
		this.isPlaying = true; 
	}
}

function ObjMediaActionStop( ) 
{
	if(this.bMediaEle)
	{
		if(this.mePlayer)
		{
			if(this.checkMediaLoad())
			{
				if( typeof(this.mePlayer.player)!='undefined' && !this.mePlayer.player.media.paused)
				{
					if(this.mePlayer.pause)
						this.mePlayer.pause();
					else if (this.mePlayer.player && this.mePlayer.player.pause)
						this.mePlayer.player.pause();

					if(this.mePlayer.setCurrentTime)
						this.mePlayer.setCurrentTime(0);
					else if(this.mePlayer.player && this.mePlayer.player.setCurrentTime)
						this.mePlayer.player.setCurrentTime(0);
					if(	this.mePlayer.player)
					{
						this.mePlayer.player.pause(); //LD-3133
						//LD-3152
						//******
						this.mePlayer.player.setCurrentRail();
						this.mePlayer.player.updateCurrent();
						//******
					}
				}
				else if(this.mePlayer)
				{
					if(this.mePlayer.pause)
						this.mePlayer.pause();
					else if (this.mePlayer.player && this.mePlayer.player.pause)
						this.mePlayer.player.pause();
				}
			}
			else
			{
				var THIS = this;
				setTimeout(function(){THIS.actionStop()}, 500);
			}
		}
	}
	else
	{
		this.bAutoStart = false;
		this.BuildMediaString();
		this.objLyr.write( this.embed );
	}
	this.isPlaying = false;
}

function ObjMediaActionPause( ) 
{
	if(this.bMediaEle)
	{
		if(this.mePlayer)
		{
			if(this.checkMediaLoad())
			{
				if(this.mePlayer.pause)
					this.mePlayer.pause();
				else if (this.mePlayer.player && this.mePlayer.player.pause)
					this.mePlayer.player.pause();
			}
			else
			{
				var THIS = this;
				setTimeout(function(){THIS.actionPause()}, 500);
			}
		}
	}
	else
	{
		if( this.mediaType == '')
			this.setType();
		  if( this.mediaType == 'real')
			eval("getDisplayDocument()."+this.name+".DoPause()");
		  else if( this.mediaType == 'quick')
			eval("getDisplayDocument()."+this.name+".Stop()");
		  else if(this.mediaType == 'wav')
		  {
			  if(!is.ie && !is.ie11)
			  {
				  var media = getHTMLEleByID(this.name+'Media');
				  if(media)
					  media.pause();
			  }
			  else
			  {
				this.BuildMediaString( false );
				this.objLyr.write( this.embed );  
			  }
		  }
		  else if( this.mediaType == 'media' ) {
			if( is.ieAny ) 
			  eval("getDisplayDocument()."+this.name+".pause()");
			else if( is.ns )
			  eval("getDisplayDocument()."+this.name+".controls.pause()");
		  }
		  else {  
			this.bAutoStart = false;
			this.BuildMediaString( false );
			this.objLyr.write( this.embed );
		  }	  
	}
	this.isPlaying = false;
}


function ObjMediaActionShow( ) {
  if( !this.isVisible() )
    this.onShow();
}

function ObjMediaActionHide( ) {
  if( this.isVisible() )
    this.onHide();
}

function ObjMediaActionLaunch( ) {
  this.objLyr.actionLaunch();
}

function ObjMediaActionExit( ) {
  this.objLyr.actionExit();
}

function ObjMediaActionChangeContents( newMedia ) {
	if (newMedia != null)
	{
		this.source = ' SRC="' +newMedia +'"';
		this.src = newMedia;
	}

	if(this.bMediaEle && newMedia != null)
	{
		if(this.mediaPlayer)
		{
			//LD-3239 
			if(this.checkMediaLoad())
			{
				this.mediaPlayer.setSrc(newMedia);
				this.mediaPlayer.load();
			}
			else
			{
				var THIS = this;
				setTimeout(function(){THIS.actionChangeContents(newMedia)}, 500);
			}
		}
	}
	else
	{
		this.bAutoStart = false;
		this.BuildMediaString();
		if( is.ns5 ) this.objLyr.ele.innerHTML=this.embed
		else this.objLyr.write( this.embed );
	}
}

function ObjMediaActionTogglePlay( ) {
	  if(this.bMediaEle)
	  	this.isPlaying = !this.mePlayer.player.media.paused;
	
	if(this.isPlaying == false)
		this.actionPlay();
	else
		this.actionPause(); 
}

function ObjMediaActionToggleShow( ) {
  if( ( is.ie && this.v ) || ( !is.ie && this.objLyr.isVisible() && !this.objLyr.bInTrans ) ) {this.actionHide(); this.mediaPlayer.player.hideControls(false, true);}
  else this.actionShow();
}

function ObjMediaSizeTo( w, h ) {
	this.w = w;
	this.h = h;
    if(!this.bMediaEle)
	{
		this.actionChangeContents();
	}
	else
	{
		var div = getHTMLEleByID(this.name);
		if(div)
		{
			div.style.width = this.w+'px';
			div.style.height = this.h+'px';
		
			if(this.mediaPlayer)
			{
				
				var vidobj = this.div.getElementsByTagName('video')[0];
				if(vidobj)
				{
					vidobj.width = w;
					vidobj.height = h;
					vidobj.style.width = w + 'px';
					vidobj.style.height = h + 'px';
				}

				if(typeof(this.mediaPlayer.setPlayerSize) != 'undefined')
					this.mediaPlayer.setPlayerSize(this.w,this.h);
				if(typeof(this.mediaPlayer.player.setPlayerSize) != 'undefined')
					this.mediaPlayer.player.setPlayerSize(this.w,this.h);
				if(typeof(this.mediaPlayer.setVideoSize) != 'undefined')
					this.mediaPlayer.setVideoSize(this.w, this.h);
				if(typeof(this.mediaPlayer.player.media.setVideoSize) != 'undefined')
					this.mediaPlayer.player.media.setVideoSize(this.w, this.h);
				if(typeof(this.mediaPlayer.setControlsSize) != 'undefined')
					this.mediaPlayer.setControlsSize();
				if(typeof(this.mediaPlayer.player.setControlsSize) != 'undefined')
					this.mediaPlayer.player.setControlsSize();
			}
		}		
	}
}

{ //Setup prototypes
var p=ObjMedia.prototype
p.BuildMediaString = ObjMediaBuildMediaString
p.addParm = ObjMediaAddParm
p.build = ObjMediaBuild
p.init = ObjMediaInit
p.activate = ObjMediaActivate
p.capture = 0
p.up = ObjMediaUp
p.down = ObjMediaDown
p.over = ObjMediaOver
p.out = ObjMediaOut
p.onOver = new Function()
p.onOut = new Function()
p.onSelect = new Function()
p.onDown = new Function()
p.onUp = new Function()
p.onRUp = new Function()
p.actionGoTo = ObjMediaActionGoTo
p.actionGoToNewWindow = ObjMediaActionGoToNewWindow
p.actionPlay = ObjMediaActionPlay
p.actionStop = ObjMediaActionStop
p.actionShow = ObjMediaActionShow
p.actionHide = ObjMediaActionHide
p.actionLaunch = ObjMediaActionLaunch
p.actionExit = ObjMediaActionExit
p.actionChangeContents = ObjMediaActionChangeContents
p.actionTogglePlay = ObjMediaActionTogglePlay
p.actionToggleShow = ObjMediaActionToggleShow
p.writeLayer = ObjMediaWriteLayer
p.onShow = ObjMediaOnShow
p.onHide = ObjMediaOnHide
p.addFlashParams = ObjMediaFlashParams
p.addCaption = ObjMediaCaptionFile
p.isVisible = ObjMediaIsVisible
p.sizeTo    = ObjMediaSizeTo
p.onSelChg = new Function()
p.actionPause = ObjMediaActionPause
p.addSkin = ObjMediaPlayerSkin
p.loadProps = ObjLoadProps
p.respChanges = ObjRespChanges
p.setType = ObjSetMediaType
p.validateSrc = ObjMediaValidSource
p.checkMediaLoad = ObjMediaCheckPlayerLoad
p.MEJSMedia = ObjMediaMEJSPlayable
p.isVideo = ObjMediaIsVideo
p.isAudio = ObjMediaIsAudio
p.getSource = ObjMediaGetSource
p.getTrackTime = ObjMediaGetTrackTime
p.setTrackTime = ObjMediaSetTrackTime
p.refresh = ObjMediaRefresh
p.getPreloadString = ObjMediaGetPreloadString
p.getCSS = ObjMediaGetCSS
p.rv = ObjMediaRV
p.rebuildMediaPlayer = ObjMediaRebuildPlayer
p.removeAllMediaListeners = ObjMediaRemoveListeners
p.createMEPlayer = ObjMediaCreateMEPlayer
p.getMePlayerCreator = ObjMediaGetMEPlayerCreator

p.actionMute = function(){
	if(this.mediaPlayer.setMuted)
		this.mediaPlayer.setMuted(true);
	else if(this.mePlayer.setMuted)
		this.mePlayer.setMuted(true);
};

p.actionUnmute = function(){
	if(this.mediaPlayer.setMuted)
		this.mediaPlayer.setMuted(false);
	else if(this.mePlayer.setMuted)
		this.mePlayer.setMuted(false);
};

p.initEvent = function(mediaElement){
	var THIS = this;
	if(mediaElement)
	{
		setTimeout(function(){
			
			mediaElement.addEventListener("timeupdate",
				function (e)
				{
					for (var i=0; i < THIS.arrEvents.length; i++)
					{

						if (!(THIS && mediaElement))
							return;

						var trivEvent = THIS.arrEvents[i];

						if (!trivEvent.proc && !mediaElement.paused &&
							mediaElement.currentTime >= trivEvent.time &&
							mediaElement.currentTime <= mediaElement.duration)
						{
							trivEvent.proc = true;
							window[trivEvent.func]();
						}
					}
					if (!(THIS && THIS.clearEventsFlag))
							return;
					THIS.clearEventsFlag(mediaElement.currentTime)
				},	false);
			mediaElement.addEventListener("ended",
				function (e){
					//console.log("ended");
					THIS.clearEventsFlag(-1)
					try{
						var onDoneFunc = eval( THIS.name + 'onDone' );
						onDoneFunc(THIS)
					}catch(e){}
				},	false
			);
		},125);
	}		
};

p.clearEventsFlag = function(pos){
    for (var i = 0; i < this.arrEvents.length; i++) 
	{
		var ev = this.arrEvents[i];
        if (ev.proc && pos < ev.time)
            ev.proc = false;
    }
};

p.addEvent = function(time, fn){
    var TrivEvent = new Object();
    TrivEvent.time = time;
    TrivEvent.func = fn;
    TrivEvent.proc = false;
    this.arrEvents[this.arrEvents.length] = TrivEvent;
};

}

function ObjMediaBuild() 
{
  this.loadProps();
    
  this.css = this.getCSS();
  
  this.bInherited = checkObjectInheritance(this);
  if(this.bInherited)
	  return;
  
  this.div = '<' + this.divTag + ' id="'+this.name+'"'
  if( this.addClasses ) this.div += ' class="'+this.addClasses+'"'
  if( this.altName ) this.div += ' alt="' + this.altName + '"'
  this.div += '>';
  this.divInt = "";
   
  if(!this.bMediaEle)
  {
	var bSupportedMedia = isSupportedFormat(this);
	//We check for 'Audio' in case this is a Audio button or image. If it is, the warning icon is taken care of
	//in ObjButtonBuild in trivantis-button.js
	if(!bSupportedMedia && (typeof bTrivRunView !== 'undefined' && bTrivRunView) && this.name.indexOf('Audio') == -1){
		this.embed = '<img src="images/warn.jpg" onClick="alert(\'' + this.bUnsuppStr + '\')" style="cursor:pointer;width:16px;height:16px;" />' + this.embed;
	}
	  this.div+= '<a name="'+this.name+'anc"'
	  if( this.w ) this.div += ' href="javascript:' +this.name+ '.onUp()"'
	  this.div += '></a>'
	  this.divInt += this.embed;
 
  }
  else
  {
	  if(this.isVideo())
	  {
		  var bSupportedMedia = isSupportedFormat(this);
		  if(!bSupportedMedia && (typeof bTrivRunView !== 'undefined' && bTrivRunView)){
			this.divInt += '<img src="images/warn.jpg" onClick="alert(\'' + this.bUnsuppStr + '\')" style="cursor:pointer;width:16px;height:16px;" />';
		  }
		  //LD-3943 -- Updated
		 //LD-5928 force transform scale to 1 for video as it causes issues with rollover when it is above 1 - the size of mediaElement is the one that is respected anyway
	      this.divInt += '<video style=transform:scale(1); width=\'' + this.w + 'px\' height=\'' + this.h + 'px\' ' + (this.bControl ? "controls=\"controls\"" : "") + ' id=\'' + this.name + 'Media\' name=\'' + this.name + 'Media\' ' + ((this.bAutoStart && this.bAllowAutoStart) ? "autoplay=\"autoplay\"" : "") + (is.iOS?' playsinline':' webkit-playsinline')+(this.altName ?  ' alt="' + this.altName + '"' : "") +    '>';
		  
		  if(this.source.indexOf(".mp4") >=0 || this.source.indexOf(".mpd") >=0 || this.source.indexOf(".m3u8") >=0){
			this.divInt += '<source  ' + 
							(/\.mp4$/.test(this.source) ? 'type="video/mp4"' : '') + // only add source type if it ends with mp4
							' src="'+this.src+'"/>';
			bSupportedMedia = true;
		  }
		  else if(this.source.indexOf(".m4v") >=0)
			this.divInt += '<source  type="video/x-m4v" src="'+this.src+'"/>';
		  else if(this.source.indexOf("youtube") >=0 || this.source.indexOf("yout.ube") >=0) //Experimental might want to backout
			this.divInt += '<source  type="video/youtube" src="'+this.src+'"/>';
		  else if(this.source.indexOf(".flv") >=0)
			this.divInt += '<source  type="video/flv" src="'+this.src+'"/>';
		  else if(this.source.indexOf(".f4v") >=0)
			this.divInt += '<source  type="video/flv" src="'+this.src+'"/>';
		  else if(this.source.indexOf(".wmv") >=0)
			this.divInt += '<source  type="video/wmv" src="'+this.src+'"/>';
		  else if( this.flashParam )
		  {
			  this.divInt += '<object width=\''+this.w+'px\' height=\''+this.h+'px\' type="application/x-shockwave-flash" data="mediaFiles/flashmediaelement.swf">';
			  this.divInt += '<param name="movie" value="mediaFiles/flashmediaelement.swf"/>'
			  this.divInt += '<param name="flashvars" value="'+this.flashParam+'"/>'
			  this.divInt += '</object>'
		  }
		  else
		  	this.divInt += '<source  type="application/x-mpegURL" src="'+this.src+'"/>';

	  }
	  else if(this.isAudio())
	  {
		  this.divInt = '<audio width=\''+this.w+'px\' height=\''+this.h+'px\' '+(this.bControl?"controls=\"controls\"":"")+' id=\''+this.name+'Media\' name=\''+this.name+'Media\' '+(this.bAutoStart?"autoplay=\"autoplay\"":"") + (this.altName ?  ' alt="' + this.altName + '"' : "" ) + '>';
		  if(this.source.indexOf(".mp3") >=0 || this.source.indexOf(".mpd") >=0 || this.source.indexOf(".m3u8") >=0)
			this.divInt += '<source  ' + 
							(/\.mp3$/.test(this.source) ? 'type="audio/mp3"' : '') + // only add source type if it ends with mp3
							' src="'+this.src+'"/>';
		  else if(this.source.indexOf(".m4a") >=0)//LD-3221
			this.divInt += '<source  type="audio/mp4" src="'+this.src+'"/>';
		  else if(this.source.indexOf(".mp4") >=0)
			this.divInt += '<source  type="audio/mp4" src="'+this.src+'"/>';
		  else if(this.source.indexOf(".wav") >=0)
			this.divInt += '<source  type="audio/wav" src="'+this.src+'"/>';
		  else
		  {
			  this.divInt += '<object width=\''+this.w+'px\' height=\''+this.h+'px\' type="application/x-shockwave-flash" data="mediaFiles/flashmediaelement.swf">';
			  this.divInt += '<param name="movie" value="mediaFiles/flashmediaelement.swf"/>'
			  this.divInt += '<param name="flashvars" value="'+this.flashParam+'"/>'
			  this.divInt += '</object>'
		  }	
	  }
	  else
		  alert("Unknown media format");
	  
	  if(this.bHasCaption)
	  {
		  for(var index = 0; index < this.capFile.length; index++)
		  {
			  this.divInt+= '<track kind="subtitles" src="'+this.capFile[index]+'" srclang="'+this.capLang[index]+'" />'
		  }
	  }
	 
	 if(this.isVideo())
		   this.divInt += '</video>';
	 else if(this.isAudio())
			this.divInt+= '</audio>';
  }
  this.div +=  '</' + this.divTag + '>\n';
  
  this.div = CreateHTMLElementFromString(this.div);
}

function ObjMediaInit() {
  this.objLyr = new ObjLayer(this.name, null, null, this.div)
  if(!isSinglePagePlayerAvail() && !window.bTrivResponsive) adjustForFixedPositon(this);
}

function ObjMediaActivate() {
  if(this.objLyr && this.objLyr.styObj && !this.alreadyActioned )
	if( this.v ) 
		this.actionShow()
  if(!this.bMediaEle)
  {
	  if(!this.bInherited)
	  {
			if( this.capture & 4 ) 
			{
				this.objLyr.ele.onmousedown = new Function("event", this.obj+".down(event); return false;")
				this.objLyr.ele.onmouseup = new Function("event", this.obj+".up(event); return false;")
			}
			if( this.capture & 1 ) 
				this.objLyr.ele.onmouseover = new Function(this.obj+".over(); return false;")
			if( this.capture & 2 ) 
				this.objLyr.ele.onmouseout = new Function(this.obj+".out(); return false;")
			if( this.embed && (!is.ie || !this.v ) )
			{
				if( is.ns5 ) 
					this.objLyr.ele.innerHTML = this.embed;
				else 
					this.objLyr.write( this.embed );
			}

			if(this.source.indexOf(".wav") >= 0)
			{
				if(!is.ie && !is.ie11)
				{
					var funcOnDone = null;
					try{funcOnDone=eval( this.name + 'onOver' );}catch(error){}
					 var medobj = getChildNodeByID(this.objLyr.ele, this.name+'Media');
					 if(medobj&&funcOnDone) medobj.addEventListener('ended', funcOnDone, false);
				}
			}
	  }
  }
  else
  {
	  if(!this.bInherited)
	  {
		  if( is.ns5 )
		  {		  
			if(this.objLyr.ele)
				this.objLyr.ele.innerHTML = this.divInt;
		  }
		  else 
			this.objLyr.write( this.divInt );
	  if(this.bNeedPool && is.isMobile.any() && isSinglePagePlayerAvail())
			grabFromPool(this.objLyr.ele.firstElementChild.tagName.toLowerCase(),this.objLyr.ele);
		//For backgroudn audio, we do not want to build the media player
		if(this.bBkAudio && isSinglePagePlayerAvail())
			{
				moveBkAudio(this);
				return;
			}
		var medEle = getChildNodeByID(this.objLyr.ele, this.name+'Media');
		
		
		/* From now on we are creating the player the way LO does
		this.mediaElement = new MediaElement(medEle?medEle:this.name+'Media', this.mediaOptions);
		//If there is plugin type then change the mode to shim
		if(this.mediaElement && this.mediaElement.pluginType && (this.mediaElement.pluginType.indexOf('flash') >-1 || this.mediaElement.pluginType.indexOf('silverlight') >-1))
		{
		  this.playerOptions.mode = 'shim';
		  var container = getHTMLEleByID(this.mediaElement.id+"_container");
		  if(container)
			  container.parentNode.removeChild(container);
		  
		  delete this.mediaElement;
		}
		*/

		 this.mediaPlayer = this.getMePlayerCreator().createMEPlayer(medEle?medEle:this.name+'Media', this.playerOptions); //new MediaElementPlayer(this.mediaElement?this.mediaElement:medEle?medEle:getHTMLEleByID(this.name+"Media"), this.playerOptions);

		 if(this.mediaSkin){
			if(this.mediaPlayer.player)
				this.mediaPlayer.player.changeSkin(this.mediaSkin);
			else if(this.mePlayer.player)
				this.mePlayer.player.changeSkin(this.mediaSkin);
		}

		//LD-3289: iOS-fix
		if( (!this.bControl )||(this.w < 185 && this.bControl) || this.bBkAudio)
		{
		
					this.mePlayer.player.changeSkin("mejs-noskin");
		}

		//LD-6012 Need to resize player once it's created
		if(this.bNeedPool && is.isMobile.any() && isSinglePagePlayerAvail())
			this.respChanges();

		//LD-3147 ---LHD
		if(this.bAutoStart && this.playerOptions && this.playerOptions.mode == 'shim')
		  this.actionPlay();
	  }	  
  }
  
  this.objLyr.theObj = this;
}

function ObjMediaDown(e) {
  if( is.ie ) e = event || e
  if( is.ie && !is.ieMac && e.button != 0 && e.button!=1 && e.button!=2 ) return
  if( is.ieMac && e.button != 0 ) return
  if( is.ns && e.button!=0 && e.button!=2 ) return
  this.onSelect()
  this.onDown()
}

function ObjMediaUp(e) {
  if( is.ie ) e = event || e
  if( is.ie && !is.ieMac && e.button != 0 && e.button!=1 && e.button!=2 ) return
  if( is.ieMac && e.button!=0 ) return
  if( is.ns && e.button!=0 && e.button!=2 ) return
  if( e.button==2 )
  {
    if( this.hasOnRUp )
    {
      getDisplayDocument().oncontextmenu = ocmNone
      this.onRUp()
      setTimeout( "getDisplayDocument().oncontextmenu = ocmOrig", 100)
    }
  }
  else if( !is.ns5 )
    this.onUp()
}

function ObjMediaOver() {
  this.onOver()
}

function ObjMediaOut() {
  this.onOut()
}

function ObjMediaWriteLayer( newContents ) {
  if (this.objLyr) this.objLyr.write( newContents )
}

function ObjMediaOnShow() {
  this.alreadyActioned = true;
  if( is.ie && !this.bMediaEle) {
    this.v = true;
	this.bAutoStart = this.isPlaying;
    this.BuildMediaString();
    this.objLyr.write( this.embed );
  }
  this.objLyr.actionShow();
}

function ObjMediaOnHide() {
  this.alreadyActioned = true;
  if( is.ie && !this.bMediaEle) {
    this.v = false;
	this.bAutoStart = this.isPlaying;
    this.BuildMediaString();
    this.objLyr.write( this.embed );
  }
  this.objLyr.actionHide();
}

function ObjMediaIsVisible() {
  if( this.objLyr.isVisible() )
    return true;
  else
    return false;
}

function ObjMediaFlashParams(strParam)
{
	this.flashParam = strParam;
}

function ObjMediaCaptionFile(fcap, lang)
{
	this.bHasCaption = true;
	this.capLang.push(lang);
	this.capFile.push(fcap);	
}

function ObjMediaPlayerSkin(skinClass, cssFileName)
{
	this.mediaSkin = skinClass;
	if(typeof(cssFileName) !="undefined")
	{
		this.arrMediaSkinFiles.push(cssFileName);
		AddFileToHTML(cssFileName, 'css');
	}
}

function ObjLoadProps()
{
	if(is.jsonData != null)
	{
		var respValues = is.jsonData[is.clientProp.device];
		var newValues;
		newValues = respValues[is.clientProp.width];
		var obj = newValues[this.name];
		if(obj)
		{
			this.x = typeof(obj.x)!="undefined"?obj.x:this.x;
			this.origX = typeof(obj.x)!="undefined"?obj.x:this.x;
			this.y = typeof(obj.y)!="undefined"?obj.y:this.y;
			this.w = typeof(obj.w)!="undefined"?obj.w:this.w;
			this.h = typeof(obj.h)!="undefined"?obj.h:this.h;
			this.bBottom = (typeof(obj.bOffBottom)!="undefined"?obj.bOffBottom:this.bBottom);
			
			if(this.x > GetPageWidth() || ((this.x + this.w) < 0))
				this.bOffPage = true;
			else
				this.bOffPage = false;
			
		}
	}
}

function ObjRespChanges()
{
	if(this.name.indexOf('video') >-1)
	{
		if(this.objLyr)
		{
			if(this.bMediaEle)
			{
				//LD-3289: iOS-fix: Resize for when using native controls
				if( is.iOS && !this.bControl )
				{
					if(typeof(this.mePlayer.player.media.setVideoSize) != 'undefined')
						this.mePlayer.player.media.setVideoSize(this.w, this.h);
				}
				else
				{
					var wasFullScreen = this.mePlayer.player.isFullScreen;

					var vidobj = this.div.getElementsByTagName('video')[0];
					if(vidobj && !wasFullScreen)
					{
						vidobj.width = this.w;
						vidobj.height = this.h;
						vidobj.style.width = this.w + 'px';
						vidobj.style.height = this.h + 'px';
					}

					
					if( !wasFullScreen && typeof(this.mePlayer.setPlayerSize) != 'undefined')
						this.mePlayer.setPlayerSize(this.w,this.h);

					if( !wasFullScreen && typeof(this.mePlayer.player.setPlayerSize) != 'undefined')
						this.mePlayer.player.setPlayerSize(this.w,this.h);

					if( !wasFullScreen && typeof(this.mePlayer.setVideoSize) != 'undefined')
						this.mePlayer.setVideoSize(this.w, this.h);

					if(!wasFullScreen && typeof( triv$(this.mePlayer.player.media).setVideoSize) != 'undefined')
						triv$(this.mePlayer.player.media).setVideoSize(this.w, this.h);


					if(!wasFullScreen && typeof(this.mePlayer.setControlsSize) != 'undefined')
						this.mePlayer.setControlsSize();

					if(!wasFullScreen && typeof(this.mePlayer.player.setControlsSize) != 'undefined')
						this.mePlayer.player.setControlsSize();
					
					if( (this.w < 185 || !this.bControl) && !wasFullScreen )
						this.mePlayer.player.changeSkin("mejs-noskin");
					else if(this.mediaSkin && !wasFullScreen)
						this.mePlayer.player.changeSkin(this.mediaSkin);
					else if (!wasFullScreen)
						this.mePlayer.player.changeSkin('');

				}
			}
			else
				this.sizeTo(this.w, this.h);
		}
	}
	
	//Adjust the CSS
	FindAndModifyObjCSSBulk(this);
}

function ObjSetMediaType()
{
	if( this.source.indexOf(".rm") >= 0 ||
		this.source.indexOf(".ram") >= 0 )
			this.mediaType = 'real';
	else if( this.source.indexOf(".avi") >= 0 || 
		  this.source.indexOf(".wmv") >= 0 || 
		  this.source.indexOf(".asf") >= 0 ||
		  this.source.indexOf(".wma") >= 0 )  
			this.mediaType = 'media';
	else if (this.source.indexOf(".mov") >= 0 || 
		   this.source.indexOf(".mp4") >= 0 ||
		   this.source.indexOf(".aif") >= 0 || 
		   this.source.indexOf(".mid") >= 0 ||
		   this.source.indexOf(".au") >= 0) 
			this.mediaType = 'quick';
	else if(this.source.indexOf(".wav") >= 0)
		this.mediaType = 'wav';
}

function ObjMediaValidSource()
{
	if(this.bOffPage)
	{
		this.bOffPage = false;
		this.actionChangeContents(this.src);
	}
}

function ObjMediaCheckPlayerLoad()
{
	if(this.mediaPlayer.player && this.mediaPlayer.player.media
		 && this.mediaPlayer.player.media && this.mediaPlayer.player.media.player
		&&  !this.mediaPlayer.player.media.player.proxy.isLoaded)
	{
		return false;
	}
	else
		return true;
		
}

//LD-3221 LD-3220
function ObjMediaMEJSPlayable()
{
	var bIsMEJSPlayable = true;
	if(	this.source.indexOf(".mov") >= 0 || this.source.indexOf(".rm") >= 0 || this.source.indexOf(".ram") >= 0 || this.source.indexOf(".wma") >= 0 	|| 
		this.source.indexOf(".wmv") >= 0 || this.source.indexOf(".asf") >= 0 || this.source.indexOf(".au") >= 0 || this.source.indexOf(".mid") >= 0 	|| 
		this.source.indexOf(".midi") >= 0 || this.source.indexOf(".aiff") >= 0 || this.source.indexOf(".aif") >= 0 || this.source.indexOf(".avi") >= 0 ||
		this.source.indexOf(".mpg") >= 0 || this.source.indexOf(".mpa") >= 0 || (this.source.indexOf(".wav") >= 0 && is.ieAny))
			bIsMEJSPlayable = false;
	
	return bIsMEJSPlayable;
}

function ObjMediaIsVideo()
{
	var bIsVideo = false;
	if(this.name.toLowerCase().indexOf("video")>=0)
		bIsVideo = true;
	return bIsVideo;
}

function ObjMediaIsAudio()
{
	var bIsAudio = false;
	if(this.name.toLowerCase().indexOf("audio")>=0 || this.name.toLowerCase().indexOf("sound")>=0)
		bIsAudio = true;
	return bIsAudio;
}

function ObjMediaGetSource()
{
	return this.src;
}

function ObjMediaGetTrackTime()
{
	var time = 0;
	if(this.bMediaEle)
	{
		if(this.mediaPlayer.player)
			time = this.mediaPlayer.player.proxy.getCurrentTime().toFixed(0);
		else if(this.mePlayer.player)
			time = this.mePlayer.player.proxy.getCurrentTime().toFixed(0);

	}
	return time;
}

function ObjMediaSetTrackTime(time)
{
	if(this.bMediaEle)
	{
		if(this.mediaPlayer.setCurrentTime){
			this.mediaPlayer.setCurrentTime(time);
			this.mediaPlayer.player.setCurrentRail();
		}
		else if (this.mePlayer.setCurrentTime)
		{
			this.mePlayer.setCurrentTime(time);
			this.mePlayer.player.setCurrentRail();	
		}
		
	}
}

function ObjMediaRefresh(){
	if(this.bInherited)
	{
		//If it is an inherited object the DIV might not reflect the correct dom element
		if(!this.div.parentElement)
			this.div = getHTMLEleByID(this.name);
		
		if(!this.bMediaEle)
		{
			if( this.capture & 4 ) 
			{
				this.objLyr.ele.onmousedown = new Function("event", this.obj+".down(event); return false;")
				this.objLyr.ele.onmouseup = new Function("event", this.obj+".up(event); return false;")
			}
			if( this.capture & 1 ) 
				this.objLyr.ele.onmouseover = new Function(this.obj+".over(); return false;")
			if( this.capture & 2 ) 
				this.objLyr.ele.onmouseout = new Function(this.obj+".out(); return false;")
			if( this.embed && (!is.ie || !this.v ) )
			{
				if( is.ns5 ) 
					this.objLyr.ele.innerHTML = this.embed;
				else 
					this.objLyr.write( this.embed );
			}

			if(this.source.indexOf(".wav") >= 0)
			{
				if(!is.ie && !is.ie11)
				{
					var funcOnDone = null;
					try{funcOnDone=eval( this.name + 'onOver' );}catch(error){}
					 var medobj = getChildNodeByID(this.objLyr.ele, this.name+'Media');
					 if(medobj&&funcOnDone) medobj.addEventListener('ended', funcOnDone, false);
				}
			}
		}
		else
		{
			var medEle = getChildNodeByID(this.objLyr.ele, this.name+'Media');
		  
			if(!this.mediaElement)
				this.mediaElement = new MediaElement(medEle?medEle:this.name+'Media', this.mediaOptions);
			//If there is plugin type then change the mode to shim
			if(this.mediaElement && this.mediaElement.pluginType && (this.mediaElement.pluginType.indexOf('flash') >-1 || this.mediaElement.pluginType.indexOf('silverlight') >-1))
			{
			  this.playerOptions.mode = 'shim';
			  var container = getHTMLEleByID(this.mediaElement.id+"_container");
			  if(container)
				  container.parentNode.removeChild(container);
			  
			  delete this.mediaElement;
			}
			
			if(!this.mediaPlayer)
				this.mediaPlayer = new MediaElementPlayer(this.mediaElement?this.mediaElement:medEle?medEle:getHTMLEleByID(this.name+"Media"), this.playerOptions);
			
			if(this.mediaSkin){
				if(this.mediaPlayer.player)
					this.mediaPlayer.player.changeSkin(this.mediaSkin);
				else if(this.mePlayer.player)
					this.mePlayer.player.changeSkin(this.mediaSkin);
			}

			//LD-3289: iOS-fix
			if( (!this.bControl )||(this.w < 185 && this.bControl) || this.bBkAudio)
			  {
						this.mePlayer.player.changeSkin("mejs-noskin");			
				}
		}
	}
	
}

function ObjMediaGetPreloadString()
{
	var strPreloads = "'" + this.src + "'";
	for ( var idx=0; idx<this.arrMediaSkinFiles.length; idx++ )
	{
		if (this.arrMediaSkinFiles[idx] && this.arrMediaSkinFiles[idx].length )
			strPreloads += ",'" + this.arrMediaSkinFiles[idx] + "'";
	}
	return strPreloads;
}

function ObjMediaGetCSS(){
	var css = '';
	css = buildCSS(this.name,this.bFixedPosition,this.x,this.y,this.w,null,this.v,this.z);
	return css;
}

function ObjMediaRV(){
	this.loadProps();
	if(!window.bTrivResponsive)
	{
		this.h = this.oh;
		this.w = this.ow;
	}
	this.css = this.getCSS();
	this.refresh();
	
	if(this.objLyr && this.objLyr.objDiv)
	{
		for(var index = 0; index < this.objLyr.objDiv.style.length;index++)
		{
			var styleName = this.objLyr.objDiv.style[index];
			this.objLyr.objDiv.style[styleName]="";
		}
		if(!this.v)
			this.objLyr.objDiv.style.visibility = 'hidden';
	}
}

function ObjMediaRebuildPlayer(mediaElementToUse, mediaPlayerToUse, id){
	if(this.bMediaEle)
	{
		if(this.mediaElement)
		{
			delete this.mediaElement;
			this.mediaElement = mediaElementToUse;
		}
		
		if(this.mediaPlayer)
		{
			delete this.mediaPlayer;
			this.mediaPlayer = mediaPlayerToUse;
		}
		
		//LD-4624 -Unset player occured
		if(!this.mediaElement && !this.mediaPlayer)
			return;
		
		var div = getHTMLEleByID(this.name);
		//Hide Old DIV
		if(div)
		{
			div.style.visibility = 'hidden';
			div.id = div.id+'TMP';
		}
		//LD-4655 --- Only linking the players
		if(!id)
			return;
		
		div = getHTMLEleByID(id);
		
		div.id = this.name;
		div.visibility = '';
		
		//Update ObjLayer
		this.objLyr = new ObjLayer(this.name, null, null, div)
		var tracks = div.getElementsByTagName("track");
		
		if(tracks.length)
			tracks = tracks[0];
		else
			tracks = null;

		//Currently only being set for one language
		if(this.bHasCaption)
		{
			if(tracks)
			{
				tracks.src = this.capFile[0];
				tracks.srclang = this.capLang[0];
			}
			else
			{
				tracks = getDisplayDocument().createElement("track");
				tracks.kind = 'subtitles';
				tracks.src = this.capFile[0];
				tracks.srclang=this.capLang[0];
				var mediaEle = this.isVideo()?div.getElementsByTagName("video"):div.getElementsByTagName("audio");
				if(mediaEle.length)
				{
					mediaEle = mediaEle[0];
					mediaEle.appendChild(tracks);
				}
			}
		}
		else
		{
			if(tracks && tracks.parentElement)
				tracks.parentElement.removeChild(tracks);
		}
		
		this.mediaPlayer.setTrack('none');
		if(this.bHasCaption)
		{
			this.mediaPlayer.findTracks();
			this.mediaPlayer.loadTrack(0);
			if(typeof (getDisplayWindow().VarTrivSelCap) == "object" && getDisplayWindow().VarTrivSelCap.getValue() == this.capLang[0])
				this.mediaPlayer.setTrack(this.capLang[0]);
		}
		else
			this.mediaPlayer.captionsButton.remove();
		
		if(this.isVideo() && this.bRollControl)
			this.mediaPlayer.controls.addClass("mejs-roll");
		
		if(this.v)
			this.actionShow()
		
		if(this.mediaSkin)
		  this.mePlayer.player.changeSkin(this.mediaSkin);
		else
		  this.mePlayer.player.changeSkin(""); //LD-5604 - else clear the skin

		//LD-3289: iOS-fix
		if( (!this.bControl )||(this.w < 185 && this.bControl) || this.bBkAudio)
		 {
				this.mePlayer.player.changeSkin("mejs-noskin");				
		 }
	}
}

function ObjMediaRemoveListeners(){
	if(this.mediaPlayer && typeof(this.mediaPlayer.player)!='undefined' && this.mediaPlayer.player.media)
	{
		this.mediaPlayer.player.media.removeEventListener('progress',this.mediaPlayer.progFunc);
		this.mediaPlayer.player.media.removeEventListener('timeupdate',this.mediaPlayer.timeFunc);
		this.mediaPlayer.player.media.removeEventListener('timeupdate',this.mediaPlayer.dispCap);
		this.mediaPlayer.player.media.removeEventListener('timeupdate',this.mediaPlayer.curFunc);
		this.mediaPlayer.player.media.removeEventListener('timeupdate',this.mediaPlayer.durFunc);
		this.mediaPlayer.player.media.removeEventListener('timeupdate',this.mediaPlayer.dispSlides);
	}
}

function ObjMediaCreateMEPlayer(htmlElem , options ){
	return triv$(htmlElem).mediaelementplayer(options)[0];
}

function ObjMediaGetMEPlayerCreator(){
	return (isSinglePagePlayerAvail() ? trivPlayer : this);
}

function isSupportedFormat(obj)
{
	var bIsMEJSPlayable = true;
	if(	obj.source.indexOf(".mov") >= 0 || obj.source.indexOf(".rm") >= 0 || obj.source.indexOf(".ram") >= 0 || obj.source.indexOf(".wma") >= 0 	|| 
		obj.source.indexOf(".wmv") >= 0 || obj.source.indexOf(".asf") >= 0 || obj.source.indexOf(".au") >= 0 || obj.source.indexOf(".mid") >= 0 	|| 
		obj.source.indexOf(".midi") >= 0 || obj.source.indexOf(".aiff") >= 0 || obj.source.indexOf(".aif") >= 0 || obj.source.indexOf(".avi") >= 0 ||
		obj.source.indexOf(".mpg") >= 0 || obj.source.indexOf(".mpa") >= 0 || obj.source.indexOf(".m4v") >= 0 || (obj.source.indexOf(".wav") >= 0 && is.ieAny))
			bIsMEJSPlayable = false;
	
	return bIsMEJSPlayable;
}