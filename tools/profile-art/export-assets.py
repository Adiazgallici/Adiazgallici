"""Copy the rendered profile images into the repo's assets/ folder, the paths README.md uses.

Run after `npm run profile:banner` and `npm run profile:cards`.
"""
import pathlib
import shutil
import sys

from PIL import Image

here = pathlib.Path(__file__).resolve().parent
out = here / "out"
assets = here.parent.parent / "assets"

if not out.exists():
    sys.exit("No out/ folder yet. Render the banner and capture the cards first.")

if (out / "cyber-banner.gif").exists():
    shutil.copyfile(out / "cyber-banner.gif", assets / "banner.gif")
    print("assets/banner.gif")

for png in sorted(out.glob("cyber-*.png")):
    name = png.stem.removeprefix("cyber-")
    if name.startswith("banner"):
        continue  # banner-final / banner-mid are previews of the GIF, not README assets
    target = assets / f"{name}.jpg"
    Image.open(png).convert("RGB").save(target, "JPEG", quality=86, optimize=True)
    print(f"assets/{target.name}")
