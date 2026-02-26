"""
Schrute Farms - Beet Farm Simulator
"Bears. Beets. Battlestar Galactica." - Jim Halpert (as Dwight Schrute)

A beet farm management system in the spirit of Dwight K. Schrute,
complete with bear threat assessment, Battlestar Galactica protocols,
and anti-Jim countermeasures.
"""

import random
from dataclasses import dataclass, field
from typing import ClassVar, List, Optional


# ---------------------------------------------------------------------------
# Battlestar Galactica Protocols
# ---------------------------------------------------------------------------

BSG_ALERTS = [
    "CONDITION ONE. All hands man your battle stations.",
    "So say we all.",
    "Frak! Bears detected on DRADIS.",
    "The farm is not safe. Execute Battlestar protocol.",
    "This has happened before and it will happen again.",
]

BEAR_FACTS = [
    "Bears can run up to 35 mph. Dwight can run 36 mph.",
    "A bear's sense of smell is 7 times better than a dog's. Irrelevant to beet farming.",
    "Bears eat beets. This is unacceptable.",
    "There are basically two schools of thought on bears...",
    "Identity theft is not a joke, Jim! Millions of bears are affected every year.",
]


def bear_threat_level(bear_count: int) -> str:
    """Assess bear threat level using Battlestar Galactica condition system."""
    if bear_count == 0:
        return "CONDITION FOUR - No bears detected. Farm is secure."
    if bear_count <= 2:
        return "CONDITION THREE - Bear presence noted. Remain vigilant."
    if bear_count <= 5:
        return "CONDITION TWO - Multiple bears! Arm the volunteers."
    return "CONDITION ONE - FRAK! BEAR SWARM. Execute evacuation protocol. SO SAY WE ALL."


def battlestar_quote() -> str:
    """Return a random Battlestar Galactica farm alert."""
    return random.choice(BSG_ALERTS)


def bear_fact() -> str:
    """Return a random bear fact curated by Dwight K. Schrute."""
    return random.choice(BEAR_FACTS)


# ---------------------------------------------------------------------------
# Anti-Jim Defenses
# ---------------------------------------------------------------------------

KNOWN_JIM_PRANKS = [
    "stapler_in_jello",
    "desk_on_roof",
    "nickels_in_phone_handset",
    "identity_theft",
    "asian_jim",
    "desk_moved_to_bathroom",
    "belongings_in_vending_machine",
    "office_olympics",
]

JIM_COUNTERMEASURES = {
    "stapler_in_jello": "Fingerprint scanner installed on stapler. Intruder alert activated.",
    "desk_on_roof": "Desk anchored to floor with industrial bolts. Try harder, Halpert.",
    "nickels_in_phone_handset": "Phone disassembled and reassembled daily. Nice try.",
    "identity_theft": "Identity protected by a 27-character password. Bears beats Jim.",
    "asian_jim": "Facial recognition software deployed. Impersonation: DENIED.",
    "desk_moved_to_bathroom": "Desk equipped with GPS tracker. Location: confirmed.",
    "belongings_in_vending_machine": "All belongings catalogued with RFID chips.",
    "office_olympics": "Olympics declared illegal on Schrute Farms property.",
}


class AntiJimSystem:
    """
    Advanced surveillance and countermeasure system against Jim Halpert's pranks.
    Designed and maintained by Assistant Regional Manager Dwight K. Schrute.
    """

    def __init__(self) -> None:
        self.detected_pranks: List[str] = []
        self.alert_log: List[str] = []
        self.surveillance_active: bool = True

    def detect_prank(self, prank: str) -> str:
        """Detect a Jim prank and return the appropriate countermeasure."""
        if not self.surveillance_active:
            return "WARNING: Surveillance offline. Jim may be operating unchecked."
        prank_key = prank.lower().replace(" ", "_")
        if prank_key in KNOWN_JIM_PRANKS:
            self.detected_pranks.append(prank_key)
            countermeasure = JIM_COUNTERMEASURES[prank_key]
            alert = f"PRANK DETECTED: '{prank}'. COUNTERMEASURE: {countermeasure}"
            self.alert_log.append(alert)
            return alert
        alert = f"Unknown Jim activity detected: '{prank}'. Initiating Protocol 7."
        self.alert_log.append(alert)
        return alert

    def prank_report(self) -> str:
        """Generate a full surveillance report."""
        if not self.detected_pranks:
            return "Surveillance report: No pranks detected. The farm is SECURE."
        lines = ["=== ANTI-JIM SURVEILLANCE REPORT ==="]
        for i, prank in enumerate(self.detected_pranks, 1):
            lines.append(f"  Incident {i}: {prank}")
        lines.append(f"Total incidents: {len(self.detected_pranks)}")
        lines.append("Recommendation: Consider relocating Jim to Stamford.")
        return "\n".join(lines)

    def activate_surveillance(self) -> str:
        self.surveillance_active = True
        return "Surveillance ACTIVATED. Jim Halpert is being monitored."

    def deactivate_surveillance(self) -> str:
        self.surveillance_active = False
        return "WARNING: Surveillance DEACTIVATED. This is a mistake."


# ---------------------------------------------------------------------------
# Beet Farm
# ---------------------------------------------------------------------------

@dataclass
class BeetPlot:
    """A single plot of beet cultivation."""
    plot_id: int
    planted: bool = False
    ready_to_harvest: bool = False
    beet_yield: int = 0


@dataclass
class BeetFarm:
    """
    Schrute Farms - The premier beet farm in Lackawanna County.
    Managed by Dwight K. Schrute, Assistant (to the) Regional Manager.
    """

    name: str = "Schrute Farms"
    owner: str = "Dwight K. Schrute"
    acres: float = 60.0
    plots: List[BeetPlot] = field(default_factory=list)
    harvested_beets: int = 0
    sold_beets: int = 0
    revenue: float = 0.0

    # Bear and Jim management
    bear_count: int = 0
    anti_jim: AntiJimSystem = field(default_factory=AntiJimSystem)

    BEET_PRICE_PER_UNIT: ClassVar[float] = 1.50  # dollars per beet
    MAX_YIELD_PER_PLOT: ClassVar[int] = 50

    def __post_init__(self) -> None:
        if not self.plots:
            num_plots = max(1, int(self.acres // 5))
            self.plots = [BeetPlot(plot_id=i) for i in range(1, num_plots + 1)]

    # --- Farming operations ---

    def plant_beets(self, plot_id: Optional[int] = None) -> str:
        """Plant beets in a specific plot or all unplanted plots."""
        targets = (
            [p for p in self.plots if p.plot_id == plot_id]
            if plot_id is not None
            else [p for p in self.plots if not p.planted]
        )
        if not targets:
            return "No available plots to plant. Consider expanding the farm."
        for plot in targets:
            plot.planted = True
            plot.ready_to_harvest = False
            plot.beet_yield = 0
        return f"Beets planted in {len(targets)} plot(s). Excellent. The farm grows stronger."

    def grow_season(self) -> str:
        """Simulate a growing season; planted beets become ready to harvest."""
        ready = 0
        for plot in self.plots:
            if plot.planted and not plot.ready_to_harvest:
                plot.beet_yield = random.randint(20, self.MAX_YIELD_PER_PLOT)
                plot.ready_to_harvest = True
                ready += 1
        if ready == 0:
            return "No beets are currently growing. Plant first."
        return (
            f"Growing season complete. {ready} plot(s) are ready for harvest. "
            "Schrute Farms delivers again."
        )

    def harvest_beets(self, plot_id: Optional[int] = None) -> str:
        """Harvest beets from a specific plot or all ready plots."""
        targets = (
            [p for p in self.plots if p.plot_id == plot_id and p.ready_to_harvest]
            if plot_id is not None
            else [p for p in self.plots if p.ready_to_harvest]
        )
        if not targets:
            return "Nothing to harvest. Patience. Or plant faster."
        total = sum(p.beet_yield for p in targets)
        for plot in targets:
            self.harvested_beets += plot.beet_yield
            plot.planted = False
            plot.ready_to_harvest = False
            plot.beet_yield = 0
        return (
            f"Harvested {total} beets from {len(targets)} plot(s). "
            f"Total in barn: {self.harvested_beets}."
        )

    def sell_beets(self, quantity: Optional[int] = None) -> str:
        """Sell beets. Default: sell all harvested beets."""
        qty = quantity if quantity is not None else self.harvested_beets
        if qty <= 0:
            return "No beets to sell. Harvest first, then profit."
        if qty > self.harvested_beets:
            return (
                f"Cannot sell {qty} beets. Only {self.harvested_beets} in stock. "
                "Do not over-promise."
            )
        earnings = qty * self.BEET_PRICE_PER_UNIT
        self.harvested_beets -= qty
        self.sold_beets += qty
        self.revenue += earnings
        return (
            f"Sold {qty} beets for ${earnings:.2f}. "
            f"Total revenue: ${self.revenue:.2f}. "
            "Schrute Farms is profitable."
        )

    def farm_status(self) -> str:
        """Return a full status report of the farm."""
        planted = sum(1 for p in self.plots if p.planted and not p.ready_to_harvest)
        ready = sum(1 for p in self.plots if p.ready_to_harvest)
        empty = sum(1 for p in self.plots if not p.planted)
        lines = [
            f"=== {self.name} Status Report ===",
            f"Owner        : {self.owner}",
            f"Acres        : {self.acres}",
            f"Total plots  : {len(self.plots)}",
            f"  Growing    : {planted}",
            f"  Ready      : {ready}",
            f"  Empty      : {empty}",
            f"In barn      : {self.harvested_beets} beets",
            f"Total sold   : {self.sold_beets} beets",
            f"Revenue      : ${self.revenue:.2f}",
            f"Bear threat  : {bear_threat_level(self.bear_count)}",
            f"Anti-Jim     : {'ACTIVE' if self.anti_jim.surveillance_active else 'OFFLINE'}",
        ]
        return "\n".join(lines)

    # --- Bear management ---

    def report_bear(self) -> str:
        """Report a bear sighting on the farm."""
        self.bear_count += 1
        threat = bear_threat_level(self.bear_count)
        fact = bear_fact()
        return f"Bear sighting #{self.bear_count} reported! {threat}\nFact: {fact}"

    def clear_bears(self) -> str:
        """Bears have been repelled. Reset bear count."""
        previous = self.bear_count
        self.bear_count = 0
        return (
            f"All {previous} bear(s) repelled. The farm is secure. "
            "Dwight has once again proven superior to nature."
        )

    # --- Anti-Jim operations ---

    def detect_jim_prank(self, prank: str) -> str:
        """Delegate to the Anti-Jim System."""
        return self.anti_jim.detect_prank(prank)

    def jim_report(self) -> str:
        """Return the Anti-Jim surveillance report."""
        return self.anti_jim.prank_report()


# ---------------------------------------------------------------------------
# CLI demo
# ---------------------------------------------------------------------------

def main() -> None:
    print("=== SCHRUTE FARMS ===")
    print("Bears. Beets. Battlestar Galactica.\n")

    farm = BeetFarm()
    print(farm.farm_status())
    print()

    print(farm.plant_beets())
    print(farm.grow_season())
    print(farm.harvest_beets())
    print(farm.sell_beets())
    print()

    print(farm.report_bear())
    print(battlestar_quote())
    print()

    print(farm.detect_jim_prank("stapler_in_jello"))
    print(farm.detect_jim_prank("identity_theft"))
    print(farm.jim_report())
    print()

    print(farm.farm_status())


if __name__ == "__main__":
    main()
