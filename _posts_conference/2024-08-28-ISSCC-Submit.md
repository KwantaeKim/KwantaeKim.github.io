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

According to this strict double-blind review guideline, you as a paper author, must not reveal yourself in such a way that you can be identified by the review committees. This can be typically found in the PDF document of the s<a href="https://submissions.mirasmart.com/ISSCC2025/PDF/ISSCC2025CFP.pdf" target="_blank">*Call for Papers*</a> on the ISSCC official <a href="https://www.isscc.org/call-for-papers-overview" target="_blank">Website</a>.

- Remove any <u>logos, code names, or other marks</u> from the chip photo or PCB.
  - Typically, a white rectangular box is added over the specific area of the photo.
  - These elements may be restored during the final submission stage, once the paper is accepted.
- The allowed language is <u>English only</u>.
  - The use of other languages is not allowed, as they may imply that the authors are from a specific country.
  - For example, let's say you used an oscilloscope and took a screenshot to be used for measurement results in Fig. 6, but the oscilloscope was set to Korean and the screenshot includes Korean. These kinds of situations are something that must be avoided and double/triple-checked.
- Acknowledgments must not be included.
  - They can be added later once the paper is accepted.
- Remove <u>metadata</u> from PDF files before uploading them to the submission system.
  - In <i class="fa-brands fa-windows"></i> Windows, you can remove metadata by `Right Click → Properties → Details → Remove Properties and Personal Information`.
  - This can be checked by sending the file to another computer and opening it there. If you cannot recognize your username from the PDF opened on another computer, then it means it is good to go.
  - In <i class="fa-brands fa-apple fa-lg"></i> MacOS, unfortunately I have no idea how to remove metadata ... <i class="fa-regular fa-face-sad-tear fa-lg"></i> (it would be appreciated if someone can let me know how to do it <i class="fa-regular fa-face-laugh fa-lg"></i>).
- Although it is written in the <a href="https://submissions.mirasmart.com/ISSCC2025/PDF/ISSCC2025CFP.pdf" target="_blank">*Call for Papers*</a> that<br>
  *"The submission site allows authors to modify the title (“Paper Title (blinded)”) if the intended title would reveal the authors or their affiliation"*,<br>
  it is a good practice to replace your project code with some other letters (like 'XXXX')
  - For example, my prior research <a href="http://ssl.kaist.ac.kr" target="_blank">Group</a> at KAIST (led by Prof. Hoi-Jun Yoo) published <a href="https://doi.org/10.1109/ISSCC.2017.7870350" target="_blank">DNPU</a> at ISSCC'17, <a href="https://doi.org/10.1109/ISSCC.2018.8310262" target="_blank">UNPU</a> at ISSCC'18, <a href="https://doi.org/10.1109/ISSCC.2019.8662302" target="_blank">LNPU</a> at ISSCC'19, <a href="https://doi.org/10.1109/ISSCC19947.2020.9062989" target="_blank">GANPU</a> at ISSCC'20.
  - Yes, similar project codes with repeated 'NPU', several years in a row, can easily imply that the submitted paper is from a certain research group.
  - So, when the manuscript of the <a href="https://doi.org/10.1109/ISSCC.2019.8662302" target="_blank">LNPU</a> paper was submitted, Dr. <a href="https://www.linkedin.com/in/jinsulee/" target="_blank">Jinsu Lee</a>, who was the leading author of the paper, formulated the title as "XXXX: A 25.3TFLOPS/W Sparse Deep-Neural-Network Learning Processor with Fine-Grained Mixed Precision of FP8-FP16" without 'NPU' term to anonymize the manuscript.
- Citing your / your group's previous work is **Okay**.
  - But you must not refer your paper in a way that may reveal your identity, for example using "Our previous work" or a similar expression.
  - As also stated in the <a href="https://submissions.mirasmart.com/ISSCC2025/PDF/ISSCC2025CFP.pdf" target="_blank">*Call for Papers*</a>, you can cite your work in the third person, for example, "XX technique was used in [2]" or "The XX architecture achieves higher XX performance than [3] ..".

<br><br>

---

***Acknowledgments***<br>
Thanks to <a href="https://www.linkedin.com/in/jinsulee/" target="_blank">Jinsu Lee</a> for sharing experience on preparing paper title regarding the double-blind review!
