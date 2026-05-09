import re
import json
import os

# Updated paths for professional structure
data_js_path = os.path.join("web", "assets", "js", "data.js")
output_json_path = os.path.join("server", "products.json")

if not os.path.exists(data_js_path):
    print(f"Error: Could not find {data_js_path}")
    exit(1)

with open(data_js_path, "r", encoding="utf-8") as f:
    content = f.read()

# Regex to match make('id', 'name', 'cat', 'sub', price, oldPrice, imgIdx)
pattern = r"make\('([^']*)', '([^']*)', '([^']*)', '([^']*)', (\d+), (null|\d+), \d+\)"
matches = re.findall(pattern, content)

products = []
for m in matches:
    products.append({
        "id": m[0],
        "name": m[1],
        "category": m[2],
        "subcategory": m[3],
        "price": int(m[4])
    })

with open(output_json_path, "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2)

print(f"Successfully extracted {len(products)} products to {output_json_path}.")
