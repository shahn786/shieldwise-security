# How to Deploy Canonical Tag Fix to Your VPS

## ✅ What You're Deploying

6 city template files with fixed canonical tags that will solve the Google Search Console "Alternate page with proper canonical tag" issue.

---

## 🚀 Method 1: Hostinger File Manager (EASIEST!)

**Perfect if you're not comfortable with command line.**

### Steps:

1. **Open Replit** and download these 6 files:
   - Right-click each file → Download
   - `views/cities/moorpark.ejs`
   - `views/cities/camarillo.ejs`
   - `views/cities/fillmore.ejs`
   - `views/cities/ojai.ejs`
   - `views/cities/port-hueneme.ejs`
   - `views/cities/san-lorenzo.ejs`

2. **Log into Hostinger control panel** → Click "File Manager"

3. **Navigate to**: `/home/shieldwisesecurity/htdocs/shieldwisesecurity.com/views/cities/`

4. **Upload the 6 files** (they will replace the old versions)

5. **Open Hostinger Terminal** and restart your server:
   ```bash
   pm2 restart shieldwise && pm2 save
   ```

6. **Done!** ✅

---

## 📋 Method 2: Copy-Paste via Terminal (FAST!)

**Good if you're comfortable with basic terminal commands.**

### Steps:

1. **Open Hostinger's browser terminal** (avoids SSH timeout issues)

2. **Go to the cities folder**:
   ```bash
   cd /home/shieldwisesecurity/htdocs/shieldwisesecurity.com/views/cities/
   ```

3. **For EACH of the 6 files**, do this:
   
   **Example for moorpark.ejs:**
   ```bash
   nano moorpark.ejs
   ```
   - Clear everything: `Ctrl+K` repeatedly until empty
   - Open moorpark.ejs in Replit
   - Copy ALL the content
   - Right-click in terminal → Paste
   - Save: `Ctrl+O` → `Enter` → `Ctrl+X`

4. **Repeat step 3** for the other 5 files:
   - camarillo.ejs
   - fillmore.ejs
   - ojai.ejs
   - port-hueneme.ejs
   - san-lorenzo.ejs

5. **Restart server**:
   ```bash
   pm2 restart shieldwise && pm2 save
   ```

6. **Done!** ✅

---

## 🔧 Method 3: SCP Upload (FOR ADVANCED USERS)

**If you have SSH access from your computer.**

### Steps:

1. **Download the 6 files from Replit** to your computer

2. **Use SCP to upload**:
   ```bash
   scp moorpark.ejs camarillo.ejs fillmore.ejs ojai.ejs port-hueneme.ejs san-lorenzo.ejs \
   your_username@your_vps_ip:/home/shieldwisesecurity/htdocs/shieldwisesecurity.com/views/cities/
   ```

3. **SSH into your VPS** and restart:
   ```bash
   ssh your_username@your_vps_ip
   pm2 restart shieldwise && pm2 save
   ```

4. **Done!** ✅

---

## ✅ How to Verify It Worked

After deploying and restarting PM2:

1. **Test the canonical tags**:
   ```bash
   curl -s https://shieldwisesecurity.com/moorpark | grep canonical
   ```
   
   Should show:
   ```html
   <link rel="canonical" href="https://shieldwisesecurity.com/moorpark" />
   ```

2. **Test another URL variation**:
   ```bash
   curl -s https://shieldwisesecurity.com/camarillo-security | grep canonical
   ```
   
   Should show:
   ```html
   <link rel="canonical" href="https://shieldwisesecurity.com/camarillo-security" />
   ```

3. **Check server is running**:
   ```bash
   pm2 status
   ```
   Should show `shieldwise` with status `online` ✅

---

## 🎯 After Deployment

1. **Wait 1-2 hours** for Google to re-crawl
2. **Go to Google Search Console**
3. **Click "VALIDATE FIX"** on the "Alternate page with proper canonical tag" issue
4. **Within 7-14 days**, the error count will drop to zero
5. **Within 2-4 weeks**, all 17 pages will be fully indexed

---

## 🆘 Troubleshooting

### Server won't restart?
```bash
pm2 logs shieldwise
# Look for errors
```

### Files didn't upload?
```bash
ls -la /home/shieldwisesecurity/htdocs/shieldwisesecurity.com/views/cities/
# Check file dates - should be recent
```

### Canonical tags still wrong?
- Clear browser cache
- Wait 5 minutes after PM2 restart
- Try incognito/private browsing mode

---

## 📊 Summary

| Method | Difficulty | Time | Best For |
|--------|-----------|------|----------|
| File Manager | ⭐ Easy | 5 min | Anyone |
| Copy-Paste | ⭐⭐ Medium | 10 min | Comfortable with terminal |
| SCP | ⭐⭐⭐ Advanced | 2 min | SSH experts |

**Recommended**: Use **Method 1 (File Manager)** - it's the safest and easiest! 🎉
