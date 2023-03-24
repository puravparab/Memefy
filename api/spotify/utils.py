def clean_tracks_response(response):
	cleaned_response = []

	# Iterate through items in response
	for track in response["items"]:
		# Get track details
		track_json = {
			"name": track["name"],
			"id": track["id"],
			"preview_url": track["preview_url"],
			"song_url": track["external_urls"]["spotify"],
			"image": track["album"]["images"][1]["url"]
		}

		# Get album details
		track_json["album"] = {
			"name": track["album"]["name"],
			"album_url": track["album"]["external_urls"]["spotify"]
		}

		# Get artist details
		artists = []
		for artist in track["artists"]:
			artist_json = {
				"id": artist["id"],
				"name": artist["name"],
				"artist_url": artist["external_urls"]["spotify"]
			}
			artists.append(artist_json)
		track_json["artists"] = artists

		cleaned_response.append(track_json)
	return cleaned_response

def clean_artists_response(response):
	cleaned_response = []

	# Iterate through items in response
	for artist in response["items"]:
		artist_json = {
			"name": artist["name"],
			"id": artist["id"],
			"genres": artist["genres"],
			"image": artist["images"][1]["url"],
			"popularity": artist["popularity"],
			"artist_url": artist["external_urls"]["spotify"],
		}
		cleaned_response.append(artist_json)

	return cleaned_response