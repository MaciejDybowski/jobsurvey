import { shallowMount } from '@vue/test-utils'
//import HelloWorld from '@/components/HelloWorld.vue'
import Login from '../../src/views/Login.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
/* describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
}) */

describe('Login.vue', () => {
  it('renders without crashing', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.exists()).toBe(true)
  })

  it('component includes header', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.find('h2').text()).toBe('Panel logowania')
  })

  it('components includes inputs', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.find('.field').exists()).toBe(true)
  })

  it('call submit method after click Login button', () => {
    const wrapper = shallowMount(Login)
    const method = jest.fn()
    wrapper.setMethods({ submit: method })
    wrapper.find('.mr-4').trigger('click')
    expect(method.called).toBe(true)
  })
})


