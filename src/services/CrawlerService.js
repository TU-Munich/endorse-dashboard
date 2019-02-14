import HttpService from "./HttpService";
import config from "../config";

//`/files/project/${this.state.projectUUID}/file`

export default class CrawlerService {
  static endorseNLPService = new HttpService('http://35.197.219.92:3002', 'application/json', '', '', '');
  static crawlerEndpoint(projectUUID) { return `/crawl/project/${projectUUID}/crawl` }

  static executeCrawling(newCrawlingRequest) {
    return this.endorseNLPService.get(this.crawlerEndpoint(newCrawlingRequest.projectUUID), newCrawlingRequest)
  }
  static stopCrawling(projectUUID) {
    return this.endorseNLPService.post(this.crawlerEndpoint(projectUUID), '')
  }

  // static getAllProjects() {
  //   return this.endorseNLPService.get(this.projectsEndpoint(), '')
  // }
}