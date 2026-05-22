---
layout: post
title: Editing LaTeX Locally
date: 2026-05-10 00:00:00
hero_image: /img/tutto/IMG_6459.jpeg
series: Others
series_section: ""
series_order: 1

menubar_toc: true
show_sidebar: false
---

## Top

<br>

<!-- Series -->
{% include series.html key="Others" %}

<!-- CSS -->
<style>
/* TOC */
.contents {position: sticky; top: 10%;}

/* Wrap long code lines */
pre { white-space: pre-wrap !important; word-break: break-word !important; }
</style>

<!-- Javascript -->
<script src="https://kit.fontawesome.com/46ff08c48c.js" crossorigin="anonymous"></script>

<!-- Verification -->
<i class="fa-solid fa-circle-check fa-beat" style="color: #005000;"></i> Verified with <i class="fa-brands fa-apple"></i> MacOS

<br><br>

---

<br><br>

<!---------->
<!-- Main -->
<!---------->

I have been using **Overleaf** for a long time, but I also wanted to edit documents locally — without opening a browser, even on an airplane. In fact, **Overleaf** does not natively support public AI integration like `Claude Code` and `Codex`, so the only way is to run LaTeX locally on my own machine.

This post is a quick start of what I have been using on <i class="fa-brands fa-apple"></i> MacOS.

<br><br>

---

<br><br>

## MacTeX

First, install **MacTeX** (not **TeX Live**). Next, install **LaTeX Workshop** from the **VS Code** Extensions tab.

One important note — do **not** install the **vscode-pdf** extension. It conflicts with **LaTeX Workshop** and the PDF viewer keeps breaking.

If your PDF is not showing or the viewer is stuck at any point, open the Command Palette with <i class="fa-brands fa-apple"></i> `Cmd + Shift + P` and run `Reload Window`. This brings it back most of the time.

<br><br>

---

<br><br>

## VS Code

I recommend creating a new **VS Code** profile dedicated to LaTeX. Otherwise, different extensions (e.g., markdown editing) can conflict with your LaTeX setup.

<figure class="image is-16by9">
  <iframe class="has-ratio" src="https://www.youtube.com/embed/vIImoKpKWIo?start=87&end=136" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</figure>

Follow the steps introduced in the above video to create a new profile (from `1:27` to `2:16`).

Open your `JSON` settings file in **VS Code** and add the following. Note that **VS Code** must be restarted after editing `settings.json` for the changes to take effect:

```json
{
  "editor.formatOnSave": true,
  "latex-workshop.latex.outDir": "%DIR%/tmp",
  "latex-workshop.latex.autoClean.run": "onBuilt",
  "latex-workshop.view.pdf.viewer": "tab"
}
```

These four lines do the following:

- Reformats `.tex` on save.
- Redirects outputs (`.pdf`, `.aux`, `.log`, etc.) to a `./tmp` folder for a clean working directory.
- Cleans up artifacts after every successful build.
- Opens the compiled PDF as a **VS Code** tab next to your source.

<br><br>

---

<br><br>

### Formatter

To get the actual formatting working on save, install `latexindent` through **Homebrew**:

```bash
brew install latexindent
```

Then add one more line to your `JSON` settings file:

```json
{
  "latex-workshop.formatting.latex": "latexindent"
}
```

Now <i class="fa-brands fa-apple"></i> `Cmd + S` reformats your LaTeX file every time you save.

<br><br>

---

<br><br>

### Paste Image

Another extension I recommend is **Paste Image** by `mushan`, which lets you paste images directly from your clipboard into your `.tex` file. Search for `paste image` in the **VS Code** Extensions tab.

<img src='{{ site.base_url }}{{ site.image_dir }}/blog/2026-05-10/paste-image.png' style='width:100%'>

Add the following to your `JSON` settings file:

```json
{
  "pasteImage.path": "${currentFileDir}/images",
  "pasteImage.basePath": "${currentFileDir}",
  "pasteImage.defaultName": "${currentFileNameWithoutExt}-HH-mm-ss",
  "pasteImage.showFilePathConfirmInputBox": true,
  "pasteImage.filePathConfirmInputBoxMode": "onlyName",
  "pasteImage.encodePath": "none",
  "pasteImage.insertPattern": "\\begin{center}\n\t\t\\includegraphics[width=\\linewidth]{images/${imageFileName}}\n\t\\end{center}"
}
```

These seven lines do the following:

- Saves the pasted image into an `images/` subfolder next to your `.tex` file.
- Sets `${currentFileDir}` as the base for relative paths in the inserted text.
- Names files as `<parent-file>-HH-mm-ss` by default.
- Pops up a confirmation dialog before saving so you can rename the file.
- Shows only the filename in the confirmation dialog (not the full path).
- Skips URL encoding so spaces and special characters stay readable.
- Inserts a centered LaTeX figure block referencing `images/<filename>` at your cursor.

To use **Paste Image**, open the Command Palette: <i class="fa-brands fa-apple"></i> `Cmd + Shift + P` → type `Paste Image` → Enter. Or right-click in the editor and select **Paste Image**.

