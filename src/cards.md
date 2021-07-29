---
layout: layout-acsf.njk
title: testing ACSF card link remediation 
---

# Current Cards on ACSF

Users of assistive technology and keyboard navigation will have to tab through and hear 3 links announced for each card. These duplicate links make navigation by keyboard or other assistive devices difficult through duplication of effort for the same experience sighted mouse users are able to have. 


<div class="paragraph paragraph--type--webny-card-paragraph-type paragraph--view-mode--default">
        
<div class="webny-card-frame-inner">
</div>

<div>
<div>
<article class="webny-card">
                            
<div data-history-node-id="386" role="article" about="/excelsior-pass" class="webny-card">

<a href="/excelsior-pass">
<div class="card-image" style="background-image: url('https://covid19vaccine.health.ny.gov/sites/g/files/oee1181/files/styles/card_vertical/public/media/2021/03/excelsiorpass.png?h=b5f6a62e&amp;itok=7kcO1aiA');">
</div>
</a>
    
<div class="card-content">
 <div class="card-content-top">
    <h1>
        <a href="/excelsior-pass" rel="bookmark">Excelsior Pass</a>
    </h1></div>
<div class="webny-card-teaser">Excelsior Pass provides a free, fast and secure way to present digital proof of COVID-19 vaccination or negative test results.</div>
    
</div>
</div>
<div class="webny-card-cta">
<span class="icon-right-caret">
<a href="https://covid19vaccine.health.ny.gov/excelsior-pass" title="Excelsior Pass">LEARN MORE</a></span>
</div>
</article>
</div>
                                                                                <div>
                        <article class="webny-card">
                            
<div data-history-node-id="501" role="article" about="/home-vaccination-program" class="webny-card">
<a target="_self" href="/home-vaccination-program">
<div class="card-image" style="background-image: url('https://covid19vaccine.health.ny.gov/sites/g/files/oee1181/files/styles/card_vertical/public/media/2021/05/vaccination_athome_disabled_covid19_card.jpg?h=854a7be2&amp;itok=vFdqq4b5');">
</div>
</a>
            
<div class="card-content">
<div class="card-content-top">
<h1>
 <a target="_self" href="/home-vaccination-program" rel="bookmark"> In-Home Vaccination Program
</a>
</h1>

 </div>
<div class="webny-card-description"><p>New York is committed to ensuring everyone, including those who cannot easily&nbsp;leave the home, have access to the vaccine.</p></div>
</div>
</div>

<div class="webny-card-cta">
<span class="icon-right-caret">
 <a target="_self" href="/distribution-vaccine#in-home-vaccination" title="In-Home Vaccination">In-Home Vaccination</a>
 </span>
</div>
 </article>
 </div>
 <div>
 <article class="webny-card">
                            
<div data-history-node-id="236" role="article" about="/covid-19-vaccine-tracker-0" class="webny-card">

<a target="_self" href="/covid-19-vaccine-tracker-0">
  <div class="card-image" style="background-image: url('https://covid19vaccine.health.ny.gov/sites/g/files/oee1181/files/styles/card_vertical/public/media/2020/12/covid19vaccine.png?h=b5f6a62e&amp;itok=nKpUaAyz');">
        </div>
            </a>
            
<div class="card-content">
<div class="card-content-top">
                            
<h1>
 <a target="_self" href="/covid-19-vaccine-tracker-0" rel="bookmark">COVID-19 Vaccine Tracker
</a>
  </h1>
</div>
<div class="webny-card-description"><p>Find data on the COVID-19 Vaccine distribution throughout New York State.</p></div>
 </div>
</div>

 <div class="webny-card-cta">
<span class="icon-right-caret">
<a target="_self" href="/covid-19-vaccine-tracker" title="Find Data">Find Data</a>
</span>
  </div> </article>
      </div>
       </div>
</div>





# Proposed Cards

These cards retain the three links for mouse users, but remove the card image and CTA from the tab and focus order using tabindex="-1" and hide from screenreaders using aria-hidden="true"

This is an accepted way to remove semantic, native focusable elements from the focus order and screen reader view. Using the two techniques in conjunction is the only w3c approved way to use aria-hidden="true" and tabindex="-1" on a native focusable element. 
See <https://w3c.github.io/using-aria/#4thrule> for more information.

This approach also removes the use of a div with background image and replaces it with an img tag with alt text.




<div class="paragraph paragraph--type--webny-card-paragraph-type paragraph--view-mode--default">       
<div class="webny-card-frame-inner">
</div>
<div>
<div>
<article class="webny-card">                          
<div data-history-node-id="386" role="article" about="/excelsior-pass" class="webny-card">
<a href="https://covid19vaccine.health.ny.gov/excelsior-pass" tabindex="-1" aria-hidden="true"><!-- add tabindex="-1" aria-hidden="true"-->
<img class="card-image" src="https://covid19vaccine.health.ny.gov/sites/g/files/oee1181/files/styles/card_vertical/public/media/2021/03/excelsiorpass.png?h=b5f6a62e&amp;itok=7kcO1aiA" alt="a cell phone with the excelsior pass visible on the screen">
</a>   
<div class="card-content">
<div class="card-content-top">
<h1>
<a href="https://covid19vaccine.health.ny.gov/excelsior-pass" rel="bookmark">Excelsior Pass</a>
</h1>
</div>
<div class="webny-card-teaser">Excelsior Pass provides a free, fast and secure way to present digital proof of COVID-19 vaccination or negative test results.</div>   
</div>
</div>
<div class="webny-card-cta">
<span class="icon-right-caret">
<a href="https://covid19vaccine.health.ny.gov/excelsior-pass" title="Excelsior Pass" tabindex="-1" aria-hidden="true"> <!-- add tabindex="-1" aria-hidden="true"-->LEARN MORE</a></span>
</div>
</article>
</div>
<div>
<article class="webny-card">                           
<div data-history-node-id="501" role="article" about="/home-vaccination-program" class="webny-card">
<a target="_self" href="https://covid19vaccine.health.ny.gov/home-vaccination-program" tabindex="-1" aria-hidden="true"><!-- add tabindex="-1" aria-hidden="true"-->
<img class="card-image" src="https://covid19vaccine.health.ny.gov/sites/g/files/oee1181/files/styles/card_vertical/public/media/2021/05/vaccination_athome_disabled_covid19_card.jpg?h=854a7be2&amp;itok=vFdqq4b5" alt="a person being vaccinated">
</a>        
<div class="card-content">
<div class="card-content-top">
<h1>
<a target="_self" href="https://covid19vaccine.health.ny.gov/home-vaccination-program" rel="bookmark"> In-Home Vaccination Program
</a>
</h1>
</div>
<div class="webny-card-description"><p>New York is committed to ensuring everyone, including those who cannot easily&nbsp;leave the home, have access to the vaccine.</p></div>
</div>
</div>
<div class="webny-card-cta">
<span class="icon-right-caret">
<a target="_self" href="https://covid19vaccine.health.ny.gov/home-vaccination-program" title="In-Home Vaccination" tabindex="-1" aria-hidden="true"><!-- add tabindex="-1" aria-hidden="true"-->In-Home Vaccination</a>
</span>
</div>
</article>
</div>
<div>
<article class="webny-card">                          
<div data-history-node-id="236" role="article" about="/covid-19-vaccine-tracker-0" class="webny-card">
<a target="_self" href="https://covid19vaccine.health.ny.gov/covid-19-vaccine-tracker-0" tabindex="-1" aria-hidden="true"><!-- add tabindex="-1" aria-hidden="true"-->
<img class="card-image" src="https://covid19vaccine.health.ny.gov/sites/g/files/oee1181/files/styles/card_vertical/public/media/2020/12/covid19vaccine.png?h=b5f6a62e&amp;itok=nKpUaAyz" alt="covid 19 vaccine vials on a tray">
</a>         
<div class="card-content">
<div class="card-content-top">                        
<h1>
<a target="_self" href="https://covid19vaccine.health.ny.gov/covid-19-vaccine-tracker-0" rel="bookmark">COVID-19 Vaccine Tracker
</a>
</h1>
</div>
<div class="webny-card-description"><p>Find data on the COVID-19 Vaccine distribution throughout New York State.</p></div>
</div>
</div>
<div class="webny-card-cta">
<span class="icon-right-caret">
<a target="_self" href="https://covid19vaccine.health.ny.gov/covid-19-vaccine-tracker-0" title="Find Data" tabindex="-1" aria-hidden="true"> <!-- add tabindex="-1" aria-hidden="true"-->Find Data</a>
</span>
</div>
</article>
</div>
</div>
</div>