import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://localhost:8030/api/user_account";


class UserAccountService {
    registerFor(id) {
        return axios.post(API_URL, {
            "accountID": id
        }, {
            headers: authHeader()
        })
    }
}

export default new UserAccountService();