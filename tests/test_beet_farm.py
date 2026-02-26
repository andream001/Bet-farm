"""Tests for Schrute Farms beet farm simulator."""

import pytest
from beet_farm import (
    BeetFarm,
    BeetPlot,
    AntiJimSystem,
    bear_threat_level,
    battlestar_quote,
    bear_fact,
    BSG_ALERTS,
    BEAR_FACTS,
    KNOWN_JIM_PRANKS,
    JIM_COUNTERMEASURES,
)


# ---------------------------------------------------------------------------
# Bear / Battlestar Galactica
# ---------------------------------------------------------------------------

class TestBearThreatLevel:
    def test_no_bears(self):
        result = bear_threat_level(0)
        assert "CONDITION FOUR" in result
        assert "secure" in result.lower()

    def test_low_bear_count(self):
        result = bear_threat_level(1)
        assert "CONDITION THREE" in result

        result = bear_threat_level(2)
        assert "CONDITION THREE" in result

    def test_medium_bear_count(self):
        result = bear_threat_level(3)
        assert "CONDITION TWO" in result

        result = bear_threat_level(5)
        assert "CONDITION TWO" in result

    def test_high_bear_count(self):
        result = bear_threat_level(6)
        assert "CONDITION ONE" in result
        assert "SO SAY WE ALL" in result

    def test_extreme_bear_count(self):
        result = bear_threat_level(100)
        assert "CONDITION ONE" in result


class TestBattlestarQuote:
    def test_returns_string(self):
        quote = battlestar_quote()
        assert isinstance(quote, str)
        assert len(quote) > 0

    def test_quote_in_known_list(self):
        for _ in range(20):
            assert battlestar_quote() in BSG_ALERTS


class TestBearFact:
    def test_returns_string(self):
        fact = bear_fact()
        assert isinstance(fact, str)
        assert len(fact) > 0

    def test_fact_in_known_list(self):
        for _ in range(20):
            assert bear_fact() in BEAR_FACTS


# ---------------------------------------------------------------------------
# AntiJimSystem
# ---------------------------------------------------------------------------

class TestAntiJimSystem:
    def setup_method(self):
        self.system = AntiJimSystem()

    def test_initial_state(self):
        assert self.system.surveillance_active is True
        assert self.system.detected_pranks == []
        assert self.system.alert_log == []

    def test_detect_known_prank(self):
        result = self.system.detect_prank("stapler_in_jello")
        assert "stapler_in_jello" in result.lower() or "PRANK DETECTED" in result
        assert "stapler_in_jello" in self.system.detected_pranks

    def test_detect_all_known_pranks(self):
        for prank in KNOWN_JIM_PRANKS:
            sys = AntiJimSystem()
            result = sys.detect_prank(prank)
            assert "PRANK DETECTED" in result
            assert prank in sys.detected_pranks

    def test_detect_unknown_prank(self):
        result = self.system.detect_prank("something_weird")
        assert "Protocol 7" in result
        assert len(self.system.alert_log) == 1

    def test_prank_report_no_pranks(self):
        report = self.system.prank_report()
        assert "No pranks detected" in report
        assert "SECURE" in report

    def test_prank_report_with_pranks(self):
        self.system.detect_prank("stapler_in_jello")
        self.system.detect_prank("desk_on_roof")
        report = self.system.prank_report()
        assert "stapler_in_jello" in report
        assert "desk_on_roof" in report
        assert "Total incidents: 2" in report
        assert "Stamford" in report

    def test_deactivate_surveillance(self):
        msg = self.system.deactivate_surveillance()
        assert self.system.surveillance_active is False
        assert "DEACTIVATED" in msg

    def test_detect_prank_while_offline(self):
        self.system.deactivate_surveillance()
        result = self.system.detect_prank("stapler_in_jello")
        assert "offline" in result.lower() or "WARNING" in result

    def test_activate_surveillance(self):
        self.system.deactivate_surveillance()
        msg = self.system.activate_surveillance()
        assert self.system.surveillance_active is True
        assert "ACTIVATED" in msg


# ---------------------------------------------------------------------------
# BeetPlot
# ---------------------------------------------------------------------------

class TestBeetPlot:
    def test_default_state(self):
        plot = BeetPlot(plot_id=1)
        assert plot.plot_id == 1
        assert plot.planted is False
        assert plot.ready_to_harvest is False
        assert plot.beet_yield == 0


# ---------------------------------------------------------------------------
# BeetFarm
# ---------------------------------------------------------------------------

class TestBeetFarmInit:
    def test_default_init(self):
        farm = BeetFarm()
        assert farm.name == "Schrute Farms"
        assert farm.owner == "Dwight K. Schrute"
        assert farm.acres == 60.0
        assert len(farm.plots) == 12  # 60 // 5
        assert farm.harvested_beets == 0
        assert farm.sold_beets == 0
        assert farm.revenue == 0.0
        assert farm.bear_count == 0

    def test_custom_init(self):
        farm = BeetFarm(name="Mini Farm", acres=10.0)
        assert farm.name == "Mini Farm"
        assert len(farm.plots) == 2  # 10 // 5

    def test_plots_auto_created(self):
        farm = BeetFarm(acres=25.0)
        assert len(farm.plots) == 5


class TestBeetFarmPlanting:
    def setup_method(self):
        self.farm = BeetFarm(acres=10.0)  # 2 plots

    def test_plant_all(self):
        result = self.farm.plant_beets()
        assert "2 plot(s)" in result
        assert all(p.planted for p in self.farm.plots)

    def test_plant_specific_plot(self):
        result = self.farm.plant_beets(plot_id=1)
        assert "1 plot(s)" in result
        assert self.farm.plots[0].planted is True
        assert self.farm.plots[1].planted is False

    def test_plant_no_available(self):
        self.farm.plant_beets()
        result = self.farm.plant_beets()
        assert "No available" in result

    def test_plant_nonexistent_plot(self):
        result = self.farm.plant_beets(plot_id=999)
        assert "No available" in result


class TestBeetFarmGrowing:
    def setup_method(self):
        self.farm = BeetFarm(acres=10.0)

    def test_grow_season_after_planting(self):
        self.farm.plant_beets()
        result = self.farm.grow_season()
        assert "2 plot(s)" in result
        assert all(p.ready_to_harvest for p in self.farm.plots)
        assert all(p.beet_yield > 0 for p in self.farm.plots)

    def test_grow_season_without_planting(self):
        result = self.farm.grow_season()
        assert "No beets" in result

    def test_grow_season_yield_in_range(self):
        self.farm.plant_beets()
        self.farm.grow_season()
        for plot in self.farm.plots:
            assert 20 <= plot.beet_yield <= self.farm.MAX_YIELD_PER_PLOT


class TestBeetFarmHarvesting:
    def setup_method(self):
        self.farm = BeetFarm(acres=10.0)
        self.farm.plant_beets()
        self.farm.grow_season()

    def test_harvest_all(self):
        result = self.farm.harvest_beets()
        assert "2 plot(s)" in result
        assert self.farm.harvested_beets > 0
        assert all(not p.planted for p in self.farm.plots)
        assert all(not p.ready_to_harvest for p in self.farm.plots)

    def test_harvest_specific_plot(self):
        result = self.farm.harvest_beets(plot_id=1)
        assert "1 plot(s)" in result

    def test_harvest_nothing_ready(self):
        self.farm.harvest_beets()  # harvest everything first
        result = self.farm.harvest_beets()
        assert "Nothing to harvest" in result

    def test_harvested_beets_accumulate(self):
        self.farm.harvest_beets()
        first_batch = self.farm.harvested_beets
        self.farm.plant_beets()
        self.farm.grow_season()
        self.farm.harvest_beets()
        assert self.farm.harvested_beets > first_batch


class TestBeetFarmSelling:
    def setup_method(self):
        self.farm = BeetFarm(acres=10.0)
        self.farm.plant_beets()
        self.farm.grow_season()
        self.farm.harvest_beets()

    def test_sell_all(self):
        total = self.farm.harvested_beets
        result = self.farm.sell_beets()
        assert f"Sold {total} beets" in result
        assert self.farm.harvested_beets == 0
        assert self.farm.sold_beets == total
        assert self.farm.revenue == total * BeetFarm.BEET_PRICE_PER_UNIT

    def test_sell_partial(self):
        initial = self.farm.harvested_beets
        result = self.farm.sell_beets(1)
        assert "Sold 1 beets" in result
        assert self.farm.harvested_beets == initial - 1

    def test_sell_more_than_available(self):
        result = self.farm.sell_beets(9999)
        assert "Cannot sell" in result

    def test_sell_zero(self):
        self.farm.harvested_beets = 0
        result = self.farm.sell_beets()
        assert "No beets to sell" in result

    def test_sell_negative(self):
        result = self.farm.sell_beets(-5)
        assert "No beets" in result or "Cannot sell" in result


class TestBeetFarmBears:
    def setup_method(self):
        self.farm = BeetFarm()

    def test_report_bear_increments_count(self):
        result = self.farm.report_bear()
        assert self.farm.bear_count == 1
        assert "Bear sighting #1" in result

    def test_multiple_bear_reports(self):
        for i in range(1, 7):
            self.farm.report_bear()
        assert self.farm.bear_count == 6
        assert "CONDITION ONE" in bear_threat_level(self.farm.bear_count)

    def test_clear_bears(self):
        self.farm.report_bear()
        self.farm.report_bear()
        result = self.farm.clear_bears()
        assert self.farm.bear_count == 0
        assert "2 bear(s) repelled" in result

    def test_clear_bears_when_none(self):
        result = self.farm.clear_bears()
        assert "0 bear(s)" in result
        assert self.farm.bear_count == 0


class TestBeetFarmAntiJim:
    def setup_method(self):
        self.farm = BeetFarm()

    def test_detect_jim_prank_delegates(self):
        result = self.farm.detect_jim_prank("stapler_in_jello")
        assert "PRANK DETECTED" in result

    def test_jim_report_delegates(self):
        self.farm.detect_jim_prank("stapler_in_jello")
        report = self.farm.jim_report()
        assert "stapler_in_jello" in report


class TestBeetFarmStatus:
    def setup_method(self):
        self.farm = BeetFarm(acres=10.0)

    def test_status_contains_key_info(self):
        status = self.farm.farm_status()
        assert "Schrute Farms" in status
        assert "Dwight K. Schrute" in status
        assert "Revenue" in status
        assert "Bear threat" in status
        assert "Anti-Jim" in status

    def test_status_reflects_changes(self):
        self.farm.plant_beets()
        self.farm.grow_season()
        self.farm.harvest_beets()
        self.farm.sell_beets()
        status = self.farm.farm_status()
        assert "Revenue" in status
        assert "$" in status
