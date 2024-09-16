import requests, json

# NOTE: Define the URL
url = "http://localhost:3002/expenses"

# NOTE: Send the GET request
response = requests.get(url)

# NOTE: Print the response status code and content
print(f"Status Code: {response.status_code}")
print(f"Response Content: {json.dumps(response.json(), indent=2)}")

