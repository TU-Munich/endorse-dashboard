import HttpService from "./HttpService";
import config from "../config";

export default class NlpService {
  static NLPServiceAnalysis = new HttpService(config.nlpServiceBaseUrl, 'application/json', '', '', '');
  static documentEndpoint(projectUUID) { return '/analysis/project/' + projectUUID + '/ner' }

  static getDataResults(projectUUID) {
    return this.NLPServiceAnalysis.get(this.documentEndpoint(projectUUID), '');
  }
}