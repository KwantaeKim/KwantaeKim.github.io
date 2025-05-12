---
layout: post
title: Seamless Host-Side Control of Docker
# title_darken: true
date: 2025-05-03 00:00:00
hero_image: /img/tutto/IMG_6459.jpeg

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

<!-- Verification -->
<!-- <i class="fa-solid fa-circle-check fa-beat" style="color: #005000;"></i> Verified with <i class="fa-brands fa-windows"></i> Windows<br> -->
<i class="fa-solid fa-circle-check fa-beat" style="color: #005000;"></i> Verified with <i class="fa-brands fa-apple"></i> MacOS

<br><br>

---

<br><br>

<!---------->
<!-- Main -->
<!---------->

{% assign post = site.posts | where: "title", "Setting Up Open Source Tools with Docker" %}
{% assign post-date = "2025-05-03" %}

There is an even easier way to control a
<i class="fa-brands fa-docker fa-lg"></i> Docker container. We can access the <i class="fa-brands fa-docker fa-lg"></i> Docker terminal directly from the host terminal, just like using <i class="fas fa-laptop-code fa-lg"></i> SSH.

This post assumes that you have finished the entire steps introduced in <a href="{{ site.baseurl }}{{ post[0].url }}">this post</a>.

<img src='{{ site.base_url }}{{ site.image_dir }}/letsgo.gif' style='width:50%'>

<br><br>

---

<br><br>

## Container ID

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2025-05-04-21.11.26.png' style='width:100%'>

First, find the **Container ID** of **IIC-OSIC-TOOLS** in <i class="fa-brands fa-docker fa-lg"></i> Docker Desktop (see the **Container ID** column in the above screenshot).

<br><br>

---

<br><br>

## Shell Script

Create a file named `run_doc.sh` under a directory that you chose for your **Design Path** of **IIC-OSIC-TOOLS**, like the below screenshot. Paste your **Container ID** into the script.

```shell
#!/bin/bash
container_id={your container ID}  # there must not be any spaces!
# Start the container if it's not running
if ! docker ps --format '{{.ID}}' | grep -q "^$container_id$"; then
    echo "[INFO] Starting container $container_id..."
    docker start "$container_id" > /dev/null
fi
# Run interactive bash shell
docker exec -it "$container_id" bash
```

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2025-05-04-21.17.50.gif' style='width:100%'>

Next, open the terminal of **VS Code** by ``Ctrl + ` `` and run the following command to make the `run_doc.sh` executable:

```shell
chmod +x run_doc.sh
```

Now, you can run this shell by running:

```shell
./run_doc.sh
```

Note that your **X11 Forwarding** must be enabled to run this. **X11 Forwarding** can be set by (check <a href="{{ site.baseurl }}{{ post[0].url }}">this post</a>):

- In <i class="fa-brands fa-windows"></i> Windows, open **MobaXterm** and leave it opened. Check whether **X Server** icon is active on your upperright corner.
- In <i class="fa-brands fa-apple"></i> MacOS, open **XQuartz**, run `xhost + 127.0.0.1` on your `XQuartz` terminal, and leave **XQuartz** opened.

Now we can run open-source tools natively from our host **VS Code** terminal!

<br><br>

---

<br><br>

## iverilog

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2025-05-04-21.03.43.gif' style='width:100%'>

## klayout

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/{{ post-date }}/2025-05-04-21.24.22.gif' style='width:100%'>
