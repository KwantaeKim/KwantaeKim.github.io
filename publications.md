---
layout: page
title: Publications
hero_height: is_small
menubar_toc: true
toc_title: Contents
show_sidebar: false
---

<style type="text/css">
.tg .tg-venue{text-align:center; vertical-align:middle; border: 1px inset black}
.tg .tg-desc{border: 1px inset black; position: relative}
.kwantae {text-decoration: underline; background-color: #f0f8ff; padding: 1px 1px;}

table {border-collapse: collapse; border: 1px solid black;}
thead {display: none;}
.scholar {position: relative;}
.scholar-img {display: block;}
.scholar-txt {position: absolute; top: -10%; left:50%; transform: translateX(-120%);}

/* TOC */
.contents {position: sticky; top: 10%;}

/* Hover Animation */
.pub td {transition: all 0.2s linear; transition-delay: 0.3s, 0s;}
.pub tr:hover td {transition-delay: 0s, 0s; font-size: 1.1em;
  outline: 1.5px solid black;
  background-color: white;
  box-shadow: #BFBFBF -1px 1px, #BFBFBF -2px 2px, #BFBFBF -3px 3px, #BFBFBF -4px 4px, #BFBFBF -5px 5px, #BFBFBF -6px 6px;
  transform: translate3d(6px, -6px, 0);}

/* Hover Image */
.image-container img {position: absolute; visibility: hidden;}
tr:hover .hover-image {left: -150px; top:calc(50% - 75px); visibility: visible;}
</style>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
  $(document).ready(function(){
    $("td.tg-desc").each(function() {
      var text = $(this).html();
      text = text.replace(/\b(Kwantae Kim)\b/g, "<span class='kwantae'>$1</span>");
      $(this).html(text);
    });
  });
  function replaceSemicolonWithComma() {
    var elements = document.querySelectorAll('td.tg-desc');
    elements.forEach(function(element) {
      // Iterate through child nodes and replace semicolons in text nodes only
      Array.from(element.childNodes).forEach(function(child) {
        if (child.nodeType === Node.TEXT_NODE) {
            var text = child.textContent;
            text = text.replace(/;/g, ',');
            child.textContent = text;
          }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    replaceSemicolonWithComma();
  });
</script>

## Highlights

**10** First-Authored IEEE papers <br>
→ 2 ISSCC, 3 JSSC, 1 VLSI, 1 ESSCIRC, etc

**27** Authored/Co-Authored IEEE papers

<div style="display: flex; align-items: center;">
  <span style="margin-right: 5em;"></span>
  <img src="./../img/icons/black--graduation-cap-solid.png" style="width: auto; height: 40px;">
  <div style="margin-left: 5px;"><a href="https://scholar.google.com/citations?user=YcWEaGIAAAAJ&hl=en" target="_blank">Google Scholar</a><br></div>
</div>
<img src="../img/citation_plot.png" style="width: 600px; height: auto;">

## First-Authored

\*Co-First Authors

<table class="tg">
<thead class="skip"><tr><th>.</th></tr></thead><tbody class='pub'>
  <tr><td class="tg-desc">
    Kwantae Kim*; Chang Gao*; Rui Graça; Ilya Kiselev; Hoi-Jun Yoo; Tobi Delbruck; Shih-Chii Liu
    <br>
    <a href="https://doi.org/10.1109/ISSCC42614.2022.9731708" target="_blank">
    "A 23μW Solar-Powered Keyword-Spotting ASIC with Ring-Oscillator-Based Time-Domain Feature Extraction"
    </a><br>
    <div class="image-container"><img src="./../img/icons/logo--isscc.png" class="hover-image" style="height: 150px;"></div>
    <span style="font-style:italic;">IEEE International Solid-State Circuits Conference (ISSCC)</span>, 2022
    <br>
    📚 Invited to IEEE JSSC 2022
  </td></tr>
  <tr><td class="tg-desc">
    Kwantae Kim; Ji-Hoon Kim; Surin Gweon; Jiwon Lee; Minseo Kim; Yongsu Lee; Soyeon Kim; Hoi-Jun Yoo
    <br>
    <a href="https://doi.org/10.1109/ISSCC.2019.8662466" target="_blank">
    "A 0.5V 9.26μW 15.28mΩ/√Hz Bio-Impedance Sensor IC With 0.55° Overall Phase Error"
    </a><br>
    <div class="image-container"><img src="./../img/icons/logo--isscc.png" class="hover-image" style="height: 150px;"></div>
    <span style="font-style:italic;">IEEE International Solid-State Circuits Conference (ISSCC)</span>, 2019
    <br>
    🎉 Silver Award🥈in Samsung HumanTech Paper Competition
  </td></tr>
  <tr><td class="tg-desc">
    Kwantae Kim; Chang Gao; Rui Graça; Ilya Kiselev; Hoi-Jun Yoo; Tobi Delbruck; Shih-Chii Liu
    <br>
    <a href="https://doi.org/10.1109/JSSC.2022.3195610" target="_blank">
    "A 23-μW Keyword Spotting IC With Ring-Oscillator-Based Time-Domain Feature Extraction"
    </a><br>
    <span style="font-style:italic;">IEEE Journal of Solid-State Circuits (JSSC)</span>, 2022
    <br>
    🎉 Highlighted in the IEEExplore Main Page (Sep. ~ Oct. 2023) <br>
    🎉 Top-2 in the Most Popular Articles in IEEE JSSC (Sep. ~ Oct. 2023)
  </td></tr>
  <tr><td class="tg-desc">
    Kwantae Kim; Sangyeob Kim; Hoi-Jun Yoo
    <br>
    <a href="https://doi.org/10.1109/JSSC.2021.3100716" target="_blank">
    "Design of Sub-10-μW Sub-0.1% THD Sinusoidal Current Generator IC for Bio-Impedance Sensing"
    </a><br>
    <span style="font-style:italic;">IEEE Journal of Solid-State Circuits (JSSC)</span>, 2022
    <br>
    📚 <a href="./../assets/KwantaeKim_PhD_Thesis.pdf#page=63" target="_blank">Open-Sourced (MATLAB/Verilog)</a>
  </td></tr>
  <tr><td class="tg-desc">
    Kwantae Kim; Ji-Hoon Kim; Surin Gweon; Minseo Kim; Hoi-Jun Yoo
    <br>
    <a href="https://doi.org/10.1109/JSSC.2020.2991511" target="_blank">
    "A 0.5-V Sub-10-μW 15.28-mΩ/√Hz Bio-Impedance Sensor IC With Sub-1° Phase Error"
    </a><br>
    <span style="font-style:italic;">IEEE Journal of Solid-State Circuits (JSSC)</span>, 2020
  </td></tr>
  <tr><td class="tg-desc">
    Kwantae Kim; Shih-Chii Liu
    <br>
    <a href="https://doi.org/10.1109/MCAS.2023.3267893" target="_blank">
    "Continuous-Time Analog Filters for Audio Edge Intelligence: Review on Circuit Designs"
    </a><br>
    <span style="font-style:italic;">IEEE Circuits and Systems Magazine (MCAS)</span>, 2023
    <br>
    🎉 Top-1 in the Most Popular Articles in IEEE MCAS (Sep. ~ Oct. 2023)
  </td></tr>
  <tr><td class="tg-desc">
    Kwantae Kim; Changhyeon Kim; Sungpill Choi; Hoi-Jun Yoo
    <br>
    <a href="https://doi.org/10.1109/VLSICircuits18222.2020.9162983" target="_blank">
    "A 0.5V, 6.2μW, 0.059mm<sup>2</sup> Sinusoidal Current Generator IC with 0.088% THD for Bio-Impedance Sensing"
    </a><br>
    <span style="font-style:italic;">IEEE Symposium on VLSI Circuits</span>, 2020
  </td></tr>
  <tr><td class="tg-desc">
    Kwantae Kim; Kiseok Song; Kyeongryeol Bong; Jaehyuk Lee; Kwonjoon Lee; Yongsu Lee; Unsoo Ha; Hoi-Jun Yoo
    <br>
    <a href="https://doi.org/10.1109/ESSCIRC.2017.8094566" target="_blank">
    "A 24 μW 38.51 mΩ<sub>rms</sub> Resolution Bio-Impedance Sensor with Dual Path Instrumentation Amplifier"
    </a><br>
    <span style="font-style:italic;">IEEE European Solid State Circuits Conference (ESSCIRC)</span>, 2017
  </td></tr>
  <tr><td class="tg-desc">
    Kwantae Kim; Shih-Chii Liu
    <br>
    <a href="https://doi.org/10.1109/ISCAS46773.2023.10181417" target="_blank">
    "A 3.11 μW 40 nV/√Hz Instrumentation Amplifier for Bio-Impedance Sensors Exploiting Positive-Feedback-Assisted Gain Boosting"
    </a><br>
    <span style="font-style:italic;">IEEE International Symposium on Circuits and Systems (ISCAS)</span>, 2023
    <br>
    📚 Open-Sourced Design Parameters
  </td></tr>
  <tr><td class="tg-desc">
    Kwantae Kim; Minseo Kim; Hyunwoo Cho; Kwonjoon Lee; Seung-Tak Ryu; Hoi-Jun Yoo
    <br>
    <a href="https://doi.org/10.1109/ISCAS.2016.7527432" target="_blank">
    "A 54-μW Fast-Settling Arterial Pulse Wave Sensor for Wrist Watch Type System"
    </a><br>
    <span style="font-style:italic;">IEEE International Symposium on Circuits and Systems (ISCAS)</span>, 2016
  </td></tr>
</tbody></table>

<br>

## Co-Authored

### 2023

<table class="tg">
<thead class="skip"><tr><th>.</th></tr></thead><tbody class='pub'>
  <tr><td class="tg-desc">
    Sangyeob Kim; Sangjin Kim; Soyeon Um; Soyeon Kim; Kwantae Kim; Hoi-Jun Yoo
    <br>
    <a href="https://doi.org/10.1109/JSSC.2023.3273238" target="_blank">
    "Neuro-CIM: ADC-Less Neuromorphic Computing-in-Memory Processor With Operation Gating/Stopping and Digital–Analog Networks"
    </a><br>
    <span style="font-style:italic;">IEEE Journal of Solid-State Circuits (JSSC)</span> 2023
  </td></tr>
  <tr><td class="tg-desc">
    Sheng Zhou*; Xi Chen*; Kwantae Kim; Shih-Chii Liu
    <br>
    <a href="https://doi.org/10.1109/AICAS57966.2023.10168561" target="_blank">
    "High-Accuracy and Energy-Efficient Acoustic Inference using Hardware-Aware Training and a 0.34nW/Ch Full-Wave Rectifier"
    </a><br>
    <span style="font-style:italic;">IEEE International Conference on Artificial Intelligence Circuits and Systems (AICAS)</span> 2023
    <br>
    🎉 Best Poster Award
  </td></tr>
  <tr><td class="tg-desc">
    Qinyu Chen; Yaoxing Chang; Kwantae Kim; Chang Gao; Shih-Chii Liu
    <br>
    <a href="https://doi.org/10.1109/ISCAS46773.2023.10181602" target="_blank">
    “An Area-Efficient Ultra-Low-Power Time-Domain Feature Extractor for Edge Keyword Spotting”
    </a><br>
    <span style="font-style:italic;">IEEE International Symposium on Circuits and Systems (ISCAS)</span> 2023
  </td></tr>
</tbody>
</table>

### 2022

<table class="tg">
<thead class="skip"><tr><th>.</th></tr></thead><tbody class='pub'>
  <tr><td class="tg-desc">
    Shih-Chii Liu; Chang Gao; Kwantae Kim; Tobi Delbruck
    <br>
    <a href="https://doi.org/10.1109/IEDM45625.2022.10019443" target="_blank">
    "Energy-Efficient Activity-driven Computing Architectures for Edge Intelligence"
    </a><br>
    <span style="font-style:italic;">IEEE International Electron Devices Meeting (IEDM)</span> 2022
  </td></tr>
  <tr><td class="tg-desc">
    Sangyeob Kim; Sangjin Kim; Soyeon Um; Soyeon Kim; Kwantae Kim; Hoi-Jun Yoo
    <br>
    <a href="https://doi.org/10.1109/HCS55958.2022.9895498" target="_blank">
    "Neuro-CIM: A 310.4 TOPS/W Neuromorphic Computing-in-Memory Processor with Low WL/BL activity and Digital-Analog Mixed-mode Neuron Firing"
    </a><br>
    <span style="font-style:italic;">IEEE Hot Chips Symposium (HCS)</span> 2022
  </td></tr>
  <tr><td class="tg-desc">
    Surin Gweon; Sanghoon Kang; Kwantae Kim; Hoi-Jun Yoo
    <br>
    <a href="https://doi.org/10.1109/JSSC.2022.3182699" target="_blank">
    "FlashMAC: A Time-Frequency Hybrid MAC Architecture With Variable Latency-Aware Scheduling for TinyML Systems"
    </a><br>
    <span style="font-style:italic;">IEEE Journal of Solid-State Circuits (JSSC)</span> 2022
  </td></tr>
  <tr><td class="tg-desc">
    Sangyeob Kim; Sangjin Kim; Soyeon Um; Soyeon Kim; Kwantae Kim; Hoi-Jun Yoo
    <br>
    <a href="https://doi.org/10.1109/VLSITechnologyandCir46769.2022.9830276" target="_blank">
    "Neuro-CIM: A 310.4 TOPS/W Neuromorphic Computing-in-Memory Processor with Low WL/BL activity and Digital-Analog Mixed-mode Neuron Firing"
    </a><br>
    <span style="font-style:italic;">IEEE Symposium on VLSI Circuits</span> 2022
  </td></tr>
</tbody>
</table>

### 2021

<table class="tg">
<thead class="skip"><tr><th>.</th></tr></thead><tbody class='pub'>
  <tr><td class="tg-desc">
    Surin Gweon; Sanghoon Kang; Donghyeon Han; Kyoung-Rog Lee; Kwantae Kim; Hoi-Jun Yoo
    <br>
    <a href="https://doi.org/10.1109/A-SSCC53895.2021.9634746" target="_blank">
    "FlashMAC: An Energy-Efficient Analog-Digital Hybrid MAC with Variable Latency-Aware Scheduling"
    </a><br>
    <span style="font-style:italic;">IEEE Asian Solid-State Circuits Conference (A-SSCC)</span> 2021
  </td></tr>
</tbody>
</table>

### 2020

<table class="tg">
<thead class="skip"><tr><th>.</th></tr></thead><tbody class='pub'>
  <tr><td class="tg-desc">
    Jaehyuk Lee; Surin Gweon; Kwonjoon Lee; Soyeon Um; Kyoung-Rog Lee; Kwantae Kim; Jihee Lee; Hoi-Jun Yoo
    <br>
    <a href="https://doi.org/10.1109/CICC48029.2020.9075950" target="_blank">
    "A 9.6 mW/Ch 10 MHz Wide-bandwidth Electrical Impedance Tomography IC with Accurate Phase Compensation for Breast Cancer Detection"
    </a><br>
    <span style="font-style:italic;">IEEE Custom Integrated Circuits Conference (CICC)</span> 2020
  </td></tr>
</tbody>
</table>

### 2019

<table class="tg">
<thead class="skip"><tr><th>.</th></tr></thead><tbody class='pub'>
  <tr><td class="tg-desc">
    Ji-Hoon Kim; Changhyeon Kim; Kwantae Kim; Hoi-Jun Yoo
    <br>
    <a href="https://doi.org/10.1109/ISCAS.2019.8702698" target="_blank">
    "An Ultra-Low-Power Analog-Digital Hybrid CNN Face Recognition Processor Integrated with a CIS for Always-on Mobile Devices"
    </a><br>
    <span style="font-style:italic;">IEEE International Symposium on Circuits and Systems (ISCAS)</span> 2019
  </td></tr>
  <tr><td class="tg-desc">
    Surin Gweon; Jaehyuk Lee; Kwantae Kim; Hoi-Jun Yoo
    <br>
    <a href="https://doi.org/10.1109/ISCAS.2019.8702435" target="_blank">
    "93.8% Current Efficiency and 0.672 ns Transient Response Reconfigurable LDO for Wireless Sensor Network Systems"
    </a><br>
    <span style="font-style:italic;">IEEE International Symposium on Circuits and Systems (ISCAS)</span> 2019
  </td></tr>
  <tr><td class="tg-desc">
    Yongsu Lee; Kwantae Kim; Jiwon Lee; Kyoung-Rog Lee; Surin Gweon; Minseo Kim; Hoi-Jun Yoo
    <br>
    <a href="https://doi.org/10.1109/ISSCC.2019.8662504" target="_blank">
    "A 7.0fps Optical and Electrical Dual Tomographic Imaging SoC for Skin-Disease Diagnosis System"
    </a><br>
    <span style="font-style:italic;">IEEE International Solid-State Circuits Conference (ISSCC)</span> 2019
  </td></tr>
</tbody>
</table>

### 2017

<table class="tg">
<thead class="skip"><tr><th>.</th></tr></thead><tbody class='pub'>
  <tr><td class="tg-desc">
    Minseo Kim; Jaeeun Jang; Hyunki Kim; Jihee Lee; Jaehyuck Lee; Jiwon Lee; Kyoung-Rog Lee; Kwantae Kim; Yongsu Lee; Kyuho Jason Lee; Hoi-Jun Yoo
    <br>
    <a href="https://doi.org/10.1109/JSSC.2017.2753234" target="_blank">
    "A 1.4-mΩ-Sensitivity 94-dB Dynamic-Range Electrical Impedance Tomography SoC and 48-Channel Hub-SoC for 3-D Lung Ventilation Monitoring System"
    </a><br>
    <span style="font-style:italic;">IEEE Journal of Solid-State Circuits (JSSC)</span> 2017
  </td></tr>
  <tr><td class="tg-desc">
    Jiwon Lee; Minseo Kim; Kwantae Kim; Kiseok Song; Sanghoon Lee; Weon Kim; Jong Shin Woo; Hoi-Jun Yoo
    <br>
    <a href="https://doi.org/10.1109/EMBC.2017.8037109" target="_blank">
    “An Adaptive DC-Balanced and Multi-Mode Stimulator IC with 1GΩ Output Impedance for Compact Electro-Acupuncture System”
    </a><br>
    <span style="font-style:italic;">IEEE Engineering in Medicine and Biology Society (EMBC)</span> 2017
  </td></tr>
  <tr><td class="tg-desc">
    Minseo Kim; Hyunki Kim; Jaeeun Jang; Jihee Lee; Jaehyuk Lee; Jiwon Lee; Kyungrog Lee; Kwantae Kim; Yongsu Lee; Hoi-jun Yoo
    <br>
    <a href="https://doi.org/10.1109/ISSCC.2017.7870407" target="_blank">
    “A 1.4mΩ-Sensitivity 94dB-Dynamic-Range Electrical Impedance Tomography SoC and 48-Channel Hub SoC for 3D Lung Ventilation Monitoring System”
    </a><br>
    <div class="image-container"><img src="./../img/icons/logo--isscc.png" class="hover-image" style="height: 150px;"></div>
    <span style="font-style:italic;">IEEE International Solid-State Circuits Conference (ISSCC)</span> 2017
  </td></tr>
  <tr><td class="tg-desc">
    Unsoo Ha; Jaehyuk Lee; Jihee Lee; Kwantae Kim; Minseo Kim; Taehwan Roh; Sangsik Choi; Hoi-Jun Yoo
    <br>
    <a href="https://doi.org/10.1109/ISSCC.2017.7870455" target="_blank">
    “A 25.2mW EEG-NIRS Multimodal SoC for Accurate Anesthesia Depth Monitoring”
    </a><br>
    <div class="image-container"><img src="./../img/icons/logo--isscc.png" class="hover-image" style="height: 150px;"></div>
    <span style="font-style:italic;">IEEE International Solid-State Circuits Conference (ISSCC)</span> 2017
  </td></tr>
</tbody>
</table>

### 2016

<table class="tg">
<thead class="skip"><tr><th>.</th></tr></thead><tbody class='pub'>
  <tr><td class="tg-desc">
    Yongsu Lee; Hyeonwoo Lee; Jaeeun Jang; Jihee Lee; Minseo Kim; Jaehyuk Lee; Hyunki Kim; Kyoung-Rog Lee; Kwantae Kim; Hyunwoo Cho; Seunghyup Yoo; Hoi-Jun Yoo
    <br>
    <a href="https://doi.org/10.1109/ISSCC.2017.7870455" target="_blank">
    “A 141μW Sensor SoC on OLED/OPD Substrate for SpO2/ExG Monitoring Sticker”
    </a><br>
    <div class="image-container"><img src="./../img/icons/logo--isscc.png" class="hover-image" style="height: 150px;"></div>
    <span style="font-style:italic;">IEEE International Solid-State Circuits Conference (ISSCC)</span> 2016
  </td></tr>
</tbody>
</table>
