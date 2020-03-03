import React from "react";
import { shallow, mount } from "enzyme";
import CarouselSlide from "../CarouselSlide";

describe("Img", () => {
  let mounted;
  const imgUrl = "https://example.com/default.jpg";
  const alt = "alt";

  beforeEach(() => {
    const Img = CarouselSlide.defaultProps.Img;
    mounted = mount(<Img src={imgUrl} imgHeight={500} alt={alt} />);
  });
  it("should use imgHeight as the height style property", () => {
    expect(mounted).toHaveStyleRule("height", "500px");
    const dynHeight = "calc(100vh - 100px)";
    mounted.setProps({ imgHeight: dynHeight });
    expect(mounted).toHaveStyleRule("height", dynHeight);
  });
  it("should render correctly", () => {
    expect(mounted.find("img")).toMatchSnapshot();
  });
});
describe("A CarouselSlide", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <CarouselSlide imgUrl="http://localhost" description="default" />
    );
  });

  it("should pass other props through to the 'figure'", () => {
    const style = {};
    const onClick = () => {};
    const className = "my-carousel-slide";
    wrapper.setProps({ style, onClick, className });
    expect(wrapper.prop("style")).toBe(style);
    expect(wrapper.prop("onClick")).toBe(onClick);
    expect(wrapper.prop("className")).toBe(className);
  });
  it("should render correctly", () => {
    wrapper.setProps({
      description: "Description",
      attribution: "Attribution"
    });
    expect(wrapper).toMatchSnapshot();
  });
});
