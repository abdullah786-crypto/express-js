import AppDataSource from '../datasource/datasource';
import { BaseProductEntity } from '../entities/productEntity/baseProductEntity';
const express = require('express');

let router = express.Router();

const getProductById = async (id: any) => {
    return await AppDataSource.getRepository(BaseProductEntity).findOneBy({
        id: id,
    });
};

router.get('/', async (req: any, res: any) => {
    try {
        const products = await AppDataSource.getRepository(
            BaseProductEntity,
        ).find();
        if (products && products.length > 0) {
            console.log('Products are...', products);
            res.status(200).json(products);
        } else {
            res.status(404).json({ message: 'No products found' });
        }
    } catch (err: any) {
        res
            .status(500)
            .json({ message: 'Failed to fetch the products', error: err.message });
    }
});

router.post('/list', async (req: any, res: any) => {

    // Inserting the data of array through the query builder

    // const { products } = req.body

    // list = { ...req.body }

    try {
        if (!Array.isArray(req.body) || req.body === 0) {
            res.status(400).json({ message: 'Products array is required' })
        } else {
            const productList = AppDataSource.createQueryBuilder().insert().into(BaseProductEntity).values(req.body).execute().then((val) => {
                res.status(200).json({ message: 'Product added successfully', product: [{ id: val.identifiers[0].id, ...req.body }] })
            }).catch((error: any) => {
                res.status(500).json({ message: 'Failed to add the product', error: error.message })
            })
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to add the product', error: error.message })
    }

    // Inserting data through the query builder

    //    const product = await AppDataSource.createQueryBuilder().insert().into(BaseProductEntity).values({...req.body}).execute().then((val) => {
    //         console.log('Values are the', val);
    //         res.status(200).json({message: 'Data added successfully', response: {id: val.identifiers[0].id, ...req.body}})
    //    }).catch((error: any) => {
    //         res.status(500).json({message: 'Failed to add image', error: error.message})
    //    })



    // Real Insert data code...

    // AppDataSource.getRepository(BaseProductEntity).create(req.body);
    // const products = await AppDataSource.getRepository(BaseProductEntity).save(
    //     req.body,
    // );
    // console.log('Products data is ', products);
    // res.status(200).json({ message: 'Product added successfully', result: products });
});

router.get('/min=:min&max=:max', async (req: any, res: any) => {
    const {
        currentProductId,
        name,
        price,
        minPrice,
        maxPrice,
        columnName,
        min,
        max,
    } = req.params;

    // Get product in limits...

    //   try {
    //     let product = await AppDataSource.getRepository(BaseProductEntity)
    //       .createQueryBuilder('base_prodcut_entity')
    //       .take(min)
    //       .skip(max)
    //       .getMany();

    //       if (product && product.length > 0) {
    //         res.status(200).json(product)
    //       } else {
    //         res.status(404).json({ message: 'No product found' })
    //       }

    //   } catch (error: any) {
    //     res.status(500).json({message: 'Failed to get product', error: error.message})
    //   }

    // Get specific column

    // try {
    //     const product = await AppDataSource.getRepository(BaseProductEntity)
    //   .createQueryBuilder('base_product_entity')
    //   .select(['base_product_entity.name', 'base_product_entity.price'])
    //   .getMany();

    //   if (product && product.length > 0) {
    //         res.status(200).json({message: 'Product fetched successfully', product: product})
    //   } else {
    //     res.status(404).json({message: 'No data is found'})
    //   }
    // } catch (error: any) {
    //     res.status(500).json({message: 'Failed to get product', error: error.message})
    // }

    // conditionally between prices...(filtered items)

    //    try {
    //          const productFiltered = await AppDataSource.getRepository(BaseProductEntity)
    //       .createQueryBuilder('base_product_entity')
    //       .where('base_product_entity.price BETWEEN :minPrice AND :maxPrice', {
    //         minPrice: minPrice,
    //         maxPrice: maxPrice,
    //       }).getMany();
    //       if (productFiltered && productFiltered.length > 0) {
    //         res.status(200).json({message: 'Product fetch successfully', product: productFiltered})
    //       } else {
    //         res.status(404).json({message: 'Product not found'})
    //       }
    //    } catch (error: any) {
    //         res.status(500).json({message: 'Failed to fetch the product', error: error.message})
    //    }

    // Conditional get items 1

    //   try {
    //     const productById = await AppDataSource.getRepository(BaseProductEntity)
    //       .createQueryBuilder('base_product_entity')
    //       .where(
    //         'base_product_entity.name = :name AND base_product_entity.price = :price',
    //         { name: name, price: price },
    //       )
    //       .getOne();

    //     if (productById) {
    //       res
    //         .status(200)
    //         .json({ message: 'Product fetch successfully', product: productById });
    //     } else {
    //       res.status(404).json({ message: 'No any product found' });
    //     }
    //   } catch (error: any) {
    //     res
    //       .status(500)
    //       .json({ message: 'Failed to fetch product', error: error.message });
    //   }

    // Conditional get items 1
    //   try {
    //     const getConditionalProduct = await AppDataSource.getRepository(
    //       BaseProductEntity,
    //     )
    //       .createQueryBuilder('base_product_entity')
    //       .where('base_product_entity.id = :id', { id: currentProductId })
    //       .andWhere('base_product_entity.name = :name', { name: name })
    //       .getOne();

    //     if (getConditionalProduct) {
    //       res
    //         .status(200)
    //         .json({
    //           message: 'Product fetched successfully',
    //           product: getConditionalProduct,
    //         });
    //     } else {
    //       res.status(404).json({ message: 'Product not found' });
    //     }
    //   } catch (error: any) {
    //     res
    //       .status(500)
    //       .json({ message: 'Failed to get product', error: error.message });
    //   }
    // Conditional get items 2

    // try {
    //     if (currentProductId) {
    //         const productById = await getProductById(currentProductId)
    //         if (productById) {
    //             console.log('Product by id is', productById)
    //             res.status(200).json(productById)
    //         } else {
    //             res.status(404).json({ message: 'Product does not exist' })
    //         }
    //     }
    // } catch (error: any) {
    //     res.status(500).json({ message: 'Failed to fetch product', error: error.message })
    // }
});

router.put('/productId=:id', async (req: any, res: any) => {
    const currentProductId = Number(req.params.id);
    console.log('product id is', currentProductId)

    // Update through the query builder

    try {
        await AppDataSource.createQueryBuilder().update(BaseProductEntity).set({ ...req.body }).where('id = :id', { id: currentProductId }).execute().then((val) => {
            res.status(200).json({ message: 'Product updated successfully', product: { id: currentProductId, ...req.body } })
        }).catch((error: any) => {
            res.status(500).json({ message: 'Failed to update your product' })
        })
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to update the product', error: error.message })
    }


    // Update through the crud method....

    // try {
    //     const productById = await getProductById(currentProductId);
    //     if (productById) {
    //         let updateProduct = await AppDataSource.getRepository(
    //             BaseProductEntity,
    //         ).update({ id: currentProductId }, { ...req.body });
    //         if (updateProduct) {
    //             res
    //                 .status(200)
    //                 .json({ message: 'Product successfully updated', product: req.body });
    //         }
    //     } else {
    //         res.status(404).json({ message: 'Product not found to update' });
    //     }
    // } catch (error: any) {
    //     res
    //         .status(500)
    //         .json({ message: 'Failed to update product', error: error.message });
    // }
});

router.delete('/productId=:id', async (req: any, res: any) => {
    const productId = Number(req.params.id);

    try {
        await AppDataSource.createQueryBuilder().delete().from(BaseProductEntity).where("id = :id", {id: productId}).execute().then((val) => {
        res.status(200).json({message: 'Product Deleted successfully'})
    }).catch((error: any) => {
        res.status(500).json({message: 'Failed to delete the product'})
    })
    } catch (error: any) {
        res.status(500).json({message: 'Failed to delete the product'})
    }

    // Delete request throught the crud methods

    // try {
    //     const isProduct = await getProductById(productId);
    //     if (isProduct) {
    //         await AppDataSource.getRepository(BaseProductEntity)
    //             .delete({ id: productId })
    //             .then((result) => {
    //                 console.log('Result of delete is', result);
    //                 res.status(200).json({
    //                     message: 'Product deleted successfully',
    //                     product: { ...req.body },
    //                 });
    //             });
    //     } else {
    //         res.status(404).json({ message: 'Product not found' });
    //     }
    // } catch (error: any) {
    //     res
    //         .status(500)
    //         .json({ message: 'Failed to delete product', error: error.message });
    // }
});

export default router;
