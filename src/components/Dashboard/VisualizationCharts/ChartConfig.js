import React from 'react'
import { ResizableBox } from 'react-resizable';
import NlpServices from '../../../services/NlpService';
//

const options = {
  elementType: ['line', 'area', 'bar', 'bubble'],
  primaryAxisType: ['linear', 'time', 'log', 'ordinal'],
  secondaryAxisType: ['linear', 'time', 'log', 'ordinal'],
  primaryAxisPosition: ['top', 'left', 'right', 'bottom'],
  secondaryAxisPosition: ['top', 'left', 'right', 'bottom'],
  secondaryAxisStack: [true, false],
  primaryAxisShow: [true, false],
  secondaryAxisShow: [true, false],
  groupMode: ['single', 'series', 'primary', 'secondary'],
  tooltipAnchor: [
    'closest',
    'top',
    'bottom',
    'left',
    'right',
    'center',
    'gridTop',
    'gridBottom',
    'gridLeft',
    'gridRight',
    'gridCenter',
    'pointer',
  ],
  tooltipAlign: ['top', 'bottom', 'left', 'right', 'center'],
  snapCursor: [true, false],
};

const optionKeys = Object.keys(options);

export default class ChartConfig extends React.Component {
  static defaultProps = {
    count: 1,
    resizable: true,
    width: 350,
    height: 270,
    marginLeft: "30px",
    marginRight: "30px",
    canRandomize: true,
    dataType: 'time',
    show: [],
    elementType: 'line',
    primaryAxisType: 'time',
    secondaryAxisType: 'linear',
    primaryAxisPosition: 'bottom',
    secondaryAxisPosition: 'left',
    primaryAxisStack: false,
    secondaryAxisStack: true,
    primaryAxisShow: true,
    secondaryAxisShow: true,
    tooltipAnchor: 'closest',
    tooltipAlign: 'top',
    groupMode: 'primary',
    snapCursor: true,
    datums: 10,
  };
  constructor (props) {
    super(props);
    this.state = {
      ...props,
      data: this.makeData(),
    }
  }
  makeData = () => {
    const {
      dataType, series, datums,
    } = this.props;
    return makeData(dataType, series, datums)
  };
  render () {
    const {
      children,
      show,
      count,
      resizable,
      width,
      height,
      style,
      className,
    } = this.props;


    return (
      <div>
        {optionKeys.filter(option => show.indexOf(option) > -1).map(option => (
          <div key={option}>
            {option}: &nbsp;
            <select
              value={this.state[option]}
              onChange={({ target: { value } }) =>
                this.setState(() => ({
                  [option]: typeof options[option][0] === 'boolean' ? value === 'true' : value,
                }))
              }
            >
              {options[option].map(d => (
                <option value={d} key={d.toString()}>
                  {d.toString()}
                </option>
              ))}
            </select>
            <br />
          </div>
        ))}


        {[...new Array(count)].map(
          (d, i) =>
            resizable && true ? (
              <ResizableBox key={i} width={width} height={height}>
                <div
                  style={{
                    ...style,
                    width: '100%',
                    height: '100%',
                  }}
                  className={className}
                >
                  {children({
                    ...this.state,
                    elementType: this.state.elementType,

                  })}
                </div>
              </ResizableBox>
            ) : (
              <div key={i} style={style} className={className}>
                {children({
                  ...this.state,
                  elementType: this.state.elementType,

                })}
              </div>
            )
        )}
      </div>
    )
  }
}

function makeData (dataType, series, datums) {
  return [...[series || "1","2", "3"]].map((d,i) =>
  //return [...new Array(series || Math.max(Math.round(Math.random() * 5), 1))].map((d, i) =>
    makeSeries(i, dataType, datums)
  )
}

function makeSeries (i, dataType, datums) {
  const start = 0;
  const length = datums;
  return {
    label: `Series ${i + 1}`,
    datums: [...new Array(length)].map((_, i) => {
      let x = start + i;
      const y = Math.random()
      return {
        x,
        y,
      }
    }),
  }
}