import os, re

def make_dropdown_html(current_page):
    is_v1 = 'visualizer.html' in current_page and 'visualizer-2' not in current_page and 'visualizer-3' not in current_page
    is_v2 = 'visualizer-2.html' in current_page
    is_v3 = 'visualizer-3' in current_page
    is_any_v = is_v1 or is_v2 or is_v3

    active_toggle = ' active' if is_any_v else ''
    active_v1 = ' active' if is_v1 else ''
    active_v2 = ' active' if is_v2 else ''
    active_v3 = ' active' if is_v3 else ''

    return f'''<li class="nav-item nav-dropdown">
        <a class="nav-link nav-dropdown-toggle{active_toggle}" href="visualizer.html" id="visualizersDropdown">
          Visualizers <span class="nav-dropdown-arrow">▾</span>
        </a>
        <div class="nav-dropdown-menu">
          <a class="nav-dropdown-card{active_v1}" href="visualizer.html">
            <div class="nav-dropdown-badge badge-1">1.0</div>
            <div class="nav-dropdown-content">
              <div class="nav-dropdown-title">Live Visualizer (1D Photos)</div>
              <div class="nav-dropdown-sub">Realistic room renders &amp; texture split comparison</div>
            </div>
          </a>
          <a class="nav-dropdown-card{active_v2}" href="visualizer-2.html">
            <div class="nav-dropdown-badge badge-2">2.0</div>
            <div class="nav-dropdown-content">
              <div class="nav-dropdown-title">2D/3D Stone Studio</div>
              <div class="nav-dropdown-sub">Real-time customizable floor &amp; wall material simulation</div>
            </div>
          </a>
          <a class="nav-dropdown-card{active_v3}" href="visualizer-3.html">
            <div class="nav-dropdown-badge badge-3">3.0</div>
            <div class="nav-dropdown-content">
              <div class="nav-dropdown-title">3D Interactive Showroom</div>
              <div class="nav-dropdown-sub">Walkthrough living suite with custom tiles &amp; slabs</div>
            </div>
          </a>
        </div>
      </li>'''

def make_mobile_dropdown_html(current_page):
    is_v1 = 'visualizer.html' in current_page and 'visualizer-2' not in current_page and 'visualizer-3' not in current_page
    is_v2 = 'visualizer-2.html' in current_page
    is_v3 = 'visualizer-3' in current_page

    active_v1 = ' style="color:var(--gold);"' if is_v1 else ''
    active_v2 = ' style="color:var(--gold);"' if is_v2 else ''
    active_v3 = ' style="color:var(--gold);"' if is_v3 else ''

    return f'''<div class="m-dropdown-group">
    <div class="m-dropdown-header">Visualizers</div>
    <a class="m-link m-sublink"{active_v1} href="visualizer.html"><span class="m-badge">1.0</span> Realistic Live (1D Photos)</a>
    <a class="m-link m-sublink"{active_v2} href="visualizer-2.html"><span class="m-badge badge-gold">2.0</span> 2D Stone Studio</a>
    <a class="m-link m-sublink"{active_v3} href="visualizer-3.html"><span class="m-badge badge-v3">3.0</span> 3D Showroom</a>
  </div>'''

dropdown_css = '''
/* ── Visualizers Dropdown Menu (Single Expanding Nav Item) ── */
.nav-dropdown {
  position: relative;
}

.nav-dropdown-toggle {
  display: inline-flex !important;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.nav-dropdown-arrow {
  display: inline-block;
  font-size: 0.65rem;
  line-height: 1;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  color: var(--gold, #C5A059);
  pointer-events: none;
}

.nav-dropdown:hover .nav-dropdown-arrow,
.nav-dropdown:focus-within .nav-dropdown-arrow,
.nav-dropdown.open .nav-dropdown-arrow {
  transform: rotate(180deg);
}

.nav-dropdown::after {
  content: '';
  position: absolute;
  top: 100%;
  left: -20px;
  right: -20px;
  height: 20px;
  z-index: 10004;
}

.nav-dropdown-menu {
  position: absolute;
  top: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  min-width: 330px;
  background: rgba(14, 14, 18, 0.98);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(197, 160, 89, 0.35);
  border-radius: 14px;
  padding: 10px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.85), 0 0 24px rgba(197, 160, 89, 0.15);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.28s ease, transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.28s;
  z-index: 10005;
  display: flex;
  flex-direction: column;
  gap: 6px;
  list-style: none;
  margin: 0;
}

.nav-dropdown:hover .nav-dropdown-menu,
.nav-dropdown:focus-within .nav-dropdown-menu,
.nav-dropdown.open .nav-dropdown-menu {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}

.nav-dropdown-card {
  display: flex !important;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border-radius: 10px;
  text-decoration: none !important;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.22s ease !important;
  box-sizing: border-box;
}

.nav-dropdown-card::after {
  display: none !important;
}

.nav-dropdown-card:hover, .nav-dropdown-card.active {
  background: rgba(197, 160, 89, 0.12);
  border-color: rgba(197, 160, 89, 0.45);
  transform: translateX(3px);
}

.nav-dropdown-badge {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body, 'Inter', sans-serif);
  font-weight: 800;
  font-size: 0.74rem;
  letter-spacing: 0.02em;
}

.nav-dropdown-badge.badge-1 {
  background: linear-gradient(135deg, #4A4A58, #282834);
  color: #E8E6E1;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.nav-dropdown-badge.badge-2 {
  background: linear-gradient(135deg, #7A5C2E, #4A3818);
  color: #FFD700;
  border: 1px solid rgba(197, 160, 89, 0.4);
}

.nav-dropdown-badge.badge-3 {
  background: linear-gradient(135deg, #C5A059, #FFD700);
  color: #0E0E10;
  box-shadow: 0 2px 10px rgba(197, 160, 89, 0.35);
}

.nav-dropdown-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
  text-align: left;
}

.nav-dropdown-title {
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #FFFFFF;
  text-transform: uppercase;
  transition: color 0.2s;
}

.nav-dropdown-card:hover .nav-dropdown-title {
  color: var(--gold, #C5A059);
}

.nav-dropdown-sub {
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 0.65rem;
  color: #9E9689;
  line-height: 1.25;
  text-transform: none;
  letter-spacing: 0;
}

/* Mobile Dropdown Group */
.m-dropdown-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin: 0.4rem 0;
}

.m-dropdown-header {
  font-family: var(--font-body, 'Inter', sans-serif);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: var(--gold, #C5A059);
}

.m-sublink {
  font-size: 1.4rem !important;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

.m-badge {
  font-size: 0.7rem;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.12);
  color: #FFF;
}
.m-badge.badge-gold {
  background: linear-gradient(135deg, #7A5C2E, #4A3818);
  color: #FFD700;
  border: 1px solid rgba(197, 160, 89, 0.4);
}
.m-badge.badge-v3 {
  background: linear-gradient(135deg, #C5A059, #FFD700);
  color: #0E0E10;
}
'''

def update_file(path):
    if not os.path.exists(path):
        return
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    orig = content
    fname = os.path.basename(path)

    # 1. Desktop Nav replacement:
    # Matches the list item sequence containing visualizer.html up to visualizer-3.html (or visualizer-2.html)
    # Pattern A: 3-link list items (visualizer.html -> visualizer-2.html -> visualizer-3.html)
    pat_3 = r'<li[^>]*>\s*<a[^>]*href=["\']visualizer\.html["\'][^>]*>.*?</a>\s*</li>[\s\S]*?<li[^>]*>\s*<a[^>]*href=["\']visualizer-3\.html["\'][^>]*>.*?</a>\s*</li>'
    if re.search(pat_3, content):
        content = re.sub(pat_3, make_dropdown_html(fname), content, count=1)
    else:
        # Pattern B: 2-link list items (visualizer.html -> visualizer-2.html)
        pat_2 = r'<li[^>]*>\s*<a[^>]*href=["\']visualizer\.html["\'][^>]*>.*?</a>\s*</li>[\s\S]*?<li[^>]*>\s*<a[^>]*href=["\']visualizer-2\.html["\'][^>]*>.*?</a>\s*</li>'
        if re.search(pat_2, content):
            content = re.sub(pat_2, make_dropdown_html(fname), content, count=1)
        else:
            # Pattern C: Single visualizer item if present
            pat_1 = r'<li[^>]*>\s*<a[^>]*href=["\']visualizer\.html["\'][^>]*>.*?</a>\s*</li>'
            if re.search(pat_1, content):
                content = re.sub(pat_1, make_dropdown_html(fname), content, count=1)

    # 2. In visualizer-3.html: update .v3-nav-links
    if 'v3-nav-links' in content:
        pat_v3 = r'<li><a href=["\']visualizer\.html["\'].*?</li>[\s\S]*?<li><a href=["\']visualizer-3\.html["\'].*?</li>'
        if re.search(pat_v3, content):
            content = re.sub(pat_v3, make_dropdown_html(fname), content, count=1)

    # 3. Mobile Nav in standalone links (like index.html):
    pat_mob_3 = r'<a class=["\']m-link["\'][^>]*href=["\']visualizer\.html["\'][^>]*>.*?</a>[\s\S]*?<a class=["\']m-link["\'][^>]*href=["\']visualizer-3\.html["\'][^>]*>.*?</a>'
    if re.search(pat_mob_3, content):
        content = re.sub(pat_mob_3, make_mobile_dropdown_html(fname), content, count=1)
    else:
        pat_mob_2 = r'<a class=["\']m-link["\'][^>]*href=["\']visualizer\.html["\'][^>]*>.*?</a>[\s\S]*?<a class=["\']m-link["\'][^>]*href=["\']visualizer-2\.html["\'][^>]*>.*?</a>'
        if re.search(pat_mob_2, content):
            content = re.sub(pat_mob_2, make_mobile_dropdown_html(fname), content, count=1)

    # 4. Mobile Nav in list (<li><a class="mobile-nav-link"...):
    pat_mob_list = r'<li>\s*<a class=["\']mobile-nav-link["\'][^>]*href=["\']visualizer\.html["\'][^>]*>.*?</a>\s*</li>[\s\S]*?<li>\s*<a class=["\']mobile-nav-link["\'][^>]*href=["\']visualizer-3\.html["\'][^>]*>.*?</a>\s*</li>'
    if re.search(pat_mob_list, content):
        content = re.sub(pat_mob_list, make_mobile_dropdown_html(fname), content, count=1)
    else:
        pat_mob_list_2 = r'<li>\s*<a class=["\']mobile-nav-link["\'][^>]*href=["\']visualizer\.html["\'][^>]*>.*?</a>\s*</li>[\s\S]*?<li>\s*<a class=["\']mobile-nav-link["\'][^>]*href=["\']visualizer-2\.html["\'][^>]*>.*?</a>\s*</li>'
        if re.search(pat_mob_list_2, content):
            content = re.sub(pat_mob_list_2, make_mobile_dropdown_html(fname), content, count=1)

    # 5. Inline style check for index.html / visualizer-3.html if navigation.css not linked
    if 'navigation.css' not in content and '.nav-dropdown' not in content:
        if '</style>' in content:
            content = content.replace('</style>', dropdown_css + '\n</style>', 1)

    if content != orig:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated navigation in: {path}')
    else:
        print(f'No nav change needed or already updated: {path}')

def main():
    pages = [
        'd:/projects/Web-Dev/chirag/ch01/index.html',
        'd:/projects/Web-Dev/chirag/ch01/visualizer.html',
        'd:/projects/Web-Dev/chirag/ch01/visualizer-2.html',
        'd:/projects/Web-Dev/chirag/ch01/visualizer-3.html',
        'd:/projects/Web-Dev/chirag/ch01/products.html',
        'd:/projects/Web-Dev/chirag/ch01/stone-analysis.html',
        'd:/projects/Web-Dev/chirag/ch01/faq.html',
        'd:/projects/Web-Dev/chirag/ch01/contact.html',
        'd:/projects/Web-Dev/chirag/ch01/blog.html',
        'd:/projects/Web-Dev/chirag/ch01/login.html',
        'd:/projects/Web-Dev/chirag/ch01/privacy.html',
        'd:/projects/Web-Dev/chirag/ch01/terms.html',
        'd:/projects/Web-Dev/chirag/ch01/404.html',
        'd:/projects/Web-Dev/chirag/index.html',
        'd:/projects/Web-Dev/chirag/visualizer.html',
        'd:/projects/Web-Dev/chirag/visualizer-2.html',
        'd:/projects/Web-Dev/chirag/visualizer-3.html',
        'd:/projects/Web-Dev/chirag/products.html',
        'd:/projects/Web-Dev/chirag/stone-analysis.html',
        'd:/projects/Web-Dev/chirag/faq.html',
        'd:/projects/Web-Dev/chirag/contact.html',
        'd:/projects/Web-Dev/chirag/blog.html',
        'd:/projects/Web-Dev/chirag/login.html',
        'd:/projects/Web-Dev/chirag/privacy.html',
        'd:/projects/Web-Dev/chirag/terms.html',
        'd:/projects/Web-Dev/chirag/404.html'
    ]
    for p in pages:
        update_file(p)

if __name__ == '__main__':
    main()
