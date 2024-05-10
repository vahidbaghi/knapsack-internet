import os
import re
import json
import random
import time
import requests
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright

URLS = {
    'mci': 'https://mci.ir/internet-plans',
    'irancell': 'https://irancell.ir/e/products/5e16bf95d11fd7209ba56b20',
    'rightel': 'https://package.rightel.ir/ExtraPackageSales/ProductListToSales/ShowProduct',
    'shatelmobile': 'https://shatelmobile.ir/plans-tariffs/internet-packages/'
}

# Function to get random user agent
def get_random_user_agent():
    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 OPR/45.0.2552.898',
    ]
    return random.choice(user_agents)

# Function to get duration enum
def get_duration_enum(duration):
    durations = {
        "180days": 180, "six-months": 180, "۶ماهه": 180, "۶ ماهه": 180, "6month":180,
        "120days": 120, "four-months": 120,
        "90days": 90, "three-months": 90, "۳ماهه": 90, "۳ ماهه": 90, "3month":90,
        "3days": 3, "۳روزه": 3, "۳ روزه": 3, "3day":3,
        "30days": 30, "thirty-days": 30, "۱ماهه": 30, "۱ ماهه": 30, "monthly":30,
        "daily": 1, "one-day": 1, "۱روزه": 1, "۱ روزه": 1, "hourly":1,
        "7days": 7, "seven-days": 7, "۷روزه": 7, "۷ روزه": 7, "weekly": 7,
        "60days": 60, "two-months": 60, "۲ماهه": 60, "۲ ماهه": 60, "2month":60,
        "15days": 15, "۱۵روزه": 15, "۱۵ روزه": 15, "15day":15,
        "۱ساله": 365, "۱ ساله": 365
    }
    return durations.get(duration, 0)

# Function to get timeframe
def get_timeframe(description):
    timeframes = {
        "6 صبح تا 12 ظهر": "6AM-12PM",
        "sobhanet": "6AM-12PM",
        "2 تا 7 صبح": "2AM-7AM",
        "unlimited-mci": "1AM-11AM"
    }
    return timeframes.get(description, "24H")

# Function to scrape MCI plans
def get_mci_plans():
    mci_plans = []
    try:
        response = requests.get(URLS['mci'], headers={'User-Agent': get_random_user_agent()}, verify=False)
        response.raise_for_status()  # Raise an exception if the request was unsuccessful
        soup = BeautifulSoup(response.content, 'html.parser')
        rows = soup.find("ul", {"id": "alphaPlusPackageList"}).find_all("li", {"class": "package-list-item"})
        for plan in rows:
            # If the internet package is for new subscribers, it will be skipped
            if "new-sub" in plan.attrs["class"]:
                continue
            package_type = plan["data-package-type"]
            if package_type == "sobhanet":
                description = get_timeframe("sobhanet")
                mci_plans.append({
                    "operator": "mci",
                    "volume": int(plan["data-volume"]),
                    "price": int(plan["data-price"]),
                    "duration": 30,
                    "timeframe": description
                })
            elif package_type == "unlimited":
                description = get_timeframe("unlimited-mci")
                mci_plans.append({
                    "operator": "mci",
                    "volume": int(plan["data-fair-volume"]),
                    "price": int(plan["data-price"]),
                    "duration": 30,
                    "timeframe": description
                })
            else:
                volume = int(plan["data-volume"])
                price = int(plan["data-price"])
                duration = get_duration_enum(plan["data-duration"].replace("unsorted-", ""))
                mci_plans.append({
                    "operator": "mci",
                    "volume": volume,
                    "price": price,
                    "duration": duration,
                    "timeframe": "24H"
                })
    except requests.exceptions.RequestException as e:
        print(f"Error scraping MCI plans: {e}")
    return mci_plans

# Function to scrape IranCell plans
def get_irancell_plans():
    irancell_plans = []
    try:
        response = requests.get(URLS['irancell'], headers={'User-Agent': get_random_user_agent()})
        response.raise_for_status()
        packages = response.json()
        for package in packages:
            volume = int(package["specification_contents"][2]["desc"].get("fa", 0.0) or package["specification_contents"][2]["desc"].get("en", 0.0))
            price = int(package["price"])
            duration = get_duration_enum(package["specification_contents"][1]["value"])
            timeframe = get_timeframe(package["sub_title"]["fa"])
            irancell_plans.append({
                "operator": "irancell",
                "volume": volume,
                "price": price,
                "duration": duration,
                "timeframe": timeframe
            })
    except requests.exceptions.RequestException as e:
        print(f"Error scraping IranCell plans: {e}")
    return irancell_plans

# Function to scrape RighTel plans
def get_rightel_plans():
    def get_volume_value(volume_str):
        if 'گیگابایت' in volume_str:
            volume = int(volume_str.replace('گیگابایت', "").strip())
            volume *= 1024
        elif 'مگابایت' in volume_str:
            volume = int(volume_str.replace('مگابایت', "").strip())
        else:
            volume = 0
        return volume

    rightel_plans = []
    try:
        with sync_playwright() as p:
            browser = p.firefox.launch(headless=True)
            page = browser.new_page()
            page.goto(URLS['rightel'])
            page.wait_for_load_state()
            page.evaluate('''() => {document.querySelectorAll('[style*="display: none;"]').forEach(element => {element.remove();});}''')

            prices = re.findall(r'data-price="(\d+)"', page.content())[::2]
            volumes = re.findall(r'<h2>.*?(\d+ (?:گیگابایت|مگابایت))(?: \+ (\d+ گیگابایت) هدیه شبانه)?', page.content())[::2]
            durations = re.findall(r'<h2>.*?(\d+ ?(?:روزه|ماهه|ساله))', page.content())[::2]

            for price, volume, duration in zip(prices, volumes, durations):
                if volume[1]:
                    final_volume = "{},{}".format(get_volume_value(volume[0]), get_volume_value(volume[1]))
                else:
                    final_volume = get_volume_value(volume[0])

                timeframe = "24H,2AM-7AM" if volume[1] else "24H"
                rightel_plans.append({
                    "operator": "rightel",
                    "volume": final_volume,
                    "price": int(int(price) / 10),
                    "duration": get_duration_enum(duration),
                    "timeframe": timeframe
                })

        # Add a special RighTel plan
        rightel_plans.append({
            "operator": "rightel",
            "volume": 70000,
            "price": 50000,
            "duration": 7,
            "timeframe": "24H"
        })
    except Exception as e:
        print(f"Error scraping RighTel plans: {e}")
    return rightel_plans


def get_shatelmobile_plans():
    shatelmobile_plans = []
    try:
        response = requests.get(URLS['shatelmobile'], headers={'User-Agent': get_random_user_agent()})
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        packages = soup.find_all("div", {"class":"col-md-4 col-xs-12 lte-pack-new pack lte-packages list-item box"})
        for package in packages:
             # Try to find the price in the "filter-range-info" div
            price_element = package.find("div", {"class": "filter-range-info hidden"}).find("span", {"class": "price"})
            price = price_element.text if price_element else None

            # If the price is not found, look for it in the "lte2-price" div
            if not price:
                price_text = package.find("div", {"class": "lte2-price"}).text
                price = price_text.replace("تومان", "").replace("،", "").strip()

            # Extract the package size
            package_size_element = package.find('span', class_='package_size')
            package_size = int(package_size_element.text) if package_size_element else None

            # Check if the package is a combo package
            combo_package = package.find("span", {"class": "combo-two"})
            if combo_package:
                adsl_volume_match = re.findall(r'(\d+) گیگابایت ثابت', package.text)
                if adsl_volume_match:
                    adsl_volume = int(adsl_volume_match[0])
                    package_size = f"{package_size},{adsl_volume * 1024}"

            # Extract the duration and determine the timeframe
            duration_element = package.find('span', class_=lambda value: value and ('daily' in value or 'day' in value or 'month' in value or "hourly" in value or "weekly" in value))
            duration = duration_element.text if duration_element else None
            timeframe = "2H" if duration == "hourly" else "24H"
            shatelmobile_plans.append({
                "operator": "shatelmobile",
                "volume": package_size,
                "price": int(price),
                "duration": get_duration_enum(duration),
                "timeframe": timeframe
            })
    except Exception as e:
        print(f"Error scraping shatelmobile plans: {e}")   
    return shatelmobile_plans

# Main function
def main():
    try:
        shatelmobile_plans = get_shatelmobile_plans()
        irancell_plans = get_irancell_plans()
        mci_plans = get_mci_plans()
        rightel_plans = get_rightel_plans()

        data = irancell_plans + mci_plans + rightel_plans + shatelmobile_plans

        # Save data to JSON file
        output_file = "data.json"
        with open(output_file, 'w', encoding='utf-8') as json_file:
            json.dump(data, json_file, ensure_ascii=False, indent=4)
        print(f"Data saved to {output_file}")
    except Exception as e:
        print(f"An error occurred: {e}")

# Call the main function
if __name__ == "__main__":
    main()