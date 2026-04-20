# Blog Troubleshooting Guide - MoreThanOneWay.org

## Common Issues & Solutions

This guide covers the most common problems you might encounter with your blog and how to fix them.

---

## Build & Deployment Issues

### ❌ "npm run build" fails with syntax error

**Error looks like:**
```
SyntaxError: Unexpected token
```

**Cause:** JavaScript syntax error in posts.js (usually a missing comma or bracket)

**Solution:**

1. **Check for missing commas:**
```javascript
// ❌ WRONG (missing comma after first post)
{
  id: 1,
  title: "Post 1",
  content: `...`
}
{  // ← Error! Missing comma above
  id: 2,
  title: "Post 2"
}

// ✅ CORRECT
{
  id: 1,
  title: "Post 1",
  content: `...`
},  // ← Comma here!
{
  id: 2,
  title: "Post 2"
}
```

2. **Check for unclosed backticks:**
```javascript
// ❌ WRONG
content: `
  This is my content
  // Missing closing backtick!

// ✅ CORRECT
content: `
  This is my content
`
```

3. **Check for unclosed brackets:**
```javascript
// ❌ WRONG
{
  id: 1,
  title: "Post"
  // Missing closing brace!

// ✅ CORRECT
{
  id: 1,
  title: "Post"
}
```

**Use a code editor** (VS Code, Notepad++) to highlight matching brackets!

---

### ❌ "Module not found" error

**Error looks like:**
```
Failed to resolve import "./posts" from "src/BlogPage.jsx"
```

**Cause:** Missing file in src folder

**Solution:**

1. Check that ALL these files exist in your `src` folder:
   - BlogPage.jsx
   - BlogPost.jsx
   - BlogCard.jsx
   - posts.js

2. Check file names are EXACTLY:
   - ✅ `BlogPage.jsx` (capital B, capital P)
   - ❌ NOT `Blogpage.jsx` or `blogpage.jsx`

3. Check that posts.js has the export statement at bottom:
```javascript
export const posts = [
  // ... your posts
];
```

---

### ❌ Deploy succeeds but changes don't appear

**Cause:** Browser cache or GitHub Pages deployment delay

**Solution:**

1. **Wait 2-3 minutes** after `npm run deploy` finishes
2. **Hard refresh browser:**
   - Windows: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`
3. **Try incognito/private window**
4. **Check GitHub Actions:**
   - Go to your GitHub repo
   - Click "Actions" tab
   - Make sure gh-pages deployment finished

---

## Display Issues

### ❌ Post not showing up on blog page

**Symptoms:** New post doesn't appear in blog listing

**Solution:**

1. **Check posts.js array:**
```javascript
export const posts = [
  {
    id: 1,
    // ... post 1
  },
  {
    id: 2,
    // ... YOUR NEW POST (is it here?)
  }
];
```

2. **Make sure post has all required fields:**
```javascript
{
  id: 2,              // ✅ Required
  title: "...",       // ✅ Required
  slug: "...",        // ✅ Required
  date: "...",        // ✅ Required
  category: "...",    // ✅ Required
  excerpt: "...",     // ✅ Required
  readTime: "...",    // ✅ Required
  content: `...`      // ✅ Required
}
```

3. **Check category name matches exactly:**
   - ✅ `"Career"` or `"Academics"` or `"Mental Health"`
   - ❌ NOT `"career"` or `"mental health"` (case matters!)

4. **Rebuild and test:**
```bash
npm run build
npm run dev
```

---

### ❌ Featured post not displaying correctly

**Symptoms:** Featured post looks the same as regular posts

**Solution:**

1. **Check only ONE post has `featured: true`:**
```javascript
{
  id: 1,
  featured: true,  // ✅ Only this one
  // ...
},
{
  id: 2,
  featured: false,  // All others should be false
  // ...
}
```

2. **Featured posts only show when:**
   - No category filter is selected
   - No search term is entered

3. **Test by:**
   - Going to /blog (main page)
   - Make sure "All Posts" is selected
   - Featured post should be large card at top

---

### ❌ Category colors not showing

**Symptoms:** Category tags are all the same color

**Solution:**

1. **Check category name matches EXACTLY:**
```javascript
// ✅ CORRECT (these have colors)
category: "Career"        // Blue
category: "Academics"     // Green
category: "Mental Health" // Purple

// ❌ WRONG (no color defined)
category: "career"
category: "Career Advice"
category: "academics"
```

2. **To add a new category color:**

Edit `BlogCard.jsx`, find this section:
```javascript
className={`
  text-xs font-medium px-3 py-1 rounded-full
  ${post.category === 'Career' ? 'bg-blue-100 text-blue-700' : ''}
  ${post.category === 'Academics' ? 'bg-green-100 text-green-700' : ''}
  ${post.category === 'Mental Health' ? 'bg-purple-100 text-purple-700' : ''}
`}
```

Add your new category:
```javascript
${post.category === 'Your New Category' ? 'bg-orange-100 text-orange-700' : ''}
```

Do the same in `BlogPost.jsx`!

---

### ❌ Search not working

**Symptoms:** Typing in search bar doesn't filter posts

**Solution:**

1. **Check that posts have tags:**
```javascript
{
  id: 1,
  tags: ["keyword1", "keyword2"],  // ✅ Has tags
  // ...
}
```

2. **Search looks in:**
   - Post title
   - Post excerpt
   - Post tags

3. **Test search by:**
   - Typing exact words from title
   - Typing words from tags array

---

## Content Issues

### ❌ Markdown not rendering

**Symptoms:** Seeing markdown syntax instead of formatted text

**Example:**
```
# This should be a heading
**This should be bold**
```

**Solution:**

1. **Check backticks are correct:**
```javascript
// ✅ CORRECT
content: `
# Heading
**Bold text**
`

// ❌ WRONG (using quotes instead of backticks)
content: "
# Heading
**Bold text**
"
```

2. **Make sure react-markdown is installed:**
```bash
npm install react-markdown remark-gfm
```

3. **Check imports in BlogPost.jsx:**
```javascript
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
```

---

### ❌ Internal links not working

**Symptoms:** Clicking link in blog post doesn't navigate

**Solution:**

1. **Check link format:**
```markdown
✅ CORRECT
[Crisis Resources](/crisis)
[Study Help](/study-resources)

❌ WRONG
[Crisis Resources](crisis)  ← Missing leading slash
[Study Help](https://morethanoneway.org/study-resources)  ← Full URL won't work
```

2. **Check page name mapping in BlogPost.jsx:**

The `handleInternalLink` function maps URLs to page names:
```javascript
const pageMap = {
  '/study-resources': 'study-resources',
  '/crisis': 'crisis',
  // ... etc
};
```

If you added a new page, add it here!

3. **Available internal links:**
   - `/study-resources`
   - `/crisis`
   - `/stories`
   - `/find-internships`
   - `/resume-builder`
   - `/search-guide`
   - `/interview-prep`
   - `/youre-not-alone`
   - `/job-tools`
   - `/tracker`

---

### ❌ Images not loading

**Symptoms:** Broken image icon or missing images

**Solution:**

1. **Check image is in public folder:**
```
public/
  images/
    blog/
      your-image.jpg  ← Image must be here!
```

2. **Check path format:**
```javascript
// ✅ CORRECT
image: "/images/blog/my-image.jpg"

// ❌ WRONG
image: "./images/blog/my-image.jpg"  ← No leading dot
image: "images/blog/my-image.jpg"    ← Missing leading slash
image: "/src/images/blog/my-image.jpg"  ← Wrong folder
```

3. **Check file extension matches:**
   - File is `photo.jpg` → Use `.jpg` in path
   - File is `photo.png` → Use `.png` in path
   - Case-sensitive on some servers!

4. **Test locally:**
```bash
npm run dev
# Visit http://localhost:5173/blog
```

---

## Navigation Issues

### ❌ Blog link not appearing in menu

**Symptoms:** Can't find Blog in navigation dropdown

**Solution:**

1. **Check App.jsx has blog in resourcesItems:**
```javascript
const resourcesItems = [
  { page: 'resources', label: 'Career Resources', icon: <Briefcase /> },
  { page: 'blog', label: 'Blog', icon: <Newspaper /> },  // ← Should be here
  // ...
];
```

2. **Check Newspaper icon is imported:**
```javascript
import { Heart, MessageCircle, Newspaper, ... } from 'lucide-react';
```

3. **Rebuild:**
```bash
npm run build
```

---

### ❌ Clicking blog post does nothing

**Symptoms:** Clicking post card doesn't open the post

**Solution:**

1. **Check App.jsx has selectedPostSlug state:**
```javascript
const [selectedPostSlug, setSelectedPostSlug] = useState('');
```

2. **Check BlogPage receives props:**
```javascript
{currentPage === 'blog' && (
  <BlogPage 
    setCurrentPage={setCurrentPage} 
    setSelectedPostSlug={setSelectedPostSlug}  // ← Must have this
  />
)}
```

3. **Check BlogCard receives props:**
In `BlogPage.jsx`:
```javascript
<BlogCard 
  post={post}
  setCurrentPage={setCurrentPage}
  setSelectedPostSlug={setSelectedPostSlug}  // ← Must pass this
/>
```

---

### ❌ Back button doesn't work

**Symptoms:** "Back to Blog" button does nothing

**Solution:**

1. **Check BlogPost.jsx has setCurrentPage:**
```javascript
<button
  onClick={() => setCurrentPage('blog')}  // ← Should be 'blog' not '/blog'
  // ...
>
  Back to Blog
</button>
```

2. **Make sure BlogPost receives setCurrentPage prop:**
In `App.jsx`:
```javascript
{currentPage === 'blog-post' && (
  <BlogPost 
    setCurrentPage={setCurrentPage}  // ← Must have this
    selectedPostSlug={selectedPostSlug}
    setSelectedPostSlug={setSelectedPostSlug}
  />
)}
```

---

## Performance Issues

### ⚠️ Blog page loads slowly

**Symptoms:** Blog takes several seconds to load

**Solutions:**

1. **Optimize images:**
   - Use compressed JPGs (not huge PNGs)
   - Resize images to max 1200px wide
   - Use tools like TinyPNG or Squoosh

2. **Reduce post count:**
   - If you have 50+ posts, consider pagination
   - Archive old posts

3. **Check for large markdown content:**
   - Very long posts (5000+ words) can slow rendering
   - Consider breaking into multiple posts

---

## Debugging Tips

### How to Find Errors

**1. Check Browser Console:**
- Press `F12` (Windows) or `Cmd+Option+I` (Mac)
- Click "Console" tab
- Look for red error messages
- Read the error carefully - it usually tells you what's wrong!

**2. Check Terminal Output:**
When running `npm run build` or `npm run dev`:
- Read error messages carefully
- Note the file name and line number
- Error usually tells you exactly what to fix

**3. Test Locally First:**
```bash
npm run dev
```
- Errors show immediately
- Faster than deploying
- Can experiment safely

**4. Use Process of Elimination:**
- Comment out your new post
- Does blog work now?
- If yes → problem is in your new post
- If no → problem is elsewhere

**5. Compare to Working Example:**
- Look at existing posts in posts.js
- Copy structure exactly
- Change content but keep format

---

## Emergency Fixes

### 🚨 Site is broken after deployment

**Quick fix:**

1. **Revert to last working version:**
```bash
git log  # Find last working commit
git revert <commit-hash>
npm run build
npm run deploy
```

2. **Or restore backup:**
   - Go to your GitHub repo
   - Download previous version of posts.js
   - Replace your broken version
   - Redeploy

**Prevention:**
- Always test with `npm run dev` before deploying
- Keep backups of posts.js

---

### 🚨 Accidentally deleted all posts

**Solution:**

1. **Check Git history:**
```bash
git checkout HEAD~1 src/posts.js  # Restore from 1 commit ago
```

2. **Or download from GitHub:**
   - Go to your repo
   - Find posts.js
   - Click "History"
   - Download previous version

**Prevention:**
- Commit changes before editing
- Keep backup copy of posts.js

---

## Getting More Help

### Before Asking for Help

Provide this information:
- What you were trying to do
- What you expected to happen
- What actually happened
- Error messages (exact text)
- Browser and operating system

### Resources

- **Technical documentation:** BLOG_README.md
- **Writing guide:** BLOG_WRITING_GUIDE.md
- **Project plan:** BLOG_MASTER_PLAN.md

### Contact

Email: support@morethanoneway.org

---

## Preventive Maintenance

### Best Practices

**✅ DO:**
- Test locally before deploying
- Keep backups of posts.js
- Commit changes to Git regularly
- Use consistent formatting
- Proofread before publishing

**❌ DON'T:**
- Edit live site files directly
- Skip testing step
- Make multiple changes at once
- Delete files without backups

---

## Common Warnings (Safe to Ignore)

### ⚠️ "Compiled with warnings"

**If you see:**
```
Compiled with warnings.

./src/BlogPage.jsx
  Line 42: React Hook useEffect has a missing dependency
```

**This is usually safe to ignore** if your site works correctly.

These are suggestions, not errors.

---

## Still Having Issues?

**Try this debugging checklist:**

- [ ] Ran `npm install` (dependencies installed)?
- [ ] All 4 blog files in src folder?
- [ ] posts.js has proper syntax (no missing commas)?
- [ ] Tested with `npm run dev` first?
- [ ] Cleared browser cache (Ctrl+Shift+R)?
- [ ] Waited 2-3 minutes after deploy?
- [ ] Checked browser console for errors (F12)?
- [ ] Compared your code to working examples?

If you've checked all of these and still have issues, email support@morethanoneway.org with:
- What you're trying to do
- Error message (exact text)
- Screenshot if applicable

---

**Most issues are simple syntax errors - you've got this!** 🔧
