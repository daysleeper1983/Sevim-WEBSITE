# Sevim — website

A bilingual (Turkish/English) website for Sevim — painter, writer, stone
collector, shamanic practitioner, and singer — built so **she can add and
edit everything herself** once it's live, with no coding required.

This document has two parts:

1. **Setup** (technical — for whoever deploys the site, e.g. Harun)
2. **Sevim's day‑to‑day guide** (non‑technical — how to add/edit content)

There's a checklist at the very end of things to personalize before the
site goes fully live.

---

## How this site works

- **Eleventy** (a static site generator) turns simple content files into
  the actual website — fast, no database, nothing to "hack."
- **Decap CMS** gives Sevim a visual, form-based editor at `/admin/` —
  she logs in, fills in fields, clicks "Publish," and the live site
  updates automatically within about a minute.
- **Netlify** hosts the site for free and rebuilds it automatically every
  time content changes (whether she edits through `/admin/` or you edit
  the files directly and push to GitHub).
- Every page exists in **Turkish and English**, with a **TR / EN switch**
  in the top navigation. The CMS lets her fill in both languages for each
  piece of content, side by side.

Nothing here needs a monthly fee. Netlify's free tier comfortably covers
a personal site like this (in mid-2026 it includes 100GB bandwidth and
300 build minutes/month — a personal site with occasional updates uses a
tiny fraction of that). The only cost is the domain she already owns.

---

## Part 1 — Setup

### 1. Put the code on GitHub

```bash
cd sevim-site
git init
git add .
git commit -m "Initial site"
```

Create a new **empty** repository on [github.com](https://github.com)
(no README/license, so it stays empty), then:

```bash
git remote add origin https://github.com/<your-username>/sevim-site.git
git branch -M main
git push -u origin main
```

### 2. Deploy on Netlify

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** →
   **Import an existing project** → connect GitHub → pick the
   `sevim-site` repo.
2. Netlify will detect the build settings automatically from
   `netlify.toml` (build command `npm run build`, publish directory
   `_site`). Click **Deploy**.
3. After the first deploy finishes, you'll get a temporary URL like
   `random-name-123.netlify.app` — open it and confirm the site looks
   right.

### 3. Turn on the CMS login (Netlify Identity + Git Gateway)

This is what lets Sevim log in at `/admin/` with just an email address —
no GitHub account needed for her.

1. In the Netlify dashboard for this site: **Site configuration →
   Identity → Enable Identity**.
2. Under Identity settings, set **Registration → Invite only** (so
   random people can't sign themselves up).
3. Still under Identity, go to **Services → Git Gateway → Enable Git
   Gateway**. This lets the CMS commit changes to GitHub on her behalf,
   without her ever touching Git.
4. Go to **Identity → Invite users**, enter Sevim's email address, and
   send the invite. She'll get an email with a link to set her password.

That's it — she can now go to `https://<her-site>/admin/`, log in, and
start editing.

### 4. Connect her domain

1. In Netlify: **Site configuration → Domain management → Add a domain**,
   type the domain she already registered, and follow the prompts.
2. Netlify will show you exact DNS records to add. Usually this means
   either:
   - Pointing the domain's **nameservers** to Netlify (simplest, Netlify
     manages everything), or
   - Adding an **A record** (for the bare domain) and a **CNAME record**
     (for `www`) at her domain registrar (GoDaddy, Namecheap, İsimtescil,
     Turhost, etc.) pointing to the values Netlify shows you.
3. DNS changes can take anywhere from a few minutes to ~24 hours to fully
   propagate. Netlify auto-provisions a free HTTPS certificate once the
   domain resolves.
4. **Important:** once the real domain is live, update it in three
   places so links, previews, and the CMS all point to the right place:
   - `src/_data/meta.json` → `site_url`
   - `admin/config.yml` → `site_url` and `display_url`
   - Commit and push these two small changes.

### 5. Turn on the contact form (optional but recommended)

The contact page (`/iletisim/` / `/contact/`) already has a working
`<form>` set up for **Netlify Forms** (`data-netlify="true"`) — no extra
code needed. After the first deploy:

1. In Netlify: **Site configuration → Forms** — you should see a
   "contact" form listed once someone submits it (or after the first
   deploy detects it).
2. Go to **Forms → Settings and usage → Form notifications** and add an
   email notification to Sevim's email, so she gets pinged whenever
   someone requests a session.

Netlify Forms' free tier includes 100 submissions/month, which is far
more than a personal site like this typically needs.

---

## Part 2 — Sevim's guide (day-to-day editing)

*(Türkçe kullanım rehberi aşağıdadır — the Turkish version is below.)*

### Logging in

1. Go to `https://<hersite.com>/admin/`.
2. Log in with the email address the site was set up with, and the
   password she chose when accepting the invite.

### Adding a new gallery item (a painting or a stone)

1. Click **Galeri / Gallery** in the left sidebar → **New Galeri /
   Gallery**.
2. Upload a photo, pick a category (stone / painting / shamanic / other),
   fill in the title and description **in both the Turkish and English
   tabs**, and check "Featured" if it should also appear on the
   homepage.
3. Click **Publish**. The live site updates in about a minute.

### Adding a journal / blog post

Same idea: **Günlük / Journal → New**, fill in title, a short excerpt,
and the full text (in both languages), pick a date, add a cover image if
you like, then **Publish**.

### Adding a book

**Kitaplar / Books → New** — cover image, title, description, a link to
buy or learn more (optional), publish year, and whether it's already
published or upcoming.

### Editing the general site text

Under **Genel İçerik / General Content → Site Metinleri / Site Text**
you'll find everything else: the homepage headline, the About page bio,
session offerings and their durations, music track links, contact info,
social media links, and so on — each with separate Turkish and English
fields where it applies.

### A few notes

- Every change is saved as a **draft** until you click **Publish** — feel
  free to save and come back later.
- Photos you upload go straight into the site; no need to resize them
  perfectly first, though photos under ~2–3MB will make pages load
  faster.
- If something looks wrong after publishing, the previous version is
  still recoverable through the site's GitHub history — just message
  whoever set this up for you.

---

## Türkçe Kullanım Rehberi

### Giriş yapma

1. `https://<sitenadi.com>/admin/` adresine gidin.
2. Site kurulurken kullanılan e-posta adresi ve davet e-postasından
   belirlediğiniz şifre ile giriş yapın.

### Yeni bir galeri öğesi ekleme (tablo veya taş)

1. Sol menüden **Galeri / Gallery → New Galeri / Gallery**'ye tıklayın.
2. Bir görsel yükleyin, kategori seçin (taş / resim / şamanik / diğer),
   başlık ve açıklamayı **hem Türkçe hem İngilizce sekmelerinde**
   doldurun, anasayfada da görünmesini istiyorsanız "Featured" kutusunu
   işaretleyin.
3. **Publish**'e tıklayın. Site yaklaşık bir dakika içinde güncellenir.

### Günlük / blog yazısı ekleme

Aynı mantık: **Günlük / Journal → New** — başlık, kısa özet ve tam metni
(iki dilde de) doldurun, tarih seçin, isterseniz bir kapak görseli
ekleyin, sonra **Publish**.

### Kitap ekleme

**Kitaplar / Books → New** — kapak görseli, başlık, açıklama, satın alma
linki (opsiyonel), yayın yılı ve yayında mı yoksa yakında mı olduğunu
seçin.

### Genel site metinlerini düzenleme

**Genel İçerik / General Content → Site Metinleri / Site Text**
altında geri kalan her şeyi bulabilirsiniz: anasayfa başlığı, Hakkımda
sayfasındaki biyografi, seans türleri ve süreleri, müzik parça linkleri,
iletişim bilgileri, sosyal medya linkleri vb. — uygun olan alanlarda
ayrı Türkçe ve İngilizce kutucuklarıyla.

### Birkaç not

- Her değişiklik siz **Publish**'e basana kadar taslak olarak kalır —
  istediğiniz zaman kaydedip daha sonra devam edebilirsiniz.
- Yüklediğiniz fotoğraflar direkt siteye eklenir; önceden mükemmel
  boyutlandırmanıza gerek yok, ama ~2–3MB altındaki fotoğraflar
  sayfaların daha hızlı açılmasını sağlar.
- Yayınladıktan sonra bir şey yanlış görünüyorsa, önceki sürüm GitHub
  geçmişinde hâlâ duruyor — siteyi sizin için kuran kişiye yazmanız
  yeterli.

---

## Checklist before going fully live

- [ ] Replace the placeholder bio (About page) with Sevim's real story
- [ ] Replace the 6 placeholder gallery pieces with real photos of her
      art and stones
- [ ] Replace the 2 placeholder book covers/descriptions
- [ ] Fill in real session offerings, durations, and pricing if desired
- [ ] Add real audio/music links (Spotify, YouTube, SoundCloud…)
- [ ] Replace the 2 placeholder journal posts (or delete them)
- [ ] Update contact email, phone, and social media links
- [ ] Swap the placeholder portrait photo for a real one
- [ ] Update `site_url` in `src/_data/meta.json` and `admin/config.yml`
      once the real domain is connected
- [ ] Double-check the Turkish **and** English version of every page —
      the CMS makes it easy to fill in one language and forget the other
