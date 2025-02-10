---
layout: page
title: Publications
show_sidebar: false
hero_image: /img/kwantaekim/IMG_3632.JPG
menubar_toc: true
toc_title: Contents
---

<!-- CSS -->
<style type="text/css">
.tg .tg-desc{border: 1px inset black; position: relative;}
.kwantae {color: black; text-decoration: underline; font-weight: bold;}

.tg {border-collapse: collapse; border: 1px solid black;}
.skip {display: none;}

/* TOC */
.contents {position: sticky; top: 10%;}

/* Hover Animation */
.pub td {transition: all 0.2s linear; transition-delay: 0.3s, 0s;}
.pub tr:hover td {transition-delay: 0s, 0s;
  outline: 1.5px solid black;
  background-color: white;
  box-shadow: #BFBFBF -1px 1px, #BFBFBF -2px 2px, #BFBFBF -3px 3px, #BFBFBF -4px 4px, #BFBFBF -5px 5px, #BFBFBF -6px 6px;
  transform: translate3d(6px, -6px, 0);}

/* Hover Image */
.img-container img {position: absolute; visibility: hidden;}
tr:hover .hover-isscc {left: -130px; top:calc(50% - 60px); visibility: visible; height: 120px;}
tr:hover .hover-vlsic {left: -140px; top:calc(50% - 45px); visibility: visible; height: 100px;}
tr:hover .hover-esscirc {left: -230px; top:calc(50% - 30px); visibility: visible; height: 50px;}
tr:hover .hover-a-sscc {left: -180px; top:calc(50% - 40px); visibility: visible; height: 80px;}
tr:hover .hover-cicc {left: -200px; top:calc(50% - 35px); visibility: visible; height: 60px;}
tr:hover .hover-iscas23 {left: -220px; top:calc(50% - 30px); visibility: visible; height: 50px;}
tr:hover .hover-iscas19 {left: -250px; top:calc(50% - 30px); visibility: visible; height: 50px;}
tr:hover .hover-iscas16 {left: -210px; top:calc(50% - 30px); visibility: visible; height: 70px;}
tr:hover .hover-aicas23 {left: -260px; top:calc(50% - 30px); visibility: visible; height: 50px;}
tr:hover .hover-hotchips {left: -150px; top:calc(50% - 30px); visibility: visible; height: 60px;}
tr:hover .hover-embc {left: -170px; top:calc(50% - 30px); visibility: visible; height: 50px;}
tr:hover .hover-sscs {left: -130px; top:calc(50% - 40px); visibility: visible; height: 80px;}
tr:hover .hover-cas {left: -120px; top:calc(50% - 40px); visibility: visible; height: 80px;}

/* Hyperlink */
.pub-hover {
  /* color: black; default #4E4E4E */
  text-decoration: none; /* Remove underline */}
.pub-hover:hover,
.pub-hover:focus {color: blue; background-color: #f0f8ff; padding: 1px 1px;}

/* Venue */
span.venue {font-style: italic;}
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

  $(document).ready(function(){
    $("span.venue").each(function() {
      var text = $(this).html();
      // Make specified strings bold and black
      text = text.replace(/\((ISSCC|S.VLSI|CICC|A-SSCC|ESSCIRC|JSSC|ISCAS|AICAS|MCAS|IEDM|HCS|EMBC|TCASAI|)\)/g, "<b style='color: black;'>($1)</b>");
      $(this).html(text);
    });
  });
</script>
<script src="https://kit.fontawesome.com/46ff08c48c.js" crossorigin="anonymous"></script>

## Citations

<iframe src="{{ site.base_url }}/img/citation_plot_overlay.html" width="100%" height="450" style="padding: 0; margin: 0; border: none;"></iframe>

\*Co-First Authors

## Accepted

<table class="tg">
<thead class="skip"><tr><th>.</th></tr></thead><tbody class='pub'>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/TCASAI.2024.3507694" target="_blank" class="pub-hover">
    DeltaKWS: A 65nm 36nJ/Decision Bio-inspired Temporal-Sparsity-Aware Digital Keyword Spotting IC with 0.6V Near-Threshold SRAM
    </a><br>
    Qinyu Chen*, Kwantae Kim*, Chang Gao*, Sheng Zhou, Taekwang Jang, Tobi Delbruck, Shih-Chii Liu
    <div class="img-container"><img src="./../img/icons/logo--cas.png" class="hover-cas"></div>
    <span class="venue">IEEE Transactions on Circuits and Systems for Artificial Intelligence (TCASAI)</span>
  </td></tr>
</tbody>
</table>

## 2025

<table class="tg">
<thead class="skip"><tr><th>.</th></tr></thead><tbody class='pub'>
  <tr><td class="tg-desc">
    <span style="color: #485fc7">A 8.62μW, 75dB DR<sub>SoC</sub> End-to-End Spoken Language Understanding SoC with Channel-Level AGC and Temporal-Sparsity-Aware Streaming-Mode RNN</span>
    <br>
    Sheng Zhou, Zixiao Li, Tobi Delbruck, Kwantae Kim, Shih-Chii Liu
    <div class="img-container"><img src="./../img/icons/logo--isscc.png" class="hover-isscc"></div>
    <span class="venue">IEEE International Solid-State Circuits Conference (ISSCC)</span>, 2025
  </td></tr>
</tbody>
</table>

## 2024

<table class="tg">
<thead class="skip"><tr><th>.</th></tr></thead><tbody class='pub'>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/MSSC.2024.3455290" target="_blank" class="pub-hover">
    Bringing Dynamic Sparsity to the Forefront for Low-Power Audio Edge Computing: Brain-inspired approach for sparsifying network updates
    </a><br>
    Shih-Chii Liu, Sheng Zhou, Zixiao Li, Chang Gao, Kwantae Kim, Tobi Delbruck
    <div class="img-container"><img src="./../img/icons/logo--sscs.png" class="hover-sscs"></div>
    <span class="venue">IEEE Solid-State Circuits Magazine</span>, 2024
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/MDAT.2024.3445831" target="_blank" class="pub-hover">
    Open-Source Silicon—Unleashing Innovation and Collaboration
    </a><br>
    Matthew Guthaus, Kwantae Kim, Francisco Brito-Filho, Satoshi Kawakami, Boris Murmann<br>
    <span class="venue">IEEE Design & Test</span>, 2024
  </td></tr>
</tbody>
</table>

## 2023

<table class="tg">
<thead class="skip"><tr><th>.</th></tr></thead><tbody class='pub'>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/JSSC.2023.3273238" target="_blank" class="pub-hover">
    Neuro-CIM: ADC-Less Neuromorphic Computing-in-Memory Processor With Operation Gating/Stopping and Digital–Analog Networks
    </a><br>
    Sangyeob Kim; Sangjin Kim; Soyeon Um; Soyeon Kim; Kwantae Kim; Hoi-Jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--sscs.png" class="hover-sscs"></div>
    <span class="venue">IEEE Journal of Solid-State Circuits (JSSC)</span>, 2023
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/AICAS57966.2023.10168561" target="_blank" class="pub-hover">
    High-Accuracy and Energy-Efficient Acoustic Inference using Hardware-Aware Training and a 0.34nW/Ch Full-Wave Rectifier
    </a><br>
    Sheng Zhou*; Xi Chen*; Kwantae Kim; Shih-Chii Liu
    <div class="img-container"><img src="./../img/icons/logo--aicas23.png" class="hover-aicas23"></div>
    <span class="venue">IEEE International Conference on Artificial Intelligence Circuits and Systems (AICAS)</span>, 2023
    <br><span style='color: black;'>
    <i class="fa-solid fa-trophy fa-lg"></i> Best Poster Award </span>
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/MCAS.2023.3267893" target="_blank" class="pub-hover">
    Continuous-Time Analog Filters for Audio Edge Intelligence: Review on Circuit Designs
    </a><br>
    Kwantae Kim; Shih-Chii Liu
    <div class="img-container"><img src="./../img/icons/logo--cas.png" class="hover-cas"></div>
    <span class="venue">IEEE Circuits and Systems Magazine</span>, 2023
    <br><span style='color: black;'>
    🎉 Top-1 in the Most Popular Articles in IEEE CAS Magazine (Sep. ~ Oct. 2023) </span>
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/ISCAS46773.2023.10181602" target="_blank" class="pub-hover">
    An Area-Efficient Ultra-Low-Power Time-Domain Feature Extractor for Edge Keyword Spotting
    </a><br>
    Qinyu Chen; Yaoxing Chang; Kwantae Kim; Chang Gao; Shih-Chii Liu
    <div class="img-container"><img src="./../img/icons/logo--iscas23.png" class="hover-iscas23"></div>
    <span class="venue">IEEE International Symposium on Circuits and Systems (ISCAS)</span>, 2023
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/ISCAS46773.2023.10181417" target="_blank" class="pub-hover">
    A 3.11 μW 40 nV/√Hz Instrumentation Amplifier for Bio-Impedance Sensors Exploiting Positive-Feedback-Assisted Gain Boosting
    </a><br>
    Kwantae Kim; Shih-Chii Liu
    <div class="img-container"><img src="./../img/icons/logo--iscas23.png" class="hover-iscas23"></div>
    <span class="venue">IEEE International Symposium on Circuits and Systems (ISCAS)</span>, 2023
    <br><span style='color: black;'>
    📚 Open-Sourced Design Parameters </span>
  </td></tr>
</tbody>
</table>

## 2022

<table class="tg">
<thead class="skip"><tr><th>.</th></tr></thead><tbody class='pub'>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/IEDM45625.2022.10019443" target="_blank" class="pub-hover">
    Energy-Efficient Activity-driven Computing Architectures for Edge Intelligence
    </a><br>
    Shih-Chii Liu; Chang Gao; Kwantae Kim; Tobi Delbruck
    <div class="img-container"><img src="./../img/icons/logo--iedm.png" class="hover-cas"></div>
    <span class="venue">IEEE International Electron Devices Meeting (IEDM)</span>, 2022
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/JSSC.2022.3195610" target="_blank" class="pub-hover">
    A 23-μW Keyword Spotting IC With Ring-Oscillator-Based Time-Domain Feature Extraction
    </a><br>
    Kwantae Kim; Chang Gao; Rui Graça; Ilya Kiselev; Hoi-Jun Yoo; Tobi Delbruck; Shih-Chii Liu
    <div class="img-container"><img src="./../img/icons/logo--sscs.png" class="hover-sscs"></div>
    <span class="venue">IEEE Journal of Solid-State Circuits (JSSC)</span>, 2022
    <br><span style='color: black;'>
    🎉 Highlighted in the IEEExplore Main Page (Sep. ~ Oct. 2023) <br>
    🎉 Top-2 in the Most Popular Articles in IEEE JSSC (Sep. ~ Oct. 2023) </span>
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/JSSC.2021.3100716" target="_blank" class="pub-hover">
    Design of Sub-10-μW Sub-0.1% THD Sinusoidal Current Generator IC for Bio-Impedance Sensing
    </a><br>
    Kwantae Kim; Sangyeob Kim; Hoi-Jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--sscs.png" class="hover-sscs"></div>
    <span class="venue">IEEE Journal of Solid-State Circuits (JSSC)</span>, 2022
    <br><span style='color: black;'>
    <i class="fa-solid fa-file-code fa-bounce fa-lg"></i> MATLAB/Verilog Code in <a href="./../assets/KwantaeKim_PhD_Thesis.pdf#page=63" target="_blank">PhD Thesis</a> <br>
    <i class="fa-solid fa-file-pdf fa-lg"></i> <a href="https://doi.org/10.1109/TCSII.2023.3261062" target="_blank">Relevant Publication</a> </span>
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/HCS55958.2022.9895498" target="_blank" class="pub-hover">
    Neuro-CIM: A 310.4 TOPS/W Neuromorphic Computing-in-Memory Processor with Low WL/BL activity and Digital-Analog Mixed-mode Neuron Firing
    </a><br>
    Sangyeob Kim; Sangjin Kim; Soyeon Um; Soyeon Kim; Kwantae Kim; Hoi-Jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--hotchips.png" class="hover-hotchips"></div>
    <span class="venue">IEEE Hot Chips Symposium (HCS)</span>, 2022
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/JSSC.2022.3182699" target="_blank" class="pub-hover">
    FlashMAC: A Time-Frequency Hybrid MAC Architecture With Variable Latency-Aware Scheduling for TinyML Systems
    </a><br>
    Surin Gweon; Sanghoon Kang; Kwantae Kim; Hoi-Jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--sscs.png" class="hover-sscs"></div>
    <span class="venue">IEEE Journal of Solid-State Circuits (JSSC)</span>, 2022
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/VLSITechnologyandCir46769.2022.9830276" target="_blank" class="pub-hover">
    Neuro-CIM: A 310.4 TOPS/W Neuromorphic Computing-in-Memory Processor with Low WL/BL activity and Digital-Analog Mixed-mode Neuron Firing
    </a><br>
    Sangyeob Kim; Sangjin Kim; Soyeon Um; Soyeon Kim; Kwantae Kim; Hoi-Jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--vlsi.png" class="hover-sscs"></div>
    <span class="venue">IEEE Symposium on VLSI Technology and Circuits (S.VLSI)</span>, 2022
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/ISSCC42614.2022.9731708" target="_blank" class="pub-hover">
    A 23μW Solar-Powered Keyword-Spotting ASIC with Ring-Oscillator-Based Time-Domain Feature Extraction
    </a><br>
    Kwantae Kim*; Chang Gao*; Rui Graça; Ilya Kiselev; Hoi-Jun Yoo; Tobi Delbruck; Shih-Chii Liu
    <div class="img-container"><img src="./../img/icons/logo--isscc.png" class="hover-isscc"></div>
    <span class="venue">IEEE International Solid-State Circuits Conference (ISSCC)</span>, 2022
    <br><span style='color: black;'>
    📚 Invited to IEEE JSSC 2022 </span>
  </td></tr>
</tbody>
</table>

## 2021

<table class="tg">
<thead class="skip"><tr><th>.</th></tr></thead><tbody class='pub'>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/A-SSCC53895.2021.9634746" target="_blank" class="pub-hover">
    FlashMAC: An Energy-Efficient Analog-Digital Hybrid MAC with Variable Latency-Aware Scheduling
    </a><br>
    Surin Gweon; Sanghoon Kang; Donghyeon Han; Kyoung-Rog Lee; Kwantae Kim; Hoi-Jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--a-sscc.png" class="hover-a-sscc"></div>
    <span class="venue">IEEE Asian Solid-State Circuits Conference (A-SSCC)</span>, 2021
  </td></tr>
</tbody>
</table>

## 2020

<table class="tg">
<thead class="skip"><tr><th>.</th></tr></thead><tbody class='pub'>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/JSSC.2020.2991511" target="_blank" class="pub-hover">
    A 0.5-V Sub-10-μW 15.28-mΩ/√Hz Bio-Impedance Sensor IC With Sub-1° Phase Error
    </a><br>
    Kwantae Kim; Ji-Hoon Kim; Surin Gweon; Minseo Kim; Hoi-Jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--sscs.png" class="hover-sscs"></div>
    <span class="venue">IEEE Journal of Solid-State Circuits (JSSC)</span>, 2020
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/VLSICircuits18222.2020.9162983" target="_blank" class="pub-hover">
    A 0.5V, 6.2μW, 0.059mm<sup>2</sup> Sinusoidal Current Generator IC with 0.088% THD for Bio-Impedance Sensing
    </a><br>
    Kwantae Kim; Changhyeon Kim; Sungpill Choi; Hoi-Jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--vlsic.png" class="hover-vlsic"></div>
    <span class="venue">IEEE Symposium on VLSI Circuits (S.VLSI)</span>, 2020
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/CICC48029.2020.9075950" target="_blank" class="pub-hover">
    A 9.6 mW/Ch 10 MHz Wide-bandwidth Electrical Impedance Tomography IC with Accurate Phase Compensation for Breast Cancer Detection
    </a><br>
    Jaehyuk Lee; Surin Gweon; Kwonjoon Lee; Soyeon Um; Kyoung-Rog Lee; Kwantae Kim; Jihee Lee; Hoi-Jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--cicc.png" class="hover-cicc"></div>
    <span class="venue">IEEE Custom Integrated Circuits Conference (CICC)</span>, 2020
  </td></tr>
</tbody>
</table>

## 2019

<table class="tg">
<thead class="skip"><tr><th>.</th></tr></thead><tbody class='pub'>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/ISCAS.2019.8702698" target="_blank" class="pub-hover">
    An Ultra-Low-Power Analog-Digital Hybrid CNN Face Recognition Processor Integrated with a CIS for Always-on Mobile Devices
    </a><br>
    Ji-Hoon Kim; Changhyeon Kim; Kwantae Kim; Hoi-Jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--iscas19.png" class="hover-iscas19"></div>
    <span class="venue">IEEE International Symposium on Circuits and Systems (ISCAS)</span>, 2019
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/ISCAS.2019.8702435" target="_blank" class="pub-hover">
    93.8% Current Efficiency and 0.672 ns Transient Response Reconfigurable LDO for Wireless Sensor Network Systems
    </a><br>
    Surin Gweon; Jaehyuk Lee; Kwantae Kim; Hoi-Jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--iscas19.png" class="hover-iscas19"></div>
    <span class="venue">IEEE International Symposium on Circuits and Systems (ISCAS)</span>, 2019
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/ISSCC.2019.8662504" target="_blank" class="pub-hover">
    A 7.0fps Optical and Electrical Dual Tomographic Imaging SoC for Skin-Disease Diagnosis System
    </a><br>
    Yongsu Lee; Kwantae Kim; Jiwon Lee; Kyoung-Rog Lee; Surin Gweon; Minseo Kim; Hoi-Jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--isscc.png" class="hover-isscc"></div>
    <span class="venue">IEEE International Solid-State Circuits Conference (ISSCC)</span>, 2019
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/ISSCC.2019.8662466" target="_blank" class="pub-hover">
    A 0.5V 9.26μW 15.28mΩ/√Hz Bio-Impedance Sensor IC With 0.55° Overall Phase Error
    </a><br>
    Kwantae Kim; Ji-Hoon Kim; Surin Gweon; Jiwon Lee; Minseo Kim; Yongsu Lee; Soyeon Kim; Hoi-Jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--isscc.png" class="hover-isscc"></div>
    <span class="venue">IEEE International Solid-State Circuits Conference (ISSCC)</span>, 2019
    <br><span style='color: black;'>
    <i class="fa-solid fa-trophy fa-lg"></i> Silver Award in 2019 Samsung HumanTech paper competition </span>
  </td></tr>
</tbody>
</table>

## 2017

<table class="tg">
<thead class="skip"><tr><th>.</th></tr></thead><tbody class='pub'>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/JSSC.2017.2753234" target="_blank" class="pub-hover">
    A 1.4-mΩ-Sensitivity 94-dB Dynamic-Range Electrical Impedance Tomography SoC and 48-Channel Hub-SoC for 3-D Lung Ventilation Monitoring System
    </a><br>
    Minseo Kim; Jaeeun Jang; Hyunki Kim; Jihee Lee; Jaehyuck Lee; Jiwon Lee; Kyoung-Rog Lee; Kwantae Kim; Yongsu Lee; Kyuho Jason Lee; Hoi-Jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--sscs.png" class="hover-sscs"></div>
    <span class="venue">IEEE Journal of Solid-State Circuits (JSSC)</span>, 2017
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/EMBC.2017.8037109" target="_blank" class="pub-hover">
    An Adaptive DC-Balanced and Multi-Mode Stimulator IC with 1GΩ Output Impedance for Compact Electro-Acupuncture System
    </a><br>
    Jiwon Lee; Minseo Kim; Kwantae Kim; Kiseok Song; Sanghoon Lee; Weon Kim; Jong Shin Woo; Hoi-Jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--embc.png" class="hover-embc"></div>
    <span class="venue">IEEE Engineering in Medicine and Biology Society (EMBC)</span>, 2017
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/ESSCIRC.2017.8094566" target="_blank" class="pub-hover">
    A 24 μW 38.51 mΩ<sub>rms</sub> Resolution Bio-Impedance Sensor with Dual Path Instrumentation Amplifier
    </a><br>
    Kwantae Kim; Kiseok Song; Kyeongryeol Bong; Jaehyuk Lee; Kwonjoon Lee; Yongsu Lee; Unsoo Ha; Hoi-Jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--esscirc.png" class="hover-esscirc"></div>
    <span class="venue">IEEE European Solid State Circuits Conference (ESSCIRC)</span>, 2017
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/ISSCC.2017.7870407" target="_blank" class="pub-hover">
    A 1.4mΩ-Sensitivity 94dB-Dynamic-Range Electrical Impedance Tomography SoC and 48-Channel Hub SoC for 3D Lung Ventilation Monitoring System
    </a><br>
    Minseo Kim; Hyunki Kim; Jaeeun Jang; Jihee Lee; Jaehyuk Lee; Jiwon Lee; Kyungrog Lee; Kwantae Kim; Yongsu Lee; Hoi-jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--isscc.png" class="hover-isscc"></div>
    <span class="venue">IEEE International Solid-State Circuits Conference (ISSCC)</span>, 2017
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/ISSCC.2017.7870455" target="_blank" class="pub-hover">
    A 25.2mW EEG-NIRS Multimodal SoC for Accurate Anesthesia Depth Monitoring
    </a><br>
    Unsoo Ha; Jaehyuk Lee; Jihee Lee; Kwantae Kim; Minseo Kim; Taehwan Roh; Sangsik Choi; Hoi-Jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--isscc.png" class="hover-isscc"></div>
    <span class="venue">IEEE International Solid-State Circuits Conference (ISSCC)</span>, 2017
  </td></tr>
</tbody>
</table>

## 2016

<table class="tg">
<thead class="skip"><tr><th>.</th></tr></thead><tbody class='pub'>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/ISCAS.2016.7527432" target="_blank" class="pub-hover">
    A 54-μW Fast-Settling Arterial Pulse Wave Sensor for Wrist Watch Type System
    </a><br>
    Kwantae Kim; Minseo Kim; Hyunwoo Cho; Kwonjoon Lee; Seung-Tak Ryu; Hoi-Jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--iscas16.png" class="hover-iscas16"></div>
    <span class="venue">IEEE International Symposium on Circuits and Systems (ISCAS)</span>, 2016
  </td></tr>
  <tr><td class="tg-desc">
    <a href="https://doi.org/10.1109/ISSCC.2016.7418068" target="_blank" class="pub-hover">
    A 141μW Sensor SoC on OLED/OPD Substrate for SpO2/ExG Monitoring Sticker
    </a><br>
    Yongsu Lee; Hyeonwoo Lee; Jaeeun Jang; Jihee Lee; Minseo Kim; Jaehyuk Lee; Hyunki Kim; Kyoung-Rog Lee; Kwantae Kim; Hyunwoo Cho; Seunghyup Yoo; Hoi-Jun Yoo
    <div class="img-container"><img src="./../img/icons/logo--isscc.png" class="hover-isscc"></div>
    <span class="venue">IEEE International Solid-State Circuits Conference (ISSCC)</span>, 2016
  </td></tr>
</tbody>
</table>

<br><br>

---

***Acknowledgments***<br>
Thanks to <a href="https://github.com/ZuowenWang0000" target="_blank">Zuowen Wang</a> for taking an awesome <i class="fa-solid fa-camera fa-lg"></i> photo!
