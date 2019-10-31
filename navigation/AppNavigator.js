import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import AuthStackNavigator from './AuthStackNavigator'
import AuthCheck from '../screens/Login/AuthCheck'
export default createAppContainer(
    createSwitchNavigator({
        // You could add another route here for authentication.
        // Read more at https://reactnavigation.org/docs/en/auth-flow.html
        // AuthCheck : AuthCheck,
        // Auth: AuthStackNavigator,
        Main: MainTabNavigator,
    })
)
