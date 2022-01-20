window.onload = function () {

function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
    }
    else {
        return null;
    }
}
function getDomain(url) {
    var hostName = getHostName(url);
    var domain = hostName;
    
    if (hostName != null) {
        var parts = hostName.split('.').reverse();
        
        if (parts != null && parts.length > 1) {
            domain = parts[1] + '.' + parts[0];
                
            if (hostName.toLowerCase().indexOf('.ny.gov') != -1 && parts.length > 2) {
              domain = parts[2] + '.' + domain;
            }
        }
    }
    
    return domain;
}

    var enUrl = window.location.protocol + "//" + getDomain(window.location.href) + window.location.pathname + window.location.search
    var esUrl = window.location.protocol + "//" + "es." + getDomain(window.location.href) + window.location.pathname + window.location.search
    var arUrl = window.location.protocol + "//" + "ar." + getDomain(window.location.href) + window.location.pathname + window.location.search
    var bnUrl = window.location.protocol + "//" + "bn." + getDomain(window.location.href) + window.location.pathname + window.location.search
    var zhUrl = window.location.protocol + "//" + "zh." + getDomain(window.location.href) + window.location.pathname + window.location.search
    var frUrl = window.location.protocol + "//" + "fr." + getDomain(window.location.href) + window.location.pathname + window.location.search
    var htUrl = window.location.protocol + "//" + "ht." + getDomain(window.location.href) + window.location.pathname + window.location.search
    var itUrl = window.location.protocol + "//" + "it." + getDomain(window.location.href) + window.location.pathname + window.location.search
    var koUrl = window.location.protocol + "//" + "ko." + getDomain(window.location.href) + window.location.pathname + window.location.search
    var plUrl = window.location.protocol + "//" + "pl." + getDomain(window.location.href) + window.location.pathname + window.location.search
    var ruUrl = window.location.protocol + "//" + "ru." + getDomain(window.location.href) + window.location.pathname + window.location.search
    var urUrl = window.location.protocol + "//" + "ur." + getDomain(window.location.href) + window.location.pathname + window.location.search
    var yiUrl = window.location.protocol + "//" + "yi." + getDomain(window.location.href) + window.location.pathname + window.location.search
    var en = document.getElementsByClassName("en-english");
    var es = document.getElementsByClassName("es-spanish");
    var ar = document.getElementsByClassName("ar-arabic");
    var bn = document.getElementsByClassName("bn-bengali");
    var zh = document.getElementsByClassName("zh-chinese");
    var fr = document.getElementsByClassName("fr-french");
    var ht = document.getElementsByClassName("ht-haitian-creole");
    var it = document.getElementsByClassName("it-italian");
    var ko = document.getElementsByClassName("ko-korean");
    var pl = document.getElementsByClassName("pl-polish");
    var ru = document.getElementsByClassName("ru-russian");
    var ur = document.getElementsByClassName("ur-urdu");
    var yi = document.getElementsByClassName("yi-yiddish");  
        for (var x=0; x < en.length, x < es.length, x < ar.length, x < bn.length, x < zh.length, x < fr.length, x < ht.length, x < it.length, x < ko.length, x < pl.length, x < ru.length, x < ur.length, x < yi.length; x++) {
            
            if (en[x].value == null ){en[x].setAttribute('href', enUrl);} else {en[x].setAttribute('value', enUrl);}
            if (es[x].value == null ){es[x].setAttribute('href', esUrl);} else {es[x].setAttribute('value', esUrl);}
            if (ar[x].value == null ){ar[x].setAttribute('href', arUrl);} else {ar[x].setAttribute('value', arUrl);}
            if (bn[x].value == null ){bn[x].setAttribute('href', bnUrl);} else {bn[x].setAttribute('value', bnUrl);}
            if (zh[x].value == null ){zh[x].setAttribute('href', zhUrl);} else {zh[x].setAttribute('value', zhUrl);}
            if (fr[x].value == null ){fr[x].setAttribute('href', frUrl);} else {fr[x].setAttribute('value', frUrl);}
            if (ht[x].value == null ){ht[x].setAttribute('href', htUrl);} else {ht[x].setAttribute('value', htUrl);}
            if (it[x].value == null ){it[x].setAttribute('href', itUrl);} else {it[x].setAttribute('value', itUrl);}
            if (ko[x].value == null ){ko[x].setAttribute('href', koUrl);} else {ko[x].setAttribute('value', koUrl);}
            if (pl[x].value == null ){pl[x].setAttribute('href', plUrl);} else {pl[x].setAttribute('value', plUrl);}
            if (ru[x].value == null ){ru[x].setAttribute('href', ruUrl);} else {ru[x].setAttribute('value', ruUrl);}
            if (ur[x].value == null ){ur[x].setAttribute('href', urUrl);} else {ur[x].setAttribute('value', urUrl);}
            if (yi[x].value == null ){yi[x].setAttribute('href', yiUrl);} else {yi[x].setAttribute('value', yiUrl);}

            }

document.getElementById("langs").addEventListener('change', function () {
    window.location = this.value;
});
document.getElementById("langs-footer").addEventListener('change', function () {
    window.location = this.value;
});
}