import HttpService from "./HttpService";
import config from "../config";

export default class FileService {

  constructor(file_id) {
    this._file_id = file_id
  }

  fileService = new HttpService(config.nlpServiceBaseUrl, 'application/json', '', '', '');
  filesEndpoint() { return '/generic/document-index/document/' + this._file_id }

  updateDocument(payload) {
    return this.fileService.put(this.filesEndpoint(), payload)
  }
}