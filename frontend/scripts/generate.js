// scripts/generateFakeData.ts
import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
function createRandomProduct() {
  return {
    id: faker.string.uuid(),
    slug: faker.lorem.slug(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    imageUrl: faker.image.urlLoremFlickr({ category: 'commerce', width: 640, height: 480 }),
    category: faker.commerce.department(),
    stock: faker.number.int({ min: 0, max: 100 }),
    rating: faker.number.float({ min: 1, max: 5 }),
    reviewsCount: faker.number.int({ min: 0, max: 200 })
  };
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const products = Array.from({ length: 50 }).map(() => createRandomProduct());
const categories = ['Electronics', 'Clothing', 'Books', 'Home'].map(name => ({
     id: faker.string.uuid(),
     slug: name.toLowerCase().replace(/\s/g, '-'),
     name: name,
     description: faker.lorem.sentence()
}));


const dataDir = path.join(__dirname, '../data'); // Ajusta la ruta según tu estructura
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify(products, null, 2));
fs.writeFileSync(path.join(dataDir, 'categories.json'), JSON.stringify(categories, null, 2));

console.log('Fake data generated!');