import React from "react";
import { shallow } from "enzyme";
import Carousel from "../Carousel";
import CarouselButton from "../CarouselButton";
import CarouselSlide from "../CarouselSlide";

describe("A Carousel", () => {
  let wrapper;
  const slides = [
    {
      imgUrl: "https://example.com/slide1.png",
      description: "Slide 1",
      attribution: "Uno Pizzeria"
    },
    {
      imgUrl: "https://example.com/slide2.png",
      description: "Slide 2",
      attribution: "Dos Equis"
    },
    {
      imgUrl: "https://example.com/slide3.png",
      description: "Slide 3",
      attribution: "Tres Amigos"
    }
  ];

  beforeEach(() => {
    wrapper = shallow(<Carousel slides={slides} />);
  });

  it("should render a <div>", () => {
    expect(wrapper.type()).toBe("div");
  });
  it("should have an initial slideIndex of 0", () => {
    expect(wrapper.state("slideIndex")).toBe(0);
  });
  it('should render a CarouselButton labeled "Prev"', () => {
    expect(
      wrapper
        .find(CarouselButton)
        .at(0)
        .prop("children")
    ).toBe("Prev");
  });
  it('should render a CarouselButton labeled "Next"', () => {
    expect(
      wrapper
        .find(CarouselButton)
        .at(1)
        .prop("children")
    ).toBe("Next");
  });
  it("should render the current slide as a CarouselSlide", () => {
    let slideProps;
    slideProps = wrapper.find(CarouselSlide).props();
    expect(slideProps).toEqual({ ...CarouselSlide.defaultProps, ...slides[0] });
    wrapper.setState({ slideIndex: 1 });
    slideProps = wrapper.find(CarouselSlide).props();
    expect(slideProps).toEqual({ ...CarouselSlide.defaultProps, ...slides[1] });
  });
  describe("when a middle slide is selected", () => {
    beforeEach(() => {
      wrapper.setState({ slideIndex: 1 });
    });
    it("should decrement SlideIndex when Prev is clicked", () => {
      wrapper.find('[data-action="prev"]').simulate("click");
      expect(wrapper.state("slideIndex")).toBe(0);
    });
    it("should increment SlideIndex when Next is clicked", () => {
      wrapper.find('[data-action="next"]').simulate("click");
      expect(wrapper.state("slideIndex")).toBe(2);
    });
  });
  describe("when the first slide is selected", () => {
    it("should wrap to the last slide when Prev is clicked", () => {
      wrapper.setState({ slideIndex: 0 });
      wrapper.find('[data-action="prev"]').simulate("click");
      expect(wrapper.state("slideIndex")).toBe(slides.length - 1);
    });
  });
  describe("when the last slide is selected", () => {
    it("should wrap to the first slide when Next is clicked", () => {
      wrapper.setState({ slideIndex: slides.length - 1 });
      wrapper.find('[data-action="next"]').simulate("click");
      expect(wrapper.state("slideIndex")).toBe(0);
    });
  });
});
