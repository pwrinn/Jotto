import { shallow } from 'enzyme';
import { checkProps } from "../../test/testUtils";
import Congrats from './Congrats';

const defaultProps = { success: false };

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Congrats {...setupProps} />);
};

it('renders without error', () => {
  const wrapper = setup({ success: false });
  expect(wrapper.find('.component-congrats').length).toBe(1);
});

it('renders no text when `success` prop is false', () => {
  const wrapper = setup({ success: false });
  expect(wrapper.find('.component-congrats').text()).toBe('');
});

it('renders non-empty congrats message when `success` prop is true', () => {
  const wrapper = setup({ success: true });
  expect(wrapper.find('.congrats-message').text().length).not.toBe(0);
});

it('does not throw warning with expected props', () => {
  checkProps(Congrats, defaultProps);
});