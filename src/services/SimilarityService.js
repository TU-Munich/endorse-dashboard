import HttpService from "./HttpService";
import config from "../config";

export default class SimilarityService {
    similarityService = new HttpService(config.nlpServiceBaseUrl, 'application/json', '', '', '');
    similarityEndpoint() {return '/similarity/project/student-similarity/documents?chartjs=true'}
    async getSimilarities(search_term) {
        let payload = {"sentence": search_term};
        return await this.similarityService.put(this.similarityEndpoint(), payload);
    }

}