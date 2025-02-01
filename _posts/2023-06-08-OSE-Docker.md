---
layout: post
title: Setting Up Open Source Tools with Docker
date: 2024-05-25 00:00:00
hero_image: /img/tutto/IMG_3508.jpeg
image: /{{ site.image_dir }}/blog/{{ post-date }}/2024-05-29-21-31-52.png

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
using open-source chip design tool with <i class="fa-brands fa-python fa-lg"></i> Python scripts, in <i class="fa-brands fa-google fa-lg"></i> **Google Colab** environment.

In this post, I am gonna share a GUI-based tool setup, more familiar with analog circuit designers.

A research team led by <a href="https://github.com/hpretl" target="_blank">Harald Pretl</a> from **Johannes Kepler University (JKU)** developed a <i class="fa-brands fa-docker fa-lg"></i> Docker container, **IIC-OSIC-TOOLS**. Using this container, we can easily setup open-source tools and access to it through **Virtual Network Computing (VNC)**.

If you nagivate to the <a href="https://github.com/iic-jku/iic-osic-tools" target="_blank">IIC-OSIC-TOOLS <i class="fa-brands fa-github fa-lg"></i> Github page</a>, and you are completely new to <i class="fa-brands fa-git-alt fa-lg"></i> Git or <i class="fa-brands fa-github fa-lg"></i> Github usage, you will probably feel lost or confused about what to do first .. <i class="fa-regular fa-face-sad-tear fa-xl"></i>

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-12-49-13.png' style='width:70%'>

> Um .. so .. what should I do?

<img src='{{ site.base_url }}{{ site.image_dir }}/i-dunno.gif' style='width:50%'>

<br><br>

---

<br><br>

## In <i class="fa-brands fa-apple fa-lg"></i> MacOS

<i class="fa-solid fa-circle-check fa-beat" style="color: #005000;"></i> Verified with Apple M2 Air laptop

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

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-13-07-37.png' style='width:100%'>

Find the top <i class="fa-solid fa-magnifying-glass fa-lg"></i> Search Bar in <i class="fa-brands fa-docker fa-lg"></i> Docker app, search `iic-osic-tools` (with `hpretl` prefix), and click **Pull** button.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-14-18-52.png' style='width:100%'>

Upon the complete **Pull** process, you can find a green <i class="fa-solid fa-check" style="color: #005000;"></i> check mark.

<br>

### VS Code

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-23-45-31.png' style='width:90%'>

Next, install VS Code using <a href="https://code.visualstudio.com/" target="_blank">This Link</a>. VS Code is quite useful and needed because you have to work with terminals, <i class="fa-solid fa-folder-tree fa-lg"></i> manage files, <i class="fa-solid fa-file-pen fa-lg"></i> edit files, and run <i class="fa-brands fa-python fa-lg"></i> Python codes in Jupyter Notebook, which are all possible in a single program!

Open VS Code. Go `Extensions` (on the left panel), search `Docker`, and install it. Upon installation, you will see <i class="fa-brands fa-docker fa-lg"></i> icon at the bottom of the left panel like the below screenshot.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-20-50-16.png' style='width:30%'>

<br>

### XQuartz

<iframe width="560" height="315" src="https://www.youtube.com/embed/-PCyR7pTlBc?si=1aDbpA1P9gpXM7IZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Next, we need to enable the **X11 Forwarding**. The above video clearly explains what is the basic concept of X11 forwarding.

Follow the steps introduced in the above video and install **XQuartz** (from 1:51 to 2:40).

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-24-00-26-46.png' style='width:50%'>

Upcom installation, open **XQuartz** with spotlight (`⌘ + Space`), and execute `xhost + 127.0.0.1` on **XQuartz** terminal to allow network connections. Then you will get the following output:

>127.0.0.1 being added to access control list

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-24-00-29-31.png' style='width:50%'>

The fonts will be broken in **XQuartz** terminal if you are using custom styling on your terminal (ex. oh-my-zsh) but it is not a big problem and thus you can ignore it.

In addition, run `sudo chmod 666 /var/run/docker.sock` on your terminal to make sure the <i class="fa-brands fa-docker fa-lg"></i> **Docker** can run on our terminal.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-24-00-36-36.png' style='width:50%'>

<br>

### Git

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-14-21-51.png' style='width:50%'>

Open terminal using spotlight (`⌘ + Space`), and execute `which git` to check whether your <i class="fa-brands fa-apple fa-lg"></i> MacOS has <i class="fa-brands fa-git-alt fa-lg"></i> Git installed.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-14-25-39.png' style='width:50%'>

Like above, if you can find the path like `/usr/bin/git`, then it means you have <i class="fa-brands fa-git-alt fa-lg"></i> Git installed.

If the terminal prints `~ not found`, then it means you do not have <i class="fa-brands fa-git-alt fa-lg"></i> Git on your OS. In this cas, please install it by searching **git install macos** or similar words in <i class="fa-brands fa-google fa-lg"></i> Google (you can also ask to <i class="fa-regular fa-comments fa-lg"></i> ChatGPT for sure).

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

<i class="fa-solid fa-circle-check fa-beat" style="color: #005000;"></i> Verified with Windows 10 <br>
<i class="fa-solid fa-circle-check fa-beat" style="color: #005000;"></i> Verified with Windows 11

### Docker

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-05-18-58-08.png' style='width:90%'>

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-15-58-00.png' style='width:60%'>

Similarly like <i class="fa-brands fa-apple fa-lg"></i> MacOS case, install <i class="fa-brands fa-docker fa-lg"></i> Docker from <a href="https://www.docker.com" target="_blank">webpage</a>. Enable **Use WSL 2 ..** during the installation.<br>We will use **Windows Subsystem for Linux (WSL)** <i class="fa-brands fa-linux fa-xl"></i> later.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-16-05-00.png' style='width:60%'>

You can skip signing in by selecting **Continue without signing in**.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-13-07-37.png' style='width:70%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-14-18-52.png' style='width:70%'>

Search `iic-osic-tools` (with `hpretl` prefix) in Docker app, run Pull, and ensure you see the green <i class="fa-solid fa-check" style="color: #005000;"></i> check mark.

Be patient! This process can take several 10s of minutes depending on your PC.

<br>

### WSL

<iframe width="560" height="315" src="https://www.youtube.com/embed/av0UQy6g2FA?si=fzr3kkpEet6A-mUi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Next, you have to install **Windows Subsystem for Linux (WSL)**. I found a really helpful <i class="fa-brands fa-youtube fa-lg"></i> YouTube video for this. Please check and follow the instructions until 3:52.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2025-02-01-2.png' style='width:70%'><br>
During the installation process, if you happen to see the above error, just restart your Windows and try again.

If you have done all the things in the above video until 3:52, open **PowerShell** by <i class="fa-brands fa-windows"></i> `Start → Windows PowerShell`. Run `wsl -l -v`, then you should see that your <i class="fa-brands fa-ubuntu"></i> **Ubuntu** version is 2, like the below screenshot (you can ignore `docker-desktop-data` in the below screenshot).

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-20-30-36.png' style='width:70%'>

Open <i class="fa-brands fa-docker fa-lg"></i> **Docker** and open <i class="fa-solid fa-gear"></i> Settings at the top menu bar. Go `Resources → WSL Integration` and enable `Ubuntu-22.04`. This will allow us to run <i class="fa-brands fa-docker fa-lg"></i> **Docker** in <i class="fa-brands fa-ubuntu"></i> **Ubuntu WSL** terminal.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-16-59-00.png' style='width:70%'>

<br>

### VS Code

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-20-42-15.png' style='width:90%'>

Next, install VS Code using <a href="https://code.visualstudio.com/" target="_blank">This Link</a>. VS Code is quite useful and needed because you have to work with <i class="fa-brands fa-linux fa-xl"></i> Linux terminals in <i class="fa-brands fa-windows"></i> Windows, <i class="fa-solid fa-folder-tree fa-lg"></i> manage files, <i class="fa-solid fa-file-pen fa-lg"></i> edit files, and run <i class="fa-brands fa-python fa-lg"></i> Python codes in Jupyter Notebook, which are all possible in a single program!

Open VS Code. If it asks to install WSL, install it.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-16-39-00.png' style='width:50%'>

Go `Extensions` (on the left panel), search `Docker`, and install it. Upon installation, you will see <i class="fa-brands fa-docker fa-lg"></i> icon at the bottom of the left panel like the below screenshot.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-20-50-16.png' style='width:30%'>

<br>

### MobaXterm

Many people use <a href="https://mobaxterm.mobatek.net" target="_blank">MobaXterm</a> for SSH. What is good thing about this program is, it has a built-in X11 forwarding function. Its installation is also simple, so I recommend to install this program.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-15-43-25.png' style='width:60%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-15-43-56.png' style='width:60%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-15-45-16.png' style='width:90%'>

It is quite handy with the **Portable** edition, as it does not require us to go through the install process.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-15-50-01.png' style='width:60%'>

Open **MobaXterm**. You can see that the `X Server` icon becomes active like below screenshots (from left screenshot to right screenshot).

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-21-03-20.png' style='width:15%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-21-04-58.png' style='width:15%'>

Open the local terminal and you can test whether your <i class="fa-brands fa-windows"></i> Windows has <i class="fa-brands fa-git-alt fa-lg"></i> Git, by executing `which git` as also mentioned in [MacOS Section](#git) (of course this action can be done in **WSL** terminal as well).

As shown below, if your <i class="fa-brands fa-windows"></i> Windows has <i class="fa-brands fa-git-alt fa-lg"></i> Git, it will output the path like `/bin/git`. If not, it will output <i class="fa-solid fa-xmark fa-lg" style="color:red;"></i> mark, like I searched `amplifier` for fun <i class="fa-regular fa-face-grin-wink fa-lg"></i>.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-15-51-12.png' style='width:80%'>

<br>

### Git

We are now ready to play with <i class="fa-brands fa-git-alt fa-lg"></i> Git!

Open VS Code, and open the built-in terminal by ``Ctrl + ` ``.

Open a new <i class="fa-brands fa-ubuntu fa-lg"></i> **Ubuntu WSL** terminal like the below video.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-211540.gif' style='width:60%'>

Navigate to the <a href="https://github.com/iic-jku/iic-osic-tools" target="_blank">IIC-OSIC-TOOLS <i class="fa-brands fa-github fa-lg"></i> Github page</a> and find `Code → Copy` button.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-14-55-25.png' style='width:90%'>

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-14-59-00.png' style='width:45%'>

Make a new folder with `mkdir`, move to that folder, and paste the copied URL after `git clone` like below screenshot.

Here, `git clone` is something similar concept of <i class="fa-solid fa-file-arrow-down fa-lg"></i> Download more or less.

You can click the wheel button of your <i class="fa-solid fa-computer-mouse fa-lg"></i> mouse or `Shift + Insert` to paste into the terminal.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-21-23-12.png' style='width:80%'>

After `git clone`, you can check what are the loaded files by executing `ls`. You will find `iic-osic-tools` directory. Move into that directory, and do `ls` again. There seems to be several files, though you might be not sure what are they yet <i class="fa-regular fa-face-grin-beam-sweat fa-xl"></i>.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-21-27-37.png' style='width:85%'>

In addition, run `sudo chmod 666 /var/run/docker.sock` in your **WSL** terminal. It will allow us to run <i class="fa-brands fa-docker fa-lg"></i> **Docker** by using **WSL** terminal.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-21-31-37.png' style='width:85%'>

<br><br>

---

<br><br>

## VNC

From this step, all the process are same regardless of the OS you are using, <i class="fa-brands fa-apple fa-lg"></i> MacOS or <i class="fa-brands fa-windows"></i> Windows.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-16-20-24.png' style='width:70%'>

Execute `./start_vnc.sh` like above. Here, `./` means that you are finding something that is located within your current directory.

Upon the very first time execution, you can see that the program says like:

> I will make a new container as you currently do not have one!

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-16-24-41.png' style='width:43%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-16-25-04.png' style='width:50%'>

The above two screenshots show that even though you run `./start_vnc.sh` but fails.

- The left case corresponds that the <i class="fa-brands fa-docker fa-lg"></i> Docker is not running yet.
  - Open <i class="fa-brands fa-docker fa-lg"></i> Docker and execute `./start_vnc.sh` again.
- The right case corresponds that `start_vnc.sh` file is running background already.
  - Just press `s` in this case.
  - If you happen to find a case showing `Press "s" to stop` instead of `Press "s" to start`, press `s` and execute `start_vnc.sh` again.

<br>

### Login to VNC

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-16-33-19.png' style='width:90%'>

Go back to the <i class="fa-brands fa-docker fa-lg"></i> Docker app and navigate to `Container` button on the left. You can find that VNC is now running.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-17-02-50.png' style='width:90%'>

At this point, you can just open any web browser (<i class="fa-brands fa-safari"></i> Safari, <i class="fa-brands fa-chrome"></i> Chrome, <i class="fa-brands fa-edge"></i> Edge, ..) and type `localhost` as shown above.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-17-03-35.png' style='width:90%'>

Then you can type password, which is `abc123` by default.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-17-04-18.png' style='width:45%'>
<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-17-16-32.png' style='width:45%'>

Upon login, you now see the screen like above, left screen or right screen, though the desktop image can be different, sometimes it just shows a dark image.

Just rightclick the mouse and then you can check it works fine like below.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-28-17-18-08.png' style='width:20%'>

<br>

### Problem

But, it has below problems which are better to be solved:

- Screen resolution does not match well, and sometimes the screen is cut at edges, which is disturbing like below video
  <br><img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-214338.gif' style='width:50%'>
  - Because of this, we cannot fully utilize dual monitor, which is extremely critical for analog circuit designers! (especially for layout stuff) I believe many people will agree with this point <i class="fa-regular fa-face-laugh-wink fa-xl"></i>
- Cannot see the mouse cursor in some cases

Instead, we can build **X11 Forwarding** as described below.

<br><br>

---

<br><br>

## X11 Forwarding

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-22-18-27.png' style='width:80%'>

Again, from this point, the method is universal and thus it does not matter whether you are using <i class="fa-brands fa-windows fa-lg"></i> Windows or <i class="fa-brands fa-apple fa-lg"></i> MacOS.

As shown above, I git cloned `iic-osic-tools` under `Documents/open-source` folder.

Move to that folder, and run `code .` on terminal like below video. Then you can see the files within `iic-osic-tools` folder on your left.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-222157.gif' style='width:100%'>

<br>

### Display

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-223024.gif' style='width:100%'>

Do the following as shown in the above video:

- Open `start_vnc.sh` file
- Search `PARAMS`
- Assign `${PARAMS} -e DISPLAY=host.docker.internal:0` to `PARAMS`

<br>

### Design Path

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-25-165456.gif' style='width:100%'>

- Assign your working directory to `DESIGNS`
  - In <i class="fa-brands fa-windows fa-lg"></i> Windows, your path `Documents/open-source` in <i class="fa-brands fa-windows fa-lg"></i> Windows is automatically mounted to `/mnt/c/Users/{your username}/Documents/open-source` in <i class="fa-brands fa-linux fa-xl"></i> WSL. For simplicity, I recommend to use the path under `Documents` folder
  - In <i class="fa-brands fa-apple fa-lg"></i> MacOS, any path you want can be used
- Save `start_vnc.sh`

<br>

### Rebuild Container

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-224237.gif' style='width:100%'>

- Delete the remaining <i class="fa-brands fa-docker fa-lg"></i> Docker container as shown above video
- Turn on the **X11 Forwarding** function. If you do not make sure your **X11 Forwarding** is enabled, the <i class="fa-brands fa-docker fa-lg"></i> **Docker** container will be immediately terminated!
  - In <i class="fa-brands fa-windows"></i> Windows, you can enable **X11 Forwarding** by simply opening **MobaXterm** and leave it opened. Check whether **X Server** is active on your upperright corner
  <br><img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-21-04-58.png' style='width:15%'>
  - In <i class="fa-brands fa-apple"></i> MacOS, you can enable **X11 Forwarding** by simply opening **XQuartz** and leave it opened.<br>Run `xhost + 127.0.0.1` on your `XQuartz` terminal and try again if your <i class="fa-brands fa-apple"></i> **Docker** does not open the terminal.
- Run `start_vnc.sh`
  - in **WSL** terminal for <i class="fa-brands fa-windows"></i> Windows
  - in terminal for <i class="fa-brands fa-apple"></i> MacOS

If you follow the above steps, you will see a new terminal pops up like below screenshot.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-22-55-02.png' style='width:70%'><br>
<i class="fa-solid fa-arrow-up"></i> <i class="fa-brands fa-windows"></i> Windows

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-24-00-49-43.png' style='width:70%'><br>
<i class="fa-solid fa-arrow-up"></i> <i class="fa-brands fa-apple"></i> MacOS

Yes! 🎉 Ta-Da! We are all set!

<img src='{{ site.base_url }}{{ site.image_dir }}/thumbs-up-sheep.gif' style='width:40%'>

You can find that the current directory is `foss/designs` by default. Here is the hierarchy of directory:

```shell
/foss
/foss/designs   # linked to the host OS
/foss/examples
/foss/pdks
/foss/tools
```

Note that `/foss/designs` is mount to `~/eda/designs` by default. Like the below screenshot, for example in <i class="fa-brands fa-apple fa-lg"></i> MacOS, any file put in `~/eda/designs` path is synchronized with `foss/designs` path. Similarly in <i class="fa-brands fa-windows"></i> Windows, since we are working on **WSL** terminal you can check the linked folder by moving to `~/eda/designs` folder (ex. run `cd ~/eda/designs`).

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-05-29-01-25-41.png' style='width:70%'>

Once you have done these steps, you can open the <i class="fa-brands fa-docker fa-lg"></i> Docker terminal using <i class="fa-brands fa-docker fa-lg"></i> Docker app, if you turn on the X11 forwarding, as shown in the below video!

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-23-231230.gif' style='width:100%'>

<center><img src='{{ site.base_url }}{{ site.image_dir }}/applause.gif' style='width:60%'></center>

<br><br>

---

<br><br>

## Xschem

If you are an **Analog Circuit Designer**, you probably want to view the GUI-based screen first <i class="fa-regular fa-face-laugh-wink fa-xl"></i>

**Xschem** is an open-source IC design tool similar to schematic editor within **Cadence Virtuoso**. You can open **Xschem** by executing `xschem` in terminal.

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

<br>

### Switching PDKs

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-25-22-23-51.png' style='width:60%'>

Move to home folder by running `cd` only, which is equivalent to `cd ~/`, `~` means home folder.

After that, run VS Code within the <i class="fa-brands fa-docker fa-lg"></i> Docker `code .`

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-25-22-27-55.png' style='width:60%'>

If it asks whether you trust or not, click **Yes, I trust the authors**.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-25-223305.gif' style='width:100%'>

As shown above, edit `.bashrc` to switch different PDKs between `sky130` and `gf180` and save it.

| SkyWater 130nm                            | Global Foundries 180nm                            |
|:------------------------------------------|:--------------------------------------------------|
| export PDK = sky130A                      | export PDK = gf180mcuC                            |
| export PDKPATH = $PDK_ROOT/$PDK           | export PDKPATH = $PDK_ROOT/$PDK                   |
| export STD_CELL_LIBRARY = sky130_fd_sc_hd | export STD_CELL_LIBRARY = gf180mcu_fd_sc_mcu7t5v0 |

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2024-06-25-223808.gif' style='width:80%'>

Okay, now open a new terminal to ensure your new `.bashrc` file affects your PDK setting. Like above, we can see that `xschem` is set to `gf180` in the new terminal while the earlier terminal is still set to `sky130`. You can switch anytime by properly setting your `.bashrc` file.

---

<i class="fa-solid fa-triangle-exclamation fa-xl" style="color: #FFD43B;"></i> Be careful! Any bash terminal prettifier which modifies `.bashrc` may mess up our PDK setting! (ex. oh-my-bash)<br>
<span style="margin-right: 2em;"></span> Do not try to install bash prettifier <i class="fa-regular fa-face-laugh-wink fa-lg"></i>

---

So, yeah! The tool setup is all done!

<img src='{{ site.base_url }}{{ site.image_dir }}/yes-whoo.gif' style='width:50%'>

<br><br>

---

***Acknowledgments***<br>
Thanks to <a href="https://www.linkedin.com/in/sheng-zhou-796681204/" target="_blank">Sheng Zhou</a> for helping me to verify the tutorial flow!
