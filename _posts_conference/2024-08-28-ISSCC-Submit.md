---
layout: post
title: Things to Know Regarding ISSCC Paper Submission
date: 2024-08-28 00:00:00
hero_image: /img/tutto/IMG_3508.jpeg

menubar_toc: true
show_sidebar: false
---

## Top

<br>

<!-- Series -->
{% include series-conference.html %}

<!-- CSS -->
<style>
/* TOC */
.contents {position: sticky; top: 10%;}
</style>

<!-- Javascript -->
<script src="https://kit.fontawesome.com/46ff08c48c.js" crossorigin="anonymous"></script>

<!-- Version -->
<i class="fa-regular fa-calendar-check fa-lg"></i> Initial version: Oct 15, 2021 (in <a href="https://tuttozurich.tistory.com/45" target="_blank">Korean</a>)<br>

<br><br>

---

<br><br>

<!---------->
<!-- Main -->
<!---------->

{% assign post-date = "2024-08-28" %}

<center><img src='{{ site.base_url }}{{ site.image_dir }}/icons/logo--isscc.png' style='width:30%'></center>

<br><br>

IEEE ISSCC is a flagship conference for IC design where thousands people gather at San Francisco and share the state-of-the-art research. If this is your first try to submit an ISSCC paper, there are some important things to be considered very carefully.

<br><br>

## Double-Blind Review

According to this strict double-blind review guidline, you as a paper author, must not reveal yourself such that you cannot be identified by the review committees. This can be found typically in the PDF document of *Call for Papers* at the ISSCC official <a href="https://www.isscc.org/call-for-papers-overview" target="_blank">Website</a>.

- Remove any <u>logo, code name, or other marks</u> from the chip photo or PCB (usually Fig. 7).
  - Typically, a white rectangular box is added over the specific area of the photo.
  - These elements may be restored the final submission stage, once the paper is accepted.
- The allowed language is <u>English only</u>.
  - Usage of other languages is not allowed, as they may imply that the authors are from a specific country.
  - For example, let's say you used oscilloscope and took a screenshot to be used for measurement results in Fig. 6, but the oscilloscope was set to Korean and the screenshot includes Korean. This kinds of situations are somethings that must be avoided and double/triple-checked.
- Acknowledgments must not be included.
  - They can be added later once the paper is accepted.
- Remove <u>metadata</u> from PDF files before uploading them to the submission system.
  - In <i class="fa-brands fa-windows"></i> Windows, you can remove metadata by `Right Click → Properties → Details → Remove Properties and Personal Information`.
  - This can be checked by sending the same file to another computer and open it in it. If you cannot recognize your username from the PDF opened in another computer, then it means it is good to go.
  - In <i class="fa-brands fa-apple fa-lg"></i> MacOS, unfortunately I have no idea how to remove metadata ... <i class="fa-regular fa-face-sad-tear fa-lg"></i> (it will be appreciated if someone knows how to do <i class="fa-regular fa-face-laugh fa-lg"></i>).
- Althought it is written in the *Call for Paper* that<br>
  *"The submission site allows authors to modify the title (“Paper Title (blinded)”) if the intended title would reveal the authors or their affiliation"*,<br>
  it is a good practice to replace your project code with some other alphabets (like 'XXXX')
  - For example, my prior research <a href="http://ssl.kaist.ac.kr" target="_blank">Group</a> at KAIST (led by Prof. Hoi-Jun Yoo) published <a href="https://doi.org/10.1109/ISSCC.2017.7870350" target="_blank">DNPU</a> at ISSCC'17, <a href="https://doi.org/10.1109/ISSCC.2018.8310262" target="_blank">UNPU</a> at ISSCC'18, <a href="https://doi.org/10.1109/ISSCC.2019.8662302" target="_blank">LNPU</a> at ISSCC'19, <a href="https://doi.org/10.1109/ISSCC19947.2020.9062989" target="_blank">GANPU</a> at ISSCC'20.
  - Yes, consecutive project codes with 'NPU', several years in a row, can easily imply that the submitted paper is from certain research group.
  - So, when the manuscript of <a href="https://doi.org/10.1109/ISSCC.2019.8662302" target="_blank">LNPU</a> paper was submitted, Dr. <a href="https://www.linkedin.com/in/jinsulee/" target="_blank">Jinsu Lee</a> who was the leading author of the paper, formulated the title as "XXXX: A 25.3TFLOPS/W Sparse Deep-Neural-Network Learning Processor with Fine-Grained Mixed Precision of FP8-FP16" without 'NPU' term to anonymize the manuscript.

<br><br>

---

***Acknowledgments***<br>
Thanks to <a href="https://www.linkedin.com/in/jinsulee/" target="_blank">Jinsu Lee</a> for sharing experience on preparing paper title regarding the double-blind review!
