import { render } from '@testing-library/react-native'
import React from 'react'

import HeaderRightHome from '../../App/components/buttons/HeaderHome'

describe('Header Right Home Component', () => {
  test('Renders correctly', () => {
    const tree = render(<HeaderRightHome />)

    expect(tree).toMatchSnapshot()
  })
})
