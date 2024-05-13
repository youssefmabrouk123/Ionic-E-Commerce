// import { ProductStore } from "./ProductStore";
// import axios from 'axios';

// export const fetchData = async () => {
//     console.log('-----------------')

//     try {
//         const response = await axios.get('https://localhost:8080/users/category/names');
//         console.log('-----------------')
//         console.log(response)
//         console.log('-----------------')

//         const categories = response.data;

//         const productsPromises = categories.map(async category => {
//             try {
//                 const products = await fetchProducts(category);
//                 const categoryName = uppercaseWords(category);
//                 const productCategory = {
//                     name: categoryName,
//                     slug: categoryName,
//                     cover: products[6].image, // Assuming the cover image is always at index 6
//                     products
//                 };
//                 ProductStore.update(s => { s.products = [ ...s.products, productCategory ]; });
//             } catch (error) {
//                 console.error(`Error fetching products for category ${category}:`, error);
//             }
//         });

//         await Promise.all(productsPromises);
//         console.log("Data fetched successfully.");
//         return "Data fetched successfully.";
//     } catch (error) {
//         console.error('Error fetching category names:', error);
//         return "Failed to fetch data.";
//     }
// }

// const fetchProducts = async category => {
//     try {
//         const response = await axios.get(`http://localhost:8080/users/products/get/?categoryName=${category}`);
//         const data = response.data;
        
//         // Set a product id
//         data.forEach((d, i) => {
//             d.id = i + 1;
//         });

//         return data;
//     } catch (error) {
//         console.error(`Error fetching products for category ${category}:`, error);
//         return [];
//     }
// }

// const uppercaseWords = words => {
//     return words.toLowerCase()
//         .split(' ')
//         .map(s => s.charAt(0).toUpperCase() + s.substring(1))
//         .join(' ');
// }
/////////////////////////////////////////////////////////////////////

// import { ProductStore } from "./ProductStore";

// export const fetchData = async () => {

//     const json = ["beds.json", "armchairs.json", "coffee_tables.json", "cushions.json", "floor_lamps.json", "office_chairs.json"];//list categorie

//     var products = [];

//     json.forEach( async category => {
//         console.log(category)

//         const products = await fetchProducts(category);


//         let categoryName = category.replace(".json", "");
//         categoryName = categoryName.replace("_", " ");
//         categoryName = uppercaseWords(categoryName);

//         const productCategory = {

//             name: categoryName,
//             slug: category.replace(".json", ""),
//             cover: products[6].image,
//             products
//         };
//         console.log(productCategory)


//         ProductStore.update(s => { s.products = [ ...s.products, productCategory ]; });
//     });

//     console.log(products)

//     return products;
// }

// const fetchProducts = async category => {

//     const response = await fetch(`products/${ category }`);//api fetch product by categorie
//     const data = await response.json();

//     //  Set a product id
//     await data.forEach((d, i) => {

//         d.id = i + 1;
//     });
//     console.log(data)
//     return data;
// }

// const uppercaseWords = words => {

//     words = words.toLowerCase()
//     .split(' ')
//     .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
//     .join(' ');

//     return words;
// }


/////////////////////
import { ProductStore } from "./ProductStore";

export const fetchData = async () => {
    console.log('-----------------')

    try {
        const response = await fetch('http://localhost:8080/users/category/names');
        if (!response.ok) {
            throw new Error('Failed to fetch category names');
        }

        const categories = await response.json();

        const productsPromises = categories.map(async category => {
            try {
                const products = await fetchProducts(category);
                const categoryName = uppercaseWords(category);
                const productCategory = {
                    name: categoryName,
                    slug: categoryName,
                    cover: products[0].image, // Assuming the cover image is always at index 6
                    products
                };
                ProductStore.update(s => { s.products = [ ...s.products, productCategory ]; });
            } catch (error) {
                console.error(`Error fetching products for category ${category}:`, error);
            }
        });

        await Promise.all(productsPromises);
        console.log("Data fetched successfully.");
        return "Data fetched successfully.";
    } catch (error) {
        console.error('Error fetching category names:', error);
        return "Failed to fetch data.";
    }
}

const fetchProducts = async category => {
    try {
        const response = await fetch(`http://localhost:8080/users/products/get/?categoryName=${category}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch products for category ${category}`);
        }
        const data = await response.json();
        
        // Set a product id
        data.forEach((d, i) => {
            d.id = i + 1;
        });

        return data;
    } catch (error) {
        console.error(`Error fetching products for category ${category}:`, error);
        return [];
    }
}

const uppercaseWords = words => {
    return words.toLowerCase()
        .split(' ')
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
}
