---
layout: page
show_sidebar: false
hero_image: /img/aalto/IMG_6346.jpeg
---

<style>
.btn-show {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.6em 1.2em;
  font-size: 1.3rem;
  color: #ffffff;
  background-color: #1d3b44; /* same approx. dark teal */
  border: none;
  border-radius: 0.4em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
}

.btn-show:hover {
  background-color: #22474f; /* slightly different teal for hover */
  color: #ffffff;
}

/* Less bright outline for focus/active */
.btn-show:focus,
.btn-show:active {
  outline: 2px solid #2fa093; /* a more subdued teal */
  outline-offset: 2px;
}
</style>

<div style="text-align: center; margin: 1em 0;">
  <a href="{{ '/assets/Kor-Fin-flyer.pdf' | relative_url }}"
     target="_blank"
     class="btn-show">
    <i class="fa-solid fa-file-pdf" style="margin-right: 0.1em;"></i>
    2025 Korea-Finland Chip Design Symposium
  </a>
</div>
