import 'react-native';

import * as React from 'react';

import {
  RenderResult,
  act,
  fireEvent,
  render,
} from '../../../../test/test-utils';

import Temp from '../Temp';
import { ThemeProvider } from 'styled-components/native';
import { ThemeType } from '../../../types';
import { createTheme } from '../../../theme';
import renderer from 'react-test-renderer';

const props: any = {
  navigation: {
    goBack: jest.fn(),
  },
};

const component = (
  <ThemeProvider theme={createTheme(ThemeType.LIGHT)}>
    <Temp {...props} />
  </ThemeProvider>
);

describe('[Temp] render', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[Temp] Interaction', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(component);
  });

  it('should simulate [onPress] when [btn] has been clicked', () => {
    const btnInstance = renderResult.getByTestId('btn');
    act(() => {
      fireEvent.press(btnInstance);
    });
    expect(props.navigation.goBack).toHaveBeenCalled();
  });
});
