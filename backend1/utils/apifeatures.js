class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr
    }

    //paginação

    //buscando um produto
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    //filtrando a busca de produtos
    filter() {
        const queryCopy = { ...this.queryStr }
      
        //removendo alguns campos da categoria
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(key => delete queryCopy[key]);

        //filtro por preço
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        
        return this;

    }


    //paginação - limitação de exibição dos produtos por pagina
    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.skip = this.query.limit(resultPerPage).skip(skip);

        return this;

    }
}

module.exports = ApiFeatures