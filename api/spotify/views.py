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
	auth_scopes = 'user-top-read'
	url = Request('GET', 'https://accounts.spotify.com/authorize',
		params={
			'client_id': settings.SPOTIFY_CLIENT_ID,
			'response_type': 'code',
			'redirect_uri': settings.SPOTIFY_REDIRECT_URI,
			'scope': auth_scopes,
			# state
		}).prepare().url
	return Response(url, status=status.HTTP_200_OK)

# Get user's spotify profile
@api_view(['GET'])
def get_user_profile(request, format=None):
	return Response({}, status=status.HTTP_200_OK)

# Get top tracks/artists for long_term, medium_term and short_term
@api_view(['GET'])
def get_user_top_items(request, format=None):
	access_token = request.data.get('access_token')
	
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