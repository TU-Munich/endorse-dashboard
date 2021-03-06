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

  static deleteDocumentById(document_id) {
    return this.documentService.delete(this.documentsEndpoint() + document_id, '')
  }

  static async queryDocuments(query) {
    return await this.documentService.post(this.documentsQueryEndpoint(), query);
  };

  static async getAllTags(isAddTag, project_uuid,isChartView) {
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
      } else if (isChartView === true) {
        tags.push(bucket);
      }else{
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

  static async getNerCount(projectUUID, amountBar, unixDateFrom, unixDateTo, document_id, sourceData) {
    console.log(document_id);
    let query ='';
    if (unixDateFrom === unixDateTo && document_id === undefined) {
      if(sourceData==='both'){
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
                  "match": {
                    "origin": sourceData
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
    } else if (unixDateFrom === unixDateTo && document_id !== undefined ) {
      if(sourceData==='both'){
        query = {
          "size": "0",
          "query": {
            "bool": {
              "must": [{
                "match": {
                  "_id": document_id
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
    } else {
      if(sourceData==='both'){
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
                },
                {
                  "match": {
                    "origin": sourceData
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

  static async getLabelsCount(projectUUID, amountDoughnut, unixDateFrom, unixDateTo, document_id,sourceData) {
    let query ='';
    if (unixDateFrom === unixDateTo && document_id === undefined) {
      if(sourceData==='both'){
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
      }else {
        query = {
          "size": "0",
          "query": {
            "bool": {
              "must": [{
                "match": {
                  "project_uuid": projectUUID
                }
              },{
                "match": {
                  "origin": sourceData
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
    } else if (unixDateFrom === unixDateTo && document_id !== undefined) {
      if(sourceData==='both'){
        query = {
          "size": "0",
          "query": {
            "bool": {
              "must": [{
                "match": {
                  "_id": document_id
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
      }else {
        query = {
          "size": "0",
          "query": {
            "bool": {
              "must": [{
                "match": {
                  "_id": document_id
                }
              },{
                "match": {
                  "origin": sourceData
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
    }else {
      if(sourceData==='both'){
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
                },{
                  "match": {
                    "origin": sourceData
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

  static async getSentimentCount(projectUUID, unixDateFrom, unixDateTo, document_id,sourceData) {
    let query ='';
    if (unixDateFrom === unixDateTo && document_id === undefined) {
      if(sourceData === 'both'){
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
            "compound": {
              "avg": {
                "field": "sentiment.total.compound"
              }
            },
            "neg": {
              "avg": {
                "field": "sentiment.total.neg"
              }
            },
            "neu": {
              "avg": {
                "field": "sentiment.total.neu"
              }
            },
            "pos": {
              "avg": {
                "field": "sentiment.total.pos"
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
              },{
                "match": {
                  "origin": sourceData
                }
              }]
            }
          },
          "aggs": {
            "compound": {
              "avg": {
                "field": "sentiment.total.compound"
              }
            },
            "neg": {
              "avg": {
                "field": "sentiment.total.neg"
              }
            },
            "neu": {
              "avg": {
                "field": "sentiment.total.neu"
              }
            },
            "pos": {
              "avg": {
                "field": "sentiment.total.pos"
              }
            }
          }
        };
      }
    }else if (unixDateFrom === unixDateTo && document_id !== undefined) {
      if(sourceData === 'both'){
        query = {
          "size": "0",
          "query": {
            "bool": {
              "must": [{
                "match": {
                  "_id": document_id
                }
              }]
            }
          },
          "aggs": {
            "compound": {
              "avg": {
                "field": "sentiment.total.compound"
              }
            },
            "neg": {
              "avg": {
                "field": "sentiment.total.neg"
              }
            },
            "neu": {
              "avg": {
                "field": "sentiment.total.neu"
              }
            },
            "pos": {
              "avg": {
                "field": "sentiment.total.pos"
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
                  "_id": document_id
                }
              },{
                "match": {
                  "origin": sourceData
                }
              }]
            }
          },
          "aggs": {
            "compound": {
              "avg": {
                "field": "sentiment.total.compound"
              }
            },
            "neg": {
              "avg": {
                "field": "sentiment.total.neg"
              }
            },
            "neu": {
              "avg": {
                "field": "sentiment.total.neu"
              }
            },
            "pos": {
              "avg": {
                "field": "sentiment.total.pos"
              }
            }
          }
        };
      }
    } else {
      if(sourceData === 'both'){
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
            "compound": {
              "avg": {
                "field": "sentiment.total.compound"
              }
            },
            "neg": {
              "avg": {
                "field": "sentiment.total.neg"
              }
            },
            "neu": {
              "avg": {
                "field": "sentiment.total.neu"
              }
            },
            "pos": {
              "avg": {
                "field": "sentiment.total.pos"
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
                },{
                  "match": {
                    "origin": sourceData
                  }
                }]
            }
          },
          "aggs": {
            "compound": {
              "avg": {
                "field": "sentiment.total.compound"
              }
            },
            "neg": {
              "avg": {
                "field": "sentiment.total.neg"
              }
            },
            "neu": {
              "avg": {
                "field": "sentiment.total.neu"
              }
            },
            "pos": {
              "avg": {
                "field": "sentiment.total.pos"
              }
            }
          }
        };
      }
    }

    let response = await this.documentService.post(this.documentsQueryEndpoint(), query);
    let total = [];
    let neg = response.data.aggregations.neg.value;
    total.push(neg);
    let comp =response.data.aggregations.compound.value;
    total.push(comp);
    let neu = response.data.aggregations.neu.value;
    total.push(neu);
    let pos = response.data.aggregations.pos.value;
    total.push(pos);
    return {total}
  }

  static async getUploadDocumentsCount(projectUUID) {
    let query = {
      "size":"0",
      "query": {
        "bool": {
          "must": [{
            "match": {
              "project_uuid": projectUUID
            }
          },
            {
              "match": {
                "origin": "upload"
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
    let totalDocuments = 0;
    let response = await this.documentService.post(this.documentsQueryEndpoint(), query);
    if (response.data.aggregations.docsTotal.buckets.length !== 0) {
      totalDocuments = response.data.aggregations.docsTotal.buckets[0].doc_count;
    }
    return totalDocuments;
  }

  static async getCrawledDocumentsCount(projectUUID) {
    let query = {
      "size":"0",
      "query": {
        "bool": {
          "must": [{
            "match": {
              "project_uuid": projectUUID
            }
          },{
            "match": {
              "origin": "crawl"
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
    let totalCrawled = 0;
    let response = await this.documentService.post(this.documentsQueryEndpoint(), query);
    if (response.data.aggregations.docsTotal.buckets.length !== 0) {
      totalCrawled = response.data.aggregations.docsTotal.buckets[0].doc_count;
    }
    return totalCrawled;
  }


  static async getTagsCount(projectUUID, unixDateFrom, unixDateTo, sourceData) {
    let query ='';
    if (unixDateFrom === unixDateTo) {
      if(sourceData === 'both'){
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
                "field": "tags.tag.keyword"
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
              }, {
                "match": {
                  "origin": sourceData
                }
              }]
            }
          },
          "aggs": {
            "labels": {
              "terms": {
                "field": "tags.tag.keyword"
              }
            }
          }
        };
      }
    }else {
      if(sourceData ==='both'){
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
                "field": "tags.tag.keyword"
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
                },{
                  "match": {
                    "origin": sourceData
                  }
                } ]
            }
          },
          "aggs": {
            "labels": {
              "terms": {
                "field": "tags.tag.keyword"
              }
            }
          }
        };
      }
    }
    let response = await this.documentService.post(this.documentsQueryEndpoint(), query);
    let tagsCounts = [];
    let tagsLabels = [];

    response.data.aggregations.labels.buckets.forEach((bucket) => {
      tagsLabels.push(bucket.key);
      tagsCounts.push(bucket.doc_count);
    });
    return {tagsLabels, tagsCounts}
  }
}