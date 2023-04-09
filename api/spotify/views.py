from django.shortcuts import render
from django.conf import settings
from django.utils import timezone

from datetime import timedelta
from requests import Request, get, post
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from . import utils

# Request authorization from spotify
@api_view(['GET'])
def authenticate(request, format=None):
	auth_scopes = 'user-top-read user-read-email user-read-private'
	url = Request('GET', 'https://accounts.spotify.com/authorize',
		params={
			'client_id': settings.SPOTIFY_CLIENT_ID,
			'response_type': 'code',
			'redirect_uri': settings.SPOTIFY_REDIRECT_URI,
			'scope': auth_scopes,
			# state
		}).prepare().url
	return Response(url, status=status.HTTP_200_OK)

@api_view(['POST'])
def get_tokens(request, format=None):
	code = request.data.get("code")
	error = request.data.get("error")

	if code:
		# Request access tokens and refresh tokens
		response = post('https://accounts.spotify.com/api/token',
			data={
				'grant_type': 'authorization_code',
				'code': code,
				'redirect_uri': settings.SPOTIFY_REDIRECT_URI,
				'client_id': settings.SPOTIFY_CLIENT_ID,
				'client_secret': settings.SPOTIFY_CLIENT_SECRET,
			})

		if (response.status_code == 200):
			response = response.json()
			access_token = response.get('access_token')
			# expires_in = str(timezone.now() + timedelta(seconds=response.get('expires_in')))
			expires_in = response.get('expires_in')
			refresh_token = response.get('refresh_token')
			return Response({
				'access_token': access_token,
				'refresh_token': refresh_token,
				'expires_in': expires_in
			}, status=status.HTTP_200_OK)
		else:
			return Response({'error': 'spotify token request failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
	else:
		return Response({'error': 'code invalid'}, status=status.HTTP_400_BAD_REQUEST)

# Get user's spotify profile
@api_view(['GET'])
def get_user_profile(request, access_token, format=None):
	BASE_URL = "https://api.spotify.com/v1/me"
	headers = {
		'Content-type': 'application/json',
		'Authorization': 'Bearer ' + access_token
	}
	response = get(BASE_URL, headers=headers)
	if (response.ok):
		response = response.json()
		return Response({
			'display_name': response["display_name"],
			'image': response["images"][0]["url"]
		}, status=status.HTTP_200_OK)
	else:
		return Response({'error': 'spotify user profile request', 'details': response.json()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
	return Response({}, status=status.HTTP_200_OK)

# Get top tracks/artists for long_term, medium_term and short_term
@api_view(['GET'])
def get_user_top_items(request, access_token, format=None):
	BASE_URL = "https://api.spotify.com/v1/me/top/"
	headers = {
		'Content-type': 'application/json',
		'Authorization': 'Bearer ' + access_token
	}

	chained_response = {"tracks": {}, "artists": {}}

	# GET TOP TRACKS
	# 1. short_term (1 month)
	response = {}
	response = get(BASE_URL + "tracks", headers=headers, 
		params = {
			'limit': 50,
			'offset': 0,
			'time_range': 'short_term'
		})
	if (response.ok): response = utils.clean_tracks_response(response.json())
	chained_response["tracks"]["short_term"] = response

	# 2. medium_term (6 months)
	response = {}
	response = get(BASE_URL + "tracks", headers=headers, 
		params = {
			'limit': 50,
			'offset': 0,
			'time_range': 'medium_term'
		})
	if (response.ok): response = utils.clean_tracks_response(response.json())
	chained_response["tracks"]["medium_term"] = response

	# 3. longterm (All Time)
	response = {}
	response = get(BASE_URL + "tracks", headers=headers, 
		params = {
			'limit': 50,
			'offset': 0,
			'time_range': 'long_term'
		})
	if (response.ok): response = utils.clean_tracks_response(response.json())
	chained_response["tracks"]["long_term"] = response

	# GET TOP ARTISTS
	# 1. short_term (1 month)
	response = {}
	response = get(BASE_URL + "artists", headers=headers, 
		params = {
			'limit': 50,
			'offset': 0,
			'time_range': 'short_term'
		})
	if (response.ok): response = utils.clean_artists_response(response.json())
	chained_response["artists"]["short_term"] = response

	# 2. medium_term (6 months)
	response = {}
	response = get(BASE_URL + "artists", headers=headers, 
		params = {
			'limit': 50,
			'offset': 0,
			'time_range': 'medium_term'
		})
	if (response.ok): response = utils.clean_artists_response(response.json())
	chained_response["artists"]["medium_term"] = response

	# 3. longterm (All Time)
	response = {}
	response = get(BASE_URL + "artists", headers=headers, 
		params = {
			'limit': 50,
			'offset': 0,
			'time_range': 'long_term'
		})
	if (response.ok): response = utils.clean_artists_response(response.json())
	chained_response["artists"]["long_term"] = response

	return Response(chained_response, status=status.HTTP_200_OK)