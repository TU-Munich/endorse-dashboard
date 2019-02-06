import escapeElastic from 'elasticsearch-sanitize'
import DocumentService from './DocumentService'

class SearchService {

  constructor(project_uuid) {
    this._project_uuid = project_uuid;
  }

  documentSearch = async (search_term, tags, dateFrom, dateTo) => {
    let query = this.queryBuilder(this._project_uuid, search_term, tags, dateFrom, dateTo);
    return await DocumentService.queryDocuments(query);
  };

  queryBuilder = (project_uuid, search_term, tags, dateFrom, dateTo) => {
    let secure_search_term = escapeElastic(search_term);
    let unixDateFrom = dateFrom !== '' ? Date.parse(dateFrom)/1000 : '';
    let unixDateTo = dateTo !== '' ? Date.parse(dateTo)/1000 : Date.parse(Date().toString());

    let query = {
      "_source": ["file_path","_id"],
      "query" : {"bool": {"must": [{"match_phrase_prefix" : {"input": {"query": secure_search_term, "max_expansions": 50}}}]}}
    };

    if (project_uuid !== '') {
      query.query.bool.must.push(this.filterProjectMatch(project_uuid))
    }

    if (tags.length !== 0) {
      tags.forEach((tag) => {
        query.query.bool.must.push(this.filterTagsMatch(tag));
      });
    }

    if (unixDateFrom !== '') {
      query.query.bool.must.push(this.filterDate(unixDateFrom, unixDateTo));
    }
    console.log(JSON.stringify(query));
    return query;
  };

  filterProjectMatch = (project_uuid) => {
    return { "match": { "project_uuid": project_uuid } };
  };

  filterTagsMatch = (tag) => {
    return { "match": { "tags.tag.keyword": tag } };
  };

  filterDate = (unixDateFrom, unixDateTo) => {
    return { "range": { "timestamp": { "gte": unixDateFrom, "lt":  unixDateTo } } };
  };
}

export default SearchService