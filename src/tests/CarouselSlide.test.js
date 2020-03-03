import React from "react";
import { shallow, mount } from "enzyme";
import CarouselSlide from "../CarouselSlide";
import styled from "styled-components";

describe("Img", () => {
  let mounted;
  const imgUrl = "https://example.com/default.jpg";
  const alt = "alt";

  beforeEach(() => {
    const Img = CarouselSlide.defaultProps.Img;
    mounted = mount(<Img src={imgUrl} imgHeight={500} alt={alt} />);
  });
  it("should render an img with the given src", () => {
    expect(
      mounted.containsMatchingElement(<img src={imgUrl} alt={alt} />)
    ).toBe(true);
  });
  it("should have these styles", () => {
    expect(mounted).toHaveStyleRule("width", "100%");
    expect(mounted).toHaveStyleRule("object-fit", "cover");
  });
  it("should use imgHeight as the height style property", () => {
    expect(mounted).toHaveStyleRule("height", "500px");
    const dynHeight = "calc(100vh - 100px)";
    mounted.setProps({ imgHeight: dynHeight });
    expect(mounted).toHaveStyleRule("height", dynHeight);
  });
  it("should allow styles to be overridden", () => {
    const TestImg = styled(CarouselSlide.defaultProps.Img)`
      width: auto;
      height: auto;
      object-fit: fill;
    `;
    mounted = mount(
      <CarouselSlide
        Img={TestImg}
        imgUrl={imgUrl}
        description="This prop is requisitioned"
      />
    );
    expect(mounted.find(TestImg)).toHaveStyleRule("width", "auto");
    expect(mounted.find(TestImg)).toHaveStyleRule("height", "auto");
    expect(mounted.find(TestImg)).toHaveStyleRule("object-fit", "fill");
  });
});
describe("A CarouselSlide", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <CarouselSlide imgUrl="http://localhost" description="default" />
    );
  });

  it("should render a 'figure'", () => {
    expect(wrapper.type()).toBe("figure");
  });
  it("should render props.Img and a 'figcaption' as children", () => {
    expect(wrapper.childAt(0).type()).toBe(CarouselSlide.defaultProps.Img);
    expect(wrapper.childAt(1).type()).toBe("figcaption");
  });
  it("should pass 'imgUrl' through to 'img'", () => {
    const imgUrl = "https://example.com/image.png";
    wrapper.setProps({ imgUrl });
    const img = wrapper.find(CarouselSlide.defaultProps.Img);
    expect(img.prop("src")).toBe(imgUrl);
  });
  it("should use 'description' and 'attribution' as the 'figcaption'", () => {
    const description = "A jaw-dropping-ly spectacular image";
    const attribution = "Trevor Smith";
    wrapper.setProps({ description, attribution });
    expect(wrapper.find("figcaption").text()).toBe(
      `${description} ${attribution}`
    );
    expect(wrapper.find("figcaption strong").text()).toBe(description);
    const img = wrapper.find(CarouselSlide.defaultProps.Img);
    expect(img.prop("alt")).toBe(description);
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
});
