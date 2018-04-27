/**
 * Author: Ruo
 * Create: 2018-04-26
 * Description: 有限状态机
 */
import _ from 'lodash';

export class FSM {
	/**
	 * @param entries 状态机中涉及到的对象
	 * @param dictionary 状态字典，映射每个状态的check和do方法
	 * @param checkFunctions 状态检查方法字典
	 */
	constructor(entries, dictionary, checkFunctions) {
		/**
         * dictionary: {
         *      [status 1]: {
                    check: [
         *              {
         *                  conditions: [...],
         *                  totalStatus: '...',
         *              },
         *          ],
         *          do: function() {},
         *      }
         * }
         */
		this.currentStatus = undefined; // 当前状态
		this.checkFunctions = checkFunctions;
		this.dictionary = dictionary;
		this.entries = entries;

		this.initDictionary();
	}

	// 检查dictionary字典格式
	initDictionary() {
		for (let status in this.dictionary) {
			const checkObject = this.dictionary[status].check;
			if (!checkObject) throw new Error('Status: ' + status + ' has no check object');
			if (!checkObject.conditions)
				throw new Error('Status: ' + status + "'s check object has no condition");
			if (!checkObject.totalStatus)
				throw new Error('Status: ' + status + "'s check object has no total status");
			if (!(checkObject.totalStatus in this.dictionary))
				throw new Error('Status: ' + status + "'s check object has wrong total status");
			if (!_.isArray(checkObject.conditions))
				throw new Error('Status: ' + status + "'s check object is not a Array");
			for (let checkFuncIndex in checkObject.conditions) {
				if (!(checkObject.conditions[checkFuncIndex] in checkFunctions)) {
					throw new Error('no check function in Status:' + status + "'s dictionary");
				}
			}
		}
	}

	// 绑定对象
	initEntries() {}
	// 用于存到Memory中
	get raw() {}

	setStatus(status) {
		this.currentStatus = status;
	}

	launch() {
		const currentStatusObject = this.dictionary[this.currentStatus];
	}

	// 检查当前状态
	checkCurrentStatus() {
		const currentCheckArray = this.dictionary[this.currentStatus].check;
		for (let i in currentCheckArray) {
			const checkObject = currentCheckArray[i];
			const conditions = checkObject.conditions;
			for (let checkFuncIndex in conditions) {
				if (!this.checkFunctions[conditions[checkFuncIndex]]()) return checkObject.totalStatus;
			}
		}
		return this.currentStatus;
	}

	do() {
		const currentStatusObject = this.dictionary[this.currentStatus];
		currentStatusObject.do();
	}
}
