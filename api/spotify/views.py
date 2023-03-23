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