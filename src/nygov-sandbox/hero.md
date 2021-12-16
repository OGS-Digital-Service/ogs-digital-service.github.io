---
layout: layout-nygov.njk
title: NYGov Profile test
---

<article class="p-landing-page -full-page ">
<div class="t-section -container">
													
			 

<!-- local hero image path change only -->
<style>
		.o-hero .o-hero__wrapper {
			background-image: url('/img/Hochul_WebsiteHero.png');
		}
		@media(min-width: 768px) {
			.o-hero .o-hero__wrapper {
				background-image: url('/img/Hochul_WebsiteHero.png');
			}
		}
		@media(min-width: 1280px) {
			.o-hero .o-hero__wrapper {
				background-image: url('/img/Hochul_WebsiteHero.png');
			}
			.o-hero .o-hero__wrapper.-right {
				background-image: url('/img/Hochul_WebsiteHero.png');
			}
			.o-hero .o-hero__wrapper.-bottom {
				background-image: url('/img/Hochul_WebsiteHero.png');
			}
		}

		.m-landingHero__contentWrapper.-left {
			background: #154973;
			opacity: 90%;
			border-radius: 30px;
			padding:45px;
		} 

		.a-hero__dateLanding {
  			font-family: "Proxima Nova", sans-serif;
  			font-size: 14px;
  			text-transform: uppercase;
		}
		.a-hero__titleLanding {
			font-size: 36px;
			line-height: 1.15em;
			font-family: "Proxima Nova", sans-serif;
			font-weight: 800;
		}
		.m-landingHero__title h2 {
			margin: 0px;
		}

		.m-landingHero__title {
			margin-bottom: 35px !important;
		}

		@media (min-width: 1280px) {
		.m-hero__meta.-landingHero .m-landingHero__contentWrapper {
		margin-top: 55px;	
   		 width: 580px;
			}
		.m-landingHero__description {
        margin-bottom: 35px !important;
		}

		}

		@media (min-width: 1280px) {
		.a-hero__description.-text {
			font-size: 18px;
            line-height: 25px !important;
		}
		}


		.a-hero__btn.-linkLanding {
			display: flex;
			align-content: center;
			justify-content: end;
			flex-flow: column;
			font-family: "Proxima Nova", sans-serif;
			font-weight: bold;
			font-size: 14px;
			text-decoration: none;
			text-transform: uppercase;
			border-bottom: 1px solid #FACE00;
			padding-bottom: 0px;
			letter-spacing: 2px;
			color: #FACE00;
			cursor: pointer;
			white-space: nowrap;
			z-index: 1;
			position: relative;
			}

		.a-hero__btn.-linkLanding:hover {
			border-bottom: 3px solid #FACE00;
		}

		.m-landingHero__buttons span::after {
			content: "\F30B" !important;
  			font-family: "Font Awesome 5 Free" !important;
  			font-weight: 900 !important;
		}

		@media (min-width: 425px){
			.m-hero__meta.-landingHero .m-landingHero__contentWrapper .m-landingHero__buttons {
			display: flex;
			flex-flow: row wrap;
			justify-content:flex-start;
		}
		}	

		.temp-button {
			width: 200px;
			height: 35px;
			margin-right: 45px;
			display: inline-flex;
			align-items: center;
		}
		
</style>


<!-- hero LEFT --> 
<h2 class="font-bold text-3xl text-red-500 mt-16" > Landing Hero Left </h2>


<div class="o-hero -landingPage">
<div class="o-hero__wrapper -left"></div>	
<div class="bg-primary-blue text-white m-hero__meta -landingHero">		 	
<div class="m-landingHero__contentWrapper -left">
<div class="m-landingHero__content">
<!-- <div class="m-landingHero__liveButton">
<button class="a-hero__btn -live" data-stream="{{url}}">Watch live</button>
</div> -->
<div class="m-landingHero__date">
<span class="a-hero__dateLanding">December 01, 2021</span>
</div>
<div class="m-landingHero__title">				
<h2 class="a-title a-hero__titleLanding">
Hero Title Lorem Ipsum Atlas Dolor Amet Tempor Magnar Aliqua
</h2>
</div>

<div class="m-landingHero__description">
<div class="a-text__string a-hero__description -text">New Yorkers who enjoy the great outdoors and receive their first COVID-19 vaccine dose in December can enter to win prizes tailored to anglers, hunters &amp; outdoor enthusiasts.</div>
</div>
</div>
<div class="m-landingHero__buttons">
<div class="temp-button">
<a href="https://www.governor.ny.gov/news/governor-hochul-announces-take-your-shot-outdoor-adventure-covid-19-vaccine-incentive" class="a-hero__btn -linkLanding">Learn More</a><span class="text-primary-gold" aria-hidden="true"></span></div>
<div class="temp-button">
<a href="https://www.dec.ny.gov/outdoor/124251.html" class="a-hero__btn -linkLanding">Watch Live </a><span class="text-primary-gold" aria-hidden="true"></span></div>
</div>
</div>
</div>
</div>
</div>
<!-- hero LEFT --> 

<!-- hero BOTTOM --> 
<h2 class="font-bold text-3xl text-red-500 mt-16" > Landing Hero bottom</h2>


<div class="o-hero -landingPage">
<div class="o-hero__wrapper -bottom"></div>	
<div class="bg-primary-blue text-white m-hero__meta -landingHero">			
<div class="m-landingHero__contentWrapper -bottom">
<div class="m-landingHero__content">
<!-- <div class="m-landingHero__liveButton">
						<button class="a-hero__btn -live" data-stream="{{url}}">Watch live</button>
</div> -->
<div class="m-landingHero__title">				
<h2 class="a-title a-hero__title">
'Take Your Shot for an Outdoor Adventure' Sweepstakes Open
</h2>
</div>
<div class="m-landingHero__date">
<span class="a-date text-primary-gold-light text-extra-bold a-hero__date">December 01, 2021</span>
</div>
<div class="m-landingHero__description">
<div class="a-text__string a-hero__description -text">New Yorkers who enjoy the great outdoors and receive their first COVID-19 vaccine dose in December can enter to win prizes tailored to anglers, hunters &amp; outdoor enthusiasts.</div>
</div>
</div>
<div class="m-landingHero__buttons">
<a href="https://www.governor.ny.gov/news/governor-hochul-announces-take-your-shot-outdoor-adventure-covid-19-vaccine-incentive" class="a-hero__btn -link">Learn More</a>
<a href="https://www.dec.ny.gov/outdoor/124251.html" class="a-hero__btn -link">Enter Sweepstakes</a>
</div>
</div>
</div>
</div>
</div>
<!-- hero BOTTOM --> 

<!-- hero RIGHT --> 
<h2 class="font-bold text-3xl text-red-500 mt-16" > Landing Hero right </h2>


<div class="o-hero -landingPage">
<div class="o-hero__wrapper -right"></div>	
<div class="bg-primary-blue text-white m-hero__meta -landingHero">			
<div class="m-landingHero__contentWrapper -right">
<div class="m-landingHero__content">
<!-- <div class="m-landingHero__liveButton">
						<button class="a-hero__btn -live" data-stream="{{url}}">Watch live</button>
</div> -->
<div class="m-landingHero__title">				
<h2 class="a-title a-hero__title">
'Take Your Shot for an Outdoor Adventure' Sweepstakes Open
</h2>
</div>
<div class="m-landingHero__date">
<span class="a-date text-primary-gold-light text-extra-bold a-hero__date">December 01, 2021</span>
</div>
<div class="m-landingHero__description">
<div class="a-text__string a-hero__description -text">New Yorkers who enjoy the great outdoors and receive their first COVID-19 vaccine dose in December can enter to win prizes tailored to anglers, hunters &amp; outdoor enthusiasts.</div>
</div>
</div>
<div class="m-landingHero__buttons">
<a href="https://www.governor.ny.gov/news/governor-hochul-announces-take-your-shot-outdoor-adventure-covid-19-vaccine-incentive" class="a-hero__btn -link">Learn More</a>
<a href="https://www.dec.ny.gov/outdoor/124251.html" class="a-hero__btn -link">Enter Sweepstakes</a>
</div>
</div>
</div>
</div>
</div>
<!-- hero RIGHT --> 


</article> <!-- end of main article enclosing -->