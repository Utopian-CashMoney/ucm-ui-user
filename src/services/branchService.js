import axios from "axios";

const API_URL = "http://localhost:8010/api/branches";


class BranchesService {
    all() {
        return axios.get(API_URL);
    }
}

export default new BranchesService();