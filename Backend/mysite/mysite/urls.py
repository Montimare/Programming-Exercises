"""
URL configuration for mysite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from rest_framework import routers
from mysite.views import UserViewSet, GroupViewSet, EventViewSet, EventListViewSet, NotificationViewSet, User_GroupViewSet, Group_EventListViewSet

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'groups', GroupViewSet, basename='group')
router.register(r'events', EventViewSet, basename='event')
router.register(r'eventlists', EventListViewSet, basename='eventlist')
router.register(r'notifications', NotificationViewSet, basename='notification')
router.register(r'user_groups', User_GroupViewSet, basename='user_group')
router.register(r'group_eventlists', Group_EventListViewSet, basename='group_eventlist')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include(
        'rest_framework.urls',
        namespace='rest_framework'
        )),
]
