
const ListService = async (Request, DataModel, SearchArray) => {
    try {
        
        let pageNo = Number(Request.params.pageNo)
        let perPage= Number(Request.params.perPage)
        let SearchValue = Request.params.searchKeyword
        let UserEmail = Request.headers['email']
        let skipRow = (pageNo - 1) * perPage
        let data

        if (SearchValue !== '0') {
            let SearchQuery = {$or: SearchArray}
            data = await DataModel.aggregate([
                {$match: {UserEmail: UserEmail}},
                {$match: SearchQuery},
                {
                    $facet: {
                        Total: [{$count: 'Count'}],
                        Rows: [{$skip: skipRow}, {$limit: perPage}]
                    }
                }
            ])
        } else {
            data = await DataModel.aggregate([
                {$match: {UserEmail: UserEmail}},
                {
                    $facet: {
                        Total: [{$count: 'Count'}],
                        Rows: [{$skip: skipRow}, {$limit: perPage}]
                    }
                }
            ])
        }

        return {status: 'successfull', data: data}
    } catch (error) {
        return {status: 'fail', data: error.toString()}
    }
}

module.exports = ListService
