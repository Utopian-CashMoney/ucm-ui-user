import axios, {AxiosResponse} from "axios";

const API_URL = "http://localhost:8080/api/accounts";


class AccountService {
    /**
     * Returns a promise to get all Accounts.
     * @returns {Promise<AxiosResponse<any>>}
     */
    all() {
        return axios.get(API_URL);
    }
}

export default new AccountService();