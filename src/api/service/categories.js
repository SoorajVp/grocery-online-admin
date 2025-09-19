import api from "../axios";

const CategoryService = {
    // Create new category
    createCategory: async (payload) => {
        const response = await api.post("/categories", payload);
        return response.data;
    },

    // Get all categories
    getCategories: async () => {
        const response = await api.get("/categories");
        return response.data;
    },

    // Get single category by id
    getCategoryById: async (id) => {
        const response = await api.get(`/categories/${id}`);
        return response.data;
    },

    // Update category
    updateCategory: async (id, payload) => {
        const response = await api.put(`/categories/${id}`, payload);
        return response.data;
    },

    // Delete category
    deleteCategory: async (id) => {
        const response = await api.delete(`/categories/${id}`);
        return response.data;
    },

    // Activate / Deactivate category (send { active: true/false })
    setCategoryActive: async (id, active) => {
        const response = await api.patch(`/categories/${id}/active`, { active });
        return response.data;
    }
};

export default CategoryService;
