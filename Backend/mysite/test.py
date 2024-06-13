from Database import init_db
from Database.Models.User_DAO import save_user, get_user_by_id, get_user_list
from Database.Models.Event_DAO import save_event, get_event_by_id, get_events_by_user_id
from Database.Models.Group_DAO import save_group, get_group_by_id, get_group_list, add_user_to_group
from Database.Models.Event_List_DAO import save_event_list, get_event_list_by_id, get_event_list_list

if __name__ == '__main__':
    init_db()

    print(get_event_list_list())
    print(get_group_list())
    print(get_user_list())
    print(get_events_by_user_id(1))
