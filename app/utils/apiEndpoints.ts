export const apiEndpoints = {
  auth: {
    registerByEmail: "/auth/register/owner/email",
    registerByPhone: "/auth/register/owner/phone",
    loginByEmail: "/auth/login/owner/email",
    loginByPhone: "/auth/login/owner/phone",
    logout: "/auth/logout",
  },
  gym: {
    addGym: "/gyms",
  },
  gymUsers: {
    list: "/gym-users",
    byId: (id: string) => `/gym-users/${id}`,
    create: "/gym-users",
    update: (id: string) => `/gym-users/${id}`,
    delete: (id: string) => `/gym-users/${id}`,
    updateStatus: "/gym-users/status",
  },
};
