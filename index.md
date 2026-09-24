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

/* Open position banner */
.open-banner {
  display: flex;
  align-items: center;
  gap: 0.9em;
  border-left: 4px solid #2fa093;
  background-color: #f5f7f7;
  border-radius: 0 0.4em 0.4em 0;
  padding: 1em 1.2em;
  margin-bottom: 2em;
  color: #1d3b44;
  text-decoration: none;
  transition: background-color 0.3s ease;
}
.open-banner:hover {background-color: #e6f2f0; color: #1d3b44;}
.open-banner .open-bell {
  font-size: 1.6rem;
  color: #2fa093;
  flex-shrink: 0;
  transform-origin: top center;
  animation: open-ring 2.4s ease-in-out infinite;
}
.open-banner .open-badge {
  display: inline-block;
  margin-right: 0.6em;
  padding: 0.15em 0.7em;
  font-size: 0.8rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #2fa093;
  border-radius: 1em;
  animation: open-pulse 2s ease-in-out infinite;
}
.open-banner .open-title {font-weight: bold; font-size: 1.1rem;}
.open-banner .open-sub {font-size: 0.9rem; color: #4a5a5e; margin-top: 0.2em;}
@keyframes open-ring {
  0%, 60%, 100% {transform: rotate(0);}
  65% {transform: rotate(14deg);}
  70% {transform: rotate(-12deg);}
  75% {transform: rotate(10deg);}
  80% {transform: rotate(-8deg);}
  85% {transform: rotate(4deg);}
  90% {transform: rotate(-2deg);}
}
@keyframes open-pulse {
  0%, 100% {box-shadow: 0 0 0 0 rgba(47, 160, 147, 0.5);}
  50% {box-shadow: 0 0 0 8px rgba(47, 160, 147, 0);}
}
@media (prefers-reduced-motion: reduce) {
  .open-banner .open-bell, .open-banner .open-badge {animation: none;}
}
</style>

<link href="{{ site.base_url }}/emoji.css" rel="stylesheet" type='text/css'>
<link rel='stylesheet' href='https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-straight/css/uicons-regular-straight.css'>

<div>
  <a class="open-banner" href="{{ site.base_url }}/open-position/">
    <i class="fa-solid fa-bell open-bell"></i>
    <div>
      <div class="open-title"><span class="open-badge">OPEN POSITION</span>We are Recruiting!</div>
      <div class="open-sub">PhD Student in Hardware-Aware AI for Analog and RF Circuits</div>
    </div>
  </a>
</div>

## Visitors

<iframe src="{{ site.base_url }}/visitor_overlay.html" width="100%" height="590" style="padding: 0; margin: 0; border: none;"></iframe>

## News

### 🏛️ 11.Sep.2026

{% include news-20260911.md %}

### ✈️ 13.Aug.2026

{% include news-20260813.md %}

### 📚 29.Jun.2026

{% include news-20260629.md %}

### 🎉 11.Jun.2026

{% include news-20260611.md %}

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
