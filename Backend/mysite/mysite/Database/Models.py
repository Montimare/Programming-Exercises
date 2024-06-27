from django.db import models


class Event(models.Model):
    name = models.CharField(max_length=256, null=False)
    description = models.CharField(max_length=256, blank=True)
    startTime = models.DateTimeField(null=False)
    endTime = models.DateTimeField(null=False)
    list = models.ForeignKey('EventList', on_delete=models.CASCADE, related_name='event')

    def __str__(self):
        return f"<Event('{self.name}', '{self.description}', '{self.startTime}', '{self.endTime}')>"


class EventList(models.Model):
    name = models.CharField(max_length=256, unique=True, null=False)
    admin = models.ForeignKey('User', on_delete=models.CASCADE)
    groups = models.ManyToManyField('Group', through='Group_EventList')

    def __str__(self):
        return f"<EventList('{self.name}', admin_id='{self.admin.id}')>"


class Group(models.Model):
    name = models.CharField(max_length=256, unique=True, null=False)
    admin = models.ForeignKey('User', on_delete=models.CASCADE, related_name='owned_group')
    event_lists = models.ManyToManyField('EventList', through='Group_EventList')
    users = models.ManyToManyField('User', through='User_Group')

    def __str__(self):
        return f"<Group id: {self.id}, name: {self.name}>"


class Group_EventList(models.Model):
    group = models.ForeignKey('Group', on_delete=models.CASCADE)
    event_list = models.ForeignKey('EventList', on_delete=models.CASCADE)

    def __str__(self):
        return f"<Group_EventList group_id: {self.group.id}, event_list_id: {self.event_list.id}>"


class Notification(models.Model):
    event = models.ForeignKey('Event', on_delete=models.CASCADE, related_name='notifications')
    time = models.DateTimeField(null=False)

    def __str__(self):
        return f"<Notification event_id: {self.event.id}, time: {self.time}>"


class User(models.Model):
    name = models.CharField(max_length=256)
    email = models.EmailField(unique=True)
    groups = models.ManyToManyField('Group', through='User_Group')


    def __str__(self):
        return f"<User id: {self.id}, name: {self.name}>"

class User_Group(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    group = models.ForeignKey('Group', on_delete=models.CASCADE)

    def __str__(self):
        return f"<User_Group user_id: {self.user.id}, group_id: {self.group.id}>"