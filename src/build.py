from pathlib import Path
import base64

root = Path(__file__).resolve().parent
template = (root / "template.html").read_text(encoding="utf-8")

parts = sorted(root.glob("app-*.js"))
js = "\n\n".join(part.read_text(encoding="utf-8") for part in parts)
template = template.replace("/*__APP__*/", js)

images = {
    "MIKA": "mika.jpg",
    "YURI": "yuri.jpg",
    "HANA": "hana.jpg",
    "REI": "rei.jpg",
    "YUKI": "yuki.jpg",
    "AYAKA": "ayaka.jpg",
}

for token, filename in images.items():
    data = base64.b64encode((root / filename).read_bytes()).decode("ascii")
    template = template.replace("{{" + token + "}}", "data:image/jpeg;base64," + data)

out = root.parent / "neon-oasis.html"
out.write_text(template, encoding="utf-8")
print(f"{out}  {out.stat().st_size} bytes  {len(parts)} js parts")
