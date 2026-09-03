
<style>
/* CSS for the table */
table {
  width: 100%;
  max-width: 100%;
  overflow-x: auto; /* Enable horizontal scrolling when the table exceeds the screen width */
  display: block; /* Ensure the table is displayed as a block element */
}
th, td {
  padding: 8px; /* Add padding to the table cells for better readability */
  text-align: left; /* Adjust text alignment as needed */
}
</style>

| <i class='fa-solid fa-location-dot fa-lg' style='color: #4c5dbe;'></i><span style='margin-right: 0.15em;'></span> **Europe** | 
| **Marko Kosunen** | <a href = 'https://metka.aalto.fi' target=_blank><i class='fa-solid fa-house-user fa-lg'></i></a> | Associate Professor | IEEE Senior Member | Aalto University | Finland <span class='emoji'>🇫🇮</span> |
| **Tobi Delbruck** | <a href = 'https://sensors.ini.ch' target=_blank><i class='fa-solid fa-house-user fa-lg'></i></a> | Professor | IEEE Fellow | UZH/ETH Zurich | Switzerland <span class='emoji'>🇨🇭</span> |
| **Shih-Chii Liu** | <a href = 'https://sensors.ini.ch' target=_blank><i class='fa-solid fa-house-user fa-lg'></i></a> | Professor | IEEE Fellow | UZH | Switzerland <span class='emoji'>🇨🇭</span> |
| **Taekwang Jang** | <a href = 'https://circuit.ee.ethz.ch' target=_blank><i class='fa-solid fa-house-user fa-lg'></i></a> | Associate Professor | IEEE Senior Member | ETH Zurich | Switzerland <span class='emoji'>🇨🇭</span> |
| **Chang Gao** | <a href = 'https://www.tudemi.com' target=_blank><i class='fa-solid fa-house-user fa-lg'></i></a> | Assistant Professor | IEEE Member | TU Delft | Netherlands <span class='emoji'>🇳🇱</span> |
| **Qinyu Chen** | <a href = 'https://sites.google.com/view/qinyu/' target=_blank><i class='fa-solid fa-house-user fa-lg'></i></a> | Assistant Professor | IEEE Member | Leiden University | Netherlands <span class='emoji'>🇳🇱</span> |
| **Martin Andraud** | <a href = 'https://martinandraud.github.io' target=_blank><i class='fa-solid fa-house-user fa-lg'></i></a> | Assistant Professor | IEEE Member | UCLouvain | Belgium <span class='emoji'>🇧🇪</span> |
| <i class='fa-solid fa-location-dot fa-lg' style='color: #4c5dbe;'></i><span style='margin-right: 0.15em;'></span> **Asia** | 
| **Hoi-Jun Yoo** | <a href = 'http://ssl.kaist.ac.kr' target=_blank><i class='fa-solid fa-house-user fa-lg'></i></a> | Professor | IEEE Fellow | KAIST | South Korea <span class='emoji'>🇰🇷</span> |
| **Sangyeob Kim** | <a href = 'https://sites.google.com/view/sangyeobkim/' target=_blank><i class='fa-solid fa-house-user fa-lg'></i></a> | Assistant Professor | IEEE Member | Yonsei University | South Korea <span class='emoji'>🇰🇷</span> |
| **Kyung-Sik Choi** | <a href = 'https://sites.google.com/view/year-yonsei/home?authuser=0' target=_blank><i class='fa-solid fa-house-user fa-lg'></i></a> | Assistant Professor | IEEE Member | Yonsei University | South Korea <span class='emoji'>🇰🇷</span> |
| **Woojun Choi** | <a href = 'https://sites.google.com/view/ysicsl/' target=_blank><i class='fa-solid fa-house-user fa-lg'></i></a> | Assistant Professor | IEEE Member | Yonsei University | South Korea <span class='emoji'>🇰🇷</span> |
| **Youngwoo Ji** | <a href = 'https://lab.hanbat.ac.kr/cats' target=_blank><i class='fa-solid fa-house-user fa-lg'></i></a> | Assistant Professor | IEEE Member | Hanbat<br>National University | South Korea <span class='emoji'>🇰🇷</span> |
| **Sohmyung Ha** | <a href = 'https://wp.nyu.edu/sohmyung/' target=_blank><i class='fa-solid fa-house-user fa-lg'></i></a> | Associate Professor | IEEE Senior Member | NYU Abu Dhabi | UAE <span class='emoji'>🇦🇪</span> |
| <i class='fa-solid fa-location-dot fa-lg' style='color: #4c5dbe;'></i><span style='margin-right: 0.15em;'></span> **America** | 
| **Jason Eshraghian** | <a href = 'https://ncg.ucsc.edu' target=_blank><i class='fa-solid fa-house-user fa-lg'></i></a> | Assistant Professor | IEEE Member | UC Santa Cruz | United States <span class='emoji'>🇺🇸</span> |

<style>
/* Rows wired to the map above; the home-icon link still works on its own. */
tr.partner-row { cursor: pointer; }
tr.partner-row:hover { background-color: #eef3f4; }
</style>

<script>
// Clicking a partner row flies the map to that partner. Rows are matched to pins
// by homepage URL, so this table stays the single source of truth for who is listed.
(function () {
  const frame = document.querySelector('iframe[src*="worldmap_overlay"]');
  if (!frame) return;
  // Only the partners table: its rows carry the home-icon link.
  document.querySelectorAll('table tr').forEach(tr => {
    const a = tr.querySelector('a[href^="http"] i.fa-house-user') ? tr.querySelector('a[href^="http"]') : null;
    if (!a) return;
    tr.classList.add('partner-row');
    tr.addEventListener('click', ev => {
      if (ev.target.closest('a')) return;  // let the home-icon link open normally
      frame.contentWindow.postMessage({ type: 'focusPartner', url: a.href }, '*');
      frame.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
})();
</script>
