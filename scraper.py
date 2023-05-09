import base64
import json
import re

import requests
from bs4 import BeautifulSoup

index = 1  # Initialize the index of the restaurant
restaurants = []  # Initialize the list of restaurant dictionaries
restaurant_images = []  # Initialize the list of restaurant images dictionaries
addresses = []  # Initialize the list of addresses dictionaries

def get_page_restaurants(url):
    global index

    user_agent = ({'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'})

    def get_page_contents(url):
        page = requests.get(url, headers=user_agent)
        return BeautifulSoup(page.content, 'html.parser')

    soup = get_page_contents(url)

    # Extract the links to each restaurant's details page
    restaurant_links = []
    for link in soup.find_all("a", {"class": "Lwqic Cj b"}):
        restaurant_links.append("https://www.tripadvisor.com" + link["href"])

    # Loop through each restaurant's details page and extract the relevant information
    for link in restaurant_links:
        bruh = False

        restaurant_response = requests.get(link, headers=user_agent)
        restaurant_soup = BeautifulSoup(restaurant_response.content, "html.parser")

        if restaurant_soup.find("h1", {"class": "HjBfq"}) is not None:
            restaurant_name = restaurant_soup.find("h1", {"class": "HjBfq"}).text
            for item in restaurants:
                if item["name"] == restaurant_name:
                    print("Restaurant already exists\n\n")
                    bruh = True
                    break
            if restaurant_name is None:
                restaurant_name = "No name available"

        if bruh:
            continue

        images = restaurant_soup.find_all('img', class_='basicImg')
        if images is not None:
            image_counter = 1
            for image in images:
                if image_counter == 6:
                    break
                restaurant_image_info = {
                    "restaurant_id": index,
                    "restaurant_name": restaurant_name,
                    "url": image['data-lazyurl'],
                }
                restaurant_images.append(restaurant_image_info)
                image_counter += 1

        rating = restaurant_soup.find("span", {"class": "ZDEqb"})
        if rating is not None:
            rating = rating.text.strip()
            restaurant_rating = float(rating)
        else:
            restaurant_rating = "No rating available"

        restaurant_address = restaurant_soup.find("span", {"class": "yEWoV"})
        if restaurant_address is not None:
            restaurant_address = restaurant_address.text
        else:
            restaurant_address = "No address available"

        restaurant_phone_element = restaurant_soup.find(
            "div", {"class": "IdiaP Me"})
        if restaurant_phone_element is not None:
            restaurant_phone = restaurant_phone_element.find(
                "span", {"class": "yEWoV"}).text.strip()
        else:
            restaurant_phone = "No phone available"

        restaurant_description_div = restaurant_soup.find(
            "div", {"class": "VOzxM"})
        if restaurant_description_div is not None:
            restaurant_description = restaurant_description_div.text
        else:
            restaurant_description = "No details available"

        time_span = restaurant_soup.find("span", {"class": "mMkhr"})
        if time_span:
            raw_opening_hours = time_span.text.replace(" Open now", '').replace(" Closed now", '').replace(" See all hours", '').replace(":&nbsp;", '')[2:]
            hours_pattern = r'\d{1,2}:\d{2}\s[AP]M'
            hours_regex = re.compile(hours_pattern)
            matches = hours_regex.findall(raw_opening_hours)
            
            if len(matches) == 2:
                restaurant_opening_hours = f"{matches[0]} - {matches[1]}"
            elif len(matches) == 4:
                restaurant_opening_hours = f"{matches[0]} - {matches[1]} and {matches[2]} - {matches[3]}"
            else:
                restaurant_opening_hours = "No opening hours available"
        else:
            restaurant_opening_hours = "No opening hours available"

        restaurant_website_divs = restaurant_soup.find_all("div", {"class": "f e"})
        restaurant_website = "No website available"
        for div in restaurant_website_divs:
            if div.find("div", {"class": "IdiaP Me sNsFa"}) is not None:
                website_as = restaurant_soup.find_all("a", {"class": "YnKZo"})
                for website_a in website_as:
                    if "data-encoded-url" in website_a.attrs:
                        url = base64.urlsafe_b64decode(
                            website_a["data-encoded-url"]).decode()
                        restaurant_website = url[4:-4]
                    break

        restaurant_location_divs = restaurant_soup.find_all(
            "div", {"class": "f e"})
        restaurant_location = "No location data available"
        for div in restaurant_location_divs:
            if div.find("div", {"class": "kDZhm IdiaP Me"}) is not None:
                location_as = restaurant_soup.find_all(
                    "a", {"class": "YnKZo Ci Wc _S C FPPgD"})
                for location_a in location_as:
                    if "data-encoded-url" in location_a.attrs:
                        url = base64.urlsafe_b64decode(
                            location_a["data-encoded-url"]).decode()
                        restaurant_location = url[4:-4]
                        start_index = restaurant_location.find("@") + 1
                        coordinates_str = restaurant_location[start_index:]
                        lat, lon = coordinates_str.split(",")
                        restaurant_lat = float(lat)
                        restaurant_lon = float(lon)
                    break

        cuisine_span = restaurant_soup.find("span", {"class": "DsyBj DxyfE"})
        if cuisine_span:
            cuisine_list = [re.sub(r'\s*-\s*|\s+', ' ', cuisine_elem.text.replace('$', '').replace(',', '')).strip() for cuisine_elem in cuisine_span.find_all("a", {"class": "dlMOJ"}) if len(cuisine_elem.text.strip()) > 3]
            cuisine_list = list(
                filter(lambda cuisine: cuisine != '' and cuisine != '-', cuisine_list))
            restaurant_cuisine = ", ".join(cuisine_list)
        else:
            restaurant_cuisine = "No cuisine information available"

        # Print the extracted information
        print("Id:", index)
        print("Name:", restaurant_name)
        print("Cuisine:", restaurant_cuisine)
        print("Description:", restaurant_description)
        print("Opening hours:", restaurant_opening_hours)
        print("Address:", restaurant_address)
        print("Location:", restaurant_location)
        print("Latitude:", restaurant_lat)
        print("Longitude:", restaurant_lon)
        print("Telephone:", restaurant_phone)
        print("Website:", restaurant_website)
        print("Rating:", restaurant_rating)
        print("")

        restaurant_info = {
            "name": restaurant_name,
            "cuisine": restaurant_cuisine,
            "description": restaurant_description,
            "opening_hours": restaurant_opening_hours,
            "telephone": restaurant_phone,
            "website": restaurant_website,
            "average_rating": restaurant_rating,
            "address_id": index
        }

        restaurants.append(restaurant_info)

        address_info = {
            "address_string": restaurant_address,
            "location": restaurant_location,
            "latitude": restaurant_lat,
            "longitude": restaurant_lon,
        }

        addresses.append(address_info)

        # Increment the index
        index += 1

page1_url = ('https://www.tripadvisor.com/Restaurants-g293734-oa0-Marrakech_Marrakech_Safi.html')
page2_url = ('https://www.tripadvisor.com/Restaurants-g293734-oa30-Marrakech_Marrakech_Safi.html')
page3_url = ('https://www.tripadvisor.com/Restaurants-g293734-oa60-Marrakech_Marrakech_Safi.html')
page4_url = ('https://www.tripadvisor.com/Restaurants-g293734-oa90-Marrakech_Marrakech_Safi.html')

get_page_restaurants(page1_url)
get_page_restaurants(page2_url)
get_page_restaurants(page3_url)
get_page_restaurants(page4_url)

# Save the list of restaurant dictionaries to a JSON file
with open('restaurants.json', 'w', encoding='utf-8') as f:
    json.dump(restaurants, f, ensure_ascii=False, indent=4)

with open('restaurant_images.json', 'w', encoding='utf-8') as f:
    json.dump(restaurant_images, f, ensure_ascii=False, indent=4)

with open('addresses.json', 'w', encoding='utf-8') as f:
    json.dump(addresses, f, ensure_ascii=False, indent=4)
