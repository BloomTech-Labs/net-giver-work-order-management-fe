import { createBrowserApp } from '@react-navigation/web'
import { createSwitchNavigator } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import AuthStackNavigator from './AuthStackNavigator'

const switchNavigator = createSwitchNavigator({
<<<<<<< HEAD
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    // Auth: AuthStackNavigator,
    Main: MainTabNavigator,
})
switchNavigator.path = ''
=======
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Auth: AuthStackNavigator,
  Main: MainTabNavigator,
});
switchNavigator.path = '';
>>>>>>> b7d70bc1edc8edb2159fee3cedc88c8aec49f453

export default createBrowserApp(switchNavigator, { history: 'hash' })
