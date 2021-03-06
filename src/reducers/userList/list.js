// import {
// 	combineReducers
// } from 'redux';

// import moment from 'moment';

//用户列表页 -- 参数

// import {
// 	Param
// } from './listParam';

//用户列表页 -- 结果
// import {
// 	listTable
// } from './listTable';

//用户去重
// import {
// 	addUser
// } from './addUser';



/**
 * table数据状态
 * @method Table 
 * @param state {Object} 状态
 * @param action {Object} 动作
 */

const list = (state, action) => {

	//初始化
	if (typeof state === "undefined") {
		//初始化
		return {
			columns: [{
				title: '姓名',
				dataIndex: 'name',
				key: 'name',
			}, {
				title: '邮箱',
				dataIndex: 'email',
				key: 'email',
			}, {
				title: '操作',
				dataIndex: 'uid',
				key: 'uid'
			}],
			result: [],
			total: 1
		};
	}



	switch (action.type) {

		case "USER_LIST_COLUMNS":
			//操作系统状态
			return Object.assign({}, state, {
				columns: [{
					title: '姓名',
					dataIndex: 'name',
					key: 'name',
				}, {
					title: '邮箱',
					dataIndex: 'email',
					key: 'email',
				}, {
					title: '操作',
					dataIndex: 'uid',
					key: 'uid'
				}]
			});

		case "USER_LIST_RESULT":
			//渠道组
			return Object.assign({}, state, {
				result: action.payload
			});

		case "USER_LIST_TOTAL":
			//渠道组
			return Object.assign({}, state, {
				total: action.payload
			});
		default:
			//返回初始化
			return state;
	}
}

export {
	list
}