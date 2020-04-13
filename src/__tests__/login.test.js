import React from "react";
import { shallow } from "enzyme";
import App from "../components/App";

describe("Test case for testing login", () => {
  let wrapper;
  test("username check", () => {
    wrapper = shallow(<App />);
    wrapper.find("input[type=\"text\"]").simulate("change", { target: { name: "username", value: "krishankantsinghal" } });
    expect(wrapper.state("username")).toEqual("krishankantsinghal");
  });
  it("password check", () => {
    wrapper = shallow(<App />);
    wrapper.find("input[type=\"password\"]").simulate("change", { target: { name: "password", value: "krishankant123" } });
    expect(wrapper.state("password")).toEqual("krishankant123");
  });
  it("login check with right data", () => {
    wrapper = shallow(<App />);
    wrapper.find("input[type=\"text\"]").simulate("change", { target: { name: "username", value: "krishankantsinghal" } });
    wrapper.find("input[type=\"password\"]").simulate("change", { target: { name: "password", value: "krishankant123" } });
    wrapper.find("button").simulate("click");
    expect(wrapper.state("isLogined")).toBe(true);
  });
  it("login check with wrong data", () => {
    wrapper = shallow(<App />);
    wrapper.find("input[type=\"text\"]").simulate("change", { target: { name: "username", value: "krishankantsinghal" } });
    wrapper.find("input[type=\"password\"]").simulate("change", { target: { name: "password", value: "krishankant1234" } });
    wrapper.find("button").simulate("click");
    expect(wrapper.state("isLogined")).toBe(false);
  });
});
