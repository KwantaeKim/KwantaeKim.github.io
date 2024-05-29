---
layout: post
title: Setting Up Open Source Tools with Docker
date: 2024-05-25 00:00:00
hero_image: /img/tutto/IMG_3508.jpeg

menubar_toc: true
show_sidebar: false
---

## Top

<br>

<!-- Series -->
{% include series-OSE.html %}

<!-- CSS -->
<style>
/* TOC */
.contents {position: sticky; top: 10%;}

/* Emoji */
@font-face {
  font-family: NotoColorEmojiLimited;
  unicode-range: U+1F1E6-1F1FF;
  src: url(https://raw.githack.com/googlefonts/noto-emoji/main/fonts/NotoColorEmoji.ttf);
}
.emoji {
  font-family: 'NotoColorEmojiLimited', -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol';
}
</style>

<!-- Javascript -->
<script src="https://kit.fontawesome.com/46ff08c48c.js" crossorigin="anonymous"></script>

<!-- Version -->
<i class="fa-regular fa-calendar-check fa-lg"></i> Initial version: May 1, 2023

<!-- Verification -->
<i class="fa-solid fa-circle-check fa-beat" style="color: #005000;"></i> Verified with <i class="fa-brands fa-windows"></i> Windows<br>
<i class="fa-solid fa-circle-check fa-beat" style="color: #005000;"></i> Verified with <i class="fa-brands fa-apple"></i> MacOS

<br><br>

---

<br><br>

<!---------->
<!-- Main -->
<!---------->

{% assign post = site.posts | where: "title", "Copy, Paste, and Run with Google Colab" %}
{% assign post-date = "2023-06-08" %}

We can run place-and-route (PnR) and arrive GDS file generation as introduced in <a href="{{ site.baseurl }}{{ post[0].url }}">this post</a>,
using open-source chip design tool with python scripts, in <i class="fa-brands fa-google fa-lg"></i> **Google Colab** environment.

In this post, I am gonna share a GUI-based tool setup, more familiar with analog circuit designers.

A research team led by <a href="https://github.com/hpretl" target="_blank">Harald Pretl</a> from **Johannes Kepler University (JKU)** developed a <i class="fa-brands fa-docker fa-lg"></i> Docker container, **IIC-OSIC-TOOLS**. Using this container, we can easily setup open-source tools and access to it through **Virtual Network Computing (VNC)**.

If you nagivate to the <a href="https://github.com/iic-jku/iic-osic-tools" target="_blank">IIC-OSIC-TOOLS <i class="fa-brands fa-github fa-lg"></i> Github page</a>, and you are completely new to <i class="fa-brands fa-git-alt fa-lg"></i> Git or <i class="fa-brands fa-github fa-lg"></i> Github usage, you will probably feel lost or confused about what to do first .. <i class="fa-regular fa-face-sad-tear fa-lg"></i>

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-12-49-13.png' style='width:70%'>

> Um .. so .. what should I do?

<br><br>

---

<br><br>

## In <i class="fa-brands fa-apple fa-lg"></i> MacOS

<i class="fa-solid fa-circle-check fa-beat" style="color: #005000;"></i> Verified with Apple M2 Air laptop.

### Docker

You need to install the <i class="fa-brands fa-docker fa-lg"></i> Docker first to use the Docker Container. Nagivate to <a href="https://www.docker.com" target="_blank">Docker</a> webpage, and move to **Get Started** link on the upperright corner.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-12-58-46.png' style='width:90%'>

If you are using <i class="fa-brands fa-apple fa-lg"></i> Apple Silicon MacOS, install Apple Chip version like above.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-13-01-27.png' style='width:49%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-13-02-37.png' style='width:49%'>

If you installed it, open the <i class="fa-brands fa-docker fa-lg"></i> **Docker** app with spotlight (`⌘ + Space`).

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-13-05-23.png' style='width:60%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-13-05-28.png' style='width:60%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-13-05-34.png' style='width:60%'>

Go through **Accept → Finish → Skip**.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-13-07-37.png' style='width:60%'>

Find the top <i class="fa-solid fa-magnifying-glass fa-lg"></i> Search Bar in <i class="fa-brands fa-docker fa-lg"></i> Docker app, search `iic-osic-tools` (with `hpretl` prefix), and click **Pull** button.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-14-18-52.png' style='width:60%'>

Upon the complete **Pull** process, you can find a green <i class="fa-solid fa-check" style="color: #005000;"></i> check mark.

### Git

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-14-21-51.png' style='width:50%'>

Open terminal using spotlight (`⌘ + Space`), and execute `which git` to check whether your <i class="fa-brands fa-apple fa-lg"></i> MacOS has <i class="fa-brands fa-git-alt fa-lg"></i> Git installed.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-14-25-39.png' style='width:50%'>

Like above, if you can find the path like `/usr/bin/git`, then it means you have <i class="fa-brands fa-git-alt fa-lg"></i> Git installed.

If the terminal output prints `~ not found`, then it means you do not have <i class="fa-brands fa-git-alt fa-lg"></i> Git in your OS. In this cas, please install it by searching `git install macos` or similar words in <i class="fa-brands fa-google fa-lg"></i> Google<br>
(you can also ask to <i class="fa-regular fa-comments fa-lg"></i> ChatGPT for sure).

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-14-52-09.png' style='width:50%'>

Use `mkdir` to make a directory of `open-source` and use `cd` to move to `open-source` directory.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-14-55-25.png' style='width:90%'>

Navigate to the <a href="https://github.com/iic-jku/iic-osic-tools" target="_blank">IIC-OSIC-TOOLS <i class="fa-brands fa-github fa-lg"></i> Github page</a> and find `Code → Copy` button.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-14-59-00.png' style='width:45%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-14-59-24.png' style='width:45%'>

Paste the copied URL after `git clone` like above screenshot. Here, `git clone` is something similar concept of <i class="fa-solid fa-file-arrow-down fa-lg"></i> Download more or less. You can use `⌘ + V` command for pasting into <i class="fa-brands fa-apple fa-lg"></i> MacOS terminal.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-15-02-34.png' style='width:45%'>

After `git clone`, you can check what are the loaded files by executing `ls`. You will find `iic-osic-tools` directory. Move in to that directory, and do `ls` again.

Okay, now it is all set. Please skip [Windows Section](#in--windows) and jump directly into [VNC Section](#vnc).

<br><br>

---

<br><br>

## In <i class="fa-brands fa-windows"></i> Windows

<i class="fa-solid fa-circle-check fa-beat" style="color: #005000;"></i> Verified with Windows 11 laptop.

### Docker

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-15-09-50.png' style='width:60%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-13-07-37.png' style='width:60%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-14-18-52.png' style='width:60%'>

Similarly like <i class="fa-brands fa-apple fa-lg"></i> MacOS, install <i class="fa-brands fa-docker fa-lg"></i> Docker from <a href="https://www.docker.com" target="_blank">webpage</a>, search `iic-osic-tools` (with `hpretl` prefix) in Docker app, run Pull, and ensure you see the green <i class="fa-solid fa-check" style="color: #005000;"></i> check mark.

### Git

You have to install a terminal program to use <i class="fa-brands fa-linux fa-lg"></i> Linux-like terminal in <i class="fa-brands fa-windows"></i> Windows.

Many people nowadays use <a href="https://mobaxterm.mobatek.net" target="_blank">MobaXterm</a> so I recommend to install this program (if you are already using another terminal program, this step is not needed).

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-15-43-25.png' style='width:60%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-15-43-56.png' style='width:60%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-15-45-16.png' style='width:90%'>

It is quite handy with the Portable edition, as it does not require us to go through the install process.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-15-50-01.png' style='width:60%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-15-51-12.png' style='width:90%'>

If you installed MobaXterm, open terminal and check whether your <i class="fa-brands fa-windows"></i> Windows has <i class="fa-brands fa-git-alt fa-lg"></i> Git, by executing `which git` as also mentioned in [MacOS Section](#git)

As shown above, if your <i class="fa-brands fa-windows"></i> Windows has <i class="fa-brands fa-git-alt fa-lg"></i> Git, it will output the path like `/bin/git`.

If not, it will output <i class="fa-solid fa-xmark fa-lg" style="color:red;"></i> mark, like I searched `amplifier` for fun <i class="fa-regular fa-face-grin-wink fa-lg"></i>.

Rest of the steps are the same with <i class="fa-brands fa-apple fa-lg"></i> MacOS case.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-14-55-25.png' style='width:90%'>

Navigate to the <a href="https://github.com/iic-jku/iic-osic-tools" target="_blank">IIC-OSIC-TOOLS <i class="fa-brands fa-github fa-lg"></i> Github page</a> and find `Code → Copy` button.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-14-59-00.png' style='width:45%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-16-10-21.png' style='width:70%'>

Paste the copied URL after `git clone` like above screenshot. Here, `git clone` is something similar concept of <i class="fa-solid fa-file-arrow-down fa-lg"></i> Download more or less. You can click the wheel button of your <i class="fa-solid fa-computer-mouse fa-lg"></i> mouse or `Shift + Insert` to paste into the terminal.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-16-13-56.png' style='width:70%'>

After `git clone`, you can check what are the loaded files by executing `ls`. You will find `iic-osic-tools` directory. Move in to that directory, and do `ls` again. There seems to be several files, though not sure what are they yet <i class="fa-regular fa-face-grin-beam-sweat fa-lg"></i>.

<br><br>

---

<br><br>

## VNC

From this step, all the process are same regardless of the OS you are using, <i class="fa-brands fa-apple fa-lg"></i> MacOS or <i class="fa-brands fa-windows"></i> Windows.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-16-20-24.png' style='width:70%'>

Execute `./start_vnc.sh` like above. Here, `./` means that you are finding something that is located within your current directory.

Upon the very first time execution, you can see that the program says like:

> I will make a new container as you currently do not have one!

### Trouble Shooting

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-16-24-41.png' style='width:43%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-16-25-04.png' style='width:50%'>

The above two screenshots show that even though you run `./start_vnc.sh` but fails.

- The left case corresponds that the <i class="fa-brands fa-docker fa-lg"></i> Docker is not running yet.<br>
  Open <i class="fa-brands fa-docker fa-lg"></i> Docker and execute `./start_vnc.sh` again.
- The right case corresponds that `start_vnc.sh` file is running background already.<br>
  Just press `s` in this case.<br>
  If you happen to find a case showing `Press "s" to stop` instead of `Press "s" to start`, just execute `start_vnc.sh` again.

### Login to VNC

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-16-33-19.png' style='width:90%'>

Go back to the <i class="fa-brands fa-docker fa-lg"></i> Docker app and navigate to `Container` button on the left. You can find that VNC is now running.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-17-02-50.png' style='width:90%'>

At this point, you can just open any web browser (<i class="fa-brands fa-safari"></i> Safari, <i class="fa-brands fa-chrome"></i> Chrome, <i class="fa-brands fa-edge"></i> Edge, ..) and type `localhost` as shown above.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-17-03-35.png' style='width:90%'>

Then you can type password, which is `abc123` by default.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-17-04-18.png' style='width:45%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-17-16-32.png' style='width:45%'>

Upon login, you now see the screen like above, though the desktop image can be different, sometimes it just shows a dark image.

Just rightclick the mouse and then you can check it works fine like below.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-17-18-08.png' style='width:20%'>

But, as I checked with my friend in <i class="fa-brands fa-apple fa-lg"></i> MacOS, it sometimes shows below problems:

- Screen resolution does not match well, and the screen is cut at edges, which is disturbing
- Cannot see the mouse cursor

Fortunately, we can fix this by using **VNC Viewer**.

### VNC Viewer

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-17-24-24.png' style='width:70%'>

Navigate to this <a href="https://www.realvnc.com/en/connect/download/viewer/?__lai_s=0.12162073490813649&__lai_sr=10-14&__lai_sl=l" target="_blank">VNC Viewer</a> link, install VNC Viewer, and open it.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-17-26-04.png' style='width:70%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-17-26-27.png' style='width:70%'>

As shown above, type `localhost:5901` in <i class="fa-solid fa-magnifying-glass fa-lg"></i> Search Bar<Br>
(I found port number `5901` in <a href="https://github.com/iic-jku/iic-osic-tools" target="_blank">IIC-OSIC-TOOLS <i class="fa-brands fa-github fa-lg"></i> Github page</a>).

The password is the same. `abc123` by default.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-17-29-06.png' style='width:60%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/thumbs-up-sheep.gif' style='width:35%'>

🎉 Ta-Da! Now you can see a good resolution VNC screen! All set!

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-29-00-22-57.png' style='width:40%'>

Click the terminal as shown in the lowerleft corner of your VNC Viewer screen.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-29-03-04-05.png' style='width:90%'>

You can find that the default current directory is `foss/designs`. Here is the hierarchy of directory:

```shell
foss
foss/designs   # linked to the host OS
foss/examples
foss/pdks
foss/tools
```

Note that `foss/designs` is mount to `~/eda/designs`. Like the below screenshot, for example in <i class="fa-brands fa-apple fa-lg"></i> MacOS, any file put in `~/eda/designs` path is synchronized with `foss/designs` path.

(I don't know why, but this synchronization does not work in <i class="fa-brands fa-windows"></i> Windows, though `~/eda/designs` path is automatically generated)

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-29-01-25-41.png' style='width:70%'>

<br><br>

---

<br><br>

## Xschem

If you are an **Analog Circuit Designer**, you probably want to view the GUI-based screen first <i class="fa-regular fa-face-laugh-wink fa-lg"></i>

**Xschem** is an open-source IC design tool similar to schematic editor within **Cadence Virtuoso**. You can open Xschem by executing `xschem` in terminal.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-29-21-31-52.png' style='width:70%'>

Go `File → Open`, select `/foss/examples`, choose `..`, then you arrive `/foss`.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-29-21-36-29.png' style='width:50%'>

Then move to `examples → SKY130_SAR-ADC → xschem`. Open `adc_top.sch`.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-29-21-36-56.png' style='width:50%'>

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-29-21-38-13.png' style='width:90%'>

As you open it, you can see the top schematic of a SAR ADC design. Like **Cadence Virtuoso**, shortcuts are working:

|F|Screent Fit|||
|E|Descend|||
|Ctrl + E|Asend|||

As you explore the design here and there, you will find comparator, capacitor DAC, etc.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-29-21-41-57.png' style='width:90%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-29-21-42-09.png' style='width:90%'>

<img src='{{ site.base_url }}{{ site.image_dir }}/thumbs-up-sheep.gif' style='width:35%'>

So, yeah! The tool setup is all done!

<br><br>

---

***Acknowledgments***<br>
Thanks to <a href="https://www.linkedin.com/in/sheng-zhou-796681204/" target="_blank">Sheng Zhou</a> for helping me to verify the tutorial flow!
