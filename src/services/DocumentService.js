import HttpService from "./HttpService";
import config from "../config";

export default class DocumentService {
  static documentService = new HttpService(config.nlpServiceBaseUrl, 'application/json', '', '', '');
  static documentsEndpoint() { return '/generic/document-index/document/' }
  static documentsQueryEndpoint() { return '/generic/query/document-index/document' }

  static async getDocumentById(document_id) {
    let query = { "_source": {"excludes": "input"}, "query": {"match": {"_id": document_id }}};
    return await this.documentService.post(this.documentsQueryEndpoint(), query);
  }

  static updateDocument(document_id, payload) {
    return this.documentService.put(this.documentsEndpoint() + document_id, payload);
  }

  static async queryDocuments(query) {
    return await this.documentService.post(this.documentsQueryEndpoint(), query);
  };

  static async getAllTags(isAddTag, project_uuid) {
    let tags = [];
    var body = {
      "_source": ["tags"],
      "size": "0",
      "aggs": {"tags": {"terms": {"field": "tags.tag.keyword", "size": "1000" }}}
    };

    if (project_uuid !== false) {
      body.query = {"match": { "project_uuid": project_uuid }}
    }

    let response = await this.documentService.post(this.documentsQueryEndpoint(), body);

    response.data.aggregations.tags.buckets.forEach((bucket) => {
      if (isAddTag === true) {
        tags.push({name: bucket.key});
      } else {
        tags.push(bucket.key);
      }
    });

    if (isAddTag === true && tags.length < 1) {
      tags = [{name: ''}]
    }

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