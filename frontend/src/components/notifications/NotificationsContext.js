import React, { useCallback } from "react";
import uniqid from "uniqid";
import useSyncedLocalState from "./../../hooks/useSyncedLocalState";
import { getLocalstorage } from "../../util/Utils";

const NotificationsContext = React.createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useSyncedLocalState("notifications", []);
  const [unseenNotifications, setUnseenNotifications] = useSyncedLocalState(
    "Unseen-notifications",
    []
  );

  const addNotification = useCallback(
    (noti) => {
      new Promise(async (resolve, reject) => {
        try {
          // const oldUnseenNotifications = [...unseenNotifications];
          const oldUnseenNotifications = [...getLocalstorage("Unseen-notifications")];
          const toAddUnseenUsernames = noti.map((stream) => {
            return stream.user_name;
          });
          const newUnseenNotifications = [...oldUnseenNotifications, ...toAddUnseenUsernames];

          // const existingNotifications = [...notifications];
          const existingNotifications = [...getLocalstorage("notifications")];
          const newNotificationsWithAddedProps = await noti.map((n) => {
            n.date = new Date();
            n.key = uniqid(n.id, new Date().getTime()) + n.status;
            return n;
          });

          const finalNotifications = [
            ...newNotificationsWithAddedProps,
            ...existingNotifications,
          ].splice(0, 100);

          resolve({ notifications: finalNotifications, newUnseenNotifications });
        } catch (e) {
          console.log("addNotification error", e);
          reject(e);
        }
      }).then((res) => {
        setTimeout(() => {
          setUnseenNotifications(res.newUnseenNotifications);
          setNotifications(res.notifications);
        }, 800);
      });
    },
    [setNotifications, setUnseenNotifications]
  );

  const clearUnseenNotifications = useCallback(() => {
    setUnseenNotifications([]);
  }, [setUnseenNotifications]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    setUnseenNotifications([]);
  }, [setNotifications, setUnseenNotifications]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications: notifications,
        addNotification: addNotification,
        clearNotifications: clearNotifications,
        unseenNotifications: unseenNotifications,
        setUnseenNotifications: setUnseenNotifications,
        clearUnseenNotifications,
      }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContext;
