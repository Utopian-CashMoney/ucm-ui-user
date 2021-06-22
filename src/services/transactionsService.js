import axios, {AxiosResponse} from "axios";
import authHeader from "./authHeader";
import Page from "../dto/page";

const API_URL = "http://localhost:8030/api/transaction";


class TransactionService {
    /**
     * Returns a promise to get Transactions for the logged in user.
     * @author Joshua Podhola
     * @param {int} [page=1] Page
     * @param {int} [pageSize=50] Page size
     * @returns {Promise<AxiosResponse<any>>}
     */
    get(page, pageSize) {
        if(!pageSize) {
            if(!page) {
                page = 1;
            }
            pageSize = 50;
        }
        return axios.get(API_URL, {
            headers: authHeader(),
            params: {
                "page": page,
                "pageSize": pageSize
            }
        });
    }

    /**
     *
     * @param {AxiosResponse<any>} response
     */
    parse(response) {
        let data = response.data;
        return new Page(
            data.content,
            data.pageable,
            data.last,
            data.totalPages,
            data.totalElements,
            data.size,
            data.number,
            data.sort,
            data.numberOfElements,
            data.first,
            data.empty
        )
    }
}

export default new TransactionService();