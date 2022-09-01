import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import { Row, Col } from 'react-bootstrap';
import { DonutChartProps, ItemLegendProps } from './types';
import classNames from 'classnames';
import { getTooltipProps } from './constants';

ChartJS.register(ArcElement, Tooltip);

const ItemLegend: React.FC<ItemLegendProps> = props => {
  const { title, color, value } = props;
  return (
    <div className="d-flex mb-16 align-items-center">
      <div className="allocation circle" style={{ backgroundColor: color }} />
      <span className="ml-8 color-white">{title}</span>
      <span className="ml-auto color-white">{value}%</span>
    </div>
  );
};

const DonutChart: React.FC<DonutChartProps> = props => {
  const {
    containerClassName,
    labelsItem,
    dataCharts,
    colorLabels,
    styleContainer,
    title
  } = props;

  const data = {
    labels: labelsItem,
    datasets: [
      {
        label: '# of Votes',
        data: dataCharts[0].data,
        backgroundColor: colorLabels,
        fill: false,
        borderWidth: 0,
        spacing: 2
      }
    ]
  };

  const renderItemLegend = () => {
    return labelsItem.map((item, index) => (
      <ItemLegend
        key={index}
        title={item}
        color={colorLabels[index]}
        value={dataCharts[0].data[index]}
      />
    ));
  };

  return (
    <div
      className={classNames('h-100', containerClassName)}
      style={styleContainer}
    >
      <div className="allocation title-chart">{title}</div>
      <div className="h-100 d-flex align-items-center py-16">
        <Row className="align-items-center flex-1">
          <Col md={6} className="pr-50">
            <Doughnut
              data={data}
              className="w-100"
              options={{
                plugins: {
                  tooltip: getTooltipProps(dataCharts)
                }
              }}
            />
          </Col>
          <Col md={6}>{renderItemLegend()}</Col>
        </Row>
      </div>
    </div>
  );
};

export default DonutChart;
