const fs = require('fs')
const path = require('path')

module.exports = class Product {
    
    constructor(title,imageUrl,description,price){
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() { 
        const p = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        )
        fs.readFile(p,(err,fileContent)=>{
            let products = [];
            if ( !err ){ 
                products = JSON.parse(fileContent)
                console.log(products)
            }
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err)
            })
        })

    }

    static fetchAll() {
        const p = path.join(
            path.dirname(process.mainModule.filename),
            'data',
            'products.json'
        )
        return new Promise(function(resolve, reject) {
            fs.readFile(p,(err,fileContent)=>{
                    let products = [];
                    if ( err ){ 
                        resolve([]);
                    
                    }
                    else { 
                        products = JSON.parse(fileContent)
                        resolve(products);
                    }
            })
        })
    }

}