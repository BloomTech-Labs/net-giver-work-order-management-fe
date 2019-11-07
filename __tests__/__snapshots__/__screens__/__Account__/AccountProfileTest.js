import React from 'react'
import renderer from 'react-test-renderer'
import AccountSettings from '../../../../screens/Account/AccountSetting'

test('renders correctly', () => {
    const tree = renderer.create(<AccountSettings />).toJSON()
    expect(tree).toMatchSnapshot()
})
