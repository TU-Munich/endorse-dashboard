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

  static async getNerCount(projectUUID, amountBar, unixDateFrom, unixDateTo) {
    let query ='';
    if (unixDateFrom === unixDateTo){
      query = {
        "size": "0",
        "query": {
          "bool": {
            "must": [{
              "match": {
                "project_uuid": projectUUID
              }
            }]
          }
        },
        "aggs": {
          "count": {
            "terms": {
              "field": "ner.text.keyword",
              "size": amountBar
            }
          }
        }
      };
    } else {
       query = {
        "size": "0",
        "query": {
          "bool": {
            "must": [{
              "match": {
                "project_uuid": projectUUID
              }
            },
              {
                "range": {
                  "timestamp": {
                    "gte": unixDateFrom,
                    "lt": unixDateTo
                  }
                }
              }]
          }
        },
        "aggs": {
          "count": {
            "terms": {
              "field": "ner.text.keyword",
              "size": amountBar
            }
          }
        }
      };
    }

    let response = await this.documentService.post(this.documentsQueryEndpoint(), query);
    let keyword = [];
    let counts = [];

    response.data.aggregations.count.buckets.forEach((bucket) => {
      keyword.push(bucket.key);
      counts.push(bucket.doc_count);
    });
    return {keyword, counts}
  }

  static async getLabelsCount(projectUUID, amountDoughnut, unixDateFrom, unixDateTo) {
    let query ='';
    if (unixDateFrom === unixDateTo) {
      query = {
        "size": "0",
        "query": {
          "bool": {
            "must": [{
              "match": {
                "project_uuid": projectUUID
              }
            }]
          }
        },
        "aggs": {
          "labels": {
            "terms": {
              "field": "ner.label.keyword",
              "size": amountDoughnut
            }
          }
        }
      };
    } else {
      query = {
        "size": "0",
        "query": {
          "bool": {
            "must": [{
              "match": {
                "project_uuid": projectUUID
              }
            },
              {
                "range": {
                  "timestamp": {
                    "gte": unixDateFrom,
                    "lt": unixDateTo
                  }
                }
              }]
          }
        },
        "aggs": {
          "labels": {
            "terms": {
              "field": "ner.label.keyword",
              "size": amountDoughnut
            }
          }
        }
      };
    }
    let response = await this.documentService.post(this.documentsQueryEndpoint(), query);
    let labelCounts = [];
    let labels = [];

    response.data.aggregations.labels.buckets.forEach((bucket) => {
      labels.push(bucket.key);
      labelCounts.push(bucket.doc_count);
    });
    return {labels, labelCounts}
  }

  static async getSentimentCount(projectUUID, unixDateFrom, unixDateTo) {
    let query ='';
    if (unixDateFrom === unixDateTo) {
      query = {
        "size": "0",
        "query": {
          "bool": {
            "must": [{
              "match": {
                "project_uuid": projectUUID
              }
            }]
          }
        },
        "aggs": {
          "neg": {
            "terms": {
              "field": "sentiment.total.neg"
            }
          }, "pos": {
            "terms": {
              "field": "sentiment.total.pos"
            }
          },
          "neu": {
            "terms": {
              "field": "sentiment.total.neu"
            }
          }
        }
      };
    }else {
      query = {
        "size": "0",
        "query": {
          "bool": {
            "must": [{
              "match": {
                "project_uuid": projectUUID
              }
            },
              {
                "range": {
                  "timestamp": {
                    "gte": unixDateFrom,
                    "lt": unixDateTo
                  }
                }
              }]
          }
        },
        "aggs": {
          "neg": {
            "terms": {
              "field": "sentiment.total.neg"
            }
          }, "pos": {
            "terms": {
              "field": "sentiment.total.pos"
            }
          },
          "neu": {
            "terms": {
              "field": "sentiment.total.neu"
            }
          }
        }
      };
    }


    let response = await this.documentService.post(this.documentsQueryEndpoint(), query);
    let total =[];

    response.data.aggregations.neg.buckets.forEach((bucket) => {
      total.push(bucket.key);
    });
    response.data.aggregations.pos.buckets.forEach((bucket) => {
      total.push(bucket.key);
    });
    response.data.aggregations.neu.buckets.forEach((bucket) => {
      total.push(bucket.key);
    });
    return {total}
  }
  static async getDocumentsCount(projectUUID) {
    let query = {
      "size":"0",
      "query": {
        "bool": {
          "must": [{
            "match": {
              "project_uuid": projectUUID
            }
          }]}},
      "aggs": {
        "docsTotal":{
          "terms": {
            "field": "project_uuid.keyword"
          }
        }
      }
    };
    let response = await this.documentService.post(this.documentsQueryEndpoint(), query);
    return response.data.aggregations.docsTotal.buckets[0].doc_count;
  }
}