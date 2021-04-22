/**************************************************
Trivantis (http://www.trivantis.com)
**************************************************/
//functions for realtime date/time
function FormatDS( now ) 
{
	var strDate = '';	
	var strDateFmt = '';
	try { strDateFmt = trivstrDateFmt.trim(); } catch (e) { }
	if ( strDateFmt.length > 5 && strDateFmt.substring(0,5).toUpperCase() == "FUNC(" && strDateFmt.substring(strDateFmt.length-1) == ")" )
	{
		var pubFunc = strDateFmt.replace(/^FUNC\(/g,"").replace(/\)$/g,"");
		if (typeof window[pubFunc] === "function")
			strDate =  window[pubFunc](now);
	}
	else if ( strDateFmt.length > 0)
	{
		strDate = strDateFmt;

		if (strDate.search("M")>-1)
		{
			var month = now.getMonth()+1;
			if (month < 10 && strDate.search("MM")>-1)
				strDate = strDate.replace( /MM/g, ("0" + String(month)));
			else 
				strDate = strDate.replace( /MM/g, String(month));
			strDate = strDate.replace( /M/g, String(month));
		}

		if (strDate.search("D")>-1)
		{
			var date = now.getDate();
			if (date < 10 && strDate.search("DD")>-1)
				strDate = strDate.replace( /DD/g, ("0" + String(date)));
			else 
				strDate = strDate.replace( /DD/g, String(date));
			strDate = strDate.replace( /D/g, String(date));
		}

		if (strDate.search("Y")>-1)
		{
			var year = String(now.getFullYear());
			strDate = strDate.replace( /YYYY/g, String(year));
			if (strDate.search("YY")>-1 && year.length >= 4)
			{
				year = 	(year.charAt(2) + year.charAt(3));
				strDate = strDate.replace( /YY/g, String(year));
			}
		}
	}

	if (strDate.length == 0)
		strDate = GetLocaleDate(now);
	
	return strDate;
}

function FormatTS( now ) 
{
	var strTime = '';
	var strTimeFmt = '';
	try { strTimeFmt = trivstrTimeFmt.trim(); } catch (e) { }

	if ( strTimeFmt.length > 5 && strTimeFmt.substring(0,5).toUpperCase() == "FUNC(" && strTimeFmt.substring(strTimeFmt.length-1) == ")" )
	{
		var pubFunc = strTimeFmt.replace(/^FUNC\(/g,"").replace(/\)$/g,"");
		if (typeof window[pubFunc] === "function")
			strTime =  window[pubFunc](now);
	}
	else if (strTimeFmt.length > 0)
	{
		strTime = strTimeFmt;
		var bPM = false;
		var bShowAMPM = (strTime.toLowerCase().search("a")>-1);

		if ( strTime.toLowerCase().search("h")>-1 )
		{
			var hours24 = now.getHours();
			bPM = ( hours24>=12 );
			var hours12 = hours24;
			if ( hours12>12 )
				hours12 -= 12;
			else if (hours12==0 )
				hours12 = 12;
			if (hours12 < 10 && strTime.search("hh")>-1)
				strTime = strTime.replace( /hh/g, ("0" + String(hours12)));
			else 
				strTime = strTime.replace( /hh/g, String(hours12));
			strTime = strTime.replace( /h/g, String(hours12));
			if (hours24 < 10 && strTime.search("HH")>-1)
				strTime = strTime.replace( /HH/g, ("0" + String(hours24)));
			else 
				strTime = strTime.replace( /HH/g, String(hours24));
			strTime = strTime.replace( /H/g, String(hours24));
		}

		if (strTime.search("m")>-1)
		{
			var minutes = now.getMinutes();
			if (minutes < 10 && strTime.search("mm")>-1)
				strTime = strTime.replace( /mm/g, ("0" + String(minutes)));
			else 
				strTime = strTime.replace( /mm/g, String(minutes));
			strTime = strTime.replace( /m/g, String(minutes));
		}

		if (strTime.search("s")>-1)
		{
			var seconds = now.getSeconds();
			if (seconds < 10 && strTime.search("ss")>-1)
				strTime = strTime.replace( /ss/g, ("0" + String(seconds)));
			else 
				strTime = strTime.replace( /ss/g, String(seconds));
			strTime = strTime.replace( /s/g, String(seconds));
		}

		if ( bShowAMPM )
		{
			var strAMPM = (bPM?"PM":"AM");
			strTime = strTime.replace( /A/g, strAMPM.toUpperCase() );
			strTime = strTime.replace( /a/g, strAMPM.toLowerCase() );
		}
	}
	
	if (strTime.length == 0)
	    strTime = GetLocaleTime(now);
	
	return strTime;
}

function FormatETS( eT ) {
  var mills = eT % 1000
  eT -= mills
  eT /= 1000
  var secs = eT % 60
  eT -= secs
  eT /= 60
  var mins = eT % 60
  eT -= mins
  eT /= 60
  var hours = eT
  if( hours < 10 ) hours = "0" + hours
  if( mins < 10 ) mins = "0" + mins
  if( secs < 10 ) secs = "0" + secs
  return hours + ':' + mins + ':' + secs
}

function CalcTD( f, val ) {
  var tV = 0
  if( f == 1 ) tV += 24 * 60 * 60 * 1000 * val
  else if( f == 2 ) tV += 60 * 1000 * val
  else if( f == 4 ) tV += 1000 * val
  return tV
}

//legacy functions for realtime date/time
function GetLocaleDate( now ) {
	return now.toLocaleDateString();
}

function GetLocaleTime( now ) {

	var time = now.toLocaleTimeString()
	var timeParts = time.split(":");
	if ( timeParts.length > 2 )
	{
		time = timeParts[0];
		time += ":";
		time += timeParts[1];
		time += timeParts[2].replace(/^[^0-9]*[0-9]+/,"")
	}
	return time;
}

//locale based legacy functions
function GetDate_GER(now) {
    var monthList = new Array('Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember')
    var year = now.getYear()
    if( year < 1900 ) year += 1900
    return now.getDate()+' '+monthList[now.getMonth()]+' '+year
}

function GetDate_PTB(now) {
    var monthList = new Array('janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro')
    var year = now.getYear()
    if( year < 1900 ) year += 1900
    return now.getDate()+' '+monthList[now.getMonth()]+' '+year
}

function GetDate_SPA(now) {
    var monthList = new Array('enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre')
    var year = now.getYear()
    if( year < 1900 ) year += 1900
    return now.getDate()+' '+monthList[now.getMonth()]+' '+year
}
