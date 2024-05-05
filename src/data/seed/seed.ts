import { envs } from "../../config";
import { UserModel, MongoDatabase, CategoryModel, ProductModel } from "../mongo";
import { seedData } from "./seed-data";

(async () => {
   console.log('<--------------- JK Seed --------------->');
   console.log('testing');
   await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL
   })
   await main();

   await MongoDatabase.disconnect();
})();

const randomBetween0AndX = (x: number) => {
   return Math.floor(Math.random() * x);
}

async function main() {
   try {
      // * delete all
      await Promise.all([
         UserModel.deleteMany(),
         CategoryModel.deleteMany(),
         ProductModel.deleteMany(),
      ]);

      // * create new users 
      const users = await UserModel.insertMany(seedData.users);
      // * create new categories
      const categories = await CategoryModel.insertMany(seedData.categories.map(category => {
         return {
            ...category,
            user: users[0]._id,
         }
      }));
      // * create new products
      const products = await ProductModel.insertMany(seedData.products.map(product => {
         return {
            ...product,
            user: users[randomBetween0AndX(seedData.users.length - 1)]._id,
            category: categories[randomBetween0AndX(seedData.categories.length - 1)]._id,
         };
      }));

      console.log('<--------------- JK Seed --------------->');
      console.log('load data in data base successfully');
   } catch (error) {
      console.log('<--------------- JK Seed --------------->');
      console.log(error);
   }
}