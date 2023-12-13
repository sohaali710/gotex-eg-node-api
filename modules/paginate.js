/** pagination*/
const paginate = (data, page, limit) => {
    const skip = (page - 1) * limit

    const numberOfOrders = data.length
    const numberOfPages = (numberOfOrders % limit == 0) ? numberOfOrders / limit : Math.floor(numberOfOrders / limit) + 1;
    const dataPerPage = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // sort desc
        .slice(skip, skip + limit)

    return {
        result: dataPerPage.length,
        pagination: {
            currentPage: page,
            limit,
            numberOfPages
        },
        data: dataPerPage
    }
}

module.exports = paginate