from rest_framework import viewsets

from funds_service.models import Fund
from funds_service.serializers import FundSerializer


class FundViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Retrieval API operations for Funds.
    """

    queryset = Fund.objects.all()
    serializer_class = FundSerializer
