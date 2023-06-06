const Product = require("../models/products")

// run productDB.js for add new or updated data in mongodb atlas  which is written in product.json file (command : node productDB.js)
// command :  npm run dev  for run actual api

const getAllProducts = async(req,res)=>{
    // http://localhost:5000/api/products

    const {company,name,featured,sort,select} = req.query;
    const queryObject = {}

    if(company){
        queryObject.company=company
         // http://localhost:5000/api/products/?company=apple
    }
    if(name){
        queryObject.name=name
        // http://localhost:5000/api/products/?name=iphone10  
    }
    if(featured){
        queryObject.featured=featured
        // http://localhost:5000/api/products/?featured=true
    }

    let apiData = Product.find(queryObject)

    if(sort){
        let sortFix = sort.replace(","," ")
        apiData=apiData.sort(sortFix)
        // http://localhost:5000/api/products/?sort=price
        // http://localhost:5000/api/products/?sort=price,name
    }

    if(select){
        let selectFix = select.split(",").join(" ")
        apiData=apiData.select(selectFix)
        // http://localhost:5000/api/products/?select=rating,price
    }
    // http://localhost:5000/api/products/?name=iphone10&company=apple

// ================= this is for pagination =================
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 15;

    let skip = (page-1)*limit

    apiData = apiData.skip(skip).limit(limit)

    // http://localhost:5000/api/products/?page=2

// ===========================================================

    console.log(queryObject)

    const myProducts = await apiData;
    res.status(200).json({myProducts ,nbHits:myProducts.length})
}

 // below function is only for testing purpose

const getAllProductsTesting = async(req,res)=>{
    const myData = await Product.find(req.query).select("name company")  //sorting price (ascending order) -sign for descending order
    console.log(myData)
    res.status(200).json({myData})
}

module.exports = {getAllProducts,getAllProductsTesting}

