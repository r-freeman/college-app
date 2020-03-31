import * as types from "../mutation-types";

export default {
    namespaced: true,
    state: {
        notifications: []
    },
    getters: {
        sortedNotifications: state => {
            // sort notifications in reverse order, limited to 5 at a time
            return [...state.notifications].reverse().slice(0, 5);
        }
    },
    mutations: {
        [types.CREATE_NOTIFICATION](state, payload) {
            // add new notification (payload) to the end of notifications
            state.notifications.push(payload);
        },
        [types.DISMISS_NOTIFICATION](state, payload) {
            // set new array of notification minus the notification with given id (payload)
            state.notifications = state.notifications.filter(n => n.id !== payload)
        }
    },
    actions: {
        createNotification({commit, state, dispatch}, {status, title, message}) {
            let notification, i;

            // set index to the last notification.id + 1, or 1 if notifications is empty
            i = state.notifications.length > 0
                ? Math.max.apply(null, state.notifications.map(t => t.id)) + 1 : 1;

            // create the notification from params
            notification = {id: i, status, title, message};

            commit(types.CREATE_NOTIFICATION, notification);

            // make the notification timeout after some seconds
            setTimeout(() => {
                dispatch('dismissNotification', notification.id)
            }, 5000);
        },
        dismissNotification({commit, state}, id) {
            commit(types.DISMISS_NOTIFICATION, id)
        }
    }
}
