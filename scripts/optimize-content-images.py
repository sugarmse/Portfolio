"""Generate responsive copies; keep the full-size photographs for the viewer.

Run from the repository root with Python and Pillow installed.
"""
from pathlib import Path
from PIL import Image, ImageOps

PUBLIC = Path(__file__).resolve().parents[1] / 'public'
PHOTO_IDS = ['dsc02408', 'dsc02427', 'dsc02420', 'dsc02391', 'dsc02417',
             'dsc02440', 'dsc02474', 'dsc02480', 'dsc02485', 'dsc02522']

def variants(source, widths, directory):
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
        directory.mkdir(parents=True, exist_ok=True)
        for width in widths:
            if width > image.width:
                continue
            height = round(image.height * width / image.width)
            output = directory / f'{source.stem}-{width}.webp'
            image.resize((width, height), Image.Resampling.LANCZOS).save(
                output, 'WEBP', quality=84, method=6)
            print(f'{output.relative_to(PUBLIC)}: {output.stat().st_size:,} bytes')

for photo_id in PHOTO_IDS:
    source = PUBLIC / 'content/photos' / f'{photo_id}.webp'
    widths = [640, 1200, 1600] if photo_id == 'dsc02408' else [640, 1200]
    variants(source, widths, source.parent / 'responsive')
variants(PUBLIC / 'pfp.jpeg', [640, 1000], PUBLIC / 'content/portrait')
