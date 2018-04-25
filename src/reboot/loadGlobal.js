/**
 * Author: Ruo
 * Create: 2018-04-25
 * Description: 载入全局对象
 */
import { Dye } from '../global/Dye';
import { Log } from '../global/Log';
import { Clock } from '../clocks/Clock';
import { Post } from '../posts/Post';

/**
 * clock type
 */
import 'Clocks/types';

/**
 * post type
 */
import 'Posts/types';

export const loadGlobal = () => {
	global['Log'] = Log;
	global['Dye'] = Dye;
	global['Clock'] = Clock;
	global['Post'] = Post;
};
