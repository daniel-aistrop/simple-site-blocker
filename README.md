⚠️ Copyright © 2025 Daniel Aistrop  
> ⚖️ This project is **All Rights Reserved**.  
> You may view the code, but you may not copy, modify, reuse, or redistribute it.

# 📵 Simple Site Blocker  

![Extension Type](https://img.shields.io/badge/Browser%20Extension-Manifest%20V3-4f46e5)
![Privacy](https://img.shields.io/badge/Privacy-Local%20only%2C%20no%20tracking-22c55e)
![Status](https://img.shields.io/badge/Status-Personal%20project-64748b)
![Built%20For](https://img.shields.io/badge/Built%20for-Edge%20%26%20Chrome-0ea5e9)

A clean, privacy-friendly browser extension for blocking distracting websites using simple patterns or regular expressions.

Simple Site Blocker helps you stay focused by instantly redirecting blocked sites to a friendly, dark-mode-optimized reminder page.  
It stores no data outside your browser and never makes network requests — everything runs locally.

---

## ✨ Features

- **Block any site** using simple text patterns  
- **Redirects** to a custom “blocked” page instead of a browser error  
- **Live preview** of how each pattern behaves  
- **Regular expression support** using the `re:` prefix  
- **Auto-saving & auto-updating rules**  
- **Dark & light mode support**  
- **No default block list** — you choose exactly what to block  
- **Zero tracking and no external requests**  
- Small, fast, and fully offline

---

## 🛠 How It Works

Simple Site Blocker uses the browser's  
**Declarative Net Request (DNR)** API to intercept page loads.

When a blocked URL matches one of your patterns:

- The request is **redirected** to `blocked.html`  
- The user sees a friendly “You blocked this site” message  
- A one-click button lets users edit their patterns instantly

---

## 📝 Adding Blocked Sites

Open:

**Settings → Extensions → Simple Site Blocker → Extension options**

Then enter **one pattern per line**.

### ✓ Full domain
Blocks any URL containing that domain:


### ✓ Partial word
Blocks any URL containing that text:


### ✓ Regular expressions
Use the prefix `re:`:


Your changes update automatically.

---

## 🔍 Example Patterns
news
social
games
helloWorld.com
re:^https://(www.)?example.net/.*

---

## ⚠ Troubleshooting: If a blocked site still loads

Browsers sometimes reuse cached versions of pages.  
If a site isn’t immediately blocked:

1. Refresh the page  
2. Try opening in a **new window**  
3. Clear the site’s **cookies/cache**  
4. Try again after a moment  

This is normal for DNR-based blocking.

---

## 🔒 Privacy

- No analytics  
- No tracking  
- No external network calls  
- All data stays in local browser storage  
- Only minimal permissions are used

---

## 📄 File Structure
```
simple-site-blocker/
│
├── manifest.json
├── LICENSE
├── README.md
│
├── assets/
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
│   └── simple-site-blocker.svg
│
├── pages/
│   ├── blocked.html
│   ├── options.html
│   └── popup.html
│
└── src/
    ├── background.js
    ├── blocked.js
    ├── options.js
    └── popup.js

```

---

## 📦 Installation (Developer Mode)

1. Download or clone this repository  
2. Open your browser's extensions page  
   - **Edge:** edge://extensions  
   - **Chrome:** chrome://extensions  
3. Enable **Developer Mode**  
4. Click **Load unpacked**  
5. Select the extension folder  

---

## 💬 Feedback & Improvements

Feel free to open an issue if you have suggestions or ideas!  
The goal is to keep this extension simple, elegant, and user-controlled.

