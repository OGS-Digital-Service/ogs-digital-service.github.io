---
layout: language.njk
title: Language Access
permalink: false
---

<!-- cookie style after here -->


<style>
.globe-icon {
  margin-left:20px;
  background: url(data:image/svg+xml,%3Csvg%20aria-hidden%3D%22true%22%20focusable%3D%22false%22%20data-prefix%3D%22fas%22%20data-icon%3D%22globe%22%20class%3D%22svg-inline--fa%20fa-globe%20fa-w-16%22%20role%3D%22img%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20496%20512%22%3E%3Cpath%20fill%3D%22white%22%20d%3D%22M336.5%20160C322%2070.7%20287.8%208%20248%208s-74%2062.7-88.5%20152h177zM152%20256c0%2022.2%201.2%2043.5%203.3%2064h185.3c2.1-20.5%203.3-41.8%203.3-64s-1.2-43.5-3.3-64H155.3c-2.1%2020.5-3.3%2041.8-3.3%2064zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6%2024.4%2033.8%2041.2%2084.7%2050%20141.6h108zM177.2%2018.4C105.8%2039.6%2047.8%2092.1%2019.3%20160h108c8.7-56.9%2025.5-107.8%2049.9-141.6zM487.4%20192H372.7c2.1%2021%203.3%2042.5%203.3%2064s-1.2%2043-3.3%2064h114.6c5.5-20.5%208.6-41.8%208.6-64s-3.1-43.5-8.5-64zM120%20256c0-21.5%201.2-43%203.3-64H8.6C3.2%20212.5%200%20233.8%200%20256s3.2%2043.5%208.6%2064h114.6c-2-21-3.2-42.5-3.2-64zm39.5%2096c14.5%2089.3%2048.7%20152%2088.5%20152s74-62.7%2088.5-152h-177zm159.3%20141.6c71.4-21.2%20129.4-73.7%20158-141.6h-108c-8.8%2056.9-25.6%20107.8-50%20141.6zM19.3%20352c28.6%2067.9%2086.5%20120.4%20158%20141.6-24.4-33.8-41.2-84.7-50-141.6h-108z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E);
  background-repeat: no-repeat;
  background-size: auto 16px;
  background-position: center;
  width: 24px;
}
.nysds-close-icon {
  background: url(data:image/svg+xml,%3Csvg%20aria-hidden%3D%22true%22%20focusable%3D%22false%22%20data-prefix%3D%22fas%22%20data-icon%3D%22times%22%20class%3D%22svg-inline--fa%20fa-times%20fa-w-11%22%20role%3D%22img%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20352%20512%22%3E%3Cpath%20fill%3D%22white%22%20d%3D%22M242.72%20256l100.07-100.07c12.28-12.28%2012.28-32.19%200-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48%200L176%20189.28%2075.93%2089.21c-12.28-12.28-32.19-12.28-44.48%200L9.21%20111.45c-12.28%2012.28-12.28%2032.19%200%2044.48L109.28%20256%209.21%20356.07c-12.28%2012.28-12.28%2032.19%200%2044.48l22.24%2022.24c12.28%2012.28%2032.2%2012.28%2044.48%200L176%20322.72l100.07%20100.07c12.28%2012.28%2032.2%2012.28%2044.48%200l22.24-22.24c12.28-12.28%2012.28-32.19%200-44.48L242.72%20256z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E);
   background-repeat: no-repeat;
    background-size: auto 20px;
    background-position: center;
    width:40px;
}

.nysds-close-button {
  background-color: transparent;
  border: none;
  margin-left: auto;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.nysds-translate-group select {
    font-family: "Proxima Nova",arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 600;
    font-size: 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    max-width: 100%;
    min-width: 7em;
    border: none;
    background: url(data:image/svg+xml,%3Csvg%20aria-hidden%3D%22true%22%20focusable%3D%22false%22%20data-prefix%3D%22fas%22%20data-icon%3D%22angle-down%22%20class%3D%22svg-inline--fa%20fa-angle-down%20fa-w-10%22%20role%3D%22img%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20512%22%3E%3Cpath%20fill%3D%22white%22%20d%3D%22M143%20352.3L7%20216.3c-9.4-9.4-9.4-24.6%200-33.9l22.6-22.6c9.4-9.4%2024.6-9.4%2033.9%200l96.4%2096.4%2096.4-96.4c9.4-9.4%2024.6-9.4%2033.9%200l22.6%2022.6c9.4%209.4%209.4%2024.6%200%2033.9l-136%20136c-9.2%209.4-24.4%209.4-33.8%200z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E);
    background-repeat: no-repeat;
    background-size: auto 1.5rem;
    background-position:right;
    background-color: transparent;
    -webkit-appearance: none;
    color: #fff;
    border-bottom: 2px solid #fff;
    text-transform: uppercase;
    margin: 0px 10px;
    width: auto !important;
    height: auto !important;
    padding:0;
    border-radius: 0px;
}

.nysds-translate-group select:focus {
  outline: 3px solid #FACE00;
}

.nysds-translate-group button:focus {
  outline: 3px solid #FACE00;
}

.nysds-select option {
  color: #000;
}

.nysds-translate-group {
  display: flex;
  color: #fff;
  width: 95%;
  
}
.nysds-cookie-banner {
  position: fixed;
  bottom: 0;
  left:0;
  background-color: rgba(0,0,0,0.9);
  width: 100%;
  padding: 2.5rem 0;
  font-size: 16px;
  z-index: 1000;
  display: flex;
  justify-content: center;
  
}

.nysds-cookie-banner p {
  margin: 0;
  line-height: 35px;
}

/* nygov only */
.o-wysiwyg .a-text__html div:not(.field--type-image) {
  margin: 0 !important;
}

/* footer insert wrap */
.nysds-footer-insert-wrap {
  background-color: #333;
  position: relative;
  padding: 1.5em;
  z-index: 600;
  width: auto;
  border-top: 2px solid #ccc;
}

.nysds-footer-insert-wrap p {
  margin: 0;
}

</style>

<div id="nysds-translate-banner" class="nysds-cookie-banner">
<div class="nysds-translate-group">
<p> This page is available in other languages. Select your language preference </p>
<div class="globe-icon" aria-hidden="true">
</div>
  <label class="sr-only" id="translate-label" for="langs">
   Select your language preference
  </label>
  <select class="nysds-select" id="langs" name="languages" aria-labelledby="translate-label">
      <option value="en" selected>English</option>
      <option value="fr">French</option>
      <option value="po">Polish</option>
      <option value="hc">Haitan-Creole</option>
  </select>
  <button id="nysds-close" class="nysds-close-button nysds-close-icon" aria-labelledby="close-button-label">
  <span class="sr-only" id="close-button-label" >Close this translate banner</span>
  </button>
</div>
</div>
<script>
  var closeclose = document.getElementById("nysds-close");
  if(closeclose){
    closeclose.addEventListener("click", closetranslate);
    function closetranslate () {
    document.getElementById("nysds-translate-banner").style.display = "none";
    }
    }

</script>

<script>
window.onload = function () {
let t5 = document.querySelector('#nygov-universal-footer');
t5.insertAdjacentHTML('afterend', '<div class="nysds-footer-insert-wrap"><div class="nysds-translate-group"><div class="nysds-caption-text">This page is available in other languages. Select your language preference</div><div class="inline-flex"><div class="globe-icon" aria-hidden="true"></div><label class="sr-only" id="translate-label" for="langs">Select your language preference</label><select class="nysds-select" id="langs" name="languages" aria-labelledby="translate-label"><option value="en" selected="selected">English</option><option value="fr">French</option><option value="po">Polish</option><option value="hc">Haitan-Creole</option></select></div></div></div>');
}
</script>



<div class="nysds-footer-insert-wrap">
<div class="nysds-translate-group">
        <div class="nysds-caption-text">This page is available in other languages. Select your language preference</div>
        <div class="inline-flex">
            <div class="globe-icon" aria-hidden="true"></div>
            <label class="sr-only" id="translate-label" for="langs">
                Select your language preference
            </label>
            <select class="nysds-select" id="langs" name="languages" aria-labelledby="translate-label">
                <option value="en" selected>English</option>
                <option value="fr">French</option>
                <option value="po">Polish</option>
                <option value="hc">Haitan-Creole</option>
            </select>
        </div>
    </div>
</div>