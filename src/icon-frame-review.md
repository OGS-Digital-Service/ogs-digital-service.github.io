---
layout: layout.njk
title: testing the icon frame update
---
<style>
  .arrow-right {
    box-sizing: border-box;
    position: relative;
    border-top: 2px solid transparent;
    border-bottom: 2px solid transparent;
    box-shadow: inset 0 0 0 2px;
    width: 65px;
    height: 6px;
    color: #F7A900;
    margin-bottom: 140px;
}
.arrow-right::after {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 6px;
    height: 6px;
    border-top: 2px solid;
    border-right: 2px solid;
    transform: rotate(45deg);
    right: 0;
    bottom: -2px
}
 .arrow-down {
  box-sizing: border-box;
    position: relative;
    border-right: 2px solid transparent;
    border-left: 2px solid transparent;
    box-shadow: inset 0 0 0 2px;
    height: 35px;
    width: 6px;
    color: #F7A900;
}
.arrow-down::after {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 6px;
    height: 6px;
    border-bottom: 2px solid;
    border-right: 2px solid;
    transform: rotate(45deg);
    bottom: 0;
    left: -2px
}
</style>
<div style="height:250px;"></div>

<section class="flex flex-col md:flex-row items-center mt-4 pt-4">
<div class=" mt-8 md:mt-0 w-3/4 md:w-1/4 md:h-64 border-0">
<div class="flex flex-col items-center"><img alt="an icon of a hand that is clicking a button" class="h-20 p-2 m-2" src="/img/NYS-EP-Icon_COVID.png" />
<h3 class="text-xl bold text-blue-900 py-2 my-2">COVID-19 Test or Vaccine </h3>
<p class="text-center w-full md:w-3/4">Receive COVID-19 vaccination series and/or negative test result (depending on the type of Pass)
</p>
</div>
</div>

<span class="arrow-right md:block hidden"></span>
<span class="arrow-down md:hidden block"></span>

<div class="mt-8 md:mt-0 w-3/4 md:w-1/4 md:h-64 border-0">
<div class="flex flex-col items-center"><img alt="Silhouettes of two people" class="h-20 p-2 m-2" src="/img/NYS-EP-Icon_Keyboard.png" />
<h3 class="text-xl bold text-blue-900 py-2 my-2">Pass Retrieval</h3>
<p class="text-center w-full md:w-3/4">Enter information to retrieve an Excelsior Pass and/or Excelsior Pass <em>Plus</em>
</p>
</div>
</div>

<span class="arrow-right md:block hidden"></span>
<span class="arrow-down md:hidden block"></span>

<div class="mt-8 md:mt-0 w-3/4 md:w-1/4 md:h-64 border-0">
<div class="flex flex-col items-center "><img alt="icon of a QR code on a smart phone" class="h-20 p-2 m-2" src="/img/NYS-EP-Icon_View-QR-Code.png" />
<h3 class="text-xl bold text-blue-900 py-2 my-2">Present Pass</h3>
<p class="text-center w-full md:w-3/4 ">Present Excelsior Pass and/or Excelsior Pass <em>Plus</em> and photo ID at an organization</p>
</div>
</div>

<span class="arrow-right md:block hidden"></span>
<span class="arrow-down md:hidden block"></span>

<div class="mt-8 md:mt-0 w-3/4 md:w-1/4 md:h-64 border-0">
<div class="flex flex-col items-center"><img alt="an icon of a smart phone taking a picture of a QR code" class="p-2 m-2 h-16 mb-6  " src="/img/NYS-EP-Icon_Gathering.png" />
<h3 class="text-xl bold text-blue-900 py-2 my-2">Safe Experience</h3>
<p class="text-center w-full md:w-3/4">Enjoy a safe, secure experience</p>
</div>
</div>
</section>


<div style="height:250px;"></div>


<section class="flex flex-col md:flex-row items-center mt-4 pt-4">
<div class=" mt-8 md:mt-0 w-3/4 md:w-1/4 md:h-64 border-0">
<div class="flex flex-col items-center"><img alt="an icon of a hand that is clicking a button" class="h-20 p-2 m-2" src="/img/NYS-EP-Icon_Download.png" />
<h3 class="text-xl bold text-blue-900 py-2 my-2">Scanner Retrieval</h3>
<p class="text-center w-full md:w-3/4">Download the NYS Excelsior Pass Scanner app and complete the form

</p>
</div>
</div>

<span class="arrow-right md:block hidden"></span>
<span class="arrow-down md:hidden block"></span>

<div class="mt-8 md:mt-0 w-3/4 md:w-1/4 md:h-64 border-0">
<div class="flex flex-col items-center"><img alt="Silhouettes of two people" class="h-20 p-2 m-2" src="/img/NYS-EP-Icon_Smartphone-QR-Code.png" />
<h3 class="text-xl bold text-blue-900 py-2 my-2">Define Scanning Process</h3>
<p class="text-center w-full md:w-3/4">Notify individuals and prepare technology

</p>
</div>
</div>

<span class="arrow-right md:block hidden"></span>
<span class="arrow-down md:hidden block"></span>

<div class="mt-8 md:mt-0 w-3/4 md:w-1/4 md:h-64 border-0">
<div class="flex flex-col items-center "><img alt="icon of a QR code on a smart phone" class="h-20 p-2 m-2" src="/img/NYS-EP-Icon_View-QR-Code.png" />
<h3 class="text-xl bold text-blue-900 py-2 my-2">Scan Pass</h3>
<p class="text-center w-full md:w-3/4 ">Scan each Excelsior Pass and/or Excelsior Pass <em>Plus</em> and verify photo IDs for adults aged 18+
 </p>
</div>
</div>

<span class="arrow-right md:block hidden"></span>
<span class="arrow-down md:hidden block"></span>

<div class="mt-8 md:mt-0 w-3/4 md:w-1/4 md:h-64 border-0">
<div class="flex flex-col items-center"><img alt="an icon of a smart phone taking a picture of a QR code" class="h-16 mb-6 p-2 m-2" src="/img/NYS-EP-Icon_Gathering.png" />
<h3 class="text-xl bold text-blue-900 py-2 my-2">Safe Experience</h3>
<p class="text-center w-full md:w-3/4">Enjoy a safe, secure experience
</p>
</div>
</div>
</section>

<div style="height:250px;"></div>