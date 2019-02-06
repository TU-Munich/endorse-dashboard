import escapeElastic from 'elasticsearch-sanitize'
import DocumentService from './DocumentService'

class SearchService {

  constructor(project_uuid) {
    this._project_uuid = project_uuid;
  }

  documentSearch = async (search_term, tags, dateFrom, dateTo) => {
    let query = this.queryBuilder(search_term, tags, dateFrom, dateTo);
    return await DocumentService.queryDocuments(query);
  };

  queryBuilder = (search_term, tags, dateFrom, dateTo) => {
    let query = {
      "_source": ["file_path","_id"],
      "query" : {"bool": {"must": [{ "match": { "project_uuid": this._project_uuid } }]}}
    };

    if (search_term !== '') {
      query.query.bool.must.push(this.filterSearchTermMarch(search_term));
    }

    if (tags.length !== 0) {
      tags.forEach((tag) => {
        query.query.bool.must.push(this.filterTagsMatch(tag));
      });
    }

    if (dateFrom !== '') {
      let unixDateFrom = Date.parse(dateFrom)/1000;
      let unixDateTo = dateTo !== '' ? Date.parse(dateTo)/1000 : Date.parse(Date().toString())/1000;
      query.query.bool.must.push(this.filterDateRange(unixDateFrom, unixDateTo));
    }

    return query;
  };

  filterSearchTermMarch =(search_term) => {
    let secure_search_term = escapeElastic(search_term);
    return {"match_phrase_prefix" : {"input": {"query": secure_search_term, "max_expansions": 50}}}
  };

  filterTagsMatch = (tag) => {
    return { "match": { "tags.tag.keyword": tag } };
  };

  filterDateRange = (unixDateFrom, unixDateTo) => {
    return { "range": { "timestamp": { "gte": unixDateFrom, "lt":  unixDateTo } } };
  };
}

export default SearchService;