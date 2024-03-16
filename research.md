---
layout: page
# hero_height: is-large
show_sidebar: false
hero_image: /img/research/hero_image.png
# hero_shaded: true
menubar_toc: true
---

<!-- Link CSS -->
<link href='{{ site.base_url }}/blog/blog_style.css' type='text/css' rel='stylesheet'>
<style>
.bold {font-weight: bold; color: black;}
/* TOC */
.contents {position: sticky; top: 10%;}
</style>
<script src="https://kit.fontawesome.com/46ff08c48c.js" crossorigin="anonymous"></script>

## Vision

<div style='font-size: 1.1em;'>

The rapid advancement of <i class="fa-solid fa-wifi"></i> <b>Internet-of-Things (IoT)</b> sensor platform has been penetrating all corners of our lives, presenting unprecedented levels of demands for power efficiency, computation latency, task complexity, and form factors. The next evolutionary phase of IoT platform will be realized with the following four key features toward further enriching our daily lives: <code>Tiny</code>, <code>Sensory</code>, <code>Intelligent</code>, and <code>Wireless</code>.

<br><br>
<center>
<img src='{{ site.base_url }}/img/research/vision.png' style='width: 70%;' class='center'>
</center>
<br>

My ultimate research goal is to <i>Democratize</i> these features of IoT platform, envisioning a future where everyone can enjoy the benefits. To arrive at this goal, the <b><i class="fa-solid fa-microchip fa-lg" style="color: black;"></i> Integrated Circuit (IC)</b> designers will need to develop highly integrated <b>System-on-Chips (SoCs)</b> that operate efficiently within constrained energy sources and silicon area.

<br><br>

My research focuses on power-efficient analog/mixed-signal ICs for <b><i class="fa-solid fa-heart-pulse fa-lg" style="color: #ff2600;"></i> Biomedical</b> and <b><i class="fa-solid fa-brain fa-lg" style="color: #f3b5b8;"></i> Neuromorphic</b> sensor systems. I am passionate about realizing ultra-low-power, digital-friendly analog circuit architectures suitable for tiny <b>Artificial Intelligence (AI)</b> embedded IoT platforms.

</div><br><br><br><br><br>

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

A voltage amplifier was proposed featuring a <span class='bold'>Lead-Compensated</span> flipped voltage follower (FVF) topology,
surpassing the state-of-the-arts with an <span class='bold'>11.65x</span> higher bandwidth while consuming <span class='bold'>3.19x</span> less power, all without sacrificing noise performance.

This innovative and simple approach has been widely adopted in bioimpedance (BioZ) amplifier designs by multiple research groups, evidenced by <a href="https://doi.org/10.1109/ISSCC42613.2021.9365801" target="_blank">ISSCC 2021</a> (A*STAR, Singapore <span class='emoji'>🇸🇬</span>), <a href="https://doi.org/10.1109/ISSCC42614.2022.9731787" target="_blank">ISSCC 2022</a> (Fudan University, China <span class='emoji'>🇨🇳</span>), and ISSCC 2024 (KAIST, South Korea <span class='emoji'>🇰🇷</span>). Notably, this work also received recognition with a Silver Award🥈in Samsung HumanTech paper competition.

As an exemplary design showcase, a PVT-stable amplifier was presented and its schematic parameters are 📚 <span class='bold'>Open-Sourced</span> in ISCAS 2023 paper. You are more than welcomed to copy＆paste the design and enjoy the low-power, low-noise, and wide-bandwidth biomedical amplifier! 😀

### <i class="fa-solid fa-microchip"></i> BioZ2

<a href="https://doi.org/10.1109/VLSICircuits18222.2020.9162983" target="_blank">VLSI 2020</a>
<span style="margin-right: 1em;"></span>
<a href="https://doi.org/10.1109/JSSC.2021.3100716" target="_blank">JSSC 2022</a>
<span style="margin-right: 1em;"></span>
<i class="fa-solid fa-file-code fa-bounce fa-lg"></i>
<a href="./../assets/KwantaeKim_PhD_Thesis.pdf#page=63" target="_blank">Open Source Code</a>

A current injector was proposed featuring an <span class='bold'>All-Digital ΔΣ</span> modulated sinewave generator method, outperforming prior works by <span class='bold'>1.9~7.5x</span> in linearity, <span class='bold'>8.9x</span> in power, and a <span class='bold'>33x</span> in chip area occupation. The design is open-sourced with MATLAB/Verilog Code in my PhD dissertation, ensuring easy replication by fellow researchers.

In 2023, an improved circuit design was presented in <a href="https://doi.org/10.1109/TCSII.2023.3261062" target="_blank">TCAS-II 2023</a> paper (Oregon State University, USA <span class='emoji'>🇺🇸</span>) based on the open-source code, highlighting its research outreach and academic contributions.

<br>

## <i class="fa-solid fa-brain" style="color: #f3b5b8;"></i> Neuromorphic Sensor IC

<center>
<img src='{{ site.base_url }}/img/research/neuro_overall.png' style='width: 80%;'>
<br><br>
<img src='{{ site.base_url }}/img/research/neuro_gscd.png' style='width: 70%;'>
</center>

## Approved Grants

## Partners
