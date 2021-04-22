/**************************************************
Trivantis (http://www.trivantis.com)
**************************************************/

/* 
** If you want to enable a Debug Window that will show you status
** and debugging information for your HTML published content, 
** copy the file "trivantisdebug.html" from your Support Files directory
** (typically C:\Program Files\Trivantis\(Product Name)\Support Files
** and place in the root folder of your published content (next to this file)
** and then change the value of the trivDebug variable from 0 to 1
** (don't forget to save the modified file).
**
*/

var trivDebug      = 0;
var bDisplayErr    = true;
var trivAddMsgFunc = null;
var trivDebugWnd   = '';
var trivSaveMsg    = '';
var trivProtected  = false;
var trivWeb20Popups  = false;
var trivDynXMLfilePath = '';
var fOpacity = 100.0;
var playerPageID = ''; 


//Fill Styles : These values need to be kept in sync with typedef ShpFillInfo in ShapeUtils.h
var FILL_SOLID = 0;
var FILL_LINEARGRAD = 1;
var FILL_RADIALGRAD = 2;
var FILL_TEXTURE = 3;
var FILL_PICTURE = 4;

if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  }
}

function trivLogMsg( msg, level ) {
  if( level != null )
  {
    if( !(trivDebug & level )) return;
  }
  else if( !trivDebug ) return;
  var topWnd = findTrivLogMsg( window, true );
  if( topWnd.trivDebug ) {
    if( topWnd.trivDebugWnd && !topWnd.trivDebugWnd.closed && topWnd.trivDebugWnd.location )  {
      if( msg ) {
        if( topWnd.trivSaveMsg.length ) topWnd.trivSaveMsg += '<br />';
        topWnd.trivSaveMsg += msg;
      }
      if( topWnd.trivAddMsgFunc ) {
        msg = topWnd.trivSaveMsg;
        topWnd.trivSaveMsg = '';
        topWnd.trivAddMsgFunc( msg );
      }
    }
    else {
      topWnd.trivSaveMsg    = msg;
      topWnd.trivDebugWnd   = topWnd.open( 'trivantisdebug.html', 'TrivantisDebug', 'width=400,height=400,scrollbars=0,resizable=1,menubar=0,toolbar=0,location=0,status=0' )
      if( topWnd.trivDebugWnd ) {
        topWnd.trivDebugWnd.focus()
        setTimeout( "trivLogMsg()", 1000 );
      }
    }
  }
}

function findTrivLogMsg( win, bCheckOpener ) {

   if( bCheckOpener && win.opener && win.opener.trivLogMsg ) {
     return findTrivLogMsg( win.opener, false )
   }
   
   while( win ) {
     if( win.parent && win.parent != win && win.parent.trivLogMsg ) win = win.parent;
     else break;
   }
   return win;
}

function ObjLayer(id,pref,frame, divEle) {
  if (!ObjLayer.bInit && !frame) InitObjLayers()
  this.frame = frame || self
  if(divEle){
	if(divEle.id == id)
		this.ele = this.event = divEle;
	else{
		for(var i = 0 ; i < divEle.children.length ; i++){
			if(divEle.children[i].id == id)
				this.ele = this.event = divEle.children[i];
		}
	}
  }
  else 
	this.ele = this.event = getHTMLEleByID(id, this.frame);
  
  this.styObj = this.ele.style;
  
  this.doc = getDisplayDocument();
  this.reflectDiv = null;
  this.reflectObj = null;
  this.shadowObj =  null;
  this.shadowProp = null;
  this.x = this.ele.offsetLeft;
  this.origX = this.x
  this.y = this.ele.offsetTop;
  this.w = this.ele.offsetWidth;
  this.h = this.ele.offsetHeight;
  
  var bInherit = false;
  var obj = window[id+"Object"];
  if(obj)
	  bInherit = obj.bInherited;

  if(this.styObj && !bInherit) 
	  this.styObj.visibility = "hidden"
  this.id = id
  this.unique = 1;
  this.pref = pref
  this.obj = id + "ObjLayer"
  eval(this.obj + "=this")
  this.hasMoved = false;
  this.newX = null;
  this.newY = null;
  this.theObj = null;
  this.theObjTag = null;
  this.objDiv = null;
  this.eTran = -1;
}

function ObjLayerMoveTo(x,y) {
  if (x!=null) {
	var origX = this.x;
    this.x = x
	if(this.theObj)
		if(typeof this.theObj.validateSrc == 'function')
			this.theObj.validateSrc();
		
    if( this.styObj ) this.styObj.left = Math.round(this.x) + 'px';
	if(this.reflectDiv) 
	{
		if(this.theObj)
		{
			var xDiff = this.x-origX;
			this.theObj.reflectedImageX = this.theObj.reflectedImageX + xDiff;
			this.reflectDiv.style.left = this.theObj.reflectedImageX + 'px';
		}			
	}
  }
  if (y!=null) {
	var origY = this.y;
    this.y = y
	if(this.reflectDiv)
	{
		if(this.theObj)
		{
			var yDiff = this.y-origY;
			this.theObj.reflectedImageY = this.theObj.reflectedImageY + yDiff;
			this.reflectDiv.style.top = this.theObj.reflectedImageY + 'px';
		}
	}
    if( this.styObj ) this.styObj.top = Math.round(this.y) + 'px';
  }
  
  // Fly transitions or other moves off-page can produce a scrollbar.
  // currently objects moved off the page still maintain their view, this
  // causes a scrollbar to be shown on the page, if a user wants the object
  // to be hidden as soon as it leaves the page dimensions they can set the
  // following line in an external HTML object, header scripting:
  // window.trivHideOffPageObjects=true;
  //
  if (window.trivHideOffPageObjects)
  {
	  // hide it when it's outside the page div
	  var pageDiv = getHTMLEleByID(GetCurrentPageID());
	  var pageWidth = Math.max(pageDiv["clientWidth"],pageDiv["offsetWidth"]);
	  var pageHeight = Math.max(pageDiv["clientHeight"],pageDiv["offsetHeight"]);
	  this.styObj.display= ( 0 > (this.x+this.w) || pageWidth < this.x || 0 > (this.y+this.h) || pageHeight < this.y ) ? 'none' : '';  
  }
}

function ObjLayerMoveBy(x,y) {
  this.moveTo(Number(this.x)+Number(x),Number(this.y)+Number(y))
}

function ObjLayerClipInit(t,r,b,l) {
  if (arguments.length==4) 
	this.clipTo(t,r,b,l)
  else if(this.ele.offsetWidth <=0 ||  this.ele.offsetHeight<=0 || this.theObj)
  {
	if(this.theObj)
	{
		//LD-5271 Anchored objects may not be a part of the DOM when this function gets called.
		//This caused problems with the clip rect because offsetWidth is only calculated if the 
		//element is part of the DOM. Calling setfixed() here will add those elements to the DOM,
		//which will then cause offsetWidth and offsetHeight to be calculated.
		if( (this.ele.offsetWidth == 0 || this.ele.offsetHeight == 0) && this.theObj.bFixedPosition)
		{
			setfixed();
		}
		var effectAdjX = 0;
		var effectAdjY = 0;
		var effectAdjW = (typeof(this.ele.offsetWidth) == 'undefined' || this.ele.offsetWidth <=0)?this.theObj.w:this.ele.offsetWidth;
		var effectAdjH = (typeof(this.ele.offsetHeight) == 'undefined' || this.ele.offsetHeight<=0)?this.theObj.h:this.ele.offsetHeight;;

		if(this.theObj.name.indexOf("text") > -1) //TXT Obj Adj
		{
			var xOffset = 0;
			var yOffset = 0;
			var hOffset = 0;
			var wOffset = 0;
			if(this.theObj.hasOuterShadow > 0)
			{
				var outerRadians = (this.theObj.outerShadowDirection + this.theObj.r) * (Math.PI / 180.0);
				var xOuterOffset = this.theObj.outerShadowDepth * Math.cos(outerRadians);
				//Multiply by -1 because a negative offset means this shadow is in the positive y-direction on the screen
				var yOuterOffset = -1 * this.theObj.outerShadowDepth * Math.sin(outerRadians);

				xOffset = parseFloat(xOuterOffset.toFixed(5));
				yOffset = parseFloat(yOuterOffset.toFixed(5));
				xOffset += (((xOffset<0)?-2:2)*this.theObj.outerShadowBlurRadius);
				yOffset += (((yOffset<0)?-2:2)*this.theObj.outerShadowBlurRadius);
				hOffset = Math.abs(yOffset);
				wOffset = Math.abs(xOffset);
			}
			if(this.theObj.hasTextShadow > 0)
			{
				var textRadians = (this.theObj.textShadowDirection + this.theObj.r) * (Math.PI / 180.0);
				var xTextOffset = this.theObj.textShadowDepth * Math.cos(textRadians);
				//Multiply by -1 because a negative offset means this shadow is in the positive y-direction on the screen
				var yTextOffset = -1 * this.theObj.textShadowDepth * Math.sin(textRadians);
				
				if(xOffset !=0) //Has other effect
				{
					if(xOffset>0)
					{
						xOffset = parseFloat(xTextOffset.toFixed(5));
						xOffset += (((xOffset<0)?-2:2)*this.theObj.textShadowBlurRadius);
						if(xOffset <0 || wOffset < xOffset)
							wOffset +=(Math.abs(Math.abs(xOffset)-wOffset));//Add difference
					}
					else
					{
						if(xOffset > parseFloat(xTextOffset.toFixed(5)))
						{
							xOffset = parseFloat(xTextOffset.toFixed(5));
							xOffset += (((xOffset<0)?-2:2)*this.theObj.textShadowBlurRadius);
							wOffset = Math.abs(xOffset);
						}
					}
				}
				else
				{
					xOffset = parseFloat(xTextOffset.toFixed(5));
					xOffset += (((xOffset<0)?-2:2)*this.theObj.textShadowBlurRadius);
					wOffset = Math.abs(xOffset);
				}
				if(yOffset !=0)
				{
					if(yOffset>0)
					{
						yOffset = parseFloat(yTextOffset.toFixed(5));
						yOffset += (((yOffset<0)?-2:2)*this.theObj.textShadowBlurRadius);
						if(yOffset <0 || hOffset < yOffset)
							hOffset +=(Math.abs(Math.abs(yOffset)-hOffset));//Add difference
					}
					else
					{
						if(yOffset > parseFloat(yTextOffset.toFixed(5)))
						{
							yOffset = parseFloat(yTextOffset.toFixed(5));
							yOffset += (((yOffset<0)?-2:2)*this.theObj.textShadowBlurRadius);
							hOffset = Math.abs(yOffset);
						}
					}
				}
				else
				{
					yOffset = parseFloat(yTextOffset.toFixed(5));
					yOffset += (((yOffset<0)?-2:2)*this.theObj.textShadowBlurRadius);
					hOffset = Math.abs(yOffset);
				}
			}
			effectAdjX = ((xOffset<0)?xOffset:0);
			effectAdjY = ((yOffset<0)?yOffset:0);
			effectAdjW += wOffset;
			effectAdjH += hOffset;	
		}
		else //OtherObjAdjust
		{
			var xOffset = 0;
			var yOffset = 0;
			var hOffset = 0;
			var wOffset = 0;
			if(this.theObj.hasOuterShadow > 0)
			{
				var outerRadians = this.theObj.outerShadowDirection * (Math.PI / 180.0);
				var xOuterOffset = this.theObj.outerShadowDepth * Math.cos(outerRadians);
				//Multiply by -1 because a negative offset means this shadow is in the positive y-direction on the screen
				var yOuterOffset = -1 * this.theObj.outerShadowDepth * Math.sin(outerRadians);

				xOffset = parseFloat(xOuterOffset.toFixed(5));
				yOffset = parseFloat(yOuterOffset.toFixed(5));
				xOffset += (((xOffset<0)?-2:2)*this.theObj.outerShadowBlurRadius);
				yOffset += (((yOffset<0)?-2:2)*this.theObj.outerShadowBlurRadius);
				hOffset = Math.abs(yOffset);
				wOffset = Math.abs(xOffset);
			}
			else if(this.theObj.name.indexOf("button") >-1)
			{
				//BTN Adjustments
				effectAdjW += 5;
				effectAdjH += 2;	
			}
			effectAdjX = ((xOffset<0)?xOffset:0);
			effectAdjY = ((yOffset<0)?yOffset:0);
			effectAdjW += wOffset;
			effectAdjH += hOffset;	
		}
		this.clipTo(effectAdjY,effectAdjW,effectAdjH,effectAdjX)
	}
  }
  else
	this.clipTo(0,this.ele.offsetWidth,this.ele.offsetHeight,0)
}

function ObjLayerClipTo(t,r,b,l) {
  if( !this.styObj ) return;
  try{ this.styObj.clip = "rect("+t+"px "+r+"px "+b+"px "+l+"px)" } catch(e){}
  fixDIV = getDisplayDocument().getElementById('fixDIV');
  if( isSinglePagePlayerAvail() ){
	if( this.id == window.trivPlayer.activePage.div.id && fixDIV && this.styObj)
	{
	  fixDIV.style.clip = this.styObj.clip;
	}
  }
  else{
	if( this.id == "pageDIV" && fixDIV && this.styObj)
	{
	  fixDIV.style.clip = this.styObj.clip;
	  fixDIV.style.visibility = this.styObj.visibility;
	}
  }

}

function ObjLayerShowAudio(xPos){
	if(xPos && this.styObj){
		this.styObj.left = xPos.toString() + "px";
		this.styObj.visibility = "visible";  //echo LD-975: Move the audio object WAY off of the page if it's initially hidden. Always keep the flash window visible. 
											 //JB the audio can't be played in IE if it is not visible, and customers do this all the time.
	}
}

function ObjLayerHideAudio(){
  if( this.styObj ){ 
	this.styObj.left = "10000px";
	this.styObj.visibility = "visible";  //echo LD-975: Move the audio object WAY off of the page if it's initially hidden. Always keep the flash window visible. 
										 //JB the audio can't be played in IE if it is not visible, and customers do this all the time.
  }
}

function ObjLayerShow(bIsPage) {
  var bShow = true;
  
  if(bIsPage)
	  if(!isActivePage())
		  bShow = false;
  
  if( this.styObj ) 
  {
	if(bShow)
		this.styObj.visibility = "inherit";
	
	if(this.theObj && parseFloat(this.styObj.opacity) != parseFloat(this.theObj.opacity/100.0))
	{
		if(!(is.ie8 || is.ie9))
			this.styObj.opacity = this.theObj.opacity/100.0;
	}
  }
  if(this.reflectDiv) 
  {
	if(bShow)
		this.reflectDiv.style.visibility = "inherit";  
	
	if(this.eTran ==-1)
	{
		//echo bug 21701
		if(!(is.ie8 || is.ie9))
			this.reflectDiv.style.opacity = this.theObj.opacity/100.0;
	}
  }	
}

function ObjLayerHide() {
  if( this.styObj ) this.styObj.visibility = "hidden";
  if(this.reflectDiv && this.eTran == -1) this.reflectDiv.style.visibility = "hidden";
}
var __Triv_GoToNextPage__ = "";//FPFP: BUG20811
function ObjLayerActionGoTo( destURL, destFrame, subFrame, bFeed ) {
  var targWind = null
  var bFeedback = bFeed != null ? bFeed : true
  if( destFrame ) {
    if( destFrame == "opener" ) targWind = parent.opener;
    else if( destFrame == "_top" ) targWind = eval( "parent" ) 
    else if(destFrame == "NewWindow" ) targWind = open( destURL, 'NewWindow' )
    else {
      var parWind = eval( "parent" )
      var index=0
      while( index < parWind.length ) {
        if( parWind.frames[index].name == destFrame ) {
          targWind = parWind.frames[index]
          break;
        }
        index++;
      }
      if( subFrame ) {
        index=0
        parWind = targWind
        while( index < parWind.length ) {
          if( parWind.frames[index].name == subFrame ) {
            targWind = parWind.frames[index]
            break;
          }
          index++;
        }
      }
      try
      {
        if( !targWind.closed && targWind.trivExitPage ) {
          targWind.trivExitPage( destURL, bFeedback )
          return
        }
      }catch(e){}      
    }
  }
  if( !targWind ) targWind = window
  try
  {
    if( !targWind.closed && __Triv_GoToNextPage__ != destURL) 
	{
		//echo LD-4841: SPP thought it was loading a page when we were trying to send an email.
		if(!isSinglePagePlayerAvail() || destURL.indexOf("mailto:")==0 )
			targWind.location.href = destURL;
		else if (trivPlayer.bSkipFlag)
			trivPlayer.gotoPageSkip(destURL);
		else
			trivPlayer.gotoPage(destURL);
		
		if( is.awesomium ) 
        {
            __Triv_GoToNextPage__ = destURL;
            if (destURL.indexOf("mailto:")==0)
            {
                 var mailDest = destURL + "?subject= " +"&body= ";
                 try{app.openFile(mailDest);}catch(e){}
            }
        }
		//if(console && console.log) console.log("ObjLayerActionGoTo: " + destURL + "\n");
	}
  }catch(e){
	__Triv_GoToNextPage__ = "";
	if(console && console.error)
	{
		console.error("Error loading page:"+destURL);
		console.error(e.stack);
	}
  }      
}

function ObjLayerActionGoToNewWindow( destURL, name, props ) {
  var targWind
  if ((props.indexOf('left=') == -1) && (props.indexOf('top=') == -1)) props += GetNewWindXAndYPos( props );
  targWind = window.open( destURL, name, props, false )
  if( targWind ) targWind.focus()
  return targWind
}

function GetNewWindXAndYPos( props ) {
  var countOfW = 'width='.length
  var idxW = props.indexOf('width=');
  var wndW = GetMiddleString( props, countOfW + idxW, ',' )
  var countOfH = 'height='.length
  var idxH = props.indexOf('height=');
  var wndH = GetMiddleString( props, countOfH + idxH, ',' )  
  var wndX = (screen.width - wndW) / 2;
  var wndY = (screen.height - wndH) / 2;	
  return ',left=' + wndX + ',top=' + wndY;
}

function GetMiddleString( str, startIndex, endChar ) {
  var midStr = '';
  for (strIndex = startIndex; str.charAt(strIndex) != endChar; strIndex++) {
    midStr += str.charAt(strIndex);
  }  
  return midStr;
}

function ObjLayerActionPlay( ) {
}

function ObjLayerActionStop( ) {
}

function ObjLayerActionShow(bFromActivate) {
	this.show(bFromActivate);
}

function ObjLayerActionHide( ) {
    this.hide();
}

function ObjLayerActionShowAudio(xPos){
	this.showAudio(xPos);
}

function ObjLayerActionHideAudio() {
	this.hideAudio();
}

function ObjLayerActionLaunch( ) {
}

function ObjLayerActionExit( ) {
  if( this.frameElement && this.frameElement.id && this.frameElement.id.indexOf('DLG_content') == 0 )
    closeDialog();
  if( typeof bTrivRunView !== 'undefined' && window.myTop )
	LectoraInterface.titleExit();
  else if( typeof bTrivRunView === 'undefined' && window.myTop )
    window.myTop.close()
}

function ObjLayerActionChangeContents( ) {
}

function ObjLayerActionTogglePlay( ) {
}

function ObjLayerIsVisible() {
  if( !this.styObj || this.styObj.visibility == "hide" || this.styObj.visibility == "hidden" ) return false;
  else return true;
}

{ // Setup prototypes
var p=ObjLayer.prototype
p.moveTo = ObjLayerMoveTo
p.moveBy = ObjLayerMoveBy
p.clipInit = ObjLayerClipInit
p.clipTo = ObjLayerClipTo
p.show = ObjLayerShow
p.hide = ObjLayerHide
p.showAudio = ObjLayerShowAudio
p.hideAudio = ObjLayerHideAudio
p.actionGoTo = ObjLayerActionGoTo
p.actionGoToNewWindow = ObjLayerActionGoToNewWindow
p.actionPlay = ObjLayerActionPlay
p.actionStop = ObjLayerActionStop
p.actionShow = ObjLayerActionShow
p.actionHide = ObjLayerActionHide
p.actionShowAudio = ObjLayerActionShowAudio
p.actionHideAudio = ObjLayerActionHideAudio
p.actionLaunch = ObjLayerActionLaunch
p.actionExit = ObjLayerActionExit
p.actionChangeContents = ObjLayerActionChangeContents
p.actionTogglePlay = ObjLayerActionTogglePlay
p.isVisible = ObjLayerIsVisible
p.write = ObjLayerWrite
p.hackForNS4 = ObjLayerHackForNS4
p.getEle = ObjLayerGetElement
p.refresh = ObjLayerRefresh
p.updateTabIndex = ObjLayerUpdateTabIndex
}

// InitObjLayers Function
function InitObjLayers(pref) {
  if (!ObjLayer.bInit) ObjLayer.bInit = true
  if (is.ns) {
    if (pref) ref = eval('document.'+pref+'.document')
    else {
      pref = ''
      if( is.ns5 ) {
        document.layers = getDisplayDocument().getElementsByTagName("*")
        ref = document
      }
      else ref = document
    }
    for (var i=0; i<ref.layers.length; i++) {
      var divname
      if( is.ns5 ) {
        if( ref.layers[i] ) divname = ref.layers[i].tagName
        else divname = null
      }
      else divname = ref.layers[i].name
      if( divname ) {
        ObjLayer.arrPref[divname] = pref
        if (!is.ns5 && ref.layers[i].document.layers.length > 0) {
          ObjLayer.arrRef[ObjLayer.arrRef.length] = (pref=='')? ref.layers[i].name : pref+'.document.'+ref.layers[i].name
        }
      }
    }
    if (ObjLayer.arrRef.i < ObjLayer.arrRef.length) {
      InitObjLayers(ObjLayer.arrRef[ObjLayer.arrRef.i++])
    }
  }
  return true
}

ObjLayer.arrPref = new Array()
ObjLayer.arrRef = new Array()
ObjLayer.arrRef.i = 0
ObjLayer.bInit = false

function ObjLayerSlideEnd() {
  if (this.orgPos)
  {
	if( this.tTrans == 1 ) //LD-2088/LD-1043: if we are transitioning out, hide the object.
		this.hide();
	
	this.x = this.orgPos[0];
	this.ele.style.left = this.x+"px";
	this.y = this.orgPos[1];
	this.ele.style.top = this.y+"px";
	this.orgPos=0;
  }
  this.tTrans = -1;

  this.updateTabIndex(this);
}

function ObjLayerHackForNS4() {
  if( this.isVisible() )
  {
    this.hide()
    setTimeout( this.obj+".show()", 10 )
  }
}

function ObjLayerGetElement(tag){
	if(tag.indexOf("div") >-1)
	{
		if(this.isSVG)
		{
			return this.objDiv;
		}
		else
		{
			return this.ele;
		}
	}
	if(tag.indexOf("reflection") >-1)
	{
		return this.reflectDiv;
	}
}

function ObjLayerWrite(html) {
  this.event.innerHTML = html
}

function ObjLayerRefresh(divEle){
	this.ele = this.event = divEle;
	this.styObj = this.ele.style;
	if(this.styObj) this.styObj.visibility = 'hidden';
}

function ObjLayerUpdateTabIndex(objLayer){
	if(!objLayer.objDiv && !objLayer.ele)
		return;
	
	parDiv = objLayer.objDiv;
	
	var objDivAnchors = {};
	var objDivButtons = {};
	var objDivSelects = {};
	var objDivInputs = {};
	
	if(parDiv){
		objDivAnchors = parDiv.getElementsByTagName("a");
		objDivButtons = parDiv.getElementsByTagName("button");
		objDivSelects = parDiv.getElementsByTagName("select");
		objDivInputs = parDiv.getElementsByTagName("input");
	}
	
	parDiv = objLayer.ele;
	
	var eleAnchors = {};
	var eleButtons = {};
	var eleSelects = {};
	var eleInputs = {};
	var eleIframes = {};
	
	if(parDiv){
		eleAnchors = parDiv.getElementsByTagName("a");
		eleButtons = parDiv.getElementsByTagName("button");
		eleSelects = parDiv.getElementsByTagName("select");
		eleInputs = parDiv.getElementsByTagName("input");
		eleIframes = parDiv.getElementsByTagName("iframe");
	}
	
	if( isOffPage(objLayer)  ){
		for(var i = 0 ; i < objDivAnchors.length ; i++){
			objDivAnchors[i].tabIndex = -1;
		}

		for(var i = 0 ; i < objDivButtons.length ; i++){
			objDivButtons[i].tabIndex = -1;
		}

		for(var i = 0 ; i < objDivSelects.length ; i++){
			objDivSelects[i].tabIndex = -1;
		}

		for(var i = 0 ; i < objDivInputs.length ; i++){
			objDivInputs[i].tabIndex = -1;
		}
		
		for(var i = 0 ; i < eleAnchors.length ; i++){
			eleAnchors[i].tabIndex = -1;
		}

		for(var i = 0 ; i < eleButtons.length ; i++){
			eleButtons[i].tabIndex = -1;
		}

		for(var i = 0 ; i < eleSelects.length ; i++){
			eleSelects[i].tabIndex = -1;
		}

		for(var i = 0 ; i < eleInputs.length ; i++){
			eleInputs[i].tabIndex = -1;
		}

		for(var i = 0 ; i < eleIframes.length ; i++){
			eleIframes[i].tabIndex = -1;
		}
	}else{
		for(var i = 0 ; i < objDivAnchors.length ; i++){
			objDivAnchors[i].removeAttribute("tabindex");
		}

		for(var i = 0 ; i < objDivButtons.length ; i++){
			objDivButtons[i].removeAttribute("tabindex");
		}

		for(var i = 0 ; i < objDivSelects.length ; i++){
			objDivSelects[i].removeAttribute("tabindex");
		}

		for(var i = 0 ; i < objDivInputs.length ; i++){
			objDivInputs[i].removeAttribute("tabindex");
		}
		
		for(var i = 0 ; i < eleAnchors.length ; i++){
			eleAnchors[i].removeAttribute("tabindex");
		}

		for(var i = 0 ; i < eleButtons.length ; i++){
			eleButtons[i].removeAttribute("tabindex");
		}

		for(var i = 0 ; i < eleSelects.length ; i++){
			eleSelects[i].removeAttribute("tabindex");
		}

		for(var i = 0 ; i < eleInputs.length ; i++){
			eleInputs[i].removeAttribute("tabindex");
		}

		for(var i = 0 ; i < eleIframes.length ; i++){
			eleIframes[i].removeAttribute("tabindex");
		}
	}
}

function BrowserProps() {
  var name = navigator.appName
  var ua = navigator.userAgent.toLowerCase();
  
  if (name=="Netscape") name = "ns"
  else if (name=="Microsoft Internet Explorer") name = "ie"
  var getArElem = function(ar, idx, df)
	{
		if ( !ar || !ar.length || ar.length < idx + 1 )
			return df;

		return ar[idx];
	};
  this.nav = navigator;
  this.userLang = navigator.userLanguage || navigator.language;
  this.v = parseInt(navigator.appVersion,10)
  this.op = ua.indexOf("opera")!=-1
  this.ns = ((name=="ns" && this.v>=4)||this.op)
  this.ns4 = (this.ns && this.v==4)
  this.ns5 = ((this.ns && this.v==5)||this.op)
  this.nsMac = (this.ns && navigator.platform.indexOf("Mac") >= 0 )
  this.ie = (name=="ie" && this.v>=9)
  this.ie6 = (this.ie && navigator.appVersion.indexOf('MSIE 6')>0)
  if( this.ie ) this.v = parseInt( navigator.appVersion.substr( navigator.appVersion.indexOf('MSIE') + 5),10);
  this.quirksMode = (this.ie && document.documentMode == 5);
  this.ie8 = (this.ie && (document.documentMode == 8 || document.documentMode == 7 || document.documentMode == 6 || document.documentMode == 5));	//echo LD-774 : This is a bit of a hack but any document modes less than 8 will run through the same logic as IE8. 
  this.ie9 = (this.ie && document.documentMode == 9);
  this.ie9Native = (this.ie && navigator.userAgent.indexOf("MSIE 9.0") != -1 && navigator.userAgent.indexOf("Trident/5.0") != -1);
  this.ie10 = (this.ie && document.documentMode == 10);
  this.ie11 = (navigator.userAgent.indexOf("Trident") != -1);
  this.gecko = (ua.indexOf("gecko") != -1);
  this.firefox = (ua.indexOf("firefox") != -1);
  if(this.firefox) {
  this.ffVer = getArElem(ua.match(/firefox\/([^\s]+)/), 1, '');
  this.ffVerNum = ( parseFloat(this.ffVer.split('.').splice(0, 2).join('.')) );
  }
  this.ieMac = (this.ie && navigator.platform.indexOf("Mac") >= 0 )
  this.min = (this.ns||this.ie)
  this.Mac = (navigator.platform.indexOf("Mac") >= 0)
  this.activeX = ( this.ie ) ? true : false; 
  this.wmpVersion = 6; // default version number we only support 7 and up
  if( ua.indexOf("iphone")!=-1 || ua.indexOf("ipod")!=-1 || ua.indexOf("ipad")!=-1 ||
  (!ua.match(/i(phone|pad|os)/) && ua.match(/mac os/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2 ))
	this.iOS = 1;
  else
	this.iOS = 0;

  this.chrome = ua.indexOf("chrome") != -1;
  if(this.chrome){
  	this.chromeVer = getArElem(ua.match(/chrome\/([^\s]+)/), 1, '');
  	this.chromeVerNum = parseFloat(this.chromeVer.split('.').splice(0, 2).join('.'));
  }
  this.webkit = ua.indexOf(" applewebkit/") != -1;
  this.safari = ( navigator.vendor && navigator.vendor.indexOf('Apple') >= 0 ? true : false );
  if(this.safari) 
  	this.safariVer = getArElem(ua.match(/version\/([^\s]+)/), 1, '');
  this.iOSSafari = (this.safari && this.iOS);
  this.android = ua.indexOf("android") != -1;
  this.awesomium = ua.indexOf("awesomium") != -1;
  this.edge = (name=="ns" && navigator.appVersion.indexOf('Edge') > 0)
  this.ieAny = (this.ie || this.ie6 || this.ie8 || this.ie9 || this.ie9Native || this.ie10 || this.ie11)
  //For Responsive use
  this.clientProp = {orientation:"landscape", width:"1009", device:"Desktop"};
  this.jsonData = null;
  this.YTScriptLoaded = false;

  this.bSupportsClickMap = (!this.ie || // All non-IE browsers support click map
						   (!this.ie9 &&
							document.createElementNS != undefined &&
							document.createElementNS("http://www.w3.org/2000/svg", "path") &&
							document.createElement("BUTTON").addEventListener != undefined));

  //Barona Bug 21788 had to properly check IE11 for ActiveX
  if (this.ie8 || this.ie9) this.supportActiveX= window.ActiveXObject;
  else this.supportActiveX = (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject")) || ("ActiveXObject" in window);
  
  this.vml = IsVmlCheck(this.ie8 || this.ie9);
  this.svg = IsSvgCheck() && !this.vml;
  
  //echo LD-768 : Direct-X filters are disabled by default in IE10 and IE11 so they will not render legacy filters if we're running in a document mode of 8 or 9.
  this.DXFilterSupported = !(this.ie &&
							 (document.documentMode == 5 || document.documentMode == 6 || document.documentMode == 7 || document.documentMode == 8 || document.documentMode == 9) &&
							 (navigator.userAgent.indexOf("Trident/6.0") != -1 || navigator.userAgent.indexOf("Trident/7.0") != -1));
  
  var player = null;
  this.isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    AndroidNonTablet: function() {
        return this.Android() && navigator.userAgent.match(/Mobile/i) && !navigator.userAgent.match(/Kindle/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
	  iOS: function () {
		  return is.iOS;
	  },
	  iPhone: function () {
		  return navigator.userAgent.match(/iPhone/i);
	  },
	  iPhoneX: function () {
		  return this.iPhone() &&
			  (getDisplayWindow().screen.height == 812 || 	// iPhoneX 
				  getDisplayWindow().screen.height == 896);  	// iPhoneXR or iPhoneXS
	  },
	  iOSNonTablet: function () {
        return navigator.userAgent.match(/iPhone|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
    },
    anyPhone: function() {
        return (this.AndroidNonTablet() || this.BlackBerry() || this.iOSNonTablet() || this.Opera() || this.Windows());
    }
};

  try 
  {
    if(window.ActiveXObject)
      player = new ActiveXObject("WMPlayer.OCX.7");
    else if (window.GeckoActiveXObject)
      player = new GeckoActiveXObject("WMPlayer.OCX.7");
    else
      player = navigator.mimeTypes.length>0 ? navigator.mimeTypes["application/x-mplayer2"].enabledPlugin : null;		
  }
  catch(e)
  {
    // Handle error only if title has wmp-- no WMP control
 
  }
  
  if( player && player.versionInfo ) {
    this.wmpVersion = player.versionInfo.slice(0,player.versionInfo.indexOf('.'));
  }
	/*
	 * Use HTML5 if Flash is not present and browser is capable.
	 */
	this.useHTML5Video = function()
	{
		return ( !this.flashVersion(9,0,0) && supports_h264_baseline_video() ); 
	}
	this.useHTML5Audio = function()
	{
		return ( !this.flashVersion(9,0,0) && !!document.createElement('audio').canPlayType ); 
	}
	
	/*
	 * Flash detection
	 */
	var flashVer = -1;
	// When called with reqMajorVer, reqMinorVer, reqRevision returns t if that version or greater is available
	this.flashVersion = function (reqMajorVer, reqMinorVer, reqRevision)
	{
		if (flashVer == -1 ) 
		{
			var nav = navigator;

			// NS/Opera version >= 3 check for Flash plugin in plugin array

			if (nav.plugins != null && nav.plugins.length > 0) {
				if (nav.plugins["Shockwave Flash 2.0"] || nav.plugins["Shockwave Flash"]) {
					var swVer2 = nav.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
					var flashDescription = nav.plugins["Shockwave Flash" + swVer2].description;
					var descArray = flashDescription.split(" ");
					var tempArrayMajor = descArray[2].split(".");
					var versionMajor = tempArrayMajor[0];
					var versionMinor = tempArrayMajor[1];
					var versionRevision = descArray[3];
					if (versionRevision == "") {
						versionRevision = descArray[4];
					}
					if (versionRevision[0] == "d") {
						versionRevision = versionRevision.substring(1);
					} else if (versionRevision[0] == "r") {
						versionRevision = versionRevision.substring(1);
						if (versionRevision.indexOf("d") > 0) {
							versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
						}
					}
					flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
					//alert("flashVer="+flashVer);
				}
			}
			else if ( this.ie && !this.Mac && !this.op ) {

				var axo;
				// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry
				try {
					// version will be set for 7.X or greater players
					axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
					flashVer = axo.GetVariable("$version");
				} catch (e) {
				}

				if (!flashVer)
				{
					try {
						// version will be set for 6.X players only
						axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");

						// installed player is some revision of 6.0
						// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
						// so we have to be careful.

						// default to the first public version
						flashVer = "WIN 6,0,21,0";

						// throws if AllowScripAccess does not exist (introduced in 6.0r47)
						axo.AllowScriptAccess = "always";

						// safe to call for 6.0r47 or greater
						flashVer = axo.GetVariable("$version");

					} catch (e) {
					}
				}
			}
		}
		
		if (flashVer == -1 ) {
			return false;
		} else if (flashVer != 0) {
			var versionArray;
			if(this.ie && !this.Mac && !this.op) {
				// Given "WIN 2,0,0,11"
				var tempArray     = flashVer.split(" "); 	// ["WIN", "2,0,0,11"]
				var tempString        = tempArray[1];			// "2,0,0,11"
				versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
			} else {
				versionArray      = flashVer.split(".");
			}
			var versionMajor      = versionArray[0];
			var versionMinor      = versionArray[1];
			var versionRevision   = versionArray[2];

			// is the major.revision >= requested major.revision AND the minor version >= requested minor
			if (versionMajor > parseFloat(reqMajorVer)) {
				return true;
			} else if (versionMajor == parseFloat(reqMajorVer)) {
				if (versionMinor > parseFloat(reqMinorVer))
					return true;
				else if (versionMinor == parseFloat(reqMinorVer)) {
					if (versionRevision >= parseFloat(reqRevision))
						return true;
				}
			}
			return false;
		}
	};
	
	//Combining the two checks for HTML5
	this.useHTML5Media = (this.useHTML5Audio() || this.useHTML5Video());
	//WCAG Check
	this.bWCAG = ((document.head)?((document.head.innerHTML.indexOf("trivantis-focus.css")> -1)?true:false):((document.getElementsByTagName("head")[0].innerHTML.indexOf("trivantis-focus.css")> -1)?true:false));
}

is = new BrowserProps()

function getOrientation(){
	if( getDisplayWindow() && window.myTop ){
		try{
			var bReviewLink = window.myTop.document.getElementById('vBodyFrame');
			var height = getDisplayWindow(true).myTop.innerHeight;
			var width = getDisplayWindow(true).myTop.innerWidth;
			if(bReviewLink && typeof(getDisplayWindow().myTop)!='undefined' && getDisplayWindow().myTop._respView == 'Custom')
			{
				height = bReviewLink.clientHeight;
				width = bReviewLink.clientWidth;
			}
				
			
			if(is.isMobile.any())
			{
				return getOrientationFromAngle();
			}
			else
			{
				if(width == 0)
					width = getDisplayWindow(true).myTop.screen.availWidth;
				if(height == 0)
					height = getDisplayWindow(true).myTop.screen.availHeight;
			}
			
			return height >  width ? "portrait" : "landscape";
		}catch(e){
			if(e&&e.message)console.log( e.message );
			return self.innerHeight > self.innerWidth ? "portrait" : "landscape";
		}
	}else{
		return "";
	}
};

function getOrientationFromAngle(){
	var screenOri = '';
	var win = getDisplayWindow(true);
	var angle = win.orientation?win.orientation:0;

	if(is.isMobile.Android())
	{
		return myTop.innerHeight > myTop.innerWidth ? "portrait" : "landscape";
	}

	switch(angle) 
	{  
		case -90:  
		case 90: 
			if((window.baseOrientation.baseAngle == 0 || window.baseOrientation.baseAngle == 180) && window.baseOrientation.orientation == "landscape")
				screenOri = "portrait";
			else
				screenOri = "landscape";
        break;

		default:
			if((window.baseOrientation.baseAngle == 0 || window.baseOrientation.baseAngle == 180) && window.baseOrientation.orientation == "landscape")
				screenOri = "landscape";
			else
				screenOri = "portrait";
        break; 
    }
	return screenOri;
}

function getDevice(){
    return is.isMobile.anyPhone() ? "Phone" : is.isMobile.any() ? "Tablet" : "Desktop";
};
function getPhoneType(){
    return is.isMobile.Android() ? "Android " : 	(is.isMobile.iOS() ? "iOS " : 	(is.isMobile.Windows() ? "Windows " : 	(is.isMobile.BlackBerry() ? "BlackBerry " : "")));
};

function getScreenWidth()
{		
	var bReviewLink = window.myTop.document.getElementById('vBodyFrame');

	if(bReviewLink && typeof(getDisplayWindow().myTop)!='undefined' && getDisplayWindow().myTop._respView)
		return bReviewLink.clientWidth;


	if(is.isMobile.any()){
		if(is.isMobile.iOS() && isInFrameCopiedLO(getDisplayWindow())) {
			var scrW = getDisplayDocument().documentElement.clientWidth ? getDisplayDocument().documentElement.clientWidth : getDisplayDocument().body.clientWidth;
			return scrW;
		}
		else{
			if(getOrientation() == "landscape") 
				return getDisplayWindow().screen.height;
			else 
				return getDisplayWindow().screen.width;
		} 
	}
	if (getDisplayDocument().compatMode=='CSS1Compat')
	{
		if(getDisplayDocument().body)		
			return  getDisplayDocument().body.parentNode.clientWidth||getDisplayDocument().documentElement.clientWidth||getDisplayDocument().body.clientWidth||0;
		else if(getDisplayWindow().innerWidth)
			return getDisplayWindow().innerWidth || 0;
		else
			return getDisplayWindow().screen.width;
	}
	else 
	{
		if(getDisplayDocument().body)
			return getDisplayDocument().body.clientWidth;
		else
			return getDisplayWindow().screen.width;
	}
}
function getScreenHeight()
{
	var bReviewLink = window.myTop.document.getElementById('vBodyFrame');

	if(bReviewLink && typeof(getDisplayWindow().myTop)!='undefined' && getDisplayWindow().myTop._respView)
		return bReviewLink.clientHeight;

	if(is.isMobile.any()){
		if(getOrientation() == "landscape") 
			return screen.width;
		else 
			return screen.height;
	}
	if (getDisplayDocument().compatMode=='CSS1Compat') 
	{
		if(getDisplayDocument().body)
			return getDisplayDocument().body.parentNode.clientHeight;
		else
			return screen.height;
	}
	else 
		return getDisplayDocument().body.clientHeight;
}

function detect()
{
	if(typeof bTrivRunView !== 'undefined')
	{
		var currWidth;
		
		var cookies = document.cookie.split(/\W/);
		
		var index = cookies.indexOf("current_device");	
		var currDev = index >= 0 ? cookies[parseInt(index)+1] : is.clientProp.device;
		
		index = cookies.indexOf("current_device_orientation");
		var currOrient = index >= 0 ? cookies[parseInt(index)+1] : is.clientProp.orientation;
		
		index = cookies.indexOf("current_device_width");
		var currWidth = index >= 0 ? cookies[parseInt(index)+1] : is.clientProp.width;
			
		is.clientProp.device = currDev;
		is.clientProp.orientation = currOrient;
		is.clientProp.width = currWidth;
		
		if(window && window.TrivCurrRespView){
			var CurrRespView = currDev + currOrient;
			TrivCurrRespView.set(CurrRespView);
		}
		
		//If we're in a preview mode, return true because we set the client properties in C++ land on the window. 
		return true; 
	}


	var viewTL = 'TabletLandscape',
	viewTP = 'TabletPortrait',
	viewPL = 'PhoneLandscape',
	viewPP = 'PhonePortrait',
	devicePP = "Phone",
	devicePL = "Phone",
	deviceTP = "Tablet",
	deviceTL = "Tablet";
	widthPP = "480",
	widthPL = "785",
	widthTP = "785",
	widthTL = "1009";

	deviceTL = viewOverrideMap[viewTL] ? "Desktop" : deviceTL; 
	deviceTP = viewOverrideMap[viewTP] ? "Desktop" : deviceTP; 
	devicePP = viewOverrideMap[viewPP]  ?  deviceTP : devicePP; 
	devicePL = viewOverrideMap[viewPL]  ?  deviceTL : devicePL; 

	widthTL =  viewOverrideMap[viewTL] ? "1009" : widthTL; 
	widthTP =  viewOverrideMap[viewTP] ? "1009" : widthTP; 
	widthPP =  viewOverrideMap[viewPP]  ?  widthTP : widthPP; 
	widthPL =  viewOverrideMap[viewPL]  ?  widthTL : widthPL; 

	viewTL = viewOverrideMap[viewTL] || viewTL;
	viewTP = viewOverrideMap[viewTP] || viewTP;
	viewPL = viewOverrideMap[viewPL] ? viewTL : viewPL;
	viewPP = viewOverrideMap[viewPP] ? viewTP : viewPP;

  is.clientProp.device = getDevice();
  if( is.isMobile.anyPhone())
  {
    if(getOrientation() == "portrait")
	{	
		if(window && window.TrivCurrRespView)TrivCurrRespView.set( viewPP );
		
		is.clientProp.width = widthPP;
		is.clientProp.orientation = getOrientation();
		is.clientProp.device = devicePP;
	}
    else 
	{
		if(window && window.TrivCurrRespView)TrivCurrRespView.set( viewPL );
		
		is.clientProp.width = widthPL;
		is.clientProp.orientation = getOrientation();
		is.clientProp.device = devicePL;
	}
  }
  else if( is.isMobile.any())
  {
    if(getOrientation() == "portrait")
	{
		if(window && window.TrivCurrRespView)TrivCurrRespView.set( viewTP );
		
		is.clientProp.width = widthTP;
		is.clientProp.orientation = getOrientation();
		is.clientProp.device = deviceTP;
	}
    else
	{
		if(window && window.TrivCurrRespView)TrivCurrRespView.set( viewTL );
		
		is.clientProp.width = widthTL;
		is.clientProp.orientation = getOrientation();
		is.clientProp.device = deviceTL;
	}
  }
  else
  {		
		is.clientProp.orientation = getOrientation();
		if(!bTrivResponsive) // comes from bDisableBrowserResize
		{
			is.clientProp.device = "Desktop";
			is.clientProp.width ="1009";
			if(window && window.TrivCurrRespView)TrivCurrRespView.set( "Desktop" );
		}
	    else if(getScreenWidth() <= 785)
		{
		   if(getOrientation() == "landscape")
		   {
			   is.clientProp.device = devicePL;
			   is.clientProp.width = widthPL;
			   
			   if(window && window.TrivCurrRespView)TrivCurrRespView.set( viewPL );
		   }
		   else if(getScreenWidth()  > 480 )
		   {
				
				is.clientProp.device = deviceTP;
				is.clientProp.width = widthTP;
				
				if(window && window.TrivCurrRespView)TrivCurrRespView.set( viewTP );
		   } 
		   else if (getScreenWidth()  <= 480 )
		   {
			   is.clientProp.device = devicePP;
			   is.clientProp.width = widthPP;
			   
			   if(window && window.TrivCurrRespView)TrivCurrRespView.set( viewPP );	  
		   }
		   else 
		   {			
				is.clientProp.device = "Desktop";
				is.clientProp.width ="1009";
				if(window && window.TrivCurrRespView)TrivCurrRespView.set( "Desktop" );
		   }
		}
		else if(getScreenWidth()  <= 1007 && getScreenWidth() > 785)
		{
			
		   if(getOrientation() == "landscape")
		   {
			  is.clientProp.device = deviceTL;
			  is.clientProp.width = widthTL;
			  
			  if(window && window.TrivCurrRespView)TrivCurrRespView.set( viewTL );
		   }
		   else
		   {
			  is.clientProp.device = deviceTP;
			  is.clientProp.width = widthTP;
			  
			  if(window && window.TrivCurrRespView)TrivCurrRespView.set( viewTP );
		   }
			
		}
		else
		{
			is.clientProp.device = "Desktop";
			  is.clientProp.width ="1009";
			if(window && window.TrivCurrRespView)TrivCurrRespView.set( "Desktop" );
		}
		
		
		var desktopWidth =  getDesktopWidthFromJSON();
		if( is.clientProp.device != "Desktop" && 
			desktopWidth < is.clientProp.width )
		{
			is.clientProp.device = "Desktop";
		    is.clientProp.width ="1009";
			if(window && window.TrivCurrRespView)TrivCurrRespView.set( "Desktop" );
		}		
  }

  if(window && typeof(window.myTop) != 'undefined' 
	&& typeof(window.myTop._respView)!='undefined' 
	&& window.myTop._respView != null) 
	{
		switch (window.myTop._respView)
		{
			
				case "PhonePortrait":  
				{
					is.clientProp.device = "Phone";
					is.clientProp.width = "480";
					break;
				}
				case "PhoneLandscape":
				{
					is.clientProp.device = "Phone";
					is.clientProp.width = "785";
					break;
				}
				case "TabletPortrait":
				{
					is.clientProp.device = "Tablet";
					is.clientProp.width = "785";
					break;
				}
				case "TabletLandscape":
				{
					is.clientProp.device = "Tablet";
					is.clientProp.width = "1009";
					break;
				}
				case "Desktop":
				{
					is.clientProp.device = "Desktop";
					is.clientProp.width = "1009";
					break;
				}
		}
		
	}

  return true;
}

function getDesktopWidthFromJSON()
{
	if(is.ie8 || !window.bTrivResponsive) return 1009;
	
	if (!window.responsiveDataLoopCount )
		window.responsiveDataLoopCount=1;
	else
		window.responsiveDataLoopCount++;
	 
	if(!is.jsonData)
	{
		throw("Responsive data not available");
	}
	var respValues = is.jsonData["Desktop"];
	var newValues;
	var obj;
	window.responsiveDataLoopCount=1;
	if(respValues)
	{	
		for(var key in respValues)
			newValues = respValues[key];
	}
	if(newValues)
	{
		obj = newValues["pageLayer"];
		if(obj)
			return obj.w;
	}
}


function rebuildLayout()
{
	if(is.ie8)
		return;
	
	//Check if the array exists
	if(window && window.bTrivResponsive)
	{
    	RestoreStyles();
        
		for (var index = 0; index < arObjs.length; index++)
		{
			arObjs[index].loadProps();
			arObjs[index].respChanges();
		}
		
		writeStyleSheets( arObjs );
		UpdateObjLayerValues();
		
		adjustResponsivePage();
		adjustAllObjectsForFixedPosition(true,false);
	}
}

function barHidden()
{
	adjustAllObjectsForFixedPosition(false,true);
}

function setReviewLinkDispType()
{
	switch(getDisplayWindow().myTop._respView) 
	{  
		case "PhonePortrait":  
		{
			setDisplayType("Phone" , 480 );
			is.clientProp.orientation = "Portrait";
			break;
		}
		case "PhoneLandscape":
		{
			setDisplayType("Phone" , 785 );
			is.clientProp.orientation = "Landscape";
			break;
		}
		case "TabletPortrait":
		{
			setDisplayType("Tablet" , 785 );
			is.clientProp.orientation = "Portrait";
			break;
		}
		case "TabletLandscape":
		{
			setDisplayType("Tablet" , 1009 );
			is.clientProp.orientation = "Landscape";
			break;
		}
		case "Desktop":
		{
			setDisplayType("Desktop" , 1009 );
			break;
		}
	}

}

function changeSize()
{	

	//LD-5861 Force display type to what reviewLink has set
	if(typeof(getDisplayWindow().myTop._respView) != 'undefined' && getDisplayWindow().myTop._respView != null && getDisplayWindow().myTop._respView != 'Custom') 
	{	
		setReviewLinkDispType();
		return;
	}
	//LD-3217
	//Occasionally iOS has a null navigator when device rotating
	try{
		navigator.userAgent.length;
	}
	catch(e)
	{
		var strExec = "changeSize()";
		setTimeout(strExec, 100 );
		return;
		
	}
  if(is.ie8 || !window || !is.jsonData )
	return;
	
  var previousDevice;
  var previousOrientation;
  
  if(typeof bTrivRunView !== 'undefined'){
		//These values are set in the cookies from C++ land. 
  
		var cookies = document.cookie.split(/\W/);
		
		var index = cookies.indexOf("previous_device");
		
		if(index >= 0)
			previousDevice = cookies[parseInt(index)+1];
			
		index = cookies.indexOf("previous_device_orientation");
		
		if(index >= 0)
			previousOrientation = cookies[parseInt(index)+1];
  }
  else{
		previousDevice = is.clientProp.device;
		previousOrientation = is.clientProp.orientation;
  }

  if(!detect())
  {
	setTimeout(function(){changeSize();},100);
  }
	  
  if(previousDevice == is.clientProp.device && is.clientProp.device == "Desktop" )
	  return;
  if( previousDevice != is.clientProp.device || previousOrientation.toLowerCase() != is.clientProp.orientation.toLowerCase() )
  {
	rebuildLayout();
	try{ 
		OnDeviceRotate(); 
		adjustAllObjectsForFixedPosition();
		}catch(e){ }
  }
}

function setDisplayType(display, width)
{
	is.clientProp.device = display;
	is.clientProp.width = width;
	rebuildLayout();
}

function loadResponsiveData()
{
	if(is.awesomium && window.bTrivRunView)
		return;
	
	detect();
	var json;
	var phonejson;
	var tabletjson;
	var fileToLoad;
	var pthName = window.location.pathname.split("/").pop();
	if(pthName == "")
		pthName = "index";
	else
		pthName = pthName.substring(0,pthName.lastIndexOf("."));
	
	if(getDevice() == "Desktop")
	{
			fileToLoad = "device_desktop/"+pthName+".js";
			json = document.createElement("script");
			json.type = "text/javascript";
			json.src = fileToLoad;
			var jsonObj = "DesktopResponsive";
			json.onreadystatechange = !is.ie?function(){saveResponsiveData("Desktop", eval(jsonObj));}:'';
			json.onload = function(){saveResponsiveData("Desktop", eval(jsonObj));};
			document.getElementsByTagName('head')[0].appendChild(json);
			
			fileToLoad = "device_phone/"+pthName+".js";
			phonejson = document.createElement("script");
			phonejson.type = "text/javascript";
			phonejson.src = fileToLoad;
			var jsonPhoneObj = "PhoneResponsive";
			phonejson.onreadystatechange = !is.ie?function(){saveResponsiveData("Phone", eval(jsonPhoneObj));}:'';
			phonejson.onload = function(){saveResponsiveData("Phone", eval(jsonPhoneObj));};
			document.getElementsByTagName('head')[0].appendChild(phonejson);
			
			fileToLoad = "device_tablet/"+pthName+".js";
			tabletjson = document.createElement("script");
			tabletjson.type = "text/javascript";
			tabletjson.src = fileToLoad;
			var jsonTabletObj = "TabletResponsive";
			tabletjson.onreadystatechange = !is.ie?function(){saveResponsiveData("Tablet", eval(jsonTabletObj));}:'';
			tabletjson.onload = function(){saveResponsiveData("Tablet", eval(jsonTabletObj));};
			document.getElementsByTagName('head')[0].appendChild(tabletjson);
	}
	else
	{
			fileToLoad = "device_"+is.clientProp.device.toLowerCase()+"/"+pthName+".js";
			json = document.createElement("script");
			json.type = "text/javascript";
			json.src = fileToLoad;
			var jsonObj = is.clientProp.device+"Responsive";
			json.onreadystatechange = !is.ie?function(){saveResponsiveData(is.clientProp.device, eval(jsonObj));}:'';
			json.onload = function(){saveResponsiveData(is.clientProp.device, eval(jsonObj));};
			document.getElementsByTagName('head')[0].appendChild(json);
	}
}

function saveResponsiveData(device, responseText)
{
	if(is.jsonData == null)
		is.jsonData = {};
	is.jsonData[device] = responseText;
}

function isInIframe( wndow , count )
{
	if (wndow.frameElement && wndow.frameElement.tagName.toLowerCase() == 'iframe')
		return wndow.frameElement;
	else if (wndow.parent && count < 10)
		return isInIframe(wndow.parent, ++count);
	return null;
}

function isInFrame( wndow , count )
{
	if (wndow.frameElement && wndow.frameElement.tagName.toLowerCase() == 'frame')
		return true;
	else if (wndow.parent && count < 10)
		return isInIframe(wndow.parent, ++count);
	return false;
}

function adjustResponsivePage()
{
	if(is.jsonData != null)
	{
		var respValues = is.jsonData[is.clientProp.device];
		var newValues;
		newValues = respValues[is.clientProp.width];
		try{newValues.RCDResetQuestion();}catch(e){}
		var obj = newValues["pageLayer"];
		if(obj)
		{
			
			var topWindow = myTop;
			if(topWindow)
			{
				var objToScroll = trivGetScrollObj(topWindow.location.href);
				trivScrollTo(topWindow , objToScroll);
			}

			
			//For the case where we may have more than one viewport
			var currWindow = getDisplayWindow();
			var titleManagerIndexWindow = (currWindow && currWindow.parent && currWindow.parent.bIsTitleManagerIndexFile) ? currWindow.parent : null;
			while( currWindow )
			{			
				if(currWindow)
				{
					currWindow.scrollTo(0,1);
					var objToScroll = trivGetScrollObj(currWindow.location.href);
					trivScrollTo(currWindow , objToScroll);
				}
					
				currWindow = titleManagerIndexWindow;
				titleManagerIndexWindow = null; //stop looping after this.
			}
			
			var styleTags = getDisplayDocument().getElementsByTagName('head')[0].getElementsByTagName('style');
			var styleTag = null;

			for(var index = 0; index < styleTags.length; index++)
			{
				var styTag = styleTags[index];
				if(styTag.innerHTML.indexOf("body") > -1)
					styleTag = styTag;
			}
			//Object CSS exists
			if(styleTag)
			{
				ModifyBodyCSSForResponsive(styleTag, obj);
			}
			
			if(pageLayer)
			{
				var fixDIV = getDisplayDocument().getElementById("fixDIV");
				pageLayer.ele.style.width = obj.w+'px';
				pageLayer.ele.style.height = obj.h+'px';
				pageLayer.h = obj.h;
				if(!pageLayer.bInTrans){
					pageLayer.ele.style.clip = 'rect(0px,'+obj.w+'px,'+obj.h+'px,0px)';
					if(fixDIV){
						fixDIV.style.clip = pageLayer.ele.style.clip;
						fixDIV.style.width = pageLayer.ele.style.width;
						fixDIV.style.height = pageLayer.ele.style.height;
					}
				}
					
				if(obj.bgImage)
				{
					getDisplayDocument().body.style.backgroundImage = 'url()';
					pageLayer.ele.style.backgroundImage = 'url('+obj.bgImage+')';
				}
				else
				{
					getDisplayDocument().body.style.backgroundImage = 'url()';
					pageLayer.ele.style.backgroundImage = 'url()';
				}
				if(obj.bgSize)
				{
					getDisplayDocument().body.style.backgroundSize = obj.bgSize;
					pageLayer.ele.style.backgroundSize = obj.bgSize;
				}
				else
				{
					getDisplayDocument().body.style.backgroundSize = '';
					pageLayer.ele.style.backgroundSize = '';
				}
				if(obj.bgRepeat)
				{
					if(obj.bgRepeat == 'repeat')
					{
						getDisplayDocument().body.style.backgroundImage = 'url('+obj.bgImage+')';
						getDisplayDocument().body.style.backgroundRepeat = obj.bgRepeat;
						pageLayer.ele.style.backgroundImage = 'url()';
						pageLayer.ele.style.backgroundRepeat = '';
					}
					else 
						pageLayer.ele.style.backgroundRepeat = obj.bgRepeat;
					
				}
				else
				{
					getDisplayDocument().body.style.backgroundRepeat = '';
					pageLayer.ele.style.backgroundRepeat = '';
				}
				if(obj.bgColor)
					getDisplayDocument().body.style.backgroundColor =obj.bgColor;
				else
					getDisplayDocument().body.style.backgroundColor ='';
			}
		}
		try{newValues.RCDResultResize();}catch(e){}
		if(isSinglePagePlayerAvail()){
			window.trivPlayer.updatePlayerDIVs(GetCurrentPageDiv(), pageLayer);
			
			var topWindow = myTop;
			if(topWindow)
			{
				var objToScroll = trivGetScrollObj(topWindow.location.href);
				trivScrollTo(topWindow , objToScroll);
			}
				
			
			
			var currWindow = getDisplayWindow();
			var titleManagerIndexWindow = (currWindow && currWindow.parent && currWindow.parent.bIsTitleManagerIndexFile) ? currWindow.parent : null;
			while( currWindow )
			{			
				if(currWindow)
				{
					var objToScroll = trivGetScrollObj(currWindow.location.href);
					trivScrollTo(currWindow , objToScroll);
				}
					
				currWindow = titleManagerIndexWindow;
				titleManagerIndexWindow = null; 
			}
		}
	}
}

// CSS Function
function buildCSS(id,bFixed,left,top,width,height,visible,zorder,color,other,sizeUnit,bClip) {
  if(typeof(bClip) == 'undefined' || bClip == null )
	bClip = true;
  var str = (left!=null && top!=null)? '#'+id+' {position:absolute;'+'left:'+left+'px;top:'+top+'px;' : ((width!=null && height!=null) ? '#'+id+' {position:relative;' : '#'+id+' {position:fixed;width:100%;height:100%;' )
  if( arguments.length<10 || sizeUnit==null || typeof(sizeUnit)!='string'  )
	  sizeUnit = 'px';
  
  if (arguments.length>=4 && width!=null)
	  str += 'width:'+width+sizeUnit+';'
  if (arguments.length>=5 && height!=null) {
    str += 'height:'+height+sizeUnit+';'
    if ( (arguments.length<9 || other==null || other.indexOf('clip')==-1 ) && sizeUnit!='%' && bClip) 
		str += 'clip:rect(0px '+width+sizeUnit+' '+height+sizeUnit+' 0px);'
  }
  if (arguments.length>=6 && visible!=null) str += 'visibility:'+ ( (visible)? 'inherit' : 'hidden' ) +';'
  if (arguments.length>=7 && zorder!=null) str += 'z-index:'+zorder+';'
  if (arguments.length>=8 && color!=null) str += 'background:'+color+';'
  if (arguments.length>=9 && other!=null) str += other
  str += '}\n'
  return str
}

function addRotateCSS(angle, hasShadow, width, height, xPos, yPos, shadowDirection, shadowDepth, shadowBlurRadius, verticalFlip, horizontalFlip, boundsRectX, boundsRectY, adornerWidth, adornerHeight){
	var radians = angle * (Math.PI / 180.0);
	
	//if the image has a shadow, the point of rotation needs to be adjusted
	var shadowRadians = 0.0;
	var yOffset = 0;
	var xOffset = 0;
	if(hasShadow > 0)
	{
		shadowRadians = shadowDirection * (Math.PI / 180.0);
		//A negative yOffset means the shadow is going up the screen
		xOffset = shadowDepth * parseFloat(Math.cos(shadowRadians).toFixed(5));
		yOffset = -1 * shadowDepth * parseFloat(Math.sin(shadowRadians).toFixed(5));
	}
	else
	{
		shadowDirection = 0;
		shadowDepth = 0;
		shadowBlurRadius = 0;
	}
	
	var deltaCenterX = 0;
	var deltaCenterY = 0;

	deltaCenterX = width / 2.0;
	deltaCenterY = height / 2.0;

	
	var rotateAttribute = '';
	
	if( is.chrome || is.safari)
	{
		if(xOffset < 0) deltaCenterX = deltaCenterX - (xOffset - shadowBlurRadius);
		if(yOffset < 0) deltaCenterY = deltaCenterY - (yOffset - shadowBlurRadius);
		rotateAttribute += '-webkit-transform-origin: ' + deltaCenterX + 'px ' + deltaCenterY + 'px;';
		
		rotateAttribute += '-webkit-transform:rotate(' + angle + 'deg)';
		
		if(verticalFlip == 1)
		{
			rotateAttribute += 'scaleY(-1)';
		}
		
		if(horizontalFlip == 1)
		{
			rotateAttribute += 'scaleX(-1)';
		}
		
		rotateAttribute += ';';
	}
	else if( is.firefox )
	{
		if(xOffset < 0) deltaCenterX = deltaCenterX - (xOffset - shadowBlurRadius);
		if(yOffset < 0) deltaCenterY = deltaCenterY - (yOffset - shadowBlurRadius);
		rotateAttribute += '-moz-transform-origin: ' + deltaCenterX + 'px ' + deltaCenterY + 'px;';
		
		rotateAttribute += '-moz-transform:rotate(' + angle + 'deg)';
		
		if(verticalFlip == 1)
		{
			rotateAttribute += 'scaleY(-1)';
		}
		
		if(horizontalFlip == 1)
		{
			rotateAttribute += 'scaleX(-1)';
		}
		
		rotateAttribute += ';';
	}
	else if( is.ie8 || is.ie9)
	{		
		//Image rotation for IE8 and 9 is done inside of ObjImageBuild because of VML notation
	}
	else 
	{
		if(xOffset < 0) deltaCenterX = deltaCenterX - (xOffset - shadowBlurRadius);
		if(yOffset < 0) deltaCenterY = deltaCenterY - (yOffset - shadowBlurRadius);
		rotateAttribute += 'transform-origin: ' + deltaCenterX + 'px ' + deltaCenterY + 'px;';
		
		rotateAttribute += 'transform:rotate(' + angle + 'deg)';
		
		if(verticalFlip == 1)
		{
			rotateAttribute += 'scaleY(-1)';
		}
		
		if(horizontalFlip == 1)
		{
			rotateAttribute += 'scaleX(-1)';
		}
		
		rotateAttribute += ';';
	}
	
	return rotateAttribute;
}

//Opacity is passed in as a number between 0-100
function addOpacityCSS(opacityVal){
	var opacityAttribute = '';
	if(!(is.ie8 || is.ie9))
		opacityAttribute += 'opacity: ' + (opacityVal/100.0) + ';';
	else
		opacityAttribute += 'filter: alpha(opacity=' + opacityVal + ');'
	fOpacity = opacityVal;
	return opacityAttribute;
}


function addSvgShadowFilter(name,width, height, direction, depth, opacity, red, green, blue, blurRadius, type , borderWidth)
{
	
	var radians = direction * (Math.PI / 180.0);
	var xOffset = depth * Math.cos(radians);
	var yOffset = -1 * depth * Math.sin(radians);

	xOffset = xOffset.toFixed(5);
	yOffset = yOffset.toFixed(5);
	
	var svgFilter = '';
	svgFilter += '<defs>\n';
	var stdBlurRadius = blurRadius/1.8;
	
	
	if(xOffset <= 0 || yOffset <= 0 || borderWidth)
	{
		svgFilter += '<filter id = "'+ (isSinglePagePlayerAvail() ? window.trivPlayer.activePage.nameNoEx + '_' + name : name) +'Shadow" '
		if(xOffset <= 0)
		{
			var xDisplacementPercentage = (((xOffset - blurRadius) / width) * 100).toFixed(5);
			svgFilter += 'x = "' + xDisplacementPercentage + '%" '
		}
		else if (borderWidth)
		{
			var xDisplacementPercentage =-1*((((borderWidth*2)) / width) * 100).toFixed(5);
			svgFilter += 'x = "' + (xDisplacementPercentage) + '%" ';

		}
		else svgFilter += 'x = "0" '
		
		if(yOffset <= 0)
		{
			var  yDisplacementPercentage = (((yOffset - blurRadius) / height) * 100).toFixed(5);
			svgFilter += 'y = "' + yDisplacementPercentage + '%" '
		}
		else if (borderWidth) 
		{
			var yDisplacementPercentage = ((((borderWidth*2) - 2) / height) * 100).toFixed(5);
			svgFilter += 'y = "' + (( borderWidth==0? 1:-1)*yDisplacementPercentage) + '%" '
		}
		else svgFilter += 'y = "0" '
		
		var w = 100 * (Math.abs(xOffset) + width + 2*blurRadius) / width;
		var h =  100 * (Math.abs(yOffset) + height + 2*blurRadius) / height;
		svgFilter += 'width="'+( w < 200 ? 200 : w  )+'%" height="'+ ( h < 200 ? 200 : h ) +'%">\n';

	
	}
	else
	{
		var w = 200 + 200*(depth/100);
		var h = 200 + 200*(depth/100);
		svgFilter += '<filter id = "' + (isSinglePagePlayerAvail() ? window.trivPlayer.activePage.nameNoEx + '_' + name : name) +'Shadow" x = "0" y = "0" width="'+w+'%" height="'+h+'%">\n';
	}
	
	svgFilter += '<feColorMatrix result = "colorResult" in = "SourceAlpha" type = "matrix" color-interpolation-filters="sRGB" values = "0 0 0 0 '+ (red / 255.0).toFixed(6) + ' 0 0 0 0 ' + (green / 255.0).toFixed(6) +' 0 0 0 0 '+ (blue / 255.0).toFixed(6) + ' 0 0 0 '+ opacity + ' 0"/>\n';
	svgFilter += '<feOffset result = "offsetResult" in = "colorResult" dx = "' + xOffset + '" dy = "' + yOffset + '" />\n';
	svgFilter += '<feGaussianBlur result = "blurResult" in = "offsetResult" stdDeviation = "'+stdBlurRadius+'" />\n';							//stdDeviation is the blurRadius
	svgFilter += '<feBlend in = "SourceGraphic" />'
	svgFilter += '</filter>\n';
	svgFilter += '</defs>\n';
	
	return svgFilter;
}

function addReflection(name, src, topLeftX, topLeftY, width, height, angle, offset, fadeRate, visible, 
					   verticalFlip, horizontalFlip, boundsRectX, boundsRectY, adornerWidth, adornerHeight, 
					   zOrd, ie8DivX, ie8DivY, ie8DivWidth, ie8DivHeight, ie8ReflectionImgX, ie8ReflectionImgY, bUseSvgFile, bFixedPosition , textSrc, imgFSrc){
	var reflection = '';
	
	var bIsButton = name.indexOf("button") != -1 ? true : false;
	var bIsImage = name.indexOf("image") != -1 ? true : false;
	
	if(is.awesomium || is.ie8 )
	{
		if(visible ==0)
		{
			visible =1;
			topLeftX = -width;
			topLeftY = -height;
		}
	}
	
	reflection += '<div id="'+name+'ReflectionDiv" style="visibility:'+((visible)?'inherit':'hidden')+';z-index:'+zOrd+';';
	
	var deltaCenterX = 0;
	var deltaCenterY = 0;
	
	if(adornerWidth == 0 || adornerHeight == 0)
	{
		deltaCenterX = width / 2.0;
		deltaCenterY = height / 2.0;
	}
	else
	{
		deltaCenterX = (adornerWidth / 2.0) - boundsRectX;
		deltaCenterY = (adornerHeight / 2.0) - boundsRectY;
	}
	
	if(is.awesomium)
		if(angle == 0)
			angle = 360;
	
	if(is.chrome || is.safari)
	{
		if(!is.awesomium)
			reflection += '-webkit-transform-origin:'+ deltaCenterX+'px '+deltaCenterY+'px;';
		else if(is.awesomium && (boundsRectX != 0 || boundsRectY != 0) )
			reflection += '-webkit-transform-origin:'+ deltaCenterX+'px '+deltaCenterY+'px;';
		
		reflection += '-webkit-transform:rotateX(180deg)';
		
		if(angle > 0)
			reflection += ' rotateZ(' + angle + 'deg)';
		
		if(verticalFlip == 1)
		{
			if(bIsButton) reflection += ' scaleY(1)';
			if(bIsImage) reflection += ' scaleY(-1)';
		}
		
		if(horizontalFlip == 1)
		{
			if(bIsButton) reflection += ' scaleX(1)';
			if(bIsImage) reflection += ' scaleX(-1)';
		}
	}
	else if(is.ie8)
	{
		//echo bug 21657 : ie8 and ie9 rotations are flipped using a vml style attribute
	}
	else if(is.firefox)
	{
		reflection += '-moz-transform-origin:'+deltaCenterX+'px '+deltaCenterY+'px; -moz-transform:rotateX(180deg)';
		
		if(angle > 0)
			reflection += ' rotateZ(' + angle + 'deg)';
			
		if(verticalFlip == 1)
		{
			if(bIsButton) reflection += ' scaleY(1)';
			if(bIsImage) reflection += ' scaleY(-1)';
		}
		
		if(horizontalFlip == 1)
		{
			if(bIsButton) reflection += ' scaleX(1)';
			if(bIsImage) reflection += ' scaleX(-1)';
		}
	}
	else if (is.ie9)
	{
		reflection += '-ms-transform:rotate(180deg)';
		reflection += 'scaleX(-1)';
	}
	else
	{
		reflection += 'transform-origin:'+deltaCenterX+'px '+deltaCenterY+'px; transform:rotateX(180deg)';
		
		if(angle > 0)
			reflection += ' rotateZ(' + angle + 'deg)';
		
		if(verticalFlip == 1)
		{
			if(bIsButton) reflection += ' scaleY(1)';
			if(bIsImage) reflection += ' scaleY(-1)';
		}
		
		if(horizontalFlip == 1)
		{
			if(bIsButton) reflection += ' scaleX(1)';
			if(bIsImage) reflection += ' scaleX(-1)';
		}
	}
	
	if(!(is.ie8 || is.ie9))
		reflection += '; opacity: ' + (fOpacity/100.0);
		
	if(is.ie8 )
		reflection += '; position:absolute;' + ' top:' + ie8DivY + 'px; left:' + ie8DivX + 'px; width:' + ie8DivWidth + 'px; height:' + ie8DivHeight + 'px;">\n';
	else
	{
		//echo LD-1574 : There seems to be a 1px difference between the way gdiplus renders and the way the browser renders two shapes in the same position. 
		if(is.awesomium)
			reflection += '; position:absolute;' + 'top:' + topLeftY + 'px; left:' + topLeftX + 'px; width:' + width + 'px; height:' + height + 'px;">\n';	
		else
			reflection += '; position:absolute;' + 'top:' + (topLeftY - 1) + 'px; left:' + topLeftX + 'px; width:' + width + 'px; height:' + height + 'px;">\n';	
	}
	
	if(!is.ie8)
	{
		reflection += '<svg id="' + name + 'ReflectionSVG" focusable="false" style="overflow:visible;width:'+width+'px;height:'+height+'px;"  >\n';
		reflection += '<defs>\n';
		
		if(is.awesomium)
		{
			var radians = (Math.PI / 180.0);
			var cosAngle = Math.cos(radians);
			var sinAngle = Math.sin(radians);

			var startVectX = (0.5 + (0.5 * sinAngle)).toFixed(2);
			var startVectY = (0.5 - (0.5 * cosAngle)).toFixed(2);
			var endVectX = (0.5 - (0.5 * sinAngle)).toFixed(2); 
			var endVectY = (0.5 + (0.5 * cosAngle)).toFixed(2);
			
			reflection += '<linearGradient id="' + name + 'AlphaGradient" x1="' + startVectX + '" y1="' + startVectY + '" x2="' + endVectX + '" y2="' + endVectY + '">\n';	
		}
		else
		{
			var radians = 0;
			if( (verticalFlip == 1 && horizontalFlip !=1) || (verticalFlip != 1 && horizontalFlip == 1) || (horizontalFlip == 1 && verticalFlip == 1))
				radians = (1 * angle) * (Math.PI / 180.0);
			else
				radians = (-1 * angle) * (Math.PI / 180.0);
				
			var cosAngle = Math.cos(radians);
			var sinAngle = Math.sin(radians);
			
			var startVectX = (0.5 + (0.5 * sinAngle)).toFixed(2);
			var startVectY = (0.5 - (0.5 * cosAngle)).toFixed(2);
			var endVectX = (0.5 - (0.5 * sinAngle)).toFixed(2); 
			var endVectY = (0.5 + (0.5 * cosAngle)).toFixed(2);
			
			//echo bug 21516 : Buttons are published out flipped so they don't need the javascript to do it for them.
			if(verticalFlip == 1 && horizontalFlip == 0 && bIsImage) 
			{
				reflection += '<linearGradient id="' + name + 'AlphaGradient" x1="' + startVectX + '" y1="' + startVectY + '" x2="' + endVectX  + '" y2="' + endVectY + '">\n';
			}
			else if(verticalFlip == 0 && horizontalFlip == 1 && bIsImage)
			{
				reflection += '<linearGradient id="' + name + 'AlphaGradient" x1="' + endVectX + '" y1="' + endVectY + '" x2="' + startVectX  + '" y2="' + startVectY + '">\n';
			}
			else if(verticalFlip == 1 && horizontalFlip == 1 && bIsImage)
			{
				reflection += '<linearGradient id="' + name + 'AlphaGradient" x1="' + endVectX + '" y1="' + startVectY + '" x2="' + startVectX  + '" y2="' + endVectY + '">\n';
			}
			else
			{
				reflection += '<linearGradient id="' + name + 'AlphaGradient" x1="' + endVectX + '" y1="' + endVectY + '" x2="' + startVectX + '" y2="' + startVectY + '">\n';
			}
		}
			
		reflection += '<stop offset="10%" stop-color="white" stop-opacity="0.5"/>\n';
		reflection += '<stop offset="' + (offset * 100) + '%" stop-color="white" stop-opacity="0"/>\n';
		reflection += '</linearGradient>\n';
		reflection += '<mask id="' + name + 'Mask" maskUnits="objectBoundingBox">\n';
		reflection += '<rect x="0" y="0" width="' + width + '" height="' + height +'" style="fill:url(#' + name + 'AlphaGradient);"/>\n';
		reflection += '</mask>\n';
		reflection += '</defs>\n';
		if(bIsImage||!bUseSvgFile || is.ie9)
			reflection += '<image id="'+name+'Reflection" xlink:href="' + src + '" preserveAspectRatio="none" width = "' + width + 'px" height = "' + height + 'px" mask="url(#' + name + 'Mask)"/>\n';
		else
			reflection += src + '" preserveAspectRatio="none" width = "' + width + 'px" height = "' + height + 'px" mask="url(#' + name + 'Mask)"/>\n';
		
		//if(textSrc)
		//	reflection += textSrc + '" preserveAspectRatio="none" width = "' + width + 'px" height = "' + height + 'px" mask="url(#' + name + 'Mask)"/>\n';
		if(imgFSrc)
			reflection += imgFSrc + '" preserveAspectRatio="none" width = "' + width + 'px" height = "' + height + 'px" mask="url(#' + name + 'Mask)"/>\n';
		reflection += '</svg>\n';
	}
	else
	{
		if(verticalFlip == 0 && horizontalFlip == 0) 
		{
			reflection += '<v:image id="'+name+'Reflection" src="'+ src +'" style="flip:y; filter: progid:DXImageTransform.Microsoft.Alpha(startX='+((width*100)/(2*width))+', startY=0, finishX='+((width*100)/(2*width))+', finishY='+offset*100+', style=1, finishOpacity=0,opacity=55);position:absolute;left:'+((topLeftX - (ie8ReflectionImgX - topLeftX)) - ie8DivX)+'px;top:'+((topLeftY - (topLeftY - ie8ReflectionImgY)) - ie8DivY)+'px;width:'+width+'px;height:'+height+'px;rotation:'+angle+';" alt=""/>\n';
		}
	
		if(horizontalFlip == 1 && verticalFlip == 0)
		{
			reflection += '<v:image id="'+name+'Reflection" src="'+ src +'" style="flip:x; filter: progid:DXImageTransform.Microsoft.Alpha(startX='+((width*100)/(2*width))+', startY=0, finishX='+((width*100)/(2*width))+', finishY='+offset*100+', style=1, finishOpacity=0,opacity=55);position:absolute;left:'+((topLeftX - (ie8ReflectionImgX - topLeftX)) - ie8DivX)+'px;top:'+((topLeftY - (topLeftY - ie8ReflectionImgY)) - ie8DivY)+'px;width:'+width+'px;height:'+height+'px;rotation:'+(180-angle)+';" alt=""/>\n';
		}
		
		if(horizontalFlip == 0 && verticalFlip == 1)
		{
			reflection += '<v:image id="'+name+'Reflection" src="'+ src +'" style="flip:y; filter: progid:DXImageTransform.Microsoft.Alpha(startX='+((width*100)/(2*width))+', startY=0, finishX='+((width*100)/(2*width))+', finishY='+offset*100+', style=1, finishOpacity=0,opacity=55);position:absolute;left:'+((topLeftX - (ie8ReflectionImgX - topLeftX)) - ie8DivX)+'px;top:'+((topLeftY - (topLeftY - ie8ReflectionImgY)) - ie8DivY)+'px;width:'+width+'px;height:'+height+'px;rotation:'+ (360-angle)+';" alt=""/>\n';
		}
		
		if(horizontalFlip == 1 && verticalFlip == 1)
		{
			reflection += '<v:image id="'+name+'Reflection" src="'+ src +'" style="flip:y; filter: progid:DXImageTransform.Microsoft.Alpha(startX='+((width*100)/(2*width))+', startY=0, finishX='+((width*100)/(2*width))+', finishY='+offset*100+', style=1, finishOpacity=0,opacity=55);position:absolute;left:'+((topLeftX - (ie8ReflectionImgX - topLeftX)) - ie8DivX)+'px;top:'+((topLeftY - (topLeftY - ie8ReflectionImgY)) - ie8DivY)+'px;width:'+width+'px;height:'+height+'px;rotation:'+(360-angle)+';" alt=""/>\n';
		}
	}

	if(textSrc)
		reflection += textSrc;
	

	reflection += '</div>\n';
	
	return reflection;
}

function writeStyleSheets(arrOfObjs) { 

  var strCSS = "";
  for( var i=0; i<arrOfObjs.length; i++ )
  {
	var obj = arrOfObjs[i];
	
	if( obj.css )
		strCSS += obj.css+"\n";
	
	// custStates adding all styles
	
	if(obj.btnStates) for (var j=0;j < obj.btnStates.length;j++)
	{
		if(obj.stateTextValues)
		{
			strCSS +=  obj.stateTextValues[obj.btnStates[j]].div+"\n";
			strCSS +=  obj.stateTextValues[obj.btnStates[j]].span+"\n";
		}
	}
	else
	{
		if( arrOfObjs[i].textDivCSS )
			strCSS += arrOfObjs[i].textDivCSS+"\n";
		if( arrOfObjs[i].spanDivCSS )
			strCSS += arrOfObjs[i].spanDivCSS+"\n";
	}
	
	if( obj.arrCSSStyles )
	{
	  for( var j=0; j< obj.arrCSSStyles.length; j++ )
	  {
		if(obj.name.indexOf("entry") == 0)
			strCSS += ModifyCSSBulk( obj.arrCSSStyles[j], obj, false )+"\n";
		else
			strCSS += ModifyCSSBulk( obj.arrCSSStyles[j], obj, true )+"\n";
	  }
	} 
  }
  
  var styleElem = getHTMLEleByID(getCSSID())
  if( !styleElem )
  {
    var cssStr = '<style id="TrivDynStyleSheet" type="text/css">\n'
    cssStr += strCSS
    cssStr += '</style>'
    document.write(cssStr)
  }
  else
	styleElem.innerHTML  = strCSS;
}

function preload() {
  if (!document.images) return;
  var ar = new Array();
  var objPreload;
  if(arguments.length == 1 && typeof (arguments[0]) != "string")
	  objPreload = arguments[0];
  else
	  objPreload = arguments;
  
  for (var i = 0; i < objPreload.length; i++) {
    ar[i] = new Image();
    ar[i].src = objPreload[i];
  }
}

function getHTTP(dest, method, parms, errOk)
{
    var httpReq;
    if( method == 'GET' ) { 
        if( parms ) {
          if( dest.indexOf('?' ) > 0 )
            dest += '&';
          else
            dest += '?';
          dest += parms;
          parms = null;
        }
    }
    
    var msg = 'Issuing ' + method + ' to ' + dest;
    if( parms ) msg += ' for [' + parms + ']';
    trivLogMsg( msg, 8 );
    
    var requestSent = 0;
    try { 
        // branch for native XMLHttpRequest object
        if (window.XMLHttpRequest) {
            httpReq = new XMLHttpRequest();
            httpReq.open(method, dest, false);
            httpReq.onreadystatechange = null;
            if( method == 'POST' ) {
              httpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
            }
            httpReq.send(parms); 
            requestSent = 1;
        } 
    }
    catch(e){
      if( typeof(errOk) != "undefined" && errOk != null && e.code == errOk )
        requestSent = 1;
    }
    
    // branch for IE/Windows ActiveX version
    if (!requestSent && window.ActiveXObject) {
        httpReq = new ActiveXObject("Microsoft.XMLHTTP");
        if (httpReq) {
            httpReq.open(method, dest, false);
            if( method == 'POST' ) {
              httpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
            }
            httpReq.send(parms);
        }
    }
    trivLogMsg( 'ReturnCode = ' + httpReq.status + ' Received Data [' + httpReq.responseText + ']', 8 );
    return httpReq;
}

function GenRand( min, max )
{
  return Math.floor( Math.random() * ( max - min + 1 ) + min );
}

function Encode( s )
{
  if( s == null ) return '';
  return encodeURIComponent( String(s) );
}

function Decode( s )
{
  if( s == null ) return '';
  return decodeURIComponent( String(s) );
}

function UniUnescape( s )
{
  if( s == null ) return '';
  return( unescape( String(s).replace(/%5Cu/g, '%u') ) );
}

function unJUN( s )
{
  var val = "";
  if( s != null )
  {
    for( i=0; i<s.length; i++ )
    {
      if( s.charAt(i) == '\\' && s.length > (i + 5) && s.charAt(i+1) == 'u' )
      {
        cEsc = '%';
        cEsc += s.substring(i+1,i+6);
        c = unescape(cEsc);
        if( c.length == 1 )
        {
          val += c;
          i += 5;
        }
        else
        {
          val += s.charAt(i);
        }
      }
      else
      {
        val += s.charAt(i);
      }
    }
  }
  return val;
}

function convJS( s )
{
  if( s == null ) return '';
  s = s.replace(/\n/g, '<br/>');
  s = s.replace(/\\r/g, '<br/>');
  s = s.replace(/"/g, '&quot;');
  return s;
}

function getContentWindow()
{
  var win = window;
  if( window.frameElement && ( window.frameElement.name == 'titlemgrframe' ) )
  {
    if( window.frameElement.parentNode )
    {
      for( i=0; i<window.frameElement.parentNode.childNodes.length; i++ )
      {
        if( window.frameElement.parentNode.childNodes[i].name == 'contentframe' )
        {
          win = window.frameElement.parentNode.childNodes[i].contentWindow;
          break;
        }
      }
    }
  }
  return win;
}


function trivAlert( pWinId, title, msg, cb )
{
	if( trivWeb20Popups )
	{
		var alertMsg = msg.replace(/\n/g, "<br>"); // 15923 - handle line breaks
		var mb = new jsDlgMsgBox( pWinId, title, alertMsg, null, cb);
		mb.create();
		mb.setPrevFocus(getDisplayWindow().prevFocus);
	}
	else
		alert( msg );
}

function closeDialog()
{
	var close;
	var rc = false;
	if( this.frameElement && this.frameElement.parentNode )
	{
		for( i=0; i<this.frameElement.parentNode.childNodes.length; i++ )
		{
			if( this.frameElement.parentNode.childNodes[i].id == 'DLG_hiddenClose' )
			{
				close = this.frameElement.parentNode.childNodes[i];
				break;
			}
		}
		if( close && close.onclick )
		{
			close.onclick();
			rc = true;
		}
	}
	return rc;
}

function CloseWnd() {
  if( this.frameElement && this.frameElement.id && this.frameElement.id.indexOf('DLG_content') == 0 )
    closeDialog();
  else
    getDisplayWindow().close();
}

function createXMLHTTPObject(filename){
	var httpReq;
	try{
		if ( window.ActiveXObject ){
			httpReq = new ActiveXObject("Microsoft.XMLHTTP");

			if (httpReq){
				httpReq.open('GET', filename, false);
				httpReq.send();
			}
		}
		else if ( window.XMLHttpRequest ){
			httpReq = new XMLHttpRequest();
			httpReq.open('GET', filename, false);
			httpReq.onreadystatechange = null;
			httpReq.send("noCache=" + (new Date().getTime()) );
		}

		var respXML = httpReq.responseXML;
		if ( window.ActiveXObject ){
			respXML = new ActiveXObject("Microsoft.XMLDOM");
			respXML.async = "false";
			respXML.loadXML(httpReq.responseText);
		}

	}
	catch(e) {}
	return respXML;
}

function getNVStr(nl,tag){
	var ar = nl.getElementsByTagName(tag);
	for( var i=0; i<ar.length; i++ )
		if( ar[i] && ar[i].firstChild && ar[i].parentNode == nl ) return ar[i].firstChild.data;
	return "";
}

function getNVArray(nl,tagarray, tagitem, tagsubitem){
	var arDest = new Array();
    var arXmlArray = nl.getElementsByTagName(tagarray);
    if ( arXmlArray && arXmlArray.length>0 )
    {
		try {
			var arEle = arXmlArray[0].getElementsByTagName(tagitem);
			for( var i=0; arEle && i < arEle.length; i++ )
			{
				var arSubEle = 0;
				if ( arEle[i].nodeType == 1 && tagsubitem )
					arSubEle = arEle[i].getElementsByTagName(tagsubitem);
				
				if ( arSubEle && arSubEle.length>1 )
					arDest.push([arSubEle[0].textContent, arSubEle[1].textContent]);
				else if ( arSubEle && arSubEle.length>0 )
					arDest.push([arSubEle[0].textContent]);
				else
					arDest.push(arEle[i].textContent);
			}
		} catch(e) {
			alert("getNVArray error")
		}
	}
	return arDest;
}

function getTextData(filename, textblockname){
	if( trivDynXMLfilePath.length > 4 ) 
		filename = trivDynXMLfilePath;
	var nl = createXMLHTTPObject(filename);
	var arTB = nl.getElementsByTagName('textblock');
	for( var i = 0; arTB && i < arTB.length; i++ ){
		if(arTB[i].getAttribute('name') == textblockname)
			return getNVStr( arTB[i], 'text' );
	}
	return '';
}

function getAllChildrenSpanElem(targetDocument, currentElement, arr) {
    if (currentElement) {
        var j;
        var tagName = currentElement.tagName;

        if (tagName == 'SPAN')
            arr.push(currentElement);

        var i = 0;
        var currentElementChild = currentElement.childNodes[i];
        while (currentElementChild) {
            getAllChildrenSpanElem(targetDocument, currentElementChild, arr);
            i++;
            currentElementChild = currentElement.childNodes[i];
        }
    }
}

function supports_video() {
    return !!document.createElement('video').canPlayType;
}

function supports_h264_baseline_video() {
    if (!supports_video()) { return false; }
    var v = document.createElement("video");
    return /^(probably|maybe)$/i.test(v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'));
}

function trivTimerLoop( timerVar, durInSec, onDone, updatefunc, propsStr, bRecur ){
	var timerVarVal = timerVar.getValue();
	var startTime = parseInt( timerVarVal );
	var paused = false;
	var now = parseInt((new Date().getTime()+500)/1000)*1000;
	if( timerVarVal!=null && typeof(timerVarVal)!="undefined")
	{
		timerVarVal = timerVarVal.toString();
		var bPause = timerVarVal.indexOf( "pause:" ) != -1;
		var bDone  = timerVarVal.indexOf( "done:" ) != -1;
		if( bPause || bDone )
		{
			var remainingTime = parseInt( timerVarVal.split(':')[1]) ;
			startTime = ( now - remainingTime );
			if( bPause )
				paused = true;
			else
			{
				if( bRecur )
					paused = true;
				else
					timerVar.set( startTime );
			}
		}
	}
	
	if( ( startTime == 0 || startTime > now  )&& !paused)
	{
		//this is a fresh timer: 
		startTime = now;
		timerVar.set( startTime );
	}	
	
	var props = eval(propsStr);
	var strRemain = getRemainingTime(now, startTime, durInSec*1000, props.bShowHours, props.bShowMin, props.bShowSec, props.countdown );
	
	if( strRemain == null && !paused)
	{
		timerVar.set( "pause:-999999999999999" ); //negative remaining time, this will signify timer completed.
		eval( onDone ); 
	}
	else 
	{
		if( strRemain == null )
			strRemain = buildTimeString( (props.countdown)?0:(durInSec*1000), props.bShowHours, props.bShowMin, props.bShowSec );
		var updFunc = eval(updatefunc);
		updFunc( strRemain );
	}
	
	var strExec = "trivTimerLoop(" + timerVar.name + "," + durInSec + ",'" + onDone +"','" + updatefunc + "', '" + propsStr + "', true )";
	setTimeout( strExec, 500 );
}

function buildTimeString(lRemain, showHours, showMins, showSecs )
{
	var strRemain = '';
	
    lRemain = lRemain/1000;
	
    var temp = parseInt(lRemain/3600);
    lRemain -= temp * 3600;
    if ( showHours )
	{
		strRemain += temp + ':';
	}
    else
		strRemain += '  ';
		
    temp = parseInt(lRemain/60);
    lRemain -= temp * 60;
    if ( showMins )
    {
        if( temp <= 9 )
			strRemain += '0';
	    strRemain += temp;
    }
    if ( showSecs )
    {
        if ( showMins )
            strRemain += ':';
        if( lRemain <= 9 )
            strRemain += '0';
        strRemain += parseInt( lRemain );
    }
	return strRemain;
}

function getRemainingTime( now, lStartTime, lDuration, showHours, showMins, showSecs, countDown ) 
{ 
  lStartTime = parseInt(lStartTime/1000)*1000
  var lRemain = 0;
  var timeSoFar = 0;
  var lCurr = 0;
  var now = parseInt((new Date().getTime()+500)/1000)*1000;
  
  if( lStartTime > now )
	return null;

  lCurr = now - lStartTime;

  lRemain = lDuration - lCurr;

  if ( !countDown )
  {
	timeSoFar = lDuration - lRemain;

	if ( timeSoFar > lDuration )
		return null;
	lRemain = timeSoFar;
  }
  
  if( countDown && lRemain > 0 || !countDown && timeSoFar < lDuration)
    return buildTimeString( lRemain, showHours, showMins, showSecs, countDown );
  else
    return null;
}

function validateNum(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\.|\,|\-|\t/;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

function addClickMap(objWidth, objHeight, xOffset, yOffset, thisObj)
{
	var svgImageTag = '';
	var mapOffsetX = 0;
	var mapOffsetY = 0;
	
	if(xOffset < 0 || yOffset < 0)
	{		
		if(xOffset < 0)
			mapOffsetX = Math.abs(xOffset) + thisObj.outerShadowBlurRadius;

		if(yOffset < 0)
			mapOffsetY = Math.abs(yOffset) + thisObj.outerShadowBlurRadius;

	}
	
	var str = ''
	
	str += '<div style="left:'+mapOffsetX+'px; top:'+mapOffsetY+'px; position:absolute; z-index:1;">\n'
	str += '<svg id="'+thisObj.name+'SVG" focusable="false" role="img" aria-label=" " width="'+objWidth+'px" height="'+objHeight+'px"'
	str += '>\n'
	str += '<g opacity="0">\n'
	str += '<a id="'+thisObj.name+'MapArea" name="'+thisObj.name+'MapArea">\n'
	str += '<path shape="poly" d="'+thisObj.str_SvgMapPath+'"/>\n'
	str += '</a>\n'
	str += '</g>\n'
	str += '</svg>\n'
	str += '</div>\n'
	
	return str;
}

function addImageMap(obj)
{
	var strMap = '';
	strMap += '<map id="'+obj.name+'Map" name="' + obj.name + 'Map">\n';
	strMap += '<area name="' + obj.name + 'MapArea" id="' + obj.name + 'MapArea"shape="poly" coords="' + obj.str_ImageMapCoords + '"';
    if( obj.hasOnUp && !is.iOS ) strMap += ' href="javascript:void(null)"'
    if( obj.hasOnUp && is.iOS ) strMap += ' href="javascript:' + this.name + '.up()"'
	strMap += 'alt="'+ obj.altName +'">';		//echo bug 19523: Jaws is reading the alt tag for images with actions here
	strMap += '</map>\n';
	
	return strMap;
}

function IsPointInPolygon(p, arrPoints)
{
	var num = arrPoints.length;
    var i = 1;
    var j = 0;
    var c = false;
	
	for( ; i<num; i++ )
	{
		var pi = arrPoints[i];
		var pj = arrPoints[j];
		
        if(  (( pi.Y > p.Y) != (pj.Y > p.Y)) && (p.X < (pj.X - pi.X) * (p.Y - pi.Y) / (pj.Y - pi.Y) + pi.X) )
            c = !c;
        j = i;
	}
	
    return c;
}

function AdjustClickPointsForAct(thisObj, bForResponsive)
{
	var pIh = (thisObj.h/thisObj.maph);
	var pIw = (thisObj.w/thisObj.mapw);

	if(((thisObj.objLyr && thisObj.objLyr.growActive == false) || bForResponsive))
	{
		var svgStr = "";
		var mapStr = "";
		if(thisObj.bSVGMap)
		{
			var map = thisObj.str_SvgMapPath.split(" ");
			for (index = 0; index < map.length; index++)
			{
				var x = 0;
				var y = 0;
				if(index%3 == 0)
				{
					svgStr += map[index];
				}
				else if(index%3 == 1)
				{
					x = parseFloat(map[index]);
					if(x)
					{
						if(x % 1 === 0 && x==1){
							svgStr+= x.toString();
						}
						else{
							x = x * pIw;
							svgStr+= x.toFixed(2).toString();
						}
					}
					else
					{
						svgStr+=map[index];
					}
				}
				else if(index%3 == 2)
				{
					y = parseFloat(map[index]);
					if(y)
					{
						if(y % 1 === 0 && y==1){
							svgStr+= y.toString();
						}
						else{
						y = y * pIh;
						svgStr+= y.toFixed(2).toString();
						}
					}
					else
					{
						svgStr+=map[index];
					}
				}
				if(index+1 != map.length)
					svgStr+= " ";
			}
			thisObj.str_SvgMapPath = svgStr;
		}
		else
		{
			if(thisObj.str_ImageMapCoords)
			{
				var map = thisObj.str_ImageMapCoords.split(",");
				for (index = 0; index < map.length; index++)
				{
					var x = 0;
					var y = 0;
					if(index%2 == 0)
					{
						x = (parseFloat(map[index]) * pIw);
						mapStr+= x.toFixed(2).toString();
					}
					else
					{
						y = (parseFloat(map[index]) * pIh);
						mapStr+= y.toFixed(2).toString();
					}
					if(index+1 != map.length)
						mapStr+= ",";
				}
				thisObj.str_ImageMapCoords = mapStr;
			}
		}
		
		thisObj.maph = thisObj.h;
		thisObj.mapw = thisObj.w;
		return true;
	}
	return false;
}

/*
 * pads number n with z or '0' so resulting string is length width
 *
 * pad(10, 4);      // 0010
 * pad(9, 4);       // 0009
 * pad(123, 4);     // 0123
 *
 * pad(10, 4, '-'); // --10
 */
function  padDigits(n, width, z)
{
	  z = z || '0';
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

/*
 * returns null if url is in the new format
 *
 */
function parseKeyFromGDocURL(url)
{
	// parse the user supplied key (key or formKey parameters) out of the Google Docs URL:
	// the old url --> https://docs.google.com/spreadsheet/ccc?key=0AkS0S-1Hb65odEhzVVQ4UXVwa1Q1WkhiY1VULVdJLUE&usp=drive_web#gid=0
	//                                              ^-^ ^------------------------------------------^
	//
	// the new and current url --> https://docs.google.com/forms/d/11kxHt5Cu5kNN1vDJjVMxkqAQcsp1cW94A9xZzq3IqQ4/formResponse
	//

	var parts = url.match(/.*(formKey)=([^#&]+).*/i);

	if ( !parts )
		parts = url.match(/.*(key)=([^#&]+).*/i);

	if ( parts && parts.length > 2 )
		return [ parts[1], parts[2] ];

	return null;
}

function ModifyBodyCSSForResponsive(styleTag, thisObj, adjObj)
{
	var tempObj = null;
	if(typeof(adjObj) == 'undefined')
		tempObj = {height:thisObj.h, width:thisObj.w}
	else
		tempObj = adjObj;

    try
    {	
	    var startPos = -1;
	    var endPos = -1;
	    startPos = styleTag.innerHTML.indexOf("{",styleTag.innerHTML.indexOf("body"))+1;
	    endPos = styleTag.innerHTML.indexOf("}", startPos);
	    var originalStr = styleTag.innerHTML.substring(startPos, endPos);
	    var tokenZ = originalStr.split(";");
	    var newCSS = "";
	    while (tokenZ.length)
	    {
		    var attrib = tokenZ.shift();
		    attrib = ApplyCSSResponsiveChanges(attrib, thisObj, tempObj, false);
		    newCSS = newCSS + attrib;
	    }
	    originalStr = "body {"+originalStr+"}"
	    newCSS = "body {"+newCSS+"}"
	    styleTag.innerHTML = styleTag.innerHTML.replace(originalStr, newCSS);
    }
    catch (e) { }
}

function ModifyCSSForResponsive(styleTag, thisObj, scope)
{
	var objNamePos = 0;
    var bFound = false;
    var strNums = "0123456789";
	var scopeStopIndex = -1;
	
	var tempObj = {xOffset:0, yOffset:0, width: thisObj.w, height: thisObj.h, xOuterOffset:0, yOuterOffset:0, x:thisObj.x, y:thisObj.y, xAdj:0, yAdj:0, deltaX:0, deltaY:0};
	CorrectSizePosForEffects(thisObj, tempObj);
    while( objNamePos!=-1 && !bFound )
    {
        objNamePos = styleTag.innerHTML.indexOf(thisObj.name, objNamePos==0?0:objNamePos+1);
        if( objNamePos!=-1 && strNums.indexOf( styleTag.innerHTML.charAt( objNamePos+thisObj.name.length ) ) == -1 )
            bFound = true;
    }

    while( objNamePos != -1 )
    {
        var startPos = -1;
        var endPos = -1;
        var bPrefix = false;
        var strPrefix = "#";
        var strObjTag = thisObj.name;
    
        if( styleTag.innerHTML.charAt(objNamePos-1) == "." )
        {
            bPrefix = true;
            var prefixPos = objNamePos;
            while( prefixPos > 1 && styleTag.innerHTML.charAt(prefixPos-1) != " " ) prefixPos -= 1;
            if( prefixPos > 0 )
                strPrefix = styleTag.innerHTML.substr(prefixPos, objNamePos-prefixPos);
        }
        startPos = objNamePos+thisObj.name.length;
        while( styleTag.innerHTML.charAt(startPos) != "{" && startPos < styleTag.innerHTML.length )
        {
            strObjTag += styleTag.innerHTML.charAt(startPos);
            startPos += 1;
        }
        try 
        {
            startPos = styleTag.innerHTML.indexOf("{",startPos)+1;
            endPos = styleTag.innerHTML.indexOf("}", startPos);
            if( endPos != -1 )
            {
                var originalStr = styleTag.innerHTML.substring(startPos, endPos);
                var tokenZ = originalStr.split(";");
                var newCSS = "";
                while (tokenZ.length)
                {
                    var attrib = tokenZ.shift();
                    if( attrib.trim().length > 0 )
                    {
                        attrib = ApplyCSSResponsiveChanges(attrib, thisObj, tempObj, false);
                        newCSS = newCSS + attrib;
                    }
                }
                originalStr = strPrefix+strObjTag+"{"+originalStr+"}";
                newCSS = strPrefix+strObjTag+"{"+newCSS+"}";
                styleTag.innerHTML = styleTag.innerHTML.replace(originalStr, newCSS);
            
                bFound = false;
                while( objNamePos!=-1 && !bFound )
                {
                    objNamePos = styleTag.innerHTML.indexOf(thisObj.name, objNamePos+1);
                    if( objNamePos!=-1 && strNums.indexOf( styleTag.innerHTML.charAt( objNamePos+thisObj.name.length ) ) == -1 )
                        bFound = true;
                }
			
		        if(scope)
		        {
			        scopeStopIndex = styleTag.innerHTML.indexOf(scope);
			        if(objNamePos == scopeStopIndex)
			        {
				        bFound = false;
				        objNamePos = -1;
			        }
		        }
            }
            else
                break;
        }
        catch (e) { break; }
    }
}

function ApplyCSSResponsiveChanges(strAttrib, thisObj, tempObj, bOnlyDoTextScaling)
{
	var newAttrib = strAttrib;
	
	if( bOnlyDoTextScaling )
	{
        if( (typeof(thisObj.txtscale) != 'undefined') && thisObj.txtscale != 100 && (strAttrib.indexOf("font-size") > -1) )
        {
            var iPos = strAttrib.indexOf("font-size")+10;
            var strSize = "";
            while( strAttrib.charAt(iPos) != "p" )
            {
                strSize += strAttrib.charAt(iPos);
                iPos += 1;
            }
            var iSize = parseInt(strSize);
			//echo LD-1947 : Convert the text size back to pt format and then calculate the scaled size the same way we do in the c++. Then convert the scaled pt size to px. 
			var iPtSize = Math.floor( (((iSize*0.75) * thisObj.txtscale)+50)/100 );
			var iFSize = Math.round( iPtSize/0.75 );
            newAttrib = "font-size:"+iFSize+"px;";
        }
        else
            newAttrib = newAttrib+";";
		
		return newAttrib;
	}
	
	
	if(strAttrib.indexOf("left") > -1 && !(strAttrib.indexOf("left") > 0))
	{
		newAttrib = "left:"+tempObj.x+"px;";
	}
	else if(strAttrib.indexOf("top") > -1 && !(strAttrib.indexOf("top") > 0))
	{
		newAttrib = "top:"+tempObj.y+"px;";
	}
	else if(strAttrib.indexOf("width") > -1 && !(strAttrib.indexOf("width") > 0) && tempObj.width)
	{
		newAttrib = "width:"+tempObj.width+"px;";
	}
	else if(strAttrib.indexOf("height") > -1 && !(strAttrib.indexOf("height") > 0) && tempObj.height)
	{
		newAttrib = "height:"+tempObj.height+"px;";
	}
	else if(strAttrib.indexOf("clip") > -1 && !(strAttrib.indexOf("clip") > 0))
	{
		//echo LD-2322: The clipRect needs to be big enough for the iFrame border, which defaults to 2px each side.
		if(thisObj.name.indexOf("toc") > -1 && thisObj.useIFrame)
			newAttrib = "clip: rect("+tempObj.yAdj+"px,"+(parseInt(tempObj.width)+4)+"px,"+(parseInt(tempObj.height)+4)+"px,"+tempObj.xAdj+"px);"; 
		else
			newAttrib = "clip: rect("+tempObj.yAdj+"px,"+tempObj.width+"px,"+tempObj.height+"px,"+tempObj.xAdj+"px);";
	}
	else if(strAttrib.indexOf("background-color") > -1 && !(strAttrib.indexOf("background-color") > 0) && typeof thisObj.bgColor != "undefined")
	{
			newAttrib = strAttrib.substr(strAttrib.indexOf("background-color"));
	}
	else if(strAttrib.indexOf("background-image") > -1 && !(strAttrib.indexOf("background-image") > 0))
	{
		newAttrib = "background-image:URL('"+thisObj.bgImage+"');";
	}
	else if((strAttrib.indexOf("font-size") > -1) && (typeof(thisObj.fsize) != 'undefined'))
	{
		newAttrib = "font-size:"+thisObj.fsize+"px;";
	}
	else if((strAttrib.indexOf("-webkit-transform-origin") > -1))
	{
		newAttrib = "-webkit-transform-origin:"+tempObj.deltaX+"px "+tempObj.deltaY+"px;";
	}
	else if((strAttrib.indexOf("-moz-transform-origin") > -1))
	{
		newAttrib = "-moz-transform-origin:"+tempObj.deltaX+"px "+tempObj.deltaY+"px;";
	}
	else if((strAttrib.indexOf("transform-origin") > -1))
	{
		newAttrib = "transform-origin:"+tempObj.deltaX+"px "+tempObj.deltaY+"px;";
	}
	else if (strAttrib.trim().length == 0)
	{
		newAttrib = "";
	}
	else if (!(strAttrib == ""))
	{
		newAttrib = newAttrib+";";
	}
	return newAttrib;
}

function SaveStyles()
{
	var StyleTags = getDisplayDocument().getElementsByTagName('head')[0].getElementsByTagName('style');
	pageLayer.astrSavedStyles = new Array();
	var pgObj = arguments.length?arguments[0]:null;
	for( var i=0; i<StyleTags.length; i++ )
	{
		if(pgObj)
			if(StyleTags[i].id && StyleTags[i].id.indexOf(pgObj.cssName) == -1)
				continue;
		
		pageLayer.astrSavedStyles.push( StyleTags[i].innerHTML );
	}
}

function RestoreStyles()
{
	var StyleTags = getDisplayDocument().getElementsByTagName('head')[0].getElementsByTagName('style');
	var pgObj = null;
	
	if(isSinglePagePlayerAvail())
		pgObj = getPageObj(true);
	
	for( var i=0; i<pageLayer.astrSavedStyles.length; i++ )
	{
		if(pgObj)
		{
			if(StyleTags[i].id && StyleTags[i].id.indexOf(pgObj.cssName) != -1)
				StyleTags[i].innerHTML = pageLayer.astrSavedStyles[i];
		}
		else
			StyleTags[i].innerHTML = pageLayer.astrSavedStyles[i];
	}
}

function ModifyStyleForResponsive(styleTag, thisObj, strSel, strNewDecl)
{
	var selPos = 0;
	var bFound = false;
	var strNums = "0123456789";
	while( selPos!=-1 && !bFound )
	{
		selPos = styleTag.innerHTML.indexOf(strSel, selPos==0?0:selPos+1);
		if( selPos!=-1 && strNums.indexOf( styleTag.innerHTML.charAt( selPos+thisObj.name.length ) ) == -1 )
			bFound = true;
	}

	if( selPos != -1 )
	{
		var endPos = -1;
		endPos = styleTag.innerHTML.indexOf("}", selPos);
		if( endPos != -1 )
		{
			var origRule = styleTag.innerHTML.substring(selPos, endPos+1);
			var newRule = strSel + " " + strNewDecl;
			styleTag.innerHTML = styleTag.innerHTML.replace(origRule, newRule);
		}
	}
}

function ModifyStyleForResponsiveBulk(styleTag, thisObj, strSel, strNewDecl)
{
	var selPos = 0;
	var bFound = false;
	while( selPos!=-1 && !bFound )
	{
		selPos = styleTag.indexOf(strSel, selPos==0?0:selPos+1);
		if( selPos!=-1 )
			bFound = true;
	}

	if( selPos != -1 )
	{
		var endPos = -1;
		endPos = styleTag.indexOf("}", selPos);
		if( endPos != -1 )
		{
			var origRule = styleTag.substring(selPos, endPos+1);
			var newRule = strSel + " " + strNewDecl;
			styleTag = styleTag.replace(origRule, newRule);
		}
	}
	
	return styleTag;
}

function ModifyCSSBulk( strCSS, thisObj, bOnlyDoTextScaling )
{
	
	var arrCSSSplit = strCSS.split('}');
	for( var i=0; i<arrCSSSplit.length; i++ )
	{
		var startPos = arrCSSSplit[i].indexOf( '{' )+1;
		if( startPos == -1 )
			continue;
		var originalStr = arrCSSSplit[i].substring(startPos);
		var tokenZ = originalStr.split(";");
		var newCSS = "";
		var tempObj = {xOffset:0, yOffset:0, width: thisObj.w, height: thisObj.h, xOuterOffset:0, yOuterOffset:0, x:thisObj.x, y:thisObj.y, xAdj:0, yAdj:0, deltaX:0, deltaY:0};
		CorrectSizePosForEffects(thisObj, tempObj);
						
		while (tokenZ.length)
		{
			var attrib = tokenZ.shift();
			if( attrib.trim().length > 0 )
			{
				attrib = ApplyCSSResponsiveChanges(attrib.trim(), thisObj, tempObj, bOnlyDoTextScaling);
				newCSS = newCSS + attrib;
			}
		}
		arrCSSSplit[i] = arrCSSSplit[i].replace(originalStr, newCSS);
	}
	
	var retCSS = arrCSSSplit.join('}');
	return retCSS;
}

function FindAndModifyObjCSSBulk( thisObj, stylemods )
{	

	if( thisObj.css )
	{
		thisObj.css = ModifyCSSBulk( thisObj.css, thisObj, false )
		if( typeof(stylemods) != "undefined" && stylemods != null )
		{
			for(var i=0; i<stylemods.length; i++)
				thisObj.css = ModifyStyleForResponsiveBulk(thisObj.css, thisObj, stylemods[i].sel, stylemods[i].decl);
		}
	}


	//Normal and Shapes
	if( thisObj.textDivCSS )
	{
		thisObj.textDivCSS = ModifyCSSBulk( thisObj.textDivCSS, thisObj, false );
		if( typeof(stylemods) != "undefined" && stylemods != null )
		{
			for(var i=0; i<stylemods.length; i++)
				thisObj.textDivCSS = ModifyStyleForResponsiveBulk(thisObj.textDivCSS, thisObj, stylemods[i].sel, stylemods[i].decl);
		}
	}
	if( thisObj.spanDivCSS )
	{
		thisObj.spanDivCSS = ModifyCSSBulk( thisObj.spanDivCSS, thisObj, false );
		if( typeof(stylemods) != "undefined" && stylemods != null )
		{
			for(var i=0; i<stylemods.length; i++)
				thisObj.spanDivCSS = ModifyStyleForResponsiveBulk(thisObj.spanDivCSS, thisObj, stylemods[i].sel, stylemods[i].decl);
		}
	}
	
	//Text Buttons
	if(thisObj.btnStates) for (var j=0;j < thisObj.btnStates.length;j++)
	{
		if(thisObj.stateTextValues)
		{
			var textVal = thisObj.stateTextValues[thisObj.btnStates[j]];
		
			if( textVal.div )
			{
				textVal.div = ModifyCSSBulk( textVal.div, thisObj, false );
				if( typeof(stylemods) != "undefined" && stylemods != null )
				{
					for(var i=0; i<stylemods.length; i++)
						textVal.div = ModifyStyleForResponsiveBulk(textVal.div, thisObj, stylemods[i].sel, stylemods[i].decl);
				}
			}
			if( textVal.span )
			{
				textVal.span = ModifyCSSBulk( textVal.span, thisObj, false );
				if( typeof(stylemods) != "undefined" && stylemods != null )
				{
					for(var i=0; i<stylemods.length; i++)
						textVal.span = ModifyStyleForResponsiveBulk(textVal.span, thisObj, stylemods[i].sel, stylemods[i].decl);
				}
			}
		}
	}	
		
	if( thisObj.arrCSSStyles )
	{
		for( var j=0; j< thisObj.arrCSSStyles.length; j++ )
		{
			thisObj.arrCSSStyles[j] = ModifyCSSBulk( thisObj.arrCSSStyles[j], thisObj, false );
			if( typeof(stylemods) != "undefined" && stylemods != null )
			{
				for(var i=0; i<stylemods.length; i++)
					thisObj.arrCSSStyles[j] = ModifyStyleForResponsiveBulk(thisObj.arrCSSStyles[j], thisObj, stylemods[i].sel, stylemods[i].decl);
			}
		}
	} 
}

function FindAndModifyObjCSS(thisObj,stylemods)
{
	var styleTags = getDisplayDocument().getElementsByTagName('style');
	var styleTag = null;
	for(var index = 0; index < styleTags.length; index++)
	{
		var styTag = styleTags[index];
		if(styTag.innerHTML.indexOf(thisObj.name) > -1)
		{
			styleTag = styTag;
			if(styleTag)
			{
				ModifyCSSForResponsive(styleTag, thisObj, null);
				if( typeof(stylemods) != "undefined" && stylemods != null )
				{
					for(var i=0; i<stylemods.length; i++)
						ModifyStyleForResponsive(styleTag, thisObj, stylemods[i].sel, stylemods[i].decl);
				}
			}
		}
	}	
}

function AdjustAttributesForEffects(thisObj, objAttribs)
{
	var attribs = objAttribs;
	if(typeof(attribs) == "undefined")
		attribs = {xOffset:0, yOffset:0, width: thisObj.w, height: thisObj.h, xOuterOffset:0, yOuterOffset:0};
	
	var heightRatio = (attribs.height/thisObj.oh);
	var widthRatio = (attribs.width/thisObj.ow);
	thisObj.w = attribs.width;
    thisObj.h = attribs.height;
	if(typeof(thisObj.hasReflection) != "undefined" && thisObj.hasReflection)
	{
		thisObj.reflectedImageHeight = thisObj.h;
		thisObj.reflectedImageWidth = thisObj.w;
		var reflectDiff = 0;
		var mainDiv = getHTMLEleByID(thisObj.name);
		var y_Pos = thisObj.y;
		var x_Pos = thisObj.x
		if(mainDiv)
		{
			if(parseFloat(mainDiv.style.top))
				y_Pos = parseFloat(mainDiv.style.top);
			if(parseFloat(mainDiv.style.left))
				x_Pos = parseFloat(mainDiv.style.left);
		}
		
		reflectDiff = thisObj.reflectionPosDiffY *heightRatio;
		thisObj.reflectedImageY = y_Pos + reflectDiff;
		thisObj.reflectedImageX = x_Pos;
		thisObj.wrkAdornerHeight = thisObj.adornerHeight * heightRatio;
		thisObj.wrkAdornerWidth = thisObj.adornerWidth *widthRatio;

	}
	if(typeof(thisObj.hasOuterShadow) != "undefined" && thisObj.hasOuterShadow)
	{
			
			var hOffset = 0;
			var wOffset = 0;
			
			
			var outerRadians = (thisObj.outerShadowDirection) * (Math.PI / 180.0);
			thisObj.outerShadowDepth = Math.sqrt(Math.pow((thisObj.originalOuterShadowDepth * Math.cos(outerRadians)) *heightRatio,2) + Math.pow((-1 * thisObj.originalOuterShadowDepth * Math.sin(outerRadians)) *widthRatio,2));
			
			
			var xOuterOffset = thisObj.outerShadowDepth * Math.cos(outerRadians);
			//Multiply by -1 because a negative offset means this shadow is in the positive y-direction on the screen
			var yOuterOffset = -1 * thisObj.outerShadowDepth * Math.sin(outerRadians);

			attribs.xOffset = parseFloat(xOuterOffset.toFixed(5));
			attribs.yOffset = parseFloat(yOuterOffset.toFixed(5));
			attribs.xOffset += (((attribs.xOffset<0)?-2:2)*thisObj.outerShadowBlurRadius);
			attribs.yOffset += (((attribs.yOffset<0)?-2:2)*thisObj.outerShadowBlurRadius);
			hOffset = Math.abs(attribs.yOffset);
			wOffset = Math.abs(attribs.xOffset);
			
			attribs.width+=wOffset;
			attribs.height+=hOffset;
			
			attribs.xOuterOffset = xOuterOffset;
			attribs.yOuterOffset = yOuterOffset;
	}
	if(typeof(thisObj.hasBorder) != "undefined" && thisObj.hasBorder > 0)
	{
		if(thisObj.lineStyle <3)
		{
			attribs.width+=(thisObj.borderWeight*2);
			attribs.height+=(thisObj.borderWeight*2);
		}
	}
}

function CorrectSizePosForEffects(thisObj, objToCorrect)
{
	//If hasOuterShadow does not exist then there is nothing to do here
	if(typeof(thisObj.hasOuterShadow) != "undefined")
	{
		AdjustAttributesForEffects(thisObj, objToCorrect);
	  
	    if(is.vml)
	    {
		  var adjustedXPos = thisObj.ie8DivX;
		  var adjustedYPos = thisObj.ie8DivY;
		  var adjustedWidth = thisObj.ie8DivWidth;
		  var adjustedHeight = thisObj.ie8DivHeight;
	    }
	    else
	    {
		  var adjustedXPos = thisObj.x;
		  var adjustedYPos = thisObj.y;
		  var adjustedWidth = thisObj.w;
		  var adjustedHeight = thisObj.h;  
	    }
		
		var borderWeight = 0;
		if(typeof(thisObj.borderWeight) != "undefined")
			borderWeight = thisObj.borderWeight;
		  
		if(thisObj.hasOuterShadow)
		{
			if(is.vml)
			{	
				if(thisObj.vf == 1)
					objToCorrect.yOuterOffset *= -1;
				if(thisObj.hf == 1)
					objToCorrect.xOuterOffset *= -1;
				
				if(objToCorrect.xOuterOffset < 0 || objToCorrect.yOuterOffset < 0)
				{
					if(objToCorrect.xOuterOffset < 0 && objToCorrect.yOuterOffset >= 0)
					{
						objToCorrect.yAdj = (-1 * thisObj.outerShadowBlurRadius);
						objToCorrect.xAdj = (objToCorrect.xOuterOffset - thisObj.outerShadowBlurRadius);
					}
					else if(objToCorrect.xOuterOffset >= 0 && objToCorrect.yOuterOffset < 0)
					{
						objToCorrect.yAdj = (objToCorrect.yOuterOffset - thisObj.outerShadowBlurRadius);
						objToCorrect.xAdj = (-1 * thisObj.outerShadowBlurRadius);
					}
					else
					{
						objToCorrect.yAdj = (objToCorrect.yOuterOffset - thisObj.outerShadowBlurRadius);
						objToCorrect.xAdj = (objToCorrect.xOuterOffset - thisObj.outerShadowBlurRadius);
					}
				}
				else
				{
					objToCorrect.yAdj = (-1 * thisObj.outerShadowBlurRadius);
					objToCorrect.xAdj = (-1 * thisObj.outerShadowBlurRadius);
				}
				objToCorrect.width = (adjustedWidth + (2*borderWeight) + thisObj.outerShadowBlurRadius + (1 * Math.abs(objToCorrect.xOuterOffset)));
				objToCorrect.height = (adjustedHeight + (2*borderWeight) + thisObj.outerShadowBlurRadius + (1 * Math.abs(objToCorrect.yOuterOffset)));
			}
			else
			{		
				adjustedWidth = thisObj.w + (1 * Math.abs(objToCorrect.xOuterOffset)) + (2 * borderWeight) + thisObj.outerShadowBlurRadius;
				adjustedHeight = thisObj.h + (1 * Math.abs(objToCorrect.yOuterOffset)) + (2 * borderWeight) + thisObj.outerShadowBlurRadius; 
					
				if(objToCorrect.xOuterOffset < 0 || objToCorrect.yOuterOffset < 0)
				{
					if(objToCorrect.xOuterOffset < 0 && objToCorrect.yOuterOffset >= 0)
					{
						adjustedXPos += (objToCorrect.xOuterOffset - thisObj.outerShadowBlurRadius);
						objToCorrect.xAdj = (objToCorrect.xOuterOffset - thisObj.outerShadowBlurRadius);
					}
					else if(objToCorrect.xOuterOffset >= 0 && objToCorrect.yOuterOffset < 0)
					{	
						adjustedYPos += (objToCorrect.yOuterOffset - thisObj.outerShadowBlurRadius);
						objToCorrect.yAdj = (objToCorrect.yOuterOffset - thisObj.outerShadowBlurRadius);
					}
					else
					{
						adjustedXPos += (objToCorrect.xOuterOffset - thisObj.outerShadowBlurRadius);
						adjustedYPos += (objToCorrect.yOuterOffset - thisObj.outerShadowBlurRadius);
						objToCorrect.yAdj = (objToCorrect.yOuterOffset - thisObj.outerShadowBlurRadius);
						objToCorrect.xAdj = (objToCorrect.xOuterOffset - thisObj.outerShadowBlurRadius);
					}
					objToCorrect.y = adjustedYPos;
					objToCorrect.x = adjustedXPos;
					objToCorrect.width = adjustedWidth;
					objToCorrect.height = adjustedHeight;
				}
				else
				{
					objToCorrect.width = adjustedWidth + thisObj.outerShadowBlurRadius;
					objToCorrect.height = adjustedHeight + thisObj.outerShadowBlurRadius;
				}
			}
		}	
	}
	if(typeof(thisObj.r) != "undefined")
	{
		var radians = thisObj.r * (Math.PI / 180.0);
	
		//if the image has a shadow, the point of rotation needs to be adjusted
		var yOffset = 0;
		var xOffset = 0;
		if(typeof(thisObj.hasOuterShadow) != "undefined" && thisObj.hasOuterShadow > 0)
		{
			xOffset = objToCorrect.xOuterOffset;
			yOffset = objToCorrect.yOuterOffset;
		}
		
		var deltaCenterX = 0;
		var deltaCenterY = 0;
		
		deltaCenterX = thisObj.w / 2.0;
		deltaCenterY = thisObj.h / 2.0;
		
		if(xOffset < 0) 
			deltaCenterX = deltaCenterX - (xOffset - thisObj.outerShadowBlurRadius);
		if(yOffset < 0) 
			deltaCenterY = deltaCenterY - (yOffset - thisObj.outerShadowBlurRadius);
		
		objToCorrect.deltaX = deltaCenterX;
		objToCorrect.deltaY = deltaCenterY;
	}
	
	if(typeof(ObjButton) != "undefined" && thisObj.constructor == ObjButton)
	{
		if(!thisObj.name.indexOf("button")>-1)
			objToCorrect.width +=3
	}
	
	if(typeof(ObjInline) != "undefined")
	{
		if(IsRSSFeed(thisObj))
		{
			objToCorrect.width +=2;
			objToCorrect.height+=2;
		}
	}
}

function ModifySVGShadow(thisObj, objAttribs)
{
	var width = 0;
	var height = 0;
	var xDisplacementPercentage = 0;
	var yDisplacementPercentage = 0;
	
	var svgTag = getHTMLEleByID((isSinglePagePlayerAvail() ? window.trivPlayer.activePage.nameNoEx + '_' + thisObj.name : thisObj.name)+"Shadow");

	if(objAttribs.xOffset <= 0 || objAttribs.yOffset <= 0 ||thisObj.lineWeight)
	{
		if(objAttribs.xOffset <= 0)
		{
			xDisplacementPercentage = (((objAttribs.xOffset - thisObj.outerShadowBlurRadius) / thisObj.w)* 100).toFixed(5);
		}
		else if( thisObj.lineWeight && thisObj.bUseSvgFile) xDisplacementPercentage = -1*((((thisObj.lineWeight*2)) / thisObj.w) * 100).toFixed(5);
		
		
		if(objAttribs.yOffset <= 0)
		{
			yDisplacementPercentage = (((objAttribs.yOffset - thisObj.outerShadowBlurRadius) / thisObj.h)* 100).toFixed(5);
		}
		else if (thisObj.lineWeight && thisObj.bUseSvgFile) yDisplacementPercentage = (thisObj.lineWeight==0? 1:-1)*((((thisObj.lineWeight*2) - 2) / thisObj.h) * 100).toFixed(5);
		
		width = 100*(Math.abs(objAttribs.xOffset) + thisObj.w + 2*thisObj.outerShadowBlurRadius)/thisObj.w;
		height = 100 * (Math.abs(objAttribs.yOffset) + thisObj.h + 2*thisObj.outerShadowBlurRadius)/thisObj.h;
		
		if( width < 200)
			width = 200;
		if( height < 200)
			height =200;	
	}
	else
	{
		width = 200 + 200 * (thisObj.originalOuterShadowDepth/100);
		height = 200 + 200 * (thisObj.originalOuterShadowDepth/100);
	}
	if(svgTag && is.svg)
	{
		svgTag.height.baseVal.valueInSpecifiedUnits = height;
		svgTag.width.baseVal.valueInSpecifiedUnits = width;
		svgTag.x.baseVal.valueInSpecifiedUnits = xDisplacementPercentage;
		svgTag.y.baseVal.valueInSpecifiedUnits = yDisplacementPercentage;
		
		var feOffset = null;
		for (var index = 0; index< svgTag.childNodes.length; index++)
		{
			if(svgTag.childNodes[index].nodeName == "feOffset")
			{
				feOffset = svgTag.childNodes[index];
				break;
			}
		}
		if(feOffset)
		{
			feOffset.dx.baseVal = objAttribs.xOuterOffset;
			feOffset.dy.baseVal = objAttribs.yOuterOffset;
		}
	}
	
}

function ModifyReflection(thisObj)
{
	var reflecDiv = getHTMLEleByID(thisObj.name+'ReflectionDiv');
	var reflecImg = getHTMLEleByID(thisObj.name+'Reflection'); 
	var reflecSVG = null;
	var reflecMask = null;
	if(reflecDiv)
	{
		reflecSVG = reflecDiv.getElementsByTagName('svg')[0];
		reflecMask = reflecDiv.getElementsByTagName('rect')[0];
	}
	
	
	var deltaCenterX = 0;
	var deltaCenterY = 0;
	
	if(thisObj.wrkAdornerWidth == 0 || thisObj.wrkAdornerHeight == 0)
	{
		deltaCenterX = thisObj.reflectedImageWidth / 2.0;
		deltaCenterY = thisObj.reflectedImageHeight / 2.0;
	}
	else
	{
		deltaCenterX = (thisObj.wrkAdornerWidth / 2.0) - thisObj.boundsRectX;
		deltaCenterY = (thisObj.wrkAdornerHeight / 2.0) - thisObj.boundsRectY;
	}
	
	if(reflecDiv)
	{
		reflecDiv.style.top = thisObj.reflectedImageY+'px';
		reflecDiv.style.left = thisObj.reflectedImageX+'px';
		reflecDiv.style.width = thisObj.reflectedImageWidth+'px';
		reflecDiv.style.height = thisObj.reflectedImageHeight+'px';
		if(!is.awesomium)
			reflecDiv.style.transformOrigin = deltaCenterX+'px '+deltaCenterY+'px 0px';
		
		if(reflecDiv.style.webkitTransformOrigin)
			reflecDiv.style.webkitTransformOrigin = deltaCenterX+'px '+deltaCenterY+'px 0px';
	}
	
	if(reflecSVG)
	{
		reflecSVG.style.width = thisObj.reflectedImageWidth+'px';
		reflecSVG.style.height = thisObj.reflectedImageHeight+'px';
		
		var pathReflect = reflecSVG.querySelector("path");
		if(pathReflect)
			pathReflect.setAttribute( "d", thisObj.str_SvgMapPath);
	}
	
	
	if(reflecImg)
	{
		reflecImg.width.baseVal.valueInSpecifiedUnits = thisObj.reflectedImageWidth;
		reflecImg.height.baseVal.valueInSpecifiedUnits = thisObj.reflectedImageHeight;
	}

	if(reflecMask)
	{
		reflecMask.width.baseVal.valueInSpecifiedUnits = thisObj.reflectedImageWidth;
		reflecMask.height.baseVal.valueInSpecifiedUnits = thisObj.reflectedImageHeight;
	}

	if(is.awesomium)
	{
		if(thisObj.bFixedPosition){
			//anchored objects are in their own div. No need to rebuild the the reflection
			//as they are already rebuilt on responsive change
		}
		else{
			var page = getHTMLEleByID(GetCurrentPageID());
			if(page)
			{
				var divRebuild = page.removeChild(reflecDiv);
				page.appendChild(divRebuild);
			}
		}

	}
	
}

function ModifyImageTag(thisObj, objAttribs, bResp)
{
	var divTag = getHTMLEleByID(thisObj.name);
	if(divTag)
	{
		var svgTag = divTag.getElementsByTagName('svg');
		//Only do inline modifications if it is svg
		if(svgTag && svgTag.length > 0 )
		{
			svgTag = svgTag[0];
			var imageTag = svgTag.getElementById(thisObj.name+'Img');
			var bSVGImage = (imageTag?true:false);
			if(bSVGImage || (thisObj.bUseSvgFile && svgTag && thisObj.hasOuterShadow))
			{
				svgTag.width.baseVal.valueInSpecifiedUnits = objAttribs.width;
				svgTag.height.baseVal.valueInSpecifiedUnits = objAttribs.height;
				
				if(imageTag)
				{
					imageTag.width.baseVal.valueInSpecifiedUnits = thisObj.w;
					imageTag.height.baseVal.valueInSpecifiedUnits = thisObj.h;
				}
			}	
			
			if(bResp)
			{
				svgTag.removeAttribute( "viewBox");
				var objMap = getHTMLEleByID(thisObj.name + "SVG");
				if (objMap)
					objMap.removeAttribute( "viewBox");
			}
		}

	}

	var textDivTag = getHTMLEleByID(thisObj.name + "TextDiv");
	if(textDivTag && !bResp)
	{
		textDivTag.style.width = thisObj.w + 'px';
		textDivTag.style.height = thisObj.h + 'px';

		var textSpanTag = getHTMLEleByID(thisObj.name + "TextSpan");
		if(textSpanTag)
		{
			var spanWidth = textSpanTag.clientWidth;
			var spanHeight = textSpanTag.clientHeight;
			var scaleHeight, scaleWidth;

			scaleWidth = ((thisObj.w * 80) / 100) / spanWidth; 
			scaleHeight = ((thisObj.h * 80) / 100) / spanHeight; 


			textSpanTag.style.transform = "scale("+ scaleWidth + ", "+ scaleHeight + ")"
		}
	}
	else if (textDivTag && bResp)
	{
		textDivTag.style.width = '';
		textDivTag.style.height = '';

		var textSpanTag = getHTMLEleByID(thisObj.name + "TextSpan");
		if(textSpanTag)
			textSpanTag.style.transform = ""
		
	}
	
	var objMap = getHTMLEleByID(thisObj.name+"MapArea");
	if(objMap)
	{
		if(!thisObj.bUseSvgFile && AdjustClickPointsForAct(thisObj, bResp))
		{
			if(thisObj.bSVGMap)
			{
				var newPath = thisObj.str_SvgMapPath;
				var pathTag = objMap.getElementsByTagName("path");
				if(pathTag)
					pathTag[0].setAttribute( "d" , newPath);
				var svgMapTag = getHTMLEleByID(thisObj.name+"SVG");
				if(svgMapTag)
				{
					svgMapTag.width.baseVal.value = thisObj.w;
					svgMapTag.height.baseVal.value = thisObj.h;
				}
			}
			else
				objMap.coords = thisObj.str_ImageMapCoords;  
		}
		else
		{
			if(thisObj.bSVGMap)
			{
				var newPath = thisObj.str_SvgMapPath;
				var pathTag = objMap.getElementsByTagName("path");
				if(pathTag)
					pathTag[0].setAttribute( "d" , newPath);
				var svgMapTag = getHTMLEleByID(thisObj.name+"SVG");
				if(svgMapTag)
				{
					svgMapTag.width.baseVal.value = thisObj.w;
					svgMapTag.height.baseVal.value = thisObj.h;
				}
			}
			else
				objMap.coords = thisObj.str_ImageMapCoords;  
		}
	}
	
	var objPath = getHTMLEleByID(thisObj.name+"path");
	if(objPath)
		objPath.setAttribute( "d" , thisObj.str_SvgMapPath);
	
	var objTextPath = getHTMLEleByID(thisObj.name+"text");
	if(objTextPath)
	 objTextPath.setAttribute( "d" , thisObj.str_SvgMapPath);
	
	var objImgFPath = getHTMLEleByID(thisObj.name+"imgF");
	if(objImgFPath)
		objImgFPath.setAttribute( "d" , thisObj.str_SvgMapPath);
	
	if(typeof(bResp) == "undefined")
		FindAndModifyObjCSS(thisObj);
}

function ModifyTextEffect(thisObj)
{
	if(typeof(thisObj.hasBorder) != "undefined" && thisObj.hasBorder > 0)
	{
		if(thisObj.lineStyle >=3)
		{
			var borderTag = getHTMLEleByID(thisObj.name+"border");
			//If we cannot find the div then there is nothing for us to do
			if(!borderTag)
				return;
			borderTag.width.baseVal.valueInSpecifiedUnits = thisObj.w;
			borderTag.height.baseVal.valueInSpecifiedUnits = thisObj.h;
			
			var pIh = (thisObj.h/thisObj.oh);
			var pIw = (thisObj.w/thisObj.ow);
			
			var borderArray = [thisObj.borderLeft, thisObj.borderTop, thisObj.borderBottom, thisObj.borderRight];
			var adjustedBorder = [];
			//Adjust the coordinates of the border
			for (var count = 0; count < 4; count++)
			{
				var pts = borderArray[count].toString().split(",");
				var ptsStr = "";
				for (index = 0; index < pts.length; index++)
				{
					var x = 0;
					var y = 0;
					if(index%2 == 0)
					{
						x = parseFloat(pts[index]);
						if(x)
						{
							x = x * pIw;
							ptsStr+= x.toFixed(2).toString();
						}
						else
						{
							ptsStr+=pts[index];
						}
					}
					else
					{
						y = parseFloat(pts[index]);
						if(y)
						{
							y = y * pIh;
							ptsStr+= y.toFixed(2).toString();
						}
						else
						{
							ptsStr+=pts[index];
						}
					}
					if(index+1 != pts.length)
						ptsStr+= ", ";
				}
				adjustedBorder.push(ptsStr);
			}
			var polyArr = borderTag.getElementsByTagName("polygon");
			if(polyArr)
			{
				for( var index = 0; index < polyArr.length; index++)
				{
					var polyTag = polyArr[index];
					polyTag.setAttribute("points", adjustedBorder[index]);
				}
			}
			
			var txtDiv = getHTMLEleByID(thisObj.name+"div");
			txtDiv.style.width = (thisObj.w - (parseFloat(txtDiv.style.left)*2))+"px";
			txtDiv.style.height = (thisObj.h - (parseFloat(txtDiv.style.top)*2))+"px";
		}
		else
		{
			var txtDiv = getHTMLEleByID(thisObj.name);
			if(txtDiv)
			{
				txtDiv.style.width = thisObj.w+"px";
				txtDiv.style.height = thisObj.h+"px";
			}
		}
	}
	
	if((typeof(thisObj.hasOuterShadow) != "undefined" && thisObj.hasOuterShadow) ||
	   (typeof(thisObj.hasTextShadow) != "undefined" && thisObj.hasTextShadow))
	{
		var txtDiv = getHTMLEleByID(thisObj.name);
		if(txtDiv)
		{
			txtDiv.style.width = thisObj.w+"px";
			txtDiv.style.height = thisObj.h+"px";
		}
	}
}

function UpdateObjLayerValues(thisObj, bHonorMove)
{
	if(typeof(bHonorMove) == "undefined")
		bHonorMove = false;
	
	if(thisObj)
	{
		if(thisObj.objLyr)
		{		
			var objDiv = getHTMLEleByID(thisObj.name);
			var bUpdatePos = true;
			if(objDiv)
			{
				objDiv.style.clip = "";
				if(bHonorMove)
					bUpdatePos = !thisObj.objLyr.hasMoved;
				
				if(bUpdatePos)
				{
					objDiv.style.left = "";
					objDiv.style.top = "";
				}
				
				thisObj.objLyr.x = objDiv.offsetLeft;
				thisObj.objLyr.y = objDiv.offsetTop;
				thisObj.objLyr.w = objDiv.offsetWidth;
				thisObj.objLyr.h = objDiv.offsetHeight;
			}
			
			thisObj.objLyr.hasMoved = false; //LD-2124
		}
	}
	else
	{
		for (var index = 0; index < arObjs.length; index++)
		{
			UpdateObjLayerValues(arObjs[index], bHonorMove);
		}
	}
}

//LHD --- LD-1407 Special security check
function IsVmlCheck(isIe8Or9)
{
	if ( (isIe8Or9) && document.namespaces && !document.namespaces['v'] )
		document.namespaces.add('v', 'urn:schemas-microsoft-com:vml', "#default#VML");

	var bIsEnabled = true;
	try{
		var vmlCheck = document.createElement("v:oval");
		if(typeof(vmlCheck.filters) != "object")
			bIsEnabled = false;
	}
	catch(e){
		bIsEnabled = false;
	}
	return bIsEnabled;
}

function IsSvgCheck()
{
	var result = (document.createElementNS != undefined &&
				  document.createElementNS("http://www.w3.org/2000/svg", "path") &&
				  document.createElement("BUTTON").addEventListener != undefined); 
				
	return result;
}

function GetIdFromSvgSrc(src){
	var strId;
	
	var startPos = src.indexOf("id=\"") + 4;
	var endPos = src.indexOf("\"", startPos);
	
	strId = src.slice(startPos, endPos); 
	
	return strId;
}

function UseHtmlImgTag(obj){
	if(obj && is.ie8 & obj.r > 0)
		return false;
	
	if( obj && (obj.bEmbeddedIE8IE9Img || !(obj.hasOuterShadow || obj.hasReflection || obj.r>0 || obj.vf == 1 || obj.hf == 1) ) )
		return true;
		
	return false;
}

//LHD --- LD-2019 In the case of firefox and flash applications we cannot perform scale
function CanScale()
{
	if( window && window.bTrivResponsive )
	{
		for (var index = 0; index < arObjs.length; index++)
		{
			if(typeof(ObjInline) != "undefined" && arObjs[index].constructor == ObjInline)
				if(arObjs[index].iType == "flash" && is.firefox)
					return false;
		}
		if(is.awesomium && window.bTrivRunView)
			return false;
	}
	return true;
}
//For YouTube API
function onYouTubeIframeAPIReady() 
{
	is.YTScriptLoaded = true;
}

//LHD Just a generic function for adding files to the head of the HTML
function AddFileToHTML(file, type, callBack, id, docToUse)
{
	var tag = null;
	var tagChecker = '';
	var doc = document;
	
	if(docToUse)
		doc = docToUse;
	
	if(type == "script")
	{
		//Ensure we only add once
		tagChecker = '<script type="text/javascript" src='+file+'>';
		if(doc.getElementsByTagName('head')[0].innerHTML.indexOf(tagChecker) ==-1)
		{
			tag = doc.createElement('script');
			tag.type = "text/javascript";
			tag.src = file;
			if(typeof(id) !== "undefined" && id != null)
				tag.id = id;
			if(typeof(callBack) !== "undefined" && callBack != null)
			{
				var bIsString = typeof(callBack) == "string";
				if(!is.ie)
					tag.onreadystatechange = function(){bIsString?eval(callBack):callBack();};
				
				tag.onload = function(){bIsString?eval(callBack):callBack();};
			}

			doc.getElementsByTagName('head')[0].appendChild(tag);
		}			
	}
	
	if(type == "css")
	{
		//Ensure we only add once
		tagChecker = '<link rel="stylesheet" type="text/css" href='+file+'>';
		if(doc.getElementsByTagName('head')[0].innerHTML.indexOf(tagChecker) ==-1)
		{
			tag = doc.createElement('link');
			tag.rel = "stylesheet";
			tag.type = "text/css";
			tag.href = file;
			if(typeof(id) !== "undefined" && id != null)
				tag.id = id;
			if(typeof(callBack) !== "undefined" && callBack != null)
			{
				var bIsString = typeof(callBack) == "string";
				if(!is.ie)
					tag.onreadystatechange = function(){bIsString?eval(callBack):callBack();};
				
				tag.onload = function(){bIsString?eval(callBack):callBack();};
			}

			doc.getElementsByTagName('head')[0].appendChild(tag);
		}			
	}		 
}

//echo LD-768 : Putting all degradation rules for IE into this function
//echo bug 21691 : Graceful Degradation
function ObjDegradeEffects(thisObj , isButton)
{
	
	//echo LD-838 : We use a css rotation for IE9 and a direct-x filter for rotation in IE8. 
	//              So the check for is.DXFilterSupported will not tell us if an IE browser in compatibility mode supports the way we do rotation.
	if(thisObj.name.indexOf("audio") > -1)
		thisObj.bCanRotate = false;
	else if(is.vml && is.ie8 && !is.DXFilterSupported)
		thisObj.bCanRotate = false;
	else
		thisObj.bCanRotate = true;
	
	if(is.vml)
	{
		if(!is.DXFilterSupported){
			thisObj.hasOuterShadow = false;
			thisObj.hasReflection = false;		
		}
		else if(thisObj.opacity < 100){
			thisObj.hasOuterShadow = false;
			thisObj.hasReflection = false;
		}
		else if(thisObj.r > 0){
			thisObj.hasOuterShadow = false;
			thisObj.hasReflection = false;
		}
		else if(thisObj.vf == 1 || thisObj.hf == 1){
			thisObj.hasOuterShadow = false;
			thisObj.hasReflection = false;
		}
		else if(is.ie8)
		{
			thisObj.hasOuterShadow = false;
			thisObj.hasReflection = false;
		}
		else if (is.ie9 && isButton)
			thisObj.hasOuterShadow = false;
	}
}

function PreloadResources(arObjs)
{
	var strPreloads = "";
	if (arObjs && typeof(arObjs) == 'object' )
	{
		for (var idx=0; idx<arObjs.length; idx++)
		{
			var curObj = arObjs[idx];
			if ( curObj && typeof(curObj.getPreloadString) == 'function' )
			{
				var curPreload = curObj.getPreloadString();
				if ( curPreload && curPreload.length )
				{
					if (strPreloads.length ) strPreloads += ",";
					strPreloads += curPreload;
				}
			}
		}
	}
	if ( strPreloads.length )
		setTimeout( "preload( " + strPreloads + " )", 0 )
}

function GetDevicePreload()
{
	if(is.jsonData)
	{
		var respValues = is.jsonData[is.clientProp.device];
		var newValues = null;
		if(respValues)
			newValues = respValues[is.clientProp.width];
		if(newValues)
		{
			return newValues.preload;
		}
	}
	return '';
}

function GetPageWidth()
{
	var pageWidth = -1;
	if(window && window.bTrivResponsive)
	{
		if(is.jsonData != null)
		{
			var respValues = is.jsonData[is.clientProp.device];
			var newValues;
			newValues = respValues[is.clientProp.width];
			var obj = newValues["pageLayer"];
			if(obj)
			{
				pageWidth = obj.w;
			}
		}
		else
		{
			//If we don't have the responsive data use the defaults
			pageWidth = is.clientProp.width;
		}	
	}
	else
	{
		var pageDiv = getHTMLEleByID(GetCurrentPageID());
		if(pageDiv)
		{
			pageWidth = parseInt(pageDiv.style.width);

			if(isNaN(pageWidth))
				pageWidth = pageDiv.offsetWidth;
		}
	}

	if(pageWidth == 0 || pageWidth == -1)
			pageWidth =  getDesktopWidthFromJSON();
	
	return pageWidth;
}

function GetPageHeight()
{
	var pageHeight = -1;
	if(window && window.bTrivResponsive)
	{
		if(is.jsonData != null)
		{
			var respValues = is.jsonData[is.clientProp.device];
			var newValues;
			newValues = respValues[is.clientProp.width];
			var obj = newValues["pageLayer"];
			if(obj)
			{
				pageHeight = obj.h;
			}
		}
	}
	else
	{
		var pageDiv = getHTMLEleByID(GetCurrentPageID());
		if(pageDiv)
		{
			pageHeight = parseInt(pageDiv.style.height);
		}
	}
	
	return pageHeight;
}

function adjustPage(width, height)
{
	var obj = {w: width, h: height};
	
	if(pageLayer)
	{
		pageLayer.ele.style.width = obj.w+'px';
		pageLayer.ele.style.height = obj.h+'px';
		if(!pageLayer.bInTrans)
			pageLayer.ele.style.clip = 'rect(0px,'+obj.w+'px,'+obj.h+'px,0px)';
	}
}

function CorrectForOffsetFromBottom(oldHeight, newHeight, ObjNotToCheck)
{
	var heightDiff = newHeight - oldHeight;
	var yOffset = 0;
	
	for (var index = 0; index < arObjs.length; index++)
	{
		if(arObjs[index] != ObjNotToCheck && arObjs[index].bBottom)
		{
			arObjs[index].y += heightDiff;
			arObjs[index].respChanges();
		}
	}
	
	writeStyleSheets( arObjs );
}

function trivTop() {
	var win = getDisplayWindow(), top = win;
	while(win && win.parent != null && win.parent != win)
	{
		try
		{
			// Will throw when the parent window is from a different domain
			if(win.parent.document)
			top = win.parent;
		} catch (e) {}
		win = win.parent;
	}
	return top;
}

function trivSetupPage()
{

	if (window.jQuery)
		triv$ = jQuery.noConflict(true);

	if(typeof(window.trivPlayer) != 'undefined')
		setAndCheckPlayer(window);
	
	var myTop = trivTop();
	window.myTop = myTop;
	
	if(typeof(window.trivPlayer) != 'undefined'){
		setAndCheckPlayer(window);
		if(window.trivPlayer && window.trivPlayer.window.$)
			window.myTop.triv$ = trivPlayer.window.$;
	}

	window.baseOrientation = {width:getDisplayWindow().innerWidth, height:getDisplayWindow().innerHeight, 
	baseAngle:getDisplayWindow().orientation, orientation:((getDisplayWindow().innerHeight > getDisplayWindow().innerWidth)?"portrait":"landscape")};
	
	if(!isSinglePagePlayerAvail())
	{
		try{
			if( is.isMobile.any() )
			{
				getDisplayWindow().myTop.addEventListener("orientationchange", changeSize, false);
				getDisplayWindow().myTop.addEventListener("resize", barHidden, false);
			}
			else if(!is.ie8)
			{
				var bReviewLink = window.myTop.document.getElementById('vBodyFrame');
				if( (typeof(getDisplayWindow().myTop)!='undefined'&& typeof(getDisplayWindow().myTop._respView) != 'undefined' && getDisplayWindow().myTop._respView != null) || bReviewLink ) 
				{
					getDisplayWindow().addEventListener("resize", changeSize, false);
					return;
				}

				getDisplayWindow().myTop.addEventListener("resize", changeSize, false);
			}
		}catch(e){
			if( is.isMobile.any() )
			{
				getDisplayWindow().addEventListener("orientationchange", changeSize, false);
				getDisplayWindow().myTop.addEventListener("resize", barHidden, false);
			}
			else if(!is.ie8)
			{
				getDisplayWindow().addEventListener("resize", changeSize, false);
			}
			if(e&&e.message)console.log( e.message );
		}
	}
}

function CreateHTMLElementFromString(str)
{
	//LD-6452 Option element have to be part of a select in ie9 or lower
	var bIsOption = false;
	if(str.indexOf("<option")!=-1 && (is.ie && !is.ie10)){
		bIsOption = true;
		str = "<select>" + str + "</select>";
	}


	var tempDiv = document.createElement('div');
	tempDiv.innerHTML = str;

	if(bIsOption){ //second child
		return tempDiv.firstChild.firstChild;
	}
	return tempDiv.firstChild;
}

function GetCurrentPageID(defaultDiv)
{
	var playerExist = isSinglePagePlayerAvail();
	if(!playerExist)
		defaultDiv = true;	
	
	var id = null;
		
	if(defaultDiv)
		id = 'pageDIV';
	else
	{
		if(playerExist)
		{
			if(playerPageID !== '')
				id = playerPageID;
			else if(trivPlayer.activePage)
				id = trivPlayer.activePage.div.id;
			else
			{
				//If active page was not found loop through loaded pages
				if(trivPlayer.arLoadedPages && trivPlayer.arLoadedPages.length)
				{
					if(trivPlayer.arLoadedPages[trivPlayer.arLoadedPages.length-1])
						id = trivPlayer.arLoadedPages[trivPlayer.arLoadedPages.length-1].div.id;
				}
			}
		}
	}
	return id;
}

function GetCurrentPageDiv(defaultDiv)
{
	var id = GetCurrentPageID(defaultDiv);
	var ele = null;
	if(id)
	{
		if(defaultDiv)
			ele = document.getElementById(id);
		else
			ele = getDisplayDocument().getElementById(id);
	}
	else
		ele = getDisplayDocument().body.firstChild;
	
	return ele;
}

function ParseCommentForData(ele){
	var parseData = (function(){

    var getAllComments = function(context) {

            var ret = [],
                node = context.firstChild;

            if (!node) { return ret; }

            do {
                if (node.nodeType === 8) {
                    ret[ret.length] = node;
                }
                if (node.nodeType === 1) {
                    ret = ret.concat( getAllComments(node) );
                }
            } while( node = node.nextSibling );

            return ret;

        },
        cache = [0],
        expando = 'data' + +new Date(),
        data = function(node) {

            var cacheIndex = node[expando],
                nextCacheIndex = cache.length;

            if(!cacheIndex) {
                cacheIndex = node[expando] = nextCacheIndex;
                cache[cacheIndex] = {};
            }

            return cache[cacheIndex];

        };

    return function(context) {

        context = context || getDisplayDocument().documentElement;

        if ( data(context) && data(context).commentJSON ) {
            return data(context).commentJSON;
        }

        var comments = getAllComments(context),
            len = comments.length,
            comment, cData;

        while (len--) {
            comment = comments[len];
            cData = comment.data.replace(/\n|\r\n/g, '');
            if ( /^\s*?\{.+\}\s*?$/.test(cData) ) {
                try {
                    data(comment.parentNode).commentJSON = (new Function('return ' + cData + ';'))();
                } catch(e) {}
            }
        }

        return data(context).commentJSON || true;

    };

})();

	return parseData(ele);
}

function getDisplayWindow(defWind){
	if(!isSinglePagePlayerAvail() || defWind)
		return window;
	else
		return trivPlayer.window;
}

function getDisplayDocument(defDoc){
	if(!isSinglePagePlayerAvail() || defDoc)
		return document;
	else
		return trivPlayer.document;
}

function setPlayerIniFrame(pgPlayer){
	if(!isSinglePagePlayerAvail())
		trivPlayer = pgPlayer;
}

function setAndCheckPlayer(win){
	try{
		var pgPlayer = null;
		if(win.name.indexOf("Trivantis_WebWindow") ==-1 &&
			win.name.indexOf("Trivantis_Dlg_") ==-1) 
			pgPlayer = win.parent.pagePlayer;
		else
			throw "No Player";
		
		if(!isSinglePagePlayerAvail() && pgPlayer)
		{
			trivPlayer = pgPlayer;
			var pgIndex = trivPlayer.getPageIdx(window.location.href.substring(window.location.href.lastIndexOf("/")+1));
			var id = pgID;
			if(pgIndex > -1)
			{
				
				if(trivPlayer.arLoadedPages[pgIndex].div.id)
					id = trivPlayer.arLoadedPages[pgIndex].div.id;
				else
					trivPlayer.arLoadedPages[pgIndex].div.id = id;
					
			}
			else
			{
				if(trivPlayer.arLoadedPages.length)
				{
					if(trivPlayer.arLoadedPages[trivPlayer.arLoadedPages.length-1] && trivPlayer.arLoadedPages[trivPlayer.arLoadedPages.length-1].div)
					{
						trivPlayer.arLoadedPages[trivPlayer.arLoadedPages.length-1].div.id = id;
					}
				}
			}
			SetPageDivID(id);			
		}
	}
	catch(e){
		trivPlayer = undefined;
	}
}

function getCSSID(){
	if(!isSinglePagePlayerAvail())
		return "TrivDynStyleSheet";
	else
	{
		var page = getPageObj(true);
		var cssStr = "";
		if(page)
			cssStr = page.cssName+"TrivDynStyleSheet";
		else
			cssStr = "TrivDynStyleSheet";
		
		return cssStr;
	}
}

function getPageObj(bUseDivID){
	var page = null;
	if(isSinglePagePlayerAvail())
	{
		if(bUseDivID)
			page = window.trivPlayer.getPageByDivID(GetCurrentPageID());
		else
			page = window.trivPlayer.activePage;
	}
	
	return page;
}

function applyPageCSSStyle(pgDiv){
	if(pgDiv.className.indexOf(GetCurrentPageID(true)) == -1)
		pgDiv.className += pgDiv.className?' '+GetCurrentPageID(true):GetCurrentPageID(true);
}

function isSinglePagePlayerAvail(){
	if(!window.trivPlayer || typeof(window.trivPlayer) == 'undefined')
		return false;
	else
		return true;
}

function getHTMLEleByID(id){
	
	var ele = null;
	var frame = arguments.length>1?arguments[1]:self;
	if (is.ns) 
	{
		ele = getDisplayDocument().getElementById(id);
		if(!ele)
			ele = getDisplayDocument(true).getElementById(id);
	}
	else if (is.ie) 
	{
		ele = frame.getDisplayDocument().all[id];
		if(!ele)
			ele = frame.getDisplayDocument(true).all[id];
		
		if(ele && ele.length && typeof(ele.tagName)=="undefined")
			ele = ele[0];
	}
	
	return ele;
}

function getHTMLEleByName(name){
	
	var ele = null;
	var frame = arguments.length>1?arguments[1]:self;
	if (is.ns) 
	{
		ele = getDisplayDocument().getElementsByName(name);
		if(!ele.length)
			ele = getDisplayDocument(true).getElementsByName(name);
	}
		
	return ele;
}


function getChildNodeByID(eleObj, id){
	var ele = null;
	if(eleObj)
	{
		var allChildren = eleObj.children || eleObj.childNodes;
		
		if(eleObj.id == id)
			ele = eleObj;
		else
		{
			if(allChildren)
			{
				for(var index = 0; index < allChildren.length; index++)
				{
					var node = allChildren[index];
					ele = getChildNodeByID(node, id);
						
					if(ele)
						break;
				}
			}
		}
	}
	return ele;
}

function getYouTubePlayers(){
	var arYTP = [];
	for (var index = 0; index < arObjs.length; index++)
	{
		if(arObjs[index].name.indexOf('video') != -1)
		{
			if(arObjs[index].YTPlayer)
				arYTP.push(arObjs[index]);
		}
	}
	
	return arYTP;
}

function SetPageDivID(pagegID){
	playerPageID = pagegID;
}

function RebuildPageLayerObj(bRebuild){
	if(typeof(window.initComplete) != 'undefined' && !window.initComplete)
	{
		setTimeout(function(){RebuildPageLayerObj(bRebuild);}, 150);
		return;
	}
	
	if(pageLayer)
	{
		//Only rebuild pagelayer if it does not match what we expect
		if(pageLayer.ele.id != GetCurrentPageID())
		{
			var transData = pageLayer.transData;
			pageLayer = new ObjLayer(GetCurrentPageID(), pageLayer.pref, pageLayer.frame);
			pageLayer.transData = transData;
		}
		
		//Only need to rebuildLayout when had preloading
		if(bRebuild)
		{
			UpdateObjLayerValues(null, true);
			adjustAllObjectsForFixedPosition();			
		}			
		
		pageLayer.show(true);
	}
}

function isActivePage(){
	
	var bIsActive = true;
	if(!isSinglePagePlayerAvail())
		bIsActive =  true;
	else
	{
		if(window.trivPlayer.activePage == window.trivPlayer.getPageByDivID(GetCurrentPageID()))
			bIsActive = true;
		else
			bIsActive = false;
	}
	return bIsActive;
}

function rebuildarObjs(){
	if(pageLayer)
	{
		var divChildren = pageLayer.ele.children || pageLayer.ele.childNodes;
		if(divChildren && divChildren.length)
		{
			//Rebuild the array of objects
			arObjs = [];
			//Start at 1 since the first object is always the page iFrame
			var index = isSinglePagePlayerAvail()?1:0; 
			for(; index < divChildren.length; index++)
			{
				var obj = eval(divChildren[index].id+"Object");
				if(obj)
					arObjs.push(obj);
			}
		}
	}
}

function adjustForFixedPositon(obj, respChange, biOSBarChange){
	if(typeof(obj.origY) == 'undefined' || respChange)
		obj.origY = obj.y;

	if(isSppInIosFrame() && obj.bFixedPosition){
		obj.div.setAttribute("data-bBottom", obj.bBottom);
		obj.div.setAttribute("data-origY", obj.origY);
	}
		
	if(obj.bFixedPosition && obj.bBottom){
		if(is.iOS && !biOSBarChange){
			var viewHeight =  getDisplayDocument().documentElement.clientHeight ? getDisplayDocument().documentElement.clientHeight : getDisplayDocument().body.clientHeight;
			var frme = isInIframe( getDisplayWindow() , 1 )
			if( frme && frme.style.height){
				var viewHeight = parseInt(frme.style.height);
			}
		}else{
			var frme = isInIframe( getDisplayWindow() , 1 )
			if( frme && frme.style.height){
				var viewHeight = parseInt(frme.style.height);
			}else{
				var viewHeight = getDisplayWindow().myTop.innerHeight;
			}
		}
		var pHeight = parseFloat(GetCurrentPageDiv().offsetHeight);
		if(pHeight == 0)
			return; //Should not be calculating anything if pageHeight is 0
		
		if(isSppInIosFrame()){
			var frameParent = getDisplayWindow().frameElement.parentNode;
			var scrollEle = frameParent.nodeName == "DIV" && frameParent.scrollHeight > frameParent.offsetHeight ? getDisplayWindow().frameElement.parentNode : window.top;
			
			var offset = pHeight - obj.origY,
				scrollPosY = frameParent.nodeName == "DIV" && frameParent.scrollHeight > frameParent.offsetHeight ? scrollEle.scrollTop : scrollEle.scrollY; 
				
			obj.y = scrollPosY + ((viewHeight - ((pHeight - obj.origY) * getDisplayWindow().pageScale)) / getDisplayWindow().pageScale);	
		}
		else{
			if( (pHeight * getDisplayWindow().pageScale ) > viewHeight ){
				obj.y = (viewHeight - ((pHeight - obj.origY) * getDisplayWindow().pageScale)) / getDisplayWindow().pageScale;
			}
		}
		FindAndModifyObjCSS(obj);
		if(obj.hasReflection){
			ModifyReflection(obj);
		}	
	}
}

function adjustAllObjectsForFixedPosition(respChange, biOSBarChange){
	for(var index = 0; index < arObjs.length; index++)
	{
		adjustForFixedPositon(arObjs[index], respChange, biOSBarChange);
	}
}

function isOffPage(obj){
	if(!obj)
	    return false; 
		
	if( obj.x > GetPageWidth() || ((obj.x + obj.w) < 0) || obj.y > pageHeight || (obj.y + obj.h) < 0 )
		return true;
	else
		return false;
}

function appendElement(obj, parentElement, htmlElement){
	var bExist = false;
	//Check to see if it exists or if we need to create it
	if(parentElement)
	{
		if(typeof(parentElement) == "string")
			parentElement = CreateHTMLElementFromString(parentElement);
		
		if(parentElement.id)
		{
			if(getHTMLEleByID(parentElement.id))
			{
				parentElement = getHTMLEleByID(parentElement.id);
				bExist = true;
			}
		}
		
		//if it does not already exists then attach
		if(!bExist)
			GetCurrentPageDiv().appendChild(parentElement);
	}
	//Reset the variable for reuse
	bExist = false;
	
	if(obj)
	{	
		//echo LD-4412: As of v16.3, iOS does not support fixed position in an iframe. This is our alternative solution. 
		if( isSppInIosFrame() && obj.bFixedPosition){
			var fixedDivId = "TrivFD_" + GetCurrentPageID();
			var fixedDiv = getDisplayDocument().getElementById(fixedDivId);
			
			if(!fixedDiv){
				fixedDiv = getDisplayDocument().createElement("div");
				fixedDiv.id = fixedDivId;
				
				fixedDiv.style.setProperty("position", "absolute");
				GetCurrentPageDiv().appendChild(fixedDiv);

				var bUpdate = false;
				var bScrolled = false;
				var count = 0;
				var lastScrollPosY;
				var frameParent = getDisplayWindow().frameElement.parentNode;
				var scrollEle = frameParent.nodeName == "DIV" && frameParent.scrollHeight > frameParent.offsetHeight ? getDisplayWindow().frameElement.parentNode : window.top;

				scrollEle.onscroll = function(){
					var fixedDiv = getDisplayDocument().getElementById(fixedDivId);
					if(fixedDiv)	
						fixedDiv.style.visibility = 'hidden';
					
					if(count == 0){
						lastScrollPosY = frameParent.nodeName == "DIV" && frameParent.scrollHeight > frameParent.offsetHeight ? scrollEle.scrollTop : scrollEle.scrollY;
					}
						
					bScrolled = true;
				}
				
				setInterval(function(){
					if(bUpdate){
						bUpdate = false;
						count = 0;
						
						var fixedDiv = getDisplayDocument().getElementById(fixedDivId);

						var newY = frameParent.nodeName == "DIV" && frameParent.scrollHeight > frameParent.offsetHeight ? scrollEle.scrollTop : scrollEle.scrollY;
						newY /= getDisplayWindow().pageScale;
						fixedDiv.style.top = newY + "px";
						fixedDiv.style.visibility = 'inherit';
						
						for(var i = 0 ; i < fixedDiv.children.length ; i++)
						{
							var bBottom = fixedDiv.children[i].getAttribute("data-bBottom");
							var origY = parseInt(fixedDiv.children[i].getAttribute("data-origY"));
							
							if(!!parseInt(bBottom)){								
								var pHeight = parseFloat(GetCurrentPageDiv().clientHeight),
									viewHeight = getDisplayWindow().myTop.innerHeight,
									offset = pHeight - origY;
								var frme = isInIframe( getDisplayWindow() , 1 )
								if( frme && frme.style.height){
									var viewHeight = parseInt(frme.style.height);
								}
								
								fixedDiv.children[i].style.top = ((viewHeight - (offset * getDisplayWindow().pageScale)) / getDisplayWindow().pageScale) + "px";
								if( fixedDiv.children[i].divReflect)
									fixedDiv.children[i].divReflect.style.top = fixedDiv.children[i].style.top + ((viewHeight - (offset * getDisplayWindow().pageScale)) / getDisplayWindow().pageScale) + "px";
							}
						}
					}
				}, 100);
				
				//Make sure scrolling has stopped so we don't get jitter.
				setInterval(function(){
					if(!bScrolled)
						return;
				
					if(lastScrollPosY == scrollEle.scrollTop || lastScrollPosY == scrollEle.scrollY){
					
						if(count == 5){
							bUpdate = true;
							bScrolled = false;
							count = 0;
						}
						else 
							count++
					}
					else{
						count = 0;
						lastScrollPosY = frameParent.nodeName == "DIV" && frameParent.scrollHeight > frameParent.offsetHeight ? scrollEle.scrollTop : scrollEle.scrollY;
					}
				}, 50);
			}

			for(var i = 0 ; i < fixedDiv.children ; i++){
				if(fixedDiv.children[i].id === obj.div.id)
					return;
			}
			
			obj.div.style.position = 'inherit';
			
			fixedDiv.appendChild(obj.div);
			bUpdate = true;
		}
		else{
			//Only attach if it is not inherited, if it is inherited then it already exists
			//and should be being managed by the pagePlayer
			if(!obj.bInherited)
			{
				if(parentElement)
					parentElement.appendChild(obj.div);
				else
					GetCurrentPageDiv().appendChild(obj.div);
			}
		}
	}
	
	if(htmlElement)
	{
		
		if(typeof(htmlElement) == "string")
			htmlElement = CreateHTMLElementFromString(htmlElement);
		
		//if there is an id then make sure the objects does not already exist
		if(htmlElement.id)
		{
			if(getHTMLEleByIDInCurrPgDiv(htmlElement.id))
				bExist = true;
		}
		
		if(!bExist)
		{
			if(parentElement){
				//ugly hack warning IE is stupid and grabs wrong parent fix it 
				if(is.ie && htmlElement.tagName ==="OPTION" && parentElement.tagName === "OPTION")
					parentElement = parentElement.parentElement;

				parentElement.appendChild(htmlElement);
			}
			else
				GetCurrentPageDiv().appendChild(htmlElement);
		}
	}
}

//Function is only useful for single page publish
function checkObjectInheritance(theObj, bAttach){
	
	var bInherited = false;
	return bInherited;
	//default it to true
	if(typeof(bAttach) == "undefined")
		bAttach = true;
	
	if(isSinglePagePlayerAvail() && !trivInTest)
	{
		//First check for the active page
		var div = getHTMLEleByID(theObj.name);
		if(!div)
			div = window.trivPlayer.checkForObjectExistance(theObj.name);//Need to search through the other loaded pages to see if it exists
		
		if(div)
		{
			if(!isDIVPartOfPage(div))
			{
				bInherited = true;
				if(bAttach)
				{
					theObj.div = div;
					//Since we found the objects we need to see if it has reflection
					if(theObj.hasReflection)
					{
						var refDiv = getHTMLEleByID(theObj.name+"ReflectionDiv");
						if(!refDiv)
							refDiv = window.trivPlayer.checkForObjectExistance(theObj.name+"ReflectionDiv")
						
						if(refDiv)
						{
							theObj.reflecDiv = refDiv;
							if(theObj.reflecDiv.className.indexOf('trivInherited') ==-1)
								theObj.reflecDiv.className += theObj.reflecDiv.className?' '+'trivInherited':'trivInherited'; 
						}
					}
					//Add an identifier so that we know this is already set to be moved into the inherited div
					if(theObj.div.className.indexOf('trivInherited') ==-1)
						theObj.div.className += theObj.div.className?' '+'trivInherited':'trivInherited'; 
				}
			}
		}
	}
	return bInherited;
}

//Helper function for inheritance check
function isDIVPartOfPage(div){
	var bInPage = false;
	var objInPage = GetCurrentPageDiv().children ||  GetCurrentPageDiv().childNodes;
	for(var i = 0; i < objInPage.length; i++)
	{
		var objDiv = objInPage[i];
		//Make sure the object is not on the page and neither is its parent.
		if(objDiv == div || (div.parentElement && (div.parentElement == objDiv || div.parentElement == GetCurrentPageDiv())))
		{
			bInPage = true;
			break;
		}
	}
	
	return bInPage;
}

function AddSVGViewBox (thisObj){
	if(is.svg)
	{
		var obj = getDisplayDocument().getElementById(thisObj.name);
		if( obj ) 
		{
		  var objSVG = obj.getElementsByTagName('svg')[0];
		  if(  objSVG.getAttribute("viewBox") == null )
		  {
			
			objSVG.setAttribute( "viewBox" , "0 0 " +  thisObj.w + " " + thisObj.h);
			  
			var objMap = getHTMLEleByID(thisObj.name + "SVG");
			if (objMap)
				objMap.setAttribute( "viewBox" , "0 0 " +  thisObj.w + " " + thisObj.h);
		  }
			if(objSVG.getAttribute("preserveAspectRatio")==null)
				objSVG.setAttribute("preserveAspectRatio", "none");
		}
	}
}	

function isSppInIosFrame(){
	//check for ios iframe
	var result = is.isMobile.iOS() && isSinglePagePlayerAvail() ? ( isInIframe(getDisplayWindow() , 0) || isInFrame(getDisplayWindow() , 0) ) : false;
	
	return result;
}

// LD-4657 - flag locally run on chrome as not SPP capable
function isSppCapable(){
	var bSppCapable = (!is.ie8 && !is.ie9);
	if (bSppCapable)
	{
		var isFile = (document.URL.indexOf("file://") == 0);
		if ( is.chrome && isFile )
			bSppCapable = false;
	}
	return bSppCapable;
}

function setfixed(){
	if(!window.bPageLoaded || isSppInIosFrame())
		return;
	var bAutoStart = false;
	var autoDiv = getDisplayDocument().getElementById("trivInherited");
	var pgDiv = getDisplayDocument().getElementById('pageDIV');
	var fixDIV = getDisplayDocument().getElementById('fixDIV');
	if(isSinglePagePlayerAvail())
		pgDiv = getDisplayDocument().getElementById(pgID);

	if(fixDIV == null ){
		fixDIV = getDisplayDocument().createElement( 'div' );
		fixDIV.id = "fixDIV";
		fixDIV.style.position = 'fixed';
		fixDIV.style.zIndex = '1999';
		if(!(is.ie8 || is.ie9 || is.ie10))
			fixDIV.style.pointerEvents = 'none';
		getDisplayDocument().body.appendChild( fixDIV );
	}
	var divs = getDisplayDocument().getElementsByTagName("div");

	for(var i = 0; i < arObjs.length; i++){
		if(arObjs[i].bFixedPosition){
			if(arObjs[i].div.id.indexOf("webwidget") != -1){
				if(arObjs[i].div && getDisplayDocument().getElementById(arObjs[i].div.id)){
					arObjs[i].div = getDisplayDocument().getElementById(arObjs[i].div.id);
				}
				else{
					continue;
				}
			} else if(arObjs[i].mediaPlayer){
				if(arObjs[i].bAutoStart && autoDiv){
					bAutoStart = true;
					continue;
				}
			}
			if(arObjs[i].div.parentNode){
				arObjs[i].div.parentNode.removeChild( arObjs[i].div );
			}
			if(arObjs[i].hasReflection){
				if(arObjs[i].divReflect.parentNode){
					arObjs[i].divReflect.parentNode.removeChild(arObjs[i].divReflect);
				}
				fixDIV.appendChild( arObjs[i].divReflect );
			}
			arObjs[i].div.style.pointerEvents = 'auto';
			fixDIV.appendChild( arObjs[i].div );
			if(arObjs[i].mediaPlayer){
				if(arObjs[i].bAutoStart){
					arObjs[i].mediaPlayer.play();
				}
			}
		}
	}
	var pgStyle = getPageDivStyles(pgDiv);
	
	//May be undefined depending on browser
	if(typeof(pgStyle.left)!="undefined")
		fixDIV.style.left = pgStyle.left;
	if(typeof( pgStyle.top)!="undefined")
		fixDIV.style.top = pgStyle.top;
	if(typeof(pgStyle.width)!="undefined")
		fixDIV.style.width = pgStyle.width;
	if(typeof(pgStyle.height)!="undefined"){
		if(is.ie8 || is.ie9 || is.ie10){
			fixDIV.style.height = '0px';
			fixDIV.style.overflow = "visible";
		}
		else
			fixDIV.style.height = pgStyle.height;
	}
	if(typeof(pgStyle.transform)!="undefined")
		fixDIV.style.transform = pgStyle.transform;
	if(typeof(pgStyle.transformOrigin)!="undefined")
		fixDIV.style.transformOrigin = pgStyle.transformOrigin;
	if(typeof(pgStyle.visibility)!="undefined")
		fixDIV.style.visibility = pgStyle.visibility;
	if(typeof(pgStyle.clip)!="undefined")
		fixDIV.style.clip = pgStyle.clip;
	
	if(bAutoStart){
		autoDiv.style.position = 'fixed';
		autoDiv.style.transform = pgStyle.transform;
	}else{
		if(autoDiv){
			autoDiv.style.position = 'absolute';
			autoDiv.style.transform = pgStyle.transform;
		}
	}
}

function getPageDivStyles(elem)
{
	if (!elem) return []; // Element does not exist, empty list.
    var win = getDisplayDocument().defaultView || getDisplayWindow(), style, styleNode = [];
    if (win.getComputedStyle) { /* Modern browsers */
        styleNode = win.getComputedStyle(elem, '');
    } else if (elem.currentStyle) { /* IE 8 to IE 6 */
       styleNode = elem.currentStyle;
    } else { //Ancient browser
        styleNode = elem.style;
    }
    return styleNode;

}

function isObjectChildOfDiv(parentDiv, childDiv){
	for(var index = 0; index < parentDiv.childNodes.length;index++){
		var tmpDiv = parentDiv.childNodes[index];
		if(tmpDiv.id == childDiv.id)
			return tmpDiv;
	}
	return null;
}

function calculateScale(){
	var bReviewLink = window.myTop.document.getElementById('vBodyFrame');
	if( is.isMobile.any() ||
		(bReviewLink && typeof(getDisplayWindow().myTop)!='undefined' && getDisplayWindow().myTop._respView == 'Custom')){
		var doc = getDisplayDocument();
		var scrW = 0;
		
		if (is.isMobile.Android() || (is.isMobile.iPhoneX() && getOrientation() == 'landscape' ))
			scrW = getDisplayWindow().innerWidth;	
		else	
			scrW = getScreenWidth();
			
		pgW = parseFloat(GetPageWidth());
		pgH = parseFloat(GetPageHeight());
		transformScale = scrW / pgW;
		var sty = 'scale(' + transformScale + ')';
		getDisplayWindow().pageScale = transformScale;
		return sty; // translate first then scale
	}
	else{
		return "scale(1)";
	}
}
/*
* Replace objects audio/video element with trivpool element
*/
function grabFromPool(elemTagName, destParentDiv){
	var elemFromPool = checkoutMediaElem(elemTagName);
	if ( elemFromPool )
	{
		if ( window.console )
			console.log('using [' + elemTagName + '] from pool');

		var origElem = triv$(elemTagName, destParentDiv).remove();
		var origSource = triv$('source', origElem).remove();
		var origTracks = triv$('track', origElem).remove(); //LD-6017 copy over track element for captions

		triv$(elemFromPool).attr(
		{
			'id'	: origElem.attr('id'),
			'name'	: origElem.attr('name'),
			'autoplay' : origElem.attr('autoplay'),
			'trivpool' : origElem.attr('trivpool'),
			'width' : origElem.attr('width'),
			'height' : origElem.attr('height')

		});
		origSource.appendTo(elemFromPool);

		if(origTracks && origTracks[0])
		{
			triv$('track', elemFromPool).attr('src', origTracks[0].src);
			triv$('track', elemFromPool).attr('srclang', origTracks[0].srclang);
		}
		else
			triv$('track', elemFromPool).remove();

		triv$(elemFromPool).appendTo(destParentDiv);
	}

}

function checkoutMediaElem(elemTagName){
	elemTagName = elemTagName.toLowerCase();
	var mediaPoolDiv = triv$('#mediaPool', getDisplayDocument().body);
	var elem = triv$(elemTagName, mediaPoolDiv)[0];
	if ( elem )
	{
		// Save the original attribute names of the audio / video for cleanup later
		// ... save them once per tagname (audio/video) in the parent
		var par = elem.parentElement;

		triv$(elem).remove();
		triv$('source', elem).remove();	// cleanup source (blank.mp4) before giving it to caller

		var attrTags = (par.__origAttribs = par.__origAttribs || {});
		var arAttrs = (attrTags[elemTagName] = attrTags[elemTagName] || []);
		if ( arAttrs.length == 0 )
			for ( var x in elem )
				arAttrs.push(x);
	}

	return elem;
}

//This is in case we need to check in a single media element.
//As of its creation, it is not being used. There is a copy of this
//function in trivantis-opaUtils that is used in SPP
function checkinMediaElement(mediaElem){
	mediaElem = mediaElem.get ? mediaElem.get(0) : mediaElem;		// in case it's jQuery object, make it a DOM element
	var idSave = mediaElem.id;

	var checkedIn = f;
	var mediaPoolDiv = triv$('#mediaPool', getDisplayDocument().body);
	if ( mediaPoolDiv[0] )
	{
		triv$('source', mediaElem).remove();
		triv$('track', mediaElem).remove();
		triv$(mediaElem).removeAttr('id name src style controls hidden autoplay loop');

		if ( mediaElem.__listeners ) for ( var i = 0; i < mediaElem.__listeners.length; i++ )
		{
			var listn = mediaElem.__listeners[i];
			mediaElem.removeEventListener(listn.type, listn.listener);
		}
		delete mediaElem.__listeners;

		triv$(mediaElem).appendTo(mediaPoolDiv);
		var source = document.createElement('source');
		source.src = 'media/blank.mp4';

		var track = document.createElement('track');
		triv$(track).attr('srclang', 'en');
		triv$(track).attr('kind', 'subtitles');

		triv$(source).appendTo(mediaElem);
		triv$(track).appendTo(mediaElem);
		checkedIn = t;
	}

	// Clean up... delete the attributes that ME player added
	var tagName = mediaElem.tagName.toLowerCase();
	var arAttrs  = mediaElem.parentElement.__origAttribs && mediaElem.parentElement.__origAttribs[tagName];
	for ( var x in mediaElem )
	{
		if ( triv$.inArray(x, arAttrs) == -1 )
		{
			delete mediaElem[x];
			if ( window.console )
				console.log('cleaning up after ME, id: [' + idSave + '], deleted attrib: ' + x);
		}
	}

	return checkedIn;
}

function moveBkAudio(audio){
	// Go through body's children looking for background audio
	var bodyChildren = getDisplayDocument().body.children;
	for(idx = 0; idx < bodyChildren.length; idx++)
	{
		if(bodyChildren[idx].id.indexOf("BkAudio") > -1)
		{
			// If the source is the same, leave the div untouched
			// As we want the audio to continue to play
			if(bodyChildren[idx].getAttribute("src") == audio.src)
			{
				bodyChildren[idx].setAttribute("id", audio.div.id);
				bodyChildren[idx].setAttribute("name", audio.name);
				audio.objLyr.ele.removeChild(audio.objLyr.ele.firstElementChild);
				return;
			}
			// Otherwise, we want to change the source
			else
			{
				// If we are using the trivpool, then we need to keep the div
				// but just update the source, id and name attributes
				if(bodyChildren[idx].getAttribute("trivpool"))
				{
					bodyChildren[idx].setAttribute("src",audio.src);
					bodyChildren[idx].setAttribute("id", audio.div.id);
					bodyChildren[idx].setAttribute("name", audio.name);
					return;
				}
				// If we are not using trivpool, then we will remove the element from the DOM
				// The next background audio will get rebuilt on its own
				getDisplayDocument().body.removeChild(bodyChildren[idx]);
			}
		}
	}
	// If there is no previous background audio element, create one
	// By moving the element from the object div to the body
	// If we are using trivpool, the checkout from the pool is done in
	// ObjMedia.activate, right before this function
	audio.objLyr.ele.firstElementChild.setAttribute("hidden","true");
	audio.objLyr.ele.firstElementChild.setAttribute("playsinline","true");
	audio.objLyr.ele.firstElementChild.setAttribute("loop","true");
	audio.objLyr.ele.firstElementChild.setAttribute("src",audio.src);
	audio.objLyr.ele.firstElementChild.style.display = "none";
	var audioElem = audio.objLyr.ele.removeChild(audio.objLyr.ele.firstElementChild);
	getDisplayDocument().body.appendChild(audioElem);
}

function fillBrowser()
{
	if(window.bScaleToWindow || (window.bFitToMobile && is.isMobile.any()))
	{
		var dv = GetCurrentPageDiv();		//OPA: getCurrentPageDiv();
		var style = dv.style;
		var objScale = getFillBrowserScale();
		var sty = "translate("+ objScale.offsetX+"px, "+objScale.offsetY+"px) scale(" + objScale.scale + ")";
		style.transform = sty;
		style.MozTransform = sty;
		style.msTransform = sty;
		style.OTransform = sty;
		style.webkitTransform = sty;

		transformScale = objScale.scale;

		// Undo page centering if fill browser/window
		style.marginLeft = '';
		style.left = '';
		if(pageLayer)
		{
			var leftPage = 0;
			if ( (window.bFitToMobile && is.isMobile.any() ) || objScale.bShrunk)
			{
				//Need to center for mobile devices 
				var winHeight = winH;
				var winWidth = winW;
				var windowH = ( winHeight > 1 ? winHeight - 1 : winH > 0 ? winH : 100 );
				var windowW = ( winWidth > 0 ? winWidth : winW > 0 ? winW : 100 );
				leftPage =  (Math.round( (windowW - (parseInt(style.width) * objScale.scale)) / 2)) ;	
			}
			pageLayer.moveTo(leftPage,0);
		}
	}
}

function getFillBrowserScale()
{
	var dv = GetCurrentPageDiv();		//OPA: getCurrentPageDiv();

	//triv$(dv).show();

	var myTitleWidth = dv.clientWidth;
	var myTitleHeight = dv.clientHeight;

	findWH(); // populates winW and winH

	var winHeight = winH;
	var winWidth = winW;
	var windowH = ( winHeight > 1 ? winHeight - 1 : winH > 0 ? winH : 100 );
	var windowW = ( winWidth > 0 ? winWidth : winW > 0 ? winW : 100 );
	var bForceShrunk = false;
	if(windowW > iScaleMaxWidth && iScaleMaxWidth != 0)
	{
		bForceShrunk = true;
		windowW = iScaleMaxWidth;
	}
	var scale1 = windowW / myTitleWidth;
	var scale2 = windowH / myTitleHeight;

	if ( window.bFitToWidth )
	{
		//var adjTitleW = myTitleWidth * scale1;
		var adjTitleH = myTitleHeight * scale1;	// height is scaled by the width's scale in window.bFitWidth
		if ( windowH < adjTitleH  )
		{
			windowW = winW-19;
			scale1 = windowW / myTitleWidth;
		}
	}

	var scaleFill = window.bFitToWidth ? scale1 : Math.min(scale1,scale2);
	var scaleOffset = parseInt(scaleFill == scale1 ? 0 : (windowW/2) - ((scaleFill*myTitleWidth) / 2));
	var transX = -parseInt( ((myTitleWidth - (scaleFill*myTitleWidth))/2)) + scaleOffset;
	var transY = -parseInt( ((myTitleHeight - (scaleFill*myTitleHeight)) / 2));

	if ( window.bFitToMobile && is.isMobile.any())
	{
		var scaleFill = Math.min(scale1,scale2);
		var transX = 0, transY = 0;
	}
	else if (is.isMobile.any())
		transX = 0, transY = 0;

	return	{
		'scale':	scaleFill,
		'offsetX':	transX,
		'offsetY':	transY,
		'bShrunk':	bForceShrunk
	};
}

//Handle copying over styles
function copyStyle(from, to, node) {
    var doc = to.document;
    var newStyle = doc.createElement(node.tagName);
    if (node.textContent) {
        newStyle.textContent = node.textContent;
    } else if (node.innerText) {
        newStyle.innerText = node.innerText;
    }
    newStyle.type = node.type;
    newStyle.src = node.src;
    newStyle.rel = node.rel;
  	if(node.href)
    	newStyle.href = node.href;
    doc.getElementsByTagName('head')[0].appendChild(newStyle);
}


//Print Override has three paths RunMode, New Window Print, Iframe Print
//New Window Print is used for IEs and FF due to several issues
//Iframe Print works well for the other browsers
function printOverride(){
	if( (typeof(bTrivRunView)!="undefined" && bTrivRunView) ||
		(typeof(bTrivOffline)!="undefined" && bTrivOffline) ||
		is.iOS)
		getDisplayWindow().print();
	else if( is.firefox || is.ieAny)
		printOvrNewWnd();
	else
		printOvrIframe();
}

function printOvrNewWnd() {
	var pageSetup = "<!DOCTYPE html> <html> <head> </head><body></body> </html>"; // your doctype declaration
	var strBody =  getDisplayDocument().body.innerHTML;
	var printPreview = window.open();
	var printDocument = printPreview.document;
	printDocument.open();
	printDocument.write(pageSetup);

	//Copy over all styles
	var stylesheets = getDisplayDocument().querySelectorAll('style, link[rel="stylesheet"]');
	stylesheets = Array.prototype.slice.call(stylesheets);
	for (var i = 0; i < stylesheets.length; i++) {
		copyStyle(getDisplayWindow(), printPreview, stylesheets[i]);
	}

	//Replace innerHTML
	printDocument.body.innerHTML = strBody;

	cleanTestRPrint(printDocument);
	copyFormValuesPrint(printDocument);

	printDocument.close();
	//Print on a timeout since IE has issues if we call immediately
	setTimeout(function(){
		printPreview.print();
		printPreview.close();
	}, 300);
}

function printOvrIframe()
{
	var strBody = getDisplayDocument().body.innerHTML;
	var iframe = getDisplayDocument().createElement('iframe');
	iframe.height = GetCurrentPageDiv().clientHeight + "px";
	iframe.width = GetCurrentPageDiv().clientWidth + "px";
	iframe.style.border = "none";
	document.body.appendChild(iframe);
	iframe.contentDocument.body.innerHTML = strBody;

	//Copy over all styles
	var stylesheets = getDisplayDocument().querySelectorAll('style, link[rel="stylesheet"]');
	stylesheets = Array.prototype.slice.call(stylesheets);
	for (var i = 0; i < stylesheets.length; i++) {
		copyStyle(getDisplayWindow(), iframe.contentWindow, stylesheets[i]);
	}

	cleanTestRPrint(iframe.contentDocument);
	copyFormValuesPrint(iframe.contentDocument);

	//Print iframe window and remove once it is done
	setTimeout(function(){
		iframe.contentWindow.print();
		iframe.parentNode.removeChild(iframe);
	}, 300);
}

function getTopofObj (thisObj) {
	var curtop = 0;
    if (thisObj.offsetParent) {
        do {
            curtop += thisObj.offsetTop;
        } while (thisObj = thisObj.offsetParent);
    return [curtop];
    }
}

function cleanTestRPrint (docObj)
{
	//iframes with name ifr_ are used to load up data remove so that print is not restricted
	var bIframeRemoved = false;
	var iframes = docObj.querySelectorAll('iframe');
	for (var i = 0; i < iframes.length; i++) {
		if(iframes[i].name.indexOf("ifr_")!=-1)
		{
			iframes[i].parentNode.removeChild(iframes[i]);
			bIframeRemoved = true;
		}
	}

	//Always set left to 0 for printing
	var currPgDiv = GetCurrentPageDiv();
	currPgDiv = docObj.getElementById(currPgDiv.id)
	currPgDiv.style.left = "0px";

	
	if(bIframeRemoved){
		
		var objOther;
		var bottomOfResults;

		//If test results we remove buttons, and adjust styles so that vertical scroll can print 
		for(var i=0; i< currPgDiv.children.length; i++ )
		{
			if(currPgDiv.children[i].id.indexOf("other")==0)
				objOther = currPgDiv.children[i];
		}

		if(typeof(objOther)!= "undefined")
		{
			var buttons = docObj.querySelectorAll('button');
			for (var i = 0; i < buttons.length; i++) {
				buttons[i].parentNode.removeChild(buttons[i]);
			}

			objOther.style.height = "auto";
			bottomOfResults = objOther.offsetHeight + objOther.offsetTop;
			currPgDiv.style.height = bottomOfResults + "px";
		}

		currPgDiv.style.clip = "auto";
	}
}


function copyFormValuesPrint(docObj){

	//Copy over any values from form objects found on the page so they show on print
	var arrInputs = getDisplayDocument().querySelectorAll("input");
	var arrSelects = getDisplayDocument().querySelectorAll("select");
	var newArrInput = docObj.querySelectorAll("input");
	var newArrSelects = docObj.querySelectorAll("select");

    if(arrInputs.length == newArrInput.length ) 
	{
		for(var i=0; i <  arrInputs.length; i++  )
		{
			if(arrInputs[i].type == "radio" || arrInputs[i].type =="checkbox")
			 newArrInput[i].checked = arrInputs[i].checked;
			else if(arrInputs[i].type =="text")
			 newArrInput[i].value = arrInputs[i].value;
		}
	}

    if(arrSelects.length == newArrSelects.length ) 
	{
		for(var i=0; i < arrSelects.length; i++)
			newArrSelects[i].selectedIndex = arrSelects[i].selectedIndex;
	}
	
}


// LD-6164 This will force the next page load to replace the top HTML (the one containing the page player).
// It only applied to IE, Edge and iOS and it's controlled by the parameter 'strBrowsers'.
// strBrowsers is a string which is a comma separated list of: IE, Edge, iOS. Not case sensitive. eg: "ie,ios"
// If not specified, applies to all three.
function freeMemory(strBrowsers)
{
	if(typeof(strBrowsers) != "undefined")
		strBrowsers = strBrowsers.toLowerCase();
	if(isSinglePagePlayerAvail())
	{	
		if(typeof(strBrowsers) == "undefined" && (is.ieAny || is.edge || is.iOS))
			window.trivPlayer.bSkipFlag = true; 
		else if(typeof(strBrowsers) != "undefined"	&&	( (is.ieAny && strBrowser.indexOf('ie') !=-1 ) || (is.edge && strBrowsers.indexOf('edge') !=-1)	
			|| (is.iOS && strBrowsers.indexOf('ios')!=-1 ) ))
			window.trivPlayer.bSkipFlag = true; 
	}
}

function addFocusIndicator(event) {
	var target = event.target;
	var bMejs = isInMejsPlayer(target);
	if(!bMejs) {
		var idToTest = isInQuestion(target) ? 
						RegExp('qu[0-9]*') : 
						isInForm(target) ? 
						RegExp('form[0-9]*_fieldset') :
						isInFixedDiv(target) ?
							RegExp('fixDIV') : 
							isSinglePagePlayerAvail() ? 
								RegExp(pgID) : 
								RegExp("pageDIV");
		while(target.parentElement && (!idToTest.test(target.parentElement.id))){
			target = target.parentElement;
			
		}
	}


	var focusDiv = document.createElement("div");
	focusDiv.id = "focusDiv";
	focusDiv.style.position = 'absolute';
	focusDiv.style.width = getComputedStyle(target).width;
	focusDiv.style.height = getComputedStyle(target).height;
	focusDiv.style.top = getComputedStyle(target).top;
	focusDiv.style.left = getComputedStyle(target).left;
	focusDiv.style.mozBoxShadow = getDisplayWindow().focusStyle;
	focusDiv.style.boxShadow = getDisplayWindow().focusStyle;
	focusDiv.style.webkitBoxShadow = getDisplayWindow().focusStyle;
	focusDiv.style.zIndex = 99999;
	focusDiv.setAttribute('aria-hidden','true');
	focusDiv.setAttribute('focusable','false');
	focusDiv.setAttribute('aria-label','');
	if(!bMejs)
		target.parentElement.insertBefore(focusDiv, target.parentElement.firstChild ? target.parentElement.firstChild : null);
	else{
		focusDiv.style.marginLeft = getComputedStyle(target).marginLeft;
		focusDiv.style.marginRight = getComputedStyle(target).marginRight;
		focusDiv.style.marginTop = getComputedStyle(target).marginTop;
		focusDiv.style.marginBottom = getComputedStyle(target).marginBottom;
		target.parentElement.insertBefore(focusDiv, target.parentElement.firstChild ? target.parentElement.firstChild : null);
	}
}

function removeFocusIndicator() {
	var removeElems = getDisplayDocument().querySelectorAll("[id=focusDiv]");
	for(i = 0; i < removeElems.length; i++)
		removeElems[i].parentElement.removeChild(removeElems[i]) ;
}

function trackFocus(event){
	getDisplayWindow().prevFocus = event.target;
}

function addFocusEvents() {
	var targetElements = "div[class^=\"mejs-button\"] button,div[class^=\"mejs-\"] span,div[class^=\"mejs-\"] a,div[id^=\"image\"] a,div[id^=\"shape\"] a,textarea,input[type=\"text\"],input[type=\"password\"],select,div[id^=\"image\"] a img,div[id^=\"shape\"] a img,div[id^=\"image\"] a svg,div[id^=\"shape\"] a svg,div[id^=\"text\"] a + div,input[type=\"file\"],input[type=\"radio\"],input[type=\"checkbox\"],button,div[id^=\"textbutton\"] a,div[id^=\"image\"] a,div[id^=\"shape\"] a, div[id^=\"text\"] a";

	var pageElements = getDisplayDocument().querySelectorAll(targetElements);
	for(var i = 0; i < pageElements.length;i++){
		//ignore text inside of svg buttons and shapes
		if(pageElements[i].parentNode.tagName == "pattern")
			continue;
		pageElements[i].addEventListener('focus',trackFocus);
		//pageElements[i].addEventListener("focusout",removeFocusIndicator);
	}
}

function isInFixedDiv(ele){
	if(!ele)
		return false;
	else if(ele.id == "fixDIV")
		return true;
	return isInFixedDiv(ele.parentElement);
}

function isInMejsPlayer(ele) {
	if(!(ele.className.indexOf && ele.parentElement.className && ele.parentElement.className.indexOf))
		return false;
	else if((ele.className.indexOf("mejs") > -1 || ele.parentElement.className.indexOf("mejs") > -1))
		return true;
}	
//Called before init if page has autoStart media to ensure autoPlay capability
//Chrome now requires interaction with the dom before auto playing is possible
function enableAutoStart(cb, isFromOPADisplayWindow)
{
	if(!isSinglePagePlayerAvail() || isFromOPADisplayWindow)
	{
		if (window.bAutoStartOnPage ||
			(isFromOPADisplayWindow && ((getDisplayWindow().audioPoolCount + getDisplayWindow().videoPoolCount) > 0) && (is.isMobile.any() || is.safari)))
        {
            // these are the conditions which we need to help with autostarting audio and video...
            if ((is.safari && (parseInt(is.safariVer) >= 11)) ||
                (is.firefox &&  parseInt(is.ffVer) >= 66) ||
                (is.chrome && parseInt(is.chromeVer) >= 64 ) ||
                is.isMobile.any())
            {
                var doc = getDisplayDocument();
                var audObj = doc.createElement("audio");
                audObj.setAttribute("src", "media/blank.mp4"); // need src defined or Chrome doesn't complete the promise
                var startPlayPromise = audObj.play();
                //TODO: someday we can remove these version checks...
                if (startPlayPromise !== undefined)
                {
					startPlayPromise.then(
                        function () {
                            cb();
                        },
                        function (error) {
                            if (error.name === "NotAllowedError") {
                                createdInteractDiv(cb, (is.isMobile.any() && isFromOPADisplayWindow));
                                return;
                            }
                            if (window.console)
                                console.log(error && error.name);
                            cb();
                            return;
                    });

                    return; // don't continue and call the cb
                }
            }
        }
	}

	cb();



	// if(typeof(AudioContext)!="undefined" && is.chrome){
	// 	var context = new AudioContext();
	// 	if(context.state != "running")
	// 		createdInteractDiv(cb);
	// 	else 
	// 		cb();
	// }
	// else
	// 	cb();
}

function createdInteractDiv(cb , bCreateMediaPool)
{

	var doc = getDisplayDocument();
	var nDiv = doc.createElement('div');
	var style = nDiv.style;

    var callbackToRunOnClick = function()
    {
        if ( bCreateMediaPool )
			jsOpaUtils.createPooledMedia();
        else if (is.safari)
		{
            var safariAutoStartKick=doc.createElement("audio");
            safariAutoStartKick.setAttribute("src","media/blank.mp4");
            safariAutoStartKick.play();
		}

        triv$('#initClickDiv',doc).remove();

        if ( cb ) cb();

        // seeing on mobile non-SPP that videos will not autostart so kick them...
        if(is.isMobile.any() && !bCreateMediaPool)
            trivArExec(arAudioVideo,function( wndObj ){
                if (wndObj instanceof jsWndVideo && (wndObj.dwFlags & AUTO_START) && !wndObj.bPlaying) // is a video, is autostart, and is not playing
                    wndObj.play();
            });

    };

	nDiv.setAttribute('id', "initClickDiv");
	style.position = 'absolute';
	style.backgroundColor = 'rgb(77, 77, 77)';
	style.opacity = '.9';
	style.width = '100%';
	style.height = '100%';
	style.top = '0px';
	style.left = '0px';
	style.textAlign = 'center';
	style.zIndex = 999999;

	var textButton = doc.createElement('button');
	style = textButton.style;
	style.backgroundColor = 'rgb(77, 77, 77)';
	style.position = 'relative';
	style.color = 'white';
	style.fontSize= '36pt';
	style.width="100%";
	style.height="100%";
	style.textAlign="center";
	style.verticalAlign="middle";
	style.cursor="pointer";
	
	textButton.setAttribute('aria-label', trivstrAUTO);
	textButton.innerHTML = trivstrAUTO;
	textButton.onclick = function(){callbackToRunOnClick(); return false;};

	nDiv.appendChild(textButton);
    doc.body.appendChild(nDiv);
	
}

function logAllEvents(startElement){
	for(var i = 0; i < startElement.childNodes.length; i++) {
		startElement.childNodes[i].onfocus = function(e){
			console.log(e.srcElement);
		};
		logAllEvents(startElement.childNodes[i]);
	}
	return;
}

function isInQuestion(ele){
	var questionRegex = RegExp('qu[0-9]*')
	if(!ele)
		return false;
	else if(questionRegex.test(ele.id))
		return true;
	return isInQuestion(ele.parentElement);
}

function isInForm(ele){
	var formRegex = RegExp('form[0-9]*_fieldset')
	if(!ele)
		return false;
	else if(formRegex.test(ele.id))
		return true;
	return isInForm(ele.parentElement);
}

function isInIframeCopiedLO(win)
{
	return !!getAncestorIframe(win);
}

function isInFrameCopiedLO(win)
{
	return !!getAncestorFrame(win);
}

function getAncestorIframe(win)
{
	return getAncestorFrameOrIFrame(win, 'iframe');
}

function getAncestorFrame(win)
{
	return getAncestorFrameOrIFrame(win, 'frame');
}

function getAncestorFrameOrIFrame(win, tag, cnt)
{
	win = win || window.parent;
	cnt = cnt || 0;
	if (win.frameElement && win.frameElement.tagName.toLowerCase() == tag && win.frameElement.parentElement.id != 'trivTitleMgrFrameset')
		return win.frameElement;
	else if (win.parent && cnt < 10)
		return getAncestorFrameOrIFrame(win.parent, tag, ++cnt);
	return null;
}

function getHTMLEleByIDInCurrPgDiv(childID)
{
	var elm = {};
    var elms = GetCurrentPageDiv().getElementsByTagName("*");
    for (var i = 0; i < elms.length; i++) {
        if (elms[i].id === childID) {
            elm = elms[i];
            return elm;
        }
    }
    return false;
}

function trivScrollTo( wind , objToScroll )
{
	win = wind ? wind : getDisplayWindow();

	if(typeof(objToScroll) !== 'undefined')
	{
		if(objToScroll == 'top')
			win.scrollTo(0, 1);
		else
			win.scrollTo(0 , getTopofObj( getDisplayDocument().getElementById(objToScroll) ));
	}


}

function trivGetScrollObj(windowLocation)
{
	var objToScroll = windowLocation.substring( windowLocation.indexOf("#")+1, windowLocation.length);
	if( objToScroll.length == 0 || objToScroll == windowLocation )
	{
		objToScroll = 'top';
	}
	
	return objToScroll;
}

function isLDPopup () 
{
	// Need to check parent too?   this.parent.frameElement.id
	var felid = '';
	try {
		felid = this.frameElement && this.frameElement.id || '';
	} catch (e) {} // might not be our frame!
	return felid.indexOf('DLG_content') == 0 || felid.indexOf('WebWin_content') == 0;

}


function trivScrollTo( wind , objToScroll )
{
	win = wind ? wind : getDisplayWindow();

	if(typeof(objToScroll) !== 'undefined')
	{
		if(objToScroll == 'top')
			win.scrollTo(0, 1);
		else
			win.scrollTo(0 , getTopofObj( getDisplayDocument().getElementById(objToScroll) ));
	}


}


function trivGetScrollObj(windowLocation)
{
	var objToScroll = windowLocation.substring( windowLocation.indexOf("#")+1, windowLocation.length);
	if( objToScroll.length == 0 || objToScroll == windowLocation )
	{
		objToScroll = 'top';
	}
	
	return objToScroll;
}