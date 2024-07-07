from django.core.management.base import BaseCommand

class Command(BaseCommand):
	help = 'Seeds the database with initial data'

	def handle(self, *args, **kwargs):
		# from django.contrib.auth.models import User
		# if not User.objects.filter(username='admin').exists():
		# 	User.objects.create_superuser('admin', 'admin@example.com', 'adminpassword')
		# 	self.stdout.write(self.style.SUCCESS('Successfully created admin user'))
		# else:
		# 	self.stdout.write(self.style.WARNING('Admin user already exists'))

		from mysite.Database.Models import User, Group, Event, EventList, Group_EventList, Notification, User_Group
		if not User.objects.filter(name='Salvatore').exists():
			# Create Users
			sabba = User.objects.create(name='Salvatore', email='sabba@sabbamail.sab', groups='1')
			self.stdout.write(self.style.SUCCESS('Successfully created user Salvatore'))
		else:
			self.stdout.write(self.style.WARNING('User Salvatore already exists'))
		# Create Groups
		# Create Events
		# Create EventLists
		# Create Group_EventLists
		# Create Notifications
		# Create User_Groups
		self.stdout.write(self.style.SUCCESS('Successfully seeded the database'))
		