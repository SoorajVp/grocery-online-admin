import api from "../axios";

const AdminService = {
    // ✅ Create new admin
    createAdmin: async (payload) => {
        const response = await api.post("/register", payload);
        return response.data;
    },

    // ✅ Get all admins
    getAdmins: async () => {
        const response = await api.get("/list");
        return response.data;
    },

    // ✅ Get single admin by id
    getAdminById: async (id) => {
        const response = await api.get(`/admins/${id}`);
        return response.data;
    },

    // ✅ Update admin
    updateAdmin: async (id, payload) => {
        const response = await api.put(`/admins/${id}`, payload);
        return response.data;
    },

    // ✅ Delete admin
    deleteAdmin: async (id) => {
        const response = await api.delete(`/admins/${id}`);
        return response.data;
    },

    // ✅ Block / Unblock admin (send { blocked: true/false })
    blockUnblockAdmin: async (id, blocked) => {
        const response = await api.put(`/admins/${id}/block`, { blocked });
        return response.data;
    },
};

export default AdminService;
