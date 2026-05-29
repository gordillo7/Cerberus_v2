# 🔍 Cerberus - Pentesting Web Application

> ✨ **Now with React 18 + TypeScript frontend for a modern UI!**  
> See [REACT_MIGRATION.md](REACT_MIGRATION.md) for details.

A web application for automated security reconnaissance, written in Python (Flask) and JavaScript (React). It integrates advanced scanning tools, automatic report generation, AI assistance, and a modern dashboard for managing versioned projects and scan results.

## 🚀 Main Features

### Security Scanning
- Port and service scanning (Nmap)
- DNS reconnaissance (DNSdumpster + MXToolbox + API Ninja WHOIS)
- Email OSINT: leaked emails detection (IntelligenceX + LeakCheck)
- Subdomain enumeration and activity check (Subfinder + HTTPX)
- Web vulnerability scanning (Nuclei)
- CMS detection (WhatWeb)
- Website screenshot capture (Pyppeteer)
- Web directory and file enumeration (Feroxbuster)
- WordPress reconnaissance and brute force (WPScan)
- Joomla reconnaissance (Joomscan)
- FTP service analysis (ftplib + Searchsploit)
- SSH brute-force and analysis (Hydra + Searchsploit)

### Reports & Intelligence
- Automatic PDF report generation (ReportLab)
- Built-in AI assistant using Gemini Flash 2.0
- Next steps recommendations (offensive & defensive)
- Vulnerability analysis and remediation guidance

### Modern UI (v2.0)
- React 18 with TypeScript
- Responsive design with TailwindCSS
- Dark/Light mode theme
- Real-time scan logs
- Project management dashboard
- Settings for API tokens and proxy config

## 🎨 Frontend Stack (v2.0)

- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Ultra-fast build tool (15s build time)
- **TailwindCSS** - Modern styling
- **React Router v6** - SPA navigation
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

## 🖥️ Quick Start

### Installation

```bash
# Install Python dependencies
pip install -r requirements.txt

# Install and build frontend
cd frontend
npm install
npm run build
cd ..
```

### Running

**Production mode:**
```bash
python app.py
# Visit http://localhost:5000
```

**Development mode:**

Terminal 1:
```bash
python app.py
```

Terminal 2:
```bash
cd frontend
npm run dev
# Visit http://localhost:5173 (with hot reload)
```

See [QUICKSTART.md](QUICKSTART.md) for more details.

## 📁 Project Structure

```
cerberus-v2/
├── app.py                      # Flask API + SPA server
├── main.py                     # Main scanning engine
├── requirements.txt            # Python dependencies
├── REACT_MIGRATION.md          # React v2.0 migration guide
├── QUICKSTART.md               # Quick start guide
│
├── frontend/                   # 🎨 React application (NEW!)
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── services/           # API integration
│   │   ├── types/              # TypeScript types
│   │   ├── context/            # Context providers
│   │   ├── hooks/              # Custom hooks
│   │   └── styles/             # Global styles
│   ├── dist/                   # Compiled output
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── modules/                    # Scanning modules
├── config/                     # Configuration files
├── reports/                    # Generated PDF reports
├── logs/                       # Scan logs
├── projects/                   # Project data
├── wordlists/                  # Security wordlists
└── static/                     # (Legacy) Static assets
```

## 📊 Build Info

| Metric | Value |
|--------|-------|
| **Frontend Framework** | React 18 + TypeScript |
| **Build Tool** | Vite 5 |
| **Build Time** | ~15 seconds |
| **Bundle Size** | ~260 KB (gzipped) |
| **Styling** | TailwindCSS 3 |
| **Type Safety** | 100% TypeScript |

## 🧠 AI Assistant

Powered by Google Gemini Flash 2.0, can:
- Suggest next steps after a scan
- Recommend solutions for detected vulnerabilities
- Answer technical questions based on scan results
- Generate offensive and defensive action plans

## 📈 Version History

- **v2.0** (Current) - React frontend with modern UI
- **v1.0** - Original Flask-based UI

## ⚙️ Requirements

* Python 3
* Linux OS (recommended)
* All dependencies are listed in `requirements.txt`

Install dependencies with:

```bash
pip install -r requirements.txt
```

## 📌 License
This project is distributed under a Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0) license.

<img src="public/img/licenseimage.png" alt="License image" width="79" height="28">
