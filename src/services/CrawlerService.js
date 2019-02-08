import HttpService from "./HttpService";
import config from "../config";

//`/files/project/${this.state.projectUUID}/file`

export default class CrawlerService {
  static endorseNLPService = new HttpService(config.nlpServiceBaseUrl, 'application/json', '', '', '');
  static crawlerEndpoint(projectUUID) { return `/crawl/project/${projectUUID}/crawl` }

  static executeCrawling(newCrawlingRequest) {
    return this.endorseNLPService.get(this.crawlerEndpoint(newCrawlingRequest.projectUUID), newCrawlingRequest)
  }

  // static getAllProjects() {
  //   return this.endorseNLPService.get(this.projectsEndpoint(), '')
  // }
}