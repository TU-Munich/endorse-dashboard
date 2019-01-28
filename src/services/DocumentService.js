import HttpService from "./HttpService";
import config from "../config";

export default class DocumentService {
  static documentService = new HttpService(config.nlpServiceBaseUrl, 'application/json', '', '', '');
  static documentsEndpoint() { return '/generic/document-index/document/' }

  static updateDocument(document_id, payload) {
    return this.documentService.put(this.documentsEndpoint() + document_id, payload)
  }
}