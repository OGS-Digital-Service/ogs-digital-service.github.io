/**************************************************
/**************************************************
Trivantis (http://www.trivantis.com)
**************************************************/
var canvasSupported = !!window.HTMLCanvasElement;

{ // Extend prototypes
var p=ObjLayer.prototype
p.slideTo = ObjLayerSlideTo
p.slideBy = ObjLayerSlideBy
p.slideStart = ObjLayerSlideStart
p.slide = ObjLayerSlide
p.onSlide = new Function()
p.onSlideEnd = ObjLayerSlideEnd
p.doTrans = ObjLayerDoTrans
p.doTransIE = ObjLayerDoTransIE
p.doTransNS = ObjLayerDoTransNS
p.growTo = ObjLayerGrowTo
p.growStart = ObjLayerGrowStart
p.grow = ObjLayerGrow
p.tFunc = null
p.sRndArry = ObjLayerSRndArray
p.reload = objReload
}

function objReload()
{
	
}

function html5Setup(lyr){
	if(!canvasSupported) return null;
	try{
		if(lyr.ele && !(lyr.ele.id.indexOf("MapArea")>-1) && lyr.ele.firstChild && lyr.ele.firstChild.firstChild && lyr.ele.firstChild.firstChild.nodeName == "IMG")
		{		
			lyr.img = lyr.ele.firstChild.firstChild;
			lyr.isSVG = false;
			lyr.bNeedRetry = false;
		}
		else if(lyr.theObj && TagCheck(lyr.theObj))
		{
			if( typeof(lyr.image) == 'undefined' )
			{
				//BUG 21690: fixed issue with awesomium transitions not showing.
				if( is.awesomium && lyr.theObjTag )
				{
					lyr.theObjTag.style.visibility = 'hidden';
					lyr.show();
				}
				lyr.image = new Image();
				lyr.image.width = lyr.theObj.w;
				lyr.image.height = lyr.theObj.h;
				lyr.image.src = lyr.theObj.imgSrc;
				//LD-5838 need to check for transbtn.gif. If it is in the source, we are a transparent button, so we dont need to 
				//change the source to a png.
				if(  (lyr.theObj.name.indexOf("shape") != -1)  || (lyr.theObj.name.indexOf("button") != -1) && lyr.image.src.indexOf("transbtn.gif") == -1 )
					lyr.image.src = "images\\" +lyr.theObj.name+".png"
				lyr.isSVG = true;
			}
			
			if( !lyr.image.complete )
			{
				lyr.bNeedRetry = true;
				return null;
			}
			
			lyr.bNeedRetry = false;
			lyr.img = lyr.image;
		}
		else return null;
	}catch(err){ return null; }

	lyr.iw = lyr.img.naturalWidth;
	lyr.ih = lyr.img.naturalHeight;
	lyr.canvas = createCanvas(lyr);
	adjustPosition(lyr, lyr.canvas);
	lyr.getEle("div").appendChild( lyr.canvas );

	if(lyr.tOut){
		var ctx = lyr.canvas.getContext('2d');
		ctx.drawImage(lyr.img,0,0);
		lyr.hide();
	}
	return lyr.canvas;
}

function adjustPosition(lyr, cv)
{
	if(lyr.theObj && (lyr.theObj.name.indexOf("image")>-1 || lyr.theObj.name.indexOf("shape")>-1 || lyr.theObj.name.indexOf("button")>-1))
	{
		if(lyr.theObj.hasOuterShadow)
		{
			if(lyr.shadowObj && is.svg)
			{
				cv.style.left = lyr.shadowObj.x.baseVal.value+'px';
				cv.style.top = lyr.shadowObj.y.baseVal.value+'px';
			}
			else if(lyr.shadowObj)
			{
				cv.style.left = lyr.shadowObj.style.left;
				cv.style.top = lyr.shadowObj.style.top;
			}
		}
	}
}

function checkTransReqs(lyr, tNum, tOut){
	try{
		if(lyr)
		{
			switch(tNum)
			{
				case 4:
				case 5:
				case 6:
				case 7:
				case 34:
				case 35:
				case 36:
				case 37:
				case 38:
				{
					if(lyr.canvas)
					{
						if(lyr.theObjTag && is.awesomium)
							lyr.theObjTag.style.visibility = 'inherit';
						
						lyr.getEle("div").removeChild( lyr.canvas );

						lyr.canvas = null;
						
						if(tOut)
							lyr.show();
					}
					break;
				}
				case 14:
				case 16:
				{
					if(lyr.canvas && !tOut)
					{
						if(lyr.theObjTag && is.awesomium)
							lyr.theObjTag.style.visibility = 'inherit';
						
						lyr.getEle("div").removeChild( lyr.canvas );
						
						lyr.canvas = null;
					}
					break;
				}
			}
		}
	}
	catch(err){}
	
	return lyr.canvas;
}

function createCanvas(lyr){
	var cv = getDisplayDocument().createElement( "canvas" );
	cv.style.visibility = 'visible';
	cv.width = lyr.iw ? lyr.iw : lyr.oR;
	cv.height = lyr.ih ? lyr.ih : lyr.oB;
	cv.style.width = lyr.oR + 'px';
	cv.style.height = lyr.oB + 'px';
	if(lyr.isSVG)
	{
		cv.style.position='absolute';
		cv.style.left = '0px';
		cv.style.top = '0px';
		cv.style.width = lyr.theObj.w + 'px';
		cv.style.height = lyr.theObj.h + 'px';
		cv.style.zIndex = lyr.theObj.z+1;
	}
	adjustPosition(lyr, cv);
	return cv;
}

function checkDone(lyr){
	if(++lyr.currTrans>=lyr.nV) 
	{
		if(lyr.canvas){
			lyr.getEle("div").removeChild( lyr.canvas );
		}
		lyr.canvas = null;
		if(lyr.tOut) { 
			lyr.hideIt();
			setOpacity(lyr.getEle("div"), ((lyr.theObj)?lyr.theObj.opacity:100)/100.0);
			if(lyr.orgPos) 
				lyr.onSlideEnd();			
		}
		else{
			setTransForEffect(lyr);
			
			getDisplayWindow().clearInterval(lyr.tT);
			if(lyr.orgPos) 
				lyr.onSlideEnd();
			
			setOpacity(lyr.getEle("div"), ((lyr.theObj)?lyr.theObj.opacity:100)/100.0);	
			lyr.show();
			lyr.tTrans = -1;
			//BUG 21690: fixed issue with awesomium transitions not showing.
			if( lyr.isSVG && is.awesomium && lyr.theObjTag)
				lyr.theObjTag.style.visibility = 'inherit';

			eval(lyr.transFn)
			fixDIV = getDisplayDocument().getElementById('fixDIV');
			if(isSinglePagePlayerAvail() && lyr.id.indexOf("page") > -1)
			{
				setOpacity(trivPlayer.inheritedDiv, 100/100.0);
				setOpacity(fixDIV, 100/100.0);
			}
			else if( lyr.id == "pageDIV")
			{
				setOpacity(fixDIV, 100/100.0);
			}
				
		}
		
		if(is.ie9Native)
			lyr.getEle("div").style.filter = "";
		
		IEClipCorrection(lyr);
		lyr.bInTrans = false;
		
	}
}

function setTransForEffect(lyr)
{
	if(!isEffectPartOfTrans(lyr.tNum))
	{
		//Effect Trans In
		lyr.eV = 15;
		lyr.eTran = 1;
		if(!lyr.eT || lyr.eT == -1)
			lyr.eT = getDisplayWindow().setInterval( function(){transEffect(lyr);},20)
	}
}

function isIETransPossible(lyr, tNum, tOut)
{
	if(lyr && lyr.theObj)
	{
		if(tNum == 34)
			if(lyr.theObj.name.indexOf("text") >-1)
				if(lyr.theObj.hasOuterShadow > 0 || lyr.theObj.r >0 || lyr.theObj.hasTextShadow > 0 || lyr.theObj.opacity < 100)
				{
					if(!tOut)
					{
						lyr.show();
						return true;
					}
					else
						return false;
				}
	}
	return false;
}

//Always pass in a value between 0 and 1 for opacity
function setOpacity(ele, opacity, setVis)
{
	if(ele)
	{
		if(!(is.ie8 || is.ie9))
			ele.style.opacity=""+opacity;
		else{
			//echo LD-826: Remove the alpha filter one the object is fully opaque. No need to have them and having them makes certain objects look bad (e.g. text).
			if(opacity < 1)
				ele.style.filter = 'alpha(opacity='+Math.round(opacity*100)+')';
			else
				ele.style.filter = '';
		}
		
		if(setVis)
			ele.style.visibility='visible';
	}
}

function ObjLayerSRndArray(xmax,ymax){
	var i, j, r;
	this.xMax  = xmax;
	this.yMax  = ymax;
	this.randX = [];
	this.randY = [];
	this.rowZero = [];

	for(i = 0; i < this.xMax; i++){
		this.randX[i] = i;
		this.rowZero[i] = false;
	}

	for(i = 0; i < this.xMax; i++){
		r = getRandNums(0, this.xMax-1);
		j = this.randX[r];
		this.randX[r] = this.randX[i];
		this.randX[i] = j;
	}

	for(i = 0; i < this.yMax; i++) this.randY[i] = i;

	for(i = 0; i < this.yMax; i++){
		r = getRandNums( 0, this.yMax-1 );
		j = this.randY[r];
		this.randY[r] = this.randY[i];
		this.randY[i] = j;
	}
}

function ObjLayerSlideTo(ex,ey,amt,spd,fn,eff){
	this.unique++
	if(this.slideActive){ setTimeout(this.obj+".slideTo("+ex+","+ey+","+amt+","+spd+",\""+fn+"\""+","+eff+")",20); return;}
	if(ex==null) ex = this.x
	if(ey==null) ey = this.y
	var dx = ex-this.x
	var dy = ey-this.y
	this.slideStart(ex,ey,dx,dy,amt,spd,fn,eff)
}

function ObjLayerSlideBy(dx,dy,amt,spd,fn,eff) {
	this.unique++
	if(this.slideActive) { setTimeout(this.obj+".slideBy("+dx+","+dy+","+amt+","+spd+",\""+fn+"\""+","+eff+")",20); return;}
	var ex = this.x + dx
	var ey = this.y + dy
	this.slideStart(ex,ey,dx,dy,amt,spd,fn,eff)
}

function ObjLayerSlideStart(ex,ey,dx,dy,amt,spd,fn,eff) {
	if(this.slideActive) return
	if(!amt) amt = 10
	if(!spd) spd = 20
	var num = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2))/amt
	if(num==0){
		if(this.tTrans==1) this.hide();
		if(fn) eval(fn);
		this.bInTrans = false; 
		return;
	}
	if(eff==undefined) eff = 1;
	this.sx = this.x;
	this.sy = this.y;
	var delx = ease(eff,this.tTrans,1,this.sx,dx,num);
	var dely = ease(eff,this.tTrans,1,this.sy,dy,num);
	if(!fn) fn = null
	this.slideActive = true
	this.slide(delx,dely,ex,ey,num,1,spd,fn,this.unique,eff)
}

function ObjLayerSlide(dx,dy,ex,ey,num,i,spd,fn,u,eff) {
	if(!this.slideActive) return
	if((i++ < num) && (u==this.unique)){
		this.moveTo(dx,dy)
		this.onSlide()
		dx = ease(eff,this.tTrans,i,this.sx,ex-this.sx,num);
		dy = ease(eff,this.tTrans,i,this.sy,ey-this.sy,num);
		if(this.slideActive) setTimeout(this.obj+".slide("+dx+","+dy+","+ex+","+ey+","+num+","+i+","+spd+",\""+fn+"\","+u+","+eff+")",spd)
		else this.onSlideEnd()
	}else{
		this.moveTo(ex,ey)
		this.onSlide()
		this.onSlideEnd()
		
		eval(fn)
		this.slideActive = false
		this.bInTrans = false;
	}
}

function waitForImage(lyr){
	var img=0;
	if(!canvasSupported) return false;
	try{
		if(lyr.ele.firstChild.firstChild.nodeName == "IMG") img = lyr.ele.firstChild.firstChild;
		else return false;
	}catch(err){ return false; }
	if(!img.naturalWidth||!img.naturalHeight)
		return true;
	return false;
}

function ObjLayerDoTrans(tOut,tNum,dur,fn,ol,ot,fl,ft,fr,fb,il,eff,tb) {
	var _this=this;
	if(waitForImage(this)){setTimeout( function(){_this.doTrans(tOut,tNum,dur,fn,ol,ot,fl,ft,fr,fb,il,eff);}, 50 ); return;}
	tNum = parseInt(tNum, 10);
	if(this.tTrans == tOut) {eval(fn);return};
	if(tOut == 2) this.tTrans = undefined;
	if(this.bInTrans == true) return;
	else this.tTrans = tOut;
	if(eff==undefined||eff==-1) eff = 1;
	this.bInTrans =true;
	if(this.hasMoved){
		ol = this.newX;
		ot = this.newY;
	}
	if(tNum == 31 || tNum == 32){
		if((il == -1 || tNum == 32) && tb==0) tNum = getRandNums(0, 22) //non-flyins
		else if((il == -1 || tNum == 32) && tb==1) tNum = getLimitedRand(0, 22) //txt non-flyins
		else if(tNum==31 && tb==1) tNum = getLimitedRand(0, 31) //all but not really
		else if(il)tNum = getRandNums(23,31) //flyins
		else tNum = getRandNums(0,31); //all
	}
	if(tNum>=23&&tNum<=33){ 
		X = ol;
		Y = ot;
		dur = (12 - dur) * 2
		switch( tNum){
		case 23://top 
			Y = ft;
			break;
		case 24://topright
			X = fr;
			Y = ft;
			break; 
		case 25://right
			X = fr;
			break;
		case 26://bottomright
			X = fr;
			Y = fb;
			break;
		case 27://bottom
			Y = fb;
			break;
		case 28://bottomleft
			X = fl;
			Y = fb;
			break;
		case 29://left
			X = fl;
			break;
		case 30://topleft
			X = fl;
			Y = ft;
			break;
		}
		if(tOut){
			if(tOut==1) this.orgPos = [ol,ot];
			this.moveTo( ol, ot )
			this.slideTo( X, Y, dur, null, fn, eff )
		}else{
			this.moveTo( X, Y )
			this.show()
			this.slideTo( ol, ot, dur, null, fn, eff )
		}
	}else{
		this.moveTo( ol, ot )
		if(tNum>=35&&tNum<=38) this.orgPos = [ol,ot];
		if(is.ie&&is.v<9){
			if(tNum>=34) this.doTransNS(tOut,tNum,dur,fn,eff);
			else this.doTransIE(tOut,tNum,dur,fn);
		}else this.doTransNS(tOut,tNum,dur,fn,eff);
	}
}

function ObjLayerDoTransIE(tOut,tNum,dur,fn){
	this.styObj.filter = "revealTrans(duration=" + dur + ",transition=" + tNum + ")";
	this.ele.onfilterchange = clearFilt;
	this.ele.filters.revealTrans.apply();
	if(tOut) this.hide();
	else this.show();
	this.ele.filters.revealTrans.play();
	this.ele.transFn=fn
	this.tTrans = -1;
}

function clearFilt(){
	this.style.filter="";
	eval(this.transFn)
}

function gCV(clR, thisObj){
	var cV;
	if(clR && clR.split){
		var cV = clR.split("rect(")[1].split(" ");
		for (var i=0;i<cV.length;i++)
			cV[i] = parseInt(cV[i], 10);
	}
	else if(thisObj)
	{
		if(thisObj.objDiv && thisObj.objDiv.style.clip.length && thisObj.objDiv.style.clip.split )
		{
			var cV = thisObj.objDiv.style.clip.split("rect(")[1].split(" ");
			for (var i=0;i<cV.length;i++)
			cV[i] = parseInt(cV[i], 10);
		}
		else
		{
			cV = new Array();
			if(thisObj.objDiv && thisObj.objDiv.style)
			{
				cV[0] = thisObj.objDiv.style.top;
				cV[1] = thisObj.w;
				cV[2] = thisObj.h;
				cV[3] = thisObj.objDiv.style.left;
			}
		}
	}
	else{
		cV = new Array();
		if(clR)
		{
			cV[0] = clR.top;
			cV[1] = clR.right;
			cV[2] = clR.bottom;
			cV[3] = clR.left;
		}
	}
	return cV;
}

function ObjLayerDoTransNS(tOut,tNum,dur,fn,eff){
	this.clipInit()
	var clipStr=null; //Bug 19330 - Ensure correct values is passed in
	if(this.styObj && this.styObj.clip && this.styObj.clip.length )
		clipStr = this.styObj.clip;
	else if (this.objDiv && this.objDiv.style.clip && this.objDiv.style.clip.length )
		clipStr = this.objDiv.style.clip;
	else
		clipStr = 'rect(0px '+this.theObj.w+'px '+this.theObj.h+'px 0px)'
	var cV = gCV(clipStr, this)
	this.oT = cV[0];
	this.oR = cV[1];
	this.oB = cV[2];
	this.oL = cV[3];
	this.hideIt = hideIt;
	this.showIt = showIt;
	this.transFn = fn
	this.tOut = tOut;
	this.eff = eff;
	this.tNum = tNum;
	mSecs = dur * 1000;
	intval = 20;
	this.nV = (mSecs/intval);
	this.currTrans = 1;
	fW = this.oR;
	fH = this.oB;
	hW = fW/2;
	hH = fH/2;
	this.aW = this.aH = true;
	
	if(is.ie8 || is.ie9)
		if(isIETransPossible(this, tNum, tOut))
			return;
	
	
	if(!isEffectPartOfTrans(tNum) && tOut)
	{
		setTransForEffect(this);
	}
	else if(!isEffectPartOfTrans(tNum))
	{
		hideEffects(this);
	}
	
	var canvas = html5Setup(this);
	
	if(typeof(this.bNeedRetry) != 'undefined' && this.bNeedRetry)
	{
		var THIS = this;
		setTimeout(function(){
			THIS.doTransNS(tOut, tNum, dur, fn, eff);
			}, 100);
		return;
	}
	
	canvas = checkTransReqs(this, tNum, tOut);
	
	switch (tNum){
	case 0:
	if(canvas){
		this.tFunc = tr0;
		break;
	}
	else
	{
		lg = Math.max(hW,hH);
		this.inc = Math.round(lg/this.nV);
		this.lW = (hW > hH);
		if(tOut)
			this.tFunc = tr01;
		else
			this.tFunc = tr01BXI;
		this.show();
		if(this.ele.id.indexOf("page")> -1)//Only for plates
		{
			var left = 0;
			if(typeof bTrivResponsive != "undefined")
			{
				findWH();
				left = (winW > 1009) ? (winW-1009)/2 : 0;
			}
			else
				left = parseFloat(this.styObj.left);
			
			//Create a DIV to simulate boxin
			var nDiv = null;
			//Check if one already exists, if it does, use that one
			nDiv = getDisplayDocument().getElementById("transPageDiv");
			if(!nDiv)
				nDiv = getDisplayDocument().createElement('div');
			nDiv.setAttribute('id', "transPageDiv");
			nDiv.style.position = 'absolute';
			nDiv.style.clip = clipStr;
			nDiv.style.backgroundColor = 'inherit';
			nDiv.style.backgroundImage = 'inherit';
			nDiv.style.width = fW+'px';
			nDiv.style.height = fH+'px';
			nDiv.style.zIndex = 999999;
			nDiv.style.left = left+'px';
			
			if(!nDiv.parentElementt)
				getDisplayDocument().body.appendChild(nDiv);
			
			this.TransStyObj = getDisplayDocument().getElementById("transPageDiv").style;
		}
		this.inc = (this.inc >= 1) ? parseInt(this.inc, 10) : 1;
		break;
	}
	case 1:
	if(canvas){
		this.tFunc = tr1;
		break;
	}
	else
	{
		lg = Math.max(hW,hH);
		this.inc = Math.round(lg/this.nV);
		this.lW = (hW > hH);
		cV[3] += (((cV[3]<0)?Math.abs(cV[3]):0)+hW);
		cV[1] -= hW;
		cV[0] += (((cV[0]<0)?Math.abs(cV[0]):0) + hH);
		cV[2] -= hH;
		this.clipTo(cV[0],cV[1],cV[2],cV[3])
		this.show()
		this.tFunc = tr02;
		this.inc = (this.inc >= 1) ? parseInt(this.inc, 10) : 1;
		break;
	}
    case 2:
	if(canvas){
		this.tFunc = tr2;
		break;
	}
    case 3:
	if(canvas){
		this.tFunc = tr3;
		break;
	}
	case 12:
	if(canvas){
		this.sRndArry(this.iw?this.iw:this.oR, this.ih?this.ih:this.oB);
		this.saveXValue = 0;
		this.saveYValue = 0;
		this.rowZero[0] = true;
		this.tFunc = tr12;
		break;
	}
	if(tOut){
		lg = Math.max(hW,hH);
		this.inc = Math.round(lg/this.nV);
		this.lW = (hW > hH);
		this.tFunc = tr01;
	}else{
		lg = Math.max(hW,hH);
		this.inc = Math.round(lg/this.nV);
		this.lW = (hW > hH);
		cV[3] += hW;
		cV[1] -= hW;
		cV[0] += hH;
		cV[2] -= hH;
		this.clipTo(cV[0],cV[1],cV[2],cV[3])
		this.show()
		this.tFunc = tr02;
	}
	this.inc = (this.inc >= 1) ? parseInt(this.inc, 10) : 1;
	break;

    case 4:
	if(tOut){
		this.inc = fH/this.nV;
		this.inc = (this.inc >= 1) ? parseInt(this.inc, 10) : 1;
	}else{
		this.inc = -fH/this.nV;
		this.inc = (this.inc <= -1) ? parseInt(this.inc, 10) : -1;
		cV[0] = cV[2];
	}
	this.tFunc = tr4;			
	this.clipTo(cV[0],cV[1],cV[2],cV[3])
	this.show()
	break;

    case 5:
	if(tOut){
		this.inc = -fH/this.nV;
		this.inc = (this.inc <= -1) ? parseInt(this.inc, 10) : -1;
	}else{
		this.inc = fH/this.nV;
		this.inc = (this.inc >= 1) ? parseInt(this.inc, 10) : 1;
		cV[2] = cV[0];
	}
	this.tFunc = tr5;
	this.clipTo(cV[0],cV[1],cV[2],cV[3])
	this.show()
	break;

    case 6:
	if(tOut){
		this.inc = -fW/this.nV;
		this.inc = (this.inc <= -1) ? parseInt(this.inc, 10) : -1;
	}else{
		this.inc = fW/this.nV;
		this.inc = (this.inc >= 1) ? parseInt(this.inc, 10) : 1;
		cV[1] = cV[3];
	}
	this.tFunc = tr6;
	this.clipTo(cV[0],cV[1],cV[2],cV[3])
	this.show()
	break;

    case 7:
	if(tOut){
		this.inc = fW/this.nV;
		this.inc = (this.inc >= 1) ? parseInt(this.inc, 10) : 1;
	}else{
		this.inc = -fW/this.nV;
		this.inc = (this.inc <= -1) ? parseInt(this.inc, 10) : -1;
		cV[3] = cV[1];
	}
	this.tFunc = tr7;
	this.clipTo(cV[0],cV[1],cV[2],cV[3])
	this.show()
	break;

    case 22:
	if(canvas){
		this.sRndArry( this.iw?this.iw:this.oR, 0 );
		this.tFunc = tr22;
		break;
	}
    case 8:
	if(canvas){
		this.tFunc = tr9;
		break;
	}
    case 10:
	if(canvas){
		this.tFunc = tr10;
		break;
	}	
    case 13:
	if(canvas){
		this.tFunc = tr13;
		break;
	}
    case 14:
	if(tOut){
		if(canvas){
			this.tFunc = tr14;
			break;
		}
		this.inc = hW/this.nV;
		this.tFunc = tr013;
	}else{
		this.inc = hW/this.nV;
		if(cV[3]<0)
		{
			cV[1] +=cV[3];
			cV[3] = 0;
		}
		cV[3] += hW;
		cV[1] -= hW;
		this.clipTo(cV[0],cV[1],cV[2],cV[3])
		this.tFunc = tr014;
	}
	this.show()
	this.inc = (this.inc >= 1) ? parseInt(this.inc, 10) : 1;
	break;

    case 21:
	if(canvas){
		this.sRndArry( 0, this.ih?this.ih:this.oB );
		this.tFunc = tr21;
		break;
	}
    case 9:
	if(canvas){
		this.tFunc = tr9;
		break;
	}
    case 11:
	if(canvas){
		this.tFunc = tr11;
		break;
	}
    case 15:
	if(canvas){
		this.tFunc = tr15;
		break;
	}
    case 16:		
	if(tOut){
		if(canvas){
			this.tFunc = tr16;
			break;
		}
		this.inc = hH/this.nV;
		this.tFunc = tr015;
	}else{
		this.inc = hH/this.nV;
		if(cV[0]<0)
		{
			cV[2] +=cV[0];
			cV[0] = 0;
		}
		cV[0] += hH;
		cV[2] -= hH;
		this.clipTo(cV[0],cV[1],cV[2],cV[3])
		this.tFunc = tr016;
	}
	this.show()
	this.inc = (this.inc >= 1) ? parseInt(this.inc, 10) : 1;
	break;

    case 17:
	if(canvas){
		this.tFunc = tr17;
		break;
	}
	iW = fW/this.nV;
	this.incW = (iW >= 1) ? parseInt(iW, 10) : 1;
	this.xPW = Math.round((iW - this.incW) * this.nV);
	iH = fH/this.nV;
	this.incH = (iH >= 1) ? parseInt(iH, 10) : 1;
	this.xPH = Math.round((iH - this.incH) * this.nV);
	this.tFunc = tr017;
	if(!tOut){
		this.incW *= -1
		this.incH *= -1
		cV[3] = cV[1]
		cV[2] = cV[0]
		this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}
	this.show()
	break;
		
    case 18:
	if(canvas){
		this.tFunc = tr18;
		break;
	}
	iW = fW/this.nV;
	this.incW = (iW >= 1) ? parseInt(iW, 10) : 1;
	this.xPW = Math.round((iW - this.incW) * this.nV);
	iH = fH/this.nV;
	this.incH = (iH >= 1) ? parseInt(iH, 10) : 1;
	this.xPH = Math.round((iH - this.incH) * this.nV);
	if(!tOut){
		this.incW *= -1
		this.incH *= -1
		cV[3] = cV[1]
		cV[0] = cV[2]
		this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}
	this.tFunc = tr018;
	this.show()
	break;

    case 19:
	if(canvas){
		this.tFunc = tr19;
		break;
	}
	iW = fW/this.nV;
	this.incW = (iW >= 1) ? parseInt(iW, 10) : 1;
	this.xPW = Math.round((iW - this.incW) * this.nV);
	iH = fH/this.nV;
	this.incH = (iH >= 1) ? parseInt(iH, 10) : 1;
	this.xPH = Math.round((iH - this.incH) * this.nV);
	if(!tOut){
		this.incW *= -1
		this.incH *= -1
		cV[1] = cV[3]
		cV[2] = cV[0]
		this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}
	this.tFunc = tr019;
	this.show()
	break;

    case 20:
	if(canvas){
		this.tFunc = tr20;
		break;
	}
	iW = fW/this.nV;
	this.incW = (iW >= 1) ? parseInt(iW, 10) : 1;
	this.xPW = Math.round((iW - this.incW) * this.nV);
	iH = fH/this.nV;
	this.incH = (iH >= 1) ? parseInt(iH, 10) : 1;
	this.xPH = Math.round((iH - this.incH) * this.nV);
	if(!tOut){
		this.incW *= -1
		this.incH *= -1
		cV[1] = cV[3]
		cV[0] = cV[2]
		this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}
	this.tFunc = tr020;
	this.show()
	break;
	
	case 34:
	if(!tOut){
		setOpacity(this.getEle("div"), 0, true);
	}

	this.tFunc = tr34;
	this.nV /= 10;
	break;
	
	case 35:
	case 36:
	case 37:
	case 38:
	this.oL=parseInt(this.getEle("div").style.left, 10);
	this.oT=parseInt(this.getEle("div").style.top, 10);
	if(!tOut){
		setOpacity(this.getEle("div"), 0, true);
	}
	this.nV /= 2;
	this.tFunc = tr35;
	if(tNum>=37) this.tFunc = tr37;
	break;
	}
	var _this=this;
	this.tT = getDisplayWindow().setInterval( function(){_this.tFunc();},intval)
}

function ObjLayerGrowTo(ew,eh,spd,fn,po,eff) {
	if(po) this.po = po
	this.unique++
	if(this.growActive) { setTimeout(this.obj+".growTo("+ew+","+eh+","+spd+",\""+fn+"\",0,"+eff+")",20); return;}
	if(ew==null) ew = this.po.w
	if(eh==null) eh = this.po.h
	var dw = ew-this.po.w
	var dh = eh-this.po.h
	this.growStart(ew,eh,dw,dh,spd,fn,eff)
}

function ObjLayerGrowStart(ew,eh,dw,dh,spd,fn,eff) {
	if(this.growActive) return
	if(!spd) spd = 10
	var num = Math.max(1,((12-spd) * 40));
	if(num==0){ 
		if(fn) eval(fn) 
		return 
	}
	this.cx = parseInt(this.x+this.po.w/2,10);
	this.cy = parseInt(this.y+this.po.h/2,10);
	if(eff==undefined) eff = 1;	
	if(!fn) fn = null
	this.growActive = true
	this.grow(this.po.w,this.po.h,dw,dh,num,0,spd,fn,this.unique,eff)
}

function ObjLayerGrow(iw,ih,dw,dh,num,i,spd,fn,u,eff) {
	if(!this.growActive) return
	if((i++ < num) && (u==this.unique)){
		var nw=parseInt(ease(eff,0,i,iw,dw,num),10);
		var nh=parseInt(ease(eff,0,i,ih,dh,num),10);
		this.moveTo(this.cx-nw/2,this.cy-nh/2);
		this.po.sizeTo(nw,nh);
		if(this.growActive) setTimeout(this.obj+".grow("+iw+","+ih+","+dw+","+dh+","+num+","+i+","+spd+",\""+fn+"\","+u+","+eff+")",spd)
	}else{
		this.growActive = false;
		this.moveTo(this.cx-(iw+dw)/2,this.cy-(ih+dh)/2);
		this.po.sizeTo(iw+dw,ih+dh);
		if(fn) eval(fn);
	}
}
//0 - Box In
function tr0(){
	dX = Math.round(this.iw * this.currTrans / this.nV / 2);
	dY = Math.round(this.ih * this.currTrans / this.nV / 2);
	var ctx = this.canvas.getContext('2d');
	if(this.tOut) ctx.globalCompositeOperation = 'destination-out';
	if(dX>0&&dY>0)
	{
		if(this.tOut){
			ctx.beginPath();
			ctx.rect(0,0,dX,this.ih);
			ctx.rect(dX,0,this.iw-2*dX,dY);
			ctx.rect(this.iw-dX,0,dX,this.ih);
			ctx.rect(dX,this.ih-dY,this.iw-2*dX,dY);
			ctx.fill();
		}else{
			var cv = createCanvas(this);
			ctx = cv.getContext('2d');		
			ctx.globalAlpha = this.theObj.opacity / 100.0;
			ctx.drawImage(this.img,0,0,dX,this.ih,0,0,dX,this.ih);
			if(this.iw-2*dX > 0) ctx.drawImage(this.img,dX,0,this.iw-2*dX,dY,dX,0,this.iw-2*dX,dY);
			ctx.drawImage(this.img,this.iw-dX,0,dX,this.ih,this.iw-dX,0,dX,this.ih);
			if(this.iw-2*dX > 0) ctx.drawImage(this.img,dX,this.ih-dY,this.iw-2*dX,dY,dX,this.ih-dY,this.iw-2*dX,dY);
			
			this.getEle("div").appendChild( cv );
			this.getEle("div").removeChild( this.canvas );
			this.canvas = cv;
		}
	}
	checkDone( this );
}
//1 - Box Out
function tr1(){
	dX = Math.round(this.iw * this.currTrans / this.nV);
	dY = Math.round(this.ih * this.currTrans / this.nV);
	var ctx = this.canvas.getContext('2d');
	if(dX>0&&dY>0){
		if(this.tOut){
			ctx.globalCompositeOperation = 'destination-out';
			ctx.beginPath();
			ctx.rect(this.iw/2-dX/2,this.ih/2-dY/2,dX,dY);
			ctx.fill();
		}else{
			ctx.globalCompositeOperation = 'destination-atop';
			ctx.globalAlpha = this.theObj.opacity / 100.0;
			ctx.drawImage(this.img,this.iw/2-dX/2,this.ih/2-dY/2,dX,dY,this.iw/2-dX/2,this.ih/2-dY/2,dX,dY);
		}
	}
	checkDone( this );
}
//01 - Legacy Box In
function tr01(){
	var cV = gCV(this.styObj.clip, this)
	if(this.lW){
		cV[3] += this.inc;
		cV[1] -= this.inc;
		if(cV[2]-cV[0] >= cV[1]-cV[3]){	
			cV[0] += this.inc;
			cV[2] -= this.inc;
		}
	}else{
		cV[0] += this.inc;
		cV[2] -= this.inc;
		if(cV[1]-cV[3] >= cV[2]-cV[0]){
			cV[3] += this.inc;
			cV[1] -= this.inc;
		}
	}
	if(cV[2]<=cV[0] && cV[1]<=cV[3]) this.hideIt();
	else this.clipTo(cV[0],cV[1],cV[2],cV[3])
}

//01 - Legacy Box In -- LHD Bug 21517
function tr01BXI(){
	var cV;
	if(this.TransStyObj)
		cV = gCV(this.TransStyObj.clip, this)
	else
		cV = gCV(this.styObj.clip, this)
	if(this.lW){
		cV[3] += this.inc;
		cV[1] -= this.inc;
		if(cV[2]-cV[0] >= cV[1]-cV[3]){	
			cV[0] += this.inc;
			cV[2] -= this.inc;
		}
	}else{
		cV[0] += this.inc;
		cV[2] -= this.inc;
		if(cV[1]-cV[3] >= cV[2]-cV[0]){
			cV[3] += this.inc;
			cV[1] -= this.inc;
		}
	}
	if(cV[2]<=cV[0] && cV[1]<=cV[3]) this.showIt();
	else
	{
		if(this.TransStyObj)
			this.TransStyObj.clip = "rect("+cV[0]+"px "+cV[1]+"px "+cV[2]+"px "+cV[3]+"px)"
		else
			this.clipTo(cV[0],cV[1],cV[2],cV[3])
		
	}
		
}

//02 - Legacy Box Out
function tr02(){
	var cV = gCV(this.styObj.clip, this)
	if(this.lW){
		if(cV[3] <= this.oL){
			cV[3] = this.oL;
			cV[1] = this.oR;
		}else {
			cV[3] -= this.inc;
			cV[1] += this.inc;
		}
		if(cV[2]-cV[0] <= cV[1]-cV[3]){
			if(cV[0] <= this.oT){
			cV[0] = this.oT;
			cV[2] = this.oB;		
			}else {
			cV[0] -= this.inc;
			cV[2] += this.inc;
			}
		}
	}else{
		if(cV[0] <= this.oT){
			cV[0] = this.oT;
			cV[2] = this.oB;		
		}else {
			cV[0] -= this.inc;
			cV[2] += this.inc;
		}
		if(cV[1]-cV[3] <= cV[2]-cV[0]){
			if(cV[3] <= this.oL){
				cV[3] = this.oL;
				cV[1] = this.oR;
			}else {
				cV[3] -= this.inc;
				cV[1] += this.inc;
			}
		}
	}
	if(cV[0]==this.oT&&cV[3]== this.oL){
			getDisplayWindow().clearInterval(this.tT);
			this.tTrans = -1;
			eval(this.transFn)
			if(this.tOut)
				this.hideIt();
		}
	else if(cV[0]==this.oT&&cV[3]!= this.oL)
	{
		cV[0]=this.oT+((this.inc<0)?-1*this.inc:this.inc);
	}
	this.clipTo(cV[0],cV[1],cV[2],cV[3])
	
	if(this.tTrans==-1)
	{
		setTransForEffect(this);
		IEClipCorrection(this);
		this.bInTrans = false;
	}	
}

//2 - Circle in:
function tr2(){
	var rad = Math.max(this.iw,this.ih)/2 - Math.floor(Math.max(this.iw,this.ih)/2 * this.currTrans / this.nV);
	if(rad>0){
		var cv = createCanvas(this);
		var ctx = cv.getContext('2d');
		if(this.tOut){
			ctx.beginPath();
			ctx.arc(this.iw/2, this.ih/2, rad, 0, 2 * Math.PI, false);
			ctx.clip();
			ctx.drawImage(this.img,0,0);
		}else{
			ctx.globalAlpha = this.theObj.opacity / 100.0;	//set the opacity for the image.
			ctx.drawImage(this.img,0,0);
			ctx.globalAlpha = 1;	//set the opacity back to fully opaque for the circle.
			ctx.globalCompositeOperation = 'destination-out';
			ctx.beginPath();
			ctx.arc(this.iw/2, this.ih/2, rad, 0, 2 * Math.PI, false);
			ctx.fill();
		}

		this.getEle("div").appendChild( cv );
		this.getEle("div").removeChild( this.canvas );
		this.canvas = cv;
	}
	if(this.iw>0&&rad <=1) this.currTrans = this.nV;
	checkDone( this );
}
//3 - Circle Out:
function tr3(){
	var rad = Math.floor(Math.max(this.iw,this.ih)/2 * this.currTrans / this.nV);
	var ctx = this.canvas.getContext('2d');
	if(this.tOut) ctx.globalCompositeOperation = 'destination-out';
	if(rad>0){
		ctx.beginPath();
		ctx.arc(this.iw/2, this.ih/2, rad, 0, 2 * Math.PI, false);
		if(this.tOut) ctx.fill();
		else{
			ctx.save();
			ctx.clip();
			ctx.globalCompositeOperation = 'destination-atop';
			ctx.globalAlpha = this.theObj.opacity / 100.0;
			ctx.drawImage(this.img,0,0);
			ctx.restore();
		}
	}
	if(2*rad >= Math.max(this.iw,this.ih)) this.currTrans = this.nV;
	checkDone( this );
}

//4 - WIPE UP
function tr4(){
	var cV = gCV(this.styObj.clip, this)
	if(this.inc < 0){
		cV[0] += this.inc;
		if(cV[0] <= this.oT){
			getDisplayWindow().clearInterval(this.tT);
			this.tTrans = -1;
			eval(this.transFn)
		}
		this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}else{
		cV[2] -= this.inc;
		if(cV[2] <= 0) 
		this.hideIt();
		else 
		this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}
	
	if(this.tTrans==-1)
	{
		setTransForEffect(this);
		IEClipCorrection(this);
		this.bInTrans = false;
	}	
}

//5 - WIPE DOWN:
function tr5(){
	var cV = gCV(this.styObj.clip)
	if(this.inc < 0){	
		cV[0] -= this.inc;
		if(cV[0] >= cV[2]) this.hideIt();
		else this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}else{
		cV[2] += this.inc;
		if(cV[2] >= this.oB){
			getDisplayWindow().clearInterval(this.tT);
			this.tTrans = -1;
			eval(this.transFn)
		}
		this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}
	
	if(this.tTrans==-1)
	{
		setTransForEffect(this);
		IEClipCorrection(this);
		this.bInTrans = false;
	}
}

//6 - WIPE RIGHT:
function tr6(){
	var cV = gCV(this.styObj.clip, this)
	if(this.inc < 0){
		cV[3] -= this.inc;
		if(cV[3] >= cV[1])	this.hideIt();
		else this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}else{
		cV[1] += this.inc;
		if(cV[1] >= this.oR){
			getDisplayWindow().clearInterval(this.tT);
			this.tTrans = -1;
			eval(this.transFn)
		}
		this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}
	
	if(this.tTrans==-1)
	{
		setTransForEffect(this);
		IEClipCorrection(this);
		this.bInTrans = false;
	}	
}

//7 - WIPE LEFT:
function tr7(){
	var cV = gCV(this.styObj.clip)
	if(this.inc < 0){
		cV[3] += this.inc;
		if(cV[3] <= this.oL){
			getDisplayWindow().clearInterval(this.tT);
			this.tTrans = -1;
			eval(this.transFn)
		}
		this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}else{
		cV[1] -= this.inc;
		if(cV[1] <= cV[3]) this.hideIt();
		else this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}
	
	if(this.tTrans==-1)
	{
		setTransForEffect(this);
		IEClipCorrection(this);
		this.bInTrans = false;
	}	
}

//transition 8,9 - Blinds:
function tr9(){
	var maxStrip = 6;
	var dim=this.tNum==8?this.iw:this.ih;
	var dN = Math.round(this.currTrans * dim / this.nV / maxStrip);
	if(dN){
		var work =dim / maxStrip;
		var ctx = 0;
		var cv = 0;
		if(this.tOut){
			ctx = this.canvas.getContext('2d');
			ctx.globalCompositeOperation = 'destination-out';
		}else{
			cv = createCanvas(this);
			ctx = cv.getContext('2d');
		}
		
		if(ctx)
			ctx.globalAlpha = this.theObj.opacity / 100.0;
		
		for(idx=0; idx<maxStrip; idx++){
			if(this.tOut){
				ctx.beginPath();
				if(this.tNum==8) ctx.rect(work*idx,0,dN,this.ih);
				else ctx.rect(0,work*idx,this.iw,dN);
				ctx.fill();
			}else{
				if(this.tNum==8) ctx.drawImage(this.img,work*idx,0,dN,this.ih,work*idx,0,dN,this.ih);
				else ctx.drawImage(this.img,0,work*idx,this.iw,dN,0,work*idx,this.iw,dN);
			}
		}
		if(!this.tOut){
			this.getEle("div").appendChild( cv );
			this.getEle("div").removeChild( this.canvas );
			this.canvas = cv;
		}
	}
	checkDone( this );
}

//10 - CHECKERBOARD ACROSS
function tr10(){
	var maxChk = 12;
	var dX = Math.round((2 * this.currTrans * this.iw + maxChk - 1) / this.nV / maxChk);
	var dY = Math.round((this.ih + maxChk - 1) / maxChk);
	if(dX){
		var workX = Math.round((this.iw + maxChk - 1) / maxChk);
		var workY = Math.round((2 * this.ih + maxChk - 1) / maxChk);
		var cv = 0;
		var ctx = 0;
		if(this.tOut){
			ctx = this.canvas.getContext('2d');
			ctx.globalCompositeOperation = 'destination-out';
		}else{
			cv = createCanvas(this);
			ctx = cv.getContext('2d');
		}
		
		if(ctx)
			ctx.globalAlpha = this.theObj.opacity / 100.0;
		
		for(idx = 0; idx < maxChk; idx++){
			for(idx2 = 0; idx2 < maxChk; idx2++){
				var startX = workX*idx2>this.iw-1?this.iw-1:workX*idx2;
				var startY = workY*idx;
				var limX = dX;
				var limY = dY;
				if(idx2 & 1) startY += Math.round(workY / 2);
				if( startY>this.ih-1) startY=this.ih-1;
				if(this.tOut){
					ctx.beginPath();
					ctx.rect(startX,startY,limX,dY);
					ctx.fill();
				}else 
				{
					var startXShift = startX+limX>this.iw-1?this.iw-1-startX:limX;
					var startYShift = startY+dY>this.ih-1?this.ih-startY:dY;
					ctx.drawImage(this.img,startX,startY,startX+dX>this.iw-1?this.iw-startX:dX,startY+limY>this.ih-1?this.ih-startY:limY,startX,startY,startX+dX>this.iw-1?this.iw-1-startX:dX,startY+limY>this.ih-1?this.ih-1-startY:limY);
				}
			}
		}
		if(!this.tOut){
			this.getEle("div").appendChild( cv );
			this.getEle("div").removeChild( this.canvas );
			this.canvas = cv;
		}
	}
	checkDone(this);
}

//11 - CHECKERBOARD DOWN
function tr11(){
	var maxChk = 12;
	var dX = Math.round((this.iw + maxChk - 1) / maxChk);
	var dY = Math.round((2 * this.currTrans * this.ih + maxChk - 1) / this.nV / maxChk);
	if(dY){
		var workX = Math.round((2 * this.iw + maxChk - 1) / maxChk);
		var workY = Math.round((this.ih + maxChk - 1) / maxChk);
		var cv = 0;
		var ctx = 0;
		if(this.tOut){
			ctx = this.canvas.getContext('2d');
			ctx.globalCompositeOperation = 'destination-out';
		}else{
			cv = createCanvas(this);
			ctx = cv.getContext('2d');
		}
		
		if(ctx)
			ctx.globalAlpha = this.theObj.opacity / 100.0;
		
		for(idx = 0; idx < maxChk; idx++){
			for(idx2 = 0; idx2 < maxChk; idx2++){
				var startX = workX*idx;
				var startY = workY*idx2>this.ih-1?this.ih-1:workY*idx2;
				var limY   = dY;
				if(idx2 & 1) startX += workX / 2;
				if( startX>this.iw-1) startX=this.iw-1;
				if(this.tOut){
					ctx.beginPath();
					ctx.rect(startX,startY,dX,limY);
					ctx.fill();
				}else ctx.drawImage(this.img,startX,startY,startX+dX>this.iw-1?this.iw-startX:dX,startY+limY>this.ih-1?this.ih-startY:limY,startX,startY,startX+dX>this.iw-1?this.iw-1-startX:dX,startY+limY>this.ih-1?this.ih-1-startY:limY);
			}
		}
		if(!this.tOut){
			this.getEle("div").appendChild( cv );
			this.getEle("div").removeChild( this.canvas );
			this.canvas = cv;
		}
	}
	checkDone(this);
}

//12 - DISSOLVE
function tr12(){
	var dX = Math.round((this.iw * this.ih + this.nV - 1)/ this.nV);
	ctx = this.canvas.getContext('2d');
	if(this.tOut) ctx.globalCompositeOperation = 'destination-out';
	ctx.globalAlpha = this.theObj.opacity / 100.0;
	while(dX){
		if(this.tOut){
			ctx.beginPath();
			ctx.rect(this.randX[this.saveXValue],this.randY[this.saveYValue],1,1);
			ctx.fill();
		}else ctx.drawImage(this.img,this.randX[this.saveXValue],this.randY[this.saveYValue],1,1,this.randX[this.saveXValue],this.randY[this.saveYValue],1,1);
		dX--;
		if(++this.saveXValue >= this.iw)
			this.saveXValue = 0;
		if(++this.saveYValue >= this.ih){
			this.saveYValue = 0;
			if(++this.saveXValue >= this.iw)
				this.saveXValue = 0;
			var bReset = true;
			while(this.rowZero[this.saveXValue]){
				if(++this.saveXValue >= this.iw){
					this.saveXValue = 0;
					if(!bReset) break;
					bReset = false;
				}
			}
			this.rowZero[this.saveXValue] = true;
		}
	}
	checkDone(this);
}

//13 - SPLIT VERTICAL IN
function tr13(){
	var dX = this.iw-Math.round(this.iw*this.currTrans/this.nV);
	if(dX){
		var cv = 0;
		var ctx = 0;
		if(this.tOut){
			ctx = this.canvas.getContext('2d');
			ctx.globalCompositeOperation = 'destination-out';
			ctx.beginPath();
			ctx.rect(0,0,(this.iw-dX)/2,this.ih);
			ctx.fill();
			ctx.rect(this.iw-(this.iw-dX)/2,0,(this.iw-dX)/2,this.ih);
		}else{
			cv = createCanvas(this);
			ctx = cv.getContext('2d');
			ctx.globalAlpha = this.theObj.opacity / 100.0;	//set the opacity to draw the image
			ctx.drawImage(this.img,0,0);
			ctx.globalAlpha = 1;	//change the opacity back to fully opaque to draw the rects. 
			ctx.globalCompositeOperation = 'destination-out';
			ctx.beginPath();
			ctx.rect(this.iw/2-dX/2,0,dX,this.ih);
		}
		ctx.fill();
		if(!this.tOut){
			this.getEle("div").appendChild( cv );
			this.getEle("div").removeChild( this.canvas );
			this.canvas = cv;
		}
	}
	checkDone(this);
}

function tr013(){
	var cV = gCV(this.styObj.clip, this)
	cV[3] += this.inc;
	cV[1] -= this.inc;
	if(cV[1]<=cV[3]) this.hideIt();
	else this.clipTo(cV[0],cV[1],cV[2],cV[3])
}

//14 - SPLIT VERTICAL OUT
function tr14(){
	var dX = Math.round(this.iw*this.currTrans/this.nV);
	if(dX){
		var ctx = this.canvas.getContext('2d');
		ctx.globalCompositeOperation = 'destination-out';
		ctx.beginPath();
		ctx.rect(this.iw/2-dX/2,0,dX,this.ih);
		ctx.fill();
	}
	checkDone(this);
}

function tr014(){
	var cV = gCV(this.styObj.clip, this)
	if(this.oL >= 0 && cV[3] <= this.inc){
		cV[3] = this.oL;
		cV[1] = this.oR;
		getDisplayWindow().clearInterval(this.tT);
		this.tTrans = -1;
		eval(this.transFn)
	}else if(this.oL < 0 && cV[3] ==this.oL)
	{
		cV[3] = this.oL;
		cV[1] = this.oR;
		getDisplayWindow().clearInterval(this.tT);
		this.tTrans = -1;
		eval(this.transFn)
	}
	else{
		cV[3]  = cV[3] - this.inc;
		cV[1]  = cV[1] + this.inc;
	}
	this.clipTo(cV[0],cV[1],cV[2],cV[3])
	
	if(this.tTrans==-1)
	{
		setTransForEffect(this);
		IEClipCorrection(this);
		this.bInTrans = false;
	}	
}

//15 - SPLIT HORIZONTAL IN
function tr15(){
	var dY = this.ih-Math.round(this.ih*this.currTrans/this.nV);
	if(dY){
		var cv = 0;
		var ctx = 0;
		if(this.tOut){
			ctx = this.canvas.getContext('2d');
			ctx.globalCompositeOperation = 'destination-out';
			ctx.beginPath();
			ctx.rect(0,0,this.iw,(this.ih-dY)/2);
			ctx.fill();
			ctx.rect(0,this.ih-(this.ih-dY)/2,this.iw,(this.ih-dY)/2);
		}else{
			cv = createCanvas(this);
			ctx = cv.getContext('2d');
			ctx.globalAlpha = (this.theObj.opacity / 100.0);	//Set the opacity to draw the image.
			ctx.drawImage(this.img,0,0);
			ctx.globalAlpha = 1;		//Set the opacity back to fully opaque to draw the rects.
			ctx.globalCompositeOperation = 'destination-out';
			ctx.beginPath();
			ctx.rect(0,this.ih/2-dY/2,this.iw,dY);
		}
		ctx.fill();
		if(!this.tOut){
			this.getEle("div").appendChild( cv );
			this.getEle("div").removeChild( this.canvas );
			this.canvas = cv;
		}
	}
	checkDone(this);
}

function tr015(){
	var cV = gCV(this.styObj.clip, this)
	cV[0] += this.inc;
	cV[2] -= this.inc;
	if(cV[2]<=cV[0]) this.hideIt();
	else this.clipTo(cV[0],cV[1],cV[2],cV[3])
}

//16 SPLIT HORIZONTAL OUT
function tr16(){
	var dY = Math.round(this.ih*this.currTrans/this.nV);
	if(dY){
		var ctx = this.canvas.getContext('2d');
		ctx.globalCompositeOperation = 'destination-out';
		ctx.beginPath();
		ctx.rect(0,this.ih/2-dY/2,this.iw,dY);
		ctx.fill();
	}
	checkDone(this);
}

function tr016(){
	var cV = gCV(this.styObj.clip, this)
	if(this.oT >= 0 && cV[0] <= this.inc){
		cV[0] = this.oT;
		cV[2] = this.oB;
		getDisplayWindow().clearInterval(this.tT);
		this.tTrans = -1;
		eval(this.transFn)
	}
	else if(this.oT < 0 && cV[0] !=this.oT)
	{
		cV[0] -= this.inc;
		cV[2] += this.inc;
	}
	else if(this.oT < 0 && cV[0] ==this.oT)
	{
		cV[0] = this.oT;
		cV[2] = this.oB;
		getDisplayWindow().clearInterval(this.tT);
		this.tTrans = -1;
		eval(this.transFn)
	}
	else
	{
		cV[0] -= this.inc;
		cV[2] += this.inc;
	}
	this.clipTo(cV[0],cV[1],cV[2],cV[3])
	
	if(this.tTrans==-1)
	{
		setTransForEffect(this);
		IEClipCorrection(this);
		this.bInTrans = false;
	}
}

//17 STRIPS LEFT DOWN
function tr17(){
	var dX=Math.round((this.iw+this.ih)*this.currTrans/this.nV);
	var workX = 0;
	var ctx = 0;
	var cv = 0;
	if(this.tOut){
		ctx = this.canvas.getContext('2d');
		ctx.globalCompositeOperation = 'destination-out';
	}else{
		cv = createCanvas(this);
		ctx = cv.getContext('2d');
	}
	
	if(ctx)
		ctx.globalAlpha = (this.theObj.opacity / 100.0);
	
	while(workX<dX){
		if(this.tOut){
			ctx.beginPath();
			ctx.rect(this.iw-dX+workX,workX,dX-workX,1);
			ctx.fill();
		}else ctx.drawImage(this.img,this.iw-dX+workX>0?this.iw-dX+workX:0,workX<this.ih-1?workX:this.ih-1,dX-workX>this.iw?this.iw:dX-workX,1,this.iw-dX+workX>0?this.iw-dX+workX:0,workX<this.ih-1?workX:this.ih-1,dX-workX>this.iw?this.iw:dX-workX,1);
		workX++;
	}
	if(!this.tOut){
		this.getEle("div").appendChild( cv );
		this.getEle("div").removeChild( this.canvas );
		this.canvas = cv;
	}
	checkDone(this);
}

function tr017(){
	var cV = gCV(this.styObj.clip, this)
	if(this.incW < 0 || this.incH < 0){
		if(this.xPW > 0){
			if(this.xPW <= this.nV){
				if(this.aW){
					cV[3]--;
					this.xPW--;
				}
				this.aW = !this.aW;
			}else{
				cV[3]--;
				this.xPW--;
			}
		}
		cV[3] += this.incW;
		if(this.xPH > 0){
			if(this.xPH <= this.nV){
				if(this.aH){
					cV[2]++;
					this.xPH--;
				}
				this.aH = !this.aH;
			}else{
				cV[2]++;
				this.xPH--;
			}
		}
		cV[2] -= this.incH;
		this.nV--;
		if(cV[2] == this.oB && cV[3] == this.oL){
			getDisplayWindow().clearInterval(this.tT);
			this.tTrans = -1;
			eval(this.transFn)
		}
		else if(cV[2] == this.oB && cV[3] != this.oL)
		{
			cV[2] = this.oB+((this.incH>0)?-1*this.incH:this.incH);
		}
		else if(cV[2] != this.oB && cV[3] == this.oL)
		{
			cV[3] = this.oL+((this.incW<0)?-1*this.incW:this.incW);
		}
		this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}else{
		if(this.xPW > 0){
			if(this.xPW <= this.nV){
				if(this.aW){
					cV[1]--;
					this.xPW--;
				}
				this.aW = !this.aW;
			}else{
				cV[1]--;
				this.xPW--;
			}
		}
		cV[1] -= this.incW;
		if(this.xPH > 0){
			if(this.xPH <= this.nV){
				if(this.aH){
					cV[0]++;
					this.xPH--;
				}
				this.aH = !this.aH;
			}else{
				cV[0]++;
				this.xPH--;
			}
		}
		cV[0] += this.incH;
		this.nV--;
		if(cV[2]<=cV[0] && cV[1]<=cV[3]) 
		this.hideIt();
		else 
		this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}
	
	if(this.tTrans==-1)
	{
		setTransForEffect(this);
		IEClipCorrection(this);
		this.bInTrans = false;
	}
}

//18 - STRIPS LEFT UP: 
function tr18(){
	var dX=Math.round((this.iw+this.ih)*this.currTrans/this.nV);
	var workX = 0;
	var ctx = 0;
	var cv = 0;
	if(this.tOut){
		ctx = this.canvas.getContext('2d');
		ctx.globalCompositeOperation = 'destination-out';
	}else{
		cv = createCanvas(this);
		ctx = cv.getContext('2d');
	}
	
	if(ctx)
		ctx.globalAlpha = (this.theObj.opacity / 100.0);
	
	while(workX<dX){
		if(this.tOut){
			ctx.beginPath();
			ctx.rect(this.iw-dX+workX>0?this.iw-dX+workX:0,this.ih-workX-1>0?this.ih-workX-1:0,dX-workX>this.iw?this.iw:dX-workX,1,this.iw-dX+workX>0?this.iw-dX+workX:0,this.ih-workX-1>0?this.ih-workX-1:0,dX-workX>this.iw?this.iw:dX-workX,1);
			ctx.fill();
		} else ctx.drawImage(this.img,this.iw-dX+workX>0?this.iw-dX+workX:0,this.ih-workX-1>0?this.ih-workX-1:0,dX-workX>this.iw?this.iw:dX-workX,1,this.iw-dX+workX>0?this.iw-dX+workX:0,this.ih-workX-1>0?this.ih-workX-1:0,dX-workX>this.iw?this.iw:dX-workX,1);
		workX++;
	}
	if(!this.tOut){
		this.getEle("div").appendChild( cv );
		this.getEle("div").removeChild( this.canvas );
		this.canvas = cv;
	}
	checkDone(this);
}

function tr018(){
	var cV = gCV(this.styObj.clip, this)
	if(this.incW<0||this.incH<0){
		if(this.xPW > 0){
			if(this.xPW <= this.nV){
				if(this.aW){
					cV[3]--;
					this.xPW--;
				}
				this.aW = !this.aW;
			}else{
				cV[3]--;
				this.xPW--;
			}
		}
		cV[3] += this.incW;
		if(this.xPH > 0){
			if(this.xPH <= this.nV){
				if(this.aH){
					cV[0]--;
					this.xPH--;
				}
				this.aH = !this.aH;
			}else{
				cV[0]--;
				this.xPH--;
			}
		}
		cV[0] += this.incH;
		this.nV--;
		if(cV[0]==this.oT&&cV[3]== this.oL){
			getDisplayWindow().clearInterval(this.tT);
			this.tTrans = -1;
			eval(this.transFn)
		}
		else if(cV[0]==this.oT&&cV[3]!= this.oL)
		{
			cV[0]=this.oT+((this.incH<0)?-1*this.incH:this.incH);
		}
		else if(cV[0]!=this.oT&&cV[3]== this.oL)
		{
			cV[3]=this.oL+((this.incW<0)?-1*this.incW:this.incW);
		}
		this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}else{
		if(this.xPW>0){
			if(this.xPW <= this.nV){
				if(this.aW){
					cV[1]--;
					this.xPW--;
				}
				this.aW = !this.aW;
			}else{
				cV[1]--;
				this.xPW--;
			}
		}
		cV[1] -= this.incW;
		if(this.xPH > 0){
			if(this.xPH <= this.nV){
				if(this.aH){
					cV[2]--;
					this.xPH--;
				}
				this.aH = !this.aH;
			}else{
				cV[2]--;
				this.xPH--;
			}
		}
		cV[2] -= this.incH;
		this.nV--;
		if(cV[2]<=cV[0] && cV[1]<=cV[3]) 
		this.hideIt();
		else 
		this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}
	
	if(this.tTrans==-1)
	{
		setTransForEffect(this);
		IEClipCorrection(this);
		this.bInTrans = false;
	}
}

//19 - STRIPS RIGHT DOWN
function tr19(){
	var dX=Math.round((this.iw+this.ih)*this.currTrans/this.nV);
	var workX = 0;
	var ctx = 0;
	var cv = 0;
	if(this.tOut){
		ctx = this.canvas.getContext('2d');
		ctx.globalCompositeOperation = 'destination-out';
	}else{
		cv = createCanvas(this);
		ctx = cv.getContext('2d');
	}
	
	if(ctx)
		ctx.globalAlpha = (this.theObj.opacity / 100.0);
	
	while(workX<dX){
		if(this.tOut){
			ctx.beginPath();
			ctx.rect(0,workX,dX-workX,1);
			ctx.fill();
		} else ctx.drawImage(this.img,0,workX<this.ih-1?workX:this.ih-1,dX-workX>this.iw?this.iw:dX-workX,1,0,workX<this.ih-1?workX:this.ih-1,dX-workX>this.iw?this.iw:dX-workX,1);
		workX++;
	}
	if(!this.tOut){
		this.getEle("div").appendChild( cv );
		this.getEle("div").removeChild( this.canvas );
		this.canvas = cv;
	}
	checkDone(this);
}

function tr019(){
	var cV = gCV(this.styObj.clip, this)
	if(this.incW < 0 || this.incH < 0){
		if(this.xPW > 0){
			if(this.xPW <= this.nV){
				if(this.aW){
					cV[1]++;
					this.xPW--;
				}
				this.aW = !this.aW;
			}else{
				cV[1]++;
				this.xPW--;
			}
		}
		cV[1] -= this.incW;
		if(this.xPH > 0){
			if(this.xPH <= this.nV){
				if(this.aH){
					cV[2]++;
					this.xPH--;
				}
				this.aH = !this.aH;
			}else{
				cV[2]++;
				this.xPH--;
			}
		}
		cV[2] -= this.incH;
		this.nV--;
		if(cV[2] >= this.oB && cV[1] >= this.oR){
			getDisplayWindow().clearInterval(this.tT);
			this.tTrans = -1;
			eval(this.transFn)
		}
		this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}else{
		if(this.xPW > 0){
			if(this.xPW <= this.nV){
				if(this.aW){
					cV[3]++;
					this.xPW--;
				}
				this.aW = !this.aW;
			}else{
				cV[3]++;
				this.xPW--;
			}
		}
		cV[3] += this.incW;
		if(this.xPH > 0){
			if(this.xPH <= this.nV){
				if(this.aH){
					cV[0]++;
					this.xPH--;
				}
				this.aH = !this.aH;
			}else{
				cV[0]++;
				this.xPH--;
			}
		}
		cV[0] += this.incH;
		this.nV--;
		if(cV[2]<=cV[0] && cV[1]<=cV[3]) this.hideIt();
		else this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}
	
	if(this.tTrans==-1)
	{
		setTransForEffect(this);
		IEClipCorrection(this);
		this.bInTrans = false;
	}	
}

//20 - STRIPS RIGHT UP
function tr20(){
	var dX=Math.round((this.iw+this.ih)*this.currTrans/this.nV);
	var workX = 0;
	var ctx = 0;
	var cv = 0;
	if(this.tOut){
		ctx = this.canvas.getContext('2d');
		ctx.globalCompositeOperation = 'destination-out';
	}else{
		cv = createCanvas(this);
		ctx = cv.getContext('2d');
	}
	
	if(ctx)
		ctx.globalAlpha = (this.theObj.opacity / 100.0);
	
	while(workX<dX){
		if(this.tOut){
			ctx.beginPath();
			ctx.rect(0,this.ih-workX,dX-workX,1);
			ctx.fill();
		} else ctx.drawImage(this.img,0,this.ih-workX-1>0?this.ih-workX-1:0,dX-workX>this.iw?this.iw:dX-workX,1,0,this.ih-workX-1>0?this.ih-workX-1:0,dX-workX>this.iw?this.iw:dX-workX,1);
		workX++;
	}
	if(!this.tOut){
		this.getEle("div").appendChild( cv );
		this.getEle("div").removeChild( this.canvas );
		this.canvas = cv;
	}
	checkDone(this);
}

function tr020(){
	var cV = gCV(this.styObj.clip, this)
	if(this.incW < 0 || this.incH < 0){
			if(this.xPW > 0){
			if(this.xPW <= this.nV){
				if(this.aW){
					cV[1]++;
					this.xPW--;
				}
				this.aW = !this.aW;
			}else{
				cV[1]++;
				this.xPW--;
			}
		}
		cV[1] -= this.incW;
		if(this.xPH > 0){
			if(this.xPH <= this.nV){
				if(this.aH){
					cV[0]--;
					this.xPH--;
				}
				this.aH = !this.aH;
			}else{
				cV[0]--;
				this.xPH--;
			}
		}
		cV[0] += this.incH;
		this.nV--;
		if(cV[0] <= 0 && cV[1] >= this.oR){
			getDisplayWindow().clearInterval(this.tT);
			this.tTrans = -1;
			eval(this.transFn)
		}
		this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}else{
		if(this.xPW > 0){
			if(this.xPW <= this.nV){
				if(this.aW){
					cV[3]++;
					this.xPW--;
				}
				this.aW = !this.aW;
			}else{
				cV[3]++;
				this.xPW--;
			}
		}
		cV[3] += this.incW;
		if(this.xPH > 0){
			if(this.xPH <= this.nV){
				if(this.aH){
					cV[2]--;
					this.xPH--;
				}
				this.aH = !this.aH;
			}else{
				cV[2]--;
				this.xPH--;
			}
		}
		cV[2] -= this.incH;
		this.nV--;
		if(cV[2]<=cV[0] && cV[1]<=cV[3]) this.hideIt();
		else this.clipTo(cV[0],cV[1],cV[2],cV[3])
	}
	
	if(this.tTrans==-1)
	{
		setTransForEffect(this);
		IEClipCorrection(this);
		this.bInTrans = false;
	}	
}
//21 - Horizontal Bars
function tr21(){
	workY = Math.floor(this.ih * (this.currTrans - 1) / this.nV);
	dY    = Math.floor(this.ih * this.currTrans / this.nV);
	var ctx = this.canvas.getContext('2d');
	if(this.tOut) ctx.globalCompositeOperation = 'destination-out';
	ctx.globalAlpha = this.theObj.opacity / 100.0;
	while(workY < dY){
		if(this.tOut){
			ctx.beginPath();
			ctx.rect(0,this.randY[workY],this.iw,1);
			ctx.fill();
		} else ctx.drawImage(this.img,0,this.randY[workY],this.iw,1,0,this.randY[workY],this.iw,1);
		workY++;
	}
	checkDone( this );
}

//22 - Vertical Bars: 
function tr22(){
	workX = Math.floor(this.iw * (this.currTrans - 1) / this.nV);
	dX    = Math.floor(this.iw * this.currTrans / this.nV);
	var ctx = this.canvas.getContext('2d');
	if(this.tOut) ctx.globalCompositeOperation = 'destination-out';
	ctx.globalAlpha = this.theObj.opacity / 100.0;
	while(workX < dX){
		if(this.tOut){
			ctx.beginPath();
			ctx.rect(this.randX[workX],0,1,this.ih);
			ctx.fill();
		}else ctx.drawImage(this.img,this.randX[workX],0,1,this.ih,this.randX[workX],0,1,this.ih);
		workX++;		
	}
	checkDone( this );
}

//34 - FADE
function tr34(){
	var pct;
	var fixDIV = getDisplayDocument().getElementById("fixDIV");
	if(this.theObj){
		pct = (this.currTrans/this.nV) <= (this.theObj.opacity / 100.0) ? (this.currTrans/this.nV) : (this.theObj.opacity / 100.0);
		if(this.tOut) pct=(this.theObj.opacity / 100.0)-pct;
	}
	else{
		pct = (this.currTrans/this.nV);
		if(this.tOut) pct=1-pct;
	}
	setOpacity(this.getEle("div"), pct);
	setOpacity(this.getEle("reflection"), pct);
	
	if(isSinglePagePlayerAvail()&& !this.tOut && this.id.indexOf("page") > -1)
	{
		
		setOpacity(trivPlayer.inheritedDiv, pct);
		setOpacity(fixDIV,pct);
	}
	else if(this.id == "pageDIV" && !this.tOut)
	{
		setOpacity(fixDIV,pct);
		fixDIV.style.visibility = this.styObj.visibility;
	}
		
	
	checkDone(this);
}

//35,36 - FLOAT U/D
function tr35(){
	var start=this.tOut?this.oT:(this.tNum==35?this.oT+150:this.oT-150);
	var Y=ease(this.eff,this.tOut,this.currTrans,start,this.tNum==35?-150:150,this.nV);
	this.moveTo(this.oL,Y);
	var pct=ease((this.eff>=5&&this.eff<=7)?0:this.eff,this.tOut,this.currTrans,this.tOut?100:0,this.tOut?-100:100,this.nV)/100;
	if(this.theObj && pct>(this.theObj.opacity / 100.0)) pct=this.theObj.opacity / 100.0;
	else if(pct<0) pct=0;
	setOpacity(this.getEle("div"), pct);
	setOpacity(this.getEle("reflection"), pct);
	checkDone(this);
}

//37,38 - FLOAT L/R
function tr37(){
	var start=this.tOut?this.oL:(this.tNum==37?this.oL+150:this.oL-150);
	var X=ease(this.eff,this.tOut,this.currTrans,start,this.tNum==37?-150:150,this.nV);
	this.moveTo(X,this.oT);
	var pct= ease((this.eff>=5&&this.eff<=7)?0:this.eff,this.tOut,this.currTrans,this.tOut?100:0,this.tOut?-100:100,this.nV)/100;
	if(this.theObj && pct>(this.theObj.opacity / 100.0)) pct=this.theObj.opacity / 100.0;
	else if(pct<0) pct=0;
	setOpacity(this.getEle("div"), pct);
	setOpacity(this.getEle("reflection"), pct);
	checkDone(this);
}

function getRandNums(from,to){
	temp = parseInt((Math.random() * (to-from)) + (from), 10);
	while(isNaN(temp)) temp = parseInt((Math.random() * (to - from)) + (from), 10);
	return temp
}

function getLimitedRand(from, to)
{
	temp = parseInt((Math.random() * (to-from)) + (from), 10);
	while(temp == 2 || temp == 3 || temp == 8 || temp == 9 || temp == 10 || temp == 11 || temp == 12 || temp == 21 || temp == 22)
		temp = parseInt((Math.random() * (to - from)) + (from), 10);
	return temp
}

function hideIt(){
	getDisplayWindow().clearInterval(this.tT);
	this.clipTo(this.oT,this.oR,this.oB,this.oL);
	this.hide();
	this.tTrans = -1;
	eval(this.transFn);
}

function showIt(){
	getDisplayWindow().clearInterval(this.tT);
	this.clipTo(this.oT,this.oR,this.oB,this.oL);
	this.show();
	if(getDisplayDocument().getElementById("transPageDiv"))
		getDisplayDocument().body.removeChild(getDisplayDocument().getElementById("transPageDiv"));
	
	this.tTrans = -1;
	this.bInTrans = false;
	eval(this.transFn);

	IEClipCorrection(this);	
}

function ease(f,o,t,b,c,d){
	switch(f){
	case 0:  //None (linear)
		return c*t/d + b;
	case 1:  //Swing (easeInQuad,easeOutQuad)
		if(o) return c*(t/=d)*t + b;
		else return -c *(t/=d)*(t-2) + b;
	case 2:  //Steady In (easeInSine)
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	case 3:  //Steady Out (easeOutSine)
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	case 4:  //Steady Both (easeInOutSine)
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	case 5:  //Sudden In (easeInQuint)
		return c*(t/=d)*t*t*t*t + b;
	case 6:  //Sudden Out (easeOutQuint)
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	case 7:  //Sudden Both (easeInOutQuint)
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	case 8:  //Double Back (easeInBack,easeOutBack)
		var s = 1.70158;
		if(o) return c*(t/=d)*t*((s+1)*t - s) + b;
		else return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	case 9:  //Elastic (easeInElastic,easeOutElastic)
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/(a==0?1:a));
		if(o) return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;		
		else return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	case 10:  //Bounce (easeInBounce,easeOutBounce)
		if(o) return c - easeBounce (d-t, 0, c, d) + b;
		else return easeBounce(t,b,c,d);
	}
}

function easeBounce(t,b,c,d){
	if ((t/=d) < (1/2.75)) return c*(7.5625*t*t) + b;
	else if (t < (2/2.75)) return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
	else if (t < (2.5/2.75)) return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
	else return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
}

function hideEffects(lyr)
{
	setOpacity(lyr.getEle("reflection"), 0);
	lyr.eTran = 1;
}

//Fade transition for effects 
function transEffect(lyr){
	var ele = lyr.getEle("reflection");
	if(ele)
	{
		var pct=lyr.eTran/lyr.eV;
		if(lyr.tOut) pct=1-pct;
		setOpacity(ele, pct);
		checkTransComplete(lyr);
	}
	else{
		getDisplayWindow().clearInterval(lyr.eT);
		lyr.eT = -1;
		lyr.eTran = -1;
		if(!lyr.tOut)
			lyr.show();
	}
}

function checkTransComplete(lyr){
	if(++lyr.eTran>lyr.eV) 
	{
		getDisplayWindow().clearInterval(lyr.eT);
		lyr.eT = -1;
		lyr.eTran = -1;
		if(!lyr.tOut)
			lyr.show();
	}
}


function isEffectPartOfTrans(tNum)
{
	switch(tNum)
	{
		case 0:
		case 1:
	    case 2:
	    case 3:
		case 12:
	    case 4:
	    case 5:
	    case 6:
	    case 7:
	    case 22:
		case 8:
	    case 10:
	    case 13:
	    case 14:
	    case 21:
	    case 9:
	    case 11:
	    case 15:
	    case 16:		
	    case 17:
	    case 18:
	    case 19:
	    case 20:
		{
			return false;
		}
	}
	return true;
}

function TagCheck(obj)
{
	if(obj.name.indexOf("image")>-1 || obj.name.indexOf("shape")>-1 || obj.name.indexOf("button")>-1 || obj.name.indexOf("indicator")>-1)
		return true;
	else
		return false;
}

function IEClipCorrection(obj)
{
	//LD-246 IE has some issues with cliprects and Scroll bars
	if(is.ieAny)
		obj.styObj.clip ="auto";
}
