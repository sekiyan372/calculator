import React, { useState } from 'react'
import styled from 'styled-components'

const App: React.FC = () => {
  const [view, setView] = useState<string>('0')
  const [result, setResult] = useState<string>('')
  const [existDot, setExistDot] = useState<string>()

  const addNumber= (num: string) => {
    if(result === '') {
      view === '0' ? setView(num) : setView(view + num)
    } else if(view.slice(-1) === ' ') {
      setView(view + num)
    } else {
      clear()
      setView(num)
    }
  }
  
  const addOperator = (operator: string) => {
    if(view.slice(-1) !== ' ' && view !== '0') {
      setExistDot()
      setView(view + ' ' + operator + ' ')
    } else if (view.slice(-1) === ' ') {
      setView(view.slice(0, -3) + ' ' + operator + ' ')
    }
  }

  const addMinus = () => {
    if(view.slice(-1) === ' ' || view === '0') {
      setView('-')
    } else if(view.slice(-1) !== '-' && view.slice(-1) !== '.') {
      setExistDot()
      setView(view + ' - ')
    }
  }

  const addDot = () => {
    if (view.slice(-1) !== ' ' && !existDot && !result) {
      setView(view + '.')
      setExistDot('.')
    } else if (result) {
      clear()
      setView('0.')
    }
  }
  
  const calculate = () => {
    if(view.slice(-1) !== ' ') {
      setView(eval(view) + '')
      setResult(view)
    }
  }

  const clear = () => {
    setView('0')
    setResult('')
  }

  const clearEntry = () => {
    if (view.length !== 1) {
      view.slice(-1) === ' ' ? setView(view.slice(0, -3)) : setView(view.slice(0, -1))
    } else {
      clear()
    }
  }

  const keyDown = (e) => {
    console.log(e.key)
    switch (e.key) {
      case 'Backspace':
        clearEntry()
        break
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
        addNumber(e.key)
        break
      case '.':
        addDot()
        break
      case 'Enter':
      case '=':
        calculate()
        break
      case '+':
      case '*':
      case '/':
        addOperator(e.key)
        break
      case '-':
        addMinus()
        break
    default:
      break
    }
  }

  return (
    <All>
      <h1>Calculator</h1>

      <ResultArea>
        <InputView type="text" value={ view } onKeyDown={(e) => keyDown(e)} />
      </ResultArea>

      <ButtonArea>
        <ClearBotton>
          <Button onClick={() => clear()}>C</Button>
          <Button onClick={() => clearEntry()}>CE</Button>
        </ClearBotton>

        <NumberButton>
          <Button onClick={() => addNumber('1')}>1</Button>
          <Button onClick={() => addNumber('2')}>2</Button>
          <Button onClick={() => addNumber('3')}>3</Button>
          <Button onClick={() => addNumber('4')}>4</Button>
          <Button onClick={() => addNumber('5')}>5</Button>
          <Button onClick={() => addNumber('6')}>6</Button>
          <Button onClick={() => addNumber('7')}>7</Button>
          <Button onClick={() => addNumber('8')}>8</Button>
          <Button onClick={() => addNumber('9')}>9</Button>
          <Button onClick={() => addNumber('0')}>0</Button>
          <Button onClick={() => addDot()}>.</Button>
          <Button onClick={() => calculate()}>=</Button>
        </NumberButton>

        <OperatorBotton>
          <Button onClick={() => addOperator('+')}>+</Button>
          <Button onClick={() => addMinus()}>-</Button>
          <Button onClick={() => addOperator('*')}>×</Button>
          <Button onClick={() => addOperator('/')}>÷</Button>
        </OperatorBotton>
      </ButtonArea>

    </All>
  );
}

const All = styled.div`
  text-align: center;
`

const ResultArea = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`

const InputView = styled.input`
  font-size: 50px;
  padding: 0 10px;
  border: solid 1px;
  width: 767px;
  text-align: right;
`

const Button = styled.button`
  margin: 5px;
  width: 150px;
  height: 75px;
  font-size: 30px;
`

const ButtonArea = styled.div`
  display: flex;
  justify-content: center;
`

const ClearBotton = styled.div`
  width: 160px;
`

const NumberButton = styled.div`
  width: 480px;
  display: flex;
  flex-flow: row wrap;
`

const OperatorBotton = styled.div`
  width: 160px;
`

export default App;
