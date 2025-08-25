// src/constants/owner.constants.ts

export const GYMS = [
    {
      _id: "gym1",
      name: "FitZone Downtown",
      status: "active",
      address: {
        line1: "123 Main St",
        city: "Mumbai",
        state: "Maharashtra",
        zipcode: "400001",
        country: "India"
      },
      phone: "+91 98765 43210",
      email: "contact@fitzone.com",
      staffCount: 5,
      coOwners: ["owner2"]
    },
    {
      _id: "gym2",
      name: "PowerHouse Gym",
      status: "inactive",
      address: {
        line1: "456 Central Ave",
        city: "Pune",
        state: "Maharashtra",
        zipcode: "411001",
        country: "India"
      },
      phone: "+91 87654 32109",
      email: "info@powerhouse.com",
      staffCount: 3,
      coOwners: []
    }
  ];
  
  export const MEMBERSHIPS = [
    {
      _id: "plan1",
      name: "Basic Plan",
      description: "Access to gym equipment and locker",
      durationInMonths: "1 Month",
      price: 1000,
      benefits: ["Gym Access", "Locker"]
    },
    {
      _id: "plan2",
      name: "Premium Plan",
      description: "Includes group classes and personal training",
      durationInMonths: "3 Months",
      price: 2500,
      benefits: ["Gym Access", "Locker", "Group Classes", "Personal Training"]
    }
  ];
  
  export const MEMBERS = [
    {
      _id: "member1",
      fullName: "Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      phone: "+91 99900 12345",
      status: "active",
      gymId: "gym1"
    },
    {
      _id: "member2",
      fullName: "Sunita Sharma",
      email: "sunita.sharma@example.com",
      phone: "+91 99888 54321",
      status: "inactive",
      gymId: "gym2"
    }
  ];
  
  export const PAYMENT_TRACKING = [
    {
      subscriptionId: "sub1",
      memberName: "Rajesh Kumar",
      planName: "Premium Plan",
      paymentStatus: "paid",
      startDate: "2025-07-01",
      endDate: "2025-10-01"
    },
    {
      subscriptionId: "sub2",
      memberName: "Sunita Sharma",
      planName: "Basic Plan",
      paymentStatus: "pending",
      startDate: "2025-08-01",
      endDate: "2025-09-01"
    }
  ];
  
  export const REPORTS = {
    monthlyRevenue: 55000,
    pendingPayments: 2000,
    advancePayments: 5000,
    paymentCount: 30
  };
  