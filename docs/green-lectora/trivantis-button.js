/**************************************************
Trivantis (http://www.trivantis.com)
**************************************************/
var ocmOrig = getDisplayDocument().oncontextmenu
var ocmNone = new Function( "return false" )

// Button Object
function ObjButton(n,a,x,y,w,h,v,z,d,cl,act,fb) {
  this.name = n
  this.altName = a
  this.x = x
  this.origX = x
  this.y = y
  this.w = w
  this.ow = w;
  this.mapw = w;
  this.h = h
  this.oh = h;
  this.maph = h;
  this.v = v
  this.z = z
  this.obj = this.name+"Object"
  this.alreadyActioned = false;
  eval(this.obj+"=this")
  if ( d != 'undefined' && d!=null )
    this.divTag = d;
  else  
    this.divTag = "div";
  this.addClasses = cl;
  this.hasAct = act;
  this.changeContFired = false;
  this.bEmbeddedImg = this.x == null ? true : false;

  this.hasOuterShadow = false;
  this.outerShadowDirection = 0;
  this.outerShadowDepth = 0;
  this.outerShadowOpacity = 0;
  this.shadowRed = 0;
  this.shadowGreen = 0;
  this.shadowBlue = 0;
  this.shadowRedHex = null;
  this.shadowGreenHex = null; 
  this.shadowBlueHex = null;
  this.outerShadowBlurRadius = 0;
  this.shadowType = null; 
  
  this.hasReflection = false;
  this.reflectedImageX = 0;
  this.reflectedImageY = 0;
  this.reflectedImageWidth = 0;
  this.reflectedImageHeight = 0;
  this.reflectedImageOffset = 0;
  this.reflectedImageFadeRate = 0;
  this.reflectionSeparation = 0;
  this.reflectionPosDiffY	= 0;
  this.reflectionPosDiffX	= 0;
  
  this.fillStyle = -1;
  
  this.bUseSvgFile = false;
  this.bOffPage = false;
  this.bFixedPosition = false;
  this.bBottom = fb?true:false;
  this.bInherited = false;
  this.currentState = "normalState";
  this.baseState = "normalState";
  this.stateOpacity = {normalState : 100};
  this.bDontAdjust = false;
  this.filterid = isSinglePagePlayerAvail() ? window.trivPlayer.activePage.nameNoEx + '_' + this.name : this.name;
}

function ObjButtonActionGoTo( destURL, destFrame ) {
  this.objLyr.actionGoTo( destURL, destFrame );
}

function ObjButtonActionGoToNewWindow( destURL, name, props ) {
  this.objLyr.actionGoToNewWindow( destURL, name, props );
}

function ObjButtonActionPlay( ) {
  this.objLyr.actionPlay();
}

function ObjButtonActionStop( ) {
  this.objLyr.actionStop();
}

function ObjButtonActionShow(bFromActivate) {
  var THIS = this;
  if( !THIS.isVisible() )
  {
	THIS.onShow();
	if((THIS.bIsWCAG && THIS.altName && !bFromActivate )|| isLDPopup())
		setTimeout( function() {THIS.div.innerHTML = THIS.div.innerHTML;} , 100);
  }
}

function ObjButtonActionHide( ) {
  if( this.isVisible() )
    this.onHide();
}

function ObjButtonActionLaunch( ) {
  this.objLyr.actionLaunch();
}

function ObjButtonActionExit( ) {
  this.objLyr.actionExit();
}

function ObjButtonActionChangeContents( ) {
  this.objLyr.actionChangeContents();
}

function ObjButtonActionTogglePlay( ) {
  this.objLyr.actionTogglePlay();
}

function ObjButtonActionToggleShow( ) {
  if(this.objLyr.isVisible()) this.actionHide();
  else this.actionShow();
}

function ObjButtonSizeTo( w, h, bResp ) {
  var tempObj = {xOffset:0, yOffset:0, width: w, height: h, xOuterOffset:0, yOuterOffset:0};
  
  if(this.bUseSvgFile)
	  AddSVGViewBox(this);

  AdjustAttributesForEffects(this, tempObj);
  
  ModifyImageTag(this, tempObj, bResp);
  
  if(this.hasOuterShadow)
	ModifySVGShadow(this, tempObj);
  
  if(this.hasReflection)
	ModifyReflection(this, tempObj);
   
   if(!this.name.indexOf("button")>-1)
		tempObj.width +=3;
  
  if(this.objLyr)
  {
	if(typeof(bResp) == "undefined")
		this.objLyr.clipTo(((tempObj.yOffset<0)?tempObj.yOffset:0), tempObj.width, tempObj.height, ((tempObj.xOffset<0)?tempObj.xOffset:0));
  }
}

{// Setup prototypes
var p=ObjButton.prototype
p.checkbox = false
p.setImages = ObjButtonSetImages
p.setFills = ObjButtonSetFills
p.setDisabledImage = ObjButtonSetDisabledImage
p.setDisabled = ObjButtonSetDisable
p.setStateOpacity = ObjButtonSetStateOpacity
p.build = ObjButtonBuild
p.buildSvg = ObjButtonBuildSvg
p.init = ObjButtonInit
p.activate = ObjButtonActivate
p.down = ObjButtonDown
p.up = ObjButtonUp
p.over = ObjButtonOver
p.out = ObjButtonOut
p.change = ObjButtonChange
p.capture = 0

p.onDown = new Function()
p.onUp = new Function()
p.onOver = new Function()
p.onOut = new Function()
p.onSelect = new Function()
p.onDeselect = new Function()
p.getPreloadString = ObjButtonGetPreloadString
p.actionGoTo = ObjButtonActionGoTo
p.actionGoToNewWindow = ObjButtonActionGoToNewWindow
p.actionPlay = ObjButtonActionPlay
p.actionStop = ObjButtonActionStop
p.actionShow = ObjButtonActionShow
p.actionHide = ObjButtonActionHide
p.actionLaunch = ObjButtonActionLaunch
p.actionExit = ObjButtonActionExit
p.actionChangeContents = ObjButtonActionChangeContents
p.actionTogglePlay = ObjButtonActionTogglePlay
p.actionToggleShow = ObjButtonActionToggleShow
p.writeLayer = ObjButtonWriteLayer
p.onShow = ObjButtonOnShow
p.onHide = ObjButtonOnHide
p.isVisible = ObjButtonIsVisible
p.sizeTo    = ObjButtonSizeTo
p.onSelChg = new Function()
p.initRotateAngle = ObjInitRotateAngle
p.addIe8Attr = ObjInitIe8Attr
p.initHasShadow = ObjInitHasShadow
p.initHasReflection = ObjInitHasReflection
p.initReflection = ObjInitReflection
p.addOpacity = ObjInitOpacity
p.addShadow = ObjInitShadow
p.initImageMap = ObjInitImageMap
p.loadProps = ObjLoadProps
p.respChanges = ObjRespChanges
p.setFillStyle	= ObjSetFillStyle
p.setUseSvgFile = ObjButtonUseSvgFile
p.validateSrc = ObjButtonValidSource
p.setTextVal = ObjButtonSetTextValues
p.setImgFillVal = ObjButtonImageFillVal
p.buildSvgImgFill = ObjButtonBuildSvgImgFill
p.buildText = ObjButtonBuildText
p.buildSpanText = ObjButtonBuildSpanText
p.refresh = ObjButtonRefresh
p.getCSS = ObjButtonGetCSS
p.setupObjLayer = ObjButtonSetupObjLayer
p.rebuildDefs = ObjButtonRebuildDefs
p.rv = ObjButtonRV
p.setUniqueFillID = ObjButtonSetID
p.initLineWeight = ObjInitLineWeight

p.setState = function( state )
{
	this.baseState = state;
	
	if(!this.bUseSvgFile)
	{
		if (state == 'normalState')
			this.change(this.imgOffSrc, false, null, this.stateOpacity.normalState, null, "normalState");
		else if (state == 'disabledState')
			this.change(this.imgDisabledSrc, false, null, this.stateOpacity.disabledState, null, "disabled");
		else if (state == 'overState')
			this.change(this.imgRollSrc, false, null, this.stateOpacity.overState, null, "overState"); 
		else if (state == 'downState')
			this.change(this.imgOnSrc, false, null, this.stateOpacity.downState, null, "downState"); 
	 
	}
	else if (state == 'normalState')
	{
		this.setDisabled(false);
	}
	else if (state == 'disabledState')
	{
		this.setDisabled(true);
	}	
	else
	{
		//custom states cannot be disabled 
		this.bDisabled = false;
		this.hasOnUp = true;
		this.change(this.stateFills[state].stylePath, false , this.name+state+"Text", this.stateOpacity[state], this.stateImgFills[state].style, state);
	}
}

p.updateFillSize = function ( btnState ){
	if( is.svg && this.str_SvgMapPath )
	{
		if( !btnState )
		{
			for (var i=0;i < this.btnStates.length;i++)
			{
				this.updateFillSize( this.btnStates[i] );
			}
		}
		else
		{
			var pictureId = "Picture_"+this.fuID+(btnState=='normalState'?'':'_'+btnState);
			
			//calculate the proper fill sizes.
			var tempDiv = getDisplayDocument().createElement( 'DIV' );
			tempDiv.style.visibility = 'hidden';
			getDisplayDocument().body.appendChild( tempDiv );
			tempDiv.innerHTML = '<svg><g><path d="' + this.str_SvgMapPath + '"></path></g></svg>';
			this.pathBBox = tempDiv.getElementsByTagNameNS('http://www.w3.org/2000/svg','path')[0].getBBox();
			tempDiv.parentNode.removeChild(tempDiv);
		
			var adjustPictureFill = getDisplayDocument().getElementById (pictureId);
			if(adjustPictureFill && this.stateFills[btnState].stylePath.indexOf("nonzero")==-1) 
			{
				var adjustBy = this.bDontAdjust ? parseInt(this.lineWeight == 1 ? this.lineWeight * 2 : this.lineWeight   ) : 0; 
				adjustPictureFill.setAttribute('width' , this.pathBBox.width + adjustBy);
				adjustPictureFill.setAttribute('height' , this.pathBBox.height + adjustBy);
				adjustPictureFill.querySelector('image').setAttribute('width' , this.pathBBox.width + adjustBy);
				adjustPictureFill.querySelector('image').setAttribute('height' , this.pathBBox.height + adjustBy);
				adjustPictureFill.querySelector('image').setAttribute('x' , this.bDontAdjust ? 0 : this.lineWeight / 2);
				adjustPictureFill.querySelector('image').setAttribute('y' , this.bDontAdjust ? 0 : this.lineWeight / 2);
				if(this.stateImgFills[btnState].B64)
				{
					adjustPictureFill.querySelector('image').setAttributeNS('http://www.w3.org/1999/xlink','href', this.stateImgFills[btnState].B64);
				}
			}
		}
	}
};
}

function ObjButtonSetStateOpacity( stateOpacity )
{
	// custStates
	this.stateOpacity = stateOpacity;
}

function ObjButtonSetImages(imgOff,imgOn,imgRoll,imgDis, dir) {
  if (imgOff && imgOff.normalState)
  {
	// custStates
	// text buttons work this way this.stateImgs = {'normalState':'images/normal.png','overState':'images/over.png',...}
	this.stateImg = imgOff; 
  }
  else
  {
	  // support old ObjButton objects
	  if (!dir) dir = ''
	  this.imgOffSrc = imgOff?dir+imgOff:''
	  this.imgSrc = imgOff?dir+imgOff:'' //For Transitions
	  this.imgOnSrc = imgOn?dir+imgOn:''
	  this.imgRollSrc = imgRoll?dir+imgRoll:''
	  this.imgDisabledSrc = imgDis?dir+imgDis:''
  }
}

function ObjButtonSetFills( stateFills ) {
	
	// custStates {"custState_2770":{"fill":"","style":"stroke:#0963B1; stroke-width:1; stroke-linejoin:round;stroke-dasharray: none; fill:#FFD966;\""},"disabledState": ... }
	this.stateFills = stateFills;
	this.btnStates = Object.keys(stateFills);
	
}
function ObjButtonSetDisabledImage( imgDis, dir )
{
  if (!dir) dir = ''
  this.imgDisabledSrc = imgDis?dir+imgDis:''
}

function ObjButtonSetDisable( bSet )
{
	this.bDisabled = bSet;
	this.hasOnUp = !bSet;
	
	if(!is.svg || !this.bUseSvgFile)
	{
		if (this.imgDisabledSrc && bSet) 
			this.change(this.imgDisabledSrc, false, null, this.stateOpacity.disabledState, null, "disabledState")
		else if (!this.imgDisabledSrc && bSet) 
		{
			this.change(this.imgOffSrc, false, null, this.stateOpacity.normalState, null, "normalState");
		}
		else if(this.imgOffSrc && !bSet)
			this.change(this.imgOffSrc, false, null, this.stateOpacity.normalState, null, "normalState");
	}
	else
	{
 		if (this.stateFills['disabledState'].stylePath && bSet) 
			this.change(this.stateFills['disabledState'].stylePath, false , this.name+'disabledState'+"Text", this.stateOpacity.disabledState, this.stateImgFills['disabledState'].style, "disabledState");
		else if (!this.stateFills['disabledState'].stylePath && bSet) 
		{
			this.change(this.stateFills['normalState'].stylePath, false , this.name+"Text", this.stateOpacity.normalState, this.stateImgFills['normalState'].style, "normalState");
		}
		else if(this.stateFills['normalState'].stylePath && !bSet)
			this.change(this.stateFills['normalState'].stylePath, false , this.name+"Text", this.stateOpacity.normalState, this.stateImgFills['normalState'].style, "normalState");
	}
}

function ObjButtonBuild() {
  ObjDegradeEffects(this , true);	//echo LD-768 : Check if we need to gracefully degrade effects

  this.loadProps();
  
  if(this.bDegradeShadow)
		this.hasOuterShadow = false;
	
  if(this.bDegradeReflection)
		this.hasReflection = false;
  
  var adjustedXPos = this.x;
  var adjustedYPos = this.y;
  var adjustedWidth = this.w + (is.firefox?2:0);
  var adjustedHeight = this.h + (is.firefox?2:0);
  
  
  var radians = this.outerShadowDirection * (Math.PI / 180.0);
  var xOffset = this.outerShadowDepth * Math.cos(radians);
  //Multiply by -1 because a negative offset means this shadow is in the positive y-direction on the screen
  var yOffset = -1 * this.outerShadowDepth * Math.sin(radians);
  
  this.bIsWCAG = is.bWCAG;
  
	if(is.vml && this.bCanRotate && !is.ie8)
	{
		adjustedXPos = this.ie8DivX;
		adjustedYPos = this.ie8DivY;	
		adjustedWidth = this.ie8DivWidth;
		adjustedHeight = this.ie8DivHeight;
	}

	if(this.hasOuterShadow && is.svg)
	{
		adjustedWidth = this.w + (1 * Math.abs(xOffset)) + this.outerShadowBlurRadius;
		adjustedHeight = this.h + (1 * Math.abs(yOffset)) + this.outerShadowBlurRadius;

		if(xOffset < 0 && is.svg)
		{	
			adjustedXPos = this.x  + (1 * (xOffset - this.outerShadowBlurRadius)) + ((xOffset<0 && yOffset<0)?1:0); //There is a 1 pixel rounding error for offset in both directions
		}
		if(yOffset < 0 && is.svg)
		{	
			adjustedYPos = this.y + (1 * (yOffset - this.outerShadowBlurRadius));
		}
	}
  
	if(!this.name.indexOf("button")>-1)
		adjustedWidth +=3;

	if (this.str_SvgMapPath && !is.iOS && (is.svg && is.bSupportsClickMap) && !this.bIsWCAG)
		this.bHasClickMap = true;
	else
		this.bHasClickMap = false;

	this.bSVGMap = this.bHasClickMap;

   this.css = this.getCSS();
   
   this.bInherited = checkObjectInheritance(this);
   if(this.bInherited)
	   return;
   
   if(is.ie9 && this.r >0)
   {
		adjustedWidth = this.w + ((!this.name.indexOf("button")>-1)?3:0);
		adjustedHeight = this.h;
   }
   
  var IERotation = '';
  
  if(is.vml && !this.hasOuterShadow)
  {
	if(this.r > 0)
	{
		if( this.r%360 > 0 && is.ie8 && this.bCanRotate)
		{
			/* var radians = this.r * (Math.PI / 180.0);
			 var cosTheta = Math.cos(radians);
			 var sinTheta = Math.sin(radians);

			IERotation = 'filter: ';
			
			IERotation += ' progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\'auto expand\',M11='+cosTheta+', M12='+((-1)*sinTheta)+', M21='+sinTheta+', M22='+cosTheta+');'*/
		}
		if(this.r > 0 && is.ie9)
		{
			IERotation += '-ms-transform:rotate('+ this.r +'deg);'
		}
	}
  }
  
  var ie9PosCorrect = '';
  if(is.ie9)
  {
	ie9PosCorrect = 'left:'+(this.x - this.ie8DivX)+'px; top:'+(this.y - this.ie8DivY)+'px;';
  }
  
  this.div = '';
  if(this.hasReflection)
  {	
	var strIndex = this.css.indexOf("z-index:");
	var zIndex = "auto";
	if(strIndex >=0)
	{
		zIndex = this.z;
	}
    this.divReflect = addReflection(this.name, (!this.bOffPage?this.imgOffSrc:''), this.reflectedImageX, this.reflectedImageY, this.reflectedImageWidth, 
									this.reflectedImageHeight, this.r, this.reflectedImageOffset, this.reflectedImageFadeRate, this.v, this.vf, this.hf, 
									this.boundsRectX, this.boundsRectY, this.wrkAdornerWidth, this.wrkAdornerHeight, zIndex, 
									this.ie8ReflectionDivX, this.ie8ReflectionDivY, this.ie8ReflectionDivWidth, this.ie8ReflectionDivHeight, 
									this.ie8ReflectionImgX, this.ie8ReflectionImgY, this.bFixedPosition);

  }
  
  

  this.div += '<' + this.divTag + ' id="'+this.name+'" ';
		
	//LD-6288 No longer relie on title and alt for accesibility aria-label handles it
    this.div += 'title="" alt="" ';

  if(this.bIsWCAG && this.altName)
		this.div += 'aria-live="polite"';

  //Applies SVG shadow to images on non ie8 and ie9 browsers
  if(this.hasOuterShadow && is.svg)
  {	
	this.divShadow = ObjSVGShadow(adjustedWidth, adjustedHeight, xOffset, yOffset, this);
  } 
  else if(this.hasOuterShadow && is.vml)
  {
	//In IE8 and IE9, two images are needed to produce a shadow with opacity, blur, and color. The image on top is being rotated by a VML attribute. 
	//The image on the bottom is producing the shadow and shadow blur.  
    var radians = this.outerShadowDirection * (Math.PI / 180.0);
	var xOffset = this.outerShadowDepth * Math.cos(radians);
	//Multiply by -1 because a negative offset means this shadow is in the positive y-direction on the screen
	var yOffset = -1 * this.outerShadowDepth * Math.sin(radians);
	var blurRadius = (1.0*this.outerShadowBlurRadius);
	
	xOffset = xOffset.toFixed(5);
	yOffset = yOffset.toFixed(5);
	
	this.divShadow = ObjVMLShadow(xOffset, yOffset, blurRadius, this);
  }
  
  if( this.addClasses ) this.div += ' class="'+this.addClasses+'"'
  
  this.div += '></' + this.divTag + '>\n';
  this.divInt = "";
  //If bUnsuppStr is set, this button is being used as and Audio button. 
  if(this.bUnsuppStr){
	this.divInt += '<img src="images/warn.jpg" onClick="alert(\'' + this.bUnsuppStr + '\')" style="position:absolute;cursor:pointer;width:16px;height:16px;z-index:' + (this.z + 1) + '" />';
  }
  this.divInt += '<button type="button" name="'+this.name+'btn" id="'+this.name+'btn"'
  if(this.altName) this.divInt +='title="'+'"aria-label="'+this.altName+'"'
  this.divInt +=' aria-label=""'
  if(is.ie8 || is.ie9)
	this.divInt += ' style="'+ie9PosCorrect+IERotation+'"';
 
 if(this.hasAct && !this.bHasClickMap)
	this.divInt+=' onclick="if( ' + this.name + 'Object.hasOnUp ) ' + this.name + 'Object.onUp()"'
		

  this.divInt += '>'
  if( ((!this.hasOuterShadow || is.ie9 ) && (!is.svg || !this.bUseSvgFile)) || (!is.svg && !this.bUseSvgFile)  )
  {
	this.divInt += '<img name="'+this.name+'Img" id="'+this.name+'Img" src="'+(!this.bOffPage?this.imgOffSrc:'')+'"';
	if(this.altName)
		this.divInt += ' alt ="'+this.altName+'"';
	else if(is.ieAny)
		this.divInt += '';
	else
		this.divInt += ' alt =""';
	
	this.divInt += '></img>'
	this.divInt += '</button>'
  }
  else if(!is.svg || !this.bUseSvgFile)
	this.divInt += this.divShadow;	//echo bug 21347 : The closing button tag is added in the ObjVMLShadow function because we need to move the shadow image outside of the button. 

  if(is.svg && this.bUseSvgFile) 
  {
	  this.buildSvg();

  }
  //Button Click Mapping -- See rev 50983
  if(is.svg && this.bHasClickMap)
  {
	this.divInt += addClickMap(adjustedWidth, adjustedHeight, xOffset, yOffset, this);
  }
  
  this.div = CreateHTMLElementFromString(this.div);
}

function ObjButtonBuildSvg(){
    var radians = this.outerShadowDirection * (Math.PI / 180.0);
	
	var xOffset = this.outerShadowDepth * Math.cos(radians);
	//Multiply by -1 because a negative offset means this shadow is in the positive y-direction on the screen
	var yOffset = -1 * this.outerShadowDepth * Math.sin(radians);
	
	xOffset = parseFloat(xOffset.toFixed(5));
	yOffset = parseFloat(yOffset.toFixed(5));

	var adjustedXPos = this.x;
	var adjustedYPos = this.y;
	var adjustedWidth = this.w;
	var adjustedHeight = this.h;  


  
	if(this.hasOuterShadow)
	{
		adjustedWidth = Math.ceil(this.w + (1 * Math.abs(xOffset))  + this.outerShadowBlurRadius);
		adjustedHeight = Math.ceil(this.h + (1 * Math.abs(yOffset))  + this.outerShadowBlurRadius);  
			
		if(xOffset < 0 || yOffset < 0)
		{
			if(xOffset < 0 && yOffset >= 0)
			{
				adjustedXPos += (xOffset - this.outerShadowBlurRadius);
			}
			else if(xOffset >= 0 && yOffset < 0)
			{	
				adjustedYPos += (yOffset - this.outerShadowBlurRadius);
			}
			else
			{
				adjustedXPos += (xOffset - this.outerShadowBlurRadius);
				adjustedYPos += (yOffset - this.outerShadowBlurRadius);
			}
		}
	}
	
	if(this.hasReflection)
	{	
		var strIndex = this.css.indexOf("z-index:");
		var zIndex = "auto";
		if(strIndex >=0)
		{
			zIndex = this.z;
		}
		
		var bTranslate = false;
		if(this.lineWeight % 2 != 0)
			bTranslate = true;
		var pathSource = "<path " + (bTranslate? "transform=\"translate(0.5 0.5)\"" :"")+ "d='"+this.str_SvgMapPath +"'  style=\"" + this.stateFills['normalState'].stylePath;;
		var imgFSource = "<path " + (bTranslate? "transform=\"translate(0.5 0.5)\"" :"")+ "d='"+this.str_SvgMapPath +"'  style=\"" + (this.stateImgFills['normalState'].style ? this.stateImgFills['normalState'].style : "fill:none") + ";\"";
		var textSource = this.buildSpanText(this.name + 'ReflectionDiv');

		this.divReflect = addReflection(this.name, (!this.bOffPage?pathSource:''), this.reflectedImageX, this.reflectedImageY, this.reflectedImageWidth, 
										this.reflectedImageHeight, this.r, this.reflectedImageOffset, this.reflectedImageFadeRate, this.v, this.vf, this.hf, 
										this.boundsRectX, this.boundsRectY, this.wrkAdornerWidth, this.wrkAdornerHeight, zIndex, 
										this.ie8ReflectionDivX, this.ie8ReflectionDivY, this.ie8ReflectionDivWidth, this.ie8ReflectionDivHeight, 
										this.ie8ReflectionImgX, this.ie8ReflectionImgY, this.bUseSvgFile, this.bFixedPosition, (!this.bOffPage?textSource:''),(!this.bOffPage?imgFSource:''));

	}
	
	var mapOffsetX = 0;
	var mapOffsetY = 0;
	
	if(this.hasOuterShadow)
	{			
		this.divInt += '<svg tabindex="-1" focusable="false" aria-label="" width="' + adjustedWidth + 'px" height="' + adjustedHeight + 'px"'
		
		this.divInt += addSvgShadowFilter(this.name, this.w, this.h, this.outerShadowDirection, this.outerShadowDepth, this.outerShadowOpacity, this.shadowRed, this.shadowGreen, this.shadowBlue, this.outerShadowBlurRadius, this.shadowType, this.lineWeight); 
		
		if(xOffset <= 0 || yOffset <= 0)
		{
			if(xOffset <= 0)
				this.divInt += 'x = "' + (xOffset - this.outerShadowBlurRadius) + '" '
			if(yOffset <= 0)
				this.divInt += 'y = "' + (yOffset - this.outerShadowBlurRadius) + '" '
		}
		
		this.divInt += '>\n'
		
		if(xOffset <= 0 || yOffset <= 0)
		{	
			this.divInt += "<defs>";
			
			// custStates adding all styles
			for (var i=0;i < this.btnStates.length;i++)
			{
				this.divInt += this.stateFills[this.btnStates[i]].fillInfo; 
			}
		
			this.divInt += "</defs>";
			this.divInt += "<path id='" +this.name +"path' d='"+this.str_SvgMapPath +"'  style=\"" + this.stateFills['normalState'].stylePath;
			
			this.divInt+= 'x = "';
			
			if(xOffset < 0)
			{
				mapOffsetX = Math.abs(xOffset) + this.outerShadowBlurRadius;
				this.divInt += mapOffsetX + '" width = "' + this.w + 'px"'
			}
			else this.divInt += '0" width = "' + this.w + 'px"'
			if(yOffset < 0)
			{
				mapOffsetY = Math.abs(yOffset) + this.outerShadowBlurRadius;
				this.divInt += 'y = "' + mapOffsetY + '" height = "' + this.h + 'px"'
			}
			else this.divInt += 'y = "0" height = "' + this.h + 'px"'
			
			this.divInt += 'filter="url(#' + this.filterid + 'Shadow)"' 
			
			if( !this.bHasClickMap )
				this.divInt += 'style="cursor:default;"'
			this.divInt += " transform='translate( "+ mapOffsetX + ", " +mapOffsetY + "  )' ";
			
			this.divInt += '/>\n'
		}
		else
		{
		this.divInt += "<defs>";

		// custStates adding all styles
		for (var i=0;i < this.btnStates.length;i++)
		{
			this.divInt += this.stateFills[this.btnStates[i]].fillInfo; 
		}
		
		this.divInt += "</defs>";
		
		this.divInt += "<path id='" +this.name +"path' d='"+this.str_SvgMapPath +"'  style=\"" + this.stateFills['normalState'].stylePath;

			this.divInt += 'x = "0" y = "0" height = "' + this.h + 'px" width = "' + this.w + 'px" filter="url(#'+ this.filterid + 'Shadow)"'
			
			if( !this.bHasClickMap )
				this.divInt += 'style="cursor:default;"'
			
			this.divInt += '/>\n';
		}	
	}
	else{	
		this.divInt += '<svg tabindex="-1" focusable="false" aria-label="" width= "100%" height="100%" >\n'
		
		this.divInt += "<defs>";
		// custStates adding all styles
		for (var i=0;i < this.btnStates.length;i++)
		{
			this.divInt += this.stateFills[this.btnStates[i]].fillInfo; 
		}
		this.divInt += "</defs>";
		this.divInt += "<path " + ((this.lineWeight==0)?"":"transform=\"translate(0.5 0.5)\" " ) + "id='" +this.name +"path' d='"+this.str_SvgMapPath +"'  style=\"" + this.stateFills['normalState'].stylePath;
		this.divInt += '/>\n';	
	}
	
	this.divInt += this.buildSvgImgFill(mapOffsetX , mapOffsetY);
	//this.divInt += this.buildText(mapOffsetX , mapOffsetY);
	
	this.divInt += '</svg>\n'
		
	this.bSVGMap = true;	
	
	this.divInt += this.buildSpanText(this.name , mapOffsetX , mapOffsetY );

	


	this.divInt += '</button>'
}

function ObjButtonBuildSpanText(name, mapOffsetX, mapOffsetY)
{
	var txtReturn = "";
	txtReturn += '<div aria-hidden=\"true\" class="' + this.name +'Text" id="'+ name +'TextDiv" ';
	txtReturn += 'style= "' 

	if(mapOffsetX != 0 || mapOffsetY != 0 )
	 txtReturn += "left:"+ mapOffsetX + "px; top:" +mapOffsetY + "px; ";
	txtReturn += '"';

	txtReturn += '>'
	txtReturn += '<span aria-hidden=\"true\" class="' + this.name +'Text" id="'+ name +'TextSpan"> ';
	txtReturn += typeof(this.text)!='undefined' ? this.text : "";
	txtReturn += "</span>";
	txtReturn += "</div>";
	return txtReturn;

}

function ObjButtonBuildText(mapOffsetX , mapOffsetY)
{	
	var txtReturn = "";
	txtReturn += "<defs>";

	var radians = this.outerShadowDirection * (Math.PI / 180.0);
	
	var xOffset = this.outerShadowDepth * Math.cos(radians);
	//Multiply by -1 because a negative offset means this shadow is in the positive y-direction on the screen
	var yOffset = -1 * this.outerShadowDepth * Math.sin(radians);
	
	xOffset = parseFloat(xOffset.toFixed(5));
	yOffset = parseFloat(yOffset.toFixed(5));

	var adjustedWidth = this.w;
	var adjustedHeight = this.h; 

	if(this.hasOuterShadow)
	{
		adjustedWidth = Math.ceil(this.w + (1 * Math.abs(xOffset))  + this.outerShadowBlurRadius);
		adjustedHeight = Math.ceil(this.h + (1 * Math.abs(yOffset))  + this.outerShadowBlurRadius); 
	}
	
	txtReturn += "<pattern id=\"Text_" + this.fuID + "\" x=\"0\" y=\"0\" width=\"" + adjustedWidth + "\" height=\""+ adjustedHeight +  "\" patternUnits=\"userSpaceOnUse\">\n";
	txtReturn += "<image aria-hidden=\"true\" xlink:href=\""+ this.td + "\" x=\"0\" y=\"0\" width=\"" + adjustedWidth + "\" height=\""+adjustedHeight +  "\" preserveAspectRatio=\"none\">\n";
	txtReturn += "</pattern>\n";
	
	txtReturn += "<pattern id=\"Text_" + this.fuID + "_over\" x=\"0\" y=\"0\" width=\"" + adjustedWidth + "\" height=\""+ adjustedHeight +  "\" patternUnits=\"userSpaceOnUse\">\n";
	txtReturn += "<image xlink:href=\""+ this.tdO + "\" x=\"0\" y=\"0\" width=\"" + adjustedWidth + "\" height=\""+adjustedHeight +  "\" preserveAspectRatio=\"none\">\n";
	txtReturn += "</pattern>\n";
	
	txtReturn += "<pattern id=\"Text_" + this.fuID + "_down\" x=\"0\" y=\"0\" width=\"" + adjustedWidth + "\" height=\""+ adjustedHeight +  "\" patternUnits=\"userSpaceOnUse\">\n";
	txtReturn += "<image aria-hidden=\"true\" xlink:href=\""+ this.tdD + "\" x=\"0\" y=\"0\" width=\"" + adjustedWidth + "\" height=\""+adjustedHeight +  "\" preserveAspectRatio=\"none\">\n";
	txtReturn += "</pattern>\n";
	
	txtReturn += "<pattern id=\"Text_" + this.fuID + "_disabled\" x=\"0\" y=\"0\" width=\"" + adjustedWidth + "\" height=\""+ adjustedHeight +  "\" patternUnits=\"userSpaceOnUse\">\n";
	txtReturn += "<image aria-hidden=\"true\" xlink:href=\""+ this.tdDi + "\" x=\"0\" y=\"0\" width=\"" + adjustedWidth + "\" height=\""+adjustedHeight +  "\" preserveAspectRatio=\"none\">\n";
	txtReturn += "</pattern>\n";
	
	
	txtReturn += "</defs>";
	
	
	txtReturn += "<path id='" +this.name +"text' d='"+this.str_SvgMapPath +"'  style=\"" + this.name+"Text" + ";\"" + " transform='translate( "+ mapOffsetX + ", " +mapOffsetY + "  )' ";
	txtReturn += '/>\n';	
	
	return txtReturn;
	
	
}

function ObjButtonBuildSvgImgFill( mapOffsetX , mapOffsetY )
{
	var txtReturn = "";
	txtReturn += "<defs>";

	var radians = this.outerShadowDirection * (Math.PI / 180.0);
	
	var xOffset = this.outerShadowDepth * Math.cos(radians);
	//Multiply by -1 because a negative offset means this shadow is in the positive y-direction on the screen
	var yOffset = -1 * this.outerShadowDepth * Math.sin(radians);
	
	xOffset = parseFloat(xOffset.toFixed(5));
	yOffset = parseFloat(yOffset.toFixed(5));

	var adjustedWidth = this.w;
	var adjustedHeight = this.h

	if(this.hasOuterShadow)
	{
		adjustedWidth = Math.ceil(this.w + (1 * Math.abs(xOffset))  + this.outerShadowBlurRadius);
		adjustedHeight = Math.ceil(this.h + (1 * Math.abs(yOffset))  + this.outerShadowBlurRadius); 
	}
	
	for (var i=0;i < this.btnStates.length;i++)
	{
		var btnState = this.btnStates[i];

		if(this.stateImgFills[btnState].hasFill)
		{
			txtReturn += "<pattern id=\"Picture_" + this.fuID + (btnState=='normalState'?'':'_'+btnState)+"\" x=\"0\" y=\"0\" width=\"" + adjustedWidth + "\" height=\""+ adjustedHeight +  "\" patternUnits=\"userSpaceOnUse\">\n";
			txtReturn += "<image aria-hidden=\"true\" xlink:href=\""+ this.stateImgFills[btnState].B64 + "\" x=\"0\" y=\"0\" width=\"" + adjustedWidth + "\" height=\""+adjustedHeight +  "\" preserveAspectRatio=\"none\">\n";
			txtReturn += "</pattern>\n";
		}
	}
	
	txtReturn += "</defs>";
	txtReturn += "<path id='" +this.name +"imgF' d='"+this.str_SvgMapPath +"'  style=\"" + (this.stateImgFills['normalState'].style ? this.stateImgFills['normalState'].style : "fill:none") + ";\"" + " transform='translate( "+ mapOffsetX + ", " +mapOffsetY + "  )' ";
	txtReturn += '/>\n';	
	
	return txtReturn;
}

function ObjButtonInit() {
  this.objLyr = new ObjLayer(this.name, null, null, this.div)
  if(!isSinglePagePlayerAvail() && !window.bTrivResponsive) adjustForFixedPositon(this);
}

function ObjButtonActivate() {
	if(!this.bInherited)
	{
		if( is.ns5 )
		{
			if(this.objLyr.ele.id != (this.name+"MapArea"))
				this.objLyr.ele.innerHTML = this.divInt;
			else
			{
				this.objLyr.ele = getHTMLEleByID(this.name);
				this.objLyr.ele.innerHTML = this.divInt;
			}
			if(this.hasReflection)
				if(this.objLyr.reflectDiv)
					this.objLyr.reflectDiv.outerHTML = this.divReflect;
		} 
		else 
			this.objLyr.write( this.divInt );

		if(this.divReflect)
		{
			if(typeof(this.divReflect) == "string")
				this.divReflect = CreateHTMLElementFromString(this.divReflect);
			
			GetCurrentPageDiv().appendChild(this.divReflect);
		}

		if(this.bEmbeddedImg)
		{
			var replaceEle = getHTMLEleByID("embeded_"+this.name);
			if(replaceEle)
				replaceEle.appendChild(this.objLyr.ele);
		}
	
		this.setupObjLayer();
  
		if( this.objLyr && this.objLyr.styObj && !this.alreadyActioned )
		{
			if( this.v ) this.actionShow(true) // pass true to indicate from activate

			if(this.v ==0 && (is.awesomium || is.vml))
			{
				if(this.objLyr.reflectDiv)
				{
					this.objLyr.reflectDiv.style.left = this.reflectedImageX + 'px';
					this.objLyr.reflectDiv.style.top = this.reflectedImageY + 'px';
					this.objLyr.reflectDiv.style.visibility = "hidden";
				}
			}
		}

		//LD-3083
		if( this.hasReflection )
		{
			var tempObj = {xOffset:0, yOffset:0, width: this.w, height: this.h, xOuterOffset:0, yOuterOffset:0, x:this.x, y:this.y, xAdj:0, yAdj:0, deltaX:0, deltaY:0};
			CorrectSizePosForEffects(this, tempObj);
			ModifyReflection(this);
		}
		
		this.updateFillSize();
		this.objLyr.updateTabIndex(this.objLyr);
	}
}

function ObjButtonDown(e) {
	if(isSinglePagePlayerAvail() && pageLayer.bInTrans) return;
  if( this.bDisabled ) return;
  if( is.ie ) e = event || e
  if( is.ie && !is.ieMac && e && e.button != 0 && e.button!=1 && e.button!=2 ) return
  if( is.ns && !is.nsMac && e && e.button!=0 && e.button!=2 )  return
  
  if(!is.svg || !this.bUseSvgFile)
  {
	  if (this.selected) {
		this.selected = false
		if (this.imgOnSrc) this.change(this.imgOnSrc, false, null, this.stateOpacity.downState, null, "downState")
		this.onDeselect()
	  }
	  else {
		if (this.checkbox) this.selected = true
		if (this.imgOnSrc) this.change(this.imgOnSrc, false, null, this.stateOpacity.downState, null, "downState")
		this.onSelect()
	  }
  }
  else
  {
	  if (this.selected) {
		this.selected = false
		if (this.stateFills['downState'].stylePath) this.change(this.stateFills['downState'].stylePath, false , this.name+"downState"+"Text", this.stateOpacity.downState, this.stateImgFills['downState'].style, "downState")
		this.onDeselect()
	  }
	  else {
		if (this.checkbox) this.selected = true
		if (this.stateFills['downState'].stylePath) this.change(this.stateFills['downState'].stylePath, false, this.name+"downState"+"Text", this.stateOpacity.downState, this.stateImgFills['downState'].style, "downState")
		this.onSelect()
	  }
  }
  this.onDown()
}

function ObjButtonUp(e) {
	if(isSinglePagePlayerAvail() && pageLayer.bInTrans) return;
  if( this.bDisabled ) return;
  if( is.ie ) e = event || e
  if( (is.ie || is.nsMac) && !e ) return
  if( is.ie && !is.ieMac && e && e.button != 0 && e.button!=1 && e.button!=2 ) return
  if( is.ns && !is.nsMac && e && e.button!=0 && e.button!=2 ) return
  
  if(!is.svg || !this.bUseSvgFile){
	   if (!this.selected) {
		if (this.imgRollSrc) this.change(this.imgRollSrc, false, null, this.stateOpacity.overState,null, "overState")
		else if (this.imgOnSrc) this.change(this.imgOffSrc, false, null, this.stateOpacity.downState, null, "downState")
	  }
  }
  else{
	  if (!this.selected) {
		if (this.stateFills['overState'].stylePath) this.change(this.stateFills['overState'].stylePath, false , this.name+"overState"+"Text", this.stateOpacity.overState, this.stateImgFills['overState'].style, "overState")
		else if (this.stateFills['downState'].stylePath)
		{
			this.change(this.stateFills[this.baseState].stylePath, false , this.name+this.baseState+"Text", this.stateOpacity[this.baseState], this.stateImgFills[this.baseState].style, this.baseState);
		} 
	  }
  }
  if( !is.ieMac && !is.nsMac && e && e.button==2 )
  {
    if( this.hasOnRUp )
    {
      getDisplayDocument().oncontextmenu = ocmNone
      this.onRUp()
      setTimeout( "getDisplayDocument().oncontextmenu = ocmOrig", 100)
    }
  }
  
  //echo LD-958 : onUp is for left mouse button events only. 
  if(this.hasAct && this.hasOnUp && (e.button == 0 || e.button == 1))
	this.onUp();
}

function ObjButtonOver() {
  if(isSinglePagePlayerAvail() && pageLayer.bInTrans) return;
  if( this.bDisabled ) return;
  if(!is.svg || !this.bUseSvgFile)
  { 
	if(this.imgRollSrc && !this.selected)
	{
		this.change(this.imgRollSrc, false, null, this.stateOpacity.overState, null, "overState"); 
	} 
  }
  else
  {
	  if(this.stateFills['overState'].stylePath && !this.selected) 
		  this.change(this.stateFills['overState'].stylePath, false , this.name+"overState"+"Text", this.stateOpacity.overState , this.stateImgFills['overState'].style, "overState");
  }
 
  this.objLyr.ele.style.cursor = 'pointer';
  
  this.onOver()
}

function ObjButtonOut() {
  if(isSinglePagePlayerAvail() && pageLayer.bInTrans) return;
  if( this.bDisabled ) return;
  if(!is.svg || !this.bUseSvgFile)
  {
	  if(this.imgOffSrc && !this.selected) 
	  {
		this.change(this.imgOffSrc, false, null, this.stateOpacity.normalState, null, "normalState"); 	
	  }  
  }
 else
 {
	 if(this.stateFills['normalState'].stylePath && !this.selected) 
	 {
		this.change(this.stateFills[this.baseState].stylePath, false , this.name+this.baseState+"Text", this.stateOpacity[this.baseState], this.stateImgFills[this.baseState].style, this.baseState);
	} 
 }
  
  this.objLyr.ele.style.cursor = 'default';
  
  this.onOut()
}

function ObjButtonChange(img, bResp , text, stateOpacity, imgFill, state) {
  
  var pagePlayer = getDisplayWindow().pagePlayer;
  this.currentState = state;
  
  text = (text ? text.replace('normalState','') : text); // normalState not specified in css class name 
  
  if (pagePlayer)
  {
      var pageName = pagePlayer.activePage.name.replace(".html","");
      if (imgFill && imgFill.indexOf('#Picture_') > -1 && imgFill.indexOf("_"+pageName) < 0)
      {
          console.log('catching page mismatch (LD-7091)');
          return;
      }
  }  
  
  if(typeof(bResp) == "undefined")
	  this.changeContFired = true;
  
  var opacity = null;
  
  if(typeof(stateOpacity) == 'undefined' || !stateOpacity)
	  opacity = this.stateOpacity.normalState;
  else
	  opacity = stateOpacity;
  
  if (this.objLyr && this.objLyr.objDiv) 
  {
	if(is.svg)
		this.objLyr.objDiv.style.opacity = opacity;
	else if(is.vml && opacity < 1)
		this.objLyr.objDiv.style.setAttribute("filter", 'alpha(opacity='+opacity*100+')');
	else if(is.vml && opacity == 1 && this.objLyr.objDiv.style.filter)
	{
		var strFilter = this.objLyr.objDiv.style.filter;
		var startIndex = strFilter.indexOf("alpha(opacity=");
		
		if(strFilter.length > 0 && startIndex != -1)
		{
			var endIndex = strFilter.indexOf(')', startIndex);

			if(endIndex != -1)
				this.objLyr.objDiv.style.filter = strFilter.substr(0, startIndex) + strFilter.substr(endIndex + 1, strFilter.length - endIndex);
		}
	}
  
	if(this.hasReflection && this.objLyr.reflectDiv)
		this.objLyr.reflectDiv.style.opacity = opacity;
  

	if(this.bUseSvgFile && is.svg)
	{
		var svgPath = getDisplayDocument().getElementById(this.name + 'path');
		if(svgPath)
			svgPath.style.cssText =  img;
		

		var divText = getDisplayDocument().getElementById( this.name + 'TextDiv' );
		var spanText = getDisplayDocument().getElementById( this.name + 'TextSpan' );

		if(divText)
			divText.className = text;

		if(spanText)
			spanText.className = text;


		var svgImgFill = getDisplayDocument().getElementById(this.name + 'imgF');
		if(svgImgFill){
			var idx = imgFill ? imgFill.indexOf("url") : -1;
			var imageFill = imgFill;
			if(idx >= 0){
				imageFill = imgFill.substring(idx);
			}
				
			svgImgFill.style.fill= imageFill.trim() ? imageFill : 'none';
		}
	}
	else if(this.hasOuterShadow && is.vml)
	{
		if(this.objLyr.shadowObj && this.objLyr.shadowProp)
		{
			this.objLyr.shadowObj.src = img;
			this.objLyr.shadowProp.src = img;
		}
	}
	else
	{
		if(!this.hasOuterShadow)
			this.objLyr.doc.images[this.name+"Img"].src = img;
		else if(this.objLyr.shadowObj)
			this.objLyr.shadowObj.setAttribute('xlink:href', img);
	}
  
	if(this.hasReflection && this.objLyr.reflectObj)
	{
		if(is.svg){
			
			if(!this.bUseSvgFile)
				this.objLyr.reflectObj.setAttribute('xlink:href', img);
			var paths = this.objLyr.reflectObj.getElementsByTagNameNS('http://www.w3.org/2000/svg', "path");
			
			for(var i = 0 ; i < paths.length ; i++){
				var style = paths[i].getAttribute("style");

				if(style){
					var startIdx = style.indexOf("fill:");
					var endIdx = style.indexOf(";", startIdx+1);

					var fill = startIdx >= 0 ? style.slice(startIdx, endIdx) : "";
					var newStyle = style;

					if(fill.length > 0 && (fill.indexOf("Picture") >= 0 || fill.indexOf("none")>=0) && 
					(this.bHasSvgImageFill || this.bHasSvgDisbaleImageFill || this.bHasSvgDownImageFill || this.bHasSvgOverImageFill))
						newStyle = style.slice(0, startIdx) + imgFill + style.slice(endIdx); 
					else if(fill.length > 0 && fill.indexOf("Text") == -1)
						newStyle = style.slice(0, startIdx) + img + style.slice(endIdx); 
					else if(fill.length > 0 && fill.indexOf("Text") >= 0)
						newStyle = style.slice(0, startIdx) + text + style.slice(endIdx); 

					paths[i].setAttribute('style', newStyle);
				}
			}
		}
		else if( is.vml)
			this.objLyr.reflectObj.src = img;
	}

	if (this.bDisabled)
	{
		if(this.objLyr.theObjTag)
		{
			this.objLyr.theObjTag.style.cursor = "default";
			this.objLyr.theObjTag.disabled = this.bDisabled;
		}
	}
	else
	{
		if(this.objLyr.theObjTag)
		{
			this.objLyr.theObjTag.disabled = this.bDisabled;
			this.objLyr.theObjTag.style.cursor = "";
		}

	}
  }
}

function ObjButtonWriteLayer( newContents ) {
  if (this.objLyr) this.objLyr.write( newContents )
}

function ObjButtonOnShow() {
  this.alreadyActioned = true;
  this.objLyr.actionShow();
  this.setDisabled( this.bDisabled ); //Disabled buttons shown on a delay were having the incorrect opacity
}

function ObjButtonOnHide() {
  this.alreadyActioned = true;
  this.objLyr.actionHide();
}

function ObjButtonIsVisible() {
  if( this.objLyr.isVisible() )
    return true;
  else
    return false;
}

function ObjInitRotateAngle(angle, vertFlip, horzFlip, boundsRectX, boundsRectY, adornerWidth, adornerHeight){
	this.r = angle;
	this.vf = vertFlip;
	this.hf = horzFlip;
	this.wrkAdornerHeight = adornerHeight;
	this.wrkAdornerWidth = adornerWidth;
	
	if(this.vf || this.hf)
		if(is.awesomium && angle ==0)
			this.r=360;
	
	if(adornerWidth == 0 || adornerHeight == 0)
	{
		this.boundsRectX = 0;
		this.boundsRectY = 0;
		this.adornerWidth = 0;
		this.adornerHeight = 0;
	}
	else
	{
		this.boundsRectX = boundsRectX;
		this.boundsRectY = boundsRectY;
		this.adornerWidth = adornerWidth;
		this.adornerHeight = adornerHeight;
	}
}

function ObjInitIe8Attr(divPosX, divPosY, divWidth, divHeight, additionalOffsetX, additionalOffsetY){
	this.ie8DivX = divPosX;
	this.ie8DivY = divPosY;
	this.ie8DivWidth = divWidth;
	this.ie8DivHeight = divHeight;
	this.ie8AddedOffsetX = additionalOffsetX;
	this.ie8AddedOffsetY = additionalOffsetY;
}

function ObjInitShadow(direction, depth, opacity, redHex, greenHex, blueHex, red, green, blue, blurRadius, shadowType){
		
	//For some reason, Chrome will not display the shadow on a flipped image with a rotate angle of zero unless we add 360 degrees to it. No idea why. 
	if(this.vf == 1 || this.hf == 1)
	{
		this.outerShadowDirection = (direction + this.r);
		this.r = this.r + 360;
	}
	if(this.hf != 1 && this.vf != 1)
	{	
		this.outerShadowDirection = direction + this.r;
	}
	
	//echo bug 21328: ie8 and ie9 shadows doesn't need any of these calculations
	this.originalShadowDirection = direction;
	
	this.outerShadowDepth = depth;
	this.originalOuterShadowDepth = this.outerShadowDepth;
	this.outerShadowOpacity = opacity;
	this.shadowRed = red;
	this.shadowGreen = green;
	this.shadowBlue = blue;
	
	if(redHex.length == 1)
		this.shadowRedHex = '0' + redHex;
	else
		this.shadowRedHex = redHex;
		
	if(greenHex.length == 1)
		this.shadowGreenHex = '0' + greenHex;
	else
		this.shadowGreenHex = greenHex;
	
	if(blueHex.length == 1)
		this.shadowBlueHex = '0' + blueHex;
	else
		this.shadowBlueHex = blueHex;
 	
	this.outerShadowBlurRadius = blurRadius;
	this.shadowType = shadowType; 
}

function ObjInitOpacity(opacity){
	this.opacity = this.opacityNorm = opacity;
}

function ObjInitHasShadow(boolVal){
	this.hasOuterShadow = boolVal;
	
	if(boolVal == 0)
	{
		this.outerShadowDirection = 0;
		this.outerShadowDepth = 0;
		this.originalOuterShadowDepth = 0;
		this.outerShadowOpacity = 0;
		this.shadowRed = 0;
		this.shadowGreen = 0;
		this.shadowBlue = 0;
		this.shadowRedHex = null;
		this.shadowGreenHex = null;
		this.shadowBlueHex = null;
		this.outerShadowBlurRadius = 0;
		this.shadowType = null; 
	}
}

function ObjInitReflection(x, y, width, height, offset, fadeRate, separation, ie8DivX, ie8DivY, ie8DivWidth, ie8DivHeight, ie8ImgX, ie8ImgY){
	this.reflectedImageX = x;
	this.reflectedImageY = y;
	this.reflectedImageWidth = width;
	this.reflectedImageHeight = height;
	this.reflectedImageOffset = offset;
	this.reflectedImageFadeRate = fadeRate;
	this.reflectionSeparation = separation;
	this.reflectionPosDiffY	= y-this.y;
	this.reflectionPosDiffX	= x-this.x;
	
	//Values used for ie8 and ie9
	this.ie8ReflectionDivX = ie8DivX;
	this.ie8ReflectionDivY = ie8DivY;
	this.ie8ReflectionDivWidth = ie8DivWidth;
	this.ie8ReflectionDivHeight = ie8DivHeight;
	this.ie8ReflectionImgX = ie8ImgX;
	this.ie8ReflectionImgY = ie8ImgY;
}

function ObjInitHasReflection(boolVal){
	
	if(boolVal == 0)
		this.hasReflection = false;
	else
		this.hasReflection = true;
	
	if(boolVal == 0)
	{
		this.reflectedImageX = 0;
		this.reflectedImageY = 0;
		this.reflectedImageWidth = 0;
		this.reflectedImageHeight = 0;
		this.reflectedImageOffset = 0;
		this.reflectedImageFadeRate = 0;
		this.reflectionSeparation = 0;
		this.reflectionPosDiffY	= 0;
		this.reflectionPosDiffX	= 0;
	}
}

function ObjSVGShadow(objWidth, objHeight, xOffset, yOffset, thisObj)
{
	var svgImageTag = '';
	
	svgImageTag = '<svg tabindex="-1" role="img" focusable="false" aria-label="" width="' + objWidth + 'px" height="' + objHeight + 'px"'
	
	if(xOffset < 0 || yOffset < 0)
	{
		if(xOffset < 0)
			svgImageTag += 'x = "' + (xOffset - thisObj.outerShadowBlurRadius) + '" '
		if(yOffset < 0)
			svgImageTag += 'y = "' + (yOffset - thisObj.outerShadowBlurRadius) + '" '
	}
	
	svgImageTag += '>\n'
	
	var mapOffsetX = 0;
	var mapOffsetY = 0;
	
	if(xOffset < 0 || yOffset < 0)
	{	
		svgImageTag += '<image name="'+thisObj.name+'Img" id="'+thisObj.name+'Img" xlink:href = "' + (!thisObj.bOffPage?thisObj.imgOffSrc:'') + '" preserveAspectRatio="none" ';
		
		svgImageTag += 'x = "';
		
		if(xOffset < 0)
		{
			xOffset = Math.abs(xOffset);
			mapOffsetX = xOffset + thisObj.outerShadowBlurRadius;
			svgImageTag += mapOffsetX + '" width = "' + thisObj.w + 'px"'
		}
		else svgImageTag += '0" width = "' + thisObj.w + 'px"'
		if(yOffset < 0)
		{
			yOffset = Math.abs(yOffset);
			mapOffsetY = yOffset + thisObj.outerShadowBlurRadius;
			svgImageTag += 'y = "' + mapOffsetY + '" height = "' + thisObj.h + 'px"'
		}
		else svgImageTag += 'y = "0" height = "' + thisObj.h + 'px"'		
		
		svgImageTag += 'filter="url(#'+ thisObj.filterid + 'Shadow)" />\n'
	}
	else
	{
		svgImageTag += '<image name="'+thisObj.name+'Img" id="'+thisObj.name+'Img" xlink:href = "' + (!thisObj.bOffPage?thisObj.imgOffSrc:'') + '" preserveAspectRatio="none" ';		
		svgImageTag += 'x = "0" y = "0" height = "' + thisObj.h + 'px" width = "' + thisObj.w + 'px" filter="url(#'+ thisObj.filterid + 'Shadow)"/>\n';
	}
	if(!thisObj.bUseSvgFile)
		svgImageTag += addSvgShadowFilter(thisObj.name, thisObj.w, thisObj.h, thisObj.outerShadowDirection, thisObj.outerShadowDepth, thisObj.outerShadowOpacity, thisObj.shadowRed, thisObj.shadowGreen, thisObj.shadowBlue, thisObj.outerShadowBlurRadius, thisObj.shadowType); 
	
	svgImageTag += '</svg>\n'
	
	//echo bug 21347 : Closing button tag to pair up with the button tag from the build function
	svgImageTag += '</button>\n'	
	
	return svgImageTag;
}

function ObjVMLShadow(xOffset, yOffset, blurRadius, thisObj)
{
	var vmlShadowTag = '';
	
	vmlShadowTag = '<v:image id="'+thisObj.name+'Img" src="' + thisObj.imgOffSrc + '" style="z-index:1; position:absolute;width:' + thisObj.w + 'px;height:' + thisObj.h + 'px;';
	
	var IERotation = '';
	
	if(thisObj.r > 0 || thisObj.vf == 1 || thisObj.hf == 1)
	{
		if(thisObj.vf == 1 || thisObj.hf == 1)
		{
			vmlShadowTag += 'filter:';
			if(thisObj.vf == 1)
			{
				IERotation += ' flipv';
			}
			
			if(thisObj.hf == 1)
			{
				IERotation += ' fliph';
			}
				
			IERotation += ';';
		}
			
		if(thisObj.r > 0 && is.ie8)
		{
			 var radians = thisObj.r * (Math.PI / 180.0);
			 var cosTheta = Math.cos(radians);
			 var sinTheta = Math.sin(radians);
			 if(IERotation.length > 1)
				IERotation = IERotation.substring(0, IERotation.length-1);
			IERotation += ' progid:DXImageTransform.Microsoft.Matrix(sizingMethod=\'auto expand\',M11='+cosTheta+', M12='+((-1)*sinTheta)+', M21='+sinTheta+', M22='+cosTheta+');'
		}
		if(thisObj.r > 0 && is.ie9)
		{
			IERotation += '-ms-transform:rotate('+ thisObj.r +'deg);'
		}
	}
	
	vmlShadowTag+= IERotation;
	
	vmlShadowTag += 'left: ' + ((thisObj.x - thisObj.ie8AddedOffsetX) - thisObj.ie8DivX) + 'px;'
	vmlShadowTag += 'top:' + ((thisObj.y - thisObj.ie8AddedOffsetY) - thisObj.ie8DivY) + 'px;">\n'	
	vmlShadowTag += '</v:image>\n'
	
	//echo bug 21347 : Closing button tag to pair up with the button tag from the build function
	vmlShadowTag += '</button>\n'	
	
	vmlShadowTag += '<v:image id="'+thisObj.name+'Shadow" src="' + thisObj.imgOffSrc + '" style="z-index:0; position:absolute;width:' + thisObj.w + 'px;height:' + thisObj.h + 'px;';
	
	//Correcting any offsets caused by the blurRadius and shadow offsets. 
	if(xOffset < 0)
		vmlShadowTag += 'left: ' + ((1*thisObj.x) - (1*thisObj.ie8DivX) + (1*xOffset) - blurRadius) + 'px;'
	else
		vmlShadowTag += 'left: ' + ((1*thisObj.x) - (1*thisObj.ie8DivX) - blurRadius) + 'px;'
	if(yOffset < 0)
		vmlShadowTag += 'top:' + ((1*thisObj.y) - (1*thisObj.ie8DivY) + (1*yOffset) - blurRadius) + 'px;'
	else
		vmlShadowTag += 'top:' + ((1*thisObj.y) - (1*thisObj.ie8DivY) - blurRadius) + 'px;'
	vmlShadowTag += 'filter:progid:DXImageTransform.Microsoft.Blur(makeShadow=True pixelRadius=' + blurRadius + ' shadowOpacity=' + thisObj.outerShadowOpacity + ')\n'
	vmlShadowTag += 'progid:DXImageTransform.Microsoft.DropShadow(OffX=' + xOffset + ' OffY=' + yOffset + ' color=#' + thisObj.shadowRedHex + thisObj.shadowGreenHex + thisObj.shadowBlueHex + ')'
	if(IERotation.length < 2)
		vmlShadowTag +=';"/>\n'
	else
	{
		vmlShadowTag += IERotation+'/>\n';
	}
	vmlShadowTag += '</v:image>\n'
	
	return vmlShadowTag;
}

function ObjInitImageMap(str, str2 )
{
	this.str_ImageMapCoords = str;
	this.str_SvgMapPath = str2;
}

function ObjLoadProps()
{
	if(is.jsonData != null)
	{
		//Set it back to the original
		this.outerShadowDepth = this.originalOuterShadowDepth;
		var respValues = is.jsonData[is.clientProp.device];
		var newValues;
		newValues = respValues[is.clientProp.width];
		var obj = newValues[this.name];
		if(obj)
		{
			this.x = typeof(obj.x)!="undefined"?obj.x:this.x;
			this.origX = typeof(obj.x)!="undefined"?obj.x:this.x;
			this.y = typeof(obj.y)!="undefined"?obj.y:this.y;
			this.w = (typeof(obj.w)!="undefined"?obj.w:this.w);
			this.h = (typeof(obj.h)!="undefined"?obj.h:this.h);
			this.bBottom = (typeof(obj.bOffBottom)!="undefined"?obj.bOffBottom:this.bBottom);
			
			this.B64 = typeof(obj.B64)!="undefined"?obj.B64:this.B64;
			this.rebuildDefs();
			
			this.str_SvgMapPath = typeof(obj.p)!="undefined"?obj.p:this.str_SvgMapPath;
			
			this.stylemods = typeof(obj.stylemods)!="undefined"?obj.stylemods:null;
			FindAndModifyObjCSSBulk(this, this.stylemods);

			if(!this.changeContFired)
			{
				this.imgOffSrc = typeof(obj.i)!="undefined"?obj.i:this.imgOffSrc;
				this.imgOnSrc = typeof(obj.ion)!="undefined"?obj.ion:this.imgOnSrc;
				this.imgDisabledSrc = typeof(obj.idis)!="undefined"?obj.idis:this.imgDisabledSrc;
				this.imgRollSrc = typeof(obj.irol)!="undefined"?obj.irol:this.imgRollSrc;
			}
			
			if(this.x > GetPageWidth() || ((this.x + this.w) < 0))
				this.bOffPage = true;
			else
				this.bOffPage = false;
			
		}
		obj.origY = obj.y;
		
	}
	
}

function ObjRespChanges()
{
	//TempObj is needed for the ModifySVGShadow && ModifyImageTag functions
	var tempObj = {xOffset:0, yOffset:0, width: this.w, height: this.h, xOuterOffset:0, yOuterOffset:0};

	AdjustAttributesForEffects(this, tempObj);
  
	ModifyImageTag(this, tempObj, true);
  
	if(this.hasOuterShadow)
		ModifySVGShadow(this, tempObj);
	  
	if(this.hasReflection)
		ModifyReflection(this);
	
	if(!this.bOffPage)
	{
		if(!is.svg || !this.bUseSvgFile)
		{
		 	if(this.bDisabled)
				this.change(this.imgDisabledSrc, true, null, this.stateOpacity.disabledState, null, "disabledState");
			else
				this.change(this.imgOffSrc, true, null, this.stateOpacity.normalState, null, "normalState");
		}
		else
		{
			if(this.bDisabled)
				this.change(this.stateFills['disabledState'].stylePath, false , this.name+"disabledState"+"Text", this.stateOpacity.disabledState, this.str_SvgDisabImgFills, "disabledState")
			else if (this.currentState != "normalState" )
				this.change(this.stateFills[this.currentState].stylePath, false , this.name+this.currentState+"Text", this.stateOpacity[this.currentState], this.stateImgFills[this.currentState].style, this.currentState);
			else
			{
				this.change(this.stateFills[this.baseState].stylePath, false , this.name+this.baseState+"Text", this.stateOpacity[this.baseState], this.stateImgFills[this.baseState].style, this.baseState);
			} 
		}
	}
	
	
	this.updateFillSize();
			
	//Adjust the CSS
	FindAndModifyObjCSSBulk(this, this.stylemods);
}

function ObjSetFillStyle(style){
	this.fillStyle = style;
}

function ObjButtonUseSvgFile (val){
		this.bUseSvgFile = val;
}

function ObjButtonValidSource()
{
	if(this.bOffPage && !this.bUseSvgFile)
	{
		this.bOffPage = false;
		if(this.bDisabled)
			this.change(this.imgDisabledSrc, true, null, this.stateOpacity.disabledState, null, "disabledState");
		else
			this.change(this.imgOffSrc, true, null, this.stateOpacity.normalState, null, "normalState");
	}
}

function ObjButtonSetTextValues( stateTextValues )
{
	// custStates
	this.stateTextValues = stateTextValues; // used in trivantis.js
	
}

function ObjButtonImageFillVal( stateImgFills   )
{
	// custStates
	this.stateImgFills = stateImgFills;
}

function ObjButtonRefresh(){
	if(this.bInherited)
	{
		//If it is an inherited object the DIV might not reflect the correct dom element
		if(!this.div.parentElement)
			this.div = getHTMLEleByID(this.name);
		
		this.setupObjLayer();
		if( this.v ) this.actionShow()
	}
}

function ObjButtonGetCSS(){
	var css = '';
	var rotateCSS = '';
	var opacityCSS = '';
	var bHasEffects = (this.hasOuterShadow|| this.hasReflection);
	
	var adjustedXPos = this.x;
	var adjustedYPos = this.y;
	var adjustedWidth = this.w + (is.firefox?2:0);
	var adjustedHeight = this.h + (is.firefox?2:0);

	var radians = this.outerShadowDirection * (Math.PI / 180.0);
	var xOffset = this.outerShadowDepth * Math.cos(radians);
	//Multiply by -1 because a negative offset means this shadow is in the positive y-direction on the screen
	var yOffset = -1 * this.outerShadowDepth * Math.sin(radians);
	
	if(is.vml && this.bCanRotate && !is.ie8)
	{
		adjustedXPos = this.ie8DivX;
		adjustedYPos = this.ie8DivY;	
		adjustedWidth = this.ie8DivWidth;
		adjustedHeight = this.ie8DivHeight;
	}

	if(this.hasOuterShadow && is.svg)
	{
		adjustedWidth = this.w + (1 * Math.abs(xOffset)) + this.outerShadowBlurRadius;
		adjustedHeight = this.h + (1 * Math.abs(yOffset)) + this.outerShadowBlurRadius;

		if(xOffset < 0 && is.svg)
		{	
			adjustedXPos = this.x  + (1 * (xOffset - this.outerShadowBlurRadius)) + ((xOffset<0 && yOffset<0)?1:0); //There is a 1 pixel rounding error for offset in both directions
		}
		if(yOffset < 0 && is.svg)
		{	
			adjustedYPos = this.y + (1 * (yOffset - this.outerShadowBlurRadius));
		}
		adjustedXPos = adjustedXPos - 2;
	}
  
	if(!this.name.indexOf("button")>-1)
		adjustedWidth +=3;
	
	
	if(!is.vml && (this.r > 0 || this.vf == 1 || this.hf == 1))
	{
		var vF = (!this.bUseSvgFile)?0:this.vf;
		var hF = (!this.bUseSvgFile)?0:this.hf;
		rotateCSS = addRotateCSS(this.r, this.hasOuterShadow, this.w, this.h, this.x, this.y, this.outerShadowDirection, this.outerShadowDepth, this.outerShadowBlurRadius, 
		vF, hF, this.boundsRectX, this.boundsRectY, this.wrkAdornerWidth, this.wrkAdornerHeight);
	}
	
	if(this.opacity >= 0 && this.opacity < 100)
		opacityCSS = addOpacityCSS(this.opacity);
	
	var clipRect = '';
	if(is.svg)
	{
		if( this.hasOuterShadow && this.outerShadowDepth == 0 )
		  clipRect = 'clip: rect(0px ' + (adjustedWidth  + (2*this.outerShadowBlurRadius) + (1 * Math.abs(xOffset))) + 'px ' + (adjustedHeight  + (2*this.outerShadowBlurRadius) + (1 * Math.abs(yOffset))) + 'px 0px);';
		else if( this.hasOuterShadow )
		  clipRect = 'clip: rect(0px ' + (adjustedWidth  + this.outerShadowBlurRadius + (1 * Math.abs(xOffset))) + 'px ' + (adjustedHeight  + this.outerShadowBlurRadius + (1 * Math.abs(yOffset))) + 'px 0px);';
		else
		  clipRect = 'clip: rect(0px ' + (adjustedWidth + (1 * Math.abs(xOffset))) + 'px ' + (adjustedHeight + (1 * Math.abs(yOffset))) + 'px 0px);';
	}
	if(is.vml)
	{
		if(this.hasOuterShadow)
		{
			if(xOffset <= 0 && yOffset >= 0)
				clipRect = 'clip: rect(' + (-1 * this.outerShadowBlurRadius) + 'px ' + (adjustedWidth + this.outerShadowBlurRadius + (1 * Math.abs(xOffset))) + 'px ' + (adjustedHeight + this.outerShadowBlurRadius + (1 * Math.abs(yOffset))) + 'px ' + (xOffset - this.outerShadowBlurRadius) + 'px);';
			else if(xOffset >= 0 && yOffset <= 0)
				clipRect = 'clip: rect(' + (yOffset - this.outerShadowBlurRadius) + 'px ' + (adjustedWidth + this.outerShadowBlurRadius + (1 * Math.abs(xOffset))) + 'px ' + (adjustedHeight + this.outerShadowBlurRadius + (1 * Math.abs(yOffset))) + 'px ' + (-1 * this.outerShadowBlurRadius) + 'px);';
			else if(xOffset <= 0 && yOffset <= 0)
				clipRect = 'clip: rect(' + (yOffset - this.outerShadowBlurRadius) + 'px ' + (adjustedWidth + this.outerShadowBlurRadius + (1 * Math.abs(xOffset))) + 'px ' + (adjustedHeight + this.outerShadowBlurRadius + (1 * Math.abs(yOffset))) + 'px ' + (xOffset - this.outerShadowBlurRadius) + 'px);';
			else 
				clipRect = 'clip: rect(' + (-1 * this.outerShadowBlurRadius) + 'px ' + (adjustedWidth + this.outerShadowBlurRadius + (1 * Math.abs(xOffset))) + 'px ' + (adjustedHeight + this.outerShadowBlurRadius + (1 * Math.abs(yOffset))) + 'px ' + (-1 * this.outerShadowBlurRadius) + 'px);';
		}
	}
	
	css = buildCSS(this.name,this.bFixedPosition,adjustedXPos,adjustedYPos,adjustedWidth,adjustedHeight,this.v,this.z, null, clipRect);
	
	if(rotateCSS != '')
	{
		var tempStr = css.substring(0, css.length-2);
		tempStr += rotateCSS;
		tempStr += '}\n';
		css = tempStr;
	}
	
	if(opacityCSS != '')
	{
		var tempStr = css.substring(0, css.length-2);
		tempStr += opacityCSS;
		tempStr += '}\n';
		css = tempStr;
	}
	
	css += '#' + this.name+'btn{z-index:1;';
  
	if(!is.ie8) 
		css += ' position:absolute;padding:0;border:none;background:none;';
	else		  
		css += ' padding:0;border:none;background:none;';
		
	if(!this.bHasClickMap)
		css += 'cursor:pointer;'
	if(!is.ie9)
		css += 'width: 100%; height: 100%;'; 
	css += '}\n';
	  
	if(!this.hasOuterShadow && (!is.svg || !this.bUseSvgFile))
	{
		css += '#' + this.name + 'Img{'
		css += getDisplayDocument().documentMode < 8 ? 'position:absolute;' : ''
		css += 'width:'+this.w+'px;height:'+this.h +'px;}\n';
	}
	
	return css;	
}

function ObjButtonSetupObjLayer(){
	if( this.bEmbeddedImg )
		this.objLyr.ele.style.display = "inline-block";

	if(this.objLyr.ele && this.objLyr.ele.id !=(this.name+"MapArea"))
		this.objLyr.theObjTag = getChildNodeByID(this.objLyr.ele, this.name+"btn");
	else
	{
		this.objLyr.ele = getHTMLEleByID(this.name);
		this.objLyr.theObjTag = getChildNodeByID(this.objLyr.ele, this.name+"btn");
	}
	
	this.objLyr.theObj = this;
	this.objLyr.objDiv = getChildNodeByID(this.objLyr.ele, this.name);

	if(this.hasOuterShadow)
	{
		this.objLyr.shadowObj = getChildNodeByID(this.objLyr.ele, this.name+"Img");
		this.objLyr.shadowProp = getHTMLEleByID(this.name+"Shadow");
	}
	 
	
	if(this.objLyr.ele != null && is.svg && this.bHasClickMap)
	this.objLyr.ele = this.objLyr.event = getChildNodeByID(this.objLyr.ele, this.name+"MapArea");

	if( !is.iOS )//bug11459 bug21967
	{
		if( !(is.ie8 || is.ie9) ) //21165 double firing actions
			this.objLyr.ele.onUp = new Function(this.obj+".onUp(); return false;")
		this.objLyr.ele.onmouseout = new Function(this.obj+".out(); return false;")
		this.objLyr.ele.onmousedown = new Function("event", this.obj+".down(event); return false;")
		this.objLyr.ele.onmouseover = new Function(this.obj+".over(); return false;")

		//echo bug 22100 : If WCAG is enabled, then the button tag's onClick attribute handles the call to the up function. 
		if( !(is.ie8 || is.ie9) && this.bHasClickMap) //21165 double firing actions
			this.objLyr.ele.onmouseup = new Function("event", this.obj+".up(event); return false;")

		//echo bug 21644
		var THIS = this;

		//echo bug 22100: Changed the condition from is.bSupportsClickMap to this.bHasClickMap because the event listener should not be added if WCAG is enabled.
		if (this.bHasClickMap)
		{
			this.objLyr.theObjTag.addEventListener("keypress", function(e){
				if(THIS.hasAct && THIS.hasOnUp && (e.keyCode == 13 || e.keyCode == 32)) 
					THIS.onUp(); 
				return false;}, true);
		}
	}

	
	if(this.hasReflection)
	{
		this.objLyr.reflectDiv = getHTMLEleByID(this.name+"ReflectionDiv");
		if(!this.bUseSvgFile)
			this.objLyr.reflectObj = getChildNodeByID(this.objLyr.reflectDiv, this.name+"Reflection");
		else
			this.objLyr.reflectObj = getHTMLEleByID(this.name+"ReflectionSVG");
	}
}

function ObjButtonRebuildDefs()
{
	if( typeof (this.btnStates) !== "undefined")
	{
		for (var i=0;i < this.btnStates.length;i++)
		{
			var btnState = this.btnStates[i];
			var stateImgFill = this.stateImgFills[btnState];
			if (stateImgFill.hasFill === undefined)
				stateImgFill.hasFill = !!(stateImgFill.fill.trim()); // set boolean 
			
			if(!stateImgFill.hasFill && stateImgFill.B64 && this.stateFills[btnState].stylePath.indexOf("nonzero")==-1)
			{
				this.str_SvgStyle = "<pattern id=\"Picture_" + this.fuID + (btnState=='normalState'?'':'_'+btnState)+"\" x=\"0\" y=\"0\" width=\"" + this.w + "\" height=\""+ this.h +  "\" patternUnits=\"userSpaceOnUse\">\n";
				this.str_SvgStyle += "<image xlink:href=\""+ stateImgFill.B64 + "\" x=\"0\" y=\"0\" width=\"" + this.w + "\" height=\""+this.h +  "\" preserveAspectRatio=\"none\">\n";
				this.str_SvgStyle += "</pattern>\n";
			}
		}
	}
	
}
function ObjButtonGetPreloadString()
{
	var strPreloads = "";
	if ( !is.svg || !this.bUseSvgFile )
	{
		strPreloads = "'" + this.imgSrc + "'";
		if ( this.imgOnSrc.length )
			strPreloads += ",'" + this.imgOnSrc + "'";
		if ( this.imgRollSrc.length )
			strPreloads += ",'" + this.imgRollSrc + "'";
		if ( this.imgDisabledSrc.length )
			strPreloads += ",'" + this.imgDisabledSrc + "'";
	}
	return strPreloads;
}

function ObjButtonRV(){
	//Always set it back to enabled and let the refresh sort it out
	this.setDisabled(false)
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

function ObjButtonSetID(uID){
	this.fuID = uID;
}

function ObjInitLineWeight(lineWeight){
	this.lineWeight = lineWeight;
}
