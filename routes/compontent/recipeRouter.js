/*
 * @Description: 菜谱模块
 * @Author: silin7
 * @Date: 2020-08-09
 */


const express = require('express');
const recipeModule = require('../../controller/recipeModule');

let recipeRouter = express.Router();

recipeRouter
  .get('/recipe/recipe_catalogs', recipeModule.recipe_catalogs)
  .get('/recipe/recipe_list', recipeModule.recipe_list)
  .get('/recipe/recipe_detail', recipeModule.recipe_detail)


module.exports = recipeRouter;

