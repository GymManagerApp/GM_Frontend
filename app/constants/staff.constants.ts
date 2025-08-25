// src/constants/staff.constants.ts

export const STAFF_DASHBOARD = {
    assignedGyms: ["FitZone Downtown", "PowerHouse Gym"],
    totalMembers: 120,
    upcomingPayments: 15,
  };
  
  export const NOTIFICATIONS = [
    {
      _id: "notif1",
      type: "payment_reminder",
      message: "Payment due for Rajesh Kumar on 25th Aug",
      readStatus: false,
      scheduledFor: "2025-08-20T10:00:00Z"
    },
    {
      _id: "notif2",
      type: "membership_renewal",
      message: "Membership renewal reminder for Sunita Sharma",
      readStatus: true,
      scheduledFor: "2025-08-01T09:00:00Z"
    }
  ];
  