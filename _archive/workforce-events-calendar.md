---
layout: dol-layout.njk
title: workforce calendar demo
---
<div class="mx-auto w-10/12 font-body text-lg"><!-- START DOL Body html -->
    <div class="p-2 my-5">
        <h1 class="text-3xl font-bold text-nysds-heading">NYS Workforce Staff Training and Events Calendar </h1>
        <p class="p-4 text-sm bg-blue-100 border border-solid border-gray-400">
            NYSDOL is excited to announce our new Staff Training and Events Calendar, which will enable all workforce professionals across the state to view upcoming events, including webinars, weekly conference calls, and training that is held via videoconference. 
        </p>
        <p class="my-2">Training and professional development opportunities listed on this calendar are intended for workforce professionals and not for our job seeking customers. The NYS Career Center Events Calendar will be used to market events for job seeking customers being served by NYS Career Centers.
        </p>
    </div>
    <div class="grid grid-cols-4 gap-4 my-8">
        <div class="col-span-4 mb-7 md:mb-2 md:col-span-1">
          <script type="text/javascript">$Trumba.addSpud({
            webName: "training-1",
            spudType : "datefinder" });</script> <!-- datefinders -->
          <script type="text/javascript">$Trumba.addSpud({
            webName: "training-1",
            spudType : "mix" });</script><!-- mix? -->
          <script type="text/javascript">$Trumba.addSpud({
            webName: "training-1",
            spudType : "searchlabeled" });</script> <!-- search -->
        </div>
        <div class="col-span-4 md:col-span-3">
          <script type="text/javascript">$Trumba.addSpud({
            webName: "training-1",
            spudType : "tabchooser" });</script><!-- tabchooser -->
          <script type="text/javascript">$Trumba.addSpud({
            webName: "training-1",
            spudType : "monthlist" });</script><!-- month list -->
          <script type="text/javascript">$Trumba.addSpud({
            webName: "training-1",
            spudType : "main" });</script><!-- main calendar -->
        </div>
    </div>
    
</div><!-- END DOL Body html -->