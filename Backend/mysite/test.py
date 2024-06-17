from Database import init_db
from Database.Models.User_DAO import save_user, get_user_by_id, get_user_list, modify_user, delete_user_by_id
from Database.Models.Event_DAO import save_event, get_event_by_id, get_events_by_user_id, get_event_list, delete_event_by_id
from Database.Models.Group_DAO import save_group, get_group_by_id, get_group_list, add_user_to_group, modify_group, delete_group_by_id
from Database.Models.Event_List_DAO import save_event_list, get_event_list_by_id, get_event_list_list, delete_event_list_by_id, modify_event_list
from Database.Models.Notification_DAO import save_notification, get_notification_by_id, get_notifications_by_user_id, get_notification_list, get_notifications_by_event_id, delete_notification_by_id, modify_notification

def fill_db():
    felix = save_user('Felix', 'felix@felix.felix')
    klejdi = save_user('Klejdi', 'klejdi@klejdi.klejdi')
    timmy = save_user('Little Timmy', 'timmy@little.timmy')
    g1 = save_group('Group 1', felix.id)
    add_user_to_group(klejdi.id, g1.id)
    el1 = save_event_list('Event List 1', felix.id, [g1.id])
    e1 = save_event('Event 1', 'Event 1 Description', '2020-01-01 00:00:00', '2020-01-01 01:00:00', el1.id)
    n1 = save_notification(e1.id, '2020-01-01 00:00:00')

if __name__ == '__main__':
    init_db()

    print(modify_user(2, 'Felix', 'felix.felix@felix'))

    print(get_event_list_list())
    print(get_group_list())
    print(get_user_list())
    print(get_events_by_user_id(1))
    print(get_notifications_by_user_id(1))
