import HttpService from "./HttpService";
import config from "../config";

export default class ProjectService {
  static endorseNLPService = new HttpService(config.nlpServiceBaseUrl, 'application/json', '', '', '');
  static projectsEndpoint() { return '/generic/projects-index/project' }

  static createProject(newProject) {
    return this.endorseNLPService.post(this.projectsEndpoint(), newProject)
  }

  static getAllProjects() {
    return this.endorseNLPService.get(this.projectsEndpoint(), '')
  }
}