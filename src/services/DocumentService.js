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
    response.data.aggregations.tags.buckets.map((bucket) => {
      tags.push({name: bucket.key})
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
    response.data.aggregations.tags.buckets.map((bucket) => {
      tags.push({name: bucket.key})
    });
    return tags;
  }

  static async getNerCount(projectUUID) {
    let query = {
      "size": "0",
      "query": {
        "term": {"project_uuid": projectUUID}
      },
      "aggs": {
        "count": {
          "terms": {
            "field": "ner.text.keyword"
          },
          "aggs":{
            "label":{
              "terms": {
                "field": "ner.label.keyword"
              }
            }
          }
        }
      }
    };

    let response = await this.documentService.post(this.documentsQueryEndpoint(), query);
    let keyword = [];
    let counts = [];

    response.data.aggregations.count.buckets.map((bucket) => {
      keyword.push(bucket.key);
      counts.push(bucket.doc_count);
    });
    return {keyword, counts}
  }

  static async getLabelsCount(projectUUID) {
    let query = {
      "size": "0",
      "query": {
        "term": {"project_uuid": projectUUID}
      },
      "aggs": {
        "labels": {
          "terms": {
            "field": "ner.label.keyword"
          }
        }
      }
    };
    let response = await this.documentService.post(this.documentsQueryEndpoint(), query);
    let labelCounts = [];
    let labels = [];

    response.data.aggregations.labels.buckets.map((bucket) => {
      labels.push(bucket.key);
      labelCounts.push(bucket.doc_count);
    });
    return {labels, labelCounts}
  }

  static async getSentimentCount(projectUUID) {
    let query = {
      "size": "0",
      "query": {
        "term": {"project_uuid": projectUUID}
      },
      "aggs": {
        "neg":{
          "terms": {
            "field": "sentiment.total.neg"
          }
        }, "pos":{
          "terms": {
            "field": "sentiment.total.pos"
          }
        },
        "neu":{
          "terms":{
            "field": "sentiment.total.neu"
          }
        }
      }
    };
    let response = await this.documentService.post(this.documentsQueryEndpoint(), query);
    let total =[];

    response.data.aggregations.neg.buckets.map((bucket) => {
      total.push(bucket.key);
    });
    response.data.aggregations.pos.buckets.map((bucket) => {
      total.push(bucket.key);
    });
    response.data.aggregations.neu.buckets.map((bucket) => {
      total.push(bucket.key);
    });

    return {total}
  }
}