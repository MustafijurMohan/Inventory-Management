const PurchasesModel = require('../../models/Purchases/PurchasesModel')


const PurchasesSummaryService = async(Request) => {
    try {
        const UserEmail = Request.headers['email']

        const data = await PurchasesModel.aggregate([
            {$match: {UserEmail: UserEmail}},
            {
                $facet: {
                    Total: [{$group: {_id: 0, TotalAmount: {$sum: '$GrandTotal'}}}],
                    Last30Days: [{
                        $group: {_id: {$dateToString: {format: '%Y-%m-%d', date: '$CreatedDate'}}, 
                        TotalAmount: {$sum: '$GrandTotal'}}
                    },
                    {$sort: {_id: -1}},
                    {$limit: 30}
                ]
                }
            }
        ])

        return {status: 'successfull', data: data}
    } catch (error) {
        return {status: 'fail', data: error.toString()}
    }
}


module.exports = PurchasesSummaryService


