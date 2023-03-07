import Category from "../models/categorySchema.js"

export const createCategory = async (req, res) => {
    const { category,icon } = req.body
    if (!category || !icon) { res.json({ alert: "Please Enter Both Category And Icon " }) }
    else {
        const findCategory = await Category.findOne({ category: category })
        if (findCategory) {
            res.json({ alert: "Category already exists!" })
        } else {
            const newCategory = {
                category : category,
                icon : icon
            }
            const create = await new Category(newCategory)
            if (create) {
                await create.save()
                const Categ = await Category.find()
                res.json({ success: Categ })
            } else {
                res.json({ alert: "Error" })
            }
        }
    }
}

export const getCategory = async (req, res) => {
    const find = await Category.find()
    res.json(find)
}

export const createItem = async (req, res) => {
    const { category, name, description, image, price, available } = req.body
    let item = {
        name: name,
        description: description,
        image: image,
        price: price,
        available: available,
        category:category
    };
    try {
        const findcategory = await Category.findOne({ category: category });
       if(findcategory){
           findcategory.items = findcategory.items.concat(item)
           await findcategory.save()
           const category = await Category.find();
        res.json({ success: category });
       }else{
        res.json({alert : "Category Not Found"})
       }
    } catch (err) {
        res.status(500).json({ error: 'Error adding items to category' });
    }
}

export const updateItem = async (req, res) => {
    const { category, name, description, image, price, available, id } = req.body
    let items = {
        name: name,
        description: description,
        image: image,
        price: price,
        available: available,
        category:category,
        _id: id
    };
    const findCategory = await Category.findOne({ category: category })
    if (findCategory) {
        const indexx = await findCategory.items.findIndex(item => item._id == id)
        findCategory.items[indexx] = items
        findCategory.save()
        const newCategory = await Category.find();
        res.json({ success: newCategory, category: category })
    } else {
        res.json({ alert: "No Product Found" })
    }
}

export const deleteItem = async (req, res) => {
    const { category, id } = req.query
    const findCategory = await Category.findOne({ category: category })
    if (findCategory) {
        const indexx = await findCategory.items.findIndex(item => item._id == id)
        const item = findCategory.items[indexx]
        const del = findCategory.items.filter(item => item._id != id)
        findCategory.items = del
        const deleted = findCategory.save()
        if (deleted) {
            const category = await Category.find();
            res.json({success : category})
        } else {
            res.json({ error: "Can't Delete" })
        }

    } else {
        res.json({ alert: " Product Not Found" })
    }
}

export const editCategory = async (req, res) => {
    const { category,icon, id } = req.body
    const findCategory = await Category.findById(id)
    if (findCategory) {
        findCategory.category = category
        findCategory.icon = icon
        await findCategory.save()
        const categ = await Category.find()
        res.json(categ)
    } else {
        res.json({ alert: "Category Not Found" })
    }
}

export const deleteCategory = async (req, res) => {
    const { id } = req.query;
    const result = await Category.findOneAndDelete({ _id: id });

    if (result) {
        const categ = await Category.find()
        res.json({success : categ});
    } else {
        res.json({ alert: "No Category Found" });
    }
};