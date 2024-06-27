from rest_framework import serializers
from ..Models import User, Group, Event, EventList, Notification, User_Group, Group_EventList


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('__all__')


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('__all__')


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('__all__')


class EventListSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventList
        fields = ('__all__')


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ('__all__')


class User_GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Group
        fields = ('__all__')


class Group_EventListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group_EventList
        fields = ('__all__')