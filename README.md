# Beet-farm 🌱🐻🚀

> *"Bears. Beets. Battlestar Galactica."* — Jim Halpert (as Dwight Schrute)

A beet farm management simulator inspired by **Dwight K. Schrute** of Schrute Farms,
complete with Battlestar Galactica bear protocols and an advanced Anti-Jim defense system.

## Features

### 🌱 Beet Farm (Dwight Schrute style)
- Manage plots across 60 acres of prime Lackawanna County farmland
- `plant_beets()` — plant beets in one or all available plots
- `grow_season()` — simulate a growing season (randomised yield per plot)
- `harvest_beets()` — harvest ready plots and store beets in the barn
- `sell_beets()` — sell all (or a specific quantity of) beets at $1.50/unit
- `farm_status()` — full status report: plots, barn stock, revenue, threats

### 🐻 Bears & Battlestar Galactica
- `bear_threat_level(n)` — returns a Battlestar Galactica CONDITION level based on bear count
- `report_bear()` — report a bear sighting; raises the threat condition
- `clear_bears()` — repel all bears (Dwight always wins)
- `battlestar_quote()` — random BSG farm alert
- `bear_fact()` — random bear fact curated by Dwight K. Schrute

### 🚫 Anti-Jim Defenses
Countermeasures against all known Jim Halpert pranks:

| Prank | Countermeasure |
|---|---|
| `stapler_in_jello` | Fingerprint scanner on stapler |
| `desk_on_roof` | Desk bolted to floor |
| `nickels_in_phone_handset` | Phone disassembled daily |
| `identity_theft` | 27-character password |
| `asian_jim` | Facial recognition deployed |
| `desk_moved_to_bathroom` | GPS tracker on desk |
| `belongings_in_vending_machine` | RFID chips on all belongings |
| `office_olympics` | Olympics declared illegal on farm |

## Usage

```python
from beet_farm import BeetFarm, battlestar_quote

farm = BeetFarm()

# Run the farm
farm.plant_beets()
farm.grow_season()
farm.harvest_beets()
print(farm.sell_beets())

# Respond to bears
print(farm.report_bear())
print(battlestar_quote())

# Counter Jim
print(farm.detect_jim_prank("stapler_in_jello"))
print(farm.jim_report())

# Full status
print(farm.farm_status())
```

Or run the CLI demo:

```bash
python beet_farm.py
```

## Tests

```bash
python -m pytest tests/ -v
```

All 46 tests pass. Identity theft is not a joke, Jim.