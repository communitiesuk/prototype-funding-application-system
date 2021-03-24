from funds_service.views import FundViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"funds", FundViewSet, basename="fund")
urlpatterns = router.urls
