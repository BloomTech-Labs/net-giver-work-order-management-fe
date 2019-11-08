import React from 'react'
import { Text } from 'react-native'
import { shallow } from 'enzyme'

describe('Text', () => {
    it('renders text', () => {
        const wrapper = shallow(<Text>Hello, world!</Text>)
        expect(wrapper.text()).toEqual('Hello, world!')
    })
})

// 11.8 TESTING ENZYME LD

// THIS SMOKE TEST COMPONENT TESTS THAT ENZYME IS WORKING PROPERLY
// ENZYME TESTS COMPONENTS INDIVIDUALLY
