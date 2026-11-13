import os
from PIL import Image, ImageDraw
BG = (15, 118, 110)
RES = 'android/app/src/main/res'
DENS = {'mdpi': 1, 'hdpi': 1.5, 'xhdpi': 2, 'xxhdpi': 3, 'xxxhdpi': 4}

def glyph(d, cx, cy, u):
    w = (255, 255, 255, 255)
    d.polygon([(cx-18*u, cy-2*u), (cx+18*u, cy-2*u), (cx+13*u, cy+19*u), (cx-13*u, cy+19*u)], fill=w)
    d.rounded_rectangle([cx-22*u, cy-8*u, cx+22*u, cy-1*u], radius=3*u, fill=w)
    d.arc([cx-12*u, cy-27*u, cx+12*u, cy+1*u], 180, 360, fill=w, width=max(2, int(5*u)))

def make(px, kind):
    S = px * 4
    im = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    u = S / 108.0
    if kind == 'fg':
        glyph(d, S/2, S/2 + 2*u, u*1.15)
    else:
        if kind == 'round':
            d.ellipse([0, 0, S-1, S-1], fill=BG + (255,))
        else:
            d.rounded_rectangle([0, 0, S-1, S-1], radius=S*0.22, fill=BG + (255,))
        glyph(d, S/2, S/2 + 2*u, u*1.5)
    return im.resize((px, px), Image.LANCZOS)

for name, k in DENS.items():
    folder = os.path.join(RES, 'mipmap-' + name)
    os.makedirs(folder, exist_ok=True)
    make(int(48*k), 'square').save(os.path.join(folder, 'ic_launcher.png'))
    make(int(48*k), 'round').save(os.path.join(folder, 'ic_launcher_round.png'))
    make(int(108*k), 'fg').save(os.path.join(folder, 'ic_launcher_foreground.png'))

vals = os.path.join(RES, 'values')
os.makedirs(vals, exist_ok=True)
with open(os.path.join(vals, 'ic_launcher_background.xml'), 'w') as f:
    f.write('<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#0F766E</color>\n</resources>\n')
print('icons ok')
