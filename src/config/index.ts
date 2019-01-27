import dev from './dev'
import prod from './prod'

/**
 * Returns a config environment oriented object
 *
 * @returns IConfig
 */
export default (process.env.NODE_ENV === 'production' ? prod : dev)
