
const paginationHelper = async (totalDoc, query, req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    const total = totalDoc;
    if (startIndex > 0) {
      pagination.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }

    return {
        query : query === undefined ? undefined : query.skip(startIndex).limit(limit),
        pagination : pagination,
        startIndex,
        limit
    }
}

module.exports = {
    paginationHelper
};