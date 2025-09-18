import api from "../axios";

const AuthServce = {
    adminLogin: async (payload) => {
        // const response = await api.post("/snxview1/getcode", { code: id });
        const response = await api.post("/auth/login", payload);
        return response.data
    },

}

export default AuthServce;
