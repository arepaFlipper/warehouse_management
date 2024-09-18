import requests

# Define the URL
url = "http://localhost:3002/users"

# Send the GET request
response = requests.get(url)

# Print the response status code and content
print(f"Status Code: {response.status_code}")
print(f"Response Content: {response.text}")

