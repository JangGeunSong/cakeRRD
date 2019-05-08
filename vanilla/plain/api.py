from .models import article
from rest_framework import viewsets, permissions
from .serializers import articleSerializer

class articleViewSet(viewsets.ModelViewSet):
    queryset = article.objects.all()
    permissions.classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = articleSerializer

    def get_queryset(self):
        return self.request.user.article.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)