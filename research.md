---
layout: page
# hero_height: is-large
show_sidebar: false
hero_image: /img/research/hero_image.png
# hero_shaded: true
menubar_toc: true
---

<style>
.bold {font-weight: bold; color: black;}
/* TOC */
.contents {position: sticky; top: 10%;}
</style>
<script src="https://kit.fontawesome.com/46ff08c48c.js" crossorigin="anonymous"></script>
<link href="./../emoji.css" rel="stylesheet" type='text/css'>

## <i class="fa-solid fa-star"></i> Vision

The rapid advancement of <i class="fa-solid fa-wifi"></i> <b>Internet-of-Things (IoT)</b> sensor platform has been penetrating all corners of our lives, presenting unprecedented levels of demands for power efficiency, computation latency, task complexity, and form factors. The next evolutionary phase of IoT platform will be realized with the following four key features toward further enriching our daily lives: <b>Tiny</b>, <b>Sensory</b>, <b>Intelligent</b>, and <b>Wireless</b>.

<center>
<img src='{{ site.base_url }}/img/research/vision.png' style='width: 70%;' class='center'>
</center>
<br>

My ultimate research goal is to <i>Democratize</i> these features of IoT platform, envisioning a future where everyone can enjoy the benefits. To arrive at this goal, the <b><i class="fa-solid fa-microchip fa-lg" style="color: black;"></i> Integrated Circuit (IC)</b> designers will need to develop highly integrated <b>System-on-Chips (SoCs)</b> that operate efficiently within constrained energy sources and silicon area.

My research focuses on power-efficient analog/mixed-signal ICs for <b><i class="fa-solid fa-heart-pulse fa-lg" style="color: #ff2600;"></i> Biomedical</b> and <b><i class="fa-solid fa-brain fa-lg" style="color: #f3b5b8;"></i> Neuromorphic</b> sensor systems. I am passionate about realizing ultra-low-power, digital-friendly analog circuit architectures suitable for tiny <b>Artificial Intelligence (AI)</b> embedded IoT platforms.

<br><br><br><br><br>

## <i class="fa-solid fa-heart-pulse" style="color: #ff2600;"></i> Biomedical Sensor IC

<center>
<img src='{{ site.base_url }}/img/research/bioz_overall.png' style='width: 40%;'>
<span style="margin-right: 1em;"></span>
<img src='{{ site.base_url }}/img/research/bioz_trend.png' style='width: 57%;'>
<br><br>
<img src='{{ site.base_url }}/img/research/bioz_respiration.png' style='width: 80%;'>
</center>

### <i class="fa-solid fa-microchip"></i> GLY

<a href="https://doi.org/10.1109/ISSCC.2019.8662466" target="_blank">ISSCC 2019</a>
<span style="margin-right: 1em;"></span>
<a href="https://doi.org/10.1109/JSSC.2020.2991511" target="_blank">JSSC 2020</a>
<span style="margin-right: 1em;"></span>
<a href="https://doi.org/10.1109/ISCAS46773.2023.10181417" target="_blank">ISCAS 2023</a>

- <span class='bold'>Lead-Compensated</span> flipped voltage follower (FVF)
  - <span class='bold'>11.65x</span> higher bandwidth, <span class='bold'>3.19x</span> less power, without noise increase
- Widely adopted by multiple research groups
  - <a href="https://doi.org/10.1109/ISSCC42613.2021.9365801" target="_blank">ISSCC 2021</a> (A*STAR, Singapore <span class='emoji'>🇸🇬</span>)
  - <a href="https://doi.org/10.1109/ISSCC42614.2022.9731787" target="_blank">ISSCC 2022</a> (Fudan University, China <span class='emoji'>🇨🇳</span>)
  - <a href="https://doi.org/10.1109/ISSCC49657.2024.10454399" target="_blank">ISSCC 2024</a> (KAIST, South Korea <span class='emoji'>🇰🇷</span>)
- 🎉 Silver Award🥈in 2019 Samsung HumanTech paper competition
- 📚 <span class='bold'>Open-Sourced</span> schematic parameters in ISCAS 2023
  - You are more than welcomed to copy＆paste this biomedical amplifier design 😀

### <i class="fa-solid fa-microchip"></i> BioZ2

<a href="https://doi.org/10.1109/VLSICircuits18222.2020.9162983" target="_blank">VLSI 2020</a>
<span style="margin-right: 1em;"></span>
<a href="https://doi.org/10.1109/JSSC.2021.3100716" target="_blank">JSSC 2022</a>
<span style="margin-right: 1em;"></span>
<i class="fa-solid fa-file-code fa-bounce fa-lg"></i>
<a href="./../assets/KwantaeKim_PhD_Thesis.pdf#page=63" target="_blank">Open Source Code</a>

- <span class='bold'>All-Digital ΔΣ</span> modulated sinewave generator
- A sinusoidal current generator with performance improvements in:
  - <span class='bold'>1.9~7.5x</span> more linear, <span class='bold'>8.9x</span> less power, <span class='bold'>33x</span> less area
- 📚 <span class='bold'>Open-Sourced</span> MATLAB/Verilog Code in PhD dissertation
  - <a href="https://doi.org/10.1109/TCSII.2023.3261062" target="_blank">TCAS-II 2023</a> (Oregon State University, USA <span class='emoji'>🇺🇸</span>)<br>
    → An improved design based on the open-source code

<br><br><br><br><br>

## <i class="fa-solid fa-brain" style="color: #f3b5b8;"></i> Neuromorphic Sensor IC

<center>
<img src='{{ site.base_url }}/img/research/neuro_overall.png' style='width: 80%;'>
<br><br>
<img src='{{ site.base_url }}/img/research/neuro_gscd.png' style='width: 70%;'>
</center>

### <i class="fa-solid fa-microchip"></i> CochClass

<a href="https://doi.org/10.1109/ISSCC42614.2022.9731708" target="_blank">ISSCC 2022</a>
<span style="margin-right: 1em;"></span>
<a href="https://doi.org/10.1109/JSSC.2022.3195610" target="_blank">JSSC 2022</a>
<span style="margin-right: 1em;"></span>
<a href="https://doi.org/10.1109/MCAS.2023.3267893" target="_blank">CAS Magazine 2023</a>

- The first <span class='bold'>Fully-Integrated</span> keyword spotting chip that includes:
  - <span class='bold'>Time Domain</span> analog feature extractor
  - Digital neural network classifier
- Spike-friendly <span class='bold'>Neuromorphic</span> signal processing inspired by biological cochlea
- <span class='bold'>Technology-Scalable</span> attributes of time domain circuits in advanced CMOS process nodes
- JSSC 2022
  - 🎉 Highlighted in the IEEExplore Main Page (Sep. ~ Oct. 2023)
  - 🎉 Top-2 in the Most Popular Articles in JSSC (Sep. ~ Oct. 2023)
- CAS Magazine 2023
  - 🎉 Top-1 in the Most Popular Articles in CAS Magazine (Sep. ~ Oct. 2023)

<center>
<img src='{{ site.base_url }}/img/research/neuro_highlight_jssc22_1.png' style='width: 80%;'>
</center>


<br><br><br><br><br>

## <i class="fa-solid fa-hand-holding-dollar"></i> Approved Grants

<br><br><br><br><br>

## <i class="fa-solid fa-people-group"></i> Research Partners

<i class="fa-solid fa-location-dot fa-lg"></i> Navigate map,
<i class="fa-solid fa-magnifying-glass"></i> find my collaborators, and
<i class="fa-solid fa-up-right-from-square"></i> visit webpages! <i class="fa-solid fa-house-user"></i>

<iframe src="{{ site.base_url }}/worldmap.html" width="100%" height="500"></iframe>
