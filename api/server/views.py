from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def getDummy(request):
	return Response('Request Success', status=status.HTTP_200_OK)