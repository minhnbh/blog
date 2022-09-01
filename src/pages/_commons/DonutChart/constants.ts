import { DataChart } from 'pages/_commons/DonutChart/types';
import { TooltipOptions } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/types/utils';

export const getTooltipProps = (
  dataCharts: DataChart[]
): _DeepPartialObject<TooltipOptions<'doughnut'>> => ({
  padding: 8,
  displayColors: false,
  backgroundColor: 'rgba(40, 39, 48, 0.8)',
  bodySpacing: 6,
  titleFont: {
    size: 16,
    weight: '600'
  },
  bodyFont: {
    size: 13,
    weight: '400'
  },
  titleMarginBottom: 10,
  callbacks: {
    title: (tooltipItems: any) => tooltipItems[0].label
  }
});
