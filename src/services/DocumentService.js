import HttpService from "./HttpService";
import config from "../config";

export default class DocumentService {

  constructor(file_id) {
    this._file_id = file_id
  }

  documentService = new HttpService(config.nlpServiceBaseUrl, 'application/json', '', '', '');
  documentsEndpoint() { return '/generic/document-index/document/' + this._file_id }

  updateDocument(payload) {
    return this.documentService.put(this.documentsEndpoint(), payload)
  }
}