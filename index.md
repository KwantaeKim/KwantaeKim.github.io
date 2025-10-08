---
title: TSirc Group
subtitle:
  Tiny Systems and Circuits (TSirc) <br><br>
  Aalto University
layout: page
hero_darken: true
hero_image: /img/aalto/IMG_6346.jpeg
# hero_photo: /img/kwantaekim/DSC06597-2.jpg
hero_height: is-medium
favicon: /favicon-group.png
menubar_toc: true
show_sidebar: false
section-about: true
---

<style>
/* TOC */
.contents {position: sticky; top: 10%;}

/* News */
details > summary {list-style: none; cursor: pointer; font-size: 1.2em; font-weight: bold;}
details > summary::-webkit-details-marker {display: none;}
details > summary::marker {display: none;}

/* News Button */
.btn-show-2024 {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.6em 1.2em;
  font-size: 1rem;
  color: #ffffff;
  background-color: #1d3b44; /* same approx. dark teal */
  border: none;
  border-radius: 0.4em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}

.btn-show-2024:hover {
  background-color: #22474f; /* slightly different teal for hover */
}

/* Less bright outline for focus/active */
.btn-show-2024:focus,
.btn-show-2024:active {
  outline: 2px solid #2fa093; /* a more subdued teal */
  outline-offset: 2px;
}

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

<link href="{{ site.base_url }}/emoji.css" rel="stylesheet" type='text/css'>
<link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-straight/css/uicons-regular-straight.css'>

## Visitors

<iframe src="{{ site.base_url }}/visitor_overlay.html" width="100%" height="550" style="padding: 0; margin: 0; border: none;"></iframe>

## News

### ✈️ 24.Sep.2025

{% include news-20250924.md %}

### <i class="fa-regular fa-handshake"></i> 12.Sep.2025

{% include news-20250912.md %}

### 📚 02.Aug.2025

{% include news-20250802.md %}

### ✈️ 22.May.2025

{% include news-20250522.md %}

### 📚 15.Apr.2025

{% include news-20250415.md %}

### <span style="margin-right: 0.2em;"></span><i class="fa-solid fa-user-tie fa-lg"></i><span style="margin-right: 0.2em;"></span> 03.Apr.2025

{% include news-20250403.md %}

### <i class="fa-regular fa-handshake"></i> 04.Mar.2025

{% include news-20250304.md %}

<!-- Old News -->

<div style="text-align: center; margin: 1em 0;">
  <button id="toggle-2024-news-btn" class="btn-show-2024" onclick="toggle2024News()">
    <i class="fa-solid fa-newspaper"></i>
    Show 2024 News
  </button>
</div>
<br><br><br>

<div id="older-news-container"></div>

<script>
  let news2024Html = null;  // cache for the fetched content
  let showing2024 = false;  // track whether 2024 news is currently visible

  function toggle2024News() {
    const btn = document.getElementById('toggle-2024-news-btn');
    const container = document.getElementById('older-news-container');

    // If currently hidden, show it
    if (!showing2024) {
      // If we've already fetched it before, just re-inject
      if (news2024Html !== null) {
        container.innerHTML = news2024Html;
        showing2024 = true;
        btn.innerHTML = '<i class="fa-solid fa-newspaper"></i> Hide 2024 News';
      } else {
        // First time fetch
        btn.disabled = true;
        fetch('/news-2024.html')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.text();
          })
          .then(html => {
            news2024Html = html;       // cache the result
            container.innerHTML = html; 
            showing2024 = true;
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-newspaper"></i> Hide 2024 News';
          })
          .catch(error => {
            console.error('Error fetching 2024 news:', error);
            btn.disabled = false;
          });
      }
    } 
    // If currently shown, hide it
    else {
      container.innerHTML = '';
      showing2024 = false;
      btn.innerHTML = '<i class="fa-solid fa-newspaper"></i> Show 2024 News';
    }
  }
</script>
