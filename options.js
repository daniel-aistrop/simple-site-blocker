/* 
  Copyright (c) 2025 Daniel Aistrop
  All Rights Reserved.

  Unauthorized copying, modification, distribution, or use of this file
  is strictly prohibited without written permission.
*/

document.addEventListener("DOMContentLoaded", () => {
  const patternsTextarea = document.getElementById("patterns");
  const statusEl         = document.getElementById("status");
  const saveBtn          = document.getElementById("save");
  const exportBtn        = document.getElementById("export");
  const importBtn        = document.getElementById("import");
  const importFileInput  = document.getElementById("import-file");
  const previewBody      = document.getElementById("preview-body");

  const helpIcon   = document.getElementById("help-icon");
  const helpDialog = document.getElementById("help-dialog");
  const helpClose  = document.getElementById("help-close");
  const examplesToggle = document.getElementById("examples-toggle");
  const examplesBody   = document.getElementById("examples-body");

  /* --------------------------
   * Utility helpers
   * ------------------------ */

  function setStatus(text, kind = "info") {
    if (!statusEl) return;
    statusEl.textContent = text || "";
    statusEl.classList.remove("ok", "error", "info");
    statusEl.classList.add(kind);
  }

  function parsePatterns(text) {
    return text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }

  function describePattern(p) {
    if (p.startsWith("re:")) {
      return `Blocks any URL matching regex ${p.slice(3)}`;
    }
    return `Blocks any URL containing "${p}"`;
  }

  function renderPreviewFromText(text) {
    const patterns = parsePatterns(text);
    renderPreview(patterns);
  }

  function renderPreview(patterns) {
    if (!previewBody) return;
    previewBody.innerHTML = "";

    patterns.forEach((p) => {
      const row = document.createElement("div");
      row.className = "preview-row";

      const patternEl = document.createElement("div");
      patternEl.className = "preview-pattern";
      patternEl.textContent = p;

      const descEl = document.createElement("div");
      descEl.className = "preview-desc";
      descEl.textContent = describePattern(p);

      row.appendChild(patternEl);
      row.appendChild(descEl);
      previewBody.appendChild(row);
    });
  }

  async function loadPatterns() {
    try {
      const data = await chrome.storage.sync.get("blockedPatterns");
      const patterns = data.blockedPatterns || [];

      const text = patterns.join("\n");
      patternsTextarea.value = text;
      renderPreview(patterns);

      setStatus("Patterns loaded.", "info");
    } catch (err) {
      console.error("[SimpleBlocker] Failed to load patterns", err);
      setStatus("Failed to load patterns.", "error");
    }
  }

  async function savePatterns() {
    const patterns = parsePatterns(patternsTextarea.value);
    try {
      await chrome.storage.sync.set({ blockedPatterns: patterns });
      setStatus("Saved and blocking list updated ✔", "ok");
    } catch (err) {
      console.error("[SimpleBlocker] Failed to save patterns", err);
      setStatus("Failed to save patterns.", "error");
    }
    renderPreview(patterns);
  }

  /* --------------------------
   * Import / Export
   * ------------------------ */

  async function exportPatterns() {
    try {
      // Use current textarea content (even if not saved yet)
      const text = patternsTextarea.value || "";
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "simple-site-blocker-patterns.txt";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setStatus("Exported block list.", "ok");
    } catch (err) {
      console.error("[SimpleBlocker] Export failed", err);
      setStatus("Failed to export list.", "error");
    }
  }

  function handleImportFileChange(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    file.text().then(async (text) => {
      const patterns = parsePatterns(text);
      patternsTextarea.value = patterns.join("\n");
      renderPreview(patterns);

      try {
        await chrome.storage.sync.set({ blockedPatterns: patterns });
        setStatus(`Imported ${patterns.length} patterns from file.`, "ok");
      } catch (err) {
        console.error("[SimpleBlocker] Import save failed", err);
        setStatus("Imported, but failed to save to storage.", "error");
      }

      // Reset input so the same file can be imported again if desired
      event.target.value = "";
    }).catch((err) => {
      console.error("[SimpleBlocker] Import read failed", err);
      setStatus("Failed to read import file.", "error");
    });
  }

  /* --------------------------
   * UI wiring
   * ------------------------ */

  // Live preview as you type
  patternsTextarea.addEventListener("input", () => {
    renderPreviewFromText(patternsTextarea.value);
    setStatus("");
  });

  // Save button
  saveBtn.addEventListener("click", () => {
    savePatterns();
  });

  // Export button
  exportBtn.addEventListener("click", () => {
    exportPatterns();
  });

  // Import button (opens file picker)
  importBtn.addEventListener("click", () => {
    importFileInput.click();
  });

  // File selection handler
  importFileInput.addEventListener("change", handleImportFileChange);

  // Help dialog
  if (helpIcon && helpDialog && helpClose) {
    helpIcon.addEventListener("click", () => {
      helpDialog.showModal();
    });
    helpClose.addEventListener("click", () => {
      helpDialog.close();
    });
  }

  // Examples collapsible
  if (examplesToggle && examplesBody) {
    examplesToggle.addEventListener("click", () => {
      const isOpen = examplesBody.classList.toggle("open");
      examplesToggle.classList.toggle("open", isOpen);
    });
  }

  // Initial load
  loadPatterns();
});
