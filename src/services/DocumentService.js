import HttpService from "./HttpService";
import config from "../config";

export default class DocumentService {
  static documentService = new HttpService(config.nlpServiceBaseUrl, 'application/json', '', '', '');
  static documentsEndpoint() { return '/generic/document-index/document/' }
  static documentsQueryEndpoint() { return '/generic/query/document-index/document' }

  static updateDocument(document_id, payload) {
    return this.documentService.put(this.documentsEndpoint() + document_id, payload)
  }

  static async getAllTags() {
    let tags = [{name: 'Innovation'}];
    var body = {
      "_source": ["tags"],
      "size": "0",
      "aggs": {"tags": {"terms": {"field": "tags.tag.keyword", "size": "1000" }}}
    };
    let response = await this.documentService.post(this.documentsQueryEndpoint(), body);
    response.data.aggregations.tags.buckets.forEach((bucket) => {
      tags.push({name: bucket.key});
    });
    return tags;
  }

  static async getTagsByDocument(document_id) {
    let tags = [];
    var body = {
      "_source": "tags.tag.keyword",
      "query": {
        "term": {
          "_id": document_id
        }
      },
      "aggs" : {
        "tags" : {
          "terms" : { "field": "tags.tag.keyword", "size": "1000" }
        }
      }
    };

    let response = await this.documentService.post(this.documentsQueryEndpoint(), body);
    response.data.aggregations.tags.buckets.forEach((bucket) => {
      tags.push({name: bucket.key})
    });
    return tags;
  }
}