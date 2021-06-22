import axios, {AxiosResponse} from "axios";

const API_URL = "http://localhost:8080/api/accounts";


class CardsOnOfferService {
    all() {
        return axios.get(API_URL);
    }
}

export default new CardsOnOfferService();