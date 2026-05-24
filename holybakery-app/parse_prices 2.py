import json

lines = open('../precios.txt').read().strip().split('\n')
# Data lines start from index 1.
# Format: "No. Nombres de cuadrantes Tarifa plana local Tarifa para extranjeros"
# 1 Zona Centro Sur 150 200

prices = []
for line in lines[1:]:
    parts = line.split()
    if len(parts) >= 4:
        ext_price = int(parts[-1])
        local_price = int(parts[-2])
        name = " ".join(parts[1:-2])
        id = int(parts[0])
        prices.append({
            "id": id,
            "name": name,
            "local_price": local_price,
            "foreign_price": ext_price
        })

import os
os.makedirs('src/data', exist_ok=True)
with open('src/data/prices.json', 'w', encoding='utf-8') as f:
    json.dump(prices, f, ensure_ascii=False, indent=2)

