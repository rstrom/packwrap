import React from 'react'
import Remarkable from 'react-remarkable'

const Radio = ({ name='qux', text, options=['A', 'B'], push }) => (
  <div>
    <p>{text}</p>
    {
      options.map((option, i) => (
        <p
          key={i}
          onClick={() => push({ [name]: option })}
        >
          {option}
          <input type="radio" />
        </p>
      ))
    }
  </div>
)

const Markdown = ({
  source,
  buttonText='>>',
  push
}) => (
  <div>
    <Remarkable source={source} />
    <button onClick={() => push()}>{buttonText}</button>
  </div>
)

export default {
  Radio,
  Markdown
}
