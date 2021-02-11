function parseParam( name , url ) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec( url );
    if(results == null)
      return "";
    else
      return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  
  function IsNumeric(val) {
      if (isNaN(parseFloat(val))) {
            return false;
       }
       return true
  }
  
  // JavaScript Cookie Code
  function getCookie(c_name) {
    var i,x,y,ARRcookies=document.cookie.split(";");
  
    for (i=0;i<ARRcookies.length;i++) {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
  
        if (x==c_name) {
            return unescape(y);
          }
      }
  }
  
  function setCookie(c_name,value,exdays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
  }
  
  function checkCookie() {
    var cookie=getCookie("regionalEmail");
    if (cookie!=null && cookie!="") {
        $('.opt-email').hide();
      }
  }
  
  
  $(function(){
  
    $('#job-central-search-radius').val("50");
    $('.job-central-link').each(function(i){
      // Get the link element
      var obj = $(this);
  
      obj.click(function(e){
  
        // Do a cookie check
        checkCookie();
  
        // Save off the current destination
        var destination = obj.attr('href');
        var searchID = parseParam( 'si' , destination );
        var linkText = obj.text();
        
        var fullHeader = obj.parents('.ux-container-expandable').find('.ux-expandable-header').text();
        var subHeader = obj.parents('.ux-container-expandable').find('.ux-expandable-header span').text();
  
        var regionHeader = fullHeader.replace(subHeader,'');
  
        $('#job-central-search-zip').val(obj.attr('data-note'));
  
        $('#job-central-dialog').dialog({
          modal:true
        });
  
        // Set cancel button
        $('#job-central-cancel').click(function(){
          $(this).parents("#job-central-dialog").dialog("close");
        });
  
        // Redirect with the new values
        $('#job-central-go').click(function(){
          var zip = encodeURI($('#job-central-search-zip').val());
          var radius = encodeURI($('#job-central-search-radius').val());
          var search = "";
          var email = $('#email').val();
  
          // Google Analytics Tracking
          _gaq.push(['_trackEvent', 'regional-job-numbers', regionHeader , linkText]);
  
          if (IsNumeric(zip)) {
            search = 'https://newyork.usnlx.com/results.asp?si=' + searchID + '&pi=1&ri=1&so=relevance&as=lrep&al=1&zc=' + zip + '%3A' + radius;			
          } else {
            search = 'https://newyork.usnlx.com/results.asp?si=' + searchID + '&pi=1&ri=1&so=relevance&as=lrep&al=1&zc=' + zip + ',NY' + '%3A' + radius;
          }
          
          if((email != "") && (email != "your@email.com") ){
            $.ajax({
              type: "POST",
              url: "https://labor.ny.gov/secure/contact/regional-email/emailsave.asp",
              data: "email=" + email
            });
  
            setCookie("regionalEmail","regionalEmail",365);
            $('#email').val('');
          }
  
  
          window.open(search);
          $(this).unbind('click');
          $(this).parents("#job-central-dialog").dialog("close");
          return false;
        });
  
        return false;
      });
    });
  });
  
  