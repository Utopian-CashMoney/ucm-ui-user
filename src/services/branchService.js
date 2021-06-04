import axios, {AxiosResponse} from "axios";

const API_URL = "http://localhost:8080/api/branches";


class BranchesService {
    all() {
        return axios.get(API_URL);
    }
}

export default new BranchesService();