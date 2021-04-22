/**************************************************
Trivantis (http://www.trivantis.com)
**************************************************/

var ocmOrig = getDisplayDocument().oncontextmenu
var ocmNone = new Function( "return false" )

// Image Object
function ObjImage(n,i,a,x,y,w,h,v,z,d,t,fb, cl) {
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
  this.hasOnUp = false
  this.hasOnRUp = false
  this.isChoice = false
  this.obj = this.name+"Object"
  this.alreadyActioned = false;
  eval(this.obj+"=this")
  this.imgSrc = i
  this.imgOrig = i;
  if ( d!=null && d!="undefined" )
    this.divTag = d;
  else  
    this.divTag = "div";
  this.addClasses = cl;
  this.changeContFired = false;
  this.bUseSvgFile = false;
  this.t = t;
  this.bOffPage = false;
  this.bFixedPosition = false;
  this.bBottom = fb?true:false;
  //echo bug 21564
  this.bEmbeddedImg = this.x == null ? true : false;
  this.bInherited = false;
  this.imgCP = '';
  this.imgIP = '';
  this.imgNS = '';
  this.filterid = isSinglePagePlayerAvail() ? window.trivPlayer.activePage.nameNoEx + '_' + this.name : this.name;
  this.bHasSvgImageFill = false;
  this.bDontAdjust = false;
}

function ObjImageActionGoTo( destURL, destFrame ) {
  this.objLyr.actionGoTo( destURL, destFrame );
}

function ObjImageActionGoToNewWindow( destURL, name, props ) {
  this.objLyr.actionGoToNewWindow( destURL, name, props );
}

function ObjImageActionPlay( ) {
  this.objLyr.actionPlay();
}

function ObjImageActionStop( ) {
  this.objLyr.actionStop();
}

function ObjImageActionShow(bFromActivate) {
  if( !this.isVisible() )
    this.onShow(bFromActivate);
}

function ObjImageActionHide( ) {
  if( this.isVisible() )
    this.onHide();
}

function ObjImageActionLaunch( ) {
  this.objLyr.actionLaunch();
}

function ObjImageActionExit( ) {
  this.objLyr.actionExit();
}

function ObjImageActionChangeContents( newImage, newOpacity, bResp ) {
  
  if(typeof(bResp) == "undefined")
	  this.changeContFired = true;
  
  this.imgSrc = newImage;
  //ie6 deals with transparent png's differently.
  if(this.objLyr)
  {
	  if(is.ie6)
	  {
		if(this.imgSrc.indexOf('.png') == this.imgSrc.length-4){
		  this.objLyr.styObj.filter = "";
		  this.objLyr.doc.images[this.name+"Img"].style.filter = "";
		}
		if(newImage.indexOf('.png') == newImage.length-4){
		  this.objLyr.doc.images[this.name+"Img"].style.filter =  "progid:DXImageTransform.Microsoft.Alpha(opacity=0)";
		  this.objLyr.styObj.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+newImage+"',sizingMethod='scale')";
		}
	  }
	  
	  if ( newOpacity!=null && !isNaN(newOpacity) )
	  {
		  if ( (newOpacity%1==0) && newOpacity>1 && newOpacity<=100 )
			newOpacity /= 100;
		  if ( newOpacity>=0.0 && newOpacity<=1.0 )
		  {
			  if( this.bEmbeddedImg && (!is.vml && !is.svg) )
				this.objLyr.doc.images[this.name+"Img"].style.opacity = newOpacity;
			  else
				this.objLyr.styObj.opacity = newOpacity;
			  if(this.hasReflection)
				 this.objLyr.reflectDiv.style.opacity = newOpacity;
		  }
	  }
	  if(this.objLyr)
	  {
		  if( UseHtmlImgTag(this) && (!this.bUseSvgFile || is.ie9))
		  {
			  if(this.objLyr.theObjTag)
				this.objLyr.theObjTag.src = newImage;
		  }
		  else if (is.svg && !this.bUseSvgFile)
		  {
			  if(this.hasOuterShadow)
			  {
				  if(this.objLyr.shadowObj)
					this.objLyr.shadowObj.setAttribute('xlink:href', newImage);
			  }
			  else
			  {
				  if(this.objLyr.theObjTag)
					  this.objLyr.theObjTag.setAttribute('xlink:href', newImage);
			  }
		  }
		  else if(is.vml)
		  {
			this.objLyr.shadowObj.src = newImage;
			this.objLyr.shadowProp.src = newImage;
		  }
		  
		  if(this.hasReflection && is.svg)
		  {
			if(this.objLyr.reflectObj)
				this.objLyr.reflectObj.setAttribute('xlink:href', newImage);
		  }
		  else if(this.hasReflection && is.vml)
		  {
			this.objLyr.reflectObj.src = newImage;
		  }
		  
		  if(this.ind && this.altName)
		  {
				if(UseHtmlImgTag(this) || !this.hasOuterShadow)
				{
					if(this.objLyr.theObjTag)
					{
						if(this.status == "notstarted")
						{
							this.objLyr.theObjTag.alt = this.altName+"-Not Started";
							this.objLyr.theObjTag.parentNode.title = this.altName+"-Not Started";
							this.objLyr.theObjTag.setAttribute('aria-label', this.altName+" Not Started");
						}
						else if(this.status == 'inprogress' )
						{
							this.objLyr.theObjTag.alt = this.altName+"-In Progress";
							this.objLyr.theObjTag.parentNode.title = this.altName+"-In Progress";
							this.objLyr.theObjTag.setAttribute('aria-label', this.altName+" In Progress");
						}
						else
						{
							this.objLyr.theObjTag.alt = this.altName+"-Completed";
							this.objLyr.theObjTag.parentNode.title = this.altName+"-Completed";
							this.objLyr.theObjTag.setAttribute('aria-label', this.altName+" Completed");
						}
					}

				}
				else
				{
					if(this.status == "notstarted")
					{
						this.objLyr.shadowObj.setAttribute('alt', this.altName+"-Not Started");
						this.objLyr.shadowObj.parentNode.parentNode.title = this.altName+"-Not Started";
						this.objLyr.shadowObj.setAttribute('aria-label', this.altName+" Not Started");
					}
					else if(this.status == 'inprogress' )
					{
						this.objLyr.shadowObj.setAttribute('alt', this.altName+"-In Progress");
						this.objLyr.shadowObj.parentNode.parentNode.title = this.altName+"-In Progress";
						this.objLyr.shadowObj.setAttribute('aria-label', this.altName+" In Progress");
					}
					else
					{
						this.objLyr.shadowObj.setAttribute('alt', this.altName+"-Completed");
						this.objLyr.shadowObj.parentNode.parentNode.title = this.altName+"-Completed";
						this.objLyr.shadowObj.setAttribute('aria-label', this.altName+" Completed");
					}
				}
		  }
	  }
  }
}

function ObjImageActionTogglePlay( ) {
  this.objLyr.actionTogglePlay();
}

function ObjImageActionToggleShow( ) {
  if(this.objLyr.isVisible() && !this.objLyr.bInTrans) this.actionHide();
  else this.actionShow();
}

function ObjImageSizeTo( w, h, bResp ){
	var tempObj = {xOffset:0, yOffset:0, width: w, height: h, xOuterOffset:0, yOuterOffset:0};
		
	if(this.bUseSvgFile)
	  AddSVGViewBox(this);	
		
	AdjustAttributesForEffects(this, tempObj);
	
	ModifyImageTag(this, tempObj, bResp);
	
	if(this.hasOuterShadow)
		ModifySVGShadow(this, tempObj);
    
	if(this.hasReflection)
		ModifyReflection(this, tempObj);
	
	if(this.objLyr)
	{
		if(typeof(bResp) == "undefined")
			this.objLyr.clipTo(((tempObj.yOffset<0)?tempObj.yOffset:0), tempObj.width, tempObj.height, ((tempObj.xOffset<0)?tempObj.xOffset:0));
	}
}

function ObjSetAsIndicator(imgNS,imgIP,dir)
{
	if (!dir) dir = ''
    this.ind = true;
	this.imgCP = this.imgSrc;
    this.imgIP = imgIP?dir+imgIP:''
    this.imgNS = imgNS?dir+imgNS:''
}

function ObjSetAsButton(imgDn,imgOvr,imgDis,dir)
{
	if (!dir) dir = ''
    this.bIsBtn = true;
    this.imgDn = imgDn?dir+imgDn:''
    this.imgOvr = imgOvr?dir+imgOvr:''
	this.imgDisabledSrc = imgDis?dir+imgDis:''
}

function ObjSetImages(imgSrc,imgAlt1,imgAlt2,dir)
{
	if (!dir) dir = ''
	this.imgSrc = imgSrc?dir+imgSrc:''
	if ( this.ind )
	{
		this.imgCP = imgSrc?dir+imgSrc:'';
		this.imgIP = imgAlt1?dir+imgAlt1:''
		this.imgNS = imgAlt2?dir+imgAlt2:''
	}
	else if ( this.bIsBtn )
	{
		this.imgDn = imgAlt1?dir+imgAlt1:''
		this.imgOvr = imgAlt2?dir+imgAlt2:''
	}
}

function ObjUpdateIndicator(status)
{
	this.status = status;
	if( status == 'notstarted' )
	  this.actionChangeContents(this.imgNS, null, false);
	else if( status == 'inprogress' )
	  this.actionChangeContents(this.imgIP, null, false);
	else
	  this.actionChangeContents(this.imgCP, null, false);
 }

{ // Setup prototypes
var p=ObjImage.prototype
p.build = ObjImageBuild
p.buildSvg = ObjImageBuildSvg
p.buildShpSvg = ObjShapeBuildSvg
p.buildVml = ObjImageBuildVml
p.init = ObjImageInit
p.activate = ObjImageActivate
p.up = ObjImageUp
p.down = ObjImageDown
p.over = ObjImageOver
p.out = ObjImageOut
p.capture = 0
p.onOver = new Function()
p.onOut = new Function()
p.onSelect = new Function()
p.onDown = new Function()
p.onUp = new Function()
p.onRUp = new Function()
p.actionGoTo = ObjImageActionGoTo
p.actionGoToNewWindow = ObjImageActionGoToNewWindow
p.actionPlay = ObjImageActionPlay
p.actionStop = ObjImageActionStop
p.actionShow = ObjImageActionShow
p.actionHide = ObjImageActionHide
p.actionLaunch = ObjImageActionLaunch
p.actionExit = ObjImageActionExit
p.actionChangeContents = ObjImageActionChangeContents
p.actionTogglePlay = ObjImageActionTogglePlay
p.actionToggleShow = ObjImageActionToggleShow
p.writeLayer = ObjImageWriteLayer
p.onShow = ObjImageOnShow
p.onHide = ObjImageOnHide
p.isVisible = ObjImageIsVisible
p.setUseSvgFile = ObjImageUseSvgFile
p.getPreloadString = ObjImageGetPreloadString
p.sizeTo = ObjImageSizeTo
p.onSelChg = new Function()
p.setAsIndicator = ObjSetAsIndicator
p.setAsButton = ObjSetAsButton
p.setImages = ObjSetImages
p.updateIndicator = ObjUpdateIndicator
p.addShadow = ObjInitShadow
p.addOpacity = ObjInitOpacity
p.addIe8Attr = ObjInitIe8Attr
p.addBorder = ObjInitBorder
p.initRotateAngle = ObjInitRotateAngle
p.initHasShadow = ObjInitHasShadow
p.initHasReflection = ObjInitHasReflection
p.initReflection = ObjInitReflection
p.setDisabled = ObjSetDisabled
p.setButtonOpacity = ObjSetButtonOpacity
p.initImageMap = ObjInitImageMap
p.loadProps = ObjLoadProps
p.respChanges = ObjRespChanges
p.validateSrc = ObjImageValidSource
p.setTextVal = ObjShapeSetTextVal
p.setImgFillVal = ObjShapeImageFillVal
p.buildText = ObjImageBuildText
p.buildSpanText = ObjShapeBuildSpanText
p.buildSvgImgFill = ObjImageBuildSvgImgFill
p.refresh = ObjImageRefresh
p.getCSS  = ObjImageGetCSS
p.setupObjLayer = ObjImageSetupObjLayer
p.rv = ObjImageRV
p.setUniqueFillID = ObjImageSetID
p.isImage = ObjImageIsImage
p.initLineWeight = ObjShapeInitLineWeight

p.updateFillSize = function (){
	if( is.svg && this.str_SvgMapPath )
	{
		//calculate the proper fill sizes.
		var tempDiv = getDisplayDocument().createElement( 'DIV' );
		getDisplayDocument().body.appendChild( tempDiv );
		tempDiv.innerHTML = '<svg><g><path d="' + this.str_SvgMapPath + '"></path></g></svg>';
		this.pathBBox = tempDiv.getElementsByTagNameNS('http://www.w3.org/2000/svg','path')[0].getBBox();
		tempDiv.parentNode.removeChild(tempDiv);
	
		var adjustPictureFill = getDisplayDocument().getElementById ("Picture_"+this.fuID);
		if(adjustPictureFill)
		{
			var shapePath =  getDisplayDocument().getElementById(this.name + "path");
			if(!shapePath.style.fillRule)		
			{
					var adjustBy = this.bDontAdjust ? parseInt(this.lineWeight == 1 ? this.lineWeight * 2 : this.lineWeight   ) : 0; 

					adjustPictureFill.setAttribute('width' , this.pathBBox.width + adjustBy);
					adjustPictureFill.setAttribute('height' , this.pathBBox.height + adjustBy);
					adjustPictureFill.querySelector('image').setAttribute('width' , this.pathBBox.width + adjustBy);
					adjustPictureFill.querySelector('image').setAttribute('height' , this.pathBBox.height + adjustBy);
					adjustPictureFill.querySelector('image').setAttribute('x' , this.bDontAdjust ? 0 : this.lineWeight / 2);
					adjustPictureFill.querySelector('image').setAttribute('y' , this.bDontAdjust ? 0 : this.lineWeight / 2);
					if(this.str_SvgB64Img)
					{
						adjustPictureFill.querySelector('image').setAttributeNS('http://www.w3.org/1999/xlink','href',this.str_SvgB64Img);
					}
			}
		}
	}
};

}

function ObjImageRefresh(){
	//Resolve the objlayer for inherited objects
	if(this.bInherited)
	{
		//If it is an inherited object the DIV might not reflect the correct dom element
		if(!this.div.parentElement)
			this.div = getHTMLEleByID(this.name);
		
		this.setupObjLayer();
		if( this.v ) this.actionShow()
	}
}

function ObjImageBuild() {
	ObjDegradeEffects(this , false);	//echo LD-768 : Check if we need to gracefully degrade effects

	this.loadProps();
	
	if( this.bIsBtn ) this.capture |= 3;
		
	this.bIsWCAG = is.bWCAG;
  
	if((!this.hasOnUp && !this.isChoice) || is.iOS || this.bIsWCAG)
		this.bHasClickMap = false;
		
	if(!this.bUseSvgFile)
		AdjustClickPointsForAct(this, true);
	
	this.css = this.getCSS();
	
	this.bInherited = checkObjectInheritance(this);
	
	if(this.bInherited)
		return;
	
	this.div = '';
	var altTag = '';
	if( this.altName && !this.bUseSvgFile) altTag = ' title="'+'" alt="'+'"'
	else if( this.altName && this.bUseSvgFile && !is.firefox) altTag = ' title="'+'" alt="'+'"'
	else if( this.altName && this.bUseSvgFile && is.firefox) altTag = ' title="'+this.altName+'" alt="'+'"'
	else if( this.altName != null )	altTag = ' title="" alt=""'
	this.div += '<' + this.divTag + ' id="'+this.name+'" '+altTag+''

	if( this.addClasses ) this.div += ' class="'+this.addClasses+'"'
	if(this.altName)	this.div += 'aria-live="polite"'; // aria -live for shapes
	this.div += '></' + this.divTag +'>\n'
	this.divInt = "";
	
	if(this.hasOnUp){
		this.divInt += '<a name="'+this.name+'anc" id="' + this.name + 'anc"'
		getHasOnUpHref(this);
		this.divInt += '>'
	}
	
	if( UseHtmlImgTag(this) && ( !this.bUseSvgFile || is.ie9) || (!is.svg && !this.bUseSvgFile) ){
	
		this.divInt += '<img name="'+this.name+'Img" id="'+this.name+'Img" src="'+(!this.bOffPage?this.imgSrc:'')+'"'
		if(this.altName) this.divInt += ' alt="'+this.altName +'"'
		else if( this.altName != null ) this.divInt += ' alt=""'
		if( this.bHasClickMap ) this.divInt += ' usemap="#' + this.name + 'Map"'
		var addStyle = ''
		if(this.isChoice) addStyle += 'cursor:pointer;'
		if( this.x != null) addStyle += 'position:absolute; z-index:1;'
		if( is.ie8 ) addStyle += 'filter:inherit; clip:inherit;'
		if( addStyle != '') this.divInt += ' style="' + addStyle + '"'
		this.divInt += ' border=0>'
			  
		if( this.bHasClickMap)
		{
			this.divInt += addImageMap(this);
			this.bSVGMap = false;
		}
			
		
		this.divInt += this.hasOnUp ? '</a>' : ""; 	
	}
	else if( is.vml ){
		this.buildVml();
	}
	else if( is.svg && !this.bUseSvgFile){
		this.buildSvg();
	}
	else if( is.svg && this.bUseSvgFile){
		this.bSVGMap = true;
		this.buildShpSvg();
		
	}
	
	this.div = CreateHTMLElementFromString(this.div);
	
}

function getHasOnUpHref(THIS){
	if((is.iOS || THIS.bIsWCAG) && !is.ie) THIS.divInt += ' href="javascript:' + THIS.name + 'Object.up()"';
	else if(THIS.bIsWCAG && THIS.altName != "") THIS.divInt += ' href="javascript:void(null)" style="cursor:default;"';
	else if(is.ie) THIS.divInt += UseHtmlImgTag(THIS)?' href="javascript:' + THIS.name + 'Object.onUp(null)"':'';
}

function ObjImageBuildSvg(){
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

	var clipRect = '';
  
	if(this.hasOuterShadow)
	{
		adjustedWidth = this.w + (1 * Math.abs(xOffset)) + (2 * this.borderWeight) + this.outerShadowBlurRadius;
		adjustedHeight = this.h + (1 * Math.abs(yOffset)) + (2 * this.borderWeight) + this.outerShadowBlurRadius; 
			
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
		this.divReflect = addReflection(this.name, (!this.bOffPage?this.imgSrc:''), this.reflectedImageX, this.reflectedImageY, this.reflectedImageWidth, 
										this.reflectedImageHeight, this.r, this.reflectedImageOffset, this.reflectedImageFadeRate, this.v, this.vf, this.hf, 
										this.boundsRectX, this.boundsRectY, this.wrkAdornerWidth, this.wrkAdornerHeight, zIndex, 
										this.ie8ReflectionDivX, this.ie8ReflectionDivY, this.ie8ReflectionDivWidth, this.ie8ReflectionDivHeight, 
										this.ie8ReflectionImgX, this.ie8ReflectionImgY, this.bUseSvgFile, this.bFixedPosition);
	}
	
	if(this.hasOuterShadow)
	{
		
		this.divInt += '<svg tabindex="-1" focusable="false" aria-label="" width="' + adjustedWidth + 'px" height="' + adjustedHeight + 'px"'
		
		this.divInt += addSvgShadowFilter(this.name, this.w, this.h, this.outerShadowDirection, this.outerShadowDepth, this.outerShadowOpacity, this.shadowRed, this.shadowGreen, this.shadowBlue, this.outerShadowBlurRadius, this.shadowType); 
		
		if(xOffset <= 0 || yOffset <= 0)
		{
			if(xOffset <= 0)
				this.divInt += 'x = "' + (xOffset - this.outerShadowBlurRadius) + '" '
			if(yOffset <= 0)
				this.divInt += 'y = "' + (yOffset - this.outerShadowBlurRadius) + '" '
		}
		
		this.divInt += '>\n'
		
		var mapOffsetX = 0;
		var mapOffsetY = 0;
		
		if(xOffset <= 0 || yOffset <= 0)
		{	
			this.divInt += '<image name="'+this.name+'Img" id="'+this.name+'Img" xlink:href = "' + (!this.bOffPage?this.imgSrc:'') + '" preserveAspectRatio="none"';
			
			if(this.altName) 
				this.divInt += ' alt="'+this.altName+'" aria-label="'+this.altName+'"';
			else if( this.altName != null ) 
				this.divInt += ' alt="" ';
			
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
			
			this.divInt += 'filter="url(#'+ this.filterid + 'Shadow)"' 
			
			if( !this.bHasClickMap )
				this.divInt += 'style="cursor:default;"'
			
			this.divInt += '/>\n'
		}
		else
		{
			this.divInt += '<image name="'+this.name+'Img" id="'+this.name+'Img" xlink:href = "' + (!this.bOffPage?this.imgSrc:'') + '" preserveAspectRatio="none"';
			
			if( this.altName ) 
				this.divInt += ' alt="'+this.altName+'" aria-label="'+this.altName+'"';
			else if( this.altName != null ) 
				this.divInt += ' alt="" '; 
			this.divInt += 'x = "0" y = "0" height = "' + this.h + 'px" width = "' + this.w + 'px" filter="url(#'+ this.filterid + 'Shadow)"'
			
			if( !this.bHasClickMap )
				this.divInt += 'style="cursor:default;"'
			
			this.divInt += '/>\n';
		}	
	}
	else{	
		this.divInt += '<svg tabindex="-1" focusable="false" aria-label="" width="' + (this.w + (1 * Math.abs(xOffset))) + 'px" height="' + (this.h + (1 * Math.abs(yOffset))) + 'px">\n'

		var mapOffsetX = 0;
		var mapOffsetY = 0;
		
		this.divInt += '<image name="'+this.name+'Img" id="'+this.name+'Img" xlink:href = "' + (!this.bOffPage?this.imgSrc:'') + '" preserveAspectRatio="none"';
		
		if( this.altName ) 
			this.divInt += ' alt="'+this.altName+'" aria-label="'+this.altName+'"';
		else if( this.altName != null ) 
			this.divInt += ' alt="" '; 
		this.divInt += 'x = "0" y = "0" height = "' + this.h + 'px" width = "' + this.w + 'px" '
		
		if( !this.bHasClickMap )
			this.divInt += 'style="cursor:default;"'
		
		this.divInt += '/>\n';	
	}
	
	this.divInt += '</svg>\n'
	
	if(this.bUseSvgFile && this.t && this.t.length > 0) this.divInt += '<div class="'+this.name+'Text"><span class="'+this.name+'Text" style="z-index:1;">'+this.t+'</span></div>'	
	
	if(this.bHasClickMap)
	{
		this.divInt += addClickMap(adjustedWidth, adjustedHeight, xOffset, yOffset, this);
		this.bSVGMap = true;
	}
		
		
	this.divInt += '</a>'
}

function ObjShapeBuildSvg(){
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

	var clipRect = '';
  
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
		var pathSource =  "<path " + (bTranslate? "transform=\"translate(0.5 0.5)\"" :"")+ "d='"+this.str_SvgMapPath +"'  style=\"" + this.str_SvgFills;
		var textSource = this.buildSpanText(this.name + 'ReflectionDiv');
		var imgFSource = "<path " + (bTranslate? "transform=\"translate(0.5 0.5)\"" :"")+ "d='"+this.str_SvgMapPath +"'  style=\"" +  (typeof(this.str_SvgImgFills)!='undefined' ? this.str_SvgImgFills : "fill:none") + ";\"";
		this.divReflect = addReflection(this.name, (!this.bOffPage?pathSource:''), this.reflectedImageX, this.reflectedImageY, this.reflectedImageWidth, 
										this.reflectedImageHeight, this.r, this.reflectedImageOffset, this.reflectedImageFadeRate, this.v, this.vf, this.hf, 
										this.boundsRectX, this.boundsRectY, this.wrkAdornerWidth, this.wrkAdornerHeight, zIndex, 
										this.ie8ReflectionDivX, this.ie8ReflectionDivY, this.ie8ReflectionDivWidth, this.ie8ReflectionDivHeight, 
										this.ie8ReflectionImgX, this.ie8ReflectionImgY, this.bUseSvgFile, this.bFixedPosition , (!this.bOffPage?textSource:''), (!this.bOffPage?imgFSource:''));
		
	
	}
	
	var mapOffsetX = 0;
	var mapOffsetY = 0;
	
	if(this.hasOuterShadow)
	{
				
		this.divInt += '<svg tabindex="-1" focusable="false" aria-label="' + '" width="' + adjustedWidth + 'px" height="' + adjustedHeight + 'px"'
		
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
			if(this.str_SvgB64Img  && this.str_SvgFills.indexOf("nonzero") == -1)
			{
				this.divInt += "<defs>";
				this.divInt += "<pattern id=\"Picture_" + this.fuID + "\" x=\"0\" y=\"0\" width=\"" + this.w + "\" height=\""+ this.h +  "\" patternUnits=\"userSpaceOnUse\">\n";
				this.divInt += "<image xlink:href=\""+ this.str_SvgB64Img + "\" x=\"0\" y=\"0\" width=\"" + this.w + "\" height=\""+this.h +  "\" preserveAspectRatio=\"none\">\n";
				this.divInt += "</pattern>\n";
				this.divInt += "</defs>";
	        }
			else
				this.divInt += this.str_SvgStyle;
			this.divInt += "<path id='" +this.name +"path' d='"+this.str_SvgMapPath +"'  style=\"" + this.str_SvgFills;
			
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
			
			this.divInt += 'filter="url(#'+ this.filterid + 'Shadow)"' 
			
			if( !this.bHasClickMap )
				this.divInt += 'style="cursor:default;"'
			this.divInt += " transform='translate( "+ mapOffsetX + ", " +mapOffsetY + "  )' ";
			
			this.divInt += '/>\n'
		}
		else
		{
		
		if(this.str_SvgB64Img  && this.str_SvgFills.indexOf("nonzero")== -1)
			{
				this.divInt += "<defs>";
				this.divInt += "<pattern id=\"Picture_" + this.fuID + "\" x=\"0\" y=\"0\" width=\"" + this.w + "\" height=\""+ this.h +  "\" patternUnits=\"userSpaceOnUse\">\n";
				this.divInt += "<image xlink:href=\""+ this.str_SvgB64Img + "\" x=\"0\" y=\"0\" width=\"" + this.w + "\" height=\""+this.h +  "\" preserveAspectRatio=\"none\">\n";
				this.divInt += "</pattern>\n";
				this.divInt += "</defs>";
	        }
			else
				this.divInt += this.str_SvgStyle;
		this.divInt += "<path id='" +this.name +"path' d='"+this.str_SvgMapPath +"'  style=\"" + this.str_SvgFills;

			this.divInt += 'x = "0" y = "0" height = "' + this.h + 'px" width = "' + this.w + 'px" filter="url(#'+ this.filterid + 'Shadow)"'
			
			if( !this.bHasClickMap )
				this.divInt += 'style="cursor:default;"'
			
			this.divInt += '/>\n';
		}	
	}
	else{	
		this.divInt += '<svg tabindex="-1" focusable="false" aria-label="'+ this.altName +'" width= "100%" height="100%" style=\"left: 0px; top: 0px; position: absolute;\" >\n'
		
		if(this.str_SvgB64Img && this.str_SvgFills.indexOf("nonzero")== -1)
			{				
				this.divInt += "<defs>";
				this.divInt += "<pattern id=\"Picture_" + this.fuID + "\" x=\"0\" y=\"0\" width=\"" + this.w + "\" height=\""+ this.h +  "\" patternUnits=\"userSpaceOnUse\">\n";
				this.divInt += "<image xlink:href=\""+ this.str_SvgB64Img + "\" x=\"0\" y=\"0\" width=\"" + this.w + "\" height=\""+this.h +  "\" preserveAspectRatio=\"none\">\n";
				this.divInt += "</pattern>\n";
				this.divInt += "</defs>";
	        }
			else
				this.divInt += this.str_SvgStyle;
		this.divInt += "<path " + ((this.lineWeight==0)?"":"transform=\"translate(0.5 0.5)\" " ) + "id='" +this.name +"path' d='"+this.str_SvgMapPath +"'  style=\"" + this.str_SvgFills;
		this.divInt += '/>\n';	
	}
	
	if(this.bHasSvgImageFill)
		this.divInt += this.buildSvgImgFill(mapOffsetX, mapOffsetY);
		
	
	
	this.divInt += '</svg>\n'
	
	this.divInt += this.buildSpanText(this.name, mapOffsetX, mapOffsetY);
	
	if(this.bUseSvgFile && this.t && this.t.length > 0) this.divInt += '<div class="'+this.name+'Text"><span class="'+this.name+'Text" style="z-index:1;">'+this.t+'</span></div>'	
	
	if(this.bHasClickMap)
	{
		this.divInt += addClickMap(adjustedWidth, adjustedHeight, xOffset, yOffset, this);
		this.bSVGMap = true;
	}
		
		
	this.divInt += '</a>'
}

function ObjShapeBuildSpanText(name, mapOffsetX, mapOffsetY)
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

function ObjImageBuildSvgImgFill( mapOffsetX , mapOffsetY)
{
	var txtReturn = "";
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
	txtReturn += "<defs>";
	txtReturn += "<pattern id=\"Picture_" + this.fuID + "\" x=\"0\" y=\"0\" width=\"" + adjustedWidth + "\" height=\""+ adjustedHeight +  "\" patternUnits=\"userSpaceOnUse\">\n";
	txtReturn += "<image aria-hidden=\"true\" xlink:href=\""+ this.str_SvgImgFillB64Img + "\" x=\"0\" y=\"0\" width=\"" + adjustedWidth + "\" height=\""+adjustedHeight +  "\" preserveAspectRatio=\"none\">\n";
	txtReturn += "</pattern>\n";
	txtReturn += "</defs>";
	
	txtReturn += "<path id='" +this.name +"imgF' d='"+this.str_SvgMapPath +"'  style=\"" + this.str_SvgImgFills + ";\"" + " transform='translate( "+ mapOffsetX + ", " +mapOffsetY + "  )' ";
	txtReturn += '/>\n';	
	
	return txtReturn;
	
}

function ObjImageBuildText( mapOffsetX , mapOffsetY)
{
	var txtReturn = "";
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
	txtReturn += "<defs>";
	txtReturn += "<pattern id=\"Text_" + this.fuID + "\" x=\"0\" y=\"0\" width=\"" + adjustedWidth + "\" height=\""+ adjustedHeight +  "\" patternUnits=\"userSpaceOnUse\">\n";
	txtReturn += "<image aria-hidden=\"true\" xlink:href=\""+ this.td + "\" x=\"0\" y=\"0\" width=\"" + adjustedWidth + "\" height=\""+adjustedHeight +  "\" preserveAspectRatio=\"none\">\n";
	txtReturn += "</pattern>\n";
	txtReturn += "</defs>";
	
	
	txtReturn += "<path id='" +this.name +"text' d='"+this.str_SvgMapPath +"'  style=\"" + this.str_TxtFill + ";\"" + " transform='translate( "+ mapOffsetX + ", " +mapOffsetY + "  )' ";
	txtReturn += '/>\n';	
	
	return txtReturn;
	
}

function ObjImageBuildVml(){
	var radians = this.originalShadowDirection * (Math.PI / 180.0);
	
	var xOffset = this.outerShadowDepth * Math.cos(radians);
	//Multiply by -1 because a negative offset means this shadow is in the positive y-direction on the screen
	var yOffset = -1 * this.outerShadowDepth * Math.sin(radians);
	
	xOffset = parseFloat(xOffset.toFixed(5));
	yOffset = parseFloat(yOffset.toFixed(5));
	
	var adjustedXPos = this.ie8DivX;
	var adjustedYPos = this.ie8DivY;
	var adjustedWidth = this.ie8DivWidth;
	var adjustedHeight = this.ie8DivHeight;
	
	if(this.hasOuterShadow)
	{
		if(this.vf == 1)
			yOffset *= -1;
		if(this.hf == 1)
			xOffset *= -1;
	}
	
	if(this.hasReflection)
	{	
		var strIndex = this.css.indexOf("z-index:");
		var zIndex = "auto";
		if(strIndex >=0)
		{
			zIndex = this.z;
		}
		this.divReflect = addReflection(this.name, (!this.bOffPage?this.imgSrc:''), this.reflectedImageX, this.reflectedImageY, this.reflectedImageWidth, 
										this.reflectedImageHeight, this.r, this.reflectedImageOffset, this.reflectedImageFadeRate, this.v, this.vf, this.hf, 
										this.boundsRectX, this.boundsRectY, this.wrkAdornerWidth, this.wrkAdornerHeight, zIndex, 
										this.ie8ReflectionDivX, this.ie8ReflectionDivY, this.ie8ReflectionDivWidth, this.ie8ReflectionDivHeight, 
										this.ie8ReflectionImgX, this.ie8ReflectionImgY, this.bUseSvgFile, this.bFixedPosition);
		
	}

	var altTag = ''
	if(this.altName) 
		altTag += ' alt="'+this.altName+'" aria-label="'+this.altName+'"';
	else if( this.altName != null ) 
		altTag += ' alt=""';
	
	if(this.hasOuterShadow){
		if(this.vf == 1)
			this.r = 360 - this.r;	//echo bug 20394: ie8 and ie9 rotate then flip the image. In Lectora V12 and all other browsers flip first, then rotate.
		if(this.hf == 1)
			this.r = 360 - this.r;	//echo bug 20394: ie8 and ie9 rotate then flip the image. In Lectora V12 and all other browsers flip first, then rotate.  
				
		var radians = (this.originalShadowDirection) * (Math.PI / 180.0);
		var xOffset = this.outerShadowDepth * Math.cos(radians);
		//Multiply by -1 because a negative offset means this shadow is in the positive y-direction on the screen
		var yOffset = -1 * this.outerShadowDepth * Math.sin(radians);
		var blurRadius = (1.0*this.outerShadowBlurRadius);
			
		xOffset = xOffset.toFixed(5);
		yOffset = yOffset.toFixed(5);
			
		this.divInt += '<v:image id="'+this.name+'Img" src="' + this.imgSrc + '" '+altTag+' style="z-index:1; position:absolute;width:' + this.w + 'px;height:' + this.h + 'px;rotation:' + this.r + ';'
			
		if(this.vf == 1 || this.hf == 1)
			this.divInt += 'filter:';
			
		if(this.vf == 1)
			this.divInt += ' flipv ';
			
		if(this.hf == 1)
			this.divInt += ' fliph ';
			
		if(this.vf == 1 || this.hf == 1)
			this.divInt += ';'	
			
		this.divInt += 'left: ' + ((this.x - this.ie8AddedOffsetX) - this.ie8DivX) + 'px;'
		this.divInt += 'top:' + ((this.y - this.ie8AddedOffsetY) - this.ie8DivY) + 'px;'
			
		if(this.hasOnUp)
			this.divInt += 'cursor: pointer;';
			
		this.divInt += '">\n'	
		this.divInt += '</v:image>\n' 
			
		if(this.hasOuterShadow)
		{
			this.divInt += '<v:image src="' + this.imgSrc + '" id="'+this.name+'Shadow" style="z-index:0; position:absolute;width:' + this.w + 'px;height:' + this.h + 'px;rotation:' + this.r + ';'	
				
			//Correcting any offsets caused by the blurRadius and shadow offsets. 
			if(xOffset < 0)
				this.divInt += 'left: ' + ((1*this.x - this.ie8AddedOffsetX) - (1*this.ie8DivX) + (1*xOffset) - blurRadius) + 'px;'
			else
				this.divInt += 'left: ' + ((1*this.x - this.ie8AddedOffsetX) - (1*this.ie8DivX) - blurRadius) + 'px;'
			if(yOffset < 0)
				this.divInt += 'top:' + ((1*this.y - this.ie8AddedOffsetY) - (1*this.ie8DivY) + (1*yOffset) - blurRadius) + 'px;'
			else
				this.divInt += 'top:' + ((1*this.y - this.ie8AddedOffsetY) - (1*this.ie8DivY) - blurRadius) + 'px;'
			this.divInt += 'filter: alpha(opacity=' + this.opacity + ') progid:DXImageTransform.Microsoft.Blur(makeShadow=True pixelRadius=' + blurRadius + ' shadowOpacity=' + this.outerShadowOpacity + ')'

			if(this.vf == 1)
			{
				this.divInt += ' flipv ';
			}
				
			if(this.hf == 1)
			{
				this.divInt += ' fliph ';
			}
			
			this.divInt += 'progid:DXImageTransform.Microsoft.DropShadow(OffX=' + xOffset + ' OffY=' + yOffset + ' color=#' + this.shadowRedHex + this.shadowGreenHex + this.shadowBlueHex + ');"/>\n'
			this.divInt += '</v:image>\n'
		}	
	}
	else{	  
		this.divInt+='<v:image name="'+this.name+'Img" '+altTag+' id="'+this.name+'Img" src="' + this.imgSrc + '" style="position:absolute;width:' + this.w + 'px;height:' + this.h + 'px; left:' + ((this.x - this.ie8AddedOffsetX) - this.ie8DivX) + 'px; top:' + ((this.y - this.ie8AddedOffsetY) - this.ie8DivY) + 'px;'
			
		this.divInt += 'filter:'
		
		if(this.vf == 1)
		{
			this.divInt += 'flipv';
			this.r = 360 - this.r;		//echo bug 20394: ie8 and ie9 rotate then flip the image. In Lectora V12 and all other browsers flip first, then rotate.
		}
		
		if(this.hf == 1)
		{
			this.divInt += ' fliph';
			this.r = 360 - this.r;		//echo bug 20394: ie8 and ie9 rotate then flip the image. In Lectora V12 and all other browsers flip first, then rotate.
		}
		  
		this.divInt += ';'
		  
		if(this.r > 0)
			this.divInt += 'rotation:' + this.r + ';'
			
		if(this.hasOnUp)
			this.divInt += 'cursor: pointer;';
		  
		this.divInt += '"></v:image>\n'
	}
	
	this.divInt += '</a>'
}

function ObjImageInit() {
  this.objLyr = new ObjLayer(this.name, null, null, this.div)
  if(!isSinglePagePlayerAvail() && !window.bTrivResponsive) adjustForFixedPositon(this);
}

function ObjImageActivate() {
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
		}
		else 
		  this.objLyr.write( this.divInt );

		if(this.divReflect)
		{
			if(typeof(this.divReflect) == "string")
				this.divReflect = CreateHTMLElementFromString(this.divReflect);
			if(this.bFixedPosition && isSppInIosFrame()){
				fixedDivId = "TrivFD_" + GetCurrentPageID();
				fixedDiv = getDisplayDocument().getElementById(fixedDivId);
				fixedDiv.appendChild(this.divReflect);
			}else{
				GetCurrentPageDiv().appendChild(this.divReflect);
			}
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
			if( this.v ) this.actionShow(true) //Pass in true to indicate its from activate
			//BG-860 Beta Only Fix
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

		//echo LD-985 : This bug affects only IE9 native opacity; Moved all image opacity to here for better maintenance.
		if(is.ie9Native && !isNaN(this.opacity) && this.opacity < 100)
		{
			var opacity = this.opacity;
			this.objLyr.styObj.opacity = "";
			var imageTag = this.objLyr.theObjTag;
			var imageStyleFilter = imageTag.style.filter;
			imageStyleFilter = imageStyleFilter + " alpha(opacity=" + opacity + ")";

			imageTag.style.filter = imageStyleFilter;
		}
		else if(!is.ie9Native && !isNaN(this.opacity) && this.opacity < 100)
		{
			var opacity = this.opacity;
			var divFilter = this.objLyr.styObj.filter;
			this.objLyr.styObj.filter = divFilter.length == 0 ? "filter: alpha(opacity=" + opacity + ")" : " alpha(opacity=" + opacity + ")";
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

function ObjImageDown(e) {
  if( this.bDisabled ) return;
  if( is.ie ) e = event || e
  if( is.ie && !is.ieMac && e.button != 0 && e.button!=1 && e.button!=2 ) return
  if( is.ieMac && e.button != 0 ) return
  if( is.ns && e.button!=0 && e.button!=2 ) return
  if( this.bIsBtn ) 
	this.actionChangeContents(this.imgDn,this.opacityDn, false);
  this.onSelect()
  this.onDown()
}

function ObjImageKeyDown(e) {
    if( this.bDisabled ) return;
    var keyVal = 0
    if( is.ie ) e = event || e
    keyVal = e.keyCode
    if( keyVal == 13 || keyVal == 32 ) 
	{ this.onUp(); return false; }
}

function ObjImageUp(e) {
  if( this.bDisabled ) return;
  if( is.ie ) e = event || e
  if( is.ie && !e ) return
  if( is.ie && !is.ieMac && e && e.button != 0 && e.button!=1 && e.button!=2 ) return
  if( is.ns && !is.nsMac && e && e.button!=0 && e.button!=2 ) return
  if( this.bIsBtn ) 
	this.actionChangeContents(this.imgOvr, this.opacityOvr, false);
  if( !is.ieMac && !is.nsMac && e && e.button==2 )
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

function ObjImageOver() {
  if( this.bDisabled ) return;
  if( this.bIsBtn ) 
	this.actionChangeContents(this.imgOvr,this.opacityOvr, false);
  
  if( this.hasOnUp )
    this.objLyr.ele.style.cursor = 'pointer';
  
  if( this.capture & 1 )
    this.onOver()
}

function ObjImageOut() {
  if( this.bDisabled ) return;
  if( this.bIsBtn )
	this.actionChangeContents(this.imgSrc,this.opacityNorm, false);
  
  if( this.hasOnUp )
    this.objLyr.ele.style.cursor = 'default';

  if( this.capture & 2 )
    this.onOut()
}

function ObjImageWriteLayer( newContents ) {
  if (this.objLyr) this.objLyr.write( newContents )
}

function ObjImageOnShow(bFromActivate) {
  this.alreadyActioned = true;
  this.objLyr.actionShow();
  if( this.matchObj )
	this.drawLine();

	var THIS = this;
	if((is.bWCAG && this.altName && !bFromActivate) || isLDPopup())
		setTimeout( function() {THIS.div.innerHTML = THIS.div.innerHTML;} , 100);
}

function ObjImageOnHide() {
  this.alreadyActioned = true;
  this.objLyr.actionHide();
  if( this.matchLine )
	this.matchLine.ResizeTo( -10, -10, -10, -10 );
}

function ObjImageIsVisible() {
  return this.objLyr.isVisible()
}

function ObjInitShadow(direction, depth, opacity, redHex, greenHex, blueHex, red, green, blue, blurRadius, shadowType){
	
	//For some reason, Chrome will not display the shadow on a flipped image with a rotate angle of zero unless we add 360 degrees to it. No idea why. 
	if(this.vf == 1 && this.hf != 1)
	{
		this.outerShadowDirection = -1 * (direction + this.r);
		this.r = this.r + 360;
	}
	if(this.hf == 1 && this.vf != 1)
	{
		this.outerShadowDirection = 180 - (direction + this.r);
		this.r = this.r + 360;
	}
	if(this.vf == 1 && this.hf == 1)
	{
		this.outerShadowDirection = (direction + this.r) + 180;
		this.r = this.r + 360;
	} 
	if(this.hf != 1 && this.vf != 1)
	{	
		this.outerShadowDirection = direction + this.r;
	}
	
	//echo bug 21328: ie8 and ie9 shadows doesn't need any of these calculations
	this.originalShadowDirection = direction;
	
	this.outerShadowDepth = depth;
	this.originalOuterShadowDepth = depth;
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

function ObjSetButtonOpacity( opacityNorm, opacityOvr, opacityDn, opacityDis )
{
  if(opacityNorm) this.opacityNorm = opacityNorm;
  if(opacityOvr) this.opacityOvr = opacityOvr;
  if(opacityDn) this.opacityDn = opacityDn;
  if(opacityDis) this.opacityDis = opacityDis;
}

function ObjInitIe8Attr(divPosX, divPosY, divWidth, divHeight, additionalOffsetX, additionalOffsetY){
	this.ie8DivX = divPosX;
	this.ie8DivY = divPosY;
	this.ie8DivWidth = divWidth;
	this.ie8DivHeight = divHeight;
	this.ie8AddedOffsetX = additionalOffsetX;
	this.ie8AddedOffsetY = additionalOffsetY;
}

function ObjInitBorder(weight){
	this.borderWeight = weight;
}

function ObjInitRotateAngle(angle, vertFlip, horzFlip, boundsRectX, boundsRectY, adornerWidth, adornerHeight){
	this.r = angle;
	this.vf = vertFlip;
	this.hf = horzFlip;
	this.wrkAdornerWidth = adornerWidth;
	this.wrkAdornerHeight = adornerHeight;
	
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
		this.originalShadowDirection = 0;
	}
}

function ObjInitReflection(x, y, width, height, offset, fadeRate, separation, ie8DivX, ie8DivY, ie8DivWidth, ie8DivHeight, ie8ImgX, ie8ImgY){
	this.reflectedImageX = x - this.borderWeight;
	this.reflectedImageY = y - this.borderWeight;
	this.reflectedImageWidth = width;
	this.reflectedImageHeight = height;
	this.reflectedImageOffset = offset;
	this.reflectedImageFadeRate = fadeRate;
	this.reflectionSeparation = separation;
	this.reflectionPosDiffY	= this.reflectedImageY-this.y;
	this.reflectionPosDiffX	= this.reflectedImageX-this.x;
	
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

function ObjSetDisabled( bSet )
{
	this.bDisabled = bSet;
	this.hasOnUp = !bSet;

	var img = this.imgSrc;
	var opacity = this.opacity;

	if ( this.bDisabled ) 
	{
		if ( this.imgDisabledSrc )
			img = this.imgDisabledSrc;
		if ( this.opacityDis )
			opacity = this.opacityDis;
	}	
	else 
	{
		if( img == this.imgDn && this.opacityDn )
			opacity = this.opacityDn;
		else if ( img == this.imgOvr && this.opacOvr )
			opacity = this.opacOvr;
		else if ( img == this.imgSrc && this.opacityNorm )
			opacity = this.opacityNorm;
	}
	
	if ( this.objLyr ) 
	{
		var cursor = ( !this.bDisabled && ( this.bIsBtn || this.hasOnUp || this.isChoice ) )?"pointer":"default";
		if(UseHtmlImgTag(this))
			this.objLyr.doc.images[this.name+"Img"].style.cursor = cursor;
 	    else
			this.objLyr.styObj.cursor = cursor;
	}
	this.actionChangeContents(img, opacity, false);	
}

function ObjInitImageMap(boolVal, str, str2, str3, str4 , str5)
{
	this.bHasClickMap = boolVal;
	this.str_ImageMapCoords = str;
	this.str_SvgMapPath = str2;
	this.str_SvgStyle = str3; 
	this.str_SvgFills = str4; 
	this.str_SvgB64Img = str5;
}

function ObjShapeSetTextVal( str  , str2)
{
	this.textDivCSS = str;
	this.spanDivCSS = str2;
}

function ObjShapeImageFillVal(str, str2 )
{
	this.bHasSvgImageFill = true;
	this.str_SvgImgFills = str; 
	this.str_SvgImgFillB64Img = str2;
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
			this.w = typeof(obj.w)!="undefined"?obj.w:this.w;
			this.h = typeof(obj.h)!="undefined"?obj.h:this.h;
			this.bBottom = (typeof(obj.bOffBottom)!="undefined"?obj.bOffBottom:this.bBottom);
			this.stylemods = typeof(obj.stylemods)!="undefined"?obj.stylemods:null;
			if(this.stylemods && this.stylemods.length == 2)
			{
				this.textDivCSS = this.stylemods[0].sel + this.stylemods[0].decl;
				this.spanDivCSS = this.stylemods[1].sel + this.stylemods[1].decl;
			}

			this.str_SvgB64Img = typeof(obj.fd)!="undefined"?obj.fd:this.str_SvgB64Img;
			this.str_SvgMapPath = typeof(obj.p)!="undefined"?obj.p:this.str_SvgMapPath;
			
			if(!this.changeContFired)
			{
				this.imgSrc = typeof(obj.i)!="undefined"?obj.i:this.imgSrc;
				this.imgOrig = this.imgSrc;
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
		this.actionChangeContents(this.imgSrc, this.opacity, true);
	
	if(this.bEmbeddedImg)
	{
		var replaceEle = getHTMLEleByID("embeded_"+this.name);
		if(replaceEle)
			replaceEle.appendChild(this.objLyr.ele);
	}
	
	this.updateFillSize();
		
	//Adjust the CSS
	FindAndModifyObjCSSBulk(this, this.stylemods);
		
}


function ObjImageUseSvgFile (val){
		this.bUseSvgFile = val;
}

function ObjImageValidSource(){
	if(this.bOffPage)
	{
		this.bOffPage = false;
		this.actionChangeContents(this.imgSrc, this.opacity, true);
	}
}

function ObjImageGetCSS(){
	var css = '';
	var rotateCSS = '';
	var bHasEffects = (this.hasOuterShadow|| this.hasReflection);
	var bIsImage = this.isImage();
	
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
	
	if(this.r > 0 || this.vf == 1 || this.hf == 1)
	{
		var vF = (!bIsImage && !this.bUseSvgFile)?0:this.vf;
		var hF = (!bIsImage && !this.bUseSvgFile)?0:this.hf;
		rotateCSS = addRotateCSS(this.r, this.hasOuterShadow, this.w, this.h, this.x, this.y, this.outerShadowDirection, this.outerShadowDepth, this.outerShadowBlurRadius, 
		vF, hF, this.boundsRectX, this.boundsRectY, this.wrkAdornerWidth, this.wrkAdornerHeight);
	}
	
	if(  is.svg && ( !UseHtmlImgTag(this)  || this.bUseSvgFile || bHasEffects))
	{
		var clipRect = "";
		if(!this.hasOuterShadow)
			clipRect = 'clip: rect(0px ' + (this.w + (1 * Math.abs(xOffset))) + 'px ' + (this.h + (1 * Math.abs(yOffset))) + 'px 0px);';
		else
		{
			adjustedWidth = this.w + (1 * Math.abs(xOffset)) + (2 * this.borderWeight) + this.outerShadowBlurRadius;
			adjustedHeight = this.h + (1 * Math.abs(yOffset)) + (2 * this.borderWeight) + this.outerShadowBlurRadius; 
				
			if(xOffset < 0 || yOffset < 0)
			{
				if(xOffset < 0 && yOffset >= 0)
				{
					adjustedXPos += (xOffset - this.outerShadowBlurRadius);
					clipRect = 'clip: rect(' + 0 + 'px ' + adjustedWidth + 'px ' + adjustedHeight + 'px ' + (xOffset - this.outerShadowBlurRadius) + 'px);';
				}
				else if(xOffset >= 0 && yOffset < 0)
				{	
					adjustedYPos += (yOffset - this.outerShadowBlurRadius);
					clipRect = 'clip: rect(' + (yOffset - this.outerShadowBlurRadius) + 'px ' + adjustedWidth + 'px ' + adjustedHeight + 'px ' + 0 + 'px);';
				}
				else
				{
					adjustedXPos += (xOffset - this.outerShadowBlurRadius);
					adjustedYPos += (yOffset - this.outerShadowBlurRadius);
					clipRect = 'clip: rect(' + (yOffset - this.outerShadowBlurRadius) + 'px ' + adjustedWidth + 'px ' + adjustedHeight + 'px ' + (xOffset - this.outerShadowBlurRadius) + 'px);';
				}
			}
			else
				clipRect = 'clip: rect(' + 0 + 'px ' + (adjustedWidth + this.outerShadowBlurRadius) + 'px ' + (adjustedHeight + this.outerShadowBlurRadius) + 'px ' + 0 + 'px);';
		}
		
		css = buildCSS(this.name,this.bFixedPosition,adjustedXPos,adjustedYPos,adjustedWidth,adjustedHeight,this.v,this.z,null,clipRect);
	}
	else if(is.vml && (bHasEffects || this.r > 0))
	{
		adjustedXPos = this.ie8DivX;
		adjustedYPos = this.ie8DivY;
		adjustedWidth = this.ie8DivWidth;
		adjustedHeight = this.ie8DivHeight;
		var clipRect = '';
	
		if(this.hasOuterShadow){
			if(this.vf == 1)
				yOffset *= -1;
			if(this.hf == 1)
				xOffset *= -1;
			
			if(xOffset < 0 || yOffset < 0)
			{
				if(xOffset < 0 && yOffset >= 0)
					clipRect = 'clip: rect(' + (-1 * this.outerShadowBlurRadius) + 'px ' + (adjustedWidth + (2*this.borderWeight) + this.outerShadowBlurRadius + (1 * Math.abs(xOffset))) + 'px ' + (adjustedHeight + (2*this.borderWeight) + this.outerShadowBlurRadius + (1 * Math.abs(yOffset))) + 'px ' + (xOffset - this.outerShadowBlurRadius) + 'px);';
				else if(xOffset >= 0 && yOffset < 0)
					clipRect = 'clip: rect(' + (yOffset - this.outerShadowBlurRadius) + 'px ' + (adjustedWidth + (2*this.borderWeight) + this.outerShadowBlurRadius + (1 * Math.abs(xOffset))) + 'px ' + (adjustedHeight + (2*this.borderWeight) + this.outerShadowBlurRadius + (1 * Math.abs(yOffset))) + 'px ' + (-1 * this.outerShadowBlurRadius) + 'px);';
				else
					clipRect = 'clip: rect(' + (yOffset - this.outerShadowBlurRadius) + 'px ' + (adjustedWidth + (2*this.borderWeight) + this.outerShadowBlurRadius + (1 * Math.abs(xOffset))) + 'px ' + (adjustedHeight + (2*this.borderWeight) + this.outerShadowBlurRadius + (1 * Math.abs(yOffset))) + 'px ' + (xOffset - this.outerShadowBlurRadius) + 'px);';
			}
			else
				clipRect = 'clip: rect(' + (-1 * this.outerShadowBlurRadius) + 'px ' + (adjustedWidth + (2*this.borderWeight) + this.outerShadowBlurRadius + (1 * Math.abs(xOffset))) + 'px ' + (adjustedHeight + (2*this.borderWeight) + this.outerShadowBlurRadius + (1 * Math.abs(yOffset))) + 'px ' + (-1 * this.outerShadowBlurRadius) + 'px);';	
		}
		
		css = buildCSS(this.name,this.bFixedPosition,adjustedXPos,adjustedYPos,adjustedWidth,adjustedHeight,this.v,this.z,null,clipRect);
	}
	else 
	{
		css = buildCSS(this.name,this.bFixedPosition,adjustedXPos,adjustedYPos,adjustedWidth,adjustedHeight,this.v,this.z,null,'');
		css += '#' + this.name + 'Img{'
		css += getDisplayDocument().documentMode < 8 ? 'position:absolute;"' : ''
		css += 'width:'+this.w+'px;height:'+this.h +'px;}\n';
	}
	
	
	if(rotateCSS != '')
	{
		var tempStr = css.substring(0, css.length-2);
		tempStr += rotateCSS;
		tempStr += '}\n';
		css = tempStr;
	}
	
		
	return css;
}

function ObjImageSetupObjLayer(){
	
	this.objLyr.theObjTag = getChildNodeByID(this.objLyr.ele, this.name+"Img");
	if(!this.objLyr.theObjTag)
		this.objLyr.theObjTag = getChildNodeByID(this.objLyr.ele, this.name+"path");

	this.objLyr.objDiv = getChildNodeByID(this.objLyr.ele, this.name);

	this.objLyr.theObj = this;

	if(this.objLyr.ele != null && this.bHasClickMap && is.svg && !is.android)
		this.objLyr.ele = this.objLyr.event = getChildNodeByID(this.objLyr.ele, this.name+"MapArea");
	else if(this.objLyr.ele == null)
		this.objLyr.ele = this.objLyr.event = getChildNodeByID(this.objLyr.ele, this.name+"Img");

	//echo bug 22104 : Changing it back to the way V11.3.2 handled WCAG
	//echo bug LD-49 : Removed check for WCAG because it wasn't needed and it was preventing the onMouse events from being added.
	if( this.capture & 4  && !is.iOS && (!this.bIsWCAG || is.ie)) {
		this.objLyr.ele.onmousedown = new Function("event", this.obj+".down(event); return false;");
		this.objLyr.ele.onmouseup = new Function("event", this.obj+".up(event); return false;"); 
		this.objLyr.ele.onkeydown = ObjImageKeyDown;
		this.objLyr.ele.onUp = new Function(this.obj+".onUp(); return false;");
	}

	if( this.capture & 1 || this.hasOnUp ) this.objLyr.ele.onmouseover = new Function(this.obj+".over(); return false;")
	if( this.capture & 2 || this.hasOnUp ) this.objLyr.ele.onmouseout = new Function(this.obj+".out(); return false;")

	if(this.hasOuterShadow)
	{
		this.objLyr.shadowObj = getChildNodeByID(this.objLyr.ele, this.name+"Img");
		this.objLyr.shadowProp = getChildNodeByID(this.objLyr.ele, this.name+"Shadow");
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

function ObjImageGetPreloadString()
{
	var strPreloads = "";
	if ( !is.svg || !this.bUseSvgFile )
	{
		strPreloads = "'" + this.imgSrc + "'";
		if ( this.ind )
		{
			if ( this.imgCP && this.imgCP.length && this.imgCP != this.imgSrc )
				strPreloads += ",'" + this.imgCP + "'";
			if ( this.imgIP && this.imgIP.length) 
				strPreloads += ",'" + this.imgIP + "'";
			if ( this.imgNS && this.imgNS.length) 
				strPreloads += ",'" + this.imgNS + "'";
		}
		else if ( this.bIsBtn )
		{
			if ( this.imgDn && this.imgDn.length) 
				strPreloads += ",'" + this.imgDn + "'";
			if ( this.imgOvr && this.imgOvr.length) 
				strPreloads += ",'" + this.imgOvr + "'";
		}
	
	}
	return strPreloads;
}

function ObjImageRV(){
	this.loadProps();
	if(!window.bTrivResponsive)
	{
		this.h = this.oh;
		this.w = this.ow;
	}
	this.css = this.getCSS();
	this.refresh();
	
	if(this.imgOrig != this.imgSrc)
		this.actionChangeContents(this.imgOrig, this.opacity, true);
	
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

function ObjImageSetID(uID){
	this.fuID = uID;
}

function ObjImageIsImage(){
	var bImage = false;
	if(this.name.indexOf("image") != -1)
		bImage = true;
	
	return bImage;
}

function ObjShapeInitLineWeight( val )
{
	this.lineWeight = val;
}
