import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import AuthorQuiz from './AuthorQuiz';
import EnzymeAdapter, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

const state = {
  turnData: {
    books: ['The Shining', 'IT', 'David Copperfield', 'A Tale of Two Cities', 'Hamlet', 'Macbeth', 'Romeo and Juliet'],
    author: {
      name: 'Charles Dickens',
      imageUrl: 'images/authors/charlesdickens.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['David Copperfield', 'A Tale of Two Cities']
    },
  },
  highlight: 'none'
}

describe('When testing directly', () => {
  let result;
  beforeAll(() => {
    // result = render(<AuthorQuiz test={"This is a test"}/>);
    result = AuthorQuiz({...state});
  });

  it("return a value", () => {
    expect(result).not.toBeNull();
  });

  it("is a h1", () => {
    expect(result.type).toBe("div");
  });

  it("has children", () => {
    expect(result.props.children).toBeTruthy;
  });
});

describe('When testing with ReactDom', () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={() => {}}/>, div);
  });
});

EnzymeAdapter.configure({ adapter: new Adapter() });
describe('When testing with Enzyme', () => {
  it("renders a div", () => {
    const wrapper = shallow(<AuthorQuiz {...state}/>);
    expect(wrapper.find("div").length).toBe(1);
  });

  it("should have no background color", () => {
    const wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={() => {}}/>);
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
  });
});

describe('When the wrong answer has been selected', () => {
  const stateMock = {
    turnData: {
      books: ['The Shining', 'IT', 'David Copperfield', 'A Tale of Two Cities', 'Hamlet', 'Macbeth', 'Romeo and Juliet'],
      author: {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['David Copperfield', 'A Tale of Two Cities']
      },
    },
    highlight: 'wrong'
  }

  it("renders a div", () => {
    const wrapper = shallow(<AuthorQuiz {...stateMock}/>);
    expect(wrapper.find("div").length).toBe(1);
  });

  it("should have red background color", () => {
    const wrapper = mount(<AuthorQuiz {...stateMock} onAnswerSelected={() => {}}/>);
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
  });
});

describe('When the good answer has been selected', () => {
  const stateMock = {
    turnData: {
      books: ['The Shining', 'IT', 'David Copperfield', 'A Tale of Two Cities', 'Hamlet', 'Macbeth', 'Romeo and Juliet'],
      author: {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['David Copperfield', 'A Tale of Two Cities']
      },
    },
    highlight: 'correct'
  }

  it("renders a div", () => {
    const wrapper = shallow(<AuthorQuiz {...stateMock}/>);
    expect(wrapper.find("div").length).toBe(1);
  });

  it("should have green background color", () => {
    const wrapper = mount(<AuthorQuiz {...stateMock} onAnswerSelected={() => {}}/>);
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
  });
});

describe('When the first answer is selected', () => {
  const stateMock = {
    turnData: {
      books: ['The Shining', 'IT', 'David Copperfield', 'A Tale of Two Cities', 'Hamlet', 'Macbeth', 'Romeo and Juliet'],
      author: {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['David Copperfield', 'A Tale of Two Cities']
      },
    },
    highlight: 'correct'
  }

  it("renders a div", () => {
    const wrapper = shallow(<AuthorQuiz {...stateMock}/>);
    expect(wrapper.find("div").length).toBe(1);
  });

  it("onAnswerSelected should be called", () => {
    const handleAnswerSelected = jest.fn();
    const wrapper = mount(<AuthorQuiz {...stateMock} onAnswerSelected={handleAnswerSelected}/>);
    wrapper.find(".answer").first().simulate('click');
    expect(handleAnswerSelected).toHaveBeenCalled();
  });

  it("select should received The Shining ", () => {
    const handleAnswerSelected = jest.fn();
    const wrapper = mount(<AuthorQuiz {...stateMock} onAnswerSelected={handleAnswerSelected}/>);
    wrapper.find(".answer").first().simulate('click');
    expect(handleAnswerSelected).toHaveBeenCalledWith("The Shining");
  });
});