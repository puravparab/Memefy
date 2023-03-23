from django.shortcuts import render
from django.conf import settings
from django.utils import timezone

from datetime import timedelta
from requests import Request, post
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

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

# Spotify API redirects to this endpoint after user logs in
@api_view(['GET'])
def callback(request, format=None):
	code = request.GET.get('code')
	error = request.GET.get('error')

	if code != None:
		# Request access tokens and refresh tokens
		response = post('https://accounts.spotify.com/api/token',
			data={
				'grant_type': 'authorization_code',
				'code': code,
				'redirect_uri': settings.SPOTIFY_REDIRECT_URI,
				'client_id': settings.SPOTIFY_CLIENT_ID,
				'client_secret': settings.SPOTIFY_CLIENT_SECRET,
			}).json()

		# Response with token data
		access_token = response.get('access_token')
		token_type = response.get('token_type')
		expires_in = str(timezone.now() + timedelta(seconds=response.get('expires_in')))
		refresh_token = response.get('refresh_token')
		return Response(response, status=status.HTTP_200_OK)

	elif error != None:
		print(error)
		return Response(error, status=status.HTTP_500_INTERNAL_SERVER_ERROR)