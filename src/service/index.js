import user from './user'
import resource from './resource'
import ad from './ad'

const services = [user, resource, ad]
const sve = {}
services.forEach(item => { sve[item.namespace] = item.services })

export default sve
