from rest_framework import routers
from.api import articleViewSet 

router = routers.DefaultRouter()
router.register('', articleViewSet, 'article')

urlpatterns = router.urls
