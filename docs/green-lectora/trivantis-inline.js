/**************************************************
Trivantis (http://www.trivantis.com)
**************************************************/

var ocmOrig = getDisplayDocument().oncontextmenu
var ocmNone = new Function( "return false" )

// Inline Object
function ObjInline(n,a,x,y,w,h,v,z,c,d,s,fb,cl,cvr) {
  this.name = n
  this.altName = a
  this.x = x
  this.origX = x
  this.y = y
  this.w = w
  this.h = h
  this.oh = h;
  this.ow = w;
  this.v = v
  this.z = z
  this.s = s
  this.iType = '';
  this.isGrp = false
  this.hasOnUp = false
  this.hasOnRUp = false
  this.clip=0;
  if(c==-1 || c==-2){
    this.bgColor = null;
    this.clip=2;
  }else this.bgColor = c;
  this.obj = this.name+"Object"
  this.parmArray = new Array
  this.numParms = 0
  this.alreadyActioned = false;
  this.eatOnUp=false;
  this.eatOnRUp=false;
  eval(this.obj+"=this")
  if ( d != 'undefined' && d!=null )
    this.divTag = d;
  else  
    this.divTag = "div";
  this.childArray = new Array  
  this.isPlaying = false;
  this.hasDone   = 0;
  this.flsPlayer = null;
  this.autoPlay  = false;
  this.bAutoStart = false;
  this.hasBeenProcessed = false;
  this.bSizing = false;
  this.muteState = false;
  this.arrChoice = new Array
  this.addClasses = cl;
  this.arrEvents = new Array
  this.timerVar=null;
  this.YTPlayer = null;
  this.quOrd = null;
  this.bOffPage = false;
  this.bFixedPosition = false;
  this.bBottom = fb?true:false;
  this.opacity = 100;
  this.innerTxt = null;
  this.bInherited = false;
  this.cvr = !!cvr;
}

function ObjInlineGetActualWidth()
{
	var width = this.w;
	if( width == -1 ){
		var obj = getHTMLEleByID(this.name);
		if( obj ){
			width = obj.offsetWidth;
		}
	}
	
	return width;
}

function ObjInlineGetNS( tagName) { 
	var flashName = "swf" + this.name;
	var obj = 0;
	if (navigator.appVersion.indexOf("Mac") != -1) {
	    try { obj = eval("getDisplayWindow()." + flashName); } catch (e) { };
	}
	else {
	    try { obj = eval("getDisplayDocument().embeds." + flashName); } catch (e) { };
	}
	return obj;
}

function ObjInlineAddParm( newParm ) {
  this.parmArray[this.numParms++] = newParm;
}

function ObjInlineAddChild( newChild ) {
  this.childArray[this.childArray.length] = newChild;
}

function ObjInlineActionGoTo( destURL, destFrame ) {
  this.objLyr.actionGoTo( destURL, destFrame );
}

function ObjInlineActionGoToNewWindow( destURL, name, props ) {
  this.objLyr.actionGoToNewWindow( destURL, name, props );
}

function ObjInlineActionPlay( ) { 

	if(this.timerVar != null && typeof(this.timerVar) != "undefined" )
	{
		var timerCurrVal = this.timerVar.getValue();
		if( timerCurrVal != null && typeof(timerCurrVal) != "undefined" ) {
			timerCurrVal = timerCurrVal.toString();
			if( timerCurrVal.indexOf( 'pause:' ) != -1 )
			{
				timerCurrVal = parseInt( timerCurrVal.split(':')[1] );
				this.timerVar.set( (parseInt((new Date().getTime()+500)/1000)*1000) - timerCurrVal );
			}
		}
	}
	else if( this.iType == 'flashvid' ) 
	{
		if (is.useHTML5Video()){	
			var medobj = getHTMLEleByID('html5' + this.name);
			if (medobj) {			
				medobj.play();
			}
			else {
				var thisObj = this;
				setTimeout(function(){thisObj.actionPlay();}, 100);
			}		
		}
		else{
			try{
				if (!this.flsPlayer) 
					this.setFlashPlayer();

			if (this.flsPlayer.PercentLoaded() != 100) 
				throw new Error('flash not loaded');

			if( !this.autoPlay )
			{
				if(this.flsPlayer.sendEvent)
				{
					this.flsPlayer.sendEvent('play');
					this.autoPlay = true;
				}
				else{
					var thisObj = this;
					setTimeout(function(){thisObj.actionPlay();}, 1000);
				}
			}

			}catch(err){   
				var thisObj = this;
				setTimeout(function(){thisObj.actionPlay();}, 1000);
			}
		}
	}
	else if( this.iType == 'flash' ) 
	{
		if(! this.flsPlayer )
			this.setFlashPlayer()

		if(this.flsPlayer)
			this.flsPlayer.Play();
		this.autoPlay = true;
	}
	else if( this.iType == 'wmp' ) 
	{
		eval("getDisplayDocument()."+this.name+"obj"+".controls.play()");
		this.isPlaying = true;
	}
	else if(this.iType == 'youtube')
	{
		this.YTPlayer.playVideo() ;
	}
	else 
		this.objLyr.actionPlay();
}

function ObjInlineActionStop( ) {

	if(this.timerVar != null )
	{
		this.timerVar.set( 'pause:0' );
	}
	else if( this.iType == 'flashvid' ) 
	{
		if (is.useHTML5Video())
		{
			var medobj = getHTMLEleByID('html5' + this.name);
			if(medobj){ 
				try{
				medobj.pause();
				medobj.currentTime=0;
			}catch(e){}
			}		
		}
		else{
			if(! this.flsPlayer )
				this.setFlashPlayer()
			
			if(this.flsPlayer)
				this.flsPlayer.sendEvent('stop');
			
			this.autoPlay  = false;}
	}
	else if( this.iType == 'flash' ) 
	{
		if(! this.flsPlayer )
			this.setFlashPlayer()

		if(this.flsPlayer)
		{
			if(this.flsPlayer.GotoFrame)
				this.flsPlayer.GotoFrame(0);
			
			if(this.flsPlayer.StopPlay)
				this.flsPlayer.StopPlay();
		}
		this.autoPlay  = false;  
	}
	else if( this.iType == 'wmp' ) 
	{
		eval("getDisplayDocument()."+this.name+"obj"+".controls.stop()");
		this.isPlaying = false;
	}
	else if(this.iType == 'youtube')
	{
		if(this.YTPlayer && this.YTPlayer.stopVideo)
			this.YTPlayer.stopVideo() ;
	}
	else 
		this.objLyr.actionStop();
}

function ObjInlineActionShow( bFromActivate ) {  
  if(IsMedia(this) && this.bAutoStart)
  {
	   this.actionPlay();
	   this.bAutoStart = false;  
  }
  
  if(IsAudioObj(this) && IsHiddenAudioObj(this))
  {
	this.actionShowAudio();
	return;
  }
	 

  if( this.isGrp || !this.isVisible() )
    this.onShow(bFromActivate);
}

function ObjInlineActionHide( ) {
  if(IsMedia(this) && (this.isPlaying || this.autoPlay))
	  this.actionPause();
  
  if( IsAudioObj(this) && !IsHiddenAudioObj(this) ){
	this.actionHideAudio();
	
 
	return;
  }

  if( this.isGrp || this.isVisible() )
    this.onHide();
}

function ObjInlineActionShowAudio(){
	this.v = true;
	this.onShowAudio();
}

function ObjInlineActionHideAudio(){
	this.v = false;
	this.onHideAudio();
}

function ObjInlineActionLaunch( ) {
  this.objLyr.actionLaunch();
}

function ObjInlineActionExit( ) {
  this.objLyr.actionExit();
}

function ObjInlineActionChangeContents( value, align, fntId ) {
  var varValue = ''
  varValue += value
  if (arguments.length>1) {
    var div = null
    var fntName = this.objLyr.id + 'Font' + fntId
 
    if( varValue != "~~~null~~~" && varValue.split ) {
      var test = escape( varValue )
 
      test = test.replace(/%0A/g, '<br />'); // B15845
 	  test = test.replace(new RegExp('%7E%7E%7Enull%7E%7E%7E', 'g'),'')
      var ca = test.split('%5Cr')
      if( ca.length ) {
        var newVarValue=''
    
        for(var i=0;i<ca.length;i++) {
          newVarValue += ca[i]
          if( i < ca.length-1 ) 
            newVarValue += '<br />'
        }
        varValue = newVarValue
      }
      
      test = varValue;
      
      var ca = test.split('%')
      if( ca.length ) {
        var newVarValue=''
    
        for(var i=0;i<ca.length;i++) {
          var tempStr, holdStr;
          var uni = 0;
          if( i )
          {
            if( ca[i].charAt( 0 ) == 'u' )
            {
              uni = 1;
              holdStr = ca[i].substring( 5 );
            }
            else
              holdStr = ca[i].substring( 2 );
          }
          else
            holdStr = ca[i];
            
          if( i && i < ca.length ) 
          {
            if( uni )
              tempStr = ca[i].substring( 1, 5 )
            else
              tempStr = ca[i].substring( 0, 2 )

            var hexValue = parseInt( tempStr, 16 )

            if( hexValue == 32 )
              newVarValue += ' '
            else
              newVarValue += '&#' + hexValue + ';'

            newVarValue += holdStr
          }
          else
            newVarValue += holdStr
        }
        varValue = newVarValue
      }
    }
    
    var splitID = '<!--split=' + this.objLyr.id + 'ter' + '-->';
    var parts = this.objLyr.ele.innerHTML.split(splitID);
    if ( parts.length == 3 )
    {
      if( varValue == "~~~null~~~" ) div = parts[0] + splitID + '<' + this.divTag + ' class="' + align + '"><span class="' + fntName + '">' + '</span></' + this.divTag + '>'  + splitID + parts[2]; 
      else div =  parts[0] + splitID + '<' + this.divTag + ' class="' + align + '"><span class="' + fntName + '">' + varValue + '</span></' + this.divTag + '>' + splitID + parts[2]; 
    }
    if( !div )
    {
      if( varValue == "~~~null~~~" ) div = '<' + this.divTag + ' class="' + align + '"><span class="' + fntName + '">' + '</span></' + this.divTag + '>' 
      else div = '<' + this.divTag + ' class="' + align + '"><span class="' + fntName + '">' + varValue + '</span></' + this.divTag + '>'
    }
	
	if(this.heading > 0){
		var splitDiv = div.split("<span");
		
		div = splitDiv[0] + "<h" + this.heading + "><span" + splitDiv[1];
		
		splitDiv = div.split("</span>")
		
		div = splitDiv[0] + "</span></h" + this.heading + ">" + splitDiv[1];
	}
	
    if( is.ns5 ) this.objLyr.ele.innerHTML = div
    else this.objLyr.write( div );
  }
  else {
    if ( this.parmArray[1] ) {
      if( varValue.length == 0 )
      {
        var off = this.parmArray[1].indexOf( 'value=' )
        if( off >= 0 )
	  varValue = this.parmArray[1].substring( off + 7, this.parmArray[1].length-2 )

        //Fixup parm 0
        off = this.parmArray[0].indexOf( 'width=' )
        var front = this.parmArray[0].substring( 0, off + 7 )
        var end   = this.parmArray[0].substring( off + 7 )
        off = end.indexOf( "'" )
        var newString = front + this.w + end.substring( off )
        off = newString.indexOf( 'height=' )
        var front = newString.substring( 0, off + 8 )
        var end   = newString.substring( off + 8 )
        off = end.indexOf( "'" )
        this.parmArray[0] = front + this.h + end.substring( off )
      }

      if( this.iType == 'flashvid' ) {
        if( this.bSizing ) {
		  var strArr = new Array('width=', 'height=')
		  for(i=1; i < this.parmArray.length; i++) {
		    var delim = "&"
			for( y = 0 ; y < strArr.length; y++ ) {
			  var str = strArr[y];
			  var strLen = str.length
			  var off = this.parmArray[i].indexOf( str )
			  while(off > 0) {
			    var bIsNum = this.parmArray[i].charAt(off + strLen)
				if( bIsNum == "'" ) {
				  strLen++
				  delim = "'"
				}
				var front = this.parmArray[i].substring( 0, off + strLen )
				var end = this.parmArray[i].substring( off + strLen )
				var delimoff = end.indexOf( delim )
				this.parmArray[i] = front + (y==0?this.w:this.h) + end.substring( delimoff )
				off = this.parmArray[i].indexOf( str, off + strLen )
				strLen = str.length
				delim = "&"
			  }
			}
		  }
	      this.bSizing = false;
		}
		else {
            if(varValue.indexOf('media/') == 0 && (varValue.indexOf('.mp3') < 0 ))
                varValue = varValue.substring(6);
            var str = 'file=';
			for(i=1; i < this.parmArray.length; i++) {
				off = this.parmArray[i].indexOf( str )
				if( off > 0 ) {
					var front = this.parmArray[i].substring( 0, off + 5 )
					var end   = this.parmArray[i].substring( off + 5 )
					off = end.indexOf( "&" )
					this.parmArray[i] = front + varValue + end.substring( off )
				}
			}
			this.flsPlayer = null;
        }
        
      }else if(this.iType == 'wmp' ){
		this.parmArray[1] = "<param name='URL' value='" + varValue + "'>";
        this.parmArray[3] = "<embed src='" + varValue + "' width='" + this.w + "'   height='" + this.h + "'PLUGINSPAGE='http://microsoft.com/windows/mediaplayer/en/download/' type='application/x-mplayer2'  name='" + this.name + "'>";
	  }else{
        this.parmArray[1] = "<param name='movie' value='" + varValue + "'>";
	for(var i=0; i<this.parmArray.length; i++)
	{
		var currParm = this.parmArray[i];
		if( currParm.length > 6 && currParm.indexOf('<embed') == 0)
			this.parmArray[i] = "<embed src='" + varValue + "' width='" + this.w + "'   height='" + this.h + "' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash' name='swf" + this.name + "' swliveconnect='true' "+(this.autoPlay?"autostart='true'":"")+">";
	}
      }
      this.build();
      var str = "";
      for (var i=0; i < this.numParms; i++) str = str + this.parmArray[i]
      if( is.ns5 ) this.objLyr.ele.innerHTML = str
      else this.objLyr.write( str );
	  this.flsPlayer = null;
    }
    else {
      if(this.iType == 'flashvid' && is.useHTML5Video()){
        if(value==''){
	  var off = this.parmArray[0].indexOf( 'width=' );
	  var front = this.parmArray[0].substring( 0, off + 7 );
	  off = this.parmArray[0].indexOf( "'", off + 7 );
	  var end = this.parmArray[0].substring( off )
	  this.parmArray[0] = front + this.w + end;
	  off = this.parmArray[0].indexOf( 'height=' );
	  front = this.parmArray[0].substring( 0, off + 8 );
	  off = this.parmArray[0].indexOf( "'", off + 8 );
	  var end = this.parmArray[0].substring( off )
	  this.parmArray[0] = front + this.h + end;
        }else{
	  var off = this.parmArray[0].indexOf( 'src=' );
	  var front = this.parmArray[0].substring( 0, off + 5 );
	  off = this.parmArray[0].indexOf( "'", off + 5 );
	  var end = this.parmArray[0].substring( off )
	  this.parmArray[0] = front + value + end;
        }
	this.build();
	this.objLyr.write( this.parmArray[0] );
      }
    }
  }
}

function ObjInlineActionTogglePlay( ) {
  if( this.timerVar!=null && typeof(this.timerVar)!="undefined" )
  {
	var timerCurrVal = this.timerVar.getValue();
	if( timerCurrVal != null && typeof(timerCurrVal) != "undefined" ) {
		timerCurrVal = timerCurrVal.toString();
		if( timerCurrVal.indexOf( 'pause:' ) != -1 )
			this.actionPlay();
		else
			this.actionPause();
	}
  }
  else if( this.iType == 'flashvid' ) 
  {
     if (is.useHTML5Video()){
     var medobj = getHTMLEleByID('html5' + this.name);
     if(medobj){
     if(medobj.paused==true) medobj.play();
     else medobj.pause()}
     }else{
     if(! this.flsPlayer ) this.setFlashPlayer()
     if( this.autoPlay ) this.autoPlay = false;
	 else this.autoPlay = true;
     this.flsPlayer.sendEvent('play');}
  }
  else if( this.iType == 'flash' ) 
  {
      if(! this.flsPlayer )
      	this.setFlashPlayer()
  
      if( this.flsPlayer.IsPlaying() ) {
		  if(this.flsPlayer.StopPlay)
			this.flsPlayer.StopPlay();
		
          this.autoPlay  = false;
      }
      else {
	      this.flsPlayer.Play();
	      this.autoPlay = true;
      }
  }
  else if( this.iType == 'wmp' ) 
  {
	this.setPlayState();
    if( this.isPlaying ) {
	    eval("getDisplayDocument()."+this.name+"obj"+".controls.stop()");
	    this.isPlaying = false;
    }
    else {
	    eval("getDisplayDocument()."+this.name+"obj"+".controls.play()");
	    this.isPlaying = true;
    }
  }
  else if(this.iType == 'youtube')
  {
	if(this.YTPlayer.getPlayerState() == 1)
		this.YTPlayer.pauseVideo();
	else
		this.YTPlayer.playVideo();
  }
  else this.objLyr.actionTogglePlay();

}

function ObjInlineActionToggleShow( ) {
  if( this.isGrp ) {
    for ( var i=0; i<this.childArray.length; i++ )
       eval( this.childArray[i] + ".actionToggleShow()");
  }
  else if(this.objLyr.isVisible() && !this.objLyr.bInTrans){ 
    //echo LD-975: Audio objects are always visible. They are moved 10000px off page when hidden. 
	if( IsAudioObj(this) ){
		if( IsHiddenAudioObj(this) ){
			this.actionShow();
		}
		else this.actionHide();
	}
	else
		this.actionHide();
  }
  else 
    this.actionShow();
}

function ObjInlineSizeTo( w, h, bResp ) { 
    var tempObj = {xOffset:0, yOffset:0, width: w, height: h, xOuterOffset:0, yOuterOffset:0};
		
	AdjustAttributesForEffects(this, tempObj);
	
	AdjustIFrameSize(this, tempObj);
	
	var svgFilterTag = getHTMLEleByID(this.name+"Shadow");
	
	if(svgFilterTag)
		ModifySVGShadow(this, tempObj);
		
    this.bSizing = true;
	this.build()
	if(this.objLyr)
	{
		this.activate()
		if(typeof(bResp) == "undefined")
			this.objLyr.clipTo( 0, tempObj.width, tempObj.height, 0  )
	}
    this.actionChangeContents( '' )
}

function ObjInlineGoToFrame( frame ) {
   if( this.iType == 'flash' ) 
   {
      if(! this.flsPlayer )
      	this.setFlashPlayer()
     
      this.flsPlayer.GotoFrame(frame);
   }

}

function ObjInlineGoToNextFrame() {
   if( this.iType == 'flash' ) 
   {
      if(! this.flsPlayer )
      	this.setFlashPlayer()
        
      var frame = this.flsPlayer.CurrentFrame()+1;
      this.flsPlayer.GotoFrame(frame);
   }

}

function ObjInlineGoToPrevFrame() {
  if( this.iType == 'flash' ) 
  {
      if(! this.flsPlayer )
      	this.setFlashPlayer()
          
      var frame = this.flsPlayer.CurrentFrame()-1;
      this.flsPlayer.GotoFrame(frame);
   }
}

function ObjInlineGoToLabel( label ) {
  if( this.iType == 'flash' ) 
  {
     if(! this.flsPlayer )
      	this.setFlashPlayer()
          
     this.flsPlayer.TGotoLabel('/', String(label) );
   }
}

function ObjInlineGetFlashVar ( varName ) {
     if(! this.flsPlayer )
      	this.setFlashPlayer()
          
     return this.flsPlayer.GetVariable( String(varName) );

	
}

function ObjInlineSetFlashVar( varName,myValue ) {
 if(! this.flsPlayer )
      	this.setFlashPlayer()

  this.flsPlayer.SetVariable( String(varName), String(myValue) );
}

function ObjInlinePause() {

  if( typeof this.timerVar != 'undefined' && this.timerVar != null )
  {
	var timerCurrVal = parseInt( this.timerVar.getValue() );
	if( timerCurrVal && timerCurrVal != "NaN" )
		this.timerVar.set( 'pause:' + ( (parseInt((new Date().getTime()+500)/1000)*1000) - timerCurrVal ) );
  }
  else if( this.iType == 'flashvid' ) 
  {
     if (is.useHTML5Video()){
     var medobj = getHTMLEleByID('html5' + this.name);
     if(medobj) medobj.pause();
     }else{
     if(! this.flsPlayer )
        this.setFlashPlayer()
     if( this.autoPlay )
     {  
        this.flsPlayer.sendEvent('PLAY');
     }
	this.autoPlay = false;}
  }
  else if( this.iType == 'flash' ) 
  {
     if(! this.flsPlayer )
        this.setFlashPlayer()

      this.flsPlayer.StopPlay();
  }
  else if( this.iType == 'wmp' ) 
  {
	this.setPlayState();
	eval("getDisplayDocument()."+this.name+"obj"+".controls.pause()");
	this.isPlaying = false;
  }
  else if(this.iType == 'youtube')
  {
	this.YTPlayer.pauseVideo();
  }
}

function ObjInlineDone() {
  if( typeof this.timerVar != 'undefined' && this.timerVar != null )
  {
	var timerCurrVal = parseInt( this.timerVar.getValue() );
	if( timerCurrVal && timerCurrVal != "NaN" )
		this.timerVar.set( 'done:' + ( (parseInt((new Date().getTime()+500)/1000)*1000) - timerCurrVal ) );
  }
}

function ObjInlineActionMute() {
    if (this.iType == 'flashvid') 
	{
      if (is.useHTML5Video()){	
		var medobj = getHTMLEleByID('html5' + this.name);
		if (medobj)			
			medobj.muted=true;
		}else{
        if (!this.flsPlayer) this.setFlashPlayer()

        this.flsPlayer.sendEvent('MUTE', 'true');
		}
        this.muteState = true;
    }
	else if(this.iType == 'youtube')
	{
		this.YTPlayer.mute();
	}
}

function ObjInlineActionUnmute() {
    if (this.iType == 'flashvid') 
	{
      if (is.useHTML5Video()){	
		var medobj = getHTMLEleByID('html5' + this.name);
		if (medobj)			
			medobj.muted=false;
		}else{
        if (!this.flsPlayer) this.setFlashPlayer()

        this.flsPlayer.sendEvent('MUTE', 'false');
		}
        this.muteState = false;
    }
	else if(this.iType == 'youtube')
	{
		this.YTPlayer.unMute();
	}
}

{ // Setup prototypes
var p=ObjInline.prototype
p.addParm = ObjInlineAddParm
p.build = ObjInlineBuild
p.init = ObjInlineInit
p.activate = ObjInlineActivate
p.up = ObjInlineUp
p.down = ObjInlineDown
p.over = ObjInlineOver
p.out = ObjInlineOut
p.capture = 0
p.onOver = new Function()
p.onOut = new Function()
p.onSelect = new Function()
p.onDown = new Function()
p.onUp = new Function()
p.onRUp = new Function()
p.actionGoTo = ObjInlineActionGoTo
p.actionGoToNewWindow = ObjInlineActionGoToNewWindow
p.actionPlay = ObjInlineActionPlay
p.actionStop = ObjInlineActionStop
p.actionShow = ObjInlineActionShow
p.actionHide = ObjInlineActionHide
p.actionShowAudio = ObjInlineActionShowAudio
p.actionHideAudio = ObjInlineActionHideAudio
p.actionLaunch = ObjInlineActionLaunch
p.actionExit = ObjInlineActionExit
p.actionChangeContents = ObjInlineActionChangeContents
p.actionTogglePlay = ObjInlineActionTogglePlay
p.actionToggleShow = ObjInlineActionToggleShow
p.writeLayer = ObjInlineWriteLayer
p.onShow = ObjInlineOnShow
p.onHide = ObjInlineOnHide
p.onShowAudio = ObjInlineOnShowAudio
p.onHideAudio = ObjInlineOnHideAudio
p.isVisible = ObjInlineIsVisible
p.onSelChg = new Function()
p.addChild = ObjInlineAddChild
p.doTrans = ObjInlineDoTrans
p.sizeTo  = ObjInlineSizeTo
p.goToFrame     = ObjInlineGoToFrame
p.goToNextFrame = ObjInlineGoToNextFrame
p.goToPrevFrame = ObjInlineGoToPrevFrame
p.goToLabel     = ObjInlineGoToLabel
p.getFlashVar   = ObjInlineGetFlashVar
p.setFlashVar   = ObjInlineSetFlashVar
p.getAcualWidth = ObjInlineGetActualWidth
p.getNS         = ObjInlineGetNS
p.getFlashVars  = ObjInlineGetFlashVar
p.actionPause	= ObjInlinePause
p.actionDone	= ObjInlineDone
p.offset        = ObjInlineOffset
p.moveGrp       = ObjInlineMoveGrp
p.transGrp      = ObjInlineTransGrp
p.setPlayState  = ObjInlinefSetPlayState
p.onDone		= new Function() 
p.isDone        = ObjInlineIsDone
p.setFlashPlayer = ObjInlineSetFlashPlayer
p.displayDynText = ObjInlineDisplayDynText
p.actionMute = ObjInlineActionMute
p.actionUnmute = ObjInlineActionUnmute
p.disable = ObjInlineDisableChild
p.randomize = ObjInlineRandomize
p.addChoice = ObjInlineAddChoice
p.addEvent = ObjInlineAddEvent
p.loadProps = ObjLoadProps
p.respChanges = ObjRespChanges
p.addYouTubeParams = ObjInlineYouTubeParams
p.addYTScript = ObjInlineAddYouTubeAPI
p.createPlayer = ObjInlineCreatePlayer
p.stateChange = ObjInlinePlayerStateChange
p.setAutostart = ObjInlineaddAutoStart
p.reorgChoice = ObjInlineChoiceOrder
p.validateSrc = ObjInlineValidSource
p.addInnerStr = ObjInlineAddInnerStr
p.refresh = ObjInlineRefresh
p.setupWinEvents = ObjInlineSetupWinEvents
p.getCSS = ObjInlineGetCSS
p.rv = ObjInlineRV
p.initEvent = function()
{
	var THIS = this;
	
	if (is.useHTML5Video())
	{
		var html5VidObj = getHTMLEleByID("html5" + THIS.name);
	
		html5VidObj.addEventListener("timeupdate", 
			function () 
			{
				for (var i=0; i < THIS.arrEvents.length; i++) 
				{
					if (!(THIS && html5VidObj))
						return;
					var trivEvent = THIS.arrEvents[i];
					if (!trivEvent.proc && 
						html5VidObj.currentTime >= trivEvent.time && 
						html5VidObj.currentTime <= html5VidObj.duration)
					{
						trivEvent.proc = true;
						window[trivEvent.func]();
					}
				}
				if (!(THIS && THIS.clearEventsFlag))
						return;
				THIS.clearEventsFlag(html5VidObj.currentTime)
			},	false);
			
		html5VidObj.addEventListener("ended", 
			function (){ THIS.clearEventsFlag(-1) },	false
		);
	}		
};

p.clearEventsFlag = function(pos) 
{
    for (var i = 0; i < this.arrEvents.length; i++) 
	{
		var ev = this.arrEvents[i];
        if (ev.proc && pos < ev.time)
            ev.proc = false;
    }
};

}

function ObjInlineBuild() {
  this.loadProps();
  
  this.css = this.getCSS();
  	
  this.bInherited = checkObjectInheritance(this)
  
  if(this.bInherited)
	  return;

  var divStart
  var divEnd
  divStart = '<' + this.divTag + ' id="'+this.name+'"'
  if( this.addClasses ) divStart += ' class="'+this.addClasses+'"'
  if( this.altName ) divStart += ' alt="'+this.altName+'"'
  else { if( this.altName != null ) divStart += ' alt=""' }
  divStart += '><a name="'+this.name+'anc"'
  if( this.hasOnUp ) divStart += ' href="javascript:' +this.name+ 'Object.onUp()"'
  divStart += '>'
  divEnd   = '</a></' + this.divTag + '>'
  this.div = divStart + '\n' + divEnd + '\n'
  
  this.div = CreateHTMLElementFromString(this.innerTxt ? this.innerTxt : this.div);
}

function ObjInlineInit() {
  this.objLyr = new ObjLayer(this.name, null, null, this.innerTxt?this.div:getDisplayDocument(true).getElementById(this.name))
  if(!isSinglePagePlayerAvail() && !window.bTrivResponsive) adjustForFixedPositon(this);
}

function ObjInlineActivate() {
  if( this.objLyr && this.objLyr.styObj && !this.alreadyActioned ) {
    if( this.isGrp ) {
      if( this.v ) {
        for ( var i=0; i<this.childArray.length; i++ )
        {
          if ( eval( this.childArray[i] + ".isVisible()") )
            eval( this.childArray[i] + ".actionShow()");
        }
      }
    }
    else{
      if( this.v ) this.actionShow(true); //Pass true to indicate show from activate
	  
	  if( IsHiddenAudioObj(this) ) this.actionHideAudio();
	}
  }
  if(!this.bInherited)
  {
	  if( this.capture & 4 ) {
		this.objLyr.ele.onmousedown = new Function("event", this.obj+".down(event); return false;")
		this.objLyr.ele.onmouseup = new Function("event", this.obj+".up(event); return false;")
	  }
	  if( this.capture & 1 ) this.objLyr.ele.onmouseover = new Function(this.obj+".over(); return false;")
	  if( this.capture & 2 ) this.objLyr.ele.onmouseout = new Function(this.obj+".out(); return false;")

	
		if( this.numParms ) 
		{
			var str = "";
			for (var i=0; i < this.numParms; i++) 
				str = str + this.parmArray[i]
			if( is.ns5 ) 
				this.objLyr.ele.innerHTML = str
			else 
				this.objLyr.write( str );
		}
	
	  if(this.iType == 'flashvid'&&is.useHTML5Video()){
		 var funcOnDone=0;
		 try{funcOnDone=eval( this.name + 'onDone' );}catch(error){}
		 var medobj = getChildNodeByID(this.objLyr.ele, 'html5' + this.name);
		 if(medobj&&funcOnDone) medobj.addEventListener('ended', funcOnDone, false);
	  }
	  try {
		if( is.ie && is.v<=7 && this.objLyr.ele.getElementsByTagName )
		{
		  var paraElems = this.objLyr.ele.getElementsByTagName("P");
		  for ( var idx=0; paraElems && idx<paraElems.length; idx++ )
		  {
			if (paraElems[idx] && paraElems[idx].legLH )
				paraElems[idx].style.lineHeight = paraElems[idx].legLH;
		  }	
		}
	  } catch(err) {}
  }
  if(this.iType =='youtube')
  {
	  if(is.YTScriptLoaded)
		  this.createPlayer();
	  else
	  {
		  var THIS = this;
		  setTimeout(function(){THIS.createPlayer();},500)
	  }
  }
  
  if(IsMedia(this) && this.v && this.bAutoStart && !this.bInherited)
	  this.actionPlay();
  
  this.objLyr.theObj = this;
	// LD-5589 this.div is used for Anchoring, and it was not being kept up to date
  this.div = this.objLyr.ele;
  var tempObj = {xOffset:0, yOffset:0, width: this.w, height: this.h, xOuterOffset:0, yOuterOffset:0};
  AdjustIFrameSize(this, tempObj);

  this.objLyr.updateTabIndex(this.objLyr);
}

function ObjInlineDown(e) {
  if( is.ie ) e = event || e
  if( is.ie && !is.ieMac && e.button != 0 && e.button!=1 && e.button!=2 ) return
  if( is.ieMac && e.button != 0 ) return
  if( is.ns && e.button!=0 && e.button!=2 ) return
  this.onSelect()
  this.onDown()
}

function ObjInlineUp(e) {
  if( is.ie ) e = event || e
  if( is.ie && !is.ieMac && e.button != 0 && e.button!=1 && e.button!=2 ) return
  if( is.ieMac && e.button!=0 ) return
  if( is.ns && !is.nsMac && e.button!=0 && e.button!=2 ) return
  if( e.button==2 )
  {
    if( this.hasOnRUp )
    {
      getDisplayDocument().oncontextmenu = ocmNone
      this.onRUp()
      setTimeout( "getDisplayDocument().oncontextmenu = ocmOrig", 100)
    }
  }
  else if( this.hasOnUp )
    this.onUp()
}

function ObjInlineOver() {
  this.onOver()
}

function ObjInlineOut() {
  this.onOut()
}

function ObjInlineWriteLayer( newContents ) {
  if (this.objLyr) this.objLyr.write( newContents )
}

function ObjInlineOnShow(bFromActivate) {
  this.alreadyActioned = true;
  this.objLyr.actionShow(bFromActivate);
  for ( var i=0; i<this.childArray.length; i++ )
  {
    if ( !eval( this.childArray[i] + ".isVisible()") )
      eval( this.childArray[i] + ".actionShow()");
  }
  
  if( this.matchObj )
	this.drawLine();
}

function ObjInlineOnHide() {
  this.alreadyActioned = true;
  for ( var i=0; i<this.childArray.length; i++ )
     eval( this.childArray[i] + ".actionHide()");
  this.objLyr.actionHide();

  if( this.matchLine )
	  this.matchLine.ResizeTo( -10, -10, -10, -10 );
  
  if( this.objLyr.doc.forms.length > 0 && this.objLyr.doc.forms[0].blur )
    this.objLyr.doc.forms[0].blur();
}

function ObjInlineOnShowAudio(){
  this.alreadyActioned = true;
  this.objLyr.actionShowAudio(this.x);
  for ( var i=0; i<this.childArray.length; i++ )
  {
    if ( !eval( this.childArray[i] + ".isVisible()") )
      eval( this.childArray[i] + ".actionShowAudio(" + this.x + ")");
  }
  
  if( this.matchObj )
	this.drawLine();
}

function ObjInlineOnHideAudio(){
  this.alreadyActioned = true;
  for ( var i=0; i<this.childArray.length; i++ )
     eval( this.childArray[i] + ".actionHideAudio()");
  this.objLyr.actionHideAudio();

  if( this.matchLine )
	  this.matchLine.ResizeTo( -10, -10, -10, -10 );
  
  if( this.objLyr.doc.forms.length > 0 && this.objLyr.doc.forms[0].blur )
    this.objLyr.doc.forms[0].blur();
}

function ObjInlineIsVisible() {

  //echo LD-975: Audio object DOM elements are always visible. The inline object is what keeps track of it's hidden state. 
  if(IsAudioObj(this) && IsHiddenAudioObj(this))
	return false;
	
  if( this.objLyr.isVisible() )
    return true;
  else
    return false;
}

function ObjInlineDoTrans(tOut,tNum,dur,fn,ol,ot,fl,ft,fr,fb,il) {
  if( !this.isVisible() )
  {
    for ( var i=0; i<this.childArray.length; i++ )
    {
      if ( !(eval( this.childArray[i] + ".isVisible()")) )
        eval( this.childArray[i] + ".actionShow()");
    }
  }
  this.objLyr.doTrans(tOut,tNum,dur,fn,ol,ot,fl,ft,fr,fb,il);
}

function ObjInlineOffset( off ) {
  var maxY = 0;
  for ( var i=0; i<this.childArray.length; i++ )
  {
     var obj = eval( this.childArray[i] )
     obj.objLyr.moveBy( null, off );
     var bottom = obj.objLyr.ele.offsetTop + obj.objLyr.ele.offsetHeight;
     if( maxY < bottom ) maxY = bottom;
  }
  
  return maxY;
}

function ObjInlineMoveGrp( x, y, objNameArr ) {
  if( !objNameArr)
    objNameArr = new Array();
  else
    objNameArr = eval(objNameArr);
    
  if( this.isGrp ) {
    for ( var i = 0; i < this.childArray.length; i++ ) {
      var obj = eval( this.childArray[i] )
      
      if (i == 0 ) {
        smallX = obj.x;
        smallY = obj.y;
      }
      
      // ** Get smallest x position
      if( smallX > obj.x )
      	smallX = obj.x;
      
      // ** Get smallest y position
      if( smallY > obj.y )
        smallY = obj.y;
    }
    
    var isLeft = false;
    var isUp   = false;
    
    var xVal = Math.abs(smallX - x);
    if( smallX > x ) isLeft = true;
    
    var yVal = Math.abs(smallY - y);
    if( smallY > y ) isUp = true;
    
    // ** move each obj
    for ( var i = 0; i < this.childArray.length; i++ ) {
      var currPosX = obj.x;
      var currPosY = obj.y
      var obj = eval( this.childArray[i] )
      if( isLeft ) currPosX = obj.x - xVal;
      else         currPosX = obj.x + xVal;
      
      if( isUp )   currPosY = obj.y - yVal;
      else         currPosY = obj.y + yVal;
      
      for ( var j = 0; j < objNameArr.length; j++ ) {
	      if( obj.name == objNameArr[j]) {
	      	var myObj = eval(objNameArr[j]);
	      	myObj.moveTo(currPosX,currPosY);
	      	myObj.hasMoved = true;
            myObj.newX = currPosX;
            myObj.newY = currPosY;
	  	  }
  	  }
      obj.objLyr.moveTo(currPosX,currPosY);
      obj.objLyr.hasMoved = true;
      obj.objLyr.newX = currPosX;
      obj.objLyr.newY = currPosY;
      
    }
  }
}

function ObjInlineTransGrp( tOut, tNum, dur, x, y, objNameArr ) {
  if( !objNameArr)
    objNameArr = new Array();
  else
    objNameArr = eval(objNameArr);
    
  if( this.isGrp ) {
    for ( var i = 0; i < this.childArray.length; i++ ) {
      var obj = eval( this.childArray[i] )
      
      if (i == 0 ) {
        smallX = obj.x;
        smallY = obj.y;
      }
      
      // ** Get smallest x position
      if( smallX > obj.x )
      	smallX = obj.x;
      
      // ** Get smallest y position
      if( smallY > obj.y )
        smallY = obj.y;
    }
    
    var isLeft = false;
    var isUp   = false;
    
    var xVal = Math.abs(smallX - x);
    if( smallX > x ) isLeft = true;
    
    var yVal = Math.abs(smallY - y);
    if( smallY > y ) isUp = true;
    
    // ** move each obj
    for ( var i = 0; i < this.childArray.length; i++ ) {
      var currPosX = obj.x;
      var currPosY = obj.y
      var obj = eval( this.childArray[i] )
      if( isLeft ) currPosX = obj.x - xVal;
      else         currPosX = obj.x + xVal;
      
      if( isUp )   currPosY = obj.y - yVal;
      else         currPosY = obj.y + yVal;
      
      for ( var j = 0; j < objNameArr.length; j++ ) {
	      if( obj.name == objNameArr[j]) {
	      	var myObj = eval(objNameArr[j]);
	      	myObj.doTrans(1,tNum,dur,null,myObj.x,myObj.y,currPosX,currPosY,0,0,0);
	      	myObj.hasMoved = true;
            myObj.newX = currPosX;
            myObj.newY = currPosY;
	  	  }
  	  }
      obj.objLyr.doTrans(tOut,tNum,dur,null,obj.objLyr.x,obj.objLyr.y,currPosX,currPosY,0,0,0);
      obj.objLyr.hasMoved = true;
      obj.objLyr.newX = currPosX;
      obj.objLyr.newY = currPosY;
      
    }
  }
}

function ObjInlinefSetPlayState() {
  var playerStatus = null;
  
  if (is.activeX)
    playerStatus = eval("getDisplayDocument()."+this.name+"obj"+".controls.playState");
  else
    playerStatus = eval("getDisplayDocument()."+this.name+"obj"+".controls.GetPlayState()");
  
  if( playerStatus ) {
      switch( playerStatus ) {
        case 0:
            // ** The playback state is undefined
        case 1:
            // ** Playback is stopped
        case 2:
            // ** Playback is paused
        case 6:
            // ** The player is buffering media
        case 7:
            // ** The player is waiting for streaming data
        case 8:
            // ** The player has reached the end of the media
        case 9:
            // ** The player is preparing new media
        case 10:
            // ** The player is ready to begin playback
            this.isPlaying = false;
            break;
        
        case 3:
            // ** The player is playing a stream
        case 4:
            // ** The player is scanning a stream forward
        case 5:
            // ** The player is scanning a stream in reverse
            this.isPlaying = true;
            break;
      }
  }
}

function ObjInlineIsDone()
{
	try
	{
		if(! this.flsPlayer )
		this.setFlashPlayer()

		if(this.flsPlayer){
			var currFrame = parseInt(this.flsPlayer.CurrentFrame())+1;
			var lastFrame;

			if( is.ie ) 
				lastFrame = parseInt(this.flsPlayer.TotalFrames);
			else       
				lastFrame = parseInt(this.flsPlayer.TotalFrames());

			if( currFrame >= lastFrame) {
				this.onDone()
				window.clearInterval(this.hasDone)
			}
		}
	}
	catch (e)
	{
	}
}

function ObjInlineSetFlashPlayer() {
    if( is.ie ) this.flsPlayer = eval( "document.swf" + this.name );
    else        this.flsPlayer = this.getNS("object");
}

function ObjInlineDisplayDynText( value, fntId ) {
    getHTMLEleByID(this.objLyr.id).innerHTML = value;
}

function ObjInlineDisableChild(e) {
    for (var i = 0; i < this.childArray.length; i++) {
        var elem = getHTMLEleByID(this.childArray[i] + "id");
        if (elem) elem.disabled = e;
		else
		{
			elem = getHTMLEleByID(this.childArray[i]);
			if( elem ) elem.disabled = e;
		}
    }
}

function ObjInlineRandomize(bUseOrder) {
    var ctrlPlacement;
    var placementArr = new Array();
    var objBtnArr = new Array();
    var objTxtArr = new Array();
    var objImgArr = new Array();
    var dX = 0;
    var dY = 0;
    for (var i = 0; i < this.arrChoice.length; i++) {
        //if (i == 0) continue;
        var elem = getHTMLEleByID(this.arrChoice[i].btn);
        if (elem) {
            if (this.arrChoice[i].btn.indexOf("check") != -1 || this.arrChoice[i].btn.indexOf("radio") != -1 || this.arrChoice[i].btn.indexOf("combo") != -1) {
                ctrlPlacement = new Object();
                ctrlPlacement.ctrlY = elem.offsetTop;
                ctrlPlacement.ctrlX = elem.offsetLeft;
                objBtnArr[objBtnArr.length] = elem;
                elem = getHTMLEleByID(this.arrChoice[i].txt);
                if (elem) {
                    ctrlPlacement.txtY = elem.offsetTop;
                    ctrlPlacement.txtX = elem.offsetLeft;
                    objTxtArr[objTxtArr.length] = elem;
                    dX = elem.offsetLeft + elem.offsetWidth + 10;
                    dY = elem.offsetTop;
                }
                elem = getHTMLEleByID(this.arrChoice[i].img);
                if (elem) {
                    ctrlPlacement.imgY = elem.offsetTop;
                    ctrlPlacement.imgX = elem.offsetLeft;
                    objImgArr[objImgArr.length] = elem;
                } else {
                    ctrlPlacement.imgY = dY;
                    ctrlPlacement.imgX = dX;
                    objImgArr[objImgArr.length] = null;
                }
                placementArr[placementArr.length] = ctrlPlacement;
            }
        }
    }

    if(!bUseOrder)
	{
		var tmpPlacementArr = placementArr.slice();
		placementArr = shuffle(placementArr);
		this.quOrd = [];
		
		for (var i = 0; i < tmpPlacementArr.length; i++) 
		{
			for(var j = 0; j < placementArr.length; j++)
			{
				if(tmpPlacementArr[i] == placementArr[j])
				{
					this.quOrd[i] = j;
					break;
				}	
			}			
		}
	}
	
    for (var i = 0; i < placementArr.length; i++) {
		var placementIndex = (bUseOrder?this.quOrd[i]:i);
        var e = objTxtArr[placementIndex];
		var obj = null;
        if (e) {
            e.style.top = placementArr[i].txtY + "px";
            e.style.left = placementArr[i].txtX + "px";
			obj = eval(e.id+'Object')
			if(obj && obj.objLyr)
				obj.objLyr.hasMoved = true;
        }
        e = objBtnArr[placementIndex];
        if (e) {
            e.style.top = placementArr[i].ctrlY + "px";
            e.style.left = placementArr[i].ctrlX + "px";
			obj = eval(e.id+'Object')
			if(obj && obj.objLyr)
				obj.objLyr.hasMoved = true;
        }
        e = objImgArr[placementIndex];
        if (e) {
            e.style.top = placementArr[i].imgY + "px";
            e.style.left = placementArr[i].imgX + "px";
			obj = eval(e.id+'Object')
			if(obj && obj.objLyr)
				obj.objLyr.hasMoved = true;
        }
    }


}

function ObjInlineAddChoice(b,t,i) {
	var choice = new Object();
	choice.btn = b;
	choice.txt = t;
	choice.img = i;
	this.arrChoice[this.arrChoice.length] = choice;
}

function shuffle(array) {
    var tmp, current, top = array.length;
    if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
    return array;
}


function ObjInlineAddEvent(time, fn) {
    var TrivEvent = new Object();
    TrivEvent.time = time;
    TrivEvent.func = fn;
    TrivEvent.proc = false;
    this.arrEvents[this.arrEvents.length] = TrivEvent;

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
            if( typeof(obj.fsize) != "undefined" )
                this.fsize = obj.fsize;
			
			if(this.x > GetPageWidth() || ((this.x + this.w) < 0))
				this.bOffPage = true;
			else
				this.bOffPage = false;
		}
	}
}

function ObjRespChanges()
{
	var tempObj = {xOffset:0, yOffset:0, width: this.w, height: this.h, xOuterOffset:0, yOuterOffset:0};
		
	AdjustAttributesForEffects(this, tempObj);
	
	AdjustIFrameSize(this, tempObj);
	
	var svgFilterTag = getHTMLEleByID(this.name+"Shadow");
	
	if(svgFilterTag)
		ModifySVGShadow(this, tempObj);
	
	if(this.iType === "youtube")
	{ 
	  var vidTag = getHTMLEleByID("html5"+this.name);
	  if(vidTag)
	  {
		vidTag.width = this.w;
		vidTag.height = this.h;
	  }
	}
	
	
	FindAndModifyObjCSSBulk(this);
}

function IsHiddenAudioObj(audObj){
	if(audObj.obj.indexOf("audio") > -1 && !audObj.v)
		return true;
		
	return false;
}

function IsAudioObj(audObj){
	if( audObj.obj.indexOf("audio") > -1 )
		return true;
	
	return false;
}

function IsMedia(obj)
{
	if(obj.iType == 'flashvid' || obj.iType == 'flash' || obj.iType == 'wmp' ||obj.iType == 'youtube')
		return true;
	
	return false;
}

function IsRSSFeed(obj){
	if( obj.name.indexOf("webwidget") > -1 )
	{
		var div = getHTMLEleByID(obj.name);
		if(div)
		{
			if(div.innerHTML.indexOf("feedControl") >-1)
				return true;
		}
	}
	
	return false;
}

function ObjInlineYouTubeParams(videoID, autoplay, controls, loop)
{
	this.vID = videoID;
	this.bLoop = loop;
	this.ytVar = {'autoplay':autoplay, 'controls':controls, rel: 0};
}

function ObjInlineAddYouTubeAPI(scriptURL)
{
	AddFileToHTML(scriptURL, 'script', 'onYouTubeIframeAPIReady()', null, getDisplayDocument());
}

function ObjInlineCreatePlayer()
{
	if(is.YTScriptLoaded)
	{
		if(window.trivPlayer)
		{
			this.YTPlayer = trivPlayer.createMediaElemPlayerYoutube(null, null, this);
		}
		else
		{
			this.YTPlayer = new YT.Player('html5'+this.name, 
			{
				height: this.h,
				width: this.w,
				videoId: this.vID,
				playerVars: this.ytVar,
				events: { 'onStateChange': this.stateChange}		
			});
		}
		this.YTPlayer.__TrivantisObject__ = this;
	}
	else
	{
		var THIS = this;
		setTimeout(function(){THIS.createPlayer();},500)
	}
}

function ObjInlinePlayerStateChange(event)
{
	var funcOnDone=0;
	var obj = event.target.__TrivantisObject__;
	try{funcOnDone=eval( obj.name + 'onDone' );}catch(error){}
	switch(event.data) 
	{
        case 0:
		{
			if(funcOnDone)
				funcOnDone(obj);
			else if(obj.bLoop)
				obj.YTPlayer.playVideo();
			break;
		}
	}
}

function ObjInlineaddAutoStart(bAutostart)
{
	this.bAutoStart = bAutostart;
}

function AdjustIFrameSize(obj, sizeObj)
{
	var iFrame = null;
	iFrame = getHTMLEleByID(obj.name+"iframe");
	if(iFrame)
	{
		iFrame.width = sizeObj.width;
		iFrame.height = sizeObj.height;
	}
}

function IsTextWithEffect(obj)
{
	if(typeof(ObjText) != "undefined" && obj.constructor == ObjText)
	{
	 if((typeof(obj.hasOuterShadow) != "undefined" && obj.hasOuterShadow) || 
	   (typeof(obj.hasBorder) != "undefined" && obj.hasBorder > 0)|| 
	   (typeof(obj.hasTextShadow) != "undefined" && obj.hasTextShadow))
	   return true;
	}
	
	return false;
}

function ObjInlineChoiceOrder()
{
	if(this.quOrd)
		this.randomize(true);
		
}

function ObjInlineValidSource()
{
	if(this.bOffPage)
	{
		this.bOffPage = false;
		if(this.iType == 'flashvid' || this.iType == 'flash' || this.iType == 'wmp')
			this.actionChangeContents('');
	}
}

function ObjInlineAddInnerStr(innerStr)
{
	this.innerTxt = this.innerTxt?this.innerTxt+innerStr:""+ innerStr;
}

function ObjInlineRefresh(){
	
	if(this.bInherited)
	{
		//If it is an inherited object the DIV might not reflect the correct dom element
		if(!this.div.parentElement)
			this.div = getHTMLEleByID(this.name);
		
		if( this.capture & 4 ) {
			this.objLyr.ele.onmousedown = new Function("event", this.obj+".down(event); return false;")
			this.objLyr.ele.onmouseup = new Function("event", this.obj+".up(event); return false;")
		}
		if( this.capture & 1 ) 
			this.objLyr.ele.onmouseover = new Function(this.obj+".over(); return false;")
		if( this.capture & 2 ) 
			this.objLyr.ele.onmouseout = new Function(this.obj+".out(); return false;")


		if(this.iType == 'flashvid'&&is.useHTML5Video()){
			var funcOnDone=0;
			try{funcOnDone=eval( this.name + 'onDone' );}catch(error){}
			var medobj = getChildNodeByID(this.objLyr.ele, 'html5' + this.name);
			if(medobj&&funcOnDone) 
				medobj.addEventListener('ended', funcOnDone, false);
		}
		try {
			if( is.ie && is.v<=7 && this.objLyr.ele.getElementsByTagName )
			{
				var paraElems = this.objLyr.ele.getElementsByTagName("P");
				for ( var idx=0; paraElems && idx<paraElems.length; idx++ )
				{
					if (paraElems[idx] && paraElems[idx].legLH )
						paraElems[idx].style.lineHeight = paraElems[idx].legLH;
				}	
			}
		} catch(err) {}
	}
	
	var iFrame = getDisplayDocument().getElementById(this.name + "iframe");
	if(iFrame)
	{
		iFrame.setAttribute('data-src',iFrame.src); // copy source to data attr
		iFrame.src=''; //empty the source
		iFrame.src = iFrame.getAttribute('data-src'); //re-add the source
		if(this.Score) this.Score.set('');
		if(this.Path) this.Path.set('0:');
	}
}

function ObjInlineSetupWinEvents(varScore, varPath, varPassFail, varDuration){
	var webWinObj = this;
	if(!is.ie8)
	{
		getDisplayWindow().addEventListener('message', function(event) {
			var data = JSON.parse(event.data);
			var messagedatatype = data.type;
			var iFrame = getDisplayDocument().getElementById(webWinObj.name + "iframe");
			if(iFrame && iFrame.contentWindow === event.source)
			{
				if(varScore)
					webWinObj.Score = varScore;
				if (messagedatatype=='branchtrack:player:scene' && data.details.scene) {
					
					//Scene score is how BT told us how to implement initially, but the correct score is found elsewhere
					//Playlog score is for their old player results score is their new one
					var newScore;
					newScore = data.details.scene.score == undefined ? "" : data.details.scene.score;

					if(data.details.playlog && data.details.playlog.score)
						newScore = data.details.playlog.score;

					if(data.details.results && data.details.results.score)
						newScore = data.details.results.score;

					varScore.set(newScore);
				}
				if (messagedatatype=='branchtrack:player:finish') {
						try{ 
							var onDoneFunc = eval( webWinObj.name + 'onDone' );
							onDoneFunc();
						}catch(e){}
				}

				if(varPath)
					webWinObj.Path = varPath;
				if(messagedatatype=='branchtrack:player:scene' && typeof(data.details.playlog.path_indexes)!='undefined') {
					varPath.set(data.details.playlog.path_indexes)
				}
				
			}
			// CVR ----------------------------
			// other available messagetype:
			//	'cenariovr:attempted'
			//	'cenariovr:experienced'
			//	'cenariovr:clicked'
			//	'cenariovr:answered'
			if (messagedatatype=='cenariovr:finish') {
				if(varScore)
					varScore.set(data.score);
				if(varPassFail)
					varPassFail.set(data.result);
				if(varDuration)
					varDuration.set(data.duration);
				if ( webWinObj.onDone )
					webWinObj.onDone();
			}
		})
	}
}

function ObjInlineGetCSS(){
	var css = '';
	var clipRect ='';
	var visible = this.v;
	var leftPos = this.x;

	//echo LD-975: Move the audio object WAY off of the page if it's initially hidden. Always keep the flash window visible. 
	//JB the audio can't be played in IE if it is not visible, and customers do this all the time.
	if( IsAudioObj(this) )
	{
		visible = true;

		if(IsHiddenAudioObj(this))
			leftPos = 10000;
	}
	
	if(this.clip == 2)
	{
		var adjW = this.w;
		var adjH = this.h;
		if(IsRSSFeed(this))
		{
			adjW+=2;
			adjH+=2;
		}		
		clipRect = 'clip: rect(0px ' + adjW + 'px ' + adjH + 'px 0px);';
	}
	else
		clipRect = 'noclip'; 

	if( this.bgColor || this.clip || this.iType)
		css = buildCSS(this.name,this.bFixedPosition,leftPos,this.y,this.w,this.h,visible,this.z,this.bgColor,clipRect)
	else
		css = buildCSS(this.name,this.bFixedPosition,leftPos,this.y,this.w,null,visible,this.z,this.bgColor)
	
	if(this.s == 1 && is.iOS)
	{
		var tempStr = css.substring(0, css.length-2);
		tempStr += '-webkit-overflow-scrolling: touch; overflow-y: scroll;';
		tempStr += '}\n';
		css = tempStr;
	}

	return css;
}

function ObjInlineRV(){
	this.loadProps();
	if(!window.bTrivResponsive)
	{
		this.h = this.oh;
		this.w = this.ow;
	}
	this.css = this.getCSS();
	this.refresh();
	if(this.objLyr && this.objLyr.ele)
	{
		for(var index = 0; index < this.objLyr.ele.style.length;index++)
		{
			var styleName = this.objLyr.ele.style[index];
			this.objLyr.ele.style[styleName]="";
		}
		if(!this.v)
			this.objLyr.ele.style.visibility = 'hidden';
	}
}