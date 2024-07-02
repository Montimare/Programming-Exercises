from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.viewsets import GenericViewSet
from .Database.Models import User, Group, Event, EventList, Notification, User_Group, Group_EventList
from .Database.Serializer.serializer import UserSerializer, GroupSerializer, EventSerializer, EventListSerializer, NotificationSerializer, User_GroupSerializer, Group_EventListSerializer
from rest_framework.response import Response
from rest_framework.decorators import action


class UserViewSet(GenericViewSet, CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=True, methods=['get'])
    def events(self, request, pk=None):
        user = self.get_object()
        user_groups = User_Group.objects.filter(user=user)
        group_eventlists = Group_EventList.objects.filter(group__in=[ug.group for ug in user_groups])
        events = Event.objects.filter(list__in=[gel.event_list for gel in group_eventlists])
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def eventlists(self, request, pk=None):
        user = self.get_object()
        user_groups = User_Group.objects.filter(user=user)
        group_eventlists = Group_EventList.objects.filter(group__in=[ug.group for ug in user_groups])
        eventlists = EventList.objects.filter(id__in=[gel.event_list.id for gel in group_eventlists])
        serializer = EventListSerializer(eventlists, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def notifications(self, request, pk=None):
        user = self.get_object()
        user_groups = User_Group.objects.filter(user=user)
        group_eventlists = Group_EventList.objects.filter(group__in=[ug.group for ug in user_groups])
        events = Event.objects.filter(list__in=[gel.event_list for gel in group_eventlists])
        notifications = Notification.objects.filter(event__in=events)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)


class GroupViewSet(GenericViewSet, CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def create(self, request, *args, **kwargs):
        serializer = GroupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        group = serializer.save()

        user_group = User_Group(user=group.admin, group=group)
        user_group.save()

        return Response(serializer.data)


class EventViewSet(GenericViewSet, CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventListViewSet(GenericViewSet, CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = EventList.objects.all()
    serializer_class = EventListSerializer


class NotificationViewSet(GenericViewSet, CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class User_GroupViewSet(GenericViewSet, CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = User_Group.objects.all()
    serializer_class = User_GroupSerializer

class Group_EventListViewSet(GenericViewSet, CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = Group_EventList.objects.all()
    serializer_class = Group_EventListSerializer