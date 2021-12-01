---
layout: layout-acsf.njk
title: testing ACSF hero remediation
---

<style>
  .grad {
  background: linear-gradient(
  to right,
  hsl(0, 0%, 0%) 0%,
  hsla(0, 0%, 0%, 0.964) 7.4%,
  hsla(0, 0%, 0%, 0.918) 15.3%,
  hsla(0, 0%, 0%, 0.862) 23.4%,
  hsla(0, 0%, 0%, 0.799) 31.6%,
  hsla(0, 0%, 0%, 0.73) 39.9%,
  hsla(0, 0%, 0%, 0.655) 48.2%,
  hsla(0, 0%, 0%, 0.577) 56.2%,
  hsla(0, 0%, 0%, 0.497) 64%,
  hsla(0, 0%, 0%, 0.417) 71.3%,
  hsla(0, 0%, 0%, 0.337) 78.1%,
  hsla(0, 0%, 0%, 0.259) 84.2%,
  hsla(0, 0%, 0%, 0.186) 89.6%,
  hsla(0, 0%, 0%, 0.117) 94.1%,
  hsla(0, 0%, 0%, 0.054) 97.6%,
  hsla(0, 0%, 0%, 0) 100%
);
}
.grad2 {
  background: linear-gradient(to right, #000, #fff);
}
.grad::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.3) 60%,
    rgba(0, 0, 0, 0.2) 100%
  );
}

.bg-admin-second-i {
--tw-bg-opacity: 1;
    background-color: rgba(207, 121, 84, var(--tw-bg-opacity)) !important;
}
.bg-admin-second-i:hover {
--tw-bg-opacity: 1;
    background-color: rgba(0, 0, 0, var(--tw-bg-opacity)) !important;
}
.text-black-i {
--tw-bg-opacity: 1;
    color: rgba(0, 0, 0, var(--tw-bg-opacity)) !important;
}


  </style>
# Current Hero on ACSF

This currently fails both 3:1 and 4.5:1 color contrast ratios for several reasons with options for remediation.
  1. The text is not being compared against either the image or the image gradient, but rather against the white background of the site. Automted tools aren't picking up that the component in question has a background image likely due to the way the hero is structured. Because of the way this component is designed, the best automated response from WAVE or ANDI we can hope for is manual test needed. 
  2. Even with a manual comparison to the gradient or image, the current gradient and text color are probably still going to fail for many images. The gradient needs to be significantly darker or a background to the text or text area of sufficient contrast added. These are presented in options 1 and 2. 
  3. Option 3 would be a redesigned hero that avoids all issues of contrast, but would be a heavier development lift and significant impact to all ACSF sites.

<article data-history-node-id="1" role="article" about="/covid-19-vaccine" class="hero-layout">
            <div class="hero-header hero-has-image hero-landing">
            <div class="hero-image">
            <div>
            <article>
            <div>    
            <picture>
            <source srcset="https://covid19vaccine.health.ny.gov/sites/g/files/oee1181/files/styles/wide_lead/public/media/2021/07/expovax_17_v3_1280.jpg?h=b5f6a62e&amp;itok=NM6peqBd 1x" media="all and (min-width: 769px)" type="image/jpeg">
            <source srcset="https://covid19vaccine.health.ny.gov/sites/g/files/oee1181/files/styles/narrow_lead/public/media/2021/07/expovax_17_v3_1280.jpg?h=b5f6a62e&amp;itok=VS6t0iKt 1x" media="all and (min-width: 461px) and (max-width: 768px)" type="image/jpeg">
            <source srcset="/sites/g/files/oee1181/files/styles/mobile_lead/public/media/2021/07/expovax_17_v3_1280.jpg?h=b5f6a62e&amp;itok=bq5wyv9q 1x" type="image/jpeg">
            <img src="/sites/g/files/oee1181/files/styles/mobile_lead/public/media/2021/07/expovax_17_v3_1280.jpg?h=b5f6a62e&amp;itok=bq5wyv9q" alt="Syracuse COVID-19 Mass Vaccination Site" title="State Fair Expo Center Mass Vaccination Site in Syracuse" typeof="foaf:Image">

  </picture>
</div>    
  </article>
</div>
</div>
        <!-- BACKGROUND GRAD -->
            <div class="hero-bkg"></div>
        </div>
            <div class="hero-inner hero-landing-inner hero-has-image-content">
            <!-- LIVE NOW FOR BRIGHTCOVE -->
            <!-- HEADLINE LABEL -->
                            <h2 class="">COVID-19 Vaccine: Safe, Effective, Free</h2>
            <div class="hero-summary">    
            <div class="webny-card-teaser">Find a New York State operated vaccination site and get vaccinated.</div> 
            </div>
            <!-- HERO BUTTONS -->
            <div class="hero-buttons">  
            <div><a href="https://am-i-eligible.covid19vaccine.health.ny.gov/" class="">Make Appointment</a></div>                       
            <div><a href="/covid-19-vaccine-tracker" class="">Vaccine Tracker</a></div>  
            </div>
        </div>
    <!-- VIDEO PLACEMENT -->

</article>

<div class="h-48"> </div>

# Proposed Remediated Hero Version 1

This method removes the repeated background image gradient and replaces it with a <code> linear-gradient </code>. Fallback to an image gradient could be put in if we are required to support browsers released prior to 2012 (ex. IE9) or proper prefixing with -ms-, -o-, -webkit-, and -moz- for compatibility support. 
 - <strong>Con:</strong> A manual check would still be needed but this gradient is significantly darker and would likely pass. Automated tools may still flag this. 
 - <strong>Pro:</strong> No other structural changes to the hero are required and the impact across ACSF would be limited.

<article data-history-node-id="1" role="article" about="/covid-19-vaccine" class="hero-layout">
            <div class="hero-header hero-has-image hero-landing">
            <div class="hero-image " >
            <div>
            <article>
            <div >    
            <picture>
            <source srcset="https://covid19vaccine.health.ny.gov/sites/g/files/oee1181/files/styles/wide_lead/public/media/2021/07/expovax_17_v3_1280.jpg?h=b5f6a62e&amp;itok=NM6peqBd 1x" media="all and (min-width: 769px)" type="image/jpeg">
            <source srcset="https://covid19vaccine.health.ny.gov/sites/g/files/oee1181/files/styles/narrow_lead/public/media/2021/07/expovax_17_v3_1280.jpg?h=b5f6a62e&amp;itok=VS6t0iKt 1x" media="all and (min-width: 461px) and (max-width: 768px)" type="image/jpeg">
            <source srcset="/sites/g/files/oee1181/files/styles/mobile_lead/public/media/2021/07/expovax_17_v3_1280.jpg?h=b5f6a62e&amp;itok=bq5wyv9q 1x" type="image/jpeg">
            <img src="/sites/g/files/oee1181/files/styles/mobile_lead/public/media/2021/07/expovax_17_v3_1280.jpg?h=b5f6a62e&amp;itok=bq5wyv9q" alt="Syracuse COVID-19 Mass Vaccination Site" title="State Fair Expo Center Mass Vaccination Site in Syracuse" typeof="foaf:Image">
            </picture>
</div>    
  </article>
</div>
</div>
        <!-- BACKGROUND GRAD -->
            <div class="grad"></div>
        </div>
            <div class="hero-inner hero-landing-inner hero-has-image-content " >
            <!-- LIVE NOW FOR BRIGHTCOVE -->
            <!-- HEADLINE LABEL -->
                            <h2 class="">COVID-19 Vaccine: Safe, Effective, Free</h2>
            <div class="hero-summary">    
            <div class="webny-card-teaser">Find a New York State operated vaccination site and get vaccinated.</div> 
            </div>
            <!-- HERO BUTTONS -->
            <div class="hero-buttons">  
            <div><a href="https://am-i-eligible.covid19vaccine.health.ny.gov/" class="">Make Appointment</a></div>                       
            <div><a href="/covid-19-vaccine-tracker" class="">Vaccine Tracker</a></div>  
            </div>
        </div>
    <!-- VIDEO PLACEMENT -->

</article>


<div class="h-48"> </div>

# Proposed Remediated Hero Version 2
This method adds a colored background (either agency secondary or tertiary color) of sufficient contrast to the text area of the hero. This would be disruptive to existing heroes across ACSF.

<article data-history-node-id="1" role="article" about="/covid-19-vaccine" class="hero-layout">
            <div class="hero-header hero-has-image hero-landing">
            <div class="hero-image">
            <div>
            <article>
            <div>    
            <picture>
            <source srcset="https://covid19vaccine.health.ny.gov/sites/g/files/oee1181/files/styles/wide_lead/public/media/2021/07/expovax_17_v3_1280.jpg?h=b5f6a62e&amp;itok=NM6peqBd 1x" media="all and (min-width: 769px)" type="image/jpeg">
            <source srcset="https://covid19vaccine.health.ny.gov/sites/g/files/oee1181/files/styles/narrow_lead/public/media/2021/07/expovax_17_v3_1280.jpg?h=b5f6a62e&amp;itok=VS6t0iKt 1x" media="all and (min-width: 461px) and (max-width: 768px)" type="image/jpeg">
            <source srcset="/sites/g/files/oee1181/files/styles/mobile_lead/public/media/2021/07/expovax_17_v3_1280.jpg?h=b5f6a62e&amp;itok=bq5wyv9q 1x" type="image/jpeg">
            <img src="/sites/g/files/oee1181/files/styles/mobile_lead/public/media/2021/07/expovax_17_v3_1280.jpg?h=b5f6a62e&amp;itok=bq5wyv9q" alt="Syracuse COVID-19 Mass Vaccination Site" title="State Fair Expo Center Mass Vaccination Site in Syracuse" typeof="foaf:Image">

  </picture>
</div>    
</article>
</div>
</div>
        <!-- BACKGROUND GRAD -->
            <div class="hero-bkg"></div>
        </div>
            <div class="hero-inner hero-landing-inner hero-has-image-content">
            <!-- LIVE NOW FOR BRIGHTCOVE -->
            <!-- HEADLINE LABEL -->
            <h2 class="bg-admin-second rounded-xl p-2 border border-white">COVID-19 Vaccine: Safe, Effective, Free</h2>
            <div class="hero-summary bg-admin-second rounded-xl p-2 border border-white">    
            <div class="webny-card-teaser">Find a New York State operated vaccination site and get vaccinated.</div> 
            </div>
            <!-- HERO BUTTONS -->
            <div class="hero-buttons">  
            <div><a href="https://am-i-eligible.covid19vaccine.health.ny.gov/" class="bg-admin-second-i rounded-xl">Make Appointment</a></div>                       
            <div><a href="/covid-19-vaccine-tracker" class="bg-admin-second-i rounded-xl">Vaccine Tracker</a></div>  
            </div>
        </div>
    <!-- VIDEO PLACEMENT -->
</article>
<div class="h-12"></div>
