import json
import sys

def getLocationData():
  return json.load(open('data.json'))

def locate(state_cd, location_set):
    return [location for location in location_set if location.address.state == state_cd.upper()]

def find_price_hourly_lte(max, location_set):
    return [location for location in location_set if location.price_hourly <= max]

def find_price_hourly_gt(min, location_set):
    return [location for location in location_set if location.price_hourly > min]

def find_price_hourly_between(min, max, location_set):
    return [location for location in location_set if location.price_hourly > min & location.price_hourly < max]

def exec():
    args = sys.argv
    location_data = getLocationData()

