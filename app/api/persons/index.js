import request from '../../js/utils/request'

export default function fetchList(limit, page) {
  return request({
    url: 'persons',
    method: 'get',
    params: {
      per_page: limit || 4,
      page: page || 1,
    },
  })
}
