var optionlinks = document.getElementsByClassName("fr-french");
        for(var x=0; x < optionlinks.length; x++)
        {optionlinks[x].setAttribute('value', frURL);}
var footerlinks = document.getElementsByClassName("fr-french-a");
        for(var x=0; x < footerlinks.length; x++)
        { footerlinks[x].setAttribute('href', frURL);}          

        document.getElementById("langs").addEventListener('change', function () {
            window.location = this.value;
        });
        document.getElementById("langs-footer").addEventListener('change', function () {
            window.location = this.value;
        });
        var esURL = window.location.protocol + "//" + "es." + window.location.host + window.location.pathname + window.location.search
        var frURL = window.location.protocol + "//" + "fr." + window.location.host + window.location.pathname + window.location.search




        var esa = document.getElementsByClassName("es-spanish-a"); 
        for(var x=0; x < esa.length; x++)
        {esa[x].setAttribute('href', window.location.protocol + "//" + "es." + getDomain(window.location.href) + window.location.pathname + window.location.search);}
        


window.onload = function () {
var translatebanner = document.getElementById('nygov-universal-navigation');
translatebanner.insertAdjacentHTML('afterbegin', '<article id="nysds-translate-banner" class="nysds-unav-translate-banner"><div class="nysds-translate-group"><div class="inline-flex"><div class="globe-icon" aria-hidden="true"></div><label class="sr-only" id="translate-label" for="langs">Select your language preference</label><select class="nysds-select" id="langs" name="languages" aria-labelledby="translate-label"><option lang="en" aria-label="English" value="en">English</option><option lang="es" aria-label="Spanish" value="es">Español</option><option lang="ar" aria-label="Arabic" value="ar">عربى</option><option lang="bn" aria-label="Bengali" value="bn">বাঙালি</option><option lang="zh" aria-label="Chinese" value="zh">中文</option><option lang="fr" aria-label="French " value="fr">Français</option><option lang="ht" aria-label="Haitian-Creole" value="ht">Kreyòl ayisyen</option><option lang="it" aria-label="Italian" value="it">Italiano</option><option lang="ko" aria-label="Korean" value="ko">한국어</option><option lang="pl" aria-label="Polish" value="pl">Polski</option><option lang="ru" aria-label="Russian" value="ru">Русскийy</option><option lang="yi" aria-label="Yiddish" value="yi">יידיש</option></select></div></div></article>');
}


window.onload = function () {
let t5 = document.querySelector('#nygov-universal-footer');
t5.insertAdjacentHTML('afterend', '<article id="nysds-translate-banner" class="nysds-footer-insert-banner"><section class="nysds-inline-languages"><div class="nysds-caption-text">This page is available in other languages. Select your language preference</div><ul><li><a lang="en" href="#" title="English" aria-label="English" value="en">English</a></li><li><a lang="es" href="#" title="Spanish" aria-label="Spanish" value="es">Español</a></li><li><a lang="ar" href="#" title="Arabic" aria-label="Arabic" value="ar">عربى</a></li><li><a lang="bn" href="#" title="Bengali" aria-label="Bengali" value="bn">বাঙালি</a></li><li><a lang="zh" href="#" title="Chinese" aria-label="Chinese" value="zh">中文</a></li><li><a lang="fr" href="#" title="French" aria-label="French " value="fr">Français</a></li><li><a lang="ht" href="#" title="Haitian-Creole" aria-label="Haitian-Creole" value="ht">Kreyòl ayisyen</a></li><li><a lang="it" href="#" title="Italian" aria-label="Italian" value="it">Italiano</a></li><li><a lang="ko" href="#" title="Korean" aria-label="Korean" value="ko">한국어</a></li><li><a lang="pl" href="#" title="Polish" aria-label="Polish" value="pl">Polski</a></li><li><a lang="ru" href="#" title="Russian" aria-label="Russian" value="ru">Русскийy</a></li><li><a lang="yi" href="#" title="Yiddish" aria-label="Yiddish" value="yi">יידיש</a></li><ul></section><div class="nysds-translate-group"><div class="nysds-caption-text">This page is available in other languages. Select your language preference</div><div class="inline-flex"><div class="globe-icon" aria-hidden="true"></div><label class="sr-only" id="translate-label-footer" for="langs-footer">Select your language preference</label><select class="nysds-select" id="langs-footer" name="languages" aria-labelledby="translate-label-footer"><option lang="en" aria-label="English" value="en">English</option><option lang="es" aria-label="Spanish" value="es">Español</option><option lang="ar" aria-label="Arabic" value="ar">عربى</option><option lang="bn" aria-label="Bengali" value="bn">বাঙালি</option><option lang="zh" aria-label="Chinese" value="zh">中文</option><option lang="fr" aria-label="French " value="fr">Français</option><option lang="ht" aria-label="Haitian-Creole" value="ht">Kreyòl ayisyen</option><option lang="it" aria-label="Italian" value="it">Italiano</option><option lang="ko" aria-label="Korean" value="ko">한국어</option><option lang="pl" aria-label="Polish" value="pl">Polski</option><option lang="ru" aria-label="Russian" value="ru">Русскийy</option><option lang="yi" aria-label="Yiddish" value="yi">יידיש</option></select></div></div></article>');
}
