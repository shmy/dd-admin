import user from './user'
import resource from './resource'

const services = [user, resource]
const sve = {}
services.forEach(item => { sve[item.namespace] = item.services })

export default sve
