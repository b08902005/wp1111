// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter = req.query.mealFilter
    const typeFilter = req.query.typeFilter
    const sortBy = req.query.sortBy
    /****************************************/

    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 


    // TODO Part I-3-a: find the information to all restaurants
    let priceFilternew = []
    // console.log(priceFilter)
    if (priceFilter) {
        for (let item of priceFilter) {
            if (item === '$')
                priceFilternew.push(1);
            else if (item === '$$')
                priceFilternew.push(2);
            else if (item === '$$$')
                priceFilternew.push(3);
        }
    }
    let info = await Info.find({}).exec()
    // console.log(info);
    // console.log(sortBy);
    if (priceFilternew.length !== 0) {
        info = info.filter((item) => (priceFilternew.includes(item.price)))
    }
    if (mealFilter && mealFilter.length !== 0) {
        info = info.filter(function (item) {
            let def = false;
            for (let meal of mealFilter) {
                if (item.tag.includes(meal))
                    def = true;
            }
            return (def)
        })
    }
    if (typeFilter && typeFilter.length !== 0) {
        info = info.filter(function (item) {
            let def = false;
            for (let type of typeFilter) {
                if (item.tag.includes(type))
                    def = true;
            }
            return (def)
        })
    }
    if (sortBy === 'price') {
        info.sort((a, b) => ((a.price > b.price) ? 1 : -1))
    }
    else {
        info.sort((a, b) => ((a.distance > b.distance) ? 1 : -1))
    }
    // console.log(info);
    res.status(200).send({ message: 'success', contents: info })

    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/
    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }
    try {
        const info = await Info.findOne({ id: id }).exec()
        res.status(200).send({ message: 'success', contents: info })
    }catch{
        res.status(403).send({ message: 'error', contents: 'fail' })
    }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
}