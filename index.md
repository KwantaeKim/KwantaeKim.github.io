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
.btn-show-news {
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

.btn-show-news:hover {
  background-color: #22474f; /* slightly different teal for hover */
}

/* Less bright outline for focus/active */
.btn-show-news:focus,
.btn-show-news:active {
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

### <i class="fa-brands fa-github"></i> 21.Mar.2026

{% include news-20260321.md %}

### 🎉 20.Feb.2026

{% include news-20260220.md %}

<!-- Old News -->

<div style="text-align: center; margin: 1em 0;">
  <button id="toggle-2025-news-btn" class="btn-show-news" onclick="toggleYearNews(2025)">
    <i class="fa-solid fa-newspaper"></i>
    Show 2025 News
  </button>
  <button id="toggle-2024-news-btn" class="btn-show-news" onclick="toggleYearNews(2024)">
    <i class="fa-solid fa-newspaper"></i>
    Show 2024 News
  </button>
</div>
<br><br><br>

<div id="older-news-2025-container"></div>
<div id="older-news-2024-container"></div>

<script>
  const newsCache = {};

  async function toggleYearNews(year) {
    const btn = document.getElementById(`toggle-${year}-news-btn`);
    const container = document.getElementById(`older-news-${year}-container`);
    const shown = container.innerHTML !== '';

    if (shown) {
      container.innerHTML = '';
      btn.innerHTML = `<i class="fa-solid fa-newspaper"></i> Show ${year} News`;
      return;
    }

    if (newsCache[year] === undefined) {
      btn.disabled = true;
      try {
        const res = await fetch(`/news-${year}.html`);
        if (!res.ok) throw new Error(res.statusText);
        newsCache[year] = await res.text();
      } catch (err) {
        console.error(`Error fetching ${year} news:`, err);
        return;
      } finally {
        btn.disabled = false;
      }
    }
    container.innerHTML = newsCache[year];
    btn.innerHTML = `<i class="fa-solid fa-newspaper"></i> Hide ${year} News`;
  }
</script>
