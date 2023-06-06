const Product = require("../models/products")


const getAllProducts = async(req,res)=>{
    // http://localhost:5000/api/products/?company=apple&name=iphone10
    // http://localhost:5000/api/products/?company=apple

    const {company,name,featured,sort,select} = req.query;
    const queryObject = {}

    if(company){
        queryObject.company=company
    }
    if(name){
        queryObject.name=name
       
    }
    if(featured){
        queryObject.featured=featured
    }

    let apiData = Product.find(queryObject)

    if(sort){
        let sortFix = sort.replace(","," ")
        apiData=apiData.sort(sortFix)
    }

    if(select){
        let selectFix = select.split(",").join(" ")
        apiData=apiData.select(selectFix)
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 14;

    let skip = (page-1)*limit

    apiData = apiData.skip(skip).limit(limit)

    console.log(queryObject)

    const myProducts = await apiData;
    res.status(200).json({myProducts ,nbHits:myProducts.length})
}

const getAllProductsTesting = async(req,res)=>{
    const myData = await Product.find(req.query).select("name company")  //sorting price (ascending order) -sign for descending order
    console.log(myData)
    res.status(200).json({myData})
}

module.exports = {getAllProducts,getAllProductsTesting}

