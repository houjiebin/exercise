//(之外为1 定义模块 2 暴露借口)
//3 引入模块
//4 使用模块
import Router from './utils/router'
import homeController from './controllers/home'
import positionController from './controllers/position'
import searchController from './controllers/search'
import profileController from './controllers/profile'

homeController.render()

const router = new Router()
router.init()
router.route("#position",positionController.render)
router.route("#search",searchController.render)
router.route("#profile",profileController.render)